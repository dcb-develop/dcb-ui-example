<template>
  <main>
    <component :is="currentModel" @set="addAddress"/>
    <area-select :area-list="areaList" v-model="show" @update="onUpdate"/>
  </main>
</template>

<script>
  import AreaSelect from '@/components/AddressList'
  import Edit from '@/components/AddressList/Edit'
  import List from '@/components/AddressList/List'
  import {areaList} from '@/assets/js/areaList'

  export default {
    name: 'AddressList',

    components: {
      AreaSelect,
      Edit,
      List
    },

    data () {
      return {
        areaList, // 地址数据
        currentModel: 'List', // 当前显示组件
        show: false, // 控制地址选择器显示
        address: '' // 更新选择之后的地址
      }
    },

    methods: {
      addAddress () {
        this.currentModel = 'Edit';
      },

      onUpdate (address) {
        this.address = address;
      }
    }
  }
</script>

<style scoped lang=scss>
  @import "~style/variable";
  @import "~style/extends";

  .wrapper {
    display: flex;
    flex-direction: column;
    padding: 0;
  }

  main {
    height: 100%;
  }

  .none {
    display: none
  }
</style>
