<template>
  <div>
    <a-space :size="12">
      <a href="/" target="_blank">
        <div class="item">
<!--          <img src="https://easy-security.aizuda.com/assets/img/logo.png" width="50" height="50">-->
          <div style="font-weight: bolder;font-size: 20px;color: var(--textColor)!important">某大型金融公司</div>
        </div>
      </a>

      <div class="item">
        <a href="http://www.cqsjjb.cn/productCenter.html" target="_blank">
          <img src="../public/img/jianjiaobang.svg" width="150" height="50">
        </a>
      </div>

      <a href="https://www.infinitus.com.cn/" target="_blank">
        <div class="item">
          <img src="../public/img/wujixian.png" width="50" height="50">
         &nbsp;
          <div style="font-weight: bolder;font-size: 20px;color: var(--textColor)!important">无限极（中国）有限公司</div>
        </div>
      </a>
    </a-space>
    <br/>
    <br/>
    <a-space>
      <a href="http://gmoregalaxy.com/" target="_blank">
        <div class="item">
          <img src="../public/img/jimuyinhe.jpeg" width="50" height="50">
          &nbsp;
          <div style="font-weight: bolder;font-size: 20px;color: var(--textColor)!important">上海极目银河数字科技有限公司</div>
        </div>
      </a>
    </a-space>
  </div>
</template>
<script>
export default {
  name: 'Users',

}
</script>
<style>
.item {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
}
</style>
