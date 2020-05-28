<template>
  <div class="radio-wrap">
    <label class="radio-item" v-for="(item, index) in options" :key="index" @click="onCheck(item)">
      <i class="icon-font" v-html="item.checked ? icons[1] : icons[0]"></i> {{item.name}}
    </label>
  </div>
</template>

<script>
export default {
  name: 'index',

  props: {
    options: {
      type: Array,
      default: () => {
        return []
      }
    },

    prop: String
  },

  data () {
    return {
      icons: ['&#xe6c9;', '&#xe654;']
    }
  },

  created () {
    this.initChecked()
  },

  methods: {
    initChecked () {
      this.options.forEach(item => {
        if (item.checked) {
          this.$emit('change', {prop: this.prop, item});
        }
      });
    },

    onCheck (item) {
      this.options.forEach(el => {
        el.checked = false;
      })

      item.checked = true

      this.$emit('change', {prop: this.prop, item});
    }
  }
}
</script>

<style scoped lang="scss">
  @import "~style/variable";
  @import "~style/extends";

  .radio {
    &-wrap {
      display: flex;
      align-items: center;
    }

    &-item {
      display: flex;
      align-items: center;
      color: $color1;
      font-size: $fz16;
      font-family: $pfr;
      line-height: 25px;
      margin-right: 12px;

      i {
        color: rgba(255, 168, 9, 1);
        font-size: 22px;
        margin-right: 12px;
      }
    }
  }
</style>
