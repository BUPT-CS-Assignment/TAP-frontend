<template>
<v-app id="auth">
<v-main class="bg align-center">
    <v-card
        class=" mx-auto my-auto d-flex flex-row flex-wrap"
        max-width="800px"
        elevation="8" style="background:none"
    >
    <!-- Img -->
        <v-card
            class="d-flex flex-column justify-center rounded-0"
            width="440px"
            elevation="0"
            style="background-color:#F5F5F5"
        >
            <span 
                class="text-h5 black--text font-weight-black"
                style="position:absolute;top:30px;left:30px;"
            >
                <v-icon 
                    medium color="black"
                    class="mr-2 mb-1"
                >mdi-cube
                </v-icon>
                Tiny & Pretty
            </span>
            <v-btn rounded style="position:absolute;top:36px;right:15px;" class="px-0" text x-small depressed
                onclick="window.open('https://github.com/NoUITeam/TinyAndPretty.git')"
            >   <v-icon medium color="black">
                    mdi-github
                </v-icon>
            </v-btn>
            <v-btn rounded style="position:absolute;top:36px;right:55px;" class="px-0" text x-small depressed
                onclick="window.open('https://github.com/Jianxff/NEDB.git')"
            >   <v-icon medium color="black" >
                    mdi-database
                </v-icon>
            </v-btn>
            <v-btn rounded style="position:absolute;top:36px;right:95px;" class="px-0" text x-small depressed
                onclick="window.open('https://github.com/Jianxff/TAP-frontend.git')"
            >   <v-icon medium color="black" >
                    mdi-vuejs
                </v-icon>
            </v-btn>
            <!-- d-none d-sm-none d-md-flex -->
            <v-img 
                class="mx-auto mt-12"
                src="../../assets/item1.png"
                max-height="260px"
                max-width="299px"
            >
            </v-img>
        </v-card>

    <!-- Input -->
        <v-card 
            class="pa-6 ml-auto rounded-0"
            width="360px"
            height="480px"
            elevation="0"
        >
            <v-card-title class="text-center justify-center py-6">
                <h2 class="font-weight-bold text-h4 basil--text">
                    Welcome !
                </h2>
            </v-card-title>
            <v-tabs
                background-color="transparent"
                color="black"
                centered
            >
                <v-tab :key="0">Sign in</v-tab>
                <v-tab :key="1">Sign up</v-tab>
                <v-tab-item :key="0">
                <v-container class="px-12 pt-6">
                    <v-text-field 
                        label="UserID" 
                        v-model="userid">
                    </v-text-field>
                    <v-text-field 
                        class="mb-6"
                        label="Password" 
                        type="password"
                        v-model="passwd">
                    </v-text-field>
                    <v-btn
                        class="white--text"
                        :loading="loading"
                        :disabled="loading"
                        color="blue accent-2"
                        outlined rounded
                        @click="signin();loader = 'loading'"
                    >
                    Sign in
                    </v-btn>
                </v-container>
                </v-tab-item>

                <v-tab-item :key="1">
                <v-container class="px-12 pt-2">
                    <v-text-field 
                        label="UserID" 
                        v-model="userid">
                    </v-text-field>
                    <v-text-field 
                        label="Password" 
                        v-model="passwd">
                    </v-text-field>
                    <v-text-field 
                        label="Confirm" 
                        v-model="confirm">
                    </v-text-field> 
                    <v-btn
                        class="mt-6 white--text"
                        :loading="loading"
                        :disabled="loading"
                        color="blue accent-2"
                        outlined rounded
                        @click="signup();loader = 'loading'"
                    >
                    Sign up
                    </v-btn>
                </v-container>
                </v-tab-item>
            </v-tabs>
        </v-card>  
    </v-card>

</v-main>
</v-app>
</template>

<script>
import Vue from 'vue'
export default {
    name: 'AuthView',
    data: () => ({
        user:Vue.prototype.$USER,
        userid:'',
        passwd:'',
        confirm:'',
        loader:null,
        loading:false,
    }),
    watch:{
        loader () {
            const l = this.loader
            this[l] = !this[l]
            setTimeout(() => (this[l] = false), 2000)
            this.loader = null
        },
    },
    methods: {
        signin:function(){
            this.$http.post('/api/signin',
                    this.passwd,
                    {headers:{
                        'content-type': 'multipart/form-data',
                        'function': 'signin',
                        'userid':this.userid
                    }}
                )
                .then(res => {
                    console.log(res);
                    if(res.data!="NO_ERROR"){
                        alert(res.data);
                        //localStorage.removeItem('Status');
                        return;
                    }
                    var token = res.headers["token"];
                    console.log(token);
                    localStorage.setItem("userid",this.userid);
                    localStorage.setItem("token",token);
                    this.init();
                    if(this.$USER.auth == 3){
                        this.$router.push('/backstage');
                    }else{
                        this.$router.push('/home/overview');
                    }
                })
                .catch(err =>{
                    console.log(err);
                    if(err.response.status == 401){
                        alert("ACCESS_DENIED");
                    }
                })
        },
        signup:function(){
            var patrn=/^(\w){3,16}$/;  
            if (!patrn.exec(this.passwd)){
                alert('密码位3-16位字母、数字或下划线组合');
                return;
            }
            if(this.passwd != this.confirm){       
                alert('两次输入不一致');
                return;
            }
            this.$post('/api/signup',this.passwd,{'userid':this.userid},'',()=>{
                this.userid = '';
                this.passwd = '';
                this.confirm = '';
                alert('注册成功,等待管理员确认院系信息')
            },()=>{},()=>{});
        },
        init:function(){
            this.$getUser();
            if(this.$USER.id != 10000){
                this.$tableInit();
                this.$getTable('/api/user');
                this.$getEvents();
            }
        }
    },
}
</script>

<style>
    #auth{
        /* background-image:linear-gradient(#4285f4, #d2d5fc);*/
        background-image: url(../../assets/bg2.png); 
        background-size: cover;
        background-position: center center;
    }
    .bg{
        background-color:rgba(0,0,0,0.1);
        /* backdrop-filter:blur(100px); */
    }
    .custom-loader {
        animation: loader 1s infinite;
        display: flex;
    }
    @-moz-keyframes loader {
        from {
        transform: rotate(0);
        }
        to {
        transform: rotate(360deg);
        }
    }
    @-webkit-keyframes loader {
        from {
        transform: rotate(0);
        }
        to {
        transform: rotate(360deg);
        }
    }
    @-o-keyframes loader {
        from {
        transform: rotate(0);
        }
        to {
        transform: rotate(360deg);
        }
    }
    @keyframes loader {
        from {
        transform: rotate(0);
        }
        to {
        transform: rotate(360deg);
        }
    }
</style>