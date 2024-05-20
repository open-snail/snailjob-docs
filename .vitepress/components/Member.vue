<template>
  <div>
    <n-space :size="10">
      <n-card>
        <a href="http://aizuda.com/" target="_blank">
          <div class="item">
            <img src="../../src/public/img/aizuda.png" width="150" height="50">
          </div>
        </a>
      </n-card>
      <n-card>
        <a href="https://www.mongoplus.cn/" target="_blank">
          <div class="item">
            <img src="../../src/public/img/MongoPlus.png" width="150"  style="height: 50px"/>
          </div>
        </a>
      </n-card>
      <n-card>
        <a href="https://doc.flowlong.com/" target="_blank">
          <div class="item">
            <img src="../../src/public/img/flowlong.png" width="150"  style="height: 50px"/>
          </div>
        </a>
      </n-card>
      <n-card>
        <a href="https://gitee.com/aizuda/zlm4j" target="_blank">
          <div class="item">
            <img src="../../src/public/img/zlm4j.jpg" width="150" style="height: 50px"/>
          </div>
        </a>
      </n-card>
      <n-card>
        <a href="https://easy-security.aizuda.com/" target="_blank">
          <div class="item">
            <img src="https://easy-security.aizuda.com/assets/img/logo.png" width="50"  style="height: 50px">
            <div style="font-weight: bolder;font-size: 16px;color: var(--textColor)!important">EasySecurity</div>
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
