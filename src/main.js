import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'

Vue.config.productionTip = false

var ROOT = "http://101.43.201.20:9008";
Vue.prototype.$server=ROOT;

/**
 * Global Variable
 */

var user={
    id:2022000000,
    auth:0,
    name:'测试用户',
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

/**
 * Global Function
 */

function getUser(){
    this.$get('/api/user','','fetch',(res)=>{
        res=res.data;
        this.$USER.id=res.id;
        this.$USER.auth=res.auth;
        this.$USER.name=res.name;
        this.$USER.gender=(res.gender==1?'男':'女');
        this.$USER.school = res.school;
        this.$USER.major=res.major;
        this.$USER.classid=res.classid;
    },()=>{},()=>{});
}

function tableInit(){
    this.$TABLE.table = Array.from(Array(14),()=>new Int32Array(5));
}

function getTable(){
    this.$get('/api/user/schedule','','fetch',(res)=>{
        this.$TABLE.detail = [];
        this.$TABLE.detail.push('');
        res.data.detail.forEach(element => {
            this.$TABLE.detail.push(element)
        });
        res.data.basic.forEach(course => {
            for(var day = 0; day < course.timeCode.length; day++){
                var code = course.timeCode[day] << 1;
                for(var timeP =0; timeP <14; timeP++){
                    code >>= 1;
                    if(code & 0x1 == 1) this.$TABLE.table[timeP][day] = course.pos;
                }
            }
        });
    },()=>{},()=>{});
}   

function getToday(){
    var d = new Date();
    var format='';
    var year = d.getFullYear();
    var month= d.getMonth()+1;
    var day = d.getDate();
    format += year + '-';
    format += (month<10?'0':'')+month + '-';
    format += (day < 10?'0':'')+day;
    console.log(format);
    return format;
}

function Signout(){
    localStorage.removeItem('userid');
    localStorage.removeItem('token');
}

function Access(level = '0'){
    var xhttp = new XMLHttpRequest();
    xhttp.open('GET','/api/access',false);
    xhttp.setRequestHeader('content-type','multipart/form-data');
    xhttp.setRequestHeader('function',level+'');
    xhttp.setRequestHeader('userid',localStorage.getItem('userid'));
    xhttp.setRequestHeader('token',localStorage.getItem('token'));
    xhttp.send();
    if(xhttp.status == 200){
        console.log(xhttp.responseText);
        if(xhttp.responseText.data == "NO_ERROR");
        return true;
    }
    return false;
}

Vue.prototype.$getToday=getToday;
Vue.prototype.$getUser=getUser;
Vue.prototype.$getTable=getTable;
Vue.prototype.$tableInit=tableInit;
Vue.prototype.$signout=Signout;
Vue.prototype.$access=Access;


new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
 
