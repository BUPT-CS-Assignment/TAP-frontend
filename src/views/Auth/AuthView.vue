<template>
<v-container class="d-flex justify-center align-center ma-auto" height="auto">
    <v-card
        class="d-flex justify-center align-center mx-auto mt-10"
        :elevation="0"
        width="auto"
    >
        <v-img 
            class=" d-none d-sm-none d-md-flex"
            src="../../assets/item1.jpg"
            max-height="400px"
            max-width="320px"
        >
        </v-img>
        <v-card 
            class="pa-6 ml-0"
            width="360px"
            height="480px"
        >
            <v-card-title class="text-center justify-center py-6">
                <h2 class="font-weight-bold text-h4 basil--text">
                    Tiny & Pretty
                </h2>
            </v-card-title>
            <v-tabs
            background-color="transparent"
            color="basil"
            centered
            >
                <v-tab :key="0">Sign in</v-tab>
                <v-tab :key="1">Sign up</v-tab>
                <v-tab-item :key="0">
                <v-container class="pa-8">
                    <v-text-field 
                        label="UserID" 
                        v-model="userid">
                    </v-text-field>
                    <v-text-field 
                        class="mb-6"
                        label="Password" 
                        v-model="passwd">
                    </v-text-field>
                    <v-btn
                        class="mx-auto white--text"
                        :loading="loading"
                        :disabled="loading"
                        color="blue accent-2"
                        @click="signin();loader = 'loading'"
                    >
                    Sign in
                    </v-btn>
                </v-container>
                </v-tab-item>

                <v-tab-item :key="1">
                <v-container class="pl-8 pr-8 pt-2">
                    <v-text-field 
                        label="UserID" 
                        v-model="userid">
                    </v-text-field>
                    <v-text-field 
                        label="Password" 
                        v-model="passwd">
                    </v-text-field>
                    <v-text-field 
                        label="Comfirm" 
                        v-model="comfirm">
                    </v-text-field> 
                    <v-btn
                        class="mx-auto mt-6 white--text"
                        :loading="loading"
                        :disabled="loading"
                        color="blue accent-2"
                        @click="signup();loader = 'loading'"
                    >
                    Sign up
                    </v-btn>
                </v-container>
                </v-tab-item>
            </v-tabs>
        </v-card>  
    </v-card>
</v-container>
</template>

<script>
export default {
    name: 'AuthView',
    data: () => ({
        userid:'',
        passwd:'',
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
                        'Content-Type': 'multipart/form-data',
                        'Function': 'signin',
                        'Userid':this.userid
                    }}
                )
                .then(res => {
                    if(res.data!="NO_ERROR"){
                        alert(res.data);
                        localStorage.removeItem('Status');
                        return;
                    }
                    var token = res.headers["token"];
                    localStorage.setItem("Userid",this.userid);
                    localStorage.setItem("Token",token);
                    console.log(localStorage);
                    localStorage.setItem('Next','');
                    localStorage.setItem('Status','True');
                })
                .catch(err =>{
                    console.log(err);
                    if(err.response.status == 401){
                        alert("ACCESS_DENIED");
                    }
                })
        }
    },
}
</script>

<style>
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