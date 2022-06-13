<template>
<v-app id="backstage">
<!-- Header -->
    <v-app-bar 
        app
        color="#262d40"
        elevation="0"
        height="60"
        style="z-index:3"
    >
    <span class="ml-4 grey--text text-overline font-weight-bold"
        style="position:absolute;"
    >BACKSTAGE  
    </span>
    <v-card class="mr-2 d-flex justify-center align-center" elevation="0" 
        style="position:absolute;right:0; background:none;">
    <span class="grey--text mt-1 text-caption font-weight-bold">
        {{time.year}}-{{time.month}}-{{time.day}}
        {{time.hour}}:<template v-if="time.min < 10">0</template>{{time.min}}
    </span>
    <span class="text-h5 ml-3 grey--text">|</span>
    <v-btn small color="grey" class="mt-1 rounded-lg" text @click="Signout()"
    ><v-icon small >mdi-logout</v-icon>
    </v-btn>
    </v-card>
    
    <v-card style="background:none;" elevation="0" class="mx-auto">
        <span class="grey--text text--lighten-1 text-h5 font-weight-black">
            <v-icon color="grey lighten-1" class="mb-1 mr-3" medium>
                mdi-cube
            </v-icon>
            Tiny & Pretty
        </span>
    </v-card>

    
    </v-app-bar>

<!-- Info Cards -->
    <v-card elevation="0" color="#262d40" class="rounded-0">
        <v-tabs class="ml-16" hide-slider v-model="tab" dark background-color="#262d40" color="white">
            <v-tab :key="0" class="text-button">Data</v-tab>
                <p class="mt-2 text-h5 grey--text">|</p>
            <v-tab :key="1" class="px-6 text-button">Control</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab" class="pb-8">
            <v-tab-item :key="0">
                <v-card height="60" elevation="0" color="#262d40" class="rounded-0" 
                        style="position:absolute;left:0;right:0">
                </v-card>
                <v-row justify="center" class="mt-2">
                <!-- USER -->
                    <v-card width="340" height="300" class="mx-4 my-2 rounded-0">
                        <User></User>
                    </v-card>
                <!-- COURSES -->
                    <v-card width="340" height="300" class="mx-4 my-2 rounded-0">
                        <Course></Course>
                    </v-card>
                <!-- NEW SIGNUP -->
                    <v-card width="340" height="300" class="mx-4 my-2 rounded-0">

                    </v-card>
                </v-row>
            </v-tab-item>
            <v-tab-item :key="1">
                <v-card height="60" elevation="0" color="#262d40" class="rounded-0"
                        style="position:absolute;left:0;right:0">
                </v-card>
                <v-row justify="center" class="mt-2">
                    <v-card width="340" height="300" class="mx-4 my-2 rounded-0">
                        <v-card-title class="grey--text text--darken-3 text-h5 font-weight-bold mt-2 ml-6">
                            CLOCK RATE
                        </v-card-title>
                        <Clock class="mt-4"></Clock>
                    </v-card>
                    <v-card width="340" height="300" class="mx-4 my-2 rounded-0">

                    </v-card>
                    <v-card width="340" height="300" class="mx-4 my-2 rounded-0">

                    </v-card>
                </v-row>
            </v-tab-item>
        </v-tabs-items>
    </v-card>

<!-- Console -->
    <Console></Console>
    
</v-app>
</template>

<script>
// @ is an alias to /src
import Vue from 'vue'
import Clock from '@/views/BackStage/Clock.vue'
import User from '@/views/BackStage/User.vue'
import Course from '@/views/BackStage/Course.vue'
import Console from '@/views/BackStage/Console.vue'

export default {
    name: 'BackStage',
    data: () => ({
        time:Vue.prototype.$SYSTIME,
        tab:null,
        tabs:["0","1"],
    }),
    components:{
        Clock,User,Course,Console,
    },
    created() {
        if(!this.$access('3')){
            console.log("ACCESS_DENIED");
            this.$router.push('/auth');
        }
    },
    methods: {
        Signout:function(){
            Vue.prototype.$signout();
            this.$router.push('/auth');
        },
    }
}
</script>
