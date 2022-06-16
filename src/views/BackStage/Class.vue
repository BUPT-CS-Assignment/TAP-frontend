<template>
<v-container>
    <v-simple-table class="ma-2" dense height="230px">
        <tbody>
            <tr v-for="(item,index) in list" :key="index">
                <td style="border:0px">
                    <v-card class="d-flex justify-center align-center" 
                        min-height="30" elevation="0" style="background:none;">
                        <span class="teal--text text--lighten-2 font-weight-black mr-4">{{index+1}}</span>
                        <v-btn class="grey--text font-weight-bold text--darken-1 mr-2 rounded-lg pl-1"
                            text  @click="checkCourse(item.id)"
                        >{{item.id}}
                        </v-btn>
                        <span class="grey--text font-weight-bold ml-auto">{{item.school}}</span>
                        <v-btn small text color="teal lighten-2" @click="class_select=item.id;dialog=true">
                            <v-icon>mdi-clipboard-edit-outline</v-icon>
                        </v-btn>
                    </v-card>
                </td>
            </tr>
        </tbody>
    </v-simple-table>
    <v-btn align-self-end class="text-h3 font-weight-bold rounded-lg px-2 py-1"
        color="teal lighten-2" elevation="0" text 
        style="position:absolute;bottom:16px;right:20px;"
        @click="class_add= true;"
    ><p class="text-overline grey--text mt-9">class number</p>
    {{list.length}}
    </v-btn>

    <v-card style="position:absolute;left:0;top:0;bottom:0"
        color="red lighten-1" width="5" elevation="0" class="rounded-0"
    ></v-card>

    <v-card style="position:absolute;right:0;top:0;bottom:0"
        color="red lighten-1" width="5" elevation="0" class="rounded-0"
    ></v-card>

    <!-- New Course -->
    <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card class="px-2 pt-6 pb-2 rounded-lg">
            <v-card-title class="text-h5 ml-1">New Course For {{class_select}}</v-card-title>
            <v-container fluid class="px-6">
                <v-row class="mx-auto">
                    <v-col cols="8">
                        <v-select v-model="input.id"
                        :items="courses.data"
                        item-value="id"
                        item-text="name"
                        outlined dense label="Course"
                        ></v-select>
                    </v-col>
                    <v-col cols="4">
                        <v-text-field outlined dense label="Professor ID" v-model="input.prof">
                        </v-text-field>
                    </v-col>
                    <v-col cols="4" v-for="(item,index) in day_items" :key="item">
                        <v-btn outlined color="primary" rounded class="mb-4 font-weight-bold mx-auto"
                            @click="day_select=index;day_set= true"
                        >{{item}} 
                            <span class="text-h6 font-weight-bold black--text ml-2"
                            >{{input.day[index]}}</span>
                        </v-btn>
                    </v-col>
                     <v-col cols="4">
                        <v-text-field outlined dense label="Location ID" v-model="input.location">
                        </v-text-field>
                    </v-col>
                     <v-col cols="4">
                        <v-text-field outlined dense label="Room" v-model="input.room">
                        </v-text-field>
                    </v-col>
                    <v-col cols="4">
                        <v-text-field outlined dense label="Contact" v-model="input.contact">
                        </v-text-field>
                    </v-col>
                </v-row>
                
            </v-container>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text
                    @click="dialog=false"
                >Cancel
                </v-btn>
                <v-btn color="blue darken-1 font-weight-bold" text
                    @click="newCourse();"
                >Add
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <!-- Time Code -->
    <v-dialog v-model="day_set" persistent max-width="600px">
        <v-card class="px-2 pt-6 pb-2 rounded-lg">
            <v-card-title class="text-h5">{{day_items[day_select]}} Code</v-card-title>
            <v-container fluid class="px-6">
                <v-row dense no-gutters>
                    <v-col v-for="(item,index) in DayTime" :key="index" cols="2"
                    ><v-checkbox v-model="item.t"
                        :label="index+1+''" color="info"
                    ></v-checkbox>
                    </v-col>
                </v-row>
            </v-container>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text
                    @click="day_set=false"
                >Cancel
                </v-btn>
                <v-btn color="blue darken-1 font-weight-bold" text
                    @click="setDay();"
                >Select
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <!-- Add Class -->
    <v-dialog v-model="class_add" persistent max-width="600px">
        <v-card class="px-2 pt-6 pb-2 rounded-lg">
            <v-card-title class="text-h5 ml-1">New Class</v-card-title>
            <v-container fluid class="px-6">
                <v-row class="mx-auto">
                    <v-col>
                        <v-text-field outlined dense label="ID" v-model="new_class.id">
                        </v-text-field>
                    </v-col>
                    <v-col >
                        <v-text-field outlined dense label="School" v-model="new_class.school">
                        </v-text-field>
                    </v-col>
                </v-row>
            </v-container>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text
                    @click="class_add=false"
                >Cancel
                </v-btn>
                <v-btn color="blue darken-1 font-weight-bold" text
                    @click="addClass();"
                >Add
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <!-- Check Course -->
    <v-dialog v-model="course_check" persistent max-width="600px">
        <v-card class="px-2 pt-6 pb-2 rounded-lg">
            <v-card-title class="text-h5">Timetable For {{class_select}}</v-card-title>
            <v-container fluid class="px-6">
                <v-simple-table class="mr-6"  fixed-header>
                    <thead>
                        <tr>
                            <th class="text-center">节次</th>
                            <th class="text-center">周一</th>
                            <th class="text-center">周二</th>
                            <th class="text-center">周三</th>
                            <th class="text-center">周四</th>
                            <th class="text-center">周五</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(value,index) in table.table" :key="index" class="text-center">
                            <td>第{{index+1}}节</td>
                            <td v-for="(val,index) in value" :key="index" class="text-center">
                                <span v-if="val>0">
                                    {{table.courses[val].name}}<br>
                                    {{table.courses[val].profname}}<br>
                                    {{table.courses[val].location}}<br>
                                    {{table.courses[val].week}}
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </v-simple-table>
            </v-container>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1 font-weight-bold" text
                    @click="course_check=false;"
                >Close
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
    name: 'ClassView',
    data: () => ({
        time:Vue.prototype.$SYSTIME,
        user:Vue.prototype.$USER,
        courses:Vue.prototype.$COURSELIST,
        list:[{id:1001,school:313}],
        table:Vue.prototype.$TABLE,
        new_class:{id:100,school:313},
        dialog:false,
        day_set:false,
        class_add:false,
        course_check:false,
        day_select:0,
        class_select:0,
        day_items:['Mon.','Tue.','Wed.','Thur.','Fir.'],
        input:{id:'',prof:0,day:[0,0,0,0,0],location:0,room:0,contact:0}, 
        DayTime:[{t:false},{t:false},{t:false},{t:false},{t:false},
              {t:false},{t:false},{t:false},{t:false},{t:false},
              {t:false},{t:false},{t:false},{t:false},],
                    
    }),
    created() {
        this.getList();
    },
    methods: {
        getList:function(){
            this.$get('/api/class','','list',(res)=>{
                this.list=res.data.data;
                console.log(this.courses);
            },()=>{},(res)=>{alert(res.status)})
        },
        setDay:function(){
            var code = 0;
            for(var i = 13; i >= 0; i--){
                if(this.DayTime[i].t){
                    code += (1<<i);
                }
            }
            this.input.day[this.day_select]=code;
            this.day_set = false;
        },
        checkCourse:function(classid){
            this.class_select = classid;
            this.$getTable('/api/class',classid);
            this.course_check = true;
        },
        newCourse:function(){
            // input:{classid:0,prof:0,day:[0,0,0,0,0],location:0,room:0}, 
            var detail = "";
            for(var i = 0 ;i < 5; i++){
                detail += this.input.day[i]+",";
            }
            detail += this.input.location + "," + this.input.room + "," + this.input.contact;
            console.log(detail);
            this.$post('/api/class',detail,
                {'classid':this.class_select,
                 'course':this.input.id,
                 'prof':this.input.prof,
                },
                "course",()=>{
                    this.dialog=false;
                },(res)=>{alert(res.headers.msg)},()=>{}
            );
        },
        addClass:function(){
            this.$post('/api/class','',{'classid':this.new_class.id,'school':this.new_class.school},
                "new",()=>{
                    this.getList();
                    this.class_add = false;
                },(res)=>{alert(res.headers.msg)},()=>{}
            );
        },
    },
}
</script>