<template>
  <div class="share-wrap" @touchmove.prevent :value="value">
    <transition name="fade">
      <div class="share-mask" v-show="show" @click="show = false" @touchmove="_stopDef" @mousewheel="_stopDef"></div>
    </transition>

    <transition name="up">
      <div class="share-content" v-show="show" @mousewheel="_stopDef">
        <div class="title">分享到</div>
        <div class="social-share">
          <a v-for="(item, index) in options" :key="index" @click.stop="onShare">
            <img :src="sites[item].icon">
            <span>{{sites[item].name}}</span>
          </a>
        </div>

        <a class="cancel" href="javascript:;" @click.stop="onCancel">取消</a>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    props: {
      value: {
        type: Boolean,
        default: false
      },

      options: {
        type: Array,
        default: () => {
          return []
        }
      },

      title: {
        type: String,
        default: ''
      },

      description: {
        type: String,
        default: ''
      }
    },

    data() {
      return {
        show: this.value,
        sites: {
          '微信': {
            icon: '',
            name: '微信'
          },
          '朋友圈': {
            icon: '',
            name: '朋友圈'
          },
          'QQ': {
            icon: '',
            name: 'QQ'
          },
          'QQ空间': {
            icon: '',
            name: 'QQ空间'
          },
          '微博': {
            icon: '',
            name: '微博'
          }
        }
      }
    },

    watch: {
      value(val) {
        this.show = val;
      },

      show() {
        this.$emit('input', this.show);
      }
    },

    methods: {
      _stopDef(e) {
        e.preventDefault();
      },

      onCancel() {
        this.show = false;
      },

      onShare () {

      }
    }
  }
</script>

<style scoped lang="scss">
  @import "~style/variable";
  @import "~style/extends";

  .share {
    &-mask {
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: 20;
      background-color: rgba(0, 0, 0, .5);
    }

    &-content {
      background-color: #fff;
      position: fixed;
      overflow: hidden;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 25;
      padding-top: 16px;

      .title {
        color: $color1;
        font-size: $fz16;
        font-family: $pfr;
        text-align: center;
      }

      .social-share {
        border-bottom: 4px solid rgba(238, 239, 240, 1);
        @extend %flex-justify-center;
        padding: 16px 12px;

        a {
          color: $color1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-size: $fz16;
          font-family: $pfr;
          text-align: center;
          user-select: none;
          margin-right: 30px;

          img {
            height: 40px;
            width: 40px;
            margin-bottom: 10px;
          }

          span {
            white-space: nowrap;
            line-height: 20px;
          }

          &:nth-child(2) {
            a {
              color: rgba(87, 121, 219, 1);
              font-family: $pfm;
              font-weight: bold;
            }
          }

          &:last-child {
            border-bottom: none;
            margin-right: 0;
          }
        }
      }
    }
  }

  .cancel {
    background-color: #fff;
    display: block;
    color: $color1;
    font-size: $fz16;
    font-family: $pfm;
    font-weight: bold;
    height: 44px;
    line-height: 44px;
    text-align: center;
  }

  .fade-enter-active, .fade-leave-active {
    transition: all .2s ease;
  }

  .fade-enter, .fade-leave-active {
    opacity: 0
  }

  .up-enter-active, .up-leave-active {
    transition: all .3s ease
  }

  .up-enter, .up-leave-active {
    transform: translate(0, 265px)
  }
</style>
