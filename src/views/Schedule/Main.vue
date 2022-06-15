<template>
<v-container class="px-8 pt-4">
    <!-- <v-container class="pr-10">
        <template>
        <v-row class="fill-height">
            <v-col>
            <v-sheet height="64">
                <v-toolbar flat>
                <v-btn outlined class="mr-4" color="grey darken-2"
                    @click="setToday()"
                >今天
                </v-btn>
                <v-btn fab text small color="grey darken-2"
                    @click="prev()"
                ><v-icon small>mdi-chevron-left</v-icon>
                </v-btn>
                <v-btn fab text small color="grey darken-2"
                    @click="next"
                ><v-icon small>mdi-chevron-right</v-icon>
                </v-btn>
                <v-toolbar-title v-if="$refs.calendar">
                    {{ $refs.calendar.title }}
                </v-toolbar-title>
                <v-spacer></v-spacer>
                    <v-btn outlined color="grey darken-2"><span>Add</span></v-btn>
                </v-toolbar>
            </v-sheet>
            <v-sheet>
                <v-calendar ref="calendar" type="week" color="primary"
                    v-model="focus"
                    :now="today" :value="today"
                    :events="events.data" :event-color="getColor"
                    @click:event="showEvent"
                ></v-calendar>
                <v-menu offset-x
                    v-model="selectedOpen"
                    :close-on-content-click="false"
                    :activator="selectedElement"
                >
                <v-card color="grey lighten-4" min-width="350px" class="pb-3 rounded-lg" flat>
                    <v-toolbar :color="selectedEvent.color" elevation="0">
                        <v-toolbar-title class="white--text font-weight-bold">
                            {{selectedEvent.name}}
                        </v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn icon color="white">
                            <v-icon>mdi-delete-off</v-icon>
                        </v-btn>
                    </v-toolbar>
                    <v-card-text>
                        <span v-html="selectedEvent.describe"></span>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn text color="secondary"
                            @click="selectedOpen = false"
                        >Back
                        </v-btn>
                    </v-card-actions> 
                </v-card>
                </v-menu>
            </v-sheet>
            </v-col>
        </v-row>
        </template>
    </v-container> -->
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
                <template v-for="(item,index) in events">
                    <v-col v-if="item.id < 10000" :key="index">
                        <v-card elevation="0">
                            <v-row>
                                <v-col>
                                    <span>{{item.name}}</span>
                                </v-col>
                                <v-col>
                                    <span>{{item.location}}</span>
                                </v-col>
                                <v-col>
                                    <span>{{item.start}}</span>
                                </v-col>
                                <v-col>
                                    <span>{{item.end}}</span>
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
                <template v-for="(item,index) in events">
                    <v-col v-if="item.id > 10000" :key="index">
                        <v-card elevation="0">
                            <v-row>
                                <v-col>
                                    <span>{{item.name}}</span>
                                </v-col>
                                <v-col>
                                    <span>{{item.location}}</span>
                                </v-col>
                                <v-col>
                                    <span>{{item.start}}</span>
                                </v-col>
                                <v-col>
                                    <span>{{item.end}}</span>
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
        events: Vue.prototype.$EVENTS.data,
        // {"id",stoi(id)},
        // {"name",name.c_str()},
        // {"start",start.c_str()},
        // {"end",end.c_str()},
        // {"loc",location.c_str()},
        // {"info",info.c_str()}
        event_type:0,
        dialog:false,
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
            for(var i=0;i < this.events.length;i++){
                if(this.events[i].id > min && this.events[i].id < max) all++;
            }
            var detail = (min + all)+ ",";
            detail +=  this.input.start + "," + this.input.end + "," 
                    +this.input.loc + "," + this.input.name + "," +this.input.info;
            console.log(detail);
            this.$post('/api/event',detail,'','new',()=>{
                this.$getEvents();
                this.dialog = false;
            },(res)=>{console.log(res.headers.msg)},()=>{});
        }

    },
    created(){

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