<template>
  <div class="wrapper">
    <iframe :src='previewUrl'></iframe>
  </div>
</template>

<script>
  export default {
    name: 'PDFReview',

    data() {
      return {
        previewUrl: `https://dcb-cdn.oss-cn-beijing.aliyuncs.com/assets/pdf/web/viewer.html?file=${encodeURIComponent('https://dcb-cdn.oss-cn-beijing.aliyuncs.com/assets/pdf/20200220.pdf')}`
      }
    }
  }
</script>

<style scoped lang="scss">
  .wrapper {
    padding: 0;
  }

  iframe {
    border: none;
    height: 100%;
    width: 100%;
  }
</style>
