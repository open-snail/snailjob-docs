<template></template>
<script>

export default {
  name: 'Notice',
  data() {
    return {
      // 发布新版本需要更新
      version: '2.1.0'
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
                <li>【新增】增批量新增任务功能<a href="https://gitee.com/aizuda/easy-retry/issues/I7JOPV">issues</a></li>
                <li>【新增】客户端支持yml、JVM参数和自动获取IP和端口三种方式 <a href="https://gitee.com/aizuda/easy-retry/issues/I7M0II">issues</a></li>
                <li>【优化】netty服务端接收请求改为actor模型 <a href="https://gitee.com/aizuda/easy-retry/issues/I7N9D5">issues</a></li>
                <li>【优化】优化调度日志信息 <a href="https://github.com/aizuda/easy-retry/issues/1">issues</a></li>
                <li>【优化】组配置添加字段说明文档 <a href="https://github.com/aizuda/easy-retry/issues/2">issues</a></li>
              </ul>
              <a href="/pages/bbdaf6/">更多信息</a>
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
