# 更新日志

# v 1.1.0-beta1
::: tip 更新日志
<br/>
<iframe src="//player.bilibili.com/player.html?isOutside=true&aid=112666253199961&bvid=BV11W3ge4Et9&cid=500001593665638&p=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>

1. 【信创】支持达梦数据库【新增】
2. 更新密码策略：字母、数字、特殊字符，任意2种组成，6-20位【优化】
3. 工作流批次、重试批次、重试日志添加时间筛选(默认查询一个月)【新增】
4. 修复通知配置分页显示问题【BUG】
5. github工作流添加maven cache【优化】
6. mp自动填充createDt,updateDt字段【优化】
7. 提取所有insertBatch xml语句到template【优化】
8. 优化空间切换组件样式【优化】
9. 用户列表添加[序号]、[创建时间]字段【新增】
10. 所有搜索框允许清除【优化】
11. 修复工作流搜索参数定义错误【BUG】
12. 工作流批次按照任务名称查询体验【优化】
13. 定时任务批次按照任务名称查询体验【优化】
14. 修复前端toString()空指针问题【优化】
15. 命名空间非活跃条目显示图标【优化】
16. 登录界面可以做一下键盘回车登录【优化】
17. updateBatch系列脚本增加update_dt=CURRENT_TIMESTAMP【优化】
18. 页面路径修改 notify/scene => notify/config 【优化】
19. 优化客户端发送消息是组为空的校验【优化】
20.  优化其他若干已知问题【优化】

**参与者设计开发人员名单**
1. https://gitee.com/xlsea
2. https://gitee.com/xiaowoniu168
3. https://gitee.com/dhb52
:::


# v 1.0.1
::: tip 更新日志
1. 定时任务，任务类型为切片，提交失败【BUG】
2. 旧密码无需使用密码规则校验,非空即可【BUG】
3. 优化携带参数路由跳转体验【优化】
4. 修复 cron 表达式组件问题【BUG】
5. github工作流添加maven cache【优化】

**参与者设计开发人员名单**
1. https://gitee.com/xlsea
2. https://gitee.com/xiaowoniu168
3. https://gitee.com/dhb52
:::

# v 1.0.0 
::: tip 更新日志
<br/>
<iframe src="//player.bilibili.com/player.html?bvid=BV1Fr421w72q&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>


1. 支持组、定时任务、工作流、重试任务、通知人导入和导出【新增】
2. 工作流从antd迁移到soybeanjs【优化】
3. 超级管理员不允许删除、修改权限【优化】
4. 调整定时任务、工作流、重试场景的配置菜单排序【优化】
5. 修复已知的前端搜索问题【BUG】
6. 修复工作流多个决策节点场景下导致的任务节点没有触发问题【BUG】
7. 首页任务Card添加点击动作【新增】
8. 支持普通用户修改密码【新增】
9. 优化客户端group配置和enabled加载顺序【优化】
10. 修复常驻任务执行阻塞策略时无法准时开启下一次任务【BUG】
11. 修复sqlserver数据库MP分页查询是没有带order by 导致的查询报错【BUG】
12. 定时任务支持超时检查机制【新增】
13. 工作流执行超时检查机制【新增】
14. 组名称和重试场景名称支持短横线 (-) 格式【优化】
15. 调整定时任务、重试场景、通知场景配置的表单布局【优化】
16. 每次 “编辑” 定时任务，cron 表达式就会被重置成默认值【BUG】
17. 修复工作流任务显示不正确【BUG】
18. 修复 clearOfflineNode 出现死锁【BUG】
19. 优化其他已知问题【优化】

 **参与者设计开发人员名单**
1. https://gitee.com/zhengweilins
2. https://gitee.com/xlsea
3. https://gitee.com/xiaowoniu168
4. https://gitee.com/dhb52
:::





