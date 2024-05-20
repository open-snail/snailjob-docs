<template>
  <div>
    <a-space :size="10">
      <a href="https://baomidou.com/" target="_blank">
        <div class="item">
          <img src="https://baomidou.com/img/logo.svg" width="50" height="50">
          <div style="font-weight: bolder; font-size: 20px; color: var(--textColor)!important">&nbsp;MyBatis-Plus</div>
        </div>
      </a>
      <a href="https://code.exmay.com/" target="_blank">
        <div class="item">
          <img src="https://code.exmay.com/code/images/logo.png" width="50" height="50">
          <div style="font-weight: bolder; font-size: 20px; color: var(--textColor)!important">&nbsp;
            一飞开源
          </div>
        </div>
      </a>
    </a-space>
  </div>
</template>
<script>
export default {
  name: 'FriendlyLinks',

}
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
