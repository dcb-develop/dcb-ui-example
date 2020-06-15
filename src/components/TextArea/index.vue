<template>
  <div class="textarea-wrap">
    <textarea :maxlength="maxCount" :placeholder="placeholder" v-model="message" @input="onInput"></textarea>
    <p>{{count}}/{{maxCount}}</p>
  </div>
</template>

<script>
  export default {
    name: 'textarea',

    props: {
      placeholder: {
        type: String,
        default: ''
      },

      maxCount: {
        type: Number,
        default: 0
      },

      prop: {
        type: String
      },

      formData: Object
    },

    data () {
      return {
        count: 0,
        message: ''
      }
    },

    activated () {
      this.message = '';
    },

    watch: {
      message () {
        this.count = this.message.length;
      }
    },

    methods: {
      onInput (e) {
        this.$emit('input', e.target.value, this.prop)
      }
    }
  }
</script>

<style scoped lang=scss>
  @import "~@/assets/scss/variable";
  @import "~@/assets/scss/extends";

  .textarea-wrap {
    border-radius: 8px;
    border: 1px solid rgba(229, 229, 229, 1);
    position: relative;
    overflow: hidden;
    margin-top: 6px;

    textarea {
      display: block;
      padding: 12px 12px 24px;
      width: 100%;
      height: 100%;
      resize: none;
      border: none;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      color: rgba(70, 81, 102, 1);

      &::placeholder {
        color: $placeholder-color;
      }
    }

    p {
      text-align: right;
      padding-right: 8px;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      line-height: 17px;
      font-size: $fz12;
      font-family: $pfr;
      color: $placeholder-color;
      background-color: #fff;
      padding-bottom: 8px;
    }
  }
</style>
