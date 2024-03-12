<template></template>
<script>

export default {
  name: 'Notice',
  data() {
    return {
      // 发布新版本需要更新
      version: '3.1.0'
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
                <li>【新增】 工作流支持任务节点手动停止能力<a href="https://gitee.com/aizuda/easy-retry/issues/I93NJG">issues</a></li>
                <li>【新增】工作流支持任务节点手动重试能力<a href="https://gitee.com/aizuda/easy-retry/issues/I93NJ8">issues</a></li>
                <li>【新增】支持两个同级方法重试<a href="https://gitee.com/aizuda/easy-retry/issues/I93NDG">issues</a></li>
                <li>【新增】重试支持传播机制<a href="https://gitee.com/aizuda/easy-retry/issues/I93N8O">issues</a></li>
                <li style="color:red"> SpringBoot版本升级至【3.2.2】</li>
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
