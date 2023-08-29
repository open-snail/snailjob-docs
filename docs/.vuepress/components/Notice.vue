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
                <li>【新增】支持多数据库 mysql/maridb/postgreSQL<a href="https://gitee.com/aizuda/easy-retry/issues/I7Q2TS">issues</a></li>
                <li>【新增】客户端EasyRetryListener、RetryArgSerializer、RetrySiteSnapshotContext 使用SPI形式接入<a href="https://github.com/aizuda/easy-retry/issues/5">issues</a></li>
                <li>【BUG】修复幂等没有过滤类型为TaskTypeEnum.RETRY和状态：RetryStatusEnum.RUNNING问题<a href="https://gitee.com/aizuda/easy-retry/issues/I7U2WB">issues</a></li>
                <li>【新增】死信队列支持批量回滚和批量删除 <a href="https://gitee.com/aizuda/easy-retry/issues/I7U2WB">issues</a></li>
                <li>【优化】去除hutool-all改为按需引入</li>
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
