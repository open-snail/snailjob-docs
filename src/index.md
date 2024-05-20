---
layout: home

hero:
  name: 'Snail Job'
#  text: '分布式定时任务|分布式重试任务平台'
  tagline: 🚀 灵活，可靠和快速的分布式任务重试和分布式任务调度平台
  image:
    src: /sj.svg
    alt: 灵活，可靠和快速的分布式任务重试和分布式任务调度平台
  actions:
    - theme: brand
      text: ️v1.0.0 全新发布 ->
      link: /docs/introduce/preface
    - theme: alt
      text: 在线体验 ->
      link: /docs/preview

features:
  - icon: 🌸
    title: 分布式重试任务
    details: 支持多样化的重试类型、退避策略、流量管控等
  - icon: 🌼
    title: 分布式调度任务
    details: 提供丰富的任务触发策略、任务编排、任务分片、停止恢复、失败重试等
  - icon: 🌻
    title: 可视化任务编排
    details: 仿钉钉工作流引擎设计，具备良好的用户体验、精美的界面、简便直观的操作特性
  - icon: 🌺
    title: 支持多样化的告警方式
    details: 邮箱、企业微信、钉钉、飞书、Webhook
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe 30%, #41d1ff);

  --vp-home-hero-image-background-image: linear-gradient(-45deg, #d7dbf6 50%, #d7dbf6 50%);
  --vp-home-hero-image-filter: blur(40px);
}

@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(56px);
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(72px);
  }
}
.m-home-layout .image-src:hover {
  transform: translate(-50%, -50%) rotate(666turn);
  transition: transform 59s 1s cubic-bezier(0.3, 0, 0.8, 1);
}

.m-home-layout .details small {
  opacity: 0.8;
}

.m-home-layout .bottom-small {
  display: block;
  margin-top: 2em;
  text-align: right;
}
</style>