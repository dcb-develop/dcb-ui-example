<template>
  <div class="seamless-warp">
    <img src="@/assets/images/icon-msg.png">

    <div class="seamless-list">
      <ul class="item" :class="{'animate-up': animateUp}">
        <li v-for="(item, index) in listData" :key="index" @click="onJump(item, 2)">{{item.title | ellipsis(17)}}</li>
      </ul>
    </div>

    <span class="icon-font">更多</span>
  </div>
</template>

<script>
  export default {
    name: 'Seamless',

    data () {
      return {
        listData: [
          {
            title: '贵州省视察视察视察视察视察啊…',
            date: '2020-4-21'
          },
          {
            title: '贵州省视察视察视察视察视察啊…',
            date: '2020-4-21'
          },
          {
            title: '贵州省视察视察视察视察视察啊…',
            date: '2020-4-21'
          },
          {
            title: '贵州省视察视察视察视察视察啊…',
            date: '2020-4-21'
          }
        ],
        animateUp: false,
        timer: null
      }
    },

    filters: {
      ellipsis(value, count) {
        if (!value) return ''
        if (value.length > count) {
          return value.slice(0, count) + '...'
        }
        return value
      }
    },

    mounted() {
      this.timer = setInterval(this.scrollAnimate, 5000);
    },

    methods: {
      scrollAnimate() {
        this.animateUp = true
        setTimeout(() => {
          this.listData.push(this.listData[0])
          this.listData.shift()
          this.animateUp = false
        }, 500)
      },

      onJump () {}
    },

    destroyed() {
      clearInterval(this.timer)
    }
  }
</script>

<style scoped lang="scss">
  @import "~style/variable";
  @import "~style/extends";

  .seamless {
    &-warp {
      @extend %flex-items-center;
      padding: 20px 16px;

      img {
        width: 63px;
        height: 16px;
      }

      li {
        color: rgba(29, 29, 28, 1);
        font-size: 14px;
        font-family: $pfr;
        padding-left: 12px;
        width: 100%;
        height: 20px;
        line-height: 20px;
        overflow: hidden;
      }

      span {
        border-left: 1px solid rgba(211, 211, 211, 1);
        color: rgba(29, 29, 28, 0.48);
        font-size: 14px;
        height: 20px;
        line-height: 20px;
        margin-left: auto;
        padding-left: 12px;
      }
    }

    &-list {
      height: 20px;
      overflow: hidden;
    }
  }

  .animate-up {
    transition: all 0.5s ease-in-out;
    transform: translateY(-20px);
  }
</style>
