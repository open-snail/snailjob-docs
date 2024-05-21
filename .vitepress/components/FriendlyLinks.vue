<template>
  <div>
    <n-space :size="10">
      <n-card hoverable>
        <a href="https://baomidou.com/" target="_blank">
          <div class="item">
            <img src="../../src/public/img/icon/mp.png" width="50"  style="height: 50px">
            <div style="font-weight: bolder; font-size: 20px; color: var(--textColor)!important">&nbsp;MyBatis-Plus
            </div>
          </div>
        </a>
      </n-card>
      <n-card hoverable>
        <a href="https://code.exmay.com/" target="_blank">
          <div class="item">
            <img src="https://code.exmay.com/code/images/logo.png" width="50"  style="height: 50px">
            <div style="font-weight: bolder; font-size: 20px; color: var(--textColor)!important">&nbsp;
              一飞开源
            </div>
          </div>
        </a>
      </n-card>
      <n-card hoverable>
        <a href="https://plus-doc.dromara.org/#/" target="_blank">
          <div class="item">
            <img src="../../src/public/img/icon/ryp.png" width="185"  style="height: 50px">
          </div>
        </a>
      </n-card>
    </n-space>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import { NSpace, NCard } from 'naive-ui'
export default defineComponent({
  components: {
    NSpace,
    NCard
  }
})
</script>

<style scoped>
.item {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
}
</style>
