import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Index = resolve => require(['@/views/index'], resolve)
const PDFReview = resolve => require(['@/views/PDFReview'], resolve)
const Form = resolve => require(['@/views/Form'], resolve)
const FixedFooter = resolve => require(['@/views/FixedFooter'], resolve)
const Radio = resolve => require(['@/views/Radio'], resolve)
const AboutUs = resolve => require(['@/views/AboutUs'], resolve)
const ImageClip = resolve => require(['@/views/ImageClip'], resolve)
const Call = resolve => require(['@/views/Call'], resolve)
const SocialShare = resolve => require(['@/views/SocialShare'], resolve)
const Seamless = resolve => require(['@/views/Seamless'], resolve)
const LuckDraw = resolve => require(['@/views/LuckDraw'], resolve)

let routes = [
  {
    path: '/',
    name: 'index',
    component: Index
  },
  {
    path: '/view/index',
    name: 'index',
    redirect: '/', // 重定向
    component: Index
  },
  {
    path: '/view/pdf-review',
    name: 'pdf-review',
    component: PDFReview
  },
  {
    path: '/view/form',
    name: 'form',
    component: Form
  },
  {
    path: '/view/fixed-footer',
    name: 'fixed-footer',
    component: FixedFooter
  },
  {
    path: '/view/Radio',
    name: 'radio',
    component: Radio
  },
  {
    path: '/view/about-us',
    name: 'about-us',
    component: AboutUs
  },
  {
    path: '/view/image-clip',
    name: 'image-clip',
    component: ImageClip
  },
  {
    path: '/view/call',
    name: 'call',
    component: Call
  },
  {
    path: '/view/share',
    name: 'share',
    component: SocialShare
  },
  {
    path: '/view/seamless',
    name: 'seamless',
    component: Seamless
  },
  {
    path: '/view/luck-draw',
    name: 'luck-draw',
    component: LuckDraw
  }
]

export default new Router({
  mode: 'history',
  routes: routes,
  scrollBehavior (to, from, savedPosition) {
    return savedPosition ? savedPosition : {x: 0, y: 0}
  }
})
