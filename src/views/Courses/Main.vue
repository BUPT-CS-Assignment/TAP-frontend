<template>
<v-container class="pa-4">
<!-- No Choose -->
<v-card v-if="id==0" style="background:none;" elevation="0" class="mt-2">
    <template v-for="(item,index) in table.courses">
    <v-row v-if="index!=0" :key="index">
        <v-col cols="12">
            <v-card elevation="4" rounded="lg" class="mx-4" @click="step(index)">
                <v-card-title>
                    <v-icon color="red lighten-1" class="mr-3">mdi-bank</v-icon>
                    <span class="blue-grey--text text-subtitle-1 font-weight-bold">{{item.name}}</span>
                </v-card-title>
                <v-row class="px-4">
                    <v-col cols="4">
                        <span class="grey--text font-weight-bold">
                        {{item.week}}<span class="mr-3"></span>{{item.day}}</span>
                    </v-col>
                    <v-col cols="4">
                        <template v-if="user.auth == 2">
                            <span class="grey--text font-weight-bold">{{item.class}}</span>
                        </template>
                        <template v-if="user.auth != 2">
                            <span class="grey--text font-weight-bold">{{item.profname}}</span>
                        </template>
                    </v-col>
                    
                    <v-col cols="4">
                        <span class="grey--text font-weight-bold">
                        {{item.location}}<span class="mr-3"></span>{{item.room}}</span>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
    </template>
</v-card>

<!-- Choosed -->
<v-card v-if="id > 0" class="mx-4" elevation="0" style="background:none">
<v-row>
<v-col>
    <v-card class="px-2 pb-5 rounded-lg" elevation="6">
        <v-card-title class="font-weight-bold">
            {{course.name}}
        </v-card-title>
        <v-card-subtitle class="text-overline font-weight-bold"
            style="position:absolute;top:35px;right:20px;"
        >classid {{course.id}}
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
                <br>{{course.week}}<span class="mr-3"></span>{{course.day}}
            </v-col>
            <v-col cols="4">
                <span class="amber--text font-weight-bold">上课地点</span>
                <br>{{course.location}}<span class="mr-3"></span>{{course.room}}
            </v-col>
            <v-col>
                <span class="blue-grey--text font-weight-bold">课程群</span>
                <br>{{course.contact}}
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
            <v-card min-width="600" min-height="300" elevation="4"  class="mx-1 pa-6 my-2 rounded-lg">
                <v-card-title class="pt-0 pl-0 font-weight-bold">课程简介</v-card-title>
                <template v-if="course.intro == 'null'">
                    <span>暂无简介</span>
                </template>
                <template v-else>
                    <span>{{course.intro}}</span>
                </template>
            </v-card>
            </v-col>
            </v-row></v-tab-item>
        <!-- Resource -->
            <v-tab-item :key="1"><v-row justify="center" class="mt-2">
            <v-col>
                <v-card min-height="300" elevation="4" class="mx-1 px-4 my-2 rounded-lg">
                    <v-card-title v-if="user.auth==2" class="pt-3 pl-0 ml-0">
                        <v-btn class="ml-2 my-0" color="info" outlined rounded
                            @click="upload_type=1;input.filename='';upload_file = true"
                    ><span class="font-weight-bold">上传资料</span>
                    </v-btn>
                    </v-card-title>
                
                    <v-row class="pa-1">
                        <v-col v-if="course.files.length ==0">
                            <v-card min-height="50" class="px-2 py-2 rounded-lg" elevation="0">
                                <v-card-title class="mt-0 ml-0 pa-0">
                                    <v-icon color="red lighten-1" class="mr-3">mdi-coffee-outline</v-icon>
                                    <span class="grey--text text-subtitle-1 font-weight-bold mr-4">暂无资料</span>
                                    <v-spacer></v-spacer>
                                </v-card-title>
                            </v-card>
                        </v-col>
                        <template v-if="course.files.length > 0">
                        <v-col v-for="(item,index) in course.files" :key="index" cols="12">
                            <v-card min-height="50" class="px-2 py-2 rounded-lg" elevation="0">
                                <v-card-title class="mt-0 ml-0 pa-0">
                                    <v-icon color="red lighten-1" class="mr-3">mdi-file-document</v-icon>
                                    <span class="text-subtitle-1 font-weight-bold mr-4">{{item.name}}</span>
                                    <v-spacer></v-spacer>
                                    <v-btn style="position:absolute;right:2%;top:20%;"
                                        @click="download(index)" text  rounded 
                                    ><v-icon medium color="grey">mdi-cloud-download</v-icon>
                                    </v-btn>
                                </v-card-title>
                            </v-card>
                        </v-col>
                        </template>
                    </v-row>
                </v-card>
            </v-col>
            </v-row></v-tab-item>
        <!-- Homework -->
            <v-tab-item :key="2"><v-row justify="center" class="mt-2">
                <v-col >
                    <v-card min-height="300" elevation="4" class="mx-1 px-4 my-2 rounded-lg">
                        <v-card-title v-if="user.auth==2" class="pt-3 pl-0 ml-0">
                            <v-btn class="ml-2 my-0" color="info" outlined rounded
                                @click="homework_add = true"
                            ><span class="font-weight-bold">新作业</span>
                            </v-btn>
                        </v-card-title>
                    
                        <v-row class="pa-1">
                            <v-col v-if="course.homework.length ==0">
                                <v-card min-height="50" class="px-2 py-2 rounded-lg" elevation="0">
                                    <v-card-title class="mt-0 ml-0 pa-0">
                                        <v-icon color="red lighten-1" class="mr-3">mdi-coffee-outline</v-icon>
                                        <span class="grey--text text-subtitle-1 font-weight-bold mr-4">暂无作业</span>
                                        <v-spacer></v-spacer>
                                    </v-card-title>
                                </v-card>
                            </v-col>
                            <template v-if="course.homework.length > 0">
                            <v-col v-for="(item,index) in course.homework" :key="index" cols="12">
                                <v-card min-height="50" class="px-2 py-2 rounded-lg" elevation="0">
                                    <v-card-title class="mt-0 ml-0 pa-0">
                                        <template v-if="item.end == '0'">
                                            <v-icon color="blue lighten-1" class="mr-3">mdi-clipboard-text</v-icon>
                                        </template>
                                        <template v-else>
                                            <v-icon color="red lighten-1" class="mr-3">mdi-clipboard-text-clock</v-icon>
                                        </template>
                                        <span class="text-subtitle-1 font-weight-bold mr-4">{{item.name}}</span>
                                    </v-card-title>
                                    <span class="text-subtitle-2 grey--text mr-10">开始时间 {{item.start}}</span>
                                    <span class="text-subtitle-2 grey--text ">截止时间 {{item.end}}</span>
                                    <v-btn v-if="user.auth != 2" style="position:absolute;right:2%;top:20%;"
                                        @click="upload_type=0;input.filename='';upload_file = true;homework_choose = item.id;" text  rounded 
                                    ><v-icon medium color="grey">mdi-cloud-upload</v-icon>
                                    </v-btn>
                                </v-card>
                            </v-col>
                            </template>
                        </v-row>
                    </v-card>
                </v-col>
            
            </v-row></v-tab-item>
        <!-- Exam -->
            <v-tab-item :key="3"><v-row justify="center" class="mt-2">
                <v-col >
                    <v-card min-height="300" elevation="4" class="mx-1 px-4 my-2 rounded-lg">
                        <v-row class="pa-1">
                            <v-col v-if="course.exam.length ==0">
                                <v-card min-height="50" class="px-2 py-2 rounded-lg" elevation="0">
                                    <v-card-title class="mt-0 ml-0 pa-0">
                                        <v-icon color="red lighten-1" class="mr-3">mdi-coffee-outline</v-icon>
                                        <span class="grey--text text-subtitle-1 font-weight-bold mr-4">暂无测试</span>
                                        <v-spacer></v-spacer>
                                    </v-card-title>
                                </v-card>
                            </v-col>
                            <template v-if="course.exam.length > 0">
                            <v-col v-for="(item,index) in course.exam" :key="index" cols="12">
                                <v-card min-height="50" class="px-2 py-2 rounded-lg" elevation="0">
                                    <v-card-title class="mt-0 ml-0 pa-0">
                                        <v-icon color="red lighten-1" class="mr-3">mdi-book-clock</v-icon>
                                        <span class="text-subtitle-1 font-weight-bold mr-4">{{item.name}}</span>
                                        <v-spacer></v-spacer>
                                        <span class="text-subtitle-1 font-weight-bold grey--text mr-4">
                                            {{item.status}}
                                        </span>
                                    </v-card-title>
                                    <span class="text-subtitle-2 grey--text mr-10">开始时间 {{item.start}}</span>
                                    <span class="text-subtitle-2 grey--text ">结束时间 {{item.end}}</span>
                                    
                                </v-card>
                            </v-col>
                            </template>
                        </v-row>
                    </v-card>
                </v-col>
            
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
    <v-dialog v-model="upload_file" persistent max-width="600px">
        <v-card class="px-2 pt-4 pb-2 rounded-lg">
            <v-card-title class="text-h6 ml-1 font-weight-bold">
                <template v-if="upload_type">上传资料</template>
                <template v-else>提交作业</template>                
            </v-card-title>
            <v-container fluid class="px-6">
                <v-row class="mx-auto">
                    <v-col class="mt-3">
                        <v-text-field outlined dense label="文件名" v-model="input.filename">
                        </v-text-field>
                    </v-col>
                    <v-col>
                        <v-file-input label="Upload File" v-model="file"
                            show-size small-chips counter
                            accept="image/*,.pdf,.doc,.docx,.ppt,.pptx,.txt"
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
        upload_type:0, //0 for homework, 1 for resource
        homework_choose:0,
        input:{ name:'',end:'',filename:''},
        file:'',
    }),
    created() {
        this.getIntro();
        this.getHomeWork();
        this.getResource();
        this.getExam();
    },
    methods: {
        step(id){
            Vue.prototype.$COURSECHOOSE = id;
        },
        getIntro(){
            if(this.id != 0){
                this.$get('/api/course',{'courseid':this.table.courses[this.id].id},"intro",
                    (res)=>{
                        this.table.courses[this.id].intro = res.data;
                    },()=>{},()=>{}
                )
            }
        },
        getExam(){
            this.$get('/api/course',{
                    'courseid':this.course.id,
                    'classid':(this.user.auth == 2?this.course.class:'0'),
                    'schoolid':this.user.schoolid
                },"getexam",(res)=>{
                    this.course.exam=[];
                    var data = res.data.exam;
                    for(var i = 0;i< data.length;i++){
                        var sta;
                        var now = this.$timeString();
                        if(data[i].end <= now) sta = '已结束';
                        else if(data[i].start > now) sta = '未开始';
                        else sta = '进行中'
                        var tempexam={
                            id:data[i].id,
                            name:data[i].name,
                            start:this.$timeFormat(data[i].start),
                            end:this.$timeFormat(data[i].end),
                            location:data[i].location,
                            room:data[i].room,
                            status:sta
                        };
                        this.course.exam.push(tempexam);                    
                    }
            },()=>{},()=>{});
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
        getResource(){
            this.$get('/api/course',{
                    'courseid':this.course.id,
                    'prof':this.course.profid
                },"files",(res)=>{
                    this.course.files=[];
                    var data = res.data.files;
                    for(var i = 0;i< data.length;i++){
                        var item={
                            name:data[i],
                        };
                        this.course.files.push(item);                    
                    }
            },()=>{},()=>{});
        },
        Upload(){
            if(this.user.auth == 2) this.upload_type = "1";
            else this.upload_type = "0";
            var filepath = this.course.id + "/"+this.course.profid + "/";
            var param = new FormData();
            if(this.upload_type == 0){
                filepath += this.course.class + "/" + this.homework_choose + "/";
            }
            param.append('file',this.file);


            // this.$http({
            //     method:'POST',
            //     url:'/api/file',
            //     headers:{
            //         'token':localStorage.getItem('token'),
            //         'userid':localStorage.getItem('userid')
            //     },
            //     body:param,
            // }).then((res)=>{
            //     console.log(res);
            //     if(res.headers.msg == "NO_ERROR"){
            //         this.getResource();
            //         this.upload_file=false;
            //     }else{
            //         console.log(res);
            //         alert('上传失败')
            //     }
            // }).catch((res)=>{console.log(res)})
            
            fetch('/api/file',{ 
                method:'POST',
                headers:{
                    'token':localStorage.getItem('token'),
                    'userid':localStorage.getItem('userid'),
                    'upload_type':this.upload_type,
                    'upload_path':filepath,
                    'upload_name':this.input.filename,
                },
                body:param,
            }).then(res=>{
                var msg = res.headers.get('msg');
                if(msg == "NO_ERROR"){
                    this.getResource();
                    this.upload_file=false;
                }else{
                    alert('上传失败.'+msg);
                }
                return res.json
                
            }).then(res=>{
                console.log(res);
            })
        },
        download(index){
            var filepath = "course/" + this.course.id + "/" + this.course.profid +"/res/"
            filepath += this.course.files[index].name;
            console.log(filepath);
            this.$http({
                method:'GET',
                url:'/api/'+filepath,
                responseType: 'blob'
            }).then((res)=>{
                console.log(res);
                let blob = new Blob([res.data],{type:res.headers['content-type']});
                let dom = document.createElement('a')
                let url = window.URL.createObjectURL(blob)
                dom.href = url
                dom.download = decodeURI(res.headers['filename']);
                dom.style.display = 'none'
                document.body.appendChild(dom)
                dom.click()
                dom.parentNode.removeChild(dom)
                window.URL.revokeObjectURL(url)
            })
            // window.open('http://101.43.201.20:10910/'+filepath);
            // this.$get(,'','',()=>{},(res)=>{
            //     

            // },()=>{});
        },
    },

}
</script>
