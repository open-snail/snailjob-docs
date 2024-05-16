import { defineConfig } from 'vitepress'
const head = require('./config/head.js');
const nav = require('./config/nav.js');
const themeConfig = require('./config/themeConfig.js');

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Snail Job",
  description: "🔥🔥🔥灵活，可靠和快速的分布式任务重试和分布式任务调度平台",
  srcDir: "./src",
  assetsDir: "static",
  markdown: {
    lineNumbers: true,
  },
  // head,
  themeConfig
})
