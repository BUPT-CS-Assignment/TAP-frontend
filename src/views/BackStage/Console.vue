<template>
<v-card class="mx-10 pa-0" elevation="0" style="background:none;">
    <v-card-title class="ml-5 mb-3 text-h5 grey--text font-weight-black">
        CONSOLE
    </v-card-title>
<!-- Terminal -->
    <v-card class="mx-8 pb-5 rounded-0" elevation="4">
        <v-row class="mx-1">
            <v-col>
                <v-textarea  label="SQL STATMENT" rows="1" class="font-weight-bold"
                    solo flat dense  counter auto-grow clearable
                    v-model="sql.req"
                >   <template v-slot:prepend-inner>
                        <v-btn small color="teal lighten-2"
                            class="mr-2 white--text font-weight-bold"
                            @click="sendSQL()"
                        >SEND
                        </v-btn>
                    </template>
                </v-textarea>
            </v-col>
        </v-row>
        <v-row class="mx-2 mt-0 pt-0">
            <v-col cols="2">
                <v-card outlined elevation="0">
                    <v-card class="rounded-lg d-flex py-2" elevation="0"
                    ><span class="black--text text-subtitle-2 font-weight-bold ma-auto" 
                        >{{sql.msg}}
                        </span>
                    </v-card>
                </v-card>
            </v-col>
            <v-col>
                <v-card outlined elevation="0">
                    <v-badge class="ml-3" left color="teal lighten-2" overlap :content="sql.count">
                        <v-card style="background:none;" color="white"  class="py-2" elevation="0">
                            <span class="text-subtitle-2 font-weight-bold px-2"
                                style="word-break:break-all;"
                            >{{sql.value}}
                            </span>
                        </v-card>
                    </v-badge>
                </v-card>
            </v-col>
        </v-row>
    </v-card>
    
    <v-row class="mt-14 ml-9">
        <span class="text-h5 grey--text font-weight-black">DATABASE</span>
    </v-row>

<!-- Table Control -->
    <v-row class="mx-2">
    <!-- Table List -->
        <v-col cols="4">
            <v-card elevation="0" style="background:none;">
                <v-card-title>
                    <span class="grey--text text--lighten-1 text-subtitle-1 font-weight-bold">
                        TABLE LIST
                    </span>
                    <span class="mx-3 grey--text text--lighten-1 text-h5"> | </span>
                    <v-btn class="px-0 white--text font-weight-bold" text 
                        color="red lighten-2" @click="dialog.table_add = true"
                    >ADD NEW
                    </v-btn>
                </v-card-title>   

                <v-simple-table >
                    <tbody >
                        <tr v-for="(item,index) in tablelist" :key="index" >
                            <td style="border:0px;">
                                <v-card class="px-1 my-2 rounded-0" elevation="4" fluid height="70">
                                    <v-card-title>
                                        <v-btn class="mx-1 text-h6 font-weight-bold" color="teal lighten-2" text
                                           @click="getDetail(item)"
                                        >{{item}}
                                        </v-btn>
                                        <v-btn class="ml-auto text-overline px-0" color="grey lighten-1" text
                                            @click="delTable(item,index)"
                                        >DELETE
                                        </v-btn>
                                    </v-card-title>
                                    <v-card style="position:absolute;left:0;top:0;bottom:0"
                                        color="grey lighten-4" width="5" elevation="0" class="rounded-0"
                                    ></v-card>

                                    <v-card style="position:absolute;right:0;top:0;bottom:0"
                                        color="grey lighten-4" width="5" elevation="0" class="rounded-0"
                                    ></v-card>
                                </v-card>
                            </td>
                        </tr>
                    </tbody>
                </v-simple-table>
            </v-card>
        </v-col>
    <!-- Space Line -->
        
    <v-card width="2" class="ml-4 mr-3 mt-10" color="grey lighten-2" elevation="0"></v-card>
        
    <!-- Table Detail -->
        <v-col>
            <v-card elevation="0" style="background:none;">
                <v-card-title>
                    <span class="grey--text text--lighten-1 text-subtitle-1 font-weight-bold">
                        DETAIL
                    </span>
                    <span class="mx-3 grey--text text--lighten-1 text-h5"> | </span>
                    <v-btn class="px-0 white--text font-weight-bold" text 
                        color="red lighten-2" @click="pre_addValue()"
                    >NEW VALUE FOR {{name}}
                    </v-btn>
                </v-card-title> 
                <v-simple-table class="px-4">
                    <thead>
                        <tr>
                            <th class="text-left red--text text--lighten-2">S/N</th>
                            <th v-for="(item,index) in field" :key="index"
                                class="text-left font-weight-bold grey--text" 
                            >{{item}}
                            </th>
                            <th class="text-center font-weight-bold grey--text">
                                [ OPTION ]
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(value,index) in detail" :key="index">
                            <td class="teal--text text--lighten-2 font-weight-bold">
                                {{index}}
                            </td>
                            <td v-for="(item,idx) in value" :key="idx">
                                {{item}}
                            </td>
                            <td class="d-flex justify-center align-center">
                                <v-btn class="font-weight-bold" color="teal lighten-2" text
                                    @click="mod_line=index;dialog.value_set=true;"
                                >EDIT
                                </v-btn>
                                <v-btn color="red lighten-2" text
                                    @click="delValue(value,index)"
                                >DELETE
                                </v-btn>
                            </td>
                        </tr>
                    </tbody>
                </v-simple-table>
            </v-card>
        </v-col>
    </v-row>

    <!-- Add Table -->
    <v-dialog v-model="dialog.table_add" persistent max-width="600px">
        <v-card class="px-2 pt-6 pb-2 rounded-lg">
            <v-card-title class="text-h5">
                <span class="grey--text text--lighten-1 text-subtitle-1 font-weight-bold">
                    NEW TABLE
                </span>
                <span class="mx-3 grey--text text--lighten-1 text-h5"> | </span>
                <v-btn class="px-0 white--text font-weight-bold" text 
                    color="red lighten-2" @click="dialog.field_add = true"
                >NEW FIELD
                </v-btn>
            </v-card-title>
            <v-container fluid class="px-6 pb-0 mb-0">
                <v-col>
                    <v-row>
                        <v-text-field outlined dense label = "Directory"
                            v-model = "input.dir_set" :rules="[rules.required]"
                        ></v-text-field>
                    </v-row>
                    <v-row>
                        <v-text-field outlined dense label="Table Name"
                            v-model="input.table_name" :rules="[rules.required]"
                        ></v-text-field>
                        <v-combobox outlined dense label="Table Size (400 as defalut)" class="ml-3"
                            v-model="input.table_size"
                            :items="table_size_items"
                        ></v-combobox>
                    </v-row>
                </v-col>
            </v-container>
            <v-container d-flex flex-row flex-wrap class="px-6">
                <v-card  v-for="(item,index) in input.table_field" :key = "index"
                    elevation="0" style="background: none;"
                ><v-chip v-if="item.show" close outlined
                        class="ma-2 teal--text text--lighten-2 font-weight-bold"
                        @click:close="item.show = false"
                    ><v-icon color="teal lighten-2" class="mr-1">mdi-tag-multiple</v-icon>
                        {{item.name}}
                        <span class="white--text">-</span>
                        <span class="teal--text text-uppercase">{{item.type}}</span>
                    
                    </v-chip>
                </v-card>
            </v-container>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="teal lighten-2" text
                    @click="dialog.table_add=false"
                >Cancel
                </v-btn>
                <v-btn color="red lighten-2 font-weight-bold" text
                    @click="addTable();"
                >Add
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <!-- Add Field -->
    <v-dialog v-model="dialog.field_add" persistent max-width="300px">
        <v-card class="pt-4 pb-2 rounded-lg">
            <v-card-title class="text-h5 mb-2 ml-1">
                <span class="red--text text--lighten-2 text-subtitle-1 font-weight-bold">
                    NEW FIELD
                </span>
            </v-card-title>
            <v-col>
                <v-row class="px-6">
                    <v-text-field v-model = "input.field.name"
                        outlined dense label = "Field Name"
                        :rules="[rules.required]"
                    ></v-text-field>
                </v-row>
                <v-row class="px-6">
                    <v-combobox v-model="input.field.type"
                        :items="field_type_items"
                        outlined dense label="Field Type"
                    ></v-combobox>
                </v-row>
            </v-col>
            <v-card-actions><v-spacer></v-spacer>
                <v-btn color="teal lighten-2" text
                    @click="dialog.field_add=false"
                >Cancel
                </v-btn>
                <v-btn color="red lighten-2 font-weight-bold" text
                    @click="addField();"
                >Add
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <!-- Add Value -->
    <v-dialog v-model="dialog.value_add" persistent max-width="600px">
        <v-card class="px-2 pt-6 pb-2 rounded-lg">
            <v-card-title class="text-h5 mb-2 ml-1">
                <span class="red--text text--lighten-2 text-subtitle-1 font-weight-bold">
                    NEW VALUE
                </span>
            </v-card-title>
            <v-container fluid class="px-6">
                <v-row>
                    <v-col  v-for="(item,index) in input.data_detail" 
                        :key="index" 
                        cols="6"  sm="4" 
                    >
                        <v-text-field v-if="index == 0" v-model="item.val"
                            outlined dense
                            :rules="[rules.required]"
                            :label="field[index]"   
                        >
                        </v-text-field>
                        <v-text-field v-if="index != 0" v-model="item.val"
                            outlined dense
                            :label="field[index]"   
                        >
                        </v-text-field>
                    </v-col>
                </v-row>
            </v-container>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="teal lighten-2" text
                    @click="dialog.value_add=false"
                >Cancel
                </v-btn>
                <v-btn
                    color="red lighten-2 font-weight-bold" text
                    @click="addValue();"
                >Add
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <!-- Set Value -->
    <v-dialog v-model="dialog.value_set" persistent max-width="600px">
        <v-card class="px-2 pt-6 pb-2 rounded-lg">
            <v-card-title class="text-h5 mb-2 ml-1">
                <span class="red--text text--lighten-2 text-subtitle-1 font-weight-bold">
                    MODIFY
                </span>
            </v-card-title>
            <v-container fluid class="px-6">
                <v-row>
                    <v-col  v-for="(item,index) in input.data_detail" 
                        :key="index" 
                        cols="6"  sm="4" 
                    ><v-text-field v-if="index==0" :value="detail[mod_line][0]"
                            outlined dense readonly
                        ></v-text-field>
                        <v-text-field v-if="index!=0" outlined dense
                            v-model="item.val"
                            :label="field[index]" :placeholder="detail[mod_line][index]"
                        ></v-text-field>
                    </v-col>
                </v-row>
            </v-container>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="teal lighten-2" text
                    @click="dialog.value_set=false"
                >Cancel
                </v-btn>
                <v-btn color="red lighten-2 font-weight-bold" text
                    @click="setValue();"
                >Change
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>


</v-card>
</template>

<script>
// @ is an alias to /src
import Vue from 'vue'
export default {
    name: 'ConsoleView',
    data: () => ({
        time:Vue.prototype.$SYSTIME,
        user:Vue.prototype.$USER,
        tablelist:[
            'Test'
        ],
        dialog:{
            dir_set:false,
            table_add:false,
            value_add:false,
            value_set:false,
            field_add:false,
        },
        input:{
            dir_set:'/home/jianxf/TAP/data/src/',
            table_name:'',
            table_size:400,
            table_field:[{name:'id',type:'int',show:true},],
            data_detail:[{val:''},{val:''},{val:''}],
            field:{name:'',type:'int'},
        },
        table_size_items:[200,400,800,1000,2000,4000],
        field_type_items:['int','int64','real','text','longtext'],
        dir:'/TAP/data',
        sql:{
            req:'',
            msg:'MESSAGE',
            count:'0',
            value:'RETURN VALUE',
        },
        name:'NULL',
        field:['field1','field2','field3'],
        detail:[['NULL','NULL','NULL']],
        mod_line:0,
        rules:{
            required: value => !!value || 'Value Required',
        }
    }),
    created() {
        this.getDir();
        this.getList();
    },
    methods: {
       clearSQL:function(){
            //this.sql.req='',
            this.sql.msg='',
            this.sql.count='0',
            this.sql.value=''
        },

        sendSQL:function(){
            this.$post('/api/sql',this.sql.req,'','run',(res)=>{
                this.clearSQL();
                this.sql.msg = res.headers.msg;
                this.sql.count = res.data.count+'';
                this.sql.value = res.data.retVal; 
            },(res)=>{
                this.sql.msg = res.headers.msg;
                this.sql.count = '0';
                this.sql.value = 'UNEXPECTED REQUEST'; 
            },(res)=>{alert(res.status)});
        },

        getList:function(){
            this.name='';
            this.$get('/api/sql','','list',(res)=>{
                this.tablelist = res.data.list;
            },()=>{},(res)=>{alert(res.status)})
        },

        getDetail:function(tablename){
            this.$post('/api/sql',tablename,'','detail',(res)=>{
                this.name = res.data.name;
                this.field = res.data.field.split(",");
                this.input.data_detail=[];
                this.detail_input_clear();
                this.detail = [];
                var values = res.data.data.split(";");
                for(var i=0;i<values.length;i++){
                    this.detail.push(values[i].split(","));
                }
            },(res)=>{
                if(res.headers.msg == "DATA_NOT_FOUND"){
                    this.name = res.data.name;
                    this.field = res.data.field.split(",");
                    this.input.data_detail=[];
                    this.detail_input_clear();
                    this.detail = [['NULL']];
                }
            },(res)=>{alert(res.status)});
        },

        addField:function(){
            if(this.input.field.name == "" || this.input.field.name.indexOf(" ") != -1){
                alert('Invalid Params');
                return;
            }
            this.input.table_field.push({name:this.input.field.name,type:this.input.field.type,show:true});
            this.input.field.name='';
            this.input.field.type='int';
            this.dialog.field_add = false;
        },

        addTable:function(){
            var name = this.input.table_name;
            var dir = this.input.dir_set
            if(dir == "" || dir.indexOf(" ") != -1
                || name == "" || name.indexOf(" ") != -1){
                alert("Invalid Params");
                return;
            }
            var sql = ".setdir " + dir + ";";
            sql += ".setsize " + this.input.table_size+";";
            sql += "create table "+ name + "(";
            var all = 0;
            this.input.table_field.forEach((item)=>{
                if(item.show){
                    all ++;
                    sql += item.name + " " + item.type + ",";
                }
            });
            if(all == 0){ alert("Empty Params"); return;}
            sql = sql.substring(0,sql.length-1) + ");";
            this.$post('/api/sql',sql,'','run',()=>{
                this.dir = dir;
                this.tablelist.push(name)
                this.dialog.table_add = false;
            },(res)=>{alert(res.msg)},(res)=>{alert(res.status)});
        },

        delTable:function(tablename,index){
            confirm('Delete Confirm') && (
                this.$post('/api/sql',tablename,'','drop',()=>{
                    this.tablelist.splice(index,1);
                },()=>{},this.SqlExpFunction)
            )
        },

        detail_input_clear(){
            this.input.data_detail=[];
            for(var i=0; i < this.field.length;i++){
                var obj={val:''}
                this.input.data_detail.push(obj);
            }
        },

        pre_addValue:function(){
            if(this.name == "NULL" || this.name == ""){
                alert("Table Assigned Required");
                return;
            }
            this.dialog.value_add=true;
        },

        addValue:function(){
            var cmd = this.name;
            var field="", value="";
            for(var i = 0;i<this.field.length;i++){
                this.input.data_detail[i].val=this.input.data_detail[i].val.trim();
                if(this.input.data_detail[i].val.length!=0){
                    field += this.field[i]+',';
                    value += this.input.data_detail[i].val+',';
                }
            }
            field = field.substring(0,field.length-1);
            value = value.substring(0,value.length-1);
            cmd = cmd + ';'+field + ';' + value;
            this.$post('/api/sql',cmd,'','insert',()=>{
                this.getDetail(this.name);
                this.detail_input_clear();
                this.dialog.value_add=false;
            },(res)=>{alert(res.headers.msg)},this.SqlExpFunction)

        },

        setValue:function(){
            var index=this.mod_line;
            var cmd = this.name+';'+this.field[0]+'='+this.detail[index][0]+';';
            for(var i = 1;i<this.field.length;i++){
                this.input.data_detail[i].val=this.input.data_detail[i].val.trim();
                var str = this.input.data_detail[i].val;
                if(str.length!=0) cmd += this.field[i]+'='+str+ ' , ';    
            }
            cmd=cmd.substring(0,cmd.length-3);
            console.log(cmd);
            this.$post('/api/sql',cmd,'','update',()=>{
                for(i = 1;i<this.field.length;i++){
                    if(this.input.data_detail[i].val.length!=0){
                        this.detail[index][i]=this.input.data_detail[i].val;
                    }
                }
                this.detail_input_clear();
                this.dialog.value_set=false;
            },(res)=>{alert(res.headers.msg)},()=>{})

        },

        delValue:function(obj,index){
            var dataid = obj[0];
            console.log(dataid);
            var cmd = this.name+';'+this.field[0]+'='+this.detail[index][0];
            confirm('Delete Confirm') && (
                this.$post('/api/sql',cmd,'','delete',()=>{
                    this.detail.splice(index,1);
                },()=>{},()=>{})
            )
        },

        refresh:function(){
            this.getDir(); this.getList();
        },

        getDir:function(){
            var request = '.dir;';
            this.$post('/api/sql',request,'','run',(res)=>{
                this.dir=res.data.retVal;
            },()=>{alert('Dir Change Failed')},(res)=>{alert(res.status)});
        },

        changeDir:function(){
            var request = '.setdir '+this.input.dir_set+';'
            this.$post('/api/sql',request,'','run',()=>{
                this.dir=this.input.dir_set;
                this.dialog.dir_set=false;
            },()=>{alert('Dir Change Failed')},(res)=>{alert(res.status)});
        },
    }
}
</script>