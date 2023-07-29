<template>
  <div>
    <a-space :size="10">
      <a href="https://easy-security.aizuda.com/" target="_blank">
        <div class="item">
          <img src="https://easy-security.aizuda.com/assets/img/logo.png" width="50" height="50">
          <div style="font-weight: bolder;font-size: 20px;color: var(--textColor)!important">Easy-Security</div>
        </div>
      </a>

      <a href="http://aizuda.com/" target="_blank">
        <div class="item">
          <img src="../public/img/aizuda.png" width="150" height="50">
  <!--        <div>Easy-Security</div>-->
        </div>
      </a>
    </a-space>
  </div>
</template>
<script>
export default {
  name: 'Member',

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
