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

var events={data:[]};

var sys_time={year:2022,month:1,day:1,hour:0,min:0,ratio:1,runID:0};
var sys_today="2022-01-01";

var month_day=[0,31,28,31,30,31,30,31,31,30,31,30,31];

var colors=['blue', 'indigo', 'green','orange', 'blue-grey'];

Vue.prototype.$USER=user
Vue.prototype.$TABLE=timetable
Vue.prototype.$INTRO=introduction
Vue.prototype.$EVENTS=events
Vue.prototype.$SYSTIME=sys_time
Vue.prototype.$TODAY=sys_today

/**
 * Global Function
 */

function getUser(){
    var xhttp = new XMLHttpRequest();
    xhttp.open('GET','/api/user',false);
    xhttp.setRequestHeader('content-type','multipart/form-data');
    xhttp.setRequestHeader('function','fetch');
    xhttp.setRequestHeader('userid',localStorage.getItem('userid'));
    xhttp.setRequestHeader('token',localStorage.getItem('token'));
    xhttp.send();
    if(xhttp.status == 200){
        var res = JSON.parse(xhttp.responseText);
        console.log(res);
        if(xhttp.getResponseHeader("msg") == "NO_ERROR"){
            this.$USER.id = res.id;
            this.$USER.auth = res.auth;
            this.$USER.name  = res.name;
            this.$USER.gender = (res.gender==1?'男':'女');
            this.$USER.school = res.school;
            this.$USER.major = res.major;
            this.$USER.classid = res.classid;
        }else{
            console.log(xhttp.getResponseHeader("msg"));
        }
    }else{
        console.log(xhttp.status);
    }
}

function tableInit(){
    this.$TABLE.table = Array.from(Array(14),()=>new Int32Array(5));
}

function getTable(){
    this.$get('/api/timetable','','fetch',(res)=>{
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

function getEvents(){
    this.$get('/api/event','','fetch',(res)=>{
        events.data=[];
        res.data.events.forEach(element => {
            //202201010800
            var time = element.start + "";
            element.start = time.substring(0,4) + "-" + time.substring(4,6) + "-" + time.substring(6,8) 
                        + " " + time.substring(8,10) + ":" + time.substring(10,12);
            time = element.end + "";
            element.end = time.substring(0,4) + "-" + time.substring(4,6) + "-" + time.substring(6,8) 
                        + " " + time.substring(8,10) + ":" + time.substring(10,12);
            var num = Math.floor(Math.random() * (colors.length - 1));
            var new_event = element;
            new_event.color = colors[num];
            events.data.push(new_event);
        });
    },()=>{},()=>{});
    return true;
}

function get_feb(){
    var year = this.$SYSTIME.year;
    if( (year % 100 != 0 && year % 4 == 0) || year % 400 == 0 ){
        month_day[2] = 29;
    }else{
        month_day[2] = 28;
    }
}

function date_format(){
    sys_today = sys_time.year + "-"
    + (sys_time.month < 10 ? '0' : '') + sys_time.month + "-"
    + (sys_time.day < 10 ? '0' : '') + sys_time.day;
    Vue.prototype.$TODAY = sys_today;
}

function timeAdd(){
    if(++ sys_time.min < 60) return;
    sys_time.min = 0;
    if( ++ sys_time.hour < 24) return;
    sys_time.hour = 0;
    if(++ sys_time.day <= month_day[sys_time.day]) return;
    sys_time.day = 1;
    if(++ sys_time.month <= 12) return;
    sys_time.month = 1;
    ++ sys_time.year;
    get_feb();
}

function timeRun(){
    clearInterval(sys_time.runID);
    sys_time.runID = setInterval(timeAdd,60000 / sys_time.ratio);
}

function timeUpdate(data){
    sys_time.ratio = data.ratio;
    sys_time.year = data.year;
    sys_time.month = data.mon;
    sys_time.day = data.day;
    sys_time.hour = data.hour;
    sys_time.min = data.min;
    console.log(sys_time);
    timeRun();
}

function ratioScan(){
    console.log("Clock Scanning");
    Vue.prototype.$http.get('/api/clock',{
        params:{'action':'c'},
        headers:{'content-type': 'multipart/form-data'}
    })
    .then(res => {
        console.log(res);
        if(res.status == 200){
            console.log("Time Rate Change");
            getTime();
        }else if(res.status == 202){
            ratioScan();
        }
    }) 
    .catch(err => {
        console.log(err);
    })
}

function getTime(){
    Vue.prototype.$http.get('/api/clock',{
        params:{'action':'q'},
        headers:{'content-type': 'multipart/form-data'}
    })
    .then(res => {
        console.log(res);
        if(res.data.code == 0){
            if(sys_time.year != res.data.data.year){
                get_feb();
            }
            timeUpdate(res.data.data);
            date_format();
            
        }else{
            console.log(res.data.msg);
        }
        ratioScan();
    }) 
    .catch(err => {
        console.log(err);
    })
}


function Signout(){
    localStorage.removeItem('userid');
    localStorage.removeItem('token');
}

function Access(level = '0'){
    var xhttp = new XMLHttpRequest();
    xhttp.open('GET','/api/access',false);
    xhttp.setRequestHeader('content-type','multipart/form-data');
    xhttp.setRequestHeader('function',level);
    xhttp.setRequestHeader('userid',localStorage.getItem('userid'));
    xhttp.setRequestHeader('token',localStorage.getItem('token'));
    xhttp.send();
    if(xhttp.status == 200){
        console.log(xhttp.responseText);
        if(xhttp.responseText == "NO_ERROR");
        return true;
    }
    return false;
}

Vue.prototype.$getTime=getTime;
Vue.prototype.$getUser=getUser;
Vue.prototype.$getTable=getTable;
Vue.prototype.$getEvents=getEvents;
Vue.prototype.$tableInit=tableInit;
Vue.prototype.$signout=Signout;
Vue.prototype.$access=Access;


new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
 
