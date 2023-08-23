<template>
  <icon-font :type="iconType" :style="cssStyle"/>
</template>
<script>
import { Icon } from 'ant-design-vue'

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_1460205_p44rcxhf7ge.js'
})
export default {
  name: 'EasyRetryIcon',
  props: {
    iconType: {
      type: String,
      default: ''
    },
    cssStyle: {
      type: String,
      default: 'font-size: 25px;'
    }
  },
  components: {
    IconFont
  }
}
</script>
