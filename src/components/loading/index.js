import load from './index.vue'

export default {
  install: (Vue) => {
    if (document.getElementsByClassName('loading').length) {
      return
    }

    let LoadTemp = Vue.extend(load);
    let $vmLoad = new LoadTemp();
    let tplLoad = $vmLoad.$mount().$el;

    document.body.appendChild(tplLoad);

    Vue.prototype.$load = {
      show (options) {
        if (typeof options === 'string') {
          $vmLoad.text = options
        } else if (typeof options === 'object') {
          Object.assign($vmLoad, options)
        }
        $vmLoad.show = true;
      },
      hide () {
        // 初始化组件的值
        $vmLoad.text = '加载中';
        $vmLoad.mask = false;
        $vmLoad.show = false;
      }
    }
  }
};
