# Spi扩展点

## 【监听器】 SnailJobListener
### 实现接口SnailJobListener
```java
@Slf4j
public class MySnailJobListener implements SnailJobListener {

    @Override
    public void beforeRetry(final String sceneName, final String executorClassName, final Object[] params) {
        log.info("------> beforeRetry sceneName:[{}] executorClassName:[{}] params:[{}]",
            sceneName, executorClassName, JsonUtil.toJsonString(params));
    }

    @Override
    public void successOnRetry(final Object result, final String sceneName, final String executorClassName) {
        log.info("------> successOnRetry sceneName:[{}] executorClassName:[{}] result:[{}]",
            sceneName, executorClassName, JsonUtil.toJsonString(result));
    }

    @Override
    public void failureOnRetry(final String sceneName, final String executorClassName, final Throwable e) {
        log.info("------> failureOnRetry sceneName:[{}] executorClassName:[{}]", sceneName, executorClassName, e);
    }
}

```
### 注册MySnailJobListener
> **执行的顺序按照文件中的每行的先后顺序**
- 添加目录META-INFO/services
- 添加文件com.aizuda.snailjob.client.core.event.SnailJobListener
- 在上述文件新增一行记录为com.example.snailjob.listener.MyEasyRetryListener


## 【参数序列】 RetryArgSerializer
> 完整代码:

### 实现接口RetryArgSerializer
参考HessianSerializer

### 注册RetryArgSerializer
> 若存在多条记录则取第一条

- 添加目录META-INFO/services
- 添加文件com.aizuda.snailjob.client.core.RetryArgSerializer
- 在上述文件新增一行记录为com.aizuda.snailjob.client.core.serializer.HessianSerializer

## 【重试现场记录器】 RetryArgSerializer
> 完整代码:

### 实现接口RetrySiteSnapshotContext

```java
public class TTLRetrySiteSnapshotContext<T> implements RetrySiteSnapshotContext<T> {

    private final ThreadLocal<T> threadLocal;

    public TTLRetrySiteSnapshotContext() {
        this.threadLocal =  new TransmittableThreadLocal<>();
    }

    @Override
    public void set(final T value) {
        threadLocal.set(value);
    }

    @Override
    public void remove() {
        threadLocal.remove();
    }

    @Override
    public T get() {
        return threadLocal.get();
    }
}
```

### 注册RetrySiteSnapshotContext
> 若存在多条记录则取第一条

- 添加目录META-INFO/services
- 添加文件com.aizuda.snailjob.client.core.RetrySiteSnapshotContext
- 在上述文件新增一行记录为com.example.snailjob.spi.TTLRetrySiteSnapshotContext

## 【表达式解析器】生成BizNo表达式
> 目前系统内置了
>
> 1.【Aviator表达式】AviatorExpressionEngine
>
> 2.【Spel表达式解析引擎】 SpELExpressionEngine
>
> 3.【QL表达式解析器】QLExpressEngine
>
> 若存在多条记录则取第一条

### 注册表达式解析器

- 添加目录META-INFO/services
- 添加文件com.aizuda.snailjob.common.core.expression.ExpressionEngine
- 在上述文件新增一行记录为com.aizuda.snailjob.common.core.expression.strategy.AviatorExpressionEngine
- 添加对应的maven
```java
// com.aizuda.snailjob.common.core.expression.strategy.AviatorExpressionEngine
 <dependency>
    <groupId>com.googlecode.aviator</groupId>
    <artifactId>aviator</artifactId>
    <version>5.3.3</version>
</dependency>
// com.aizuda.snailjob.common.core.expression.strategy.QLExpressEngine
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>QLExpress</artifactId>
    <version>3.3.1</version>
</dependency>
```