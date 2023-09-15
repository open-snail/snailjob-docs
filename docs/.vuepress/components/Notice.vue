<template></template>
<script>

export default {
  name: 'Notice',
  data() {
    return {
      // 发布新版本需要更新
      version: '2.2.0'
    };
  },
  mounted() {
    const isShowed = sessionStorage.getItem("isShowed")
    if ('1' === isShowed || this.isIgnoreNotice()) {
      return;
    }

    sessionStorage.setItem("isShowed", 1);
    this.$notification.open({
      message: `🚀 Easy Retry ${this.version} 发布了`,
      top: '80px',
      style: {
        'background-color': 'var(--bodyBg)!important',
        'color': 'var(--textColor)!important'
      },
      duration: 0,
      description: (
          <span>
              <ul>
                <li>【新增】支持Spring Boot 3.x <a href="ttps://gitee.com/aizuda/easy-retry/issues/I7Q2TI">issues</a></li><br/>
                <li>【新增】手动执行任务操作 <a href="https://gitee.com/aizuda/easy-retry/issues/I80WPQ">issues</a></li><br/>
                <li>【BUG】@Retryable注解在接口上不生效 <a href="https://gitee.com/aizuda/easy-retry/issues/I7VGS8">issues</a></li><br/>
                <li>【BUG】多场景数据上报时重复生成retryTask  <a href="https://github.com/aizuda/easy-retry/issues/7">issues</a></li><br/>
                <li>【优化】bizNo支持Aviator、SPEL、QLExpress等多种表达式并通过SPI机制实现灵活扩展<a href="https://gitee.com/aizuda/easy-retry/issues/I801A7">issues</a></li>
              </ul>
              <a href="/pages/bbdaf6/" style="color: #F44D2C;">更多信息</a>
            </span>
      ),
      onClose: () => {
        this.isShowAgain()
      },
    });
  },
  methods: {
    saveIgnoreNotice() {
      const json = JSON.parse(localStorage.getItem("ignoreNotice") || "[]");
      json.push(this.version);
      localStorage.setItem("ignoreNotice", JSON.stringify(json));
    },
    isIgnoreNotice() {
      const json = JSON.parse(localStorage.getItem("ignoreNotice") || "[]");
      return json.indexOf(this.version) >= 0;
    },
    isShowAgain() {
      var that = this
      this.$confirm({
        title: '是否下次不再提示该公告？',
        content: '忽略公告',
        okText: '不再提示',
        onOk() {
          that.saveIgnoreNotice();
        },
        cancelText: '否',
        onCancel() {
          sessionStorage.setItem("isShowed", 0);
        },
      });
    },
  }

}
</script>
