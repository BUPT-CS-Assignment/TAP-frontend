<template>
<v-container>
    <div class="text-h4 font-weight-bold ml-4 mt-12 mb-1">    
        Detail    
    </div>
    <v-divider class="mx-5"></v-divider>
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
            @click="loader = 'loading'"
        >
        Sign up
        </v-btn>
    </v-container>

</v-container>
</template>

<script>
// @ is an alias to /src
import Vue from 'vue'
export default {
    name: 'HomeDetail',
    data: () => ({
        user:Vue.prototype.USER,
    }),
}
</script>
