<template>
<v-container class="pa-4">
    <div class="text-h4 font-weight-black ml-5 mt-6 mb-1">    
        个人中心    
    </div>
    <v-divider class="ml-5 mr-12"></v-divider>
<!-- Info Block -->
    <v-container class="mt-1 ml-2 mb-8 d-flex flex-row flex-wrap justify-start">
        <v-card
            class="mr-6"
            width="440px"
            height="300px"
            elevation="0"
            color="transparent"
        >
            <p class="text-body-1 font-weight-bold ml-1 my-1">账号信息</p>
            <v-card
                class="rounded-lg d-flex justify-center flex-column"
                width="440px"
                height="260px"  
            >
            <!-- Card One -->
                <v-avatar 
                    class="mx-auto"
                    color="grey lighten-2"
                    size="82"
                >
                    <v-avatar
                        color="white"
                        size="80"
                    >
                        <v-avatar   
                            color="blue lighten-1"    
                            size="70"
                        >
                            <span class="white--text text-h4 font-weight-bold text-uppercase">
                                {{ user.name[0] }}
                            </span>
                        </v-avatar>
                    </v-avatar>
                </v-avatar>
                <span class="mx-auto text-subtitle-1 font-weight-medium mt-3">
                    {{user.name}}
                    <span class="grey--text text-subtitle-2 ml-2">
                        {{authText[user.auth]}}
                    </span>
                </span>
                <span class="mx-auto text-subtitle-1 font-weight-bold">
                    {{user.id}}
                </span>
                <span class="mx-auto">
                    {{user.email}}
                </span>
            </v-card>
        </v-card>
        <v-card
            width="440px"   height="260px"
            elevation="0"   
            color="transparent"
        >
            <p class="text-body-1 font-weight-bold ml-1 my-1">院系信息</p>
            <v-card
                width="440px"   height="260px"  
                class="rounded-lg d-flex justify-center flex-column pt-4"
            >
            <!-- Card Two -->
                <v-card width="400px" elevation="0" 
                        class="mx-auto mt-16" 
                        style="background:none;"
                >
                    <v-expansion-panels class="mb-6" focusable>
                    <!-- School Info -->
                        <v-expansion-panel :key="1">
                            <v-expansion-panel-header  disable-icon-rotate>
                                <span class="font-weight-bold">
                                    {{user.school}}
                                </span>
                                <template v-slot:actions>
                                    <v-icon color="green">  mdi-bank    </v-icon>
                                </template>
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                                {{intro.school}}
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    <!-- Major Info -->
                        <v-expansion-panel :key="2">
                            <v-expansion-panel-header  disable-icon-rotate>
                                <span class="font-weight-bold">
                                    {{user.major}}
                                </span>
                                <template v-slot:actions>
                                    <v-icon color="orange">  mdi-pencil    </v-icon>
                                </template>
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                                {{intro.major}}
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    <!-- Class Info -->
                        <v-expansion-panel :key="3" >
                            <v-expansion-panel-header  disable-icon-rotate>
                                <span class="font-weight-bold">
                                    {{user.classid}}
                                </span>
                                <template v-slot:actions>
                                    <v-icon color="primary">  mdi-account-multiple </v-icon>
                                </template>
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                                {{intro.classid}}
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>  
                </v-card>
                <span
                    class=" text-h2 ml-6
                            font-weight-black grey--text text--lighten-3"
                    style="position:absolute; top:16px"
                >BUPT
                </span>
            </v-card>
        </v-card>
    </v-container>
    <v-divider class="ml-5 mr-12"></v-divider>
<!-- Option Block -->
    <v-container class="ml-2">
        <p class="text-body-1 font-weight-bold ml-1 ">更多操作</p>
        <v-container class="d-flex flex-row justify-start flex-wrap">
        <!-- First Button -->
            <v-dialog
                v-model="dialog_change"
                persistent
                max-width="600px"
            >
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        color="info"
                        v-bind="attrs"
                        v-on="on"
                    >修改密码
                    </v-btn>
                </template>
                <v-card class="px-6 pt-6 pb-2 rounded-lg">
                    <v-card-title>
                        <span class="text-h5">修改密码</span>
                    </v-card-title>
                     <v-form>
                        <v-container fluid>
                        <v-row>
                        <!-- Input -->
                            <v-col  cols="12"   sm="6">
                            <v-text-field
                                :append-icon="show_pwd ? 'mdi-eye' : 'mdi-eye-off'"
                                :rules="[rules.required, rules.max]"
                                :type="show_pwd ? 'text' : 'password'"
                                label="新密码"
                                :value="input_pwd"
                                hint="长度上限: 16"
                                class="input-group--focused mx-2"
                                @click:append="show_pwd = !show_pwd"
                            ></v-text-field>
                            </v-col>
                        <!-- Input Comfirm -->
                            <v-col  cols="12"    sm="6">
                            <v-text-field
                                :append-icon="show_cfm ? 'mdi-eye' : 'mdi-eye-off'"
                                :rules="[rules.required, rules.max]"
                                :type="show_cfm ? 'text' : 'password'"
                                label="确认密码"
                                :value="input_cfm"
                                class="mx-2"
                                @click:append="show_cfm = !show_cfm"
                            ></v-text-field>
                            </v-col>
                        </v-row>
                        </v-container>
                    </v-form>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="blue darken-1"
                            text
                            @click="dialog_change = false"
                        >取消
                        </v-btn>
                        <v-btn
                            color="blue darken-1 font-weight-bold"
                            text
                            @click="dialog_change = false"
                        >确定
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        <!-- Second Button -->
            <v-btn
                class="ml-6"
                color="success"
                @click="Signout()"
            >退出
            </v-btn>
        </v-container>
    </v-container>
    
</v-container>
</template>

<script>
// @ is an alias to /src
import Vue from 'vue'
export default {
    name: "HomeDetail",
    data: () => ({
        user: Vue.prototype.$USER,
        intro: Vue.prototype.$INTRO,
        authText: ["学生", "学生", "教师"],
        dialog_change:false,
        show_pwd:false,
        show_cfm:false,
        input_pwd:'',
        input_cfm:'',
        rules:{
            required: value => !!value || '密码不能为空',
            max: v => v.length <=16 || '密码长度超限',
        }
    }),
    methods: {
        Signout:function(){
            Vue.prototype.$signout();
            this.$router.push('/auth');
        },
    },
}
</script>
