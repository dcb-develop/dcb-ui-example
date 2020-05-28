<template>
  <div class="wrapper">
    <div class="form-group">
      <div class="form-item">
        <label>年龄</label>
        <div class="form-control">
          <v-radio prop="age" :options="age" @change="onChange"/>
        </div>
      </div>
      <div class="form-item">
        <label>性别</label>
        <div class="form-control">
          <v-radio prop="sex" :options="sex" @change="onChange"/>
        </div>
      </div>
      <div class="form-item">
        <label>运动</label>
        <div class="form-control">
          <v-radio prop="sport" :options="sport" @change="onChange"/>
        </div>
      </div>
    </div>

    <button class="submit-btn" type="button" @click="onSubmit">提交</button>
  </div>
</template>

<script>
  import VRadio from '@/components/Radio'

  export default {
    name: 'Radio',

    components: {
      VRadio
    },

    data() {
      return {
        age: [
          {
            name: '18岁',
            code: '18',
            checked: true
          },
          {
            name: '30岁',
            code: '30',
            checked: false
          }
        ],
        sex: [
          {
            name: '男',
            code: false,
            checked: true
          },
          {
            name: '女',
            code: true,
            checked: false
          }
        ],
        sport: [
          {
            name: '篮球',
            code: '1',
            checked: true
          },
          {
            name: '足球',
            code: '2',
            checked: false
          }
        ],
        formData: {
          age: '',
          sex: '',
          sport: ''
        }
      }
    },

    methods: {
      // 提交数据
      onSubmit () {
        console.log(this.formData)
      },

      // radio选中回调
      onChange ({prop, item: {name, code, checked}}) {
        this.formData[prop] = code
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "~style/variable";
  @import "~style/extends";

  .form-group {
    margin-bottom: 40px;

    .form-item {
      display: flex;
      flex-direction: column;
      padding: 12px 0;
      border-bottom: 1px solid $color5;
    }

    label {
      color: $color1;
      font-size: $fz16;
      font-family: $pfr;
      margin-bottom: 8px;
    }
  }
</style>
