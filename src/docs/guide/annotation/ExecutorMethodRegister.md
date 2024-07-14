# ExecutorMethodRegister注解

::: warning 🌈特别说明
ExecutorMethodRegister的功能是可以帮助我们在系统中手动创建重试任务

源码地址: [snail-job-demo](https://gitee.com/opensnail/snail-job-demo)
:::

## ExecutorMethodRegister使用场景
- 内部类或是没有直接被外部调用的类
- 以及不方便直接添加自动重试的逻辑
- 指定部分数据进行重试

在这些场景中，我们可以采用手动上报的方法来执行重试逻辑。
首先需要说明的是，ExecutorMethodRegister是放置在类上的注解，而RetryAble是放置在方法上的注解，这是两个注解最大的不同，当然ExecutorMethodRegister也可以指定一些参数来实现自定义。
接下来我们来看一下ExecutorMethodRegister注解给出了哪些参数：

| 参数                  | 描述                                                 | 默认值                      | 必须指定 |
| --------------------- |----------------------------------------------------| --------------------------- | -------- |
| scene                 | 场景                                                 | 无                          | ✅        |
| idempotentId          | 幂等id生成器                                            | SimpleIdempotentIdGenerate  | ✅        |
| retryCompleteCallback | 服务端重试完成(重试成功、重试到达最大次数)回调客户端                        | SimpleRetryCompleteCallback | ❌        |
| bizNo                 | 标识具有业务特点的值比如订单号、物流编号等，可以根据具体的业务场景生成，具体的生产规则参考:[Spi扩展点](/docs/guide/Spi) | 无                          | ❌        |
| timeout               | 同步(async:false)上报数据需要配置超时时间                        | 60 * 1000                   | ❌        |
| unit                  | 超时时间单位                                             | TimeUnit.MILLISECONDS       | ❌        |
| forceReport           | 是否强制上报数据到服务端                                       | false                       | ❌        |
| async                 | 是否异步上报数据到服务端                                       | true                        | ❌        |

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
        SnailJobTemplate snailJobTemplate = RetryTaskTemplateBuilder.newBuilder()
            // 手动指定场景名称
            .withScene(MyExecutorTask.SCENE)
            // 指定要执行的任务
            .withExecutorMethod(MyExecutorTask.class)
            // 指定参数
            .withParam(orderVo)
            .build();
        // 执行模板
        snailJobTemplate.executeRetry();
    }

}
```

执行后我们可以看到对应的任务已经出现在了任务管理列表中。

<img src="/img/远程重试19.png" class="no-zoom" style="zoom: 100%;">

同样观察服务台显示的信息，我们可以看到在我们指定的重试任务中，执行的自定义重试方法打印出了我们的参数信息。

<img src="/img/远程重试20.png" class="no-zoom" style="zoom: 100%;">
