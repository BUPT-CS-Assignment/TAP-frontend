<template>
<v-container class="px-8 pt-4">
<v-row v-if="user.auth < 2">
    <v-col>
        <v-card min-height="200" rounded="lg" elevation="6">
            <v-toolbar short color="grey lighten-3" flat rounded="lg">
                <v-toolbar-title class="text-h6 font-weight-bold ml-4">
                    班级活动
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn text rounded v-if="user.auth == 1" @click="event_type=1;dialog=true">
                    <v-icon large>mdi-plus</v-icon>
                </v-btn>
            </v-toolbar>
            <v-row class="px-4 pt-4">
                <template v-for="(item,index) in events.data">
                    <v-col v-if="item.id < 10000" :key="index" cols="12">
                        <v-card elevation="0" class="px-2">
                            <v-row>
                                <v-col cols="3">
                                    <v-menu open-on-hover offset-y bottom>
                                        <template v-slot:activator="{ on, attrs }">
                                        <v-btn color="blue-grey" text class="ma-0 pa-0 pb-3"
                                            v-bind="attrs" v-on="on"
                                        ><v-icon class="mr-4">mdi-account-multiple</v-icon>
                                            <span class="text-subtitle-1 font-weight-bold">{{item.name}}</span>
                                        </v-btn>
                                        </template>
                                        <v-card min-width="100" min-height="100" max-width="300" rounded="lg" 
                                            class="pa-3" elevation="3"
                                        >   <template v-if="item.ncode!=0">
                                            <span class="font-weight-bold mr-4">提醒</span>
                                            <span>{{item.ncode}}</span><br>
                                            </template>
                                            <span class="font-weight-bold mr-4">地点</span>
                                            <span>{{item.location}}</span><br>
                                            <span class="font-weight-bold mr-4 mt-2">详情</span>
                                            <span>{{item.info}}</span>
                                        </v-card>
                                    </v-menu>
                                    
                                </v-col>
                                <!-- <v-col cols="2">
                                    <span class="font-weight-bold grey--text">{{item.location}}</span>
                                </v-col> -->
                                <v-col cols="3">
                                    <span class="font-weight-bold grey--text">{{item.start}}</span>
                                </v-col>
                                <v-col cols="3">
                                    <span class="font-weight-bold grey--text">{{item.end}}</span>
                                </v-col>
                                <v-col cols="3">
                                    <span class="font-weight-bold green--text">{{item.status}}</span>
                                    <v-btn v-if="user.auth==1 && item.status=='未开始'" text rounded small @click="notice.id=item.id;notice_set=true">
                                        <v-icon small text color="grey">mdi-bell-ring</v-icon>
                                    </v-btn>
                                    
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-col>
                </template>
            </v-row>
        </v-card>
    </v-col>
</v-row>

<v-row class="mt-8">
    <v-col>
        <v-card min-height="300" rounded="lg" elevation="6">
            <v-toolbar short color="grey lighten-3" flat rounded="lg">
                <v-toolbar-title class="text-h6 font-weight-bold ml-4">
                    个人活动
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn text rounded @click="event_type=0;dialog=true">
                    <v-icon large>mdi-plus</v-icon>
                </v-btn>
            </v-toolbar>
            <v-row class="px-4 pt-4">
                <template v-for="(item,index) in events.data">
                    <v-col v-if="item.id > 10000" :key="index" cols="12">
                        <v-card elevation="0" class="px-2">
                            <v-row>
                                <v-col cols="3">
                                    <v-menu open-on-hover offset-y bottom>
                                        <template v-slot:activator="{ on, attrs }">
                                        <v-btn color="blue-grey" text class="ma-0 pa-0 pb-3"
                                            v-bind="attrs" v-on="on"
                                        ><v-icon class="mr-4">mdi-account</v-icon>
                                            <span class="text-subtitle-1 font-weight-bold">{{item.name}}</span>
                                        </v-btn>
                                        </template>
                                        <v-card min-width="100" min-height="100" max-width="300" rounded="lg" 
                                            class="pa-3" elevation="3"
                                        >   <template v-if="item.ncode!=0">
                                            <span class="font-weight-bold mr-4">提醒</span>
                                            <span>{{item.ncode}}</span><br>
                                            </template>
                                            <span class="font-weight-bold mr-4">地点</span>
                                            <span>{{item.location}}</span><br>
                                            <span class="font-weight-bold mr-4 mt-2">详情</span>
                                            <span>{{item.info}}</span>
                                        </v-card>
                                    </v-menu>
                                    
                                </v-col>
                                <!-- <v-col cols="2">
                                    <span class="font-weight-bold grey--text">{{item.location}}</span>
                                </v-col> -->
                                <v-col cols="3">
                                    <span class="font-weight-bold grey--text">{{item.start}}</span>
                                </v-col>
                                <v-col cols="3">
                                    <span class="font-weight-bold grey--text">{{item.end}}</span>
                                </v-col>
                                <v-col cols="3">
                                    <span class="font-weight-bold green--text">{{item.status}}</span>
                                    <v-btn  v-if="item.status=='未开始'"  text rounded small @click="notice.id=item.id;notice_set=true">
                                        <v-icon small text color="grey">mdi-bell-ring</v-icon>
                                    </v-btn>
                                    
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-col>
                </template>
            </v-row>
        </v-card>
    </v-col>
</v-row>

<!-- Add Activity -->
    <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card class="px-2 pt-6 pb-2 rounded-lg">
            <v-card-title class="text-h5 ml-2 font-weight-bold">新建活动</v-card-title>
            <v-container fluid class="px-6">
                <v-row class="mx-auto">
                    <v-col cols="6">
                        <v-text-field outlined dense label="名称" v-model="input.name">
                        </v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field outlined dense label="活动地点" v-model="input.loc">
                        </v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field outlined dense label="开始时间" v-model="input.start">
                        </v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field outlined dense label="结束时间" v-model="input.end">
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-row class="mx-1">
                    <v-textarea filled clearable dense label="活动简介" auto-grow row="2"
                        v-model="input.info"
                    ></v-textarea>
                </v-row>
            </v-container>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text
                    @click="dialog=false"
                >Cancel
                </v-btn>
                <v-btn color="blue darken-1 font-weight-bold" text
                    @click="addEvent();"
                >Add
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <v-dialog v-model="notice_set" persistent max-width="600px">
        <v-card class="px-2 pt-6 pb-2 rounded-lg">
            <v-card-title class="text-h5 ml-2 font-weight-bold">活动提醒</v-card-title>
            <v-container fluid class="px-6">
                <v-row class="mx-auto">
                    <v-col cols="4">
                        <v-switch v-model="notice.mul" label="周期">
                        </v-switch>
                    </v-col>
                    <v-col cols="4">
                        <v-select
                            :items="time_items"
                            label="提醒时间"
                            outlined
                            v-model="notice.time"
                            ></v-select>
                    </v-col>
                    <v-col cols="12">
                        <v-row v-if="notice.mul">
                            <v-col v-for="(item,index) in notice.week" :key="index" cols="3">
                                <v-checkbox v-model="item.t"
                                    :label="notice.mul?week_items[index]:'提前'+(index+1)+'天'"
                                ></v-checkbox>
                            </v-col>
                        </v-row>
                        <v-row v-else>
                            <v-radio-group v-model="notice.offset" row>
                                <v-radio v-for="item in [0,1,2,3,4]" :key="item"
                                    :value="item"
                                    :label="offset_items[item]"
                                ></v-radio>
                            </v-radio-group>
                        </v-row>
                    </v-col>
                </v-row>
            </v-container>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text
                    @click="notice_set=false"
                >Cancel
                </v-btn>
                <v-btn color="blue darken-1 font-weight-bold" text
                    @click="addNotice();"
                >Add
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>


</v-container>
</template>

<script>
// @ is an alias to /src
import Vue from 'vue'

export default {
  name: 'ScheduleMain',
  data: () => ({
        time:Vue.prototype.$SYSTIME,
        today:Vue.prototype.$TODAY,
        user:Vue.prototype.$USER,
        events: Vue.prototype.$EVENTS,
        // {"id",stoi(id)},
        // {"name",name.c_str()},
        // {"start",start.c_str()},
        // {"end",end.c_str()},
        // {"loc",location.c_str()},
        // {"info",info.c_str()}
        event_type:0,
        dialog:false,
        notice_set:false,
        week_items:['星期一','星期二','星期三','星期四','星期五','星期六','星期天'],
        offset_items:['当天','提前1天','提前2天','提前3天','提前4天','提前5天'],
        time_items:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
        notice:{
            id:0,
            mul:false,
            week:[{t:false},{t:false},{t:false},{t:false},{t:false},{t:false},{t:false}],
            offset:0,
            time:0,
        },
        time_code:[{t:false},{t:false},{t:false},{t:false},{t:false},
                    {t:false},{t:false},{t:false},{t:false},{t:false},
                    {t:false},{t:false},{t:false},{t:false},{t:false}],
        input:{name:'',start:'',end:'',loc:'',info:''},
    }),
    methods: {
        getColor(event){return event.color;},
        addEvent(){
            var min,max; var all = 1;
            if(this.event_type == 0){
                min = this.user.id * 1000;   max = min + 999;
            }else{
                min = 0;    max = 10000;
            }
            for(var i=0;i < this.events.data.length;i++){
                if(this.events.data[i].id > min && this.events.data[i].id < max) all++;
            }
            var detail = (min + all)+ ",";
            detail +=  this.input.start + "," + this.input.end + ",0," 
                    +this.input.loc + "," + this.input.name + "," +this.input.info;
            this.$post('/api/event',detail,'','new',()=>{
                this.$getEvents();
                this.dialog = false;
            },(res)=>{console.log(res.headers.msg)},()=>{});
        },
        addNotice(){
            var code7=0;
            if(this.notice.mul){
                for(var i = 0;i<7;i++){
                    if(this.notice.week[i]) code7 += 1 << i;
                }
            }else   code7 = 1 << this.notice.offset
            var code32=0;
            if(this.notice.mul) code32 += 1;
            code32 += (code7 << 1);
            code32 += (1 << (this.notice.time + 8));
            console.log(code32);
            this.$post('/api/event',code32,{'eventid':this.notice.id},'notice',()=>{
                this.$getEvents();
                alert("设置提醒成功")
                this.notice_set = false;
            },(res)=>{console.log(res.headers.msg)},()=>{});
        }

    },
    created(){
        this.$getEvents();
    }
}
</script>

<style scoped>
.my-event {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 2px;
  background-color: #1867c0;
  color: #ffffff;
  border: 1px solid #1867c0;
  font-size: 12px;
  padding: 3px;
  cursor: pointer;
  margin-bottom: 1px;
  left: 4px;
  margin-right: 8px;
  position: relative;
}

.my-event.with-time {
  position: absolute;
  right: 4px;
  margin-right: 0px;
}
</style>