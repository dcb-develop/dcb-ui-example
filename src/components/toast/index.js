import toast from './index.vue'

export default {
  install: (Vue) => {
    // 如果toast还在，则不再执行
    if (document.getElementsByClassName('toast-box').length) {
      return
    }
    let ToastTemp = Vue.extend(toast) // 创建vue构造器
    // el：提供一个在页面上已存在的DOM元素作为Vue实例的挂载目标。可以是css选择器，也可以是HTMLElement实例。
    // 在实例挂载之后，可以通过$vm.$el访问。
    // 如果这个选项在实例化时有用到，实例将立即进入编译过程。否则，需要显示调用vm.$mount()手动开启编译(如下)
    // 提供的元素只能作为挂载点。所有的挂载元素会被vue生成的dom替换。因此不能挂载在顶级元素(html, body)上
    // let $vm = new toastTpl({
    //  el: document.createElement('div')
    // })
    let $vmToast = new ToastTemp() // 实例化vue实例
    // 此处使用$mount来手动开启编译。用$el来访问元素，并插入到body中
    let tplToast = $vmToast.$mount().$el
    document.body.appendChild(tplToast)

    Vue.prototype.$toast = { // 在Vue的原型上添加实例方法，以全局调用
      show (options) { // 控制toast显示的方法
        if (typeof options === 'string') { // 对参数进行判断
          $vmToast.text = options // 传入props
        } else if (typeof options === 'object') {
          Object.assign($vmToast, options) // 合并参数与实例
        }
        setTimeout(() => {
          $vmToast.show = true // 显示toast
        }, 400)
      },
      hide () { // 控制toast隐藏的方法
        $vmToast.show = false
      }
    }
  }
};
