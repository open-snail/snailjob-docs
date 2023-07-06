---
home: true
heroImage: /img/logo1.png
heroText: Easy-Retry
tagline: 🚀基于Base思想实现的分布式服务重试重试组件
actionText: ️v2.0全新发布 →
actionLink: /pages/a2f161/
bannerBg: none # auto => 网格纹背景(有bodyBgImg时无背景)，默认 | none => 无 | '大图地址' | background: 自定义背景样式       提示：如发现文本颜色不适应你的背景时可以到palette.styl修改$bannerTextColor变量

features: # 可选的
  - title: 管控重试流量
    details: 预防重试风暴，及早发现和预警，并且提供流程管理手段
  - title: 接入简单
    details: 一分钟上手，支持WEB页面对重试数据CRUD操作;业务接入成本小。避免依赖研发人员的技术水平，保障重试的稳定性
  - title: 重试数据管理
    details: 能够动态调整配置,启动/停止任务,以及终止运行中的重试数据; 可以做到重试数据不丢失、重试数据一键回放
  - title: 多样化重试类型
    details: 支持ONLY_LOCAL、ONLY_REMOTE、LOCAL_REMOTE多种重试类型
  - title: 支持多样化的告警方式
    details: 邮箱、企业微信、钉钉、飞书等
  - title: 多样化退避策略
    details: Cron、固定间隔、等级触发、随机时间触发等
# 文章列表显示方式: detailed 默认，显示详细版文章列表（包括作者、分类、标签、摘要、分页等）| simple => 显示简约版文章列表（仅标题和日期）| none 不显示文章列表
postList: none
---
# 🎉上新推荐
+ <span style="color:#11a8cd; font-weight:bold;">[v2.0 重磅更新](https://gitee.com/aizuda/easy-retry/releases "查看发行日志")</span>
  1. 添加局部保存的提示 【**新增**】[PR](https://gitee.com/aizuda/easy-retry/pulls/7)
  2. pod列表页新增消费组显示 【**新增**】
  3. 优化IdempotentIdContext注释、手动生成幂等号改为IdempotentIdContext传参【优化】[PR](https://gitee.com/aizuda/easy-retry/pulls/6)
  4. 移除重复的ThreadLocal赋值动作 【优化】[PR](https://gitee.com/aizuda/easy-retry/pulls/4)
  5. 优化请求客户端的日志信息 【优化】
  6. 组配置校验分区时，验证对应的表是否存在 【**新增**】
  7. 修复新增组配置，分区为0校验异常 【BUG】
  8. POD查询新增过期时间过滤 【**新增**】
  9. 优化本地重试注解中的exclude和include，配置了仍然执行了2次重试 【BUG】
  10. 新增调用客户端代理类【**新增**】
  11. 新增下线路由剔除功能【**新增**】
  12. 新增路由转移功能 【**新增**】
  13. 添加启动logo 【**新增**】
  14. 优化表定义 【优化】
  15. 看板查询失败问题 【BUG】
  16. 优化详情页查询 【优化】
  17. 去除回调重试流量标识【优化】
  18. 优化日志存储逻辑【优化】
  19. 新增日志过期策略配置 【**新增**】
  20. 新增定时清除日志功能 【**新增**】
  21. 优化看板页面日志的查询统计【优化】
  22. 新增日志详情页查询调度日志列表 【**新增**】
  23. 优化详情页查询 【优化】
  24. 修复不同组相同场景添加失败问题 
  25. 优化任务详情页，重试日志只显示当前场景 
  26. 后端二次校验分区数 【优化】
  27. 修复回滚主键冲突问题 【BUG】
  28. 新增ReBalanceFilterStrategies过滤【**新增**】
  29. 新增pod列表查询【**新增**】
  30. 优化路由注册 【**新增**】
  31. 重构组ReBalance逻辑【**新增**】
  32. 优化客户端和服务端注册逻辑 【**新增**】
  33. 优化配置同步逻辑 【**新增**】
  34. 添加初始化时指定数据库的逻辑【**新增**】[PR](https://gitee.com/aizuda/easy-retry/pulls/1)

# <div class="icon-img-container"><img src="/img/icon/gitlab.png" alt="图标" class="icon-image"> <div class="icon-text">代码托管</div> </div>

<div class="git-icon-image">
    <a href="https://github.com/aizuda/easy-retry">
        <img src="/img/icon/logo-github.png" alt="Github地址" width="100px" height="32px">
    </a>
    <a href="https://gitee.com/aizuda/easy-retry">
        <img src="/img/icon/logo-gitee.png" alt="Gitee地址" width="100px" height="32px">
    </a>
</div>

# <div class="icon-img-container"><img src="/img/icon/code.png" alt="图标" class="icon-image"> <div class="icon-text">参与研发</div> </div>

欢迎各路好汉一起来参与完善 EasyRetry，我们期待你的 PR！

如果想贡献，请先查看[参与开发](/pages/5f5ef0/)。


# <div class="icon-img-container"><img src="/img/icon/design-idea.png" alt="图标" class="icon-image"> <div class="icon-text">设计思想</div> </div>

# <div class="icon-img-container"><img src="/img/icon/aizuda.png" alt="图标" width=32px height=32px> <div class="icon-text">aizuda组织成员</div> </div>

# ⚡ 反馈与交流

在使用过程中有任何问题和想法，请给我提 [Issue](https://gitee.com/aizuda/easy-retry/issues)。
你也可以在Issue查看别人提的问题和给出解决方案。

或者加入我们的交流群：

<table>
  <tbody>
    <tr>
      <td align="center" valign="middle">
        <img :src="$withBase('/img/qrcode/wx.jpg')" class="no-zoom" style="width:120px;margin: 10px;">
        <p>EasyRetry微信群(添加我微信备注"进群")</p>
      </td>
      <td align="center" valign="middle">
        <img :src="$withBase('/img/qrcode/qq.png')" alt="群号: 678571433" class="no-zoom" style="width:120px;margin: 10px;">
        <p>EasyRetry QQ群: 678571433</p>
      </td>
    </tr>
  </tbody>
</table>

# 友情链接
* [杨不易呀](https://yby6.com/)

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
.icon-img-container {
  display: flex;
  align-items: center;
  pointer-events: none;
}
.icon-image{
  width: 30px;
  height: 30px;
}
.icon-text{
  margin-left: 10px;
}
.git-icon-image img{
  display: inline-block;
  vertical-align: middle;
  margin-left: 40px;
  pointer-events: none;
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
