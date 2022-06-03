import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'

Vue.config.productionTip = false

var ROOT = "http://101.43.201.20:9008";
Vue.prototype.$server=ROOT;

function getToday(){
    var d = new Date();
    var format='';
    var year = d.getFullYear();
    var month= d.getMonth()+1;
    var day = d.getDate();
    format += year + '-';
    format += (month<10?'0':'')+month + '-';
    format += (day < 10?'0':'')+day;
    return format;
}
Vue.prototype.$today=getToday();

var user={
    id:2022000000,
    name:'测试用户',
    auth:'0',
    email:'test@noui.cloud',
    gender:'女',
    school:'测试学院',
    major:'测试专业',
    classid:'2022111000'
}
var timetable={
    table:[],
    detail:[],
}
var introduction={
    school:'School Introduction',
    major:'Major Introduction',
    classid:'Class Introduction',
}
Vue.prototype.$USER=user
Vue.prototype.$TABLE=timetable
Vue.prototype.$INTRO=introduction
new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
 
