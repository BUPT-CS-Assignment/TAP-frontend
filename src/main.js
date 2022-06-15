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
    schoolid:100,
    major:'测试专业',
    majorid:100,
    classid:2022111000
}

var timetable={courses:[],table:[]}

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

var course_list={data:[{id:'000',name:'course'}]}
var course_item={data:['1201,course']}

var course_choose = 0;

Vue.prototype.$USER=user
Vue.prototype.$TABLE=timetable
Vue.prototype.$INTRO=introduction
Vue.prototype.$EVENTS=events
Vue.prototype.$SYSTIME=sys_time
Vue.prototype.$TODAY=sys_today
Vue.prototype.$COURSELIST = course_list
Vue.prototype.$COURSEITEM = course_item
Vue.prototype.$COURSECHOOSE = course_choose

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
            this.$USER.schoolid = res.schoolid;
            this.$USER.major = res.major;
            this.$USER.majorid = res.majorid;
            this.$USER.classid = res.classid;
        }else{
            console.log(xhttp.getResponseHeader("msg"));
        }
    }else{
        console.log(xhttp.status);
    }
}

function tableInit(){
    timetable.table = Array.from(Array(14),()=>new Int32Array(5));
}

function week_format(wcode){
    if(wcode == 65535)  return "1-16周"
    var format = "";
    for(var i = 0;i<16;i++){
        if(wcode & 0x1 == 1){
            format += (i+1)+",";
        }
        wcode >>= 1;
    }
    format = format.substring(0,format.length-1);
    return format+"周";
}

var day_items=['[周一]','[周二]','[周三]','[周四]','[周五]']

function day_format(tcode){
    var format = "";
    for(var i = 0;i < 5;i++){
        var temp = "";
        var code = tcode[i];
        for(var j=0;j<14;j++){
            if(code & 0x1 == 1){
                if(temp == "") temp = day_items[i]
                temp += (j+1)+","
            }
            code >>= 1
        }
        console.log(temp);
        if(temp != ""){
            temp = temp.substring(0,temp.length-1);
            temp += "节";
            format += temp+","
        }
    }
    format = format.substring(0,format.length-1);
    return format;
}

function time_format(time){
    //202206150814
    if(time == "0") return "0"
    var format = time.substring(0,4)+"/"
    format += time.substring(4,6)+"/"
    format += time.substring(6,8)+" "
    format += time.substring(8,10)+":"
    format += time.substring(10,12);
    return format;
}

function time_string(){
   //var sys_time={year:2022,month:1,day:1,hour:0,min:0,ratio:1,runID:0};
   var format = sys_time.year + "";
   format += ((sys_time.month < 10 ? '0':'') + sys_time.month);
   format += ((sys_time.day < 10 ? '0':'') + sys_time.day);
   format += ((sys_time.hour < 10 ? '0':'') + sys_time.hour);
   format += ((sys_time.min < 10 ? '0':'') + sys_time.min);
   return format;

}

function getTable(url,classid){
    this.$get(url,{'classid':classid},'timetable',(res)=>{
        console.log(res);
        timetable.courses = [{id:'null'}];
        tableInit();
        var courses = res.data.courses;
        for(var i = 0;i<courses.length;i++){
            for(var j = 0;j<5;j++){
                var code = courses[i].tcode[j];
                for(var k = 0; k < 14; k++){
                    if(code & 0x1 == 1){
                        timetable.table[k][j] = i+1;
                    }
                    code >>= 1;
                }
            }
            courses[i].week = week_format(courses[i].wcode);
            courses[i].day = day_format(courses[i].tcode);
            courses[i].intro = "null";
            courses[i].homework=[];
            courses[i].exam=[];
            courses[i].files=[];
            timetable.courses.push(courses[i]);
        }
        console.log(timetable);
    },()=>{},()=>{});
}   

function getEvents(){
    this.$get('/api/event','','fetch',(res)=>{
        events.data=[];
        res.data.events.forEach(element => {
            //202201010800
            var sta;
            var now = time_string();
            if(element.end <= now) sta = '已结束';
            else if(element.start > now) sta = '未开始';
            else sta = '进行中'
            var new_event={
                id:Number(element.id),
                name:element.name,
                start:time_format(element.start),
                end:time_format(element.end),
                location:element.loc,
                info:element.info,
                status:sta
            }
            var num = Math.floor(Math.random() * (colors.length - 1));
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
Vue.prototype.$timeFormat=time_format;
Vue.prototype.$timeString=time_string;


new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
 
