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
    id:10000,
    name:'name',
    gender:'gender',
    school:'school',
    major:'major',
    classid:'class'
}
Vue.prototype.USER=user

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
 
