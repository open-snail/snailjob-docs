<template></template>
<script>

export default {
  name: 'Notice',
  data() {
    return {
      // 发布新版本需要更新
      version: '2.5.0'
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
                <li>【新增】定时任务执行任务编排功能<a href="https://gitee.com/aizuda/easy-retry/issues/I8HGNQ">issues</a></li>
                <li>【新增】 工作流执行手动/自动运行、复制工作流、停止等功能<a href="https://gitee.com/aizuda/easy-retry/issues/I85SPE">issues</a></li>
                <li>【新增】任务调度支持失败重试</li>
                <li>【新增】新增定时任务实时日志功能 </li>
                <li style="color:red"> 本期是Spring Boot 2.x的最后一个版本，下一期将升级Spring boot3.x并作为长期支持版本</li>
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
