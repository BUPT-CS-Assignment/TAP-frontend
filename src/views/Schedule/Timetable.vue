<template>
<v-container class="pa-4">
    <v-simple-table
        class="mr-6" 
        fixed-header
        height="500"
    >
        <template v-slot:default>
        <thead>
            <tr>
                <th class="text-center">
                    节次
                </th>
                <th class="text-center">
                    周一
                </th>
                <th class="text-center">
                    周二
                </th>
                <th class="text-center">
                    周三
                </th>
                <th class="text-center">
                    周四
                </th>
                <th class="text-center">
                    周五
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(value,index) in table"
                :key="index"
                class="text-center"
            >
                <td>第{{index+1}}节</td>
                <td v-for="(val,index) in value"
                    :key="index"
                    class="text-center"
                >
                    {{detail[val].name}}<br>
                    {{detail[val].prof}}<br>
                    {{detail[val].loc}}
                </td>
            </tr>
        </tbody>
        </template>
    </v-simple-table>
</v-container>
</template>

<script>
// @ is an alias to /src
import Vue from 'vue'
export default {
    name: 'TimeTable',
    data: () => ({
        table:Vue.prototype.$TABLE.table,
        detail:Vue.prototype.$TABLE.detail,
    }),
    created(){

    },
    methods: {

    },
}
</script>
