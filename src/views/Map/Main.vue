<template>
<v-container class="ml-8 mt-4">
    <v-toolbar dense floating style="z-index:2;position:absolute;left:50px;top:30px;" rounded="xl">
        <v-btn class="ma-0 pa-0" rounded text small 
            @click="shownav = !shownav"
        ><v-icon color="grey darken-2">mdi-crosshairs-gps</v-icon>
        </v-btn>
        <template v-if="shownav">
        <!-- <v-container> -->
        <v-chip dense class="ml-2">
        <select v-model="selectedSrc">
            <option disabled value="">起始地点</option>
            <option v-for="item in this.list.data" :key="item.id" :value="item">{{item.name}}</option>
        </select>
        </v-chip>

        <v-icon class="ml-1" color="blue">mdi-arrow-right</v-icon>

        <v-chip dense class="ml-1">
            <select v-model="selectedDst">
                <option disabled value="">目的地点</option>
                <option v-for="item in this.list.data" :key="item.id" :value="item">{{item.name}}</option>
            </select>
        </v-chip>

        <v-chip dense class="mx-2" color="blue lighten-3">
            <select v-model="qmode">
                <option disabled value="">导航方式</option>
                <option v-for="item in this.function" :key="item.id" :value="item.id">{{item.name}}</option>
            </select>
        </v-chip>

        <v-btn @click="submitPos" text small rounded class="font-weight-bold">计算</v-btn>
        <v-btn @click="animePlay" text small rounded class="font-weight-bold">动画</v-btn>
        <v-btn @click="changeMap" text small rounded class="font-weight-bold">校区</v-btn>
        <v-btn @click="changeRoute" text small rounded class="font-weight-bold">路径</v-btn>
        <v-btn @click="getNearlyBus" text small rounded class="font-weight-bold">班车</v-btn>
        <!-- </v-container> -->
        </template>
    </v-toolbar>
	<v-card 
		class="map pa-2" rounded="lg" elevation="6" 
		:class="{map2 : MapT}"
		@click="getMouseXY($event)"
        :min-width="MapT?750:1050"
        justify="center"
    >
        
		<div class="block">
            <v-icon color="red">mdi-circle</v-icon>
        </div>

		<svg xmlns="http://www.w3.org/2000/svg" version="1.1" v-bind:viewBox="this.MapT ? this.size2 : this.size1">
			<path 
				v-bind:d="this.Pathsel == 0 ? this.Path1Data : this.Path2Data" 
				fill="transparent" 
				stroke="blue" 
				stroke-width="10"></path>
		</svg>
	</v-card>
</v-container>
</template>

<script>
// @ is an alias to /src
import anime from 'animejs/lib/anime.es';
const PixelRate = 10;

export default {
  name: 'MapView',
    data: () => ({
        shownav:true,
        MapT   : false ,
		qmode  : 0 ,

		size1 :  "0 0 1050 650",
		size2 :  "0 0 750 1100",

		selectedSrc : {} ,
		selectedDst : {} , 
        function:[{id:0,name:'最短距离'},{id:1,name:'最短时间'},{id:2,name:'骑行'}],
		list:{data:[]} ,
		Posel  : 0 ,
		map1 : 0 ,
		map2 : 0 ,
		pos1 : { x : 0 , y : 0 } , 
		pos2 : { x : 0 , y : 0 } ,

		Pathsel : 0 ,
		Path1Data : "",
		Path2Data : "",
		Path3Data : "",
		Path4Data : "",
    }),
    created() {
        this.$get('/api/map',{'action':'q'},'',()=>{},(res)=>{
            this.list.data = [];
            this.list.data = res.data.data;
            console.log(this.list);
        },()=>{});
    },
    mounted() {
        this.$get('/api/map',{'action':'q'},'',()=>{},(res)=>{
            this.list.data = [];
            this.list.data = res.data.data;
            console.log(this.list);
        },()=>{});
    },
    methods: {
        submitPos () {
            if (this.Posel == 0) {
                this.map1 = Math.floor(this.selectedSrc.id / 10000) - 1;
                this.map2 = Math.floor(this.selectedDst.id / 10000) - 1;

                this.pos1.x = this.selectedSrc.x , this.pos1.y = this.selectedSrc.y;
                this.pos2.x = this.selectedDst.x , this.pos2.y = this.selectedDst.y;
                this.Posel = 2;
            }
            if(this.Posel == 2) {
                let tmp1 = this.map1 , tmp2 = this.map2; console.log(tmp1 , tmp2);
                let raction = 	
                this.qmode == 0 ? "rs" :
                this.qmode == 1 ? "rt" :
                this.qmode == 2 ? "rb" : "r";
                this.$get('/api/map',{
                        m1 : tmp1 ,
                        x1 : this.pos1.x ,
                        y1 : this.pos1.y ,
                        m2 : tmp2 ,
                        x2 : this.pos2.x ,
                        y2 : this.pos2.y ,
                        action : raction
                },'',()=>{},(res)=>{
                    res.data.path1.forEach((element , idx) => {
                            if(idx == 0) {
                                this.Path1Data  = "M" + element.x *PixelRate + " " + element.y *PixelRate + " ";
                            } else {
                                this.Path1Data += "L" + element.x *PixelRate + " " + element.y *PixelRate + " ";
                            }
                        });
                        console.log(this.Path1Data);
                        if(res.data.path2 == undefined) this.Path2Data = "";
                        else{
                            res.data.path2.forEach((element , idx) => {
                                if(idx == 0) this.Path2Data = "M" + element.x *PixelRate + " " + element.y *PixelRate + " ";
                                else this.Path2Data += "L" + element.x *PixelRate + " " + element.y *PixelRate + " ";
                            });
                        }
                        if(res.data.path3 == undefined) this.Path3Data = "";
                        else{
                            res.data.path3.forEach((element , idx) => {
                                if(idx == 0) this.Path3Data  = "M" + element.x *PixelRate + " " + element.y *PixelRate + " ";
                                else this.Path3Data += "L" + element.x *PixelRate + " " + element.y *PixelRate + " ";
                            });
                        }
                        if(res.data.path4 == undefined) this.Path4Data = "";
                        else{
                            res.data.path4.forEach((element , idx) => {
                                if(idx == 0) this.Path4Data  = "M" + element.x *PixelRate + " " + element.y *PixelRate + " ";
                                else this.Path4Data += "L" + element.x *PixelRate + " " + element.y *PixelRate + " ";
                            });
                        }
                        if (this.MapT == false) {
                            if (tmp1 == 0) ;
                            else if (tmp1 == 1) {
                                [this.Path1Data , this.Path3Data] = [this.Path3Data , this.Path1Data];
                                [this.Path2Data , this.Path4Data] = [this.Path4Data , this.Path2Data];
                            }
                        } else {
                            if (tmp1 == 1) ;
                            else if (tmp1 == 0) {
                                [this.Path1Data , this.Path3Data] = [this.Path3Data , this.Path1Data];
                                [this.Path2Data , this.Path4Data] = [this.Path4Data , this.Path2Data];						
                            }
                        }
                    },()=>{});
                this.Posel = 0;
            }
        },
        getMouseXY(e) {
            let x = Math.floor(e.offsetX / PixelRate) ;
            let y = Math.floor(e.offsetY / PixelRate) ;
            switch (this.Posel) {
                case 2 :
                case 0 :
                    this.map1 = this.MapT ? 1 : 0;
                    this.pos1 = {x , y};
                    this.Posel = 1;
                    break;
                case 1 :
                    this.map2 = this.MapT ? 1 : 0;
                    this.pos2 = {x , y};
                    this.Posel = 2;
                    break;
            }
            console.log(x , "," , y);
        } ,
        animePlay() {
            let path = anime.path('path');
            anime({
                targets: '.block',
                translateX: path('x'),
                translateY: path('y'),
                rotate: path('angle'),
                easing: 'linear',
                duration : 2000
            });
        },
        changeMap() {
            [this.Path1Data , this.Path3Data] = [this.Path3Data , this.Path1Data];
            [this.Path2Data , this.Path4Data] = [this.Path4Data , this.Path2Data];
            this.MapT = !this.MapT;
        } ,
        changeRoute() {
            this.Pathsel = !this.Pathsel;
        },
        getNearlyBus() {
            this.$get('/api/map',{'action':'b','m':this.MapT ? 1 : 0 },'',()=>{},(res)=>{
                let start_time = res.data.nears;

                if (start_time.hour == -1) {
                    alert("今天已经没有班车了QAQ");
                } else {
                    alert("最近的一辆班车为"+start_time.hour+":"+start_time.mins+" 请规划好时间，以防延误");
                }
            },()=>{});
	}
    },
}
</script>

<style scoped>

.map {
	width: 1050px;
	height: 650px;
	background-image: url("@/assets/map/bg.png");
	background-size: 1050px 650px;
	background-repeat:no-repeat;
}
.map2 {
	width: 750px;
	height: 1100px;
	background-image: url("@/assets/map/xitucheng.png");
	background-size: 750px 1100px ; 
	background-repeat:no-repeat;
}
.block {
    width:20px;
    height:20px;
	background:none;
}
</style>
