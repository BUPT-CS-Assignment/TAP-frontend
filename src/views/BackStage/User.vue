<template>
<v-container>
    <v-simple-table class="mx-2" dense height="220px">
        <tbody>
            <tr v-for="(item,index) in list" :key="index">
                <td style="border:0px;">{{item}}</td>
            </tr>
        </tbody>
    </v-simple-table>
    <v-btn align-self-end class="text-h3 font-weight-bold rounded-lg px-2 py-1"
        color="teal lighten-2" elevation="0" text 
        style="position:absolute;bottom:16px;right:20px;"
        @click="dialog= true;"
    ><p class="text-overline grey--text mt-9">user number</p>
    {{list.length}}
    </v-btn>

    <v-card style="position:absolute;left:0;top:0;bottom:0"
        color="red lighten-1" width="5" elevation="0" class="rounded-0"
    ></v-card>

    <v-card style="position:absolute;right:0;top:0;bottom:0"
        color="red lighten-1" width="5" elevation="0" class="rounded-0"
    ></v-card>

    <!-- Add User -->
    <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card class="px-2 pt-6 pb-2 rounded-lg">
            <v-card-title class="text-h5 ml-1">New User</v-card-title>
            <v-container fluid class="px-6">
                <v-row class="mx-auto" >
                    <v-col cols="6">
                        <v-text-field outlined dense label="ID" v-model="input.id">
                        </v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field outlined dense label="Name" v-model="input.name">
                        </v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-combobox v-model="input.auth"
                            :items="user_auth_items" outlined dense label="Auth"
                        ></v-combobox>
                    </v-col>
                    <v-col cols="6">
                        <v-combobox v-model="input.gender"
                            :items="user_gender_items" outlined dense label="Gender"
                        ></v-combobox>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field outlined dense label="School" v-model="input.school">
                        </v-text-field>
                    </v-col>
                    <v-col v-if="input.auth != '教师'" cols="6">
                        <v-text-field outlined dense label="Major" v-model="input.major">
                        </v-text-field>
                    </v-col>
                    <v-col v-if="input.auth != '教师'" cols="6">
                        <v-text-field outlined dense label="Class" v-model="input.classid">
                        </v-text-field>
                    </v-col>
                </v-row>
            </v-container>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialog=false">Cancel</v-btn>
                <v-btn color="blue darken-1 font-weight-bold" text @click="addUser();">Add</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

</v-container>
</template>

<script>
// @ is an alias to /src
import Vue from 'vue'
export default {
    name: 'UserView',
    data: () => ({
        time:Vue.prototype.$SYSTIME,
        user:Vue.prototype.$USER,
        list:['USER','1','2','3','4','5','6','7','8','9','10','11','12','13'],
        input:{id:0,name:'',auth:'学生',gender:'女',school:0,major:0,classid:0},
        dialog:false,
        user_auth_items:['学生','学生管理员','教师'],
        user_gender_items:['女','男'],
        
    }),
    created() {

    },
    methods: {
       addUser:function(){
            var detail = this.input.id + ",";
            var auth = this.input.auth;
            if(auth == "学生")  detail += "0,"
            else if(auth == "学生管理员") detail += "1,";
            else if(auth == "教师"){
                detail += "2,";
                this.input.classid = "0"; this.input.major = "0";
            }
            detail += this.input.name+",";
            detail += (this.input.gender == "女"?"0,":"1,");
            detail += this.input.school + ","
                    + this.input.major + ","
                    + this.input.classid;
            console.log(detail);
            this.$post('/api/user',detail,'',"new",()=>{
                this.dialog.user_add=false;
            },(res)=>{alert(res.headers.msg)},()=>{});

        },
    },
}
</script>