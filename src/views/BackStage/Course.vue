<template>
<v-container>
    <v-simple-table class="ma-2" dense height="230px">
        <tbody>
            <tr v-for="(item,index) in list" :key="index">
                <td style="border:0px">
                    <v-card class="d-flex justify-center align-center" 
                        min-height="30" elevation="0" style="background:none;">
                        <span class="teal--text text--lighten-2 font-weight-black mr-4">{{index+1}}</span>
                        <span class="grey--text font-weight-bold text--darken-1 mr-2">{{item.id}}</span>
                        <span class="grey--text font-weight-bold ml-auto">{{item.name}}</span>
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
    {{list.length}}
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
                            @click="dialog= true"
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
        list:['COURSE'],
        dialog:false,
        input:{id:0,name:'',week:0,intro:''}, 
        week:[{t:false},{t:false},{t:false},{t:false},
                    {t:false},{t:false},{t:false},{t:false},
                    {t:false},{t:false},{t:false},{t:false},
                    {t:false},{t:false},{t:false},{t:false}],
    }),
    created() {
        this.getList();
    },
    methods: {
        getList:function(){
            this.$get('/api/course','','list',(res)=>{
                this.list=[];
                var list = res.data.list.split(";");
                console.log(list);
                for(var i=0; i < list.length;i++){
                    var info = list[i].split(',');
                    var course={id:info[0],name:info[1]};
                    this.list.push(course);
                }
            },()=>{},(res)=>{alert(res.status)})
        },
        addCourse:function(){
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
    },
}
</script>