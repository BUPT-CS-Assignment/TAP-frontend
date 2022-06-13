<template>
<v-app id="back">

<!-- Console -->
    <v-card
        class="white ma-0 fill-height d-flex flex-column rounded-0"
        style="position:fixed"
        color="white"
        elevation="8"
        width="340"
    >
    <!-- Title -->
        <v-card
            class="mt-2 mx-auto py-6 pr-2 d-flex flex-column"
            elevation="0"
            width="300"
        >
            <span class="text-caption grey--text  font-weight-medium 
                        mx-auto mt-4 mb-1"
            >TAP Online Terminal
            </span>
            <span class="text-h4 font-weight-black pr-3 mx-auto mb-1">
                <v-icon color="black" class="mr-2 mb-1">
                    mdi-application-brackets-outline
                </v-icon>
                Console
            </span>
            <span class="mx-auto grey--text text-caption font-weight-medium">
                {{time.year}}-{{time.month}}-{{time.day}}
                {{time.hour}}:<template v-if="time.min < 10">0</template>{{time.min}}
            </span>
        </v-card>

    <!-- Input -->
        <v-card
            class="mx-auto mb-4 px-2"
            elevation="0"
            width="300"
            color="grey lighten-4 rounded-lg"
        >
            <v-card-title class="text-subtitle-2 font-weight-black">
                <span class="mr-16">SQL Statement </span>   
                <v-btn
                    rounded  small
                    color="amber"
                    class="ml-auto white--text font-weight-bold"
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
            width="300"
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
                        width="255" height="44"
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
                width="255"
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
        style="position:absolute;top:0;right:0;bottom:0;left:340px"   
    >

<!-- Head -->
    <v-container class="d-flex flex-column ">
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
                width="200" height="100"
            >   <v-card-title>User Number</v-card-title>
                <v-btn rounded small class="font-weight-bold" 
                        color="grey lighten-2" elevation="0"
                        style="position:absolute;right:15px;bottom:10px"
                        @click="dialog.user_add = true;"
                >New</v-btn>
            </v-card>
            <v-card 
                class="rounded-lg my-2 mr-8"
                width="200" height="100"
            >   <v-card-title class="font-weight-bold">Course Number</v-card-title>
                <v-btn rounded small class="font-weight-bold" 
                        color="grey lighten-2" elevation="0"
                        style="position:absolute;right:15px;bottom:10px"
                        @click="dialog.course_add = true;"
                >New</v-btn>
            </v-card>
            <v-card
                class="rounded-lg my-2"
                width="200" height="100"
            ><v-card-title>Online User</v-card-title>
            </v-card>
        </v-container>
    </v-container>

    <v-divider class="mx-4 my-2"></v-divider>

<!-- Operator -->
    <v-card class="ma-6 pa-0 d-flex flex-row" 
        style="background:none;"
        elevation="0"
    >
    <!-- Table -->
        <v-card 
            class="d-flex flex-column align-self-start justify-start"
            style="background:none;"
            elevation="0"
            max-width="320"
        >
            <v-card class="mt-1 d-flex flex-row flex-wrap rounded-lg px-2 pb-2"
                min-height="130" width="320"
            >
                <v-card-title class="mt-2 mx-0 pa-0 text-overline font-weight-bold indigo--text">
                        <v-icon class="mx-2 mb-0"
                            small color="indigo"
                        >mdi-puzzle</v-icon>
                    Current Dir
                </v-card-title>
                <v-container fluid>
                    <span class="mx-auto text-body-2 font-weight-bold">{{dir}}</span>
                </v-container>
                
                <v-card 
                    class="mx-auto my-auto pb-1"
                    style="background:none"
                    elevation="0" 
                    max-width="300px"
                >
                    <v-btn
                        small rounded outlined color="indigo" class="mr-2"
                        @click="dialog.dir_set = true"
                    ><v-icon small>mdi-vector-polyline</v-icon>
                    </v-btn>
                    <v-btn 
                        small rounded outlined color="blue" class="mr-2"
                        @click="ratioSync();dialog.clock_set = true"
                    ><v-icon small>mdi-clock-fast</v-icon>
                    </v-btn>
                    <v-btn
                        small rounded outlined color="orange" class="mr-2"
                        @click="refresh()"
                    ><v-icon small>mdi-refresh</v-icon>
                    </v-btn>
                    <v-btn
                        small rounded outlined color="blue-grey"
                        @click="Signout()"
                    ><v-icon small>mdi-export</v-icon>
                    </v-btn>
                </v-card>
            </v-card>
        <!-- List -->
            <v-card class="mt-4 mb-6 pa-2 rounded-lg overflow-auto"
                width="320px"
            >   
                <v-card-title>
                    <span class="text-h6 font-text-black">
                        Table List
                    </span>
                    <v-btn
                        class="white--text font-weight-bold"
                        rounded  small color="success" outlined
                        style="position:absolute;right:35px;top:25px"
                        @click="dialog.table_add = true"
                    >New Table
                    </v-btn>
                </v-card-title>   

                <v-simple-table class="pa-2"
                    fixed-header dense
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
                                ><v-icon small>mdi-database-search</v-icon>
                                </v-btn>
                                <v-btn class="ma-1" rounded small color="error" outlined
                                    @click="delTable(item,index)"
                                ><v-icon small>
                                    mdi-delete-off
                                    </v-icon>
                                </v-btn>
                            </td>
                        </tr>
                    </tbody>
                </v-simple-table>
            </v-card>
        </v-card>

    <!-- Detail -->
        <v-card class="ml-6 mt-1 mb-6 pa-2 rounded-lg overflow-auto">
            <v-card-title>
                <span class="text-h6 font-text-black">
                    Detail of {{name}}
                </span>
                <v-btn
                    class="white--text font-weight-bold"
                    rounded  small color="success" outlined
                    style="position:absolute;right:35px;top:25px"
                    @click="pre_addValue()"
                >New Value
                </v-btn>
            </v-card-title>

            <v-simple-table  class="pa-2" fixed-header dense>
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
                                @click="mod_line=index;dialog.value_set=true;"
                            ><v-icon small>mdi-pencil</v-icon>
                            </v-btn>
                            <v-btn
                                class="ma-1"
                                rounded small color="error" outlined
                                @click="delValue(value,index)"
                            ><v-icon small>mdi-delete-off</v-icon>
                            </v-btn>
                        </td>
                    </tr>
                </tbody>
            </v-simple-table>
        </v-card>

    </v-card>

<!-- Dialog -->
    <!-- Set Clock -->
    <v-dialog v-model="dialog.clock_set" persistent max-width="500px">
        <v-card class="px-2 pt-6 pb-2 rounded-lg">
            <v-card-title class="text-h5"> Change Clock Rate </v-card-title>
            <v-container>
                <v-row class="mx-4 mb-4">
                    <v-col class="text-left">
                        <span class="text-h3 font-weight-medium">
                            {{clock_rate_items[input.clock_rate]}}
                        </span>
                        <span class="subheading font-weight-light mr-1">TIMES</span>
                    </v-col>
                    <v-col class="text-right mr-3">
                        <v-avatar
                            :color="clock_rate_color[input.clock_rate]"
                            size="60"
                        ><v-icon large>
                            {{clock_rate_icon[input.clock_rate]}}
                        </v-icon>
                        </v-avatar>
                    </v-col>
                </v-row>
                <v-row class="mx-6">
                    <v-slider step="1" min="0" max="8" track-color="grey" always-dirty
                        :color="clock_rate_color[input.clock_rate]"
                        v-model="input.clock_rate"
                    >
                        <template v-slot:prepend>
                            <v-icon color="indigo">mdi-run</v-icon>
                        </template>
                        <template v-slot:append>
                            <v-icon color="red">mdi-rocket-launch</v-icon>
                        </template>
                    </v-slider>
                </v-row>
            </v-container>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="blue darken-1" text
                    @click="dialog.clock_set=false"
                >Cancel
                </v-btn>
                <v-btn
                    color="blue darken-1 font-weight-bold" text
                    @click="changeRatio();"
                >Change
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <!-- Set Directory -->
    <v-dialog v-model="dialog.dir_set" persistent max-width="400px">
        <v-card class="px-2 pt-6 pb-2 rounded-lg">
            <v-card-title class="text-h5"> Change Current Dir </v-card-title>
            <v-container fluid class="px-6">
                <v-text-field v-model="input.dir_set" :label="dir"></v-text-field>
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

    <!-- Add Table -->
    <v-dialog v-model="dialog.table_add" persistent max-width="600px">
        <v-card class="px-2 pt-6 pb-2 rounded-lg">
            <v-card-title class="text-h5">
                Add Table
                <v-btn class="ml-auto" rounded small color="error" outlined
                    @click="dialog.field_add = true"
                >New Field
                </v-btn>
            </v-card-title>
            <v-container fluid class="px-6 pb-0 mb-0">
                <v-col>
                    <v-row>
                        <v-text-field outlined dense label = "Directory"
                            v-model = "input.dir_set" :rules="[rules.required]"
                        ></v-text-field>
                    </v-row>
                    <v-row>
                        <v-text-field outlined dense label="Table Name"
                            v-model="input.table_name" :rules="[rules.required]"
                        ></v-text-field>
                        <v-combobox outlined dense label="Table Size (400 as defalut)" class="ml-3"
                            v-model="input.table_size"
                            :items="table_size_items"
                        ></v-combobox>
                    </v-row>
                </v-col>
            </v-container>
            <v-container d-flex flex-row flex-wrap class="px-6">
                <v-card  v-for="(item,index) in input.table_field" :key = "index"
                    elevation="0" style="background: none;"
                ><v-chip v-if="item.show" close outlined
                        class="ma-2 green--text font-weight-bold"
                        @click:close="item.show = false"
                    ><v-icon color="green" class="mr-1">mdi-tag-multiple</v-icon>
                    {{item.name}} {{item.type}}
                    </v-chip>
                </v-card>
            </v-container>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text
                    @click="dialog.table_add=false"
                >Cancel
                </v-btn>
                <v-btn color="blue darken-1 font-weight-bold" text
                    @click="addTable();"
                >Add
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <!-- Add Field -->
    <v-dialog v-model="dialog.field_add" persistent max-width="300px">
        <v-card class="px-6 pt-4 pb-2 rounded-lg">
            <v-card-title class="text-h5 mb-2">New Field</v-card-title>
            <v-col>
                <v-row>
                    <v-text-field v-model = "input.field.name"
                        outlined dense label = "Field Name"
                        :rules="[rules.required]"
                    ></v-text-field>
                </v-row>
                <v-row>
                    <v-combobox v-model="input.field.type"
                        :items="field_type_items"
                        outlined dense label="Field Type"
                    ></v-combobox>
                </v-row>
            </v-col>
            <v-card-actions><v-spacer></v-spacer>
                <v-btn color="blue darken-1" text
                    @click="dialog.field_add=false"
                >Cancel
                </v-btn>
                <v-btn color="blue darken-1 font-weight-bold" text
                    @click="addField();"
                >Add
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <!-- Add Value -->
    <v-dialog v-model="dialog.value_add" persistent max-width="600px">
        <v-card class="px-2 pt-6 pb-2 rounded-lg">
            <v-card-title class="text-h5">Add Value</v-card-title>
            <v-container fluid class="px-6">
                <v-row>
                    <v-col  v-for="(item,index) in input.data_detail" 
                        :key="index" 
                        cols="6"  sm="4" 
                    >
                        <v-text-field v-if="index == 0" v-model="item.val"
                            outlined dense
                            :rules="[rules.required]"
                            :label="field[index]"   
                        >
                        </v-text-field>
                        <v-text-field v-if="index != 0" v-model="item.val"
                            outlined dense
                            :label="field[index]"   
                        >
                        </v-text-field>
                    </v-col>
                </v-row>
            </v-container>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="blue darken-1" text
                    @click="dialog.value_add=false"
                >Cancel
                </v-btn>
                <v-btn
                    color="blue darken-1 font-weight-bold" text
                    @click="addValue();"
                >Add
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <!-- Set Value -->
    <v-dialog v-model="dialog.value_set" persistent max-width="600px">
        <v-card class="px-2 pt-6 pb-2 rounded-lg">
            <v-card-title class="text-h5">Modify Value</v-card-title>
            <v-container fluid class="px-6">
                <v-row>
                    <v-col  v-for="(item,index) in input.data_detail" 
                        :key="index" 
                        cols="6"  sm="4" 
                    ><v-text-field v-if="index==0" :value="detail[mod_line][0]"
                            outlined dense readonly
                        ></v-text-field>
                        <v-text-field v-if="index!=0" outlined dense
                            v-model="item.val"
                            :label="field[index]" :placeholder="detail[mod_line][index]"
                        ></v-text-field>
                    </v-col>
                </v-row>
            </v-container>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text
                    @click="dialog.value_set=false"
                >Cancel
                </v-btn>
                <v-btn color="blue darken-1 font-weight-bold" text
                    @click="setValue();"
                >Change
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
  
    <!-- Add Course -->
    <v-dialog v-model="dialog.course_add" persistent max-width="600px">
        <v-card class="px-2 pt-6 pb-2 rounded-lg">
            <v-card-title class="text-h5 ml-1">Add New Course</v-card-title>
            <v-container fluid class="px-6">
                <v-row class="mx-auto">
                    <v-col>
                        <v-text-field outlined dense label="ID" v-model="input.course_detail.id">
                        </v-text-field>
                    </v-col>
                    <v-col >
                        <v-text-field outlined dense label="Name" v-model="input.course_detail.name">
                        </v-text-field>
                    </v-col>
                    <v-col >
                        <v-btn outlined color="primary" rounded class="font-weight-bold mx-auto"
                            @click="dialog.week_set = true"
                        >Week 
                            <span class="text-h6 font-weight-bold black--text ml-2"
                            >{{input.course_detail.week}}</span>
                        </v-btn>
                    </v-col>
                </v-row>
                <v-row class="mx-1">
                    <v-textarea filled clearable dense label="Brief Introduction" auto-grow row="2"
                        v-model="input.course_detail.intro"
                    ></v-textarea>
                </v-row>
            </v-container>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text
                    @click="dialog.course_add=false"
                >Cancel
                </v-btn>
                <v-btn color="blue darken-1 font-weight-bold" text
                    @click="addCourse();"
                >Add
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <!-- Week Code -->
    <v-dialog v-model="dialog.week_set" persistent max-width="600px">
        <v-card class="px-2 pt-6 pb-2 rounded-lg">
            <v-card-title class="text-h5">Week Select</v-card-title>
            <v-container fluid class="px-6">
                <v-row dense no-gutters>
                    <v-col v-for="(item,index) in input.week_code" :key="index" cols="2"
                    ><v-checkbox v-model="item.t"
                        :label="index+1+''" color="info"
                    ></v-checkbox>
                    </v-col>
                </v-row>
            </v-container>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text
                    @click="dialog.week_set=false"
                >Cancel
                </v-btn>
                <v-btn color="blue darken-1 font-weight-bold" text
                    @click="input.course_detail.week=65535;dialog.week_set=false;"
                >All
                </v-btn>
                <v-btn color="blue darken-1 font-weight-bold" text
                    @click="setWeek();"
                >Select
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <!-- Add User -->
    <v-dialog v-model="dialog.user_add" persistent max-width="600px">
        <v-card class="px-2 pt-6 pb-2 rounded-lg">
            <v-card-title class="text-h5 ml-1">Add New User</v-card-title>
            <v-container fluid class="px-6">
                <v-row class="mx-auto" >
                    <v-col cols="6">
                        <v-text-field outlined dense label="ID" v-model="input.user_detail.id">
                        </v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field outlined dense label="Name" v-model="input.user_detail.name">
                        </v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-combobox v-model="input.user_detail.auth"
                            :items="user_auth_items" outlined dense label="Auth"
                        ></v-combobox>
                    </v-col>
                    <v-col cols="6">
                        <v-combobox v-model="input.user_detail.gender"
                            :items="user_gender_items" outlined dense label="Gender"
                        ></v-combobox>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field outlined dense label="School" v-model="input.user_detail.school">
                        </v-text-field>
                    </v-col>
                    <v-col v-if="input.user_detail.auth != '教师'" cols="6">
                        <v-text-field outlined dense label="Major" v-model="input.user_detail.major">
                        </v-text-field>
                    </v-col>
                    <v-col v-if="input.user_detail.auth != '教师'" cols="6">
                        <v-text-field outlined dense label="Class" v-model="input.user_detail.classid">
                        </v-text-field>
                    </v-col>
                </v-row>
            </v-container>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialog.user_add=false">Cancel</v-btn>
                <v-btn color="blue darken-1 font-weight-bold" text @click="addUser();">Add</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    </v-main>

</v-app>
</template>

<script>
// @ is an alias to /src
import Vue from 'vue'
export default {
    name:'BackStageView',
    data: () => ({
        time:Vue.prototype.$SYSTIME,
        user:Vue.prototype.$USER,
        tablelist:[
            'Test',
        ],
        dialog:{
            dir_set:false,
            table_add:false,
            value_add:false,
            value_set:false,
            field_add:false,
            clock_set:false,
            course_add:false,
            user_add:false,
            week_set:false,
        },
        input:{
            dir_set:'/home/jianxf/TAP/data/src/',
            table_name:'',
            table_size:400,
            table_field:[{name:'id',type:'int',show:true},],
            data_detail:[{val:''},{val:''},{val:''}],
            user_detail:{id:0,name:'',auth:'学生',gender:'女',school:0,major:0,classid:0},
            course_detail:{id:0,name:'',week:0,intro:''}, 
            week_code:[{t:false},{t:false},{t:false},{t:false},
                        {t:false},{t:false},{t:false},{t:false},
                        {t:false},{t:false},{t:false},{t:false},
                        {t:false},{t:false},{t:false},{t:false}],
            field:{name:'',type:'int'},
            clock_rate:0,
        },
        table_size_items:[200,400,800,1000,2000,4000],
        field_type_items:['int','int64','real','text','longtext'],
        
        
        
        dir:'/TAP/data',
        sql:{
            req:'',
            msg:'',
            count:'0',
            value:'',
        },
        name:'__TEST__',
        field:['field1','field2','field3'],
        detail:[['NULL','NULL','NULL']],
        mod_line:0,
        rules:{
            required: value => !!value || 'Value Required',
        }
    }),
    created(){
        if(!this.$access('3')){
            console.log("ACCESS_DENIED");
            this.$router.push('/auth');
        }
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
            this.$post('/api/sql',tablename,'','detail',(res)=>{
                this.name = res.data.name;
                this.field = res.data.field.split(",");
                this.input.data_detail=[];
                this.detail_input_clear();
                this.detail = [];
                var values = res.data.data.split(";");
                for(var i=0;i<values.length;i++){
                    this.detail.push(values[i].split(","));
                }
            },(res)=>{
                if(res.headers.msg == "DATA_NOT_FOUND"){
                    this.name = res.data.name;
                    this.field = res.data.field.split(",");
                    this.input.data_detail=[];
                    this.detail_input_clear();
                    this.detail = [['NULL']];
                }
            },(res)=>{alert(res.status)});
        },

        addField:function(){
            if(this.input.field.name == "" || this.input.field.name.indexOf(" ") != -1){
                alert('Invalid Params');
                return;
            }
            this.input.table_field.push({name:this.input.field.name,type:this.input.field.type,show:true});
            this.input.field.name='';
            this.input.field.type='int';
            this.dialog.field_add = false;
        },

        addTable:function(){
            var name = this.input.table_name;
            var dir = this.input.dir_set
            if(dir == "" || dir.indexOf(" ") != -1
                || name == "" || name.indexOf(" ") != -1){
                alert("Invalid Params");
                return;
            }
            var sql = ".setdir " + dir + ";";
            sql += ".setsize " + this.input.table_size+";";
            sql += "create table "+ name + "(";
            var all = 0;
            this.input.table_field.forEach((item)=>{
                if(item.show){
                    all ++;
                    sql += item.name + " " + item.type + ",";
                }
            });
            if(all == 0){ alert("Empty Params"); return;}
            sql = sql.substring(0,sql.length-1) + ");";
            this.$post('/api/sql',sql,'','run',()=>{
                this.dir = dir;
                this.tablelist.push(name)
                this.dialog.table_add = false;
            },(res)=>{alert(res.msg)},(res)=>{alert(res.status)});
        },

        delTable:function(tablename,index){
            confirm('Delete Confirm') && (
                this.$post('/api/sql',tablename,'','drop',()=>{
                    this.tablelist.splice(index,1);
                },()=>{},this.SqlExpFunction)
            )
        },

        detail_input_clear(){
            this.input.data_detail=[];
            for(var i=0; i < this.field.length;i++){
                var obj={val:''}
                this.input.data_detail.push(obj);
            }
        },

        pre_addValue:function(){
            if(this.name == "__TEST__" || this.name == ""){
                alert("Table Assigned Required");
                return;
            }
            this.dialog.value_add=true;
        },

        addValue:function(){
            var cmd = this.name;
            var field="", value="";
            for(var i = 0;i<this.field.length;i++){
                this.input.data_detail[i].val=this.input.data_detail[i].val.trim();
                if(this.input.data_detail[i].val.length!=0){
                    field += this.field[i]+',';
                    value += this.input.data_detail[i].val+',';
                }
            }
            field = field.substring(0,field.length-1);
            value = value.substring(0,value.length-1);
            cmd = cmd + ';'+field + ';' + value;
            this.$post('/api/sql',cmd,'','insert',()=>{
                this.getDetail(this.name);
                this.detail_input_clear();
                this.dialog.value_add=false;
            },(res)=>{alert(res.headers.msg)},this.SqlExpFunction)

        },

        setValue:function(){
            var index=this.mod_line;
            var cmd = this.name+';'+this.field[0]+'='+this.detail[index][0]+';';
            for(var i = 1;i<this.field.length;i++){
                this.input.data_detail[i].val=this.input.data_detail[i].val.trim();
                var str = this.input.data_detail[i].val;
                if(str.length!=0) cmd += this.field[i]+'='+str+ ' , ';    
            }
            cmd=cmd.substring(0,cmd.length-3);
            console.log(cmd);
            this.$post('/api/sql',cmd,'','update',()=>{
                for(i = 1;i<this.field.length;i++){
                    if(this.input.data_detail[i].val.length!=0){
                        this.detail[index][i]=this.input.data_detail[i].val;
                    }
                }
                this.detail_input_clear();
                this.dialog.value_set=false;
            },(res)=>{alert(res.headers.msg)},()=>{})

        },

        delValue:function(obj,index){
            var dataid = obj[0];
            console.log(dataid);
            var cmd = this.name+';'+this.field[0]+'='+this.detail[index][0];
            confirm('Delete Confirm') && (
                this.$post('/api/sql',cmd,'','delete',()=>{
                    this.detail.splice(index,1);
                },()=>{},()=>{})
            )
        },

        refresh:function(){
            this.getDir(); this.getList();
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

        setWeek:function(){
            var code = 0;
            for(var i = 15; i >= 0; i--){
                if(this.input.week_code[i].t){
                    code += (1<<i);
                }
            }
            this.input.course_detail.week = code;
            this.dialog.week_set  = false;
        },

        addCourse:function(){
            // course_detail:{id:0,name:'',week:0,intro:''}, 
            var detail = this.input.course_detail.id + ","
                        + this.input.course_detail.name + ","
                        +this.input.course_detail.week;
            console.log(detail);
            this.$post('/api/course',detail + ";"+this.input.course_detail.intro,'',"new",()=>{
                this.dialog.course_add=false;
            },(res)=>{alert(res.headers.msg)},()=>{});
        },

        addUser:function(){
            var detail = this.input.user_detail.id + ",";
            var auth = this.input.user_detail.auth;
            if(auth == "学生")  detail += "0,"
            else if(auth == "学生管理员") detail += "1,";
            else if(auth == "教师"){
                detail += "2,";
                this.input.classid = "0"; this.input.major = "0";
            }
            detail += this.input.user_detail.name+",";
            detail += (this.input.user_detail.gender == "女"?"0,":"1,");
            detail += this.input.user_detail.school + ","
                    + this.input.user_detail.major + ","
                    + this.input.user_detail.classid;
            console.log(detail);
            this.$post('/api/user',detail,'',"new",()=>{
                this.dialog.user_add=false;
            },(res)=>{alert(res.headers.msg)},()=>{});

        },

        

        Signout:function(){
            Vue.prototype.$signout();
            this.$router.push('/auth');
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
    background-repeat:no-repeat; 
    background-size: cover;
    background-attachment: fixed;
    /* background-color: aliceblue; */
}

.main{
    background-color: rgba(255,255,255,0.8);
}

</style>