<template>
  <div>
    aa
  </div>
</template>
<script>

export default {
  name: 'Notice',
  data() {
    return {
    };
  },
  mounted() {
    this.$notification.open({
      message: '🚀 Easy Retry 2.0 发布了',
      top: '80px',
      style: {
        'background-color': '#64a6ea'
      },
      duration: 0,
      description: (
          <span>
              <ul>
                <li>添加局部保存的提示</li>
                <li>pod列表页新增消费组显示</li>
                <li>优化IdempotentIdContext注释、手动生成幂等号改为IdempotentIdContext传参【优化】</li>
              </ul>
            </span>
      ),
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  }

}
</script>
