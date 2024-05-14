<template></template>
<script>

export default {
  name: 'Notice',
  data() {
    return {
      // 发布新版本需要更新
      version: '1.0.0'
    };
  },
  mounted() {
    const isShowed = sessionStorage.getItem("isShowed")
    if ('1' === isShowed || this.isIgnoreNotice()) {
      return;
    }

    sessionStorage.setItem("isShowed", 1);
    this.$notification.open({
      message: `🚀 具有“三高特性”的全新 Snail Job ${this.version} 发布了`,
      top: '80px',
      style: {
        'background-color': 'var(--bodyBg)!important',
        'color': 'var(--textColor)!important'
      },
      duration: 0,
      description: (
          <span>
              <ul>
                <li>为了促进系统更好的发展，自本版本起，EasyRetry正式更名为SnailJob，并从版本号1.0.0开始</li>
                <li>基于soybeanjs全新打造的后端管理页面遥遥领先任何国产同品类系统</li>
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
