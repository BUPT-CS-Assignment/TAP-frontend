<template>
<v-container>
    <v-simple-table class="ma-2" dense height="230px">
        <tbody>
            <tr v-for="(item,index) in list.data" :key="index">
                <td style="border:0px">
                    <v-card class="d-flex justify-center align-center"
                        min-height="30" elevation="0" style="background:none;">
                        <span class="teal--text text--lighten-2 font-weight-black mr-4">{{index+1}}</span>
                        <v-btn class="grey--text font-weight-bold text--darken-1 mr-2 rounded-lg pl-1"
                            text  @click="checkExam(item.id)"
                        >{{item.id}}
                        </v-btn>
                        <span class="grey--text font-weight-bold ml-auto">{{item.name}}</span>
                        <v-btn small text color="teal lighten-2" @click="course_choose=item.id;exam_add=true;">
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
        @click="dialog= true;"
    ><p class="text-overline grey--text mt-9">course number</p>
    {{list.data.length}}
    </v-btn>

    <v-card style="position:absolute;left:0;top:0;bottom:0"
        color="red lighten-1" width="5" elevation="0" class="rounded-0"
    ></v-card>

    <v-card style="position:absolute;right:0;top:0;bottom:0"
        color="red lighten-1" width="5" elevation="0" class="rounded-0"
    ></v-card>

    <!-- Add Course -->
    <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card class="px-2 pt-6 pb-2 rounded-lg">
            <v-card-title class="text-h5 ml-1">New Course</v-card-title>
            <v-container fluid class="px-6">
                <v-row class="mx-auto">
                    <v-col>
                        <v-text-field outlined dense label="ID" v-model="input.id">
                        </v-text-field>
                    </v-col>
                    <v-col >
                        <v-text-field outlined dense label="Name" v-model="input.name">
                        </v-text-field>
                    </v-col>
                    <v-col >
                        <v-btn outlined color="primary" rounded class="font-weight-bold mx-auto"
                            @click="week_set= true"
                        >Week 
                            <span class="text-h6 font-weight-bold black--text ml-2"
                            >{{input.week}}</span>
                        </v-btn>
                    </v-col>
                </v-row>
                <v-row class="mx-1">
                    <v-textarea filled clearable dense label="Brief Introduction" auto-grow row="2"
                        v-model="input.intro"
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
                    @click="addCourse();"
                >Add
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <!-- Week Code -->
    <v-dialog v-model="week_set" persistent max-width="600px">
        <v-card class="px-2 pt-6 pb-2 rounded-lg">
            <v-card-title class="text-h5">Week Select</v-card-title>
            <v-container fluid class="px-6">
                <v-row dense no-gutters>
                    <v-col v-for="(item,index) in week" :key="index" cols="2"
                    ><v-checkbox v-model="item.t"
                        :label="index+1+''" color="info"
                    ></v-checkbox>
                    </v-col>
                </v-row>
            </v-container>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text
                    @click="week_set=false"
                >Cancel
                </v-btn>
                <v-btn color="blue darken-1 font-weight-bold" text
                    @click="input.week=65535;week_set=false;"
                >All
                </v-btn>
                <v-btn color="blue darken-1 font-weight-bold" text
                    @click="setWeek();"
                >Select
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

<!-- Add Exam -->
    <v-dialog v-model="exam_add" persistent max-width="600px">
        <v-card class="px-2 pt-6 pb-2 rounded-lg">
            <v-card-title class="text-h5 ml-1">New Exam For {{course_choose}}</v-card-title>
            <v-container fluid class="px-6">
                <v-row class="mx-auto">
                    <v-col cols="3">
                        <v-text-field outlined dense label="School" v-model="exam.school">
                        </v-text-field>
                    </v-col>
                    <v-col cols="3">
                        <v-text-field outlined dense label="ID" v-model="exam.id">
                        </v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field outlined dense label="Name" v-model="exam.name">
                        </v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field outlined dense label="Start" v-model="exam.start">
                        </v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field outlined dense label="End" v-model="exam.end">
                        </v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field outlined dense label="Location" v-model="exam.location">
                        </v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field outlined dense label="Room" v-model="exam.room">
                        </v-text-field>
                    </v-col>
                </v-row>
            </v-container>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text
                    @click="exam_add=false"
                >Cancel
                </v-btn>
                <v-btn color="blue darken-1 font-weight-bold" text
                    @click="addExam();"
                >Add
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <!-- Check Exam -->
    <v-dialog v-model="exam_check" persistent min-width="600px">
        <v-card class="px-2 pt-6 pb-2 rounded-lg">
            <v-card-title class="text-h5">ExamTable For {{course_choose}}</v-card-title>
            <v-container fluid class="px-6">
                <v-simple-table class="mr-6"  fixed-header>
                    <thead>
                        <tr>
                            <th class="text-center">ID</th>
                            <th class="text-center">Name</th>
                            <th class="text-center">Start</th>
                            <th class="text-center">End</th>
                            <th class="text-center">Location</th>
                            <th class="text-center">Room</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item,index) in exams.data" :key="index" class="text-center">
                            <td>{{item.id}}</td>
                            <td>{{item.name}}</td>
                            <td>{{item.start}}</td>
                            <td>{{item.end}}</td>
                            <td>{{item.location}}</td>
                            <td>{{item.room}}</td>
                        </tr>
                    </tbody>
                </v-simple-table>
            </v-container>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1 font-weight-bold" text
                    @click="exam_check=false;"
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
    name: 'CourseView',
    data: () => ({
        time:Vue.prototype.$SYSTIME,
        user:Vue.prototype.$USER,
        list:Vue.prototype.$COURSELIST,
        dialog:false,
        week_set:false,
        exam_add:false,
        exam_check:false,
        exams:{data:[{id:'',name:'',start:'',end:'',loc:'',room:''}]},
        course_choose:0,
        input:{id:0,name:'',week:0,intro:''}, 
        exam:{school:'',id:'',name:'',start:'',end:'',location:'',room:''},
        week:[{t:false},{t:false},{t:false},{t:false},
                    {t:false},{t:false},{t:false},{t:false},
                    {t:false},{t:false},{t:false},{t:false},
                    {t:false},{t:false},{t:false},{t:false}],
    }),
    created() {
        this.getList();
    },
    methods: {
        getList(){
            this.$get('/api/course','','list',(res)=>{
                Vue.prototype.$COURSELIST.data=res.data.data;
            },()=>{},(res)=>{alert(res.status)})
        },
        setWeek(){
            var code = 0;
            for(var i = 15; i >= 0; i--){
                if(this.week[i].t){
                    code += (1<<i);
                }
            }
            this.input.week = code;
            this.week_set  = false;
        },
        addCourse(){
            // course_detail:{id:0,name:'',week:0,intro:''}, 
            var detail = this.input.id + ","
                        + this.input.name + ","
                        +this.input.week;
            console.log(detail);
            this.$post('/api/course',detail + ";"+this.input.intro,'',"new",()=>{
                this.getList();
                this.dialog=false;
            },(res)=>{alert(res.headers.msg)},()=>{});
        },
        addExam(){
            if(this.exam.school.length != 3 || this.exam.id.length != 4){
                alert('Invalid Exam ID');
                return;
            }
            //id int,name text,start int,end int,loc int,room int
            var detail = this.exam.school + '' + this.exam.id + "," + this.exam.name+ ","+this.exam.start+","
                        +this.exam.end + "," +this.exam.location+","+this.exam.room;
            this.$post('/api/course',detail,{'courseid':this.course_choose},"addexam",()=>{
                this.exam_add = false;
            },(res)=>{console.log(res.headers.msg)},()=>{});
        },
        checkExam(id){
            this.course_choose = id;
            this.exams.data=[];
            this.exam_check = true;
            this.$get('/api/course',{'courseid':id},"getexam",(res)=>{
                this.exams.data = res.data.exam;
            },()=>{},()=>{});
        }
    },
}
</script>