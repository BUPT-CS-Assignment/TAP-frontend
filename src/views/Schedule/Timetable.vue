<template>
<v-container class="pa-6">
    <v-simple-table class="mr-6"  fixed-header>
        <thead>
            <tr>
                <th class="text-center">节次</th>
                <th class="text-center">周一</th>
                <th class="text-center">周二</th>
                <th class="text-center">周三</th>
                <th class="text-center">周四</th>
                <th class="text-center">周五</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(value,index) in table.table" :key="index" class="text-center">
                <td>第{{index+1}}节</td>
                <td v-for="(val,index) in value" :key="index" class="text-center">
                    <span v-if="val>0">
                        {{table.courses[val].name}}<br>
                        {{table.courses[val].profname}}<br>
                        {{table.courses[val].location}}<br>
                        {{table.courses[val].week}}
                    </span>
                </td>
            </tr>
        </tbody>
    </v-simple-table>
</v-container>
</template>

<script>
// @ is an alias to /src
import Vue from 'vue'
export default {
    name: 'TimeTable',
    data: () => ({
        table:Vue.prototype.$TABLE,
    }),
    created(){

    },
    methods: {

    },
}
</script>
