<template>
  <div :class="['form-control', borderBottom ? 'set-border-bottom' : 'reset-border-bottom']">
    <div class="label-group">
      <em class="required" v-if="rules[prop] && rules[prop].required">*</em>
      <label class="label-name">{{label}}</label>
    </div>

    <slot />
    <div class="message" v-if="rules[prop] && rules[prop].show">{{rules[prop].message}}</div>
  </div>
</template>

<script>
  export default {
    name: 'FormItem',

    inject: ['rules'],

    props: {
      // label文本
      label: {
        type: String,
        default: ''
      },
      prop: {
        type: String,
        default: ''
      },
      // 下边框
      borderBottom: {
        type: Boolean,
        default: true
      },
      count: {
        type: Object,
        default: () => {
          return {
            show: false,
            num: 0
          }
        }
      },
      max: {
        type: Number,
        default: 200
      }
    },

    data () {
      return {}
    },

    computed: {
      listeners () {
        return this.$listeners;
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "~style/variable";

  .form-control {
    padding: 20px 0 22px;
    position: relative;
  }

  .set-border-bottom {
    border-bottom: 1px solid rgba(238, 239, 240, 1);
  }

  .label-group {
    margin-bottom: 16px;

    .required {
      color: rgba(224, 32, 32, 1);
    }

    .label-name {
      color: $color1;
      font-size: $fz16;
      font-family: $pfr;
      line-height:22px;
    }
  }

  .message {
    position: absolute;
    left: 0;
    bottom: 0;
    color: rgba(224, 32, 32, 1);
    font-size: $fz12;
    font-family: $pfr;
    line-height: 22px;
  }
</style>
