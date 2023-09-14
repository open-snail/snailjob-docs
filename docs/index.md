---
home: true
heroImage: /img/logo-mini.png
heroText: Easy Retry
tagline: 🚀致力提高分布式业务系统一致性的分布式重试平台
actionText: ️v2.3.0 & v3.0.0 全新发布 →
actionLink: /pages/d1d1da/
bannerBg: none # auto => 网格纹背景(有bodyBgImg时无背景)，默认 | none => 无 | '大图地址' | background: 自定义背景样式       提示：如发现文本颜色不适应你的背景时可以到palette.styl修改$bannerTextColor变量

features: # 可选的
  - title: 🌸 管控重试流量
    details: 预防重试风暴，及早发现和预警，并且提供流程管理手段
  - title: 🌼 接入简单
    details: 一分钟上手，支持WEB页面对重试数据CRUD操作;业务接入成本小。避免依赖研发人员的技术水平，保障重试的稳定性
  - title: 🌹 重试数据管理
    details: 能够动态调整配置,启动/停止任务,以及终止运行中的重试数据; 可以做到重试数据不丢失、重试数据一键回放
  - title: 🌻 多样化重试类型
    details: 支持ONLY_LOCAL、ONLY_REMOTE、LOCAL_REMOTE多种重试类型
  - title: 🌺 支持多样化的告警方式
    details: 邮箱、企业微信、钉钉、飞书等
  - title: 🍀 多样化退避策略
    details: Cron、固定间隔、等级触发、随机时间触发等
# 文章列表显示方式: detailed 默认，显示详细版文章列表（包括作者、分类、标签、摘要、分页等）| simple => 显示简约版文章列表（仅标题和日期）| none 不显示文章列表
postList: none
---

## <EasyRetryIcon iconType='icon-shipin' /> 视频教程
> 从0到1快速了解分布式重试组件EasyRetry
> <br/><br/>
> [<EasyRetryIcon iconType='icon-jinritoutiao'/>](https://www.ixigua.com/i7269575684715086394/) | [<EasyRetryIcon iconType='icon-wf_Bzhan'/>](https://www.bilibili.com/video/BV1Yu4y1k7WU/)


## ✨ 当前最新版本
```java
// Spring Boot 2.x
<dependency>
    <groupId>com.aizuda</groupId>
    <artifactId>easy-retry-client-starter</artifactId>
    <version>2.2.0</version>
</dependency>

// Spring Boot 3.x
<dependency>
  <groupId>com.aizuda</groupId>
  <artifactId>easy-retry-client-starter</artifactId>
  <version>3.0.0</version>
</dependency>
```

## <EasyRetryIcon iconType='icon-gengxintexing' /> 特性
* **易用性**
  业务接入成本小。避免依赖研发人员的技术水平，保障重试的稳定性
* **灵活性**
  能够动态调整配置,启动/停止任务,以及终止运行中的重试数据
* **操作简单**
  分钟上手，支持WEB页面对重试数据CRUD操作。
* **数据大盘**
  实时管控系统重试数据
* **多样化退避策略**
  Cron、固定间隔、等级触发、随机时间触发
* **容器化部署**
  服务端支持docker容器部署
* **高性能调度平台**
  支持服务端节点动态扩容和缩容
* **多样化重试类型**
  支持ONLY_LOCAL、ONLY_REMOTE、LOCAL_REMOTE多种重试类型
* **重试数据管理**
  可以做到重试数据不丢失、重试数据一键回放
* **支持多样化的告警方式**
  邮箱、企业微信、钉钉、飞书
  
<Notice />

## <EasyRetryIcon iconType='icon-codelibrary-fill' /> 代码托管
<CodeHosting />

<br/>
<br/>

## <EasyRetryIcon iconType='icon-canyuzhe_canyuzhe' /> 参与研发
欢迎各路好汉一起来参与完善 EasyRetry，我们期待你的 PR！
如果想贡献，请先查看[参与开发](/pages/5f5ef0/)。
<br/>
<br/>

## <EasyRetryIcon iconType='icon-duibi' /> 重试方案对比

<img :src="$withBase('/img/retry-strategy.png')" class="no-zoom" style="zoom: 100%;">

<br/>
<br/>

## <EasyRetryIcon iconType='icon-jiagoutu' /> 设计思想 

[//]: # (### 系统架构图)

[//]: # ()
[//]: # (<img :src="$withBase&#40;'/img/系统架构图- 2.0.png'&#41;" class="no-zoom" style="zoom: 100%;">)

[//]: # (### 系统功能架构图)
<img :src="$withBase('/img/系统功能架构图-v2.0.png')" class="no-zoom" style="zoom: 100%;">

## <EasyRetryIcon iconType='icon-zuzhichengyuan' /> aizuda组织成员
<Member />

<br/>
<br/>

## <EasyRetryIcon iconType='icon-youqinglianjie' />  友情链接
<FriendlyLinks />

<p align="center">
  <a class="become-sponsor" href="/pages/793dcb/">支持这个项目</a>
</p>

<style>
.become-sponsor {
  padding: 8px 20px;
  display: inline-block;
  color: #11a8cd;
  border-radius: 30px;
  box-sizing: border-box;
  border: 1px solid #11a8cd;
}
</style>

<br/>

<!-- AD -->
<div class="wwads-cn wwads-horizontal page-wwads" data-id="136"></div>
<style>
  .page-wwads{
    width:100%!important;
    min-height: 0;
    margin: 0;
  }
  .page-wwads .wwads-img img{
    width:80px!important;
  }
  .page-wwads .wwads-poweredby{
    width: 40px;
    position: absolute;
    right: 25px;
    bottom: 3px;
  }
  .wwads-content .wwads-text, .page-wwads .wwads-text{
    height: 100%;
    padding-top: 5px;
    display: block;
  }
</style>
