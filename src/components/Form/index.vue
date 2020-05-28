<template>
  <div class="form-group">
    <slot/>
  </div>
</template>

<script>
  export default {
    name: 'Form',

    provide () {
      return {
        rules: this.rules
      };
    },

    props: {
      formData: {
        type: Object,
        default: function () {
          return {}
        }
      },
      rules: {
        type: Object,
        default: function () {
          return {}
        }
      }
    },

    data () {
      return {}
    },

    methods: {
      submit (callback) {
        let valid = true;
        for (let prop in this.rules) {
          // 没有此属性
          if (!this.rules.hasOwnProperty(prop)) {
            return;
          }

          // 必填项数据为空
          if (this.rules[prop].required && this.formData[prop] === '') {
            // modal.alert({message: this.rules[prop].message});
            this.rules[prop].show = true;
            valid = false;
          }

          // 自定义校验方法
          if (this.rules[prop].checkFun !== undefined && this.rules[prop].checkFun !== null) {
            // 校验未通过
            if (!this.rules[prop].checkFun(this.formData[prop])) {
              if (this.formData[prop].length) {
                this.rules[prop].message = this.rules[prop].checkMessage;
              }

              this.rules[prop].show = true;
              valid = false;
            }
          }
        }

        if (typeof callback === 'function') {
          callback(valid)
        }
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
