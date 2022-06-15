<template>
<v-container>
    <div class="command">
		<select v-model="selectedSrc">
			<option disabled value="">请选择起始地点</option>
			<option v-for="item in this.listData" :key="item.id" :value="item">{{item.name}}</option>
		</select>
		<select v-model="selectedDst">
			<option disabled value="">请选择目的地点</option>
			<option v-for="item in this.listData" :key="item.id" :value="item">{{item.name}}</option>
		</select>

		<label><input type="radio" v-model="qmode" value="0"/>距离最短</label>
		<label><input type="radio" v-model="qmode" value="1"/>时间最短</label>
		<label><input type="radio" v-model="qmode" value="2"/>使用骑行</label>

		<button @click="submitPos">Click Here to Submit</button>
		<button @click="animePlay">Click Here to Play</button>
		<button @click="changeMap">Click Here to ChangeMap</button>
		<button @click="changeRoute">Click Here to ChangeRoute</button>
	</div>
	<div 
		class="map" 
		:class="{map2 : MapT}"
		@click="getMouseXY($event)">
		<div class="block"> </div>

		<svg xmlns="http://www.w3.org/2000/svg" version="1.1" v-bind:viewBox="this.MapT ? this.size2 : this.size1">
			<path 
				v-bind:d="this.Pathsel == 0 ? this.Path1Data : this.Path2Data" 
				fill="transparent" 
				stroke="blue" 
				stroke-width="10"></path>
		</svg>
	</div>
</v-container>
</template>

<script>
// @ is an alias to /src
import anime from 'animejs/lib/anime.es.js';
const PixelRate = 10;

export default {
  name: 'MapView',
    data: () => ({
        MapT   : false ,
		qmode  : 0 ,

		size1 :  "0 0 1050 650",
		size2 :  "0 0 750 1100",

		selectedSrc : {} ,
		selectedDst : {} , 
		listData : [] ,
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
    }),methods: {
        submitPos () {
            if (this.Posel == 0) {
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
                },'',(res)=>{
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
                    },()=>{},()=>{});
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
        }
    },
}
</script>

<style scoped>

.command {
	position:fixed;
	left :70px;
	bottom: 50px;
	width: 1000px;
	height :100px;
	border-radius: 10px;
	background-color: grey;
}

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
	width: 20px;
	height: 20px;
	background-color: red;
}
</style>
