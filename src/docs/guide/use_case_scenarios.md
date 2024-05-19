# 场景应用 (Use Case Scenarios)

本文件详细介绍了项目的实际应用场景和使用案例。

::: warning 🌈特别说明
为了小伙伴们能更快了解SnailJob的使用场景和优势，以下新增了一些模拟案例仅供大家参考。
同时期待大家积极参与并分享自己在项目中使用SnailJob的经验和案例，共同推动技术的发展和应用的实践。
这样可以让更多需要使用SnailJob的小伙伴们找到适合自己的应用场景， 并充分利用SnailJob的优势，以提升系统的可靠性和稳定性。
:::

## 强通知场景

::: theorem 强通知性
在某些业务场景下，需要强制保证将通知、消息等数据发送到目标端接口，但由于网络的不确定性以及目标系统、应用、服务的不确定性，可能会造成通知消息的发送失败。
此类场景下可以使用`LOCAL_REMOTE`或者`ONLY_REMOTE`模式进行重试。
:::

### 发送MQ场景
众所周知消息队列的异步、削峰、解耦优点, 在业务系统承担着十分重要的角色，如果保障消息的可达性就尤为重要了。
下面模拟一个常见的的下单流程。⬇️ ⬇️ ⬇️
<img src="/img/强达性_MQ1.png" class="no-zoom" style="zoom: 100%;">
订单中心下单完成后回抛出下单成功消息从而解耦了订单和其他业务系统的耦合关系，其他相关的业务系统只需要监听订单的下单成功的消息即可完成自己的业务逻辑。
但是若由于网络的不稳定、消息队列故障等等，可能导致消息未发送出去，这时候就需要增加重试流程来保障消息的强可达性。

<img src='/img/强达性_MQ2.png" class="no-zoom" style="zoom: 100%;">
然后接入SnailJob后将变的非常简单，您只需要简单的一个注解就保障强可达性。

> 以下代码案例仅供参考

```java
@Retryable(scene = "create-order-success", retryStrategy = RetryType.ONLY_REMOTE)
public void sendCreateOrderSuccessMessage(Message message) {
    ......
    
    // 发送消息
    mqProducer.publish("主题", "key", message);
}
```
如果您不想使用注解的方式您可是使用手动模式
```java
public void createOrder(Order order) {

    // 其他逻辑
    // 发送消息
    
    try {
        mqProducer.publish("主题", "key", order);
    } catch (Exception e) {
        // 发送出现异常
        SnailJobTemplate retryTemplate = RetryTaskTemplateBuilder.newBuilder()
          .withExecutorMethod(RetrySendMqMessageExecutorMethod.class)
          .withParam(order)
          .withScene(RetrySendMqMessageExecutorMethod.SCENE)
          .build();
        retryTemplate.executeRetry();
    }
}
```

```java
@ExecutorMethodRegister(scene = RetrySendMqMessageExecutorMethod.SCENE, async = true, forceReport = true)
public class RetrySendMqMessageExecutorMethod implements ExecutorMethod {

    public static final String SCENE = "retrySendMqMessageExecutorMethod";

    @Override
    public Object doExecute(Object objs) {
        Object[] params = (Object[]) objs;
        // 发送消息
        mqProducer.publish("主题", "key", params[0]);
        return null;
    }
}    

```

### 回调场景
这里引用一个使用SnailJob的小伙伴[重试框架-SnailJob接入之路](https://juejin.cn/post/7243677232836018233)，他们线上真实的使用场景。
他们开发了一个paas平台, 其中功能模块有“事件中心”，“审核中心”，“支付中心”等相关的一些组件。他们都有一个类似的东西，当我发起事件的时候，需要将事件通知到其他的应用，
比如【审核中心】当我审核的时候需要将审核结果返回给其他应用，【支付中心】当我支付完成后也会将结果推送给其他应用。然而，我们的其他应用可能会有不可用的状态，
可能会导致回调通知的时候会报错， 所以不难想象到我们需要做一个重试机制来保障回调的可达性。

下面是一个支付中心的调用过程 ⬇️ ⬇️ ⬇️
<img src="/img/回调场景.png" class="no-zoom" style="zoom: 100%;">
用户在商品中心下单然后通过支付中心唤起收银台进行付款，第三方支付平台回调支付中心，支付平台回调商品中心完成业务流程；但是若回调失败了就会导致商品中心和
支付中心数据不一致，这肯定不是我们所期望的。所以需要新增一个重试机制来保障数据的最终一致性。

> 以下代码案例仅供参考

```java
@Retryable(scene = "callbackProductCenter", retryStrategy = RetryType.ONLY_REMOTE)
public void callbackProductCenter(CallbackDTO callback) {
    ......
    
    // 回调商品中心
    String responseStr = restTemplate.postForObject("第三方接口", "参数", String.class);
}
```
如果您不想使用注解的方式您可是使用手动模式
```java
public void callbackProductCenter(CallbackDTO callback) {

    // 其他逻辑
    try {
        // 回调商品中心
        String responseStr = restTemplate.postForObject("第三方接口", "参数", String.class);
    } catch (Exception e) {
        // 发送出现异常
        SnailJobTemplate retryTemplate = RetryTaskTemplateBuilder.newBuilder()
          .withExecutorMethod(RetrySendMqMessageExecutorMethod.class)
          .withParam(order)
          .withScene(RetrySendMqMessageExecutorMethod.SCENE)
          .build();
        retryTemplate.executeRetry();
    }
}
```

```java
@ExecutorMethodRegister(scene = CallbackProductCenterExecutorMethod.SCENE, async = true, forceReport = true)
public class CallbackProductCenterExecutorMethod implements ExecutorMethod {

    public static final String SCENE = "callbackProductCenterExecutorMethod";

    @Override
    public Object doExecute(Object objs) {
        Object[] params = (Object[]) objs;
        // 回调商品中心
        String responseStr = restTemplate.postForObject("第三方接口", "参数", String.class);
        return null;
    }
}    
```

### 异步场景
在一些核心的接口上，我们总是想不断的提高接口的性能，我们知道提高接口性能的方式常用的就是异步、缓存、并行等，这里我们说说异步，比如下面一个场景
<img src="/img/异步场景.png" class="no-zoom" style="zoom: 100%;">
下单完成后会有一些非核心的流程，主要特点实时性要求不高、耗时比较高的操作等；一般会把这些流程进行异步化操作
进程异步化: 比如可以通过发送MQ消息, 如果保存MQ的可达性可以参考`发送MQ场景`⬆️⬆️⬆️
线程异步化: 开启一个异步线程进行异步处理, 但是出现异常就会导致数据丢失，因此需要增加重试保证数据的一致性,
可以使用`LOCAL_REMOTE`先本地重试，如果本地重试仍未解决就上报服务端

> 以下代码案例仅供参考

```java
@Retryable(scene = "sendEmail", retryStrategy = RetryType.LOCAL_REMOTE)
public void sendEmail(EmailDTO email) {
    ......
    
    // 发送下单确认邮件
    String responseStr = restTemplate.postForObject("邮箱地址", email, String.class);
}
```