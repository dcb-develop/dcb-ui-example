<template>
  <div class="wrapper">
    <p class="server" @click.stop="onCall">客服电话：0856-2323055</p>

    <call v-model="show" phone="0856-2323055"/>
  </div>
</template>

<script>
  import Call from '@/components/Call'

  export default {
    name: 'index',

    components: {
      Call
    },

    data() {
      return {
        show: false
      }
    },

    mounted() {
    },

    methods: {
      onCall () {
        this.show = true;
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "~style/variable";
  @import "~style/extends";

  .server {
    text-align: center;
  }
</style>
