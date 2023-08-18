const themeConfig = require('./config/themeConfig.js');
const head = require('./config/head.js');
const plugins = require('./config/plugins.js');

module.exports = {

    theme: 'vdoing', // 使用依赖包主题
    // theme: require.resolve('../../vdoing'), // 使用本地主题 (先将vdoing主题文件下载到本地：https://github.com/xugaoyi/vuepress-theme-vdoing)
    title: "Easy Retry",
    description: '力提高分布式业务系统一致性的分布式重试平台',
    // base: '/', // 默认'/'。如果你想将你的网站部署到如 https://foo.github.io/bar/，那么 base 应该被设置成 "/bar/",（否则页面将失去样式等文件）
    head,
    themeConfig,
    plugins,
    markdown: {
        // lineNumbers: true,
        extractHeaders: ['h2', 'h3', 'h4', 'h5', 'h6'], // 提取标题到侧边栏的级别，默认['h2', 'h3']
    },
    // 监听文件变化并重新构建
    extraWatchFiles: [
        '.vuepress/config.js',
        '.vuepress/config/htmlModules.js',
        '.vuepress/config/head.js',
        '.vuepress/config/plugins.js',
        '.vuepress/config/themeConfig.js',
        '.vuepress/config/nav.js',
    ],

    // 结合 Webpack Dev Server 实现热部署
    configureWebpack: {
        devServer: {
            watchOptions: {
                poll: true
            }
        }
    }
}
