<template>
<v-container class="pa-6">
    <v-card rounded="lg" elevation="3">
    <v-simple-table fixed-header>
        <thead >
            <tr >
                <th class="black--text text-center text-subtitle-1 font-weight-bold" style="background-color:#EEEEEE;">节次</th>
                <th class="text-center text-subtitle-1 font-weight-bold" style="background-color:#EEEEEE;">周一</th>
                <th class="text-center text-subtitle-1 font-weight-bold" style="background-color:#EEEEEE;">周二</th>
                <th class="text-center text-subtitle-1 font-weight-bold" style="background-color:#EEEEEE;">周三</th>
                <th class="text-center text-subtitle-1 font-weight-bold" style="background-color:#EEEEEE;">周四</th>
                <th class="text-center text-subtitle-1 font-weight-bold" style="background-color:#EEEEEE;">周五</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(value,index) in table.table" :key="index" class="text-center">
                <td class="grey--text text--darken-2 font-weight-bold">第{{index+1}}节</td>
                <td v-for="(val,index) in value" :key="index" class="text-center">
                    <v-menu v-if="val > 0" open-on-hover offset-y bottom>
                        <template v-slot:activator="{ on, attrs }">
                        <v-btn color="blue-grey" text class="ma-4 pa-2"
                            v-bind="attrs" v-on="on" @click="step(val)"
                        >   <span class="text-subtitle-1 font-weight-bold">{{table.courses[val].name}}
                            <br><span class="text-body-2 grey--text text--darken-2">
                                <template v-if="user.auth == 2">{{table.courses[val].class}}
                                </template>
                                <template v-else>{{table.courses[val].week}}</template>
                            </span>
                        </span>
                        </v-btn>
                        </template>
                        <v-card min-width="100" min-height="100" max-width="300" rounded="lg" 
                            class="pa-3" elevation="3"
                        >   
                            <template v-if="user.auth < 2">
                                <span class="font-weight-bold mr-4">任课教师</span>
                                {{table.courses[val].profname}}<br>
                            </template>
                            <template v-else>
                                <span class="font-weight-bold mr-4">上课时间</span>
                                {{table.courses[val].week}}<br>
                            </template>
                                
                            <span class="font-weight-bold mr-4 mt-2">上课地点</span>
                            {{table.courses[val].location}}<br>
                        </v-card>
                    </v-menu>
                </td>
            </tr>
        </tbody>
    </v-simple-table>
    </v-card>
</v-container>
</template>

<script>
// @ is an alias to /src
import Vue from 'vue'
export default {
    name: 'TimeTable',
    data: () => ({
        table:Vue.prototype.$TABLE,
        user:Vue.prototype.$USER,
    }),
    created(){

    },
    methods: {
        step(id){
            Vue.prototype.$COURSECHOOSE = id;
            this.$router.push('/courses/index');
        }
    },
}
</script>
