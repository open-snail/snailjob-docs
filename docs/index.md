---
home: true
heroImage: /img/logo-mini.png
heroText: Easy Retry
tagline: 🚀 一款提高分布式业务系统一致性的分布式任务重试与高性能任务调度平台
actionText:  ️v2.4.0 全新发布 →
actionLink: /pages/d1d1da/
bannerBg: none # auto => 网格纹背景(有bodyBgImg时无背景)，默认 | none => 无 | '大图地址' | background: 自定义背景样式       提示：如发现文本颜色不适应你的背景时可以到palette.styl修改$bannerTextColor变量

features: # 可选的
  - title: 🌸 分布式重试任务
    details:  支持多样化的重试类型、退避策略、流量管控等
  - title: 🌼 分布式调度任务
    details:  提供丰富的任务触发策略、任务编排、任务分片、停止恢复、失败重试等
  - title: 🌹 日志管理
    details:  支持重试任务、调度任务日志查看功能等
  - title: 🌻 数据管控
    details:  支持用户组级别的数据隔离
  - title: 🍀 数据大盘
    details:  提供丰富的仪表盘,可对各种维度数据进行统计汇总,可便分析总结
  - title: 🌺 支持多样化的告警方式
    details:  邮箱、企业微信、钉钉、飞书
# 文章列表显示方式: detailed 默认，显示详细版文章列表（包括作者、分类、标签、摘要、分页等）| simple => 显示简约版文章列表（仅标题和日期）| none 不显示文章列表
postList: none
---
## <EasyRetryIcon iconType='icon-gengxintexing' /> 特性

* **易用性**
  业务接入成本小。避免依赖研发人员的技术水平，保障稳定性
* **灵活性**
  能够动态调整配置,启动/停止任务,以及终止运行中的任务
* **操作简单**
  分钟上手，支持WEB页面对任务数据CRUD操作。
* **数据大盘**
  实时管控系统任务数据
* **分布式重试任务**
  支持多样化退避策略、多样化重试类型、流量管控等
* **分布式调度任务**
  提供丰富的任务触发策略、任务编排、任务分片、停止恢复、失败重试等
* **任务数据管理**
  可以做到数据不丢失、数据一键回放
* **容器化部署**
  服务端支持docker容器部署
* **高性能调度平台**
  支持服务端节点动态扩容和缩容
* **支持多样化的告警方式**
  邮箱、企业微信、钉钉、飞书

<Notice />
<br/>
<br/>

## <EasyRetryIcon iconType='icon-jiagoutu' /> 设计思想

[//]: # (### 系统架构图)

[//]: # ()
[//]: # (<img :src="$withBase&#40;'/img/系统架构图- 2.0.png'&#41;" class="no-zoom" style="zoom: 100%;">)

[//]: # (### 系统功能架构图)
<img :src="$withBase('/img/系统功能架构图-v2.4.0.png')" class="no-zoom" style="zoom: 100%;">


## ✨ 当前最新版本
```java
// Spring Boot 2.x
<dependency>
    <groupId>com.aizuda</groupId>
    <artifactId>easy-retry-client-starter</artifactId>
    <version>2.4.0</version>
</dependency>

// 重试模块
<dependency>
    <groupId>com.aizuda</groupId>
    <artifactId>easy-retry-client-core</artifactId>
    <version>2.4.0</version>
</dependency>

// 任务调度模块
<dependency>
    <groupId>com.aizuda</groupId>
    <artifactId>easy-retry-client-job-core</artifactId>
    <version>2.4.0</version>
</dependency>
// Spring Boot 3.x 暂不升级与2.3.0版本一致
<dependency>
  <groupId>com.aizuda</groupId>
  <artifactId>easy-retry-client-starter</artifactId>
  <version>3.0.0</version>
</dependency>
```
<br/>
<br/>

## <EasyRetryIcon iconType='icon-codelibrary-fill' /> 代码托管
<CodeHosting />

<br/>
<br/>

## <EasyRetryIcon iconType='icon-zuzhichengyuan' /> 组织成员
<Member />

<br/>
<br/>

## <EasyRetryIcon iconType='icon-youqinglianjie' />  友情链接
<FriendlyLinks />

<br/>
<br/>

## <EasyRetryIcon iconType='icon-canyuzhe_canyuzhe' /> 参与研发
欢迎各路好汉一起来参与完善 EasyRetry，我们期待你的 PR！
如果想贡献，请先查看[参与开发](/pages/5f5ef1/)。

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
