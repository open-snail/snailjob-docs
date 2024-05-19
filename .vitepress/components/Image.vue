<template>
  <div>
    <n-image :src="src" width="350" />
  </div>
</template>
<script>
import { defineComponent } from 'vue';
import { NImage, NCard } from 'naive-ui';


export default defineComponent({
  setup() {
    return {
        src: '/img/core_function.jpg',
    }
  },
  components: {
    NImage,
    NCard
  }
})
</script>
