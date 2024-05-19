# 性能指标 (Performance Metrics)

本文件详细介绍了项目的性能指标和测量方法，确保系统在不同负载下的稳定性和高效性。

## 配置信息
- CPU：4核
- 内存: 16G
- 工具: apache jmeter

## 压测场景【一】
- 场景: 远程异步上报
- 接口: [/remote/retry](http://preview.easyretry.com:8018/swagger-ui/index.html#/%E8%BF%9C%E7%A8%8B%E9%87%8D%E8%AF%95%E6%A1%88%E4%BE%8B%E3%80%90RetryType.ONLY_REMOTE%E3%80%91/remoteUsingGET)

### 压测配置
#### 20个并发持续5分钟
- 压测报告 ⏬⏬⏬
  <br/><br/>
  <img src="/img/loadtest20async.png" class="no-zoom" style="zoom: 100%;">

- 生成任务数 ⏬⏬⏬
  <br/><br/>
  <img src="/img/consoletasktotal20.png" class="no-zoom" style="zoom: 100%;">

#### 40个并发持续5分钟

- 压测报告 ⏬⏬⏬
  <br/>
  <img src="/img/loadtest40.png" class="no-zoom" style="zoom: 100%;">

- 生成任务数 ⏬⏬⏬
  <br/>
  <img src="/img/consoletasktota40.png" class="no-zoom" style="zoom: 100%;">

#### 60个并发持续5分钟
<br/>

- 压测报告 ⏬⏬⏬
  <br/><br/>
  <img src="/img/loadtest60.png" class="no-zoom" style="zoom: 100%;">

- 生成任务数 ⏬⏬⏬
  <br/><br/>
  <img src="/img/consoletasktotal60.png" class="no-zoom" style="zoom: 100%;">

## 压测场景【二】
- 场景: 远程同步上报
- 接口: [/remote/retry/sync](http://preview.easyretry.com:8018/swagger-ui/index.html#/%E8%BF%9C%E7%A8%8B%E9%87%8D%E8%AF%95%E6%A1%88%E4%BE%8B%E3%80%90RetryType.ONLY_REMOTE%E3%80%91/remoteSyncUsingGET)

### 压测配置
#### 20个并发持续5分钟
- 压测报告 ⏬⏬⏬
  <br/>
  <img src="/img/loadtest20sync.png" class="no-zoom" style="zoom: 100%;">

- 生成任务数 ⏬⏬⏬
  <br/>
  <img src="/img/consoletasktotal20sync.png" class="no-zoom" style="zoom: 100%;">

#### 40个并发持续5分钟

- 压测报告 ⏬⏬⏬
  <br/>
  <img src="/img/loadtest40sync.png" class="no-zoom" style="zoom: 100%;">

- 生成任务数 ⏬⏬⏬
  <br/>
  <img src="/img/consoletasktota40sync.png" class="no-zoom" style="zoom: 100%;">

#### 60个并发持续5分钟
- 压测报告 ⏬⏬⏬
  <br/>
  <img src="/img/loadtest60.png" class="no-zoom" style="zoom: 100%;">

- 生成任务数 ⏬⏬⏬
  <br/>
  <img src="/img/consoletasktotal60sync.png" class="no-zoom" style="zoom: 100%;">