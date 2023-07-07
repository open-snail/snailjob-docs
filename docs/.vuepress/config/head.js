module.exports = [ // 注入到页面<head> 中的标签，格式[tagName, { attrName: attrValue }, innerHTML?]
    ['link', {rel: 'icon', href: '/img/logo1.png'}], //favicons，资源放在public文件夹
    ['meta', {name: 'keywords', content: 'easy-retry,retry,重试'}],
    ['meta', {name: 'theme-color', content: '#11a8cd'}], // 移动浏览器主题颜色

    // ['meta', {name: 'wwads-cn-verify', content: '6c4b761a28b734fe93831e3fb400ce87'}], // 广告相关，你可以去掉
    // ['script', {src: 'https://cdn.wwads.cn/js/makemoney.js', type: 'text/javascript'}], // 广告相关，你可以去掉
]
