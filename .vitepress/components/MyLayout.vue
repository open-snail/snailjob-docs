<script setup>
import DefaultTheme from 'vitepress/theme'

const {Layout} = DefaultTheme
</script>

<style>
.sponsor {
  position: sticky;
  top: 0;
}

.sponsor img {
  width: 100%;
  max-width: 260px;
}
</style>

<template>
  <Layout>
    <template #aside-top>
      <div>
        <div class="sponsor">
          <a href="http://boot.aizuda.com/?from=azd" target="_blank">
            <img src="https://baomidou.com/img/azd01.png"/>
          </a>
        </div>
        <div style="color: gray;order: 9999;font-size: smaller;margin: 6px">
          <span>广告</span>
          <span style="float: right">❤️<a href="/docs/sponsor.html">成为赞助商</a></span>
        </div>
      </div>
    </template>
  </Layout>
</template>