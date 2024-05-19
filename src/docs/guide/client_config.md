# 客户端配置(Client Config)

```bash
# ------------------基础配置-----------------

# 服务端的地址，若服务端集群部署则此处配置域名
snail-job.server.host= 127.0.0.1
# 服务端netty的端口号
snail-job.server.port= 1788
# 指定客户端IP，不配置则取本地IP
snail-job.host= 127.0.0.1
# 指定客户端端口，不配置则默认1789
snail-job.port= 1789
# 名称空间ID，若不填为默认空间(764d604ec6fc45f68cd92514c40e9e1a)
snail-job.namespace= 764d604ec6fc45f68cd92514c40e9e1a
# 令牌，若不填则默认为(SJ_Wyz3dmsdbDOkDujOTSSoBjGQP1BMsVnj)
snail-job.token= 764d604ec6fc45f68cd92514c40e9e1a


# ------------------邮箱配置-----------------

# 开关
snail-job.mail.enabled = true
# SMTP服务器域名
snail-job.mail.host = xxx
# SMTP服务端口
snail-job.mail.port = 465
# 是否需要用户名密码验证
snail-job.mail.auth = true
# 用户名
snail-job.mail.user = demo
# 密码
snail-job.mail.pass = xxxx
# 发送方，遵循RFC-822标准
snail-job.mail.from = xxx.qq.com
# 使用 STARTTLS安全连接，STARTTLS是对纯文本通信协议的扩展。它将纯文本连接升级为加密连接（TLS或SSL）， 而不是使用一个单独的加密通信端口。
snail-job.mail.starttlsEnable = false
# 使用 SSL安全连接
snail-job.mail.sslEnable = false
# SMTP超时时长，单位毫秒，缺省值不超时
snail-job.mail.timeout = 0
# Socket连接超时值，单位毫秒，缺省值不超时
snail-job.mail.connectionTimeout = 0

# ------------------重试数据批量上报滑动窗口配置-----------------
# 窗口期单位
snail-job.retry.reportSlidingWindow.chrono-unit= seconds
# 窗口期时间长度
snail-job.retry.reportSlidingWindow.duration= 10
# 总量窗口期阈值    
snail-job.retry.reportSlidingWindow.total-threshold= 50
# 窗口数量预警
snail-job.retry.reportSlidingWindow.window-total-threshold= 150

# ------------------重试、调度日志远程上报滑动窗口配置-----------------
# 窗口期单位
snail-job.retry.logSlidingWindow.chrono-unit= seconds
# 窗口期时间长度
snail-job.retry.logSlidingWindow.duration= 5
# 总量窗口期阈值    
snail-job.retry.logSlidingWindow.total-threshold= 50
# 窗口数量预警
snail-job.retry.logSlidingWindow.window-total-threshold= 150 

# ------------------调度线程池配置-----------------
snail-job.dispatcherThreadPool.corePoolSize = 16
snail-job.dispatcherThreadPool.maximumPoolSize = 16
snail-job.dispatcherThreadPool.keepAliveTime = 1
snail-job.dispatcherThreadPool.timeUnit = SECONDS
snail-job.dispatcherThreadPool.queueCapacity = 10000
```