<template>
  <div>
    <!--遮罩层-->
    <div class="area-mask " @click="onCancel" :class="{'area-mask-active': show}"></div>

    <transition name="fade">
      <div class="area-container" :class="{'area-container-active': show}" v-if="show">
        <section class="area-main">
          <header class="area-header">
            <a class="area-cancel" href="javascript:;" @click="onCancel">取消</a>
            <span>所在地区</span>
            <a class="area-close" href="javascript:;" @click="onConfirm">确定</a>
          </header>

          <!--显示选中数据-->
          <div class="area-top  border-a">
            <div class="area-province area-top-item" :class="{'area-top-active': 1 === areaStatus}" @click="selectArea(1)">{{checkArea.province}}</div>
            <div class="area-city area-top-item" :class="{'area-top-active': 2 === areaStatus}" @click="selectArea(2)">{{checkArea.city}}</div>
            <div class="area-region area-top-item" :class="{'area-top-active': 3 === areaStatus}" @click="selectArea(3)">{{checkArea.region}}</div>
          </div>

          <!--地区列表-->
          <div class="area-content border">
            <ul class="area-data" :class="{'toggle-visible': 1 !== areaStatus}">
              <li class="area-data-item" v-for="(item, key, index) in areaList" @click="checkProvOne(key, item)"
                  :class="{red: key === checkProvince}" :key="index">
                <span class="area-text">{{item.name}}</span>
                <i class="icon-check iconfont" style="margin-left: 0.1rem" :class="{'toggle-visible': key !== checkProvince}"></i>
              </li>
            </ul>
            <ul class="area-data" :class="{'toggle-visible': 2 !== areaStatus}" v-if="areaList[checkProvince]">
              <li class="area-data-item" v-for="(item, key, index) in areaList[checkProvince].child"
                  @click="checkCityOne(key, item.name, checkProvince)" :class="{red: key === checkCity}" :key="index">
                <span class="area-text">{{item.name}}</span>
                <i class="icon-check iconfont" style="margin-left: 0.1rem" :class="{'toggle-visible': key !== checkCity}"></i>
              </li>
            </ul>
            <ul class="area-data" :class="{'toggle-visible': 3 !== areaStatus}"
                v-if="areaList[checkProvince] && areaList[checkProvince].child[checkCity].child">
              <li class="area-data-item" v-for="(item, key, index) in areaList[checkProvince].child[checkCity].child"
                  @click="checkRegionOne(key, item.name)" :class="{red: key === checkRegion}" :key="index">
                <span class="area-text">{{item.name}}</span>
                <i class="icon-check iconfont" style="margin-left: 0.1rem" :class="{'toggle-visible': key !== checkRegion}"></i>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'AddressList',

    props: ['areaList', 'value'],

    data() {
      return {
        show: this.value,
        maskStatus: true,
        areaStatus: 1,
        checkProvince: 0,
        checkCity: 0,
        checkRegion: 0,
        checkArea: {
          province: '请选择',
          city: '请选择',
          region: '请选择'
        }
      }
    },

    watch: {
      value (newVal) {
        this.show = newVal;
      },

      show () {
        this.$emit('input', this.show);
      }
    },

    methods: {
      // 取消
      onCancel () {
        this.show = false;
      },

      onConfirm() { // 关闭选择器 广播事件
        this.show = false;
        let data = `${this.checkArea.province} ${this.checkArea.city} ${this.checkArea.region}`;

        // 判断是默认值就不做更新
        if (this.checkArea.province === '请选择') {
          return
        }

        this.$emit('update', data); // 更新选择的地址
      },

      selectArea(it) { // 高亮 省 市 区 其中一个
        this.areaStatus = it;
      },

      checkProvOne(it, item) { // 选择省份
        console.log(item, 888)
        this.checkProvince = it;
        this.checkArea.province = item.name;
        this.checkArea.city = this.areaList[it].child[0].name;
        this.checkArea.region = this.areaList[it].child[0].child && this.areaList[it].child[0].child.length !== 0
          ? this.areaList[it].child[0].child[0].name : '无';
        this.checkCity = 0;
        this.checkRegion = 0;
        this.areaStatus = 2;
      },

      checkCityOne(it, name, its) { // 选择市区
        this.checkCity = it;
        this.checkArea.province = this.areaList[its].name;
        this.checkArea.city = name;
        this.checkArea.region = this.areaList[its].child[it].child && this.areaList[its].child[it].child.length !== 0
          ? this.areaList[its].child[it].child[0].name : '无';
        this.checkRegion = 0;
        this.areaStatus = 3;
      },

      checkRegionOne(it, name) { // 选择区
        this.checkArea.province = this.areaList[this.checkProvince].name;
        this.checkArea.city = this.areaList[this.checkProvince].child[this.checkCity].name;
        this.checkRegion = it;
        this.checkArea.region = name;
      }
    }
  }
</script>

<style scoped lang=scss>
  @import "~style/variable";
  @import "~style/extends";

  .toggle-visible {
    display: none;
  }

  .area {
    &-mask {
      position: fixed;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      background: #000;
      opacity: .7;
      display: none;

      &-active {
        z-index: 99;
        display: block;
      }
    }

    &-container {
      display: none;
      background-color: #fff;

      &-active {
        z-index: 100;
        display: block;
        height: 280px;
        width: 100%;
        position: fixed;
        top: auto;
        left: 0;
        bottom: 0;
      }
    }

    &-header {
      border-bottom: 1px solid $border-color;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 40px;
      line-height: 40px;
      text-align: center;
      font-size: 14px;
      padding: 0 16px;
    }

    &-cancel {
      color: $color1;
    }

    &-close {
      color: $color2;
    }

    &-top {
      border-bottom: 1px solid $border-color;
      display: flex;
      align-items: center;
      height: 40px;
      line-height: 40px;
      padding: 0 10px;

      &-item {
        font-size: 14px;
        padding: 0 6px;
        max-width: 100px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      &-active {
        height: 40px;
        color: #26a2ff;
        border-bottom: 1px solid #26a2ff;
      }
    }

    &-data {
      height: 200px;
      overflow: auto;

      &-item {
        border-bottom: 1px solid $border-color;
        height: 40px;
        line-height: 40px;
        padding: 0 16px;
        font-size: 14px;
      }
    }
  }

  .red {
    color: #26a2ff;
  }

  .fade-enter-active, .fade-leave-active {
    transition: height .2s
  }

  .fade-enter, .fade-leave-active {
    height: 0
  }
</style>
