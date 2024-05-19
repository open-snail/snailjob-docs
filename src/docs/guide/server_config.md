# 服务端配置(Server Config)

```bash
# ------------------基础配置-----------------

# 服务端netty的端口号
snail-job.netty-port= 1789
# 合并日志默认保存天数
snail-job.merge-Log-days=1
# 合并日志默认的条数
snail-job.merge-Log-num=500
# 配置每批次拉取重试数据的大小
snail-job.retry-pull-page-size=100
# 配置服务端 Netty 端口
snail-job.netty-port=1788
# 配置重试和死信表的分区总数
snail-job.total-partition=2
# 配置一个客户端每秒最多接收的重试数量指令
snail-job.limiter=10
# 配置号段模式下的步长
snail-job.step=100
# 配置日志保存时间（单位：天）
snail-job.log-storage=90
# bucket的总数量    
snail-job.bucket-total=128
# Dashboard 任务容错天数
snail-job.summary-day=7
# 配置负载均衡周期时间
snail-job.load-balance-cycle-time=10

# ------------------回调配置-----------------
# 回调uniqueId前缀
snail-job.callback.prefix=CB
# 配置回调的最大执行次数
snail-job.callback.max-count=288
# 配置回调触发的间隔时间
snail-job.callback.trigger-interval=900

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


```