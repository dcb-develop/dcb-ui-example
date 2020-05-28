<template>
  <div class="wrapper">
    <div class="main">
      <!--抽奖区域-->
      <div class="luck-draw-content">
        <div class="luck-draw-roulette">
          <canvas class="luck-draw-pan" ref="luck-draw-pan" width="648" height="648" style="width: 100%; height: 100%"
                  :style="{transform: rotateAngel, transition: 'transform '+ time + 's' +' ease'}">抱歉！浏览器不支持。
          </canvas>

          <img class="luck-draw-pointer" src="@/assets/images/pointer.png">
        </div>
        <button class="luck-draw-start" @click="startHandle">开始抽奖</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'LuckDraw',

    data() {
      return {
        isClickedFlag: false, // 连续点击开关
        rotateDegree: 0, // 初始旋转角度
        rotateAngel: 0, // 将要旋转的角度
        time: 4, // 执行动画时间
        prizeList: [
          {
            icon: 'https://dcb-maotai-resource.gogpay.cn/image/8aaa838672134472017225aa45760035.jpg',
            sortIndex: 0,
            name: '奖品0'
          },
          {
            icon: 'https://dcb-maotai-resource.gogpay.cn/image/8aaa838672134472017225a14ee10032.jpg',
            sortIndex: 1,
            name: '奖品1'
          },
          {
            icon: 'https://dcb-maotai-resource.gogpay.cn/image/8aaa838672134472017225a1219b0031.jpg',
            sortIndex: 2,
            name: '奖品2'
          },
          {
            icon: 'https://dcb-maotai-resource.gogpay.cn/image/8aaa838672134472017225a0ee00002f.png',
            sortIndex: 3,
            name: '奖品3'
          },
          {
            icon: 'https://dcb-maotai-resource.gogpay.cn/image/8aaa838672134472017225aa83fe0036.jpg',
            sortIndex: 4,
            name: '奖品4'
          },
          {
            icon: 'https://dcb-maotai-resource.gogpay.cn/image/8aaa83d1723b9ee9017247a6466e023e.png',
            sortIndex: 5,
            name: '奖品5'
          }
        ],
        number: 6
      }
    },

    mounted() {
      this.canvasRun()
    },

    methods: {
      canvasRun() {
        let canvas = this.$refs['luck-draw-pan'];
        let ctx = canvas.getContext('2d')
        let cw = canvas.width / 2;
        let ch = canvas.height / 2;
        this.createCircularImage(ctx, cw, ch);
      },

      // 各奖项
      createCircularImage(ctx, cw, ch) {
        let step = 2 * Math.PI / this.number;
        for (let i = 0; i < this.number; i++) {
          let img = new Image()
          img.src = this.prizeList[i].icon;

          this.createCircularText(cw - 100, this.prizeList[i].name, ctx, this.rads((60 * i) - 110), this.rads((60 * i) - 70), cw);

          img.onload = () => {
            ctx.save();
            ctx.beginPath();
            ctx.translate(cw, ch);
            ctx.rotate(i * step);
            ctx.drawImage(img, -50, -200, 100, 100);
            ctx.closePath();
            ctx.restore();
          }
        }
      },

      createCircularText(radius, str, ctx, startAngle, endAngle, cw) {
        let angleDecrement = (startAngle - endAngle) / (str.length - 1)
        let angle = parseFloat(startAngle);
        let index = 0;
        let character;

        ctx.save()
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#975028';
        ctx.font = '28px Microsoft YaHei';

        while (index < str.length) {
          character = str.charAt(index)
          ctx.save()
          ctx.beginPath()
          ctx.translate(cw + Math.cos(angle) * radius, cw + Math.sin(angle) * radius);
          ctx.rotate(Math.PI / 2 + angle) // Math.PI/2为旋转90度  Math.PI/180*X为旋转多少度
          ctx.fillText(character, 0, 0)
          angle -= angleDecrement
          index++
          ctx.restore()
        }
        ctx.restore()
      },

      rads(x) {
        return Math.PI * x / 180;
      },

      // 开始抽奖
      startHandle() {
        if (this.isClickedFlag) {
          return
        }

        this.isClickedFlag = true;
        // 中奖索引
        this.rotating({index: 5});
      },

      // 转动函数
      rotating(data) {
        let angle = [0, 300, 240, 180, 120, 60]; // 最终会旋转到下标的位置需要的度数
        let circle = 5;

        // 转动指针
        let rotateAngel = this.rotateDegree + circle * 360 + angle[data.index] - this.rotateDegree % 360; // 这里为计算旋转的角度，考虑第一次旋转后的结果
        this.$set(this, 'rotateDegree', rotateAngel);
        this.$set(this, 'rotateAngel', `rotate(${rotateAngel}deg)`);

        setTimeout(() => {
          this.isClickedFlag = false;
        }, 5000)
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "~@/assets/scss/variable";
  @import "~@/assets/scss/extends";

  .luck-draw {
    &-content {
      border-radius: 8px;
      background-color: rgba(255, 251, 239, 1);
      min-height: 460px;
      margin-bottom: 20px;
      padding: 43px 0 14px;
      position: relative;
    }

    &-roulette {
      position: relative;
      overflow: hidden;
      padding-left: 10px;
      padding-right: 10px;
      margin-bottom: 10px;
    }

    &-pan {
      background-image: url('~@/assets/images/luck-draw-pan.jpg');
      background-size: 100% 100%;
      border-radius: 100%;
      width: 323px;
      height: 323px;
      position: relative;
      overflow: hidden;

      &-prize {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        padding-top: 45px;
        text-align: center;

        span {
          color: #975028;
          display: block;
          font-size: $fz14;
          font-weight: bold;
          transform: skew(30deg);
        }
      }

      img {
        width: 63px;
        height: 63px;
      }
    }

    &-pointer {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      width: 120px;
    }

    &-start {
      background-image: url("~@/assets/images/button.png");
      background-size: 100% 100%;
      background-color: transparent;
      color: rgba(122, 59, 24, 1);
      display: block;
      font-size: $fz18;
      font-family: Source Han Sans CN;
      font-weight: bold;
      height: 50px;
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 10px;
      width: 255px;
    }
  }
</style>
