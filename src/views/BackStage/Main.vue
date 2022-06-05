<template>
<v-app id="back">

<!-- Console -->
    <v-card
        class="white ma-0 fill-height d-flex flex-column rounded-0"
        style="position:fixed"
        color="white"
        elevation="8"
        width="360"
    >
    <!-- Title -->
        <v-card
            class="mt-2 mx-auto py-6 pr-2 d-flex flex-column"
            elevation="0"
            width="320"
        >
            <span class="text-caption grey--text  font-weight-medium 
                        mx-auto mt-4 mb-1"
            >TAP Online Terminal
            </span>
            <span class="text-h4 font-weight-black pr-1 mx-auto mb-1">
                <v-icon color="black" class="mr-2 mb-1">
                    mdi-application-brackets-outline
                </v-icon>
                Console
            </span>
            <span class="text-caption grey--text mx-auto">
                {{today}}
            </span>
        </v-card>

    <!-- Input -->
        <v-card
            class="mx-auto mb-4 px-2"
            elevation="0"
            width="320"
            color="grey lighten-4 rounded-lg"
        >
            <v-card-title class="text-subtitle-2 font-weight-black">
                <span class="mr-16">SQL Statement </span>   
                <v-btn
                    rounded  small
                    color="amber"
                    class="ml-12 white--text font-weight-bold"
                    @click="sendSQL()"
                >SEND
                </v-btn>
            </v-card-title>
            <v-textarea
                class="ml-3 mr-4 rounded-lg"
                solo  flat  dense  counter
                label="Statement Input"
                rows="2"  no-resize
                v-model="sql.req"
            ></v-textarea>
        </v-card>

    <!-- Result -->
        <v-card
            class="mb-5 fill-height mx-auto rounded-lg px-2"
            width="320"
            elevation="0"
            color="grey lighten-4"
        >
            <v-card-title class="text-body-2 font-weight-black">
                SQL Result
            </v-card-title>
            <v-card
                class="ma-0 pa-0 mx-auto d-flex flex-row"
                style="background:none;"
                elevation="0"
            >
            <!-- Message -->
                <v-badge class="ml-3" color="amber" overlap
                        :content="sql.count"
                >
                    <v-card
                        class="ml-0 rounded-lg d-flex"
                        elevation="0"
                        width="275" height="44"
                    >
                        <span class="black--text text-subtitle-2 font-weight-bold ma-auto" 
                        >{{sql.msg}}
                        </span>
                    </v-card>
                </v-badge>
            </v-card>
        
        <!-- Value -->
            <v-card
                style="position: absolute;bottom:20px;top:110px;left:20px"
                class="rounded-lg d-flex pa-1 overflow-y-auto"
                color="white"
                elevation="0"
                width="275"
            ><span 
                class="text-subtitle-2 font-weight-bold ma-auto"
                style="max-width:240px;word-break:break-all;"
            >{{sql.value}}
                </span>
            </v-card>
        </v-card>
    </v-card>
    
<!-- Infomation -->
    <v-main class="main align-self-start pa-4 fill-height" 
        style="position:absolute;top:0;right:0;left:360px"   
    >
    <v-container class="d-flex flex-column flex-wrap">
    <!-- Header -->
        <span class="mt-2 ml-4 text-h5 font-weight-bold">
            BackStage
        </span>
        <span class="mt-0 ml-4 text-caption grey--text font-weight-medium">
            Tiny And Pretty Control Center @ NoUITeam
        </span>

    <!-- Data -->
        <v-container d-flex flex-row flex-wrap justify-start class="ml-1">
            <v-card 
                class="rounded-lg my-2 mr-8"
                width="200" height="70"
            >
                <v-card-title>User Number</v-card-title>
            </v-card>
            <v-card 
                class="rounded-lg my-2 mr-8"
                width="200" height="70"
            >
                <v-card-title>Course Number</v-card-title>
            </v-card>
            <v-card
                class="rounded-lg my-2"
                width="200" height="70"
            >
                <v-card-title>Online User</v-card-title>
            </v-card>
        </v-container>

    <v-divider class="mx-4 my-2"></v-divider>

    <!-- Directory -->
        <v-card
            height="50"
            class="mt-4 ml-4 mr-16 d-flex flex-row rounded-lg pa-2 pr-6"
        >
            <v-icon class="ml-2 my-auto mr-2"
                small color="indigo"
            >mdi-puzzle</v-icon>
            <span class="my-auto text-button indigo--text">Current Dir</span>
            <span class="my-auto ml-6 text-body-2 font-weight-bold">{{dir}}</span>
            <v-card 
                class="ml-auto my-auto pa-0"
                style="background:none"
                elevation="0" 
                max-width="120px"
            >
                <v-dialog v-model="dialog.dir_set" persistent max-width="400px">
                    <template v-slot:activator="{on,attrs}">
                        <v-btn
                            small rounded outlined color="info"
                            class="mr-2"
                            v-bind="attrs" v-on="on"
                        ><v-icon small>mdi-cog</v-icon>
                        </v-btn>
                    </template>
                    <v-card class="px-2 pt-6 pb-2 rounded-lg">
                        <v-card-title class="text-h5"> Change Current Dir </v-card-title>
                        <v-container fluid class="px-6">
                            <v-text-field :value="input.dir_set" :label="dir"></v-text-field>
                        </v-container>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                color="blue darken-1" text
                                @click="dialog.dir_set=false"
                            >Cancel
                            </v-btn>
                            <v-btn
                                color="blue darken-1 font-weight-bold" text
                                @click="changeDir();"
                            >Change
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <v-btn
                    small rounded outlined color="orange"
                    @click="refresh()"
                ><v-icon small>mdi-refresh</v-icon>
                </v-btn>
            </v-card>
        </v-card>

    <!-- Table -->
        <v-container class="ml-1 d-flex flex-row justify-start flex-wrap">
        <!-- List -->
            <v-card class="mt-2 my-2 mr-8 pa-2 rounded-lg overflow-auto"
                max-height="320px"
                min-width="240px"
                max-width="320px"
            >   
                <v-card-title>
                    <span class="text-h6 font-text-black">
                        Table List
                    </span>
                    <v-btn
                        class="white--text font-weight-bold"
                        rounded  small color="success" outlined
                        style="position:absolute;right:35px;top:25px"
                    ><v-icon small>mdi-plus-thick</v-icon>
                    </v-btn>
                </v-card-title>   

                <v-simple-table class="pa-2"
                    fixed-header height="220px" dense
                >
                    <thead>
                        <tr>
                            <th class="text-left">Name</th>
                            <th class="text-center">Option</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item,index) in tablelist" :key="index">
                            <td>{{item}}</td>
                            <td>
                                <v-btn
                                    class="ma-1"
                                    rounded small color="info" outlined
                                    @click="getDetail(item)"
                                ><v-icon small>mdi-arrow-down-thick</v-icon>
                                </v-btn>
                                <v-btn
                                    class="ma-1"
                                    rounded small color="error" outlined
                                    @click="delTable(item,index)"
                                ><v-icon small>mdi-delete-forever</v-icon>
                                </v-btn>
                            </td>
                        </tr>
                    </tbody>
                </v-simple-table>
            </v-card>

        <!-- Detail -->
            <v-card class="mt-2 my-2 pa-2 rounded-lg overflow-auto" 
                max-height="320px"
                min-width="280px"
                max-width="580px"
            >
                <v-card-title>
                    <span class="text-h6 font-text-black">
                        Detail of {{name}}
                    </span>
                    <v-btn
                        class="white--text font-weight-bold"
                        rounded  small color="success" outlined
                        style="position:absolute;right:35px;top:25px"
                    ><v-icon small>mdi-plus-thick</v-icon>
                    </v-btn>
                </v-card-title>

                <v-simple-table 
                    class="pa-2" fixed-header height="220px" dense
                >
                    <thead>
                        <tr>
                            <th class="text-left">S/N</th>
                            <th v-for="(item,index) in field" :key="index"
                                class="text-left" 
                            >{{item}}
                            </th>
                            <th class="text-center">Option</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(value,index) in detail" :key="index">
                            <td>{{index}}</td>
                            <td v-for="(item,idx) in value" :key="idx">
                                {{item}}
                            </td>
                            <td>
                                <v-btn
                                    class="ma-1"
                                    rounded small color="info" outlined
                                    @click="pre_setValue(index)"
                                ><v-icon small>mdi-pencil</v-icon>
                                </v-btn>
                                <v-btn
                                    class="ma-1"
                                    rounded small color="error" outlined
                                    @click="delValue(value[0],index)"
                                ><v-icon small>mdi-delete-forever</v-icon>
                                </v-btn>
                            </td>
                        </tr>
                    </tbody>
                </v-simple-table>
            </v-card>
        </v-container>
        

        <v-dialog v-model="dialog.value_set" persistent max-width="600px">
            <v-card class="px-2 pt-6 pb-2 rounded-lg">
                <v-card-title class="text-h5">Modify Value</v-card-title>
                <v-container fluid class="px-6">
                    <v-row>
                        <v-col  v-for="(item,index) in input.data_detail" 
                            :key="index" 
                            cols="6"  sm="4" 
                        >
                            <v-text-field v-if="index==0" 
                                outlined dense
                                readonly
                                :value="detail[mod_line][0]"
                            ></v-text-field>
                            <v-text-field v-if="index!=0" 
                                outlined dense
                                v-model="item.val"
                                :label="field[index]"
                                :placeholder="detail[mod_line][index]"
                            >
                            </v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="blue darken-1" text
                        @click="dialog.value_set=false"
                    >Cancel
                    </v-btn>
                    <v-btn
                        color="blue darken-1 font-weight-bold" text
                        @click="setValue();"
                    >Change
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </v-container>   
    </v-main>

</v-app>
</template>

<script>
// @ is an alias to /src
import Vue from 'vue'
export default {
    name:'BackStageView',
    data: () => ({
        tablelist:[
            'Test',
        ],
        dialog:{
            dir_set:false,
            table_add:false,
            value_add:false,
            value_set:false,
        },
        input:{
            dir_set:'',
            table_add_field:'',
            table_add_type:'',
            table_size:400,
            data_detail:[{val:''},{val:''},{val:''}]
        },
        today:'2022-01-01',
        user:Vue.prototype.$USER,
        dir:'/TAP/data',
        sql:{
            req:'',
            msg:'',
            count:'0',
            value:'',
        },
        name:'Test',
        field:['field1','field2','field3'],
        detail:[['Data1-1','Data1-2','Data1-3'],
                ['Data2-1','Data2-2','Data2-3']],
        mod_line:0,
    }),
    created(){
        this.today = Vue.prototype.$getToday();
        this.getDir();
        this.getList();
    },
    methods: {
        clearSQL:function(){
            //this.sql.req='',
            this.sql.msg='',
            this.sql.count='0',
            this.sql.value=''
        },

        sendSQL:function(){
            this.$post('/api/sql',this.sql.req,'','run',(res)=>{
                this.clearSQL();
                this.sql.msg = res.headers.msg;
                this.sql.count = res.data.count+'';
                this.sql.value = res.data.retVal; 
            },(res)=>{
                this.sql.msg = res.headers.msg;
                this.sql.count = '0';
                this.sql.value = 'UNEXPECTED REQUEST'; 
            },(res)=>{alert(res.status)});
        },

        getList:function(){
            this.name='';
            this.$get('/api/sql','','list',(res)=>{
                this.tablelist = res.data.list;
            },()=>{},(res)=>{alert(res.status)})
            
        },

        getDetail:function(tablename){
            this.$get('/api/sql',{table:tablename},'detail',(res)=>{
                this.name = res.data.name;
                this.field = res.data.field.split(",");
                this.input.data_detail=[];
                for(var i=0; i < this.field.length;i++){
                    var obj={val:''}
                    this.input.data_detail.push(obj);
                }
                this.detail = [];
                var values = res.data.data.split(";");
                for(i=0;i<values.length;i++){
                    this.detail.push(values[i].split(","));
                }
            },()=>{},(res)=>{alert(res.status)});
            
        },

        delTable:function(tablename,index){
            console.log(tablename);
            confirm('Delete Confirm') && (
                this.$post('/api/sql',tablename,'','deltable',()=>{
                    this.tablelist.splice(index,1);
                },()=>{},this.SqlExpFunction)
            )
        },

        pre_setValue:function(index){
            this.mod_line=index;
            this.dialog.value_set=true;
        },

        setValue:function(){
            var index=this.mod_line;
            var cmd = this.name+';'+this.field[0]+'='+this.detail[index][0]+';';
            for(var i = 1;i<this.field.length;i++){
                this.input.data_detail[i].val=this.input.data_detail[i].val.trim();
                var str = this.input.data_detail[i].val;
                if(str.length==0) str=this.detail[index][i];
                cmd += this.field[i]+'='+str+ (i==this.field.length-1?'':' , ');
            }
            confirm('Change Confirm') && (
                this.$post('/api/sql',cmd,'','update',()=>{
                    for(i = 1;i<this.field.length;i++){
                        if(this.input.data_detail[i].val.length==0){
                            this.input.data_detail[i].val = this.detail[index][i];
                        }
                        this.detail[index][i]=this.input.data_detail[i].val;
                    }
                    alert('Change Success');
                    this.dialog.value_set=false;
                },()=>{},this.SqlExpFunction)
            )

        },

        delValue:function(dataid,index){
            console.log(dataid);
            var cmd = this.name+';'+this.field[0]+'='+this.detail[index][0];
            confirm('Delete Confirm') && (
                this.$post('/api/sql',cmd,'','delete',()=>{
                    this.detail.splice(index,1);
                },()=>{},this.SqlExpFunction)
            )
        },

        refresh:function(){
            this.getDir();
            this.getList();
        },

        getDir:function(){
            var request = '.dir;';
            this.$post('/api/sql',request,'','run',(res)=>{
                this.dir=res.data.retVal;
            },()=>{alert('Dir Change Failed')},(res)=>{alert(res.status)});
        },

        changeDir:function(){
            var request = '.setdir '+this.input.dir_set+';'
            this.$post('/api/sql',request,'','run',()=>{
                this.dir=this.input.dir_set;
                this.dialog.dir_set=false;
            },()=>{alert('Dir Change Failed')},(res)=>{alert(res.status)});
        },
    },
    mounted() {

    },
}
</script>

<style>
#back{
    background-image:url('../../assets/bg2.png');
    background-position: center;
    background-repeat:repeat-y; 
    background-size: cover;
    /* background-color: aliceblue; */

}
.main{
    background-color: rgba(255,255,255,0.8);
}

</style>