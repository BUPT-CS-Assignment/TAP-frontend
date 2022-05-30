<template>
<v-container class="pa-4">
    <v-simple-table
        class="mr-6" 
        fixed-header
        height="300px"
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
                :key="value"
                class="text-center"
            >
                <td>第{{index+1}}节</td>
                <td v-for="(val) in value"
                    :key="val"
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

export default {
    name: 'TimeTable',
    data: () => ({
        table:[],
        detail:[],
    }),
    methods: {
        table_init(res){
            this.table = Array.from(Array(14),()=>new Int32Array(7));
            this.detail = [];
            this.detail.push('');
            res.data.detail.forEach(element => {
                this.detail.push(element)
            });
            res.data.basic.forEach(course => {
                for(var day = 0; day < course.timeCode.length; day++){
                    var code = course.timeCode[day] << 1;
                    for(var timeP =0; timeP <14; timeP++){
                        code >>= 1;
                        if(code & 0x1 == 1) this.table[timeP][day] = course.pos;
                    }
                }
            });
            console.log(this.table);
        },

        getTable:function(){
            this.$get('/api/user/schedule/','','fetch',
                        this.table_init,()=>{},()=>{});
        }
    },
}
</script>
