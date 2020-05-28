<template>
  <div class="wrapper">
    <h1 class="page-name">关于我们</h1>

    <div class="logo-wrap el-shadow mb-16">
      <img src="@/assets/images/logo.png" alt="logo">
      <span>V5.3.3</span>
    </div>

    <ul class="list el-shadow">
      <li>
        <span>关于我们</span>
        <img src="@/assets/images/next.png">
      </li>
      <li>
        <span>检查更新</span>
        <img src="@/assets/images/next.png">
      </li>
      <li>
        <span>联系我们</span>
        <img src="@/assets/images/next.png">
      </li>
      <li>
        <span>分享应用</span>
        <img src="@/assets/images/next.png">
      </li>
      <li>
        <span>服务协议</span>
        <img src="@/assets/images/next.png">
      </li>
      <li>
        <span>隐私协议</span>
        <img src="@/assets/images/next.png">
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'AboutUs',

    data() {
      return {}
    },

    mounted() {
    },

    methods: {}
  }
</script>

<style scoped lang="scss">
  .logo-wrap {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 27px 0 19px;

    img {
      width: 121px;
      height: 36px;
      margin-bottom: 9px;
    }

    span {
      font-size: 17px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: bold;
      color: rgba(171, 178, 193, 1);
      line-height: 24px;
    }
  }

  .list {
    padding-left: 14px;

    li {
      border-bottom: 1px solid rgba(236, 238, 240, 1);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 15px 15px 15px 0;

      &:last-child {
        border-bottom: none;
      }

      span {
        font-size: 15px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: bold;
        color: rgba(70, 81, 102, 1);
        line-height: 21px;
      }

      img {
        width: 20px;
        height: 20px;
      }
    }
  }
</style>
