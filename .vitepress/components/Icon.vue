<template>
  <div>
    <n-icon size="40">
      <slot></slot>
    </n-icon>
  </div>
</template>
<script>
import { defineComponent } from 'vue';
import { NIcon } from 'naive-ui';
export default defineComponent({
  components: {
    NIcon
  }
})
</script>
