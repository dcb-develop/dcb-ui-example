<template>
  <section class="wrapper">
    <div class="page-name">
      <span>地址管理</span>
      <a class="manager" href="javascript:;" @click="onManager">{{isEdit ? '完成' : '管理'}}</a>
    </div>

    <ul class="address-list">
      <li class="el-shadow mb-16" v-for="(item, index) in list" :key="index" @click.stop="onSelect(item)">
        <div class="row line">
          <span class="user-name">{{item.userName}}</span>
          <span class="phone">{{item.phone}}</span>
        </div>
        <div class="row">
          <span class="default" v-if="item.default">[默认地址]</span>
          <span class="address">{{item.address}}</span>
        </div>
        <div class="actions" v-if="isEdit">
          <a class="edit" href="javascript:;" @click.stop="onEdit(item)">编辑</a>
          <a class="remove" href="javascript:;" @click.stop="onRemove(item, index)">删除</a>
        </div>
      </li>
    </ul>

    <button class="add-button" @click="addAddress"><i class="icon-font">&#xe608;</i>新增地址</button>
  </section>
</template>

<script>
  export default {
    name: 'List',

    data() {
      return {
        isEdit: false,
        list: [
          {
            userName: '段暄',
            phone: '18166770617',
            default: true,
            address: '贵阳市观山湖长岭南路天一国际',
            code: '520000'
          },
          {
            userName: '段暄',
            phone: '18166770617',
            default: false,
            address: '贵阳市观山湖长岭南路天一国际',
            code: '520000'
          }
        ]
      }
    },

    methods: {
      // 管理地址
      onManager () {
        this.isEdit = !this.isEdit;
      },

      // 新增地址信息
      addAddress() {
        this.$emit('set');
      },

      // 选中设置地址信息
      onSelect(item) {
        this.$emit('select', item);
      },

      // 编辑更新地址信息
      onEdit (item) {
        this.$emit('edit', item);
      },

      onRemove(item, index) {
        this.$emit('remove', {item, index});
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
    padding-bottom: 50px;
    overflow: auto;
  }

  .manager {
    color: $color5;
    margin-left: auto;
    font-size: 14px;

    &:before {
      content: '\e609';
      font-family: icon-font;
      padding-right: 10px;
    }
  }

  .address {
    &-list {
      padding: 16px;

      .line {
        border-bottom: 1px solid $border-color;
      }

      .row {
        align-items: center;
        display: flex;
        padding: 16px 0;
      }

      .actions {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding-bottom: 16px;

        a {
          align-items: center;
          color: rgba(255, 168, 9, 1);
          display: flex;
          margin-left: 16px;
        }

        .edit {
          &:before {
            content: '\e609';
            font-family: icon-font;
            line-height: normal;
            margin-right: 5px;
          }
        }

        .remove {
          &:before {
            content: '\e62e';
            font-family: icon-font;
            font-size: 20px;
            line-height: normal;
            margin-right: 5px;
          }
        }
      }

      .phone {
        margin-left: auto;
      }

      .default {
        color: rgba(255, 168, 9, 1);
        padding-right: 5px;
      }

      li {
        font-size: 14px;
        padding: 0 16px;
      }
    }
  }

  .add-button {
    align-items: center;
    background-color: rgba(255, 168, 9, 1);
    color: #fff;
    display: flex;
    font-size: $fz16;
    font-family: $pfm;
    height: 50px;
    justify-content: center;
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;

    i {
      font-size: $fz20;
    }
  }
</style>
