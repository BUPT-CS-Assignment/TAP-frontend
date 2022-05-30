<template>
<v-app id="root"> 
    <template v-if='cur_link != 4'>
    <v-navigation-drawer 
        class="d-flex flex-column pt-4 "
        permanent
        app
    >
        <v-list-item class="ml-3 mb-2">
            <v-list-item-title 
                class="text-button font-weight-black"
            >TINY & PRETTY
            </v-list-item-title>
        </v-list-item>
        
        <v-list dense nav>
            <v-list-item class="mb-0 ml-1 mr-1">
                <v-text-field
                    outlined
                    prepend-inner-icon="mdi-magnify"
                    label="搜索"
                    dense
                    class="mb-0"
                    color="grey"
                ></v-text-field>
            </v-list-item>
            <v-list-item-group
                color="blue-grey lighten" 
                class="mt-0"  
            >
                <template   v-for="([text,to,icon,color],index) in links">
                <v-list-item    v-if="index!=4"
                    :key="text"
                    :to="to"
                    link
                    class="ml-2 mr-2 mb-1"
                >
                    <v-list-item-icon>
                        <v-icon v-text="icon" :color="color"></v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title 
                            class="text-overline font-weight-bold"
                        >{{text}}
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </template>
            </v-list-item-group>
            
        </v-list>
    </v-navigation-drawer>  
    </template>
    <v-app-bar
        app
        class="pr-3"
        color="white"
        elevation="1"
        dense
    >
        <v-container 
            class="py-0 d-flex justify-center align-self-center"
            v-if="cur_link!=4"
        >
            <v-btn-toggle>
                <v-btn  v-for="[text,to] in sec_links[cur_link]"
                    :key="text"
                    :to="to"
                    link
                    outlined
                    max-height=30
                    class="pl-7 pr-7 text-overline font-weight-bold"
                >
                {{ text }}
                <v-icon class="ml-3" small>mdi-text-long</v-icon>
                </v-btn> 
            </v-btn-toggle>
        </v-container>
        <v-menu
            bottom
            min-width="140px"
            rounded-lg
            offset-y
        >
            <template v-slot:activator="{ on }">
            <v-btn
                icon v-on="on"
            >
                <v-avatar
                    color="blue lighten-1"
                    size="34"
                >
                <span class="white--text text-button">{{ user.name[0] }}</span>
                </v-avatar>
            </v-btn>
            </template>
            <v-card class="">
            <v-list-item-content class="justify-center">
                <div class="mx-auto text-center">
                <v-avatar color="blue lighten-1">
                    <span class="white--text text-h5">{{ user.name[0] }}</span>
                </v-avatar>
                <h4 class="mt-2">{{ user.name }}</h4>
                <p class="text-caption mt-1">
                    {{ user.id }}
                </p>
                <v-divider class="mt-1 mb-2"></v-divider>
                <v-btn
                    rounded
                    depressed
                    text
                >
                    退出
                </v-btn>
                </div>
            </v-list-item-content>
            </v-card>
        </v-menu>
    </v-app-bar>
    <v-main style="background-color:#FAFAFA">
        <router-view 
            class="ml-4 mt-2 mr-2"
        ></router-view>
    </v-main>
</v-app>
</template>

<script>
    import Vue from 'vue';
    export default {
        name:"app",
        data: () => ({
        cur_link:1,
        user:Vue.prototype.USER,
        links: [
            ['主页','/home','mdi-account-circle','blue'],
            ['日程','/schedule','mdi-calendar-check','orange'],
            ['课程','/courses','mdi-book-multiple','green'],
            ['导航','/map','mdi-map-marker-radius','blue-grey'],
        ],
        sec_links:[
            [['概览','/home/overview'],['详情','/home/detail']],
            [['日程表','/schedule/overview'],['课程安排','/schedule/timetable']],
            [['课程信息','/courses/index']],
            [['校园导航','/map/navigation'],['地图概览','/map/overview']],
        ],
        }),
        created(){
            var path = window.location.hash;
            path = path.substring(2);
            var idx = path.indexOf('/');
            if(idx != -1)   path = path.substring(0,idx);
            this.cur_link = this.router_parse(path);
        },
        watch:{
            '$route.path':function(to){
                var path = to.substring(1);
                var idx = path.indexOf('/');
                if(idx != -1)   path = path.substring(0,idx);
                this.cur_link = this.router_parse(path);
            }
        },
        methods: {
            router_parse:function(path){
                switch(path){
                    case 'home':return 0;
                    case 'schedule':return 1;
                    case 'courses':return 2;
                    case 'map':return 3;
                    default: return 4;
                }
            }
        },
    }
</script>
