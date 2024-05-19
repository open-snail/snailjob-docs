import { defineConfig } from 'vitepress'
const head = require('./config/head.js');
const nav = require('./config/nav.js');
const themeConfig = require('./config/themeConfig.js');
const fileAndStyles: Record<string, string> = {}

// https://vitepress.dev/reference/site-config
// export default defineConfig({
//   title: "Snail Job",
//   description: "🔥🔥🔥灵活，可靠和快速的分布式任务重试和分布式任务调度平台",
//   srcDir: "./src",
//   assetsDir: "static",
//   markdown: {
//     lineNumbers: true,
//   },
//   // head,
//   themeConfig
// })
export default defineConfig({
  title: "Snail Job",
  description: "🔥🔥🔥灵活，可靠和快速的分布式任务重试和分布式任务调度平台",
  srcDir: "./src",
  assetsDir: "static",
  markdown: {
    lineNumbers: true,
  },
  // head,
  themeConfig,
  vite: {
    ssr: {
      noExternal: ['naive-ui', 'date-fns', 'vueuc']
    }
  },
  postRender(context) {
    const styleRegex = /<css-render-style>((.|\s)+)<\/css-render-style>/
    const vitepressPathRegex = /<vitepress-path>(.+)<\/vitepress-path>/
    const style = styleRegex.exec(context.content)?.[1]
    const vitepressPath = vitepressPathRegex.exec(context.content)?.[1]
    if (vitepressPath && style) {
      fileAndStyles[vitepressPath] = style
    }
    context.content = context.content.replace(styleRegex, '')
    context.content = context.content.replace(vitepressPathRegex, '')
  },
  transformHtml(code, id) {
    const html = id.split('/').pop()
    if (!html) return
    const style = fileAndStyles[`/${html}`]
    if (style) {
      return code.replace(/<\/head>/, style + '</head>')
    }
  }
})