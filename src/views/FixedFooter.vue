<template>
  <div class="wrapper">
    <v-form ref="form" :form-data="formData" :rules="rules">
      <form-item label="姓名" prop="name">
        <input
          class="input-control"
          type="text"
          placeholder="请填写"
          v-model.trim="formData.name"
          @input="onBlur('name', $event)"/>
      </form-item>
      <form-item label="身份证号" prop="idCard">
        <input
          class="input-control"
          type="text"
          placeholder="请填写"
          v-model.trim="idCard"
          @input="onBlur('idCard', $event)"/>
      </form-item>
      <form-item label="单位名称" prop="unitName">
        <input
          class="input-control"
          type="text"
          placeholder="请填写"
          v-model.trim="formData.unitName"
          @input="onBlur('unitName', $event)"/>
      </form-item>
      <form-item label="来访目的" prop="purpose">
        <input
          class="input-control"
          type="text"
          placeholder="请填写"
          v-model.trim="formData.purpose"
          @input="onBlur('purpose', $event)"/>
      </form-item>
      <form-item label="手机号" prop="phone">
        <input
          class="input-control"
          type="text"
          placeholder="请填写"
          v-model.trim="formData.phone"
          @input="onBlur('phone', $event)"/>
      </form-item>
    </v-form>

    <footer>
      <button type="button" class="submit-btn" @click="onSubmit('form')">提交</button>
    </footer>
  </div>
</template>

<script>
  import VForm from '@/components/Form'
  import FormItem from '@/components/Form/FormItem'

  export default {
    name: 'FixedFooter',

    components: {
      VForm,
      FormItem
    },

    data() {
      return {
        formData: {
          idCard: '',
          name: '',
          phone: '',
          purpose: '',
          unitName: ''
        },
        rules: {
          name: {
            required: true,
            show: false,
            message: '请填写姓名',
            checkMessage: '姓名格式错误',
            checkFun: (value) => {
              return /^[\u4e00-\u9fa5]{2,10}$/.test(value);
            }
          },
          idCard: {
            required: true,
            show: false,
            message: '请填写身份证',
            checkMessage: '身份证格式错误',
            checkFun: (value) => {
              return /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx])|([1−9]\d5\d2((0[1−9])|(10|11|12))(([0−2][1−9])|10|20|30|31)\d2[0−9Xx])$/.test(value);
            }
          },
          unitName: {
            required: true,
            show: false,
            message: '请填写单位名称'
          },
          purpose: {
            required: true,
            show: false,
            message: '请填写来访目的'
          },
          phone: {
            required: true,
            show: false,
            message: '请填写手机号',
            checkMessage: '手机号格式错误',
            checkFun: (value) => {
              return /^0?(13[0-9]|15[012356789]|16[012356789]|18[0123456789]|19[0123456789]|14[0123456789]|17[0123456789])[0-9]{8}$/.test(value);
            }
          }
        }
      }
    },

    computed: {
      idCard: {
        get: function () {
          return this.formData.idCard;
        },
        set: function (val) {
          this.formData.idCard = val.toUpperCase();
        }
      }
    },

    methods: {
      // input失去焦点
      onBlur(prop, e) {
        if (e.target.value.length) {
          this.rules[prop].show = false;
        }
      },

      onSubmit (form) {
        console.log(this.formData)
        this.$refs[form].submit(valid => {
          if (valid) {

          } else {
            this.$toast.show({text: '请按规则正确填写数据！'})
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "~style/variable";
  @import "~style/extends";

  .wrapper {
    padding-bottom: 60px;
    overflow: auto;
  }

  input.input-control  {
    width: 100%;
  }

  .input-control {
    @extend %flex-justify-center-between;
    color: $color1;
    font-size: $fz20;
    font-family: $pfr;
    flex: 1;

    &.placeholder {
      color: $color5;
    }

    i {
      color: $color5;
      font-size: $fz24;
      font-family: $pfr;
    }
  }

  .form-group {
    margin-bottom: 40px;
  }

  footer {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 20px;
  }
</style>
