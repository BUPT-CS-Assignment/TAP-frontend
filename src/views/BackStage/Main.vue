<template>
<v-container>
<!-- Top Bar -->
    <v-app-bar
        app
        class="pr-3"
        color="#FAFAFA"
        dense
    >
        <v-container class="py-0 ml-0 d-flex">
        <p class="text-h6 font-weight-bold my-auto">
            TAP BackStage
        </p>
            <v-btn 
                outlined
                max-height=30
                class="pl-4 pr-4 ml-auto text-overline font-weight-bold"
            >
            刷新
            <v-icon class="ml-3" small>mdi-text-long</v-icon>
            </v-btn> 
        </v-container>
    </v-app-bar>

<!-- Main Content -->
    <v-container
        class="ma-1 d-flex"
    >
    <!-- First Content -->
        <v-container
            class="ma-1 d-flex flex-row justify-center flex-wrap"
        >
        <!-- Tale List -->
            <v-card class="ma-2 rounded-lg pa-2">
                <v-card-title class="text-h6 font-text-bold">
                    Table List
                </v-card-title>
                <v-simple-table>
                    <thead>
                        <tr>
                            <th class="text-left">Name</th>
                            <th class="text-center">Option</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item) in tablelist"
                            :key="item"
                        >
                            <td>{{item}}</td>
                            <td>
                                <v-btn
                                    class="ma-1"
                                    rounded
                                    small
                                    color="info"
                                    @click="getValue(item)"
                                >Show
                                </v-btn>
                                <v-btn
                                    class="ma-1"
                                    rounded
                                    small
                                    color="error"
                                    @click="delTable(item,this)"
                                >Delete
                                </v-btn>
                            </td>
                        </tr>
                    </tbody>
                </v-simple-table>
            </v-card>

        <!-- Table Detail -->
            <v-card class="ma-2 rounded-lg pa-2">
                <v-card-title class="text-h6 font-text-bold">
                    {{name}}
                </v-card-title>
                <v-simple-table>
                    <thead>
                        <tr>
                            <th class="text-center">S/N</th>
                            <th v-for="(item,index) in field"
                                class="text-center"
                                :key="index"
                            >{{item}}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(value,index) in detail"
                            :key="index"
                        >
                            <td>{{index}}</td>
                            <td v-for="(item,index) in value"
                                :key="index"
                            >{{item}}
                            </td>
                        </tr>
                    </tbody>
                </v-simple-table>
            </v-card>
        </v-container>

    <!-- Second Content -->
        <v-container
            class="ml-auto d-flex flex-row justify-center flex-wrap"    
        >
            <!-- Sql Terminal -->
            <v-card class="ma-2 rounded-lg pa-2">
                <v-card 
                    class="ma-2"
                    elevation="0"
                    width="400"
                    height="300"
                >
                    <v-textarea
                        outlined
                        no-resize
                        label="SQL Statement"
                        rows="5"
                        row-height="20"
                    ></v-textarea>

                </v-card>
            </v-card>
        </v-container>
    </v-container>

</v-container>
</template>

<script>
// @ is an alias to /src
import Vue from 'vue'
export default {
    name: 'BackStageView',
    user:Vue.prototype.$USER,
    data: () => ({
        tablelist:[
            'Test',
        ],
        name:'Test',
        field:['field1','field2','field3'],
        detail:[['Data1-1','Data1-2','Data1-3'],
                ['Data2-1','Data2-2','Data2-3']],
    }),
    created(){
        
    },
    methods: {
        getList:function(){
            this.name='';
            this.$get('/api/sql','','list',(res)=>{
                this.tablelist = res.data.list;
            },()=>{},this.SqlExpFunction)
            
        },

        getValue:function(tablename){
            this.$get('/api/sql',{table:tablename},'detail',(res)=>{
                this.name = res.data.name;
                this.field = res.data.field.split(",");
                this.detail = [];
                var values = res.data.data.split(";");
                for(var i=0;i<values.length;i++){
                    this.detail.push(values[i].split(","));
                }
            },()=>{},this.SqlExpFunction);
            
        },

        delTable:function(tablename){
            console.log(tablename);
            /*
            this.$post('/api/sql',{table:tablename},'delete',()=>{
                this.tablelist.forEach((item,index,arr) => {
                    if(item==tablename){
                        arr.splice(index,1);
                        return;
                    }
                });
                
            },()=>{},this.SqlExpFunction);*/
        },

        SqlExpFunction(err){
            if(err.status == 401){
                alert("ACCESS_DENIED");
                localStorage.setItem('Next','Sql');
            }else{
                alert(err.status);
            }
        }
    },
}
</script>
