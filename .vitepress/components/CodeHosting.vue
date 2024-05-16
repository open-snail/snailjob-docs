<template>
  <div>
    <a href="https://github.com/aizuda/easy-retry" target="_blank">
      <a-button type="dashed" style="background-color: #24ACE0">
        <div style="display: flex; flex-direction: row; justify-content: center; align-items: center; margin: auto 0px">
          <EasyRetryIcon iconType="icon-github1" cssStyle="font-size: 25px;margin-right: 8px"/>
          <div style="font-weight: bolder; margin-top: 3px;color: white">Github</div>
        </div>
      </a-button>
    </a>

    <a href="https://gitee.com/aizuda/easy-retry" target="_blank">
      <a-button type="dashed" style="background-color: #3366FF">
        <div style="display: flex; flex-direction: row; justify-content: center; align-items: center; margin: auto 0px">
          <EasyRetryIcon iconType="icon-GITEE" cssStyle="font-size: 25px;margin-right: 8px"/>
          <div style="font-weight: bolder; margin-top: 3px;color: white">Gitee</div>
        </div>
      </a-button>
    </a>
  </div>
</template>
<script>
import EasyRetryIcon from './EasyRetryIcon'

export default {
  name: 'CodeHosting',
  components: {
    EasyRetryIcon
  }
}
</script>