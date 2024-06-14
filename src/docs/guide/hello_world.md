# Hello Word


::: warning 🌈特别说明
从一个最简单的案例上手snail-job

源码地址: [snail-job-demo](https://gitee.com/opensnail/snail-job-demo)
:::

我们首先创建一个SpringBoot应用，引入Maven坐标

正式发布版 点击查看[最新版本号](https://central.sonatype.com/artifact/com.aizuda/snail-job-client-starter)
```java
<dependencies>
    <dependency>
        <groupId>com.aizuda</groupId>
        <artifactId>snail-job-client-starter</artifactId>
        <version>{Latest Version}</version>
    </dependency>
    // 重试模块
    <dependency>
        <groupId>com.aizuda</groupId>
        <artifactId>snail-job-client-retry-core</artifactId>
        <version>{Latest Version}</version>
    </dependency>
    // 定时任务
    <dependency>
        <groupId>com.aizuda</groupId>
        <artifactId>snail-job-client-job-core</artifactId>
        <version>{Latest Version}</version>
    </dependency>
</dependencies>
```

然后我们在SpringBoot的启动项上增加注解@EnableSnailJob

```java
@SpringBootApplication
@EnableEasyRetry(group = "snail_job_demo_group")
public class SnailJobSpringbootApplication {
    public static void main(String[] args) {
        SpringApplication.run(EasyRetrySpringbootApplication.class, args);
    }
}
```

这个启动类中写入的snail_job_demo_group对应的是我们控制台中的组名称

<img src="/img/建立控制台上的组.png">

在控制台中我们点击 - 总在线机器豆腐块即可看到当前的客户端已经注册到了我们的机器列表中了

<img src="/img/查看机器列表.png" class="no-zoom" style="zoom: 100%;">

## 重试案例演示
随后我们来写一个最简单的Service服务应用

```java
@Component
public class LocalRetryService {
    @Retryable(scene = "localRemote")
    public void localRemote(){
        System.out.println("local retry 方法开始执行");
        double i = 1 / 0;
    }
}
```

大家可以看到这段代码中我们添加了一个注解@Retryable(scene = "localRemote")，在其中指定了参数值scene，这个scene对应着控制台中的场景，我们可以在这里理解为场景就是组下面的唯一标识。
那么接下来我们来测试一下这段代码

```java
@Test
public void localRemoteTest(){
    localRetryService.localRemote();
}
```

当不指定重试次数时，默认会重试三次，所以我们可以看到控制台上供给打印了四次"local retry 方法开始执行"后才抛出ArithmeticException异常信息。

<img src="/img/SnailJob启动案例.png" class="no-zoom" style="zoom: 100%;">

## 定时任务案例演示
### 注解方式
#### 配置定时任务`testJobExecutor`

<img src="/img/定时任务配置-注解.png" class="no-zoom" style="zoom: 100%;">

#### 编写执行器

```java
@Component
@JobExecutor(name = "testJobExecutor")
public class TestAnnoJobExecutor {

    public ExecuteResult jobExecute(JobArgs jobArgs) {
        return ExecuteResult.success("注解方式-测试成功");
    }
}
```

#### 执行结果演示
<img src="/img/执行结果.png" class="no-zoom" style="zoom: 100%;">


### 继承类 AbstractJobExecutor
#### 配置定时任务`testClassJobExecutor`

<img src="/img/定时任务配置-继承类.png" class="no-zoom" style="zoom: 100%;">

#### 编写执行器

```java
@Component
public class TestClassJobExecutor extends AbstractJobExecutor {

    @Override
    protected ExecuteResult doJobExecute(JobArgs jobArgs) {
        return ExecuteResult.success("继承AbstractJobExecutor-测试成功");
    }
}
```

#### 执行结果演示
<img src="/img/执行结果-继承类.png" class="no-zoom" style="zoom: 100%;">
