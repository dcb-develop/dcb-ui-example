<template>
  <div class="dialog" v-show="show">
    <transition name="v-mask">
      <div class="dialog-mask"></div>
    </transition>
    <transition name="v-dialog">
      <div class="dialog-container v-dialog" v-show="show">
        <div class="dialog-header" v-if="head">{{head}}</div>
        <div class="dialog-body">{{body}}</div>
        <div class="dialog-footer">
          <a class="cancel" href="javascript:;" @click="_onCancel" v-if="cancel">{{cancel}}</a>
          <a class="dialog-btn" href="javascript:;" @click="_onDialog" v-if="confirm">{{confirm}}</a>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    props: {
      show: { // 是否显示此Dialog
        default: false
      },
      head: {
        default: ''
      },
      body: { // 提醒文字
        default: ''
      },
      dialog: {
        default: Function
      },
      confirm: '',
      cancel: ''
    },
    methods: {
      _onDialog() {
        this.dialog()
        this.$dialog.hide()
      },
      _onCancel() {
        this.show = false;
      }
    }
  }
</script>

<style scoped lang="scss">
  .dialog {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;

    &-mask {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, .5);
    }

    &-container {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 305px;
      background-color: #fff;
      border-radius: 8px;
      overflow: hidden;
    }

    &-header {
      color: rgba(3, 3, 3, 1);
      font-size: 17px;
      text-align: center;
      margin-top: 15px;
    }

    &-body {
      color: #465166;
      font-size: 14px;
      padding: 15px 22px 20px;
      text-align: center;
    }

    &-footer {
      width: 100%;
      display: flex;
      border-top: 1px solid #d8d8d8;
      a {
        flex: 6;
        height: 53px;
        line-height: 53px;
        font-size: 16px;
        color: #467eea;
        text-align: center;
        &:nth-child(2) {
          border-left: 1px solid #d8d8d8;
        }
      }
    }
  }

  .v-dialog-enter-active {
    animation: dialog-in .5s;
  }

  .v-dialog-leave-active {
    animation: dialog-out .3s;
  }

  @keyframes dialog-in {
    0% {
      transform: translate(-50%, -50%) scale(1.185);
      opacity: 0;
    }
    100% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 1;
    }
  }

  @keyframes dialog-out {
    0% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 1;
    }
    100% {
      transform: translate(-50%, -50%) scale(0.85);
      opacity: 0;
    }
  }

  .v-mask-enter, .v-mask-leave-active {
    opacity: 0;
  }

  .v-mask-leave-active, .v-mask-enter-active {
    transition: opacity 300ms;
  }
</style>
