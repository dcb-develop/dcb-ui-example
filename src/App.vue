<template>
  <div id="app">
    <navigation>
      <router-view/>
    </navigation>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
  @import "~style/global"; // 全局样式

  #app {
    height: 100%;
  }
</style>
