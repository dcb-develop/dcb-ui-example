<template>
  <div class="call-wrap" @touchmove.prevent :value="value">
    <transition name="fade">
      <div class="call-mask" v-show="show" @click="show = false" @touchmove="_stopDef" @mousewheel="_stopDef"></div>
    </transition>

    <transition name="up">
      <div class="call-content" v-show="show" @mousewheel="_stopDef">
        <ul>
          <li>{{phone}}</li>
          <li>
            <a :href="'tel:' + phone">呼叫</a>
          </li>
          <li @click.stop="onCopy">复制号码
          </li>
        </ul>

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

      phone: String
    },

    data() {
      return {
        show: this.value
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

      onCopy() {
        this.$copyText(this.phone).then((e) => {
          this.$toast.show({text: '复制成功'});
        }, (e) => {
          this.$toast.show({text: '复制失败'});
        })
      },

      onCancel() {
        this.show = false;
      }
    }
  }
</script>

<style lang="scss">
  @import "~style/variable";

  .call {
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
      position: fixed;
      overflow: hidden;
      left: 16px;
      right: 16px;
      bottom: 10px;
      z-index: 25;

      ul {
        border-radius: 8px;
        background-color: #fff;
        padding: 0 12px;
        margin-bottom: 8px;

        li {
          border-bottom: 1px solid $border-color;
          color: $color1;
          font-size: $fz16;
          font-family: $pfr;
          padding: 10px 0;
          text-align: center;
          user-select: none;

          &:nth-child(2) {
            a {
              color: rgba(87, 121, 219, 1);
              font-family: $pfm;
              font-weight: bold;
            }
          }

          &:last-child {
            border-bottom: none;
          }
        }
      }
    }
  }

  .cancel {
    border-radius: 8px;
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
