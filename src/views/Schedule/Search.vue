<template>
    <v-row v-if="index!=0" :key="index">
        <v-col cols="12">
            <v-card elevation="6" rounded="lg" class="mb-6" min-height="100">
                <v-toolbar short color="grey lighten-3" flat rounded="lg">
                <v-row class="mt-4">
                    <v-col cols="3">
                    <v-toolbar-title class="text-h6 font-weight-bold ml-4 mt-1">
                        活动搜索
                    </v-toolbar-title>
                    </v-col>
                    <v-col cols="2">
                        <v-text-field outlined dense label="活动ID" v-model="input.id">
                        </v-text-field>
                    </v-col>
                    <v-col cols="2">
                        <v-text-field outlined dense label="名称" v-model="input.name">
                        </v-text-field>
                    </v-col>
                    <v-col cols="2">
                        <v-text-field outlined dense label="时间" v-model="input.time">
                        </v-text-field>
                    </v-col>
                    <v-col cols="2">
                        <v-text-field outlined dense label="地点" v-model="input.loc">
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-btn text rounded @click="refresh()">
                    <v-icon >mdi-refresh</v-icon>
                </v-btn>
                <v-btn text rounded @click="searchEvents()">
                    <v-icon >mdi-magnify</v-icon>
                </v-btn>
            </v-toolbar>
            <v-row class="px-4 pt-4">
                    <v-col v-if ="res.data.length > 0">
                        <v-row>
                            <v-col cols="3">
                                <v-btn small rounded @click="is_reload=false;res.data.QSORT((a,b)=>{return a.name < b.name?true:false});is_reload=true;">
                                    名称<v-icon>mdi-menu-down</v-icon>
                                </v-btn>
                            </v-col>
                            <v-col cols=3>
                                <v-btn small rounded @click="is_reload=false;res.data.QSORT((a,b)=>{return a.start_num < b.start_num?true:false});is_reload=true;">
                                    开始时间<v-icon>mdi-menu-down</v-icon>
                                </v-btn>
                            </v-col >
                            <v-col cols=3>
                                <v-btn small rounded @click="is_reload=false;res.data.QSORT((a,b)=>{return a.end_num > b.end_num?true:false});is_reload=true;">
                                    结束时间<v-icon>mdi-menu-up</v-icon>
                                </v-btn>
                            </v-col>
                            <v-col cols="3">
                                <v-btn small rounded @click="is_reload=false;res.data.QSORT((a,b)=>{return a.status < b.status?true:false});is_reload=true;">
                                    状态<v-icon>mdi-menu-down</v-icon>
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-col>
                    <template v-if="is_reload">
                    <v-col v-for="(item,index) in res.data" :key="index" cols="12">
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
                                <v-col cols="3">
                                    <span class="font-weight-bold grey--text">{{item.start}}</span>
                                </v-col>
                                <v-col cols="3">
                                    <span class="font-weight-bold grey--text">{{item.end}}</span>
                                </v-col>
                                <v-col cols="3">
                                    <span class="font-weight-bold green--text">{{item.status}}</span>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-col>
                    </template>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
// @ is an alias to /src
import Vue from 'vue'
export default {
    name: "EventSearch",
    data: () => ({
        is_reload:true,
        table: Vue.prototype.$TABLE,
        user:Vue.prototype.$USER,
        events:Vue.prototype.$EVENTS,
        id:Vue.prototype.$COURSECHOOSE,
        time:Vue.prototype.$SYSTIME,
        input:{id:'',name:'',loc:'',time:0},
        res:{data:[]},

    }),
    created() {

    },
    methods: {
        refresh(){
            this.input={id:'',name:'',loc:'',time:0}
            this.res.data =[]
        },
        searchEvents(){
            this.res.data=[];
            for(var i=0;i<this.events.data.length;i++){
                var eve = this.events.data[i];
                var flag = true;
                if(this.input.id != ''){
                    if(eve.id != this.input.id) flag = false;
                }
                if(flag && this.input.name != ''){
                    if(eve.name.indexOf(this.input.name)==-1 ) flag = false;
                }
                if(flag && this.input.loc != ''){
                    if(eve.location.indexOf(this.input.loc) == -1 ) flag = false;
                }
                if(flag && ( this.input.time != 0 && this.input.time != '')){
                    if(eve.start_num <= this.input.time && this.input.time <= eve.end_num){
                        flag = true;
                    }else{
                        flag = false;
                    }
                }
                if(flag){
                    this.res.data.push(eve);
                }
            }
            this.res.data.QSORT((a,b)=>{a.start_num < b.start_num ? true: false})
        }
    },

}
</script>
