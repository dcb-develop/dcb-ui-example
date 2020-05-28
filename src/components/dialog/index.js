import dialog from './index.vue'

export default {
  install: (Vue) => {
    if (document.getElementsByClassName('dialog').length) {
      return
    }
    let DialogTemp = Vue.extend(dialog)
    let $vmDialog = new DialogTemp()
    let tplDialog = $vmDialog.$mount().$el
    document.body.appendChild(tplDialog)

    Vue.prototype.$dialog = {
      show (options) {
        if (typeof options === 'string') {
          $vmDialog.text = options
        } else if (typeof options === 'object') {
          Object.assign($vmDialog, options)
        }
        $vmDialog.show = true
      },
      hide () {
        $vmDialog.show = false
      }
    }
  }
};
