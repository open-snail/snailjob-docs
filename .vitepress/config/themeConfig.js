const nav = require('./nav.js');

const socialLinks = [

    {icon: "github", link: "https://github.com/aizuda/snail-job"},
    {
        icon: {
            svg: '<svg x="5" y="5" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path d="M512 1024C229.222 1024 0 794.778 0 512S229.222 0 512 0s512 229.222 512 512-229.222 512-512 512z m259.149-568.883h-290.74a25.293 25.293 0 0 0-25.292 25.293l-0.026 63.206c0 13.952 11.315 25.293 25.267 25.293h177.024c13.978 0 25.293 11.315 25.293 25.267v12.646a75.853 75.853 0 0 1-75.853 75.853h-240.23a25.293 25.293 0 0 1-25.267-25.293V417.203a75.853 75.853 0 0 1 75.827-75.853h353.946a25.293 25.293 0 0 0 25.267-25.292l0.077-63.207a25.293 25.293 0 0 0-25.268-25.293H417.152a189.62 189.62 0 0 0-189.62 189.645V771.15c0 13.977 11.316 25.293 25.294 25.293h372.94a170.65 170.65 0 0 0 170.65-170.65V480.384a25.293 25.293 0 0 0-25.293-25.267z" fill="#C71D23"></path></svg>',
        },
        link: "https://gitee.com/aizuda/snail-job",
    },
];

const sidebar = [
    {
        text: 'ℹ️介绍',
        collapsed: false,
        items: [
            {text: '📖前言', link: '/docs/introduce/preface'}
        ],
    },
    {
        text: '📘入门指南',
        collapsed: false,
        items: [
            {text: '💡系统概念', link: '/docs/guide/concept'},
            {text: '📌项目特性', link: '/docs/guide/project_features'},
            {text: '🔄重试的那些事', link: '/docs/guide/retry'},
            {text: '📝设计原理', link: '/docs/guide/design_principles'},
            {
                text: '📚注解大全',
                collapsed: false,
                items: [
                    {text: '🔄Retryable注解', link: '/docs/guide/annotation/Retryable'},
                    {text: '🔄ExecutorMethodRegister注解', link: '/docs/guide/annotation/ExecutorMethodRegister'},
                    {text: '⚙️JobExecutor注解', link: '/docs/guide/annotation/JobExecutor'}
                ]
            },
            {text: '🔧Spi扩展点', link: '/docs/guide/Spi'},
            {text: '🗄️数据库搭建', link: '/docs/guide/database_build'},
            {text: '💻客户端配置', link: '/docs/guide/client_config'},
            {text: '🖥️服务端配置', link: '/docs/guide/server_config'},
            {text: '🖥️服务部署', link: '/docs/guide/service_deployment'},
            {text: '🌐场景应用', link: '/docs/guide/use_case_scenarios'},
            {text: '👋HelloWorld', link: '/docs/guide/hello_world/'},
            {text: '🧪测试案例', link: '/docs/guide/test_cases'},
            {text: '📊性能指标', link: '/docs/guide/performance_metrics'}
        ],
    },
    // {
    //     text: '🎓实操课程',
    //     collapsed: false,
    //     items: [
    //         {
    //             text: '⏱️一分钟上手', link: '/docs/comingSoon'
    //         },
    //         {text: '🛠️组配置详解', link: '/docs/comingSoon'},
    //         {
    //             text: '定时任务功能详解',
    //             collapsed: true,
    //             items: [
    //                 {text: '👁️功能演示', link: '/docs/comingSoon'},
    //                 {text: '🔠JobExecutor注解', link: '/docs/comingSoon'},
    //                 {text: '🔠执行器名称', link: '/docs/comingSoon'},
    //                 {text: '📝任务类型&方法参数', link: '/docs/comingSoon'},
    //                 {text: '🔀路由策略&阻塞策略', link: '/docs/comingSoon'},
    //                 {text: '⏳触发类型&间隔时长', link: '/docs/comingSoon'},
    //                 {text: '⏰超时时间&并行数', link: '/docs/comingSoon'},
    //                 {text: '❌失败重试配置', link: '/docs/comingSoon'},
    //                 {text: '表结构设计讲解', link: '/docs/comingSoon'},
    //             ]
    //         },
    //         {
    //             text: '工作流详解',
    //             collapsed: true,
    //             items: [
    //                 {text: '功能演示', link: '/docs/comingSoon'},
    //                 {text: '任务节点&失败策略', link: '/docs/comingSoon'},
    //                 {text: '判定节点&判定逻辑', link: '/docs/comingSoon'},
    //                 {text: '判定节点&表达式类型', link: '/docs/comingSoon'},
    //                 {text: '回调通知', link: '/docs/comingSoon'},
    //                 {text: '复杂场景下的工作流编排', link: '/docs/comingSoon'},
    //                 {text: '表结构设计讲解', link: '/docs/comingSoon'}
    //             ]
    //         },
    //         {
    //             text: '重试组件详解',
    //             collapsed: true,
    //             items: [
    //                 {text: '👁️功能演示', link: '/docs/comingSoon'},
    //                 {text: '👁️重试那些事', link: '/docs/comingSoon'},
    //                 {
    //                     text: '👁️ 场景配置',
    //                     collapsed: true,
    //                     items: [
    //                         {text: '路由策略&超时时间&最大重试次数', link: '/docs/comingSoon'},
    //                         {text: '调用链超时时间', link: '/docs/comingSoon'},
    //                         {text: '退避策略&间隔时间', link: '/docs/comingSoon'},
    //                     ]
    //                 },
    //                 {text: '👁️ 何为死信任务?', link: '/docs/comingSoon'},
    //                 {text: '👁️ 回调任务到底是干啥的?', link: '/docs/comingSoon'},
    //                 {
    //                     text: '👁️ Retryable注解',
    //                     collapsed: true,
    //                     items: [
    //                         {text: 'scene', link: '/docs/comingSoon'},
    //                         {text: 'include&exclude', link: '/docs/comingSoon'},
    //                         {text: 'retryStrategy', link: '/docs/comingSoon'},
    //                         {text: 'retryMethod', link: '/docs/comingSoon'},
    //                         {text: 'idempotentId', link: '/docs/comingSoon'},
    //                         {text: 'retryCompleteCallback', link: '/docs/comingSoon'},
    //                         {text: 'isThrowException', link: '/docs/comingSoon'},
    //                         {text: 'bizNo', link: '/docs/comingSoon'},
    //                         {text: 'localTimes&localInterval', link: '/docs/comingSoon'},
    //                         {text: 'async&timeout&unit&forceReport', link: '/docs/comingSoon'},
    //                         {text: 'propagation', link: '/docs/comingSoon'},
    //                     ]
    //                 },
    //                 {text: '👁️手动添加任务', link: '/docs/comingSoon'},
    //                 {text: '👁️批量添加任务', link: '/docs/comingSoon'},
    //                 {text: '表结构设计讲解', link: '/docs/comingSoon'}
    //             ]
    //         },
    //         {
    //             text: '通知配置详解',
    //             collapsed: true,
    //             items: [
    //                 {text: '👁️功能演示', link: '/docs/comingSoon'},
    //                 {text: '👁️通知人配置', link: '/docs/comingSoon'},
    //                 {
    //                     text: '👁️ 通知场景配置',
    //                     collapsed: true,
    //                     items: [
    //                         {text: '重试场景', link: '/docs/comingSoon'},
    //                         {text: '定时任务场景', link: '/docs/comingSoon'},
    //                         {text: '工作流场景', link: '/docs/comingSoon'},
    //                     ]
    //                 }
    //             ]
    //         },
    //     ],
    // },
    {
        text: '关于项目',
        collapsed: false,
        items: [
            {text: '更新记录', link: '/docs/about/update_log'},
            {text: '参与开发', link: '/docs/about/join_us'}
        ],
    },
    {text: '🏆 优秀文章', link: '/docs/excellent_article'},
    {text: '🏆 成员', link: '/docs/member'},
    {
        text: '其他站点',
        collapsed: false,
        items: [
            {text: '成为赞助商', link: '/docs/sponsor'},
            {text: '捐赠😍支持', link: '/docs/support'},
            {text: '友情链接', link: '/docs/links'},
        ],
    },
];

// Theme Config
module.exports = {
    siteTitle: 'Snail Job',
    logo: '/logo.svg',
    search: {
        provider: "algolia",
        options: {
            appId: "...",
            apiKey: "...",
            indexName: "...",
        },
    },
    nav,

    outline: {
        level: 'deep', // 右侧大纲标题层级
        label: '目录', // 右侧大纲标题文本配置
    },
    darkModeSwitchLabel: '切换亮色/暗黑模式',
    sidebarMenuLabel: '文章',
    returnToTopLabel: '返回顶部',
    lastUpdatedText: '最后更新',
    author: { // 文章默认的作者信息，可在md文件中单独配置此信息 String | {name: String, href: String}
        name: '奋斗小蜗牛', // 必需
        href: 'https://github.com/opensnail' // 可选的
    },
    editLink: {
        pattern: 'https://gitee.com/aizuda/snailjob-docs',
        text: 'Edit this page on Gitee',
    },
    lastUpdated: {
        text: "最后更新",
        formatOptions: {
            dateStyle: "full",
            timeStyle: "medium",
        },
    },
    docFooter: {
        prev: '上一篇',
        next: '下一篇'
    },
    cleanUrls: true,
    ignoreDeadLinks: true,
    socialLinks,
    sidebar,
    footer: { // 页脚信息
        createYear: 2024, // 博客创建年份
        copyright: [
            '<a href="http://aizuda.com/" target="_blank" style="font-weight:bold">Team Aizudai</a>',
            ' | ',
            '<a href="http://beian.miit.gov.cn/" target=_blank>皖ICP备16014822号-4</a>',
            '</p>',
        ].join('')
    }
}

