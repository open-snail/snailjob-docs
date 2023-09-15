# easy_retry_demo

> 最近在逛Github的时候发现了这样一个开源项目——Easy-Retry。项目的介绍是一款基于服务治理的重试组件。在微服务盛行的当下，其实我们每个人在工作中都会遇到这样一种场景，在完成一次数据请求的时候进行多次调用。但是在遇到网络抖动、外部服务重启部署或者下游高负载导致短暂不可用等场景时，极易造成单次请求失败，因此重试也就变得在所难免。
> 恰好在实际的开发场景中，我也曾被重试这件事折腾的不得了,所以在本文中我们一起聊聊重试机制，也聊一下这款开源项目Easy-Retry。

# 1、重试的陷阱

## 1.1 简单的重试案例

遇到重试场景的时候我们应该怎么做？
我第一次看到同事的重试代码是这样子的

```
public boolean writeSomething(BusinessDto businessDto){
    Long id = businessDto.getId();
    int retry = 0;
    while(true){
        retry++;
        if (retry > 3){
            log.error("连续三次请求异常！business dto is:{}",JsonUtil.toString(businessDto));
            return false;
        }
        try {
          	// 此处放写入动作
          	XXXX
            log.info("buiness id is:{},write result is:{},retry time is:{}",id, JsonUtil.toString(writeResult),retry);
            // 如果写入成功直接返回
            if (writeResult.getCode() == WriteResult.success_code){
                return true;
            }else{
                // 休眠10ms
                Thread.sleep(10L);
            }
        }catch (Exception e){
            e.printStackTrace();
        }
    }
}
```

其实这是一个足够简单的重试案例,当请求遭遇异常,无法返回预期的结果时。则通过循环进行三次重试。但是这样简单的写法存在一个最直观的问题，就是**重试业务的代码对于正常业务的侵入性太高，导致代码的可读性变差。**
可以看到，其实这个逻辑，我们整个的核心要做的就是写入动作，其他所有的篇幅，都是为了做一次补偿机制，这就使得我们需要花一部分精力去理解与业务无关的代码。
但是更重要的是这部分代码，会留下一定的安全隐患，这我们就要提到重试风暴。

## 1.2 重试风暴

所谓重试风暴，指的是当下游被重试的服务出现故障时，上游的业务获取下游成功的状态码，故而无脑重试，由此引发的一系列问题。
我们一起来看重试风暴可能会引发的问题的场景。

### 1.2.1 重试导致的链路放大效应

假设有四个服务A、B、C、D，他们的调用关系是A调用B，B调用C和D。在微服务中，熔断和限流是非常常见的动作，假如A服务的调用量激增,触发了B服务的限流。这个时候B服务没有办法返回A服务理想的成功状态码，此时A服务就会发起重试，由此将会带来两个重大恶果。

- A服务的重试会导致B服务请求调用量激增，由此引发B服务的下游C和D服务量激增，下游也会出现熔断风险

![image.png](./docs/images/重试的链路放大效应.png)
- 当触发限流之后,B服务的请求中会充斥着大量的重试请求，由此会导致A服务中正常请求不可用的比例增加，造成服务更大范围的不可用

![image.png](./docs/images/重试触发限流的连锁反应.png)
同理，假如B服务没有触发限流，而是在高负载状态下导致了短暂的不可用，同样也会导致上图中出现的链路放大效应，可能会诱发出现服务雪崩的风险。
甚至在这样引入重试机制后，当B服务从短暂不可用状态恢复，由于A服务中包含了大量的重试，使得瞬时实际访问量剧增，从而当B服务恢复正常后，整体服务的恢复时间变长。

### 1.2.2 重试引发的告警升级

这个很好理解，假设用户实际的瞬时请求量是500，当经过重试的n次放大之后则会将请求数量变成500*n，此时如果系统中存在告警处理则会使得告警的数量增加三倍，引发告警的升级。
甚至笔者曾遭遇过，某些公司根据受影响的请求量来定义生产事故等级，由此引发了某次事故中由于进行了重试，导致生产事故的等级提升了一档。
当然上述讲的这些都是人为因素，我们接下来再来讨论一个这种场景下可能会引发的技术问题。这个问题也是笔者曾经亲历的，故事的起因大概是这样子的。
这个业务中Api层交由Nginx来做负载均衡，然后Api层再去调用RPC进行数据读取操作，重试机制做在了Api层，此时出现了一个bug，由于Api层某个参数传递错误，导致RPC服务返回5xx错误。
随后Api层接收到5xx错误后进行重试，导致5xx的问题翻倍。
由于接入了Nginx，此时出发了Nginx的健康检查机制，由于Nginx发现了大量 5xx 错误时，Nginx 可以自动将该节点从负载均衡的池中摘除。
随后导致Api节点被逐个摘除，然后出现了服务大规模的不可用，导致了生产事故。
![image.png](./docs/images/重试引发的NG摘除.png)
尽管在这个案例中，重试机制不是直接原因。但是毋庸置疑的是由于引入了这种重试，导致原本可控的问题被放大，演变成了更加严重的问题。

### 1.2.3 重试的蝴蝶效应

![image.png](./docs/images/重试的蝴蝶效应.png)
我们假设微服务的调用方式如上图所示，当服务E出现异常时，服务E上报异常，随后触发服务C重试，而服务C调用服务E异常后同样选择抛出异常，这样子又会引发服务B重试，假设每个服务都接入重试机制，每个服务的重试次数为n，这样子就会导致最终的请求变成了n的4次方。
同样也会引发服务的不稳定。

# 2、重试的优雅解决方案

在了解上述问题后，我们一起来看一下，为了更加优雅的解决这种重试场景，我们需要做出哪些方向上的改变呢？

## 2.1 重试风暴问题

在单点重试的场景中，一个服务不能无限制的对下游发出重试请求，这样会增加下游被打挂的场景。因此需要限制重试次数的上线和重试请求的成功率。
同时由于在微服务体系中重试可能会在多级链路中引发指数级调用量增长，我们还需要限制重试发生在微服务的每一层均发生，最为理想的情况是重试仅仅发生在服务的最下一层。

## 2.2 退避策略

在某些场景下，会出现一些暂时性的错误，如网络抖动、服务重新部署等场景，可能立即发起重试结果依然是失败的，通常等待一段时间后再重试的话成功率会较高，并且也可以分散上游重试的时间，可以避免因为同时都重试而导致的下游瞬间流量高峰。决定等待多久之后再重试的方法叫做退避策略，在重试系统中支持灵活的退避策略是很必要的。

## 2.3 动态配置

当指定重试策略后，处置策略可能会因为业务场景的变化而变动，在这种情况下，如果我们需要每次通过代码编译部署上线的流程去修改其中的一些重试参数的话，会使得我们的使用非常不便捷，因此如果重试组件中可以支持动态配置，我们就可以通过后台修改配置的方式，根据业务场景的变化而修改策略。

# 3、重试的常见解决方案

重试问题由来已久，那么在业内有没有一些已经开发好的组件可以帮助我们优雅的进行重试逻辑呢？
当然有，接下来我将把业内一些比较常见的组件和大家做一个列举：

| **组件名称**  | **组件介绍**                                                 |
| ------------- | ------------------------------------------------------------ |
| Spring Retry  | Spring Retry 是 Spring 框架提供的一个模块，其中的 RetryTemplate 类允许你在代码中配置和执行重试操作。你可以定义重试策略、重试次数、重试间隔等。它提供了灵活的方式来处理需要重试的操作。 |
| Failsafe      | Failsafe 是一个开源的 Java 库，用于执行可靠的操作。它提供了一组工具和策略，可用于定义重试操作。你可以设置重试次数、重试间隔、超时时间等。Failsafe 支持基于断言、异常类型或返回结果等进行重试。 |
| Guava Retryer | Guava Retryer 是 Google Guava 库提供的一个重试框架。它允许你定义重试策略和条件，并执行重试操作。你可以设置重试次数、重试间隔、异常判断条件等。Guava Retryer 提供了丰富的重试功能和灵活的配置选项。 |
| Resilience4j  | Resilience4j 是一个轻量级的容错库，提供了一系列的容错模式和组件，包括重试。它可以帮助你构建弹性和可靠的应用程序。Resilience4j 支持基于注解、函数式编程和配置方式来定义和执行重试操作。 |

# 4、Easy-Retry简介

Easy-Retry是一款基于服务治理的重试组件，其基于CAP理论设计，具有操作简单、实时监控、后台配置、支持多样化退避策略、支持多种告警方法等特点。支持本地重试和远程重试两种模式，提供管理后台，使得重试任务可视化，可以方便的查看和管理重试任务。同时也可以在管理后台配置多种策略，针对不同的业务场景进行实时调整。
Easy-Retry的核心功能是流量管控，而流量管控则主要包含下面这些场景：

- 单机链路管控
- 限制链路重试
- 结合DDL控制无效重试
- 支持多种退避策略
- 支持可视化配置
- 支持动态关闭重试场景

## 4.1 流量管控的实现

那么我们来看一下，核心功能点钟的流量管控是怎么做到的呢？
主要是通过两种方式：

### 4.1.1 单机多注解循环引用问题

Easy-Retry在重试执行过程中标记了重试入口,触发重试时只从标记的重试入口进入
![image.png](./docs/images/标记重试入口.png)
### 4.1.2 标记重试流量

对于重试的请求，我们在请求头中下发一个特殊的标识(easyRetry:boolean), 在 Service A ->Service B ->Service C 的调用链路中，当Service B 收到Service A 的请求时会先读取这个 easyRetry 判断这个请求是不是重试请求， 如果是，那它调用Service C 即使失败也不会重试；否则将触发重试 。 同时Service B 也会把这个 easyRetry 下传，它发出的请求也会有这个标志，它的下游也不会再对这个请求重试。
![image.png](./docs/images/标记重试流量.png)

### 4.1.3 调用链超时控制(Deadline Request)

DDL 是“ Deadline Request 调用链超时”的简称，我们知道 TCP/IP 协议中的 TTL 用于判断数据包在网络中的时间是否太长而应被丢弃，DDL 与之类似， 它是一种全链路式的调用超时，可以用来判断当前的 RPC 请求是否还需要继续下去。如下图，在 RPC 请求调用链中会带上超时时间， 并且每经过一层就减去该层处理的时间，如果剩下的时间已经小于等于 0 ，则可以不需要再请求下游，直接返回失败即可。
![image.png](./docs/images/调用链超时控制.png)

### 4.1.4 特殊的 status code 限制链路重试

如果每层都配置重试可能导致调用量指数级扩大，这样对底层服务来说压力是非常之大的, 通过对流量的标记 ，用户可以判断是否是重试的流量来判断是否继续处理，我们使用 Google SRE 中提出的内部使用特殊错误码的方式来实现：

```
1 统一约定一个特殊的 status code ，它表示：调用失败，但别重试。
2 任何一级重试失败后，生成该 status code 并返回给上层。
3 上层收到该 status code 后停止对这个下游的重试，并将错误码再传给自己的上层。
```

这种方式理想情况下只有最下一层发生重试，它的上游收到错误码后都不会重试，但是这种策略依赖于业务方传递错误码， 对业务代码有一定入侵，而且通常业务方的代码差异很大， 调用 RPC 的方式和场景也各不相同，需要业务方配合进行大量改造， 很可能因为漏改等原因导致没有把从下游拿到的错误码传递给上游。
![image.png](./docs/images/特殊的StatusCode限制链路重试.png)

## 4.2 Easy-Retry适用场景

哪些场景适合使用Easy-Retry呢？

- 强通知性场景

在某些业务场景下，需要强制保证将通知、消息等数据发送到目标端接口，但由于网络的不确定性以及目标系统、应用、服务的不确定性，可能会造成通知消息的发送失败。 比如: 发送MQ消息失败、回调通知第三方失败。

- 短暂不可用场景

在系统的运行环境中，不可避免的依赖各种服务，由于依赖服务出现短暂性不可用或者因网络波动造成瞬间闪断。

- 延迟任务场景

在系统中延迟执行的业务需求已经司空见惯, 比如延迟下单、延迟执行、红包指定时间未被查收延迟执行退还业务等等。可以通过手动模式生成任务的方式来执行重试。

# 5、Easy-Retry最佳实践

## 5.1 服务端部署

easy-retry代码托管地址 [Easy-Retry](https://gitee.com/aizuda/easy-retry)
首先将代码clone到本地，然后我们一起来看一下代码中的结构
![image.png](./docs/images/Easy-Retry代码结构.png)

笔者此时使用的是1.6-SNAPSHOT版本，我们来简单介绍一下其中的模块

| **模块名称**            | **模块功能**                     |
| ----------------------- | -------------------------------- |
| docs                    | 项目介绍图示和相关的数据库表语句 |
| easy-retry-client-core  | 客户端代码                       |
| easy-retry-client-start | 客户端启动器                     |
| easy-retry-common       | 公用类                           |
| easy-retry-server       | 服务端后端代码                   |
| example                 | 测试用例                         |
| frontend                | 服务端前端代码                   |

我们首先启动对应的服务端代码
首先是后端，使用docs中的SQL语句对应的建立数据库和表
![image.png](./docs/images/Easy-Retry建立数据库和表.png)
然后修改服务端中数据库的相关配置
![image.png](./docs/images/Easy-Retry建立数据库配置.png)
然后我们mvn clean compile install
![image.png](./docs/images/项目打包.png)
启动后端代码
随后我们进入到 **frontend**目录下方，执行命令
**npm install**
**npm run serve**
![image.png](./docs/images/项目部署1.png)
![image.png](./docs/images/项目部署2.png)
启动后我们访问 http://localhost:**8000**/ 地址可以看到成功进入到了登录界面,这个时候我们输入初始的登录用户和密码，用户名admin，密码admin
![image.png](./docs/images/项目部署3.png)
可以看到我们成功进入了控制台
![image.png](./docs/images/项目部署4.png)
至此，服务端的部署就完成了。
接下来我们进入客户端的应用，我们通过一些案例来看一下如何使用easy-retry。

## 5.2 客户端应用

### 5.2.1 从一个最简单的案例上手Easy-Retry

我们首先创建一个SpringBoot应用，引入Maven坐标

```java
<dependencies>
    <dependency>
        <groupId>com.aizuda</groupId>
        <artifactId>easy-retry-client-starter</artifactId>
        <version>1.6.0-SNAPSHOT</version>
    </dependency>
</dependencies>
```

然后我们在SpringBoot的启动项上增加注解@EnableEasyRetry

```java
@SpringBootApplication
    @EnableEasyRetry(group = "easy_retry_demo_group")
    public class EasyRetrySpringbootApplication {
        public static void main(String[] args) {
            SpringApplication.run(EasyRetrySpringbootApplication.class, args);
        }
    }
```

这个启动类中写入的easy_retry_demo_group对应的是我们控制台中的组名称
![image.png](./docs/images/建立控制台上的组.png)
在控制台中我们点击 - 总在线机器豆腐块即可看到当前的客户端已经注册到了我们的机器列表中了
![image.png](./docs/images/查看机器列表.png)
随后我们来写一个最简单的Service服务应用Easy-Retry

```java
@Component
    public class LocalRetryService {
        @Retryable(scene = "localRetry")
        public void localRetry(){
            System.out.println("local retry 方法开始执行");
            double i = 1 / 0;
        }
    }
```

大家可以看到这段代码中我们添加了一个注解@Retryable(scene = "localRetry")，在其中指定了参数值scene，这个scene对应着控制台中的场景，我们可以在这里理解为场景就是组下面的唯一标识。
那么接下来我们来测试一下这段代码

```java
@Test
public void localRetryTest(){
    localRetryService.localRetry();
}
```

当不指定重试次数时，默认会重试三次，所以我们可以看到控制台上供给打印了四次"local retry 方法开始执行"后才抛出ArithmeticException异常信息。
![image.png](./docs/images/Easy-Retry启动案例.png)

### 5.2.2 了解Retryable注解

通过上述这个最简单的案例，我们可以看到Retryable注解就是Easy-Retry中最重要的入口，那么接下来我们就要看一下这个注解中定义了哪些属性，又给了我们哪些可以配置的选项呢？

| 参数                  | 描述                                                         | 默认值                      | 必须指定 |
| --------------------- | ------------------------------------------------------------ | --------------------------- | -------- |
| scene                 | 场景                                                         | 无                          | ✅        |
| include               | 包含的异常                                                   | 无                          | ❌        |
| exclude               | 排除的异常                                                   | 无                          | ❌        |
| retryStrategy         | 重试策略                                                     | LOCAL_REMOTE                | ✅        |
| retryMethod           | 重试处理入口                                                 | RetryAnnotationMethod       | ✅        |
| idempotentId          | 幂等id生成器                                                 | SimpleIdempotentIdGenerate  | ✅        |
| retryCompleteCallback | 服务端重试完成(重试成功、重试到达最大次数)回调客户端         | SimpleRetryCompleteCallback | ❌        |
| isThrowException      | 本地重试完成后是否抛出异常                                   | true                        | ❌        |
| bizNo                 | 标识具有业务特点的值比如订单号、物流编号等，可以根据具体的业务场景生成，生成规则采用Spel表达式解析，如果对Spel表达式不了解可以参考： [spel表达式](https://docs.spring.io/spring-framework/docs/5.0.0.M5/spring-framework-reference/html/expressions.html) | 无                          | ❌        |
| localTimes            | 本地重试次数 次数必须大于等于1                               | 3                           | ✅        |
| localInterval         | 本地重试间隔时间(s)                                          | 2                           | ✅        |
| timeout               | 同步(async:false)上报数据需要配置超时时间                    | 60 * 1000                   | ❌        |
| unit                  | 超时时间单位                                                 | TimeUnit.MILLISECONDS       | ❌        |
| forceReport           | 是否强制上报数据到服务端                                     | false                       | ❌        |
| async                 | 是否异步上报数据到服务端                                     | true                        | ❌        |

可以看到我们能够自定义的参数还是很多的，那么接下来我将用分组的形式来跟大家讲解这些参数。

#### 基础设置参数

| 参数          | 描述                           | 默认值 | 必须指定 |
| ------------- | ------------------------------ | ------ | -------- |
| scene         | 场景                           | 无     | ✅        |
| localTimes    | 本地重试次数 次数必须大于等于1 | 3      | ✅        |
| localInterval | 本地重试间隔时间(s)            | 2      | ✅        |

为什么叫基础设置参数呢？因为这是几乎每个重试组件都会实现的功能，也是我们在使用一款重试组件时最需要的配置。

---

scene 既是场景ID，我们先来了解一下Easy-Retry中两个最基本的概念——组和场景
![image.png](./docs/images/场景和组的概念.png)
我们以电商系统为例，比如说这个系统中存在着商品服务，用户服务和订单服务。那么每个服务，其实就是一个组，而每个服务中都有若干个接口，这些实现功能的接口对应的就是Easy-Retry中的场景。
在Retryable注解中，场景值是唯一必须要手动指定且没有默认值的参数，这也就是为什么我们在第一个案例中仅仅指定了scene参数的值后就可以开始上手使用Easy-Retry了。
⚠️ 注意，scene值一旦指定后不要修改，否则会使历史重试数据失效。

---

localTimes，指的是我们在本地重试的次数，默认是在本地重试三次，在使用中我们可以根据具体的场景，来指定重试的次数。

---

localInterval指的是本地重试的间隔时间，指的是系统在进行两次重试时的间隔
![image.png](./docs/images/本地重试间隔示例.png)

---

那么讲解完成这些参数之后我们来一个案例测试

```java
// 这个函数里面我们设置重试次数为4，每次间隔10s
@Retryable(scene = "localRetryWithBasicParams",localTimes = 4,localInterval = 10)
public void localRetryWithBasicParams(){
    System.out.println("local retry 方法开始执行");
    double i = 1 / 0;
}
```

我们通过控制台观察输出结果，可以看到，共计打印了5次 "local retry 方法开始执行"语句，且每次调度之间间隔为10s。
![image.png](./docs/images/重试间隔控制台输出.png)

#### 异常相关参数

| 参数             | 描述                       | 默认值 | 必须指定 |
| ---------------- | -------------------------- | ------ | -------- |
| include          | 包含的异常                 | 无     | ❌        |
| exclude          | 排除的异常                 | 无     | ❌        |
| isThrowException | 本地重试完成后是否抛出异常 | true   | ❌        |

接下来我们来讲解和异常相关的参数，重试动作大多是发生在程序遭遇异常的场景中。因此对于异常的处理也是重试动作中的一个重要部分。

---

include参数代表包含的异常，什么意思呢？就是我们指定当遭遇到指定的异常时，才进行重试动作。

---

exclude参数和include参数是相反的，如果我们在exclude中指定了相关异常，那么遇到对应异常时则不会发生重试动作。

---

isThrowException这个参数就比较简单了，代表我们进行完成本地重试后是否需要抛出异常，默认是会抛出这个异常，如果我们在这个选项中选择了false，这不会再将原始的异常抛出。

---

接下来我们来测试一下这些异常参数，我们首先在项目里面定义两个异常类BusinessException和ParamException，其中ParamException是BusinessException的子类

```java
// 定义一个统一的业务异常类
public class BusinessException extends RuntimeException{
    public BusinessException(String message) {
        super(message);
    }
}
```

```java
// 定义一个参数异常处理类,是业务异常类的子类
public class ParamException extends BusinessException{
    public ParamException(String message) {
        super(message);
    }
}
```

我们首先抛出一个非指定的异常，观察下是否会发生重试，这个案例中我们依然抛出一个ArithmeticException异常，但是我们只指定当遇到ParamException异常时才会进行重试。

```java
@Retryable(scene = "localRetryIncludeException",include = ParamException.class)
public void localRetryIncludeException(){
    System.out.println("local retry include exception 方法开始执行");
    double i = 1 / 0;
}
```

运行后观察控制台我们可以看到，仅执行了一次，并未进行重试
![image.png](./docs/images/异常参数1.png)
接下来我们抛出指定异常,例如抛出自定义的ParamException异常，观察是否会重试。

```java
@Retryable(scene = "localRetryIncludeException",include = ParamException.class)
public void localRetryIncludeException(){
    System.out.println("local retry include exception 方法开始执行");
    throw new ParamException("此处发生了指定异常Param Exception");
}
```

运行方法后我们观察控制台，看到方法发生了重试。
![image.png](./docs/images/异常参数2.png)

当然，由于ParamException是BusinessException的子类，当我们指定处理的类是父类BusinessException时，同样也会进行重试。这样子我们就可以通过自定义异常来指定某些特定报错的业务场景才执行重试逻辑，同时如果也可以通过指定异常的继承关系对一类异常场景进行统一的处理。

```
@Retryable(scene = "localRetryIncludeException",include = BusinessException.class)
public void localRetryIncludeException(){
    System.out.println("local retry include exception 方法开始执行");
    throw new ParamException("此处发生了指定异常Param Exception");
    // throw new NullPointerException();
}
```

接下来我们看exclude参数，这个参数和include是相反的，include是遇到指定的异常就重试，而exclude是遇到指定的异常就不重试。
我们直接给出案例

```java
@Retryable(scene = "localRetryExcludeException",exclude = {ParamException.class,ArithmeticException.class})
public void localRetryExcludeException(){
    System.out.println("local retry exclude exception 方法开始执行");
    double i = 1 / 0;
    throw new ParamException("此处发生了参数异常");
}
```

观察控制台输出，我们可以看到没有进行重试就抛出了对应的异常
![image.png](./docs/images/异常参数3.png)

接下来我们讲解isThrowException参数,这个参数比较简单，表示我们在进行重试动作后是否会将异常抛出来，我们给出一个案例，在这个案例中我们继续在上一个exclude参数中一个未测试到的场景，此时我们指定exclude的参数为ArithmeticException，然后再指定isThrowException的值为false。

```java
@Retryable(scene = "localRetryIsThrowException",exclude = ArithmeticException.class,isThrowException = false)
public void localRetryIsThrowException(){
    System.out.println("local retry is throw exception 方法开始执行");
    throw new ParamException("此处发生了参数异常");
}
```

此时我们观察服务台输出，可以看到由于指定的异常，并不在我们抛出异常的列表中。因此发生了重试，大家可以看到异常的信息，依然是打印出来的，但是在此处，整个测试案例就是通过了的。这也就意味着上游调用这个接口的服务方并不会感知到本次异常的发生。
因此，isThrowException参数会屏蔽本次异常的发生，而不是向上抛出异常。
![image.png](./docs/images/异常参数4.png)

#### 服务端上报相关参数

| 参数          | 描述                                      | 默认值                | 必须指定 |
| ------------- | ----------------------------------------- | --------------------- | -------- |
| retryStrategy | 重试策略                                  | LOCAL_REMOTE          | ✅        |
| async         | 是否异步上报数据到服务端                  | true                  | ❌        |
| timeout       | 同步(async:false)上报数据需要配置超时时间 | 60 * 1000             | ❌        |
| unit          | 超时时间单位                              | TimeUnit.MILLISECONDS | ❌        |

在上述的参数案例中，我们主要讲解了Easy-Retry在本地重试中的参数配置，而Easy-Retry同样可以支持管理后台可视化查看重试行为。接下来我们来讲解Easy-Retry的客户端是如何连接到服务端的，以及服务端都支持哪些可配置的参数。

---

retryStrategy参数代表了我们需要指定的重试策略，这个重试策略目前支持三种，参数的默认值是本地重试。这是Easy-Retry中非常重要的一个概念，三种模式的释义大家可以参数表格

| 策略                       | 释义                                                         |
| -------------------------- | ------------------------------------------------------------ |
| ONLY_LOCAL                 |                                                              |
| **本地重试**               | 在内存中执行重试动作，如果重试结束后依然异常则抛出异常或是打印错误日志 |
| ONLY_REMOTE                |                                                              |
| **远程重试**               | 将异常上报至服务端，由服务端管理重试的动作或是根据服务端的配置进行重试的动作 |
| LOCAL_REMOTE               |                                                              |
| **先本地重试，再远程重试** | 优先在本地基于内存中完成重试动作，如果重试之后依然返回异常结果则将结果上报至服务端 |

在这个地方我们通过图示的方式来讲解一下三种模式具体的区别是什么：
![image.png](./docs/images/三种重试方式的区别.png)
可以看到本地重试模式中仅仅是使用内存来完成重试，不涉及到和服务端的交互。
而远程重试模式则是在遭遇异常后构建异常快照，随后进行重试数据上报，上传重试数据到服务端，服务端进行数据持久化后再由调度器提取上报的异常快照，还原重试的上下文后回调客户端进行重试。
先本地重试，再远程重试模式顾名思义则是两者的结合，优先在本地进行重试，如果本地重试后依然返回异常结果，则进行数据上报，将未完成的异常数据上报至服务端，根据服务端指定的策略进行下一步的处理方案。

---

async参数代表是否异步上传数据到服务端，默认为true，当指定参数async为false时，请求将通过NettyClient进行实时数据上报，而默认状态下为异步上传，通过滑动窗口的方式进行异步数据上传。

---

timeout参数指当我们选择同步上报数据时请求的超时时间，默认为60 * 1000毫秒，即一分钟,unit参数和timeout参数是配套的，代表了我们同步上传数据超时时间的单位。

---

那么讲解完成这些参数后，我们通过案例来讲解一下这几个参数的具体使用方法吧。
由于后续的案例的都涉及到了客户端和服务端的交互，需要客户端也处于启动状态，所以后续的用例我们通过HTTP接口访问的形式来进行测试。
在使用远程重试相关的功能前，我们首先需要创建一个组，组名既是我们之前在SpringbootApplication中给出的@EnableEasyRetry注解指定的组名，在这个案例中组名为easy_retry_demo_group，因为需要我们手动指定相关的路由策略和Id生成模式。
Id生成模式指的是我们重试请求的唯一键，Easy-Retry中为我们指定了两种模式，分别是雪花算法模式和号段模式，大家可以根据业务场景自行选取。
指定分区的配置允许我们将不同的任务放置在不同的分区中进行管理，项目中自带的建表语句中为我们创建了表`retry_task_0`和`retry_dead_letter_0`,因此此处我们将指定分区的值设置为0，如果选择了其他的分区，那么我们需要在数据库中创建相关的表。
![image.png](./docs/images/新建组.png)
在创建完成相关组之后，写一个远程重试的方法。

```java
@Component
public class RemoteRetryService {
    @Retryable(scene = "remoteRetry",retryStrategy = RetryType.ONLY_REMOTE)
    public void remoteRetry(){
        System.out.println("远程重试方法启动");
        double i = 1 / 0;
    }
}
```

然后在Controller层调用这个方法

```java
@RestController
    @RequestMapping("/remote")
    public class RemoteRetryController {
        @Autowired
        private RemoteRetryService remoteRetryService;
    
        @GetMapping("/retry")
        public void remote(){
            remoteRetryService.remoteRetry();
        }
    }
```

启动客户端的服务，随后通过IDEA发起一个HTTP请求
![image.png](./docs/images/远程重试1.png)
此时可以看到我们的控制台已经可以看到本次执行的任务
![image.png](./docs/images/远程重试2.png)
随后我们进入任务管理列表中查看请求的详情，可以看到已经产生了一条正在执行中的重试任务，目前的执行次数是8。
![image.png](./docs/images/远程重试3.png)
点击进入重试数据的详情，我们可以看到，本次请求的详细调度日志，由于在重试过程中还在持续发生异常，因此会不断地执行重试。
![image.png](./docs/images/远程重试4.png)
那么这个重试会有上限吗？当然会有，我们在组管理中找到对应的组，当我们启动服务的时候，会自动注册一个场景，此时场景初始化时最大的重试次数是21，调用链超时时间是6000毫秒。
![image.png](./docs/images/远程重试5.png)
我们调低这个默认值，将最大重试次数调整到10次，看一下当超过最大重试次数时会发生什么。
可以看到，当重试数据达到最大次数时，此时会产生一条回调数据的任务。
![image.png](./docs/images/远程重试6.png)
你可能会比较好奇为什么会产生两条任务？这就要从我们的交互流程来说起了，在远程重试的场景中，客户端遭遇异常后会进行重试的数据上报，服务端在接受到客户端的重试数据后会进行重试数据的持久化，随后会由调度器下发调度任务。此时会有两个执行器在等待，一个是重试执行器，一个是回调执行器，重试执行器的作用是触发任务调度，而回调执行器的作用则是将服务端调度的状态通知给客户端，客户端在接受到服务端的回调任务后可以执行自定义方法，来指定重试完成之后的后置动作，这部分内容在下面retryCompleteCallback中会详细介绍。
![image.png](./docs/images/远程重试7.png)
倘若重试任务超过最大重试次数后，将会从"任务管理"一栏中取消，加入到"死信队列管理"一栏中，此时我们认为这条任务是一条死信，不再进行重试执行。当然，如果在业务中因为下游的bug导致本任务的重试一直不成功，我们也可以点击死信队列管理中的回滚，将这条死信消息重新放入到"任务管理"Tab下面，再次执行重试任务。
![image.png](./docs/images/远程重试8.png)
接下来我们来用一个案例演示一下retryStrategy中的LOCAL_REMOTE、async、timeout、unit这四个参数，因为这几个参数都比较简单，因此我就放到一个案例中来进行处理了。首先我们定义一个同步上传的方法。

```java
/**
 * 使用先本地再远程的策略同步上传重试请求
 * retryStrategy = LOCAL_REMOTE 代表本地重试3次后再执行远程上报
 * async = false 代表使用同步上传的方式
 * timeout = 1 代表超时时间为1
 * unit = MINUTES 代表超时时间的单位是分钟
 */
@Retryable(scene = "remoteRetryWithSync",retryStrategy = RetryType.LOCAL_REMOTE,
                async = false, timeout = 1, unit = TimeUnit.MINUTES)
public String remoteRetryWithLocalRemote(String requestId){
    double i = 1 / 0;
    return requestId;
}
```

观察结果我们可以看到，首先执行了三次本地重试，随后在本地抛出异常。
![image.png](./docs/images/远程重试9.png)
然后任务管理中出现了我们上报的任务。
![image.png](./docs/images/远程重试10.png)

#### 业务相关参数

| 参数                  | 描述                                                         | 默认值                      | 必须指定 |
| --------------------- | ------------------------------------------------------------ | --------------------------- | -------- |
| idempotentId          | 幂等id生成器                                                 | SimpleIdempotentIdGenerate  | ✅        |
| retryMethod           | 重试处理入口                                                 | ExecutorAnnotationMethod    | ✅        |
| retryCompleteCallback | 服务端重试完成(重试成功、重试到达最大次数)回调客户端         | SimpleRetryCompleteCallback | ❌        |
| bizNo                 | 标识具有业务特点的值比如订单号、物流编号等，可以根据具体的业务场景生成，生成规则采用Spel表达式解析。 | 无                          | ❌        |

接下来的参数中主要是和我们业务相关的一些参数了，当我们在业务场景中使用Easy-Retry时，可以根据实际的业务需要来定制一些内容。首先我们对这些参数来做一个详细的介绍：

---

idempotentId 幂等Id生成器，每个重试请求中，其中默认的实现方法为SimpleIdempotentIdGenerate，我们一起来看一下这个方法是如何实现的。

```java
public class SimpleIdempotentIdGenerate implements IdempotentIdGenerate {
    @Override
    public String idGenerate(IdempotentIdGenerateEntity idempotentIdGenerateEntity) throws Exception {
        return SecureUtil.md5(idempotentIdGenerateEntity.toString());
    }
}
   /**
     * 参数列表为IdempotentIdGenerateEntity包含了四个对象, 下面说明每一个下标代表的数据含义
     * 场景名称: scene(String)
     * 执行器名称: targetClassName(String)
     * 参数列表: args(Object[])
     * 执行的方法名称: methodName(String)
     * scene, targetClassName, args, executorMethod.getName()
     *
     * @param t 参数列表
     * @return idempotentId
     * @throws Exception
     */
public interface IdempotentIdGenerate {
    String idGenerate(IdempotentIdGenerateEntity idempotentIdGenerateEntity) throws Exception;
}
```

可以看到，默认实现中我们取scene场景名称，targetClassName执行器名称，args参数列表，methodName执行的方法名称来进行了一个md5运算作为重试任务的幂等Id，由此来保证任务是唯一的，这种实现方式下，对象中的四个参数中有一个变化都会新建一个重试任务。
当然，在一些特殊的业务场景下我们可以重写IdempotentIdGenerate来实现幂等Id的自定义。
接下来我们再来看一个案例。这次我们来模拟一个业务场景，举个例子，一个商品下单的场景，用户购买某个限购的商品，此时用户可以通过手机下单，也可以通过PC下单，此时两个请求的订单号相同，一端下单成功后，另一端不可重复下单。此时假设下单服务发生异常，我们仅需产生一次重试任务即可，无需根据客户端不同发生多次请求。
![image.png](./docs/images/远程重试11.png)
那么怎么来实现这个场景呢？我们首先来定义一个商品的VO，为了简化表述，我们在其中仅仅放入订单ID和订单来源信息两个字段。

```java
@Data
public class OrderVo {
    private String orderId; // 订单ID,用于唯一标识订单的编号
    private Integer source; // 订单来源信息,1-手机端下单 2-PC端下单
}
```

然后我们自定义一个幂等Id生成类

```java
/**
 * 使用自定义的幂等Id生成类 OrderIdempotentIdGenerate
 */
@Retryable(scene = "remoteRetryWithIdempotentId",retryStrategy = RetryType.ONLY_REMOTE,
            idempotentId = OrderIdempotentIdGenerate.class)
public boolean remoteRetryWithIdempotentId(OrderVo orderVo){
    double i = 1 / 0;
    return true;
}
```

在其中我们指定了幂等Id的生成规则为自定义的生成规则，然后我们在代码中继承IdempotentIdGenerate类，给出一个OrderIdempotentIdGenerate类，我们从IdempotentIdContext取出args参数，这个参数代表了我们从接口传入的参数，在这个接口中，我们取出args参数数组中下标为0的参数，转换为OrderVo类型，然后指定幂等Id的生成规则是取出orderId求md5。

```java
public class OrderIdempotentIdGenerate implements IdempotentIdGenerate {

    @Override
    public String idGenerate(IdempotentIdContext idempotentIdContext) throws Exception {
        Object[] args = idempotentIdContext.getArgs();
        OrderVo orderVo = (OrderVo) args[0];
        return SecureUtil.md5(orderVo.getOrderId());
    }

}
```

接下来我们测试看看效果吧。首先我们给出三个Post请求，其中请求1是原始请求，请求2中orderId和请求1一致仅仅修改source，请求3中source保持不变，仅仅修改orderId。
![image.png](./docs/images/远程重试12.png)
依次执行三个请求我们可以观察到，请求1和请求2执行之后仅有一条数据生成，幂等Id没有变化，也没有生成新的重试任务；而执行请求3之后生成了一条新的重试任务。
![image.png](./docs/images/远程重试13.png)

---

retryCompleteCallback参数允许我们自定义回调函数的逻辑。回调函数产生的过程我们在上一节中已经做过详细讲述，再次不再赘述了。接下来我们来看一下retryCompleteCallback指定的默认值SimpleRetryCompleteCallback类中实现了什么？
可以看到，默认的实现中什么都没有，也就是默认在回调的时候不会产生任何动作。

```java
@Component
@Slf4j
public class SimpleRetryCompleteCallback implements RetryCompleteCallback {

    @Override
    public void doSuccessCallback(String sceneName, String executorName, Object[] params) {

    }

    @Override
    public void doMaxRetryCallback(String sceneName, String executorName, Object[] params) {
    }
}
```

如果我们需要自行定义回调函数中的动作，那么我们可以自行实现RetryCompleteCallback类。我们还沿用上文中订单的案例。这次我们要求，当订单重试数据处理达到最大次数时，我们将失败的订单信息写入到数据库表中持久化。

```java
@Retryable(scene = "remoteRetryWithCompleteCallback",retryStrategy = RetryType.LOCAL_REMOTE,
           retryCompleteCallback = OrderCompleteCallback.class)
    public boolean remoteRetryWithCompleteCallback(OrderVo orderVo){
        Random random = new Random();
// 生成一个随机数，范围为0到1之间
double probability = random.nextDouble();
// 判断随机数是否小于等于0.5，即50%的概率
if (probability <= 0.5) {
    // 生成的结果在50%的概率下执行这里的逻辑
    throw new NullPointerException();
}
return true;
}
```

可以看到，在上述的案例中，我们指定了当产生回调时，使用我们指定的回调方法OrderCompleteCallback，我们让程序有50%的几率抛出异常。
然后我们来写OrderCompleteCallback方法，当服务端达到最大重试次数时，我们将失败的数据插入到fail_order表中；如果服务端回调客户端重试成功了，我们就删除该订单相关的所有数据。

```java
@Slf4j
    public class OrderCompleteCallback implements RetryCompleteCallback {

    @Autowired
    private FailOrderBaseMapper failOrderBaseMapper;

        /**
        * 重试成功后的回调函数
        * 参数1-场景名称
        * 参数2-执行器名称
        * 参数3-入参信息
        */
    @Override
    public void doSuccessCallback(String sceneName, String executorName, Object[] objects) {
        // 重试成功后删除失败表中的数据
        OrderVo orderVo = (OrderVo) objects[0];
        log.info("远程重试成功,场景{},执行器{},参数信息",sceneName,executorName, JSONUtil.toJsonStr(objects));
        failOrderBaseMapper.delete(
            new LambdaQueryChainWrapper<>(failOrderBaseMapper)
            .eq(FailOrderPo::getOrderId,orderVo.getOrderId())
        );
    }

        /**
        * 重试达到最大次数后的回调函数
        * 参数1-场景名称
        * 参数2-执行器名称
        * 参数3-入参信息
        */
    @Override
    public void doMaxRetryCallback(String sceneName, String executorName, Object[] objects) {
        OrderVo orderVo = (OrderVo) objects[0];
        log.info("远程重试达到最大限度,场景{},执行器{},参数信息",sceneName,executorName, JSONUtil.toJsonStr(objects));
        // 重试失败后插入订单失败信息
        failOrderBaseMapper.insert(FailOrderPo.builder()
                                   .orderId(orderVo.getOrderId())
                                   .sourceId(orderVo.getSource())
                                   .sceneName(sceneName)
                                   .executorName(executorName)
                                   .args(JSONUtil.toJsonStr(objects))
                                   .build());
    }
    }
```

---

retryMethod参数则允许我们可以来自定义重试函数的入口。
![image.png](./docs/images/远程重试14.png)
通过在retryable参数中执行方法需要执行的类，我们可以指定重试请求走到的方法。
首先我们来看一下retryable中的默认值ExecutorAnnotationMethod实现了什么？在ExecutorAnnotationMethod方法中，通过反射指定的默认重试方法就是接口的原重试方法。而我们如果要实现一个自定义的重试方法，则需要自己实现ExecutorMethod方法。

```java
@Slf4j
public class ExecutorAnnotationMethod implements ExecutorMethod {

    private RetryerInfo retryerInfo;

    public ExecutorAnnotationMethod(RetryerInfo retryerInfo) {
        this.retryerInfo = retryerInfo;
    }

    @Override
    public Object doExecute(Object params) {
        Class<?>[] paramTypes = retryerInfo.getMethod().getParameterTypes();
        LogUtils.info(log, "执行原重试方法：[{}],参数为：[{}]", retryerInfo.getExecutorClassName(), JsonUtil.toJsonString(params));

        if (paramTypes.length > 0) {
            return ReflectionUtils.invokeMethod(retryerInfo.getMethod(), retryerInfo.getExecutor(), (Object[]) params);
        } else {
            return ReflectionUtils.invokeMethod(retryerInfo.getMethod(), retryerInfo.getExecutor());
        }
    }
}


public interface ExecutorMethod {

    Object doExecute(Object params);

}
```

那我们来实现一个自定义的重试方法OrderRetryMethod:

```java
@Retryable(scene = "remoteRetryWithRetryMethod", retryStrategy = RetryType.ONLY_REMOTE,
           retryMethod = OrderRetryMethod.class)
public boolean remoteRetryWithRetryMethod(OrderVo orderVo){
    throw new NullPointerException();
}
```

其中OrderRetryMethod的实现方式为:

```java
@Component
public class OrderRetryMethod implements ExecutorMethod {
    @Override
    public Object doExecute(Object params) {
        // 将特定类型的 Object 对象指定为 Object[]
        Object[] args = (Object[]) params;
        OrderVo orderVo = (OrderVo) args[0];
        log.info("进入自定义的回调方法,参数信息是{}", JSONUtil.toJsonStr(orderVo));
        throw new ArithmeticException();
    }
}
```

在上层调用后我们观察控制台查看输出结果：
![image.png](./docs/images/远程重试15.png)
可以看到已经走进了我们的自定义方法中。

---

bizNo参数用于标识具有业务特点的值比如订单号、物流编号等，可以根据具体的业务场景生成。这个参数的指定主要是为了方便我们在控制台进行数据搜索。
我们给出一个简单的案例

```java
@Retryable(scene = "remoteRetryWithBizNo",retryStrategy = RetryType.ONLY_REMOTE,bizNo = "orderVo.orderId")
public boolean remoteRetryWithBizNo(OrderVo orderVo){
    throw new NullPointerException();
}
```

随后我们通过HTTP请求调用该接口
![image.png](./docs/images/远程重试16.png)
观察控制台可以看到，新注册的任务已经带上了业务编号。业务编号就是我们指定的orderId 9876543210。
![image.png](./docs/images/远程重试17.png)
展开查询条件后我们可以看到，我们可以通过业务编号来查询重试任务，这样子当重试的任务比较多时，我们就可以通过控制台进行查询。
![image.png](./docs/images/远程重试18.png)

### 5.2.3 了解ExecutorMethodRegister注解

在讲完RetryAble注解后，我们再来看Easy-Retry另外一个重要的注解——ExecutorMethodRegister。这个注解的功能是可以帮助我们在系统中手动创建重试任务。
当然，这个场景同样非常常用，我们可以看一下ExecutorMethodRegister可以应用在哪些场景中

- 内部类或是没有直接被外部调用的类
- 以及不方便直接添加自动重试的逻辑
- 指定部分数据进行重试

在这些场景中，我们可以采用手动上报的方法来执行重试逻辑。
首先需要说明的是，ExecutorMethodRegister是放置在类上的注解，而RetryAble是放置在方法上的注解，这是两个注解最大的不同，当然ExecutorMethodRegister也可以指定一些参数来实现自定义。
接下来我们来看一下ExecutorMethodRegister注解给出了哪些参数：

| 参数                  | 描述                                                         | 默认值                      | 必须指定 |
| --------------------- | ------------------------------------------------------------ | --------------------------- | -------- |
| scene                 | 场景                                                         | 无                          | ✅        |
| idempotentId          | 幂等id生成器                                                 | SimpleIdempotentIdGenerate  | ✅        |
| retryCompleteCallback | 服务端重试完成(重试成功、重试到达最大次数)回调客户端         | SimpleRetryCompleteCallback | ❌        |
| bizNo                 | 标识具有业务特点的值比如订单号、物流编号等，可以根据具体的业务场景生成，生成规则采用Spel表达式解析，如果对Spel表达式不了解可以参考： [spel表达式](https://docs.spring.io/spring-framework/docs/5.0.0.M5/spring-framework-reference/html/expressions.html) | 无                          | ❌        |
| timeout               | 同步(async:false)上报数据需要配置超时时间                    | 60 * 1000                   | ❌        |
| unit                  | 超时时间单位                                                 | TimeUnit.MILLISECONDS       | ❌        |
| forceReport           | 是否强制上报数据到服务端                                     | false                       | ❌        |
| async                 | 是否异步上报数据到服务端                                     | true                        | ❌        |

这些参数和上文中RetryAble注解的用法是一致的，大家可以参考上文中RetryAble注解的使用案例。
接下来我们直接通过一个案例来了解ExecutorMethodRegister注解的使用方法。首先我们要定义一个执行任务，在这里指定ExecutorMethodRegister注解及其相关参数，在这个案例中，我们指定场景的名称是myExecutorMethod。

```java
@ExecutorMethodRegister(scene = MyExecutorTask.SCENE)
@Slf4j
public class MyExecutorTask implements ExecutorMethod {
    /**
     * 自定义场景值
     */
    public final static String SCENE = "myExecutorMethod";

    @Override
    public Object doExecute(Object params) {
        // 将特定类型的 Object 对象指定为 Object[]
        Object[] args = (Object[]) params;
        OrderVo orderVo = (OrderVo) args[0];
        log.info("进入手动重试方法,参数信息是{}", JSONUtil.toJsonStr(orderVo));
        return true;
    }
}
```

然后我们需要在Service中通过模板方法来调用上面的执行任务，在这里我们同样要手动指定需要执行的场景、任务和具体参数信息。

```java
@Component
public class ExecutorMethodService {
    public void myExecutorMethod(){
        OrderVo orderVo = OrderVo.builder()
            .orderId("123456789")
            .source(1)
            .build();
        EasyRetryTemplate easyRetryTemplate = RetryTaskTemplateBuilder.newBuilder()
            // 手动指定场景名称
            .withScene(MyExecutorTask.SCENE)
            // 指定要执行的任务
            .withExecutorMethod(MyExecutorTask.class)
            // 指定参数
            .withParam(orderVo)
            .build();
        // 执行模板
        easyRetryTemplate.executeRetry();
    }

}
```

执行后我们可以看到对应的任务已经出现在了任务管理列表中。
![image.png](./docs/images/远程重试19.png)
同样观察服务台显示的信息，我们可以看到在我们指定的重试任务中，执行的自定义重试方法打印出了我们的参数信息。
![image.png](./docs/images/远程重试20.png)

## 5.4 服务监控与告警

在控制台中我们可以点击组管理中的编辑
![image.png](./docs/images/远程重试21.png)
进入基础信息配置中，在这里我们可以在通知配置中管理告警信息，在这里我们可以选择钉钉告警、飞书告警和邮件告警三种形式。随后我们可以选择通知场景和对应的阈值，选择后我们再配置属性中贴入我们相关的配置即可实现告警。
![image.png](./docs/images/远程重试22.png)

# 6、结语

以上就是我们对于重试的思考和Easy-Retry的实践了，项目中的相关源码大家可以查看Gitee:
[https://gitee.com/byteblogs168/easy-retry-demo.git](https://gitee.com/byteblogs168/easy-retry-demo.git)
当然，如果你有兴趣加入到Easy-Retry和我们一起共建，也欢迎联系博主。


