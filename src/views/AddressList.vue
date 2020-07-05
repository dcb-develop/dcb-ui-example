<template>
  <div class="wrapper">
    <div class="address" :class="{placeholder: !address}" @click="setAddress">{{address || '选择地址'}}</div>

    <area-select :area-list="areaList" v-model="show" @update="onUpdate"/>
  </div>
</template>

<script>
  import AreaSelect from '@/components/AddressList'
  import {areaList} from '@/assets/js/areaList'

  export default {
    name: 'AddressList',

    components: {
      AreaSelect
    },

    data () {
      return {
        areaList, // 地址数据
        show: false, // 控制地址选择器显示
        address: '' // 更新选择之后的地址
      }
    },

    methods: {
      setAddress () { // 更改显示状态
        this.show = !this.show;
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

  .address {
    border-radius: 8px;
    border: 1px solid $border-color;
    height: 60px;
    text-align: center;
    line-height: 60px;
    font-size: $fz16;
    color: $color1;
  }

  .placeholder {
    color: $placeholder-color;
  }

  .none {
    display: none
  }
</style>
