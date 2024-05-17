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
            {text: '📖系统简介', link: '/docs/introduce/profile'}
        ],
    },
    {
        text: '📘入门指南',
        collapsed: false,
        items: [
            {text: '💡系统概念', link: '/pages/v3.x/97cde9/'},
            {text: '📌项目特性', link: '/pages/v3.x/540553/'},
            { text: '设计原理', link: '/pages/v3.x/540554/' },
            {text: '🖥️服务部署', link: '/pages/v3.x/406a66/'},
            {text: '🌐场景应用', link: '/pages/v3.x/406a68/'},
            {text: '👋HelloWorld', link: '/pages/v3.x/da9ecc/'},
            {text: '🧪测试案例', link: '/pages/v3.x/991407/'},
            {text: '📊性能指标', link: '/pages/v3.x/991410/'}
        ],
    },
    {
        text: '🎓实操课程',
        collapsed: false,
        items: [
            {
                text: '⏱️一分钟上手'
            },
            {text: '🛠️组配置详解', link: '/docs/comingSoon'},
            {
                text: '定时任务功能详解',
                collapsed: true,
                items: [
                    {text: '👁️功能演示', link: '/docs/comingSoon'},
                    {text: '🔠执行器名称', link: '/docs/comingSoon'},
                    {text: '📝任务类型&方法参数', link: '/docs/comingSoon'},
                    {text: '🔀路由策略&阻塞策略', link: '/docs/comingSoon'},
                    {text: '⏳触发类型&间隔时长', link: '/docs/comingSoon'},
                    {text: '⏰超时时间&并行数', link: '/docs/comingSoon'},
                    {text: '❌失败重试配置', link: '/docs/comingSoon'},
                ]
            },
            {
                text: '工作流详解',
                collapsed: true,
                items: [
                    {text: '👁️功能演示', link: '/docs/comingSoon'}
                ]
            },
            {
                text: '重试组件详解',
                collapsed: true,
                items: [
                    {text: '👁️功能演示', link: '/docs/comingSoon'},
                ]
            },
            {
                text: '通知配置详解',
                collapsed: true,
                items: [
                    {text: '👁️功能演示', link: '/docs/comingSoon'}
                ]
            },
        ],
    },
    {
        text: '关于项目',
        collapsed: false,
        items: [
            {text: '更新记录', link: '/docs/operation/deploy'},
            {text: '参与开发', link: '/docs/operation/launch'}
        ],
    },
    { text: '🏆 优秀文章', link: '/pages/db78e2/' },
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
        createYear: 2022, // 博客创建年份
        copyright: [
            '<a href="http://aizuda.com/" target="_blank" style="font-weight:bold">Team Aizudai</a>',
            ' | ',
            '<a href="http://beian.miit.gov.cn/" target=_blank>皖ICP备16014822号-4</a>',
            '</p>',
        ].join('')
    }
}

