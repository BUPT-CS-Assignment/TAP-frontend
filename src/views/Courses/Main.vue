<template>
<v-container class="pa-4">
<!-- No Choose -->
<v-card v-if="id==0">
    <template v-for="(item,index) in table.courses">
        <v-row v-if="index!=0" :key="index">
            <span>{{item.name}}</span>
        </v-row>
    </template>
</v-card>

<!-- Choosed -->
<v-card v-if="id > 0" class="mx-4" elevation="0" style="background:none">
<v-row>
<v-col>
    <v-card class=" rounded-lg" elevation="6">
        <v-card-title class="font-weight-bold">
            {{course.name}}
        </v-card-title>
        <v-card-subtitle class="text-overline font-weight-bold"
            style="position:absolute;top:35px;right:20px;"
        >
         classid {{course.id}}
        </v-card-subtitle>
        <v-row class="px-4">
            <v-col cols="4">
                <template v-if="user.auth == 2">
                    <span class="blue--text font-weight-bold">上课班级</span>
                    <br>{{course.class}}
                </template>
                <template v-if="user.auth != 2">
                    <span class="blue--text font-weight-bold">任课教师</span>
                    <br>{{course.profname}}
                </template>
            </v-col>
            <v-col cols="4">
                <span class="green--text font-weight-bold">上课时间</span>
                <br>{{course.week}} {{course.day}}
            </v-col>
            <v-col cols="4">
                <span class="amber--text font-weight-bold">上课地点</span>
                <br>{{course.location}}--{{course.room}}
            </v-col>
            <v-col>
                <span class="blue-grey--text font-weight-bold">课程群</span>
                1000083
            </v-col>
        </v-row>
    </v-card>
</v-col>
</v-row>

<v-card style="background:none;" class="mt-8" elevation="0">
     <v-tabs class="pl-4" v-model="tab" color="info" background-color="#FAFAFA">
            <v-tab :key="0" class="text-button font-weight-bold">课程简介</v-tab>
            <v-tab :key="1" class="text-button font-weight-bold">课程资料</v-tab>
            <v-tab :key="3" class="text-button font-weight-bold">作业</v-tab>
            <v-tab :key="4" class="text-button font-weight-bold">测试</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab" class="pb-8" style="background:none;">
        <!-- Introduction -->
            <v-tab-item :key="0"><v-row justify="center" class="mt-2">
            <v-col>
            <v-card min-width="600" min-height="300" elevation="4" 
                class="mx-1 pa-6 my-2 rounded-lg"
            >
                <span>{{course.intro}}</span>
            </v-card>
            </v-col>
            </v-row></v-tab-item>
        <!-- Resource -->
            <v-tab-item :key="1"><v-row justify="center" class="mt-2">
            <v-card min-width="600" min-height="300" class="mx-4 my-2 rounded-0">
                
            </v-card>
            </v-row></v-tab-item>
        <!-- Homework -->
            <v-tab-item :key="2"><v-row justify="center" class="mt-2">
                <v-col >
                    <v-card min-width="600" min-height="300" elevation="4"
                        class="mx-1 px-4 my-2 rounded-lg"
                    >
                        <v-card-title v-if="user.auth==2" class="pt-3 pl-0 ml-0">
                            <v-btn class="ml-2 my-0" color="info" outlined rounded
                                @click="homework_add = true"
                        ><span class="font-weight-bold">新作业</span>
                        </v-btn>
                        </v-card-title>
                    
                        <v-row class="pa-1">
                            <v-col v-for="(item,index) in course.homework" :key="index" cols="12">
                                <v-card min-height="50" class="px-2 py-2 rounded-lg" elevation="0">
                                    <v-card-title class="mt-0 ml-0 pa-0">
                                        <v-icon color="red lighten-2" class="mr-3">mdi-clipboard-text</v-icon>
                                        <span class="text-subtitle-1 font-weight-bold mr-4">{{item.name}}</span>
                                    </v-card-title>
                                    <span class="text-subtitle-2 grey--text mr-10">开始时间 {{item.start}}</span>
                                    <span class="text-subtitle-2 grey--text ">截止时间 {{item.end}}</span>
                                    <v-btn v-if="user.auth != 2" style="position:absolute;right:2%;top:20%;"
                                        @click="upload_file = true;homework_choose = item.id;" text  rounded 
                                    ><v-icon medium color="grey">mdi-upload-multiple</v-icon>
                                    </v-btn>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            
            </v-row></v-tab-item>
        <!-- Exam -->
            <v-tab-item :key="3"><v-row justify="start" class="mt-2">
            <v-card width="340" height="300" class="mx-4 my-2 rounded-0">

            </v-card>
            </v-row></v-tab-item>
        </v-tabs-items>
</v-card>
</v-card>

<!-- Add Homework -->
    <v-dialog v-model="homework_add" persistent max-width="600px">
        <v-card class="px-2 pt-6 pb-2 rounded-lg">
            <v-card-title class="text-h5 ml-1">新作业</v-card-title>
            <v-container fluid class="px-6">
                <v-row class="mx-auto">
                    <v-col>
                        <v-text-field outlined dense label="描述" v-model="input.name">
                        </v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field outlined dense label="截止日期" v-model="input.end">
                        </v-text-field>
                    </v-col>
                </v-row>
            </v-container>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text
                    @click="homework_add=false"
                >Cancel
                </v-btn>
                <v-btn color="blue darken-1 font-weight-bold" text
                    @click="addHomework();"
                >Add
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

<!-- Upload -->
    <v-dialog v-model="upload_file" persistent max-width="500px">
        <v-card class="px-2 pt-4 pb-2 rounded-lg">
            <v-card-title class="text-h6 ml-1 font-weight-bold">提交作业</v-card-title>
            <v-container fluid class="px-6">
                <v-row class="mx-auto">
                    <v-col>
                        <v-file-input label="Upload Homework" v-model="file"
                            show-size small-chips counter
                            accept="image/*,.pdf,.doc,.docx,.ppt,.pptx"
                        ></v-file-input>
                    </v-col>
                </v-row>
            </v-container>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text
                    @click="upload_file=false;file=[]"
                >Cancel
                </v-btn>
                <v-btn color="blue darken-1 font-weight-bold" text
                    @click="Upload();"
                >Upload
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
    name: "CourseView",
    data: () => ({
        table: Vue.prototype.$TABLE,
        user:Vue.prototype.$USER,
        id:Vue.prototype.$COURSECHOOSE,
        time:Vue.prototype.$SYSTIME,
        course:Vue.prototype.$TABLE.courses[Vue.prototype.$COURSECHOOSE],
        tab:null,
        homework_add:false,
        upload_file:false,
        homework_choose:0,
        input:{ name:'',end:''},
        file:[],
    }),
    created() {
        this.getIntro();
        this.getHomeWork();
    },
    methods: {
        getIntro(){
            if(this.id != 0){
                this.$get('/api/course',{'courseid':this.table.courses[this.id].id},"intro",
                    (res)=>{
                        this.table.courses[this.id].intro = res.data;
                    },()=>{},()=>{}
                )
            }
        },
        addHomework(){
            var detail=this.time.year+"";    if(this.time.month < 10) detail += "0";
            detail += this.time.month+""; if(this.time.day < 10) detail += "0";
            detail += this.time.day+"";  if(this.time.hour < 10) detail += "0";
            detail += this.time.hour + "";   if(this.time.min < 10) detail += "0";
            detail += this.time.min + ",";
            detail += this.input.end+","+this.input.name;
            this.$post('/api/course',detail,{
                'courseid':this.course.id,
                'classid':this.course.class
                },"addwork",()=>{
                    this.homework_add = false;
                    this.getHomeWork();
                },
                (res)=>{alert(res.headers.msg)},()=>{}
            );
            
        },
        getHomeWork(){
            this.$get('/api/course',{
                    'courseid':this.course.id,
                    'classid':this.course.class,
                    'prof':this.course.profid
                },"getwork",(res)=>{
                    this.course.homework=[];
                    var data = res.data.homework;
                    for(var i = 0;i< data.length;i++){
                        var tempwork={
                            id:data[i].start,
                            name:data[i].name,
                            start:this.$timeFormat(data[i].start),
                            end:this.$timeFormat(data[i].end)
                        };
                        this.course.homework.push(tempwork);                    
                    }
            },()=>{},()=>{});
        },
        Upload(){
            var filepath = this.course.id + "/"+this.course.profid + "/"+ this.course.class 
                            + "/" + this.homework_choose + "/";
            var param = new FormData();
            param.append('file',this.file);
            param.append('filepath',filepath)
            this.$post('/api/homework',param,'','',()=>{
                alert("上传成功");
                this.upload_file = false;
            },(res)=>{alert(res)},()=>{});
        },
    },

}
</script>
