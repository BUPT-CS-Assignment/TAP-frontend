<template>
    <v-container>
        <v-row class="mx-4 mb-4">
            <v-col class="text-left">
                <span class="grey--text text--darken-3 text-h3 font-weight-medium">
                    {{items[rate]}}
                </span>
                <span class="subheading grey--text font-weight-light mr-1">TIMES</span>
            </v-col>
            <v-col cols="3" class="text-right mr-3">
                <v-avatar
                    :color="color[rate]"
                    size="60"
                ><v-icon large>
                    {{icon[rate]}}
                </v-icon>
                </v-avatar>
            </v-col>
        </v-row>
        <v-row class="mx-6">
            <v-slider step="1" min="0" max="8" track-color="grey" always-dirty
                :color="color[rate]"
                v-model="rate"
            >
                <template v-slot:prepend>
                    <v-icon color="indigo">mdi-run</v-icon>
                </template>
                <template v-slot:append>
                    <v-icon color="red">mdi-rocket-launch</v-icon>
                </template>
            </v-slider>
        </v-row>
    
    <v-card-actions class="mr-3">
        <v-spacer></v-spacer>
        <v-btn
            class="text-h6 font-weight-bold"
            color="teal lighten-2" text
            @click="ratioSync()"
        >Sync
        </v-btn>
        <v-btn
            class="text-h6 font-weight-bold"
            color="teal lighten-2" text
            @click="changeRatio();"
        >SET
        </v-btn>
    </v-card-actions>

    <v-card style="position:absolute;left:0;top:0;bottom:0"
        color="red lighten-1" width="5" elevation="0" class="rounded-0"
    ></v-card>

    <v-card style="position:absolute;right:0;top:0;bottom:0"
        color="red lighten-1" width="5" elevation="0" class="rounded-0"
    ></v-card>

    </v-container>
</template>

<script>
// @ is an alias to /src
import Vue from 'vue'
export default {
    name: 'ClockRate',
    data: () => ({
        time:Vue.prototype.$SYSTIME,
        user:Vue.prototype.$USER,
        rate:0,
        items:[1,10,30,60,300,600,900,1800,3600],
        color:['indigo','indigo','blue','teal','cyan','green','lime','orange','red'],
        icon:['mdi-run','mdi-run-fast','mdi-bike','mdi-bike-fast','mdi-moped','mdi-car','mdi-train','mdi-airplane','mdi-rocket-launch'],
    }),
    created() {

    },
    methods: {
        changeRatio:function(){
            this.$http.get('/api/clock',{
                params:{'action':'m', 
                        'rate':this.items[this.rate],},
                headers:{'content-type': 'multipart/form-data'}
            })
            .then(res => {
                console.log(res);
                if(res.data.code == 0){
                    this.$getTime();
                    alert("Change Clock Ratio Success")
                }else{
                    console.log(res.data.msg);
                }
            }) 
            .catch(err => {
                console.log(err);
            })
        },

        ratioSync:function(){
            //1,10,30,60,300,600,900,1800,3600
            if(this.time.ratio < 10) this.rate = 0;
            else if(this.time.ratio < 30) this.rate = 1;
            else if(this.time.ratio < 60) this.rate = 2;
            else if(this.time.ratio < 300) this.rate = 3;
            else if(this.time.ratio < 600) this.rate = 4;
            else if(this.time.ratio < 900) this.rate = 5;
            else if(this.time.ratio < 1800) this.rate = 6;
            else if(this.time.ratio < 3600) this.rate = 7;
            else this.rate = 8;
        },
    },
}
</script>