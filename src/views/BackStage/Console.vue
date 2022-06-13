<template>
<v-card class="mx-10 pa-0">
    <v-row>
        <v-col>
            <v-card class="mx-2 px-2 rounded-lg">
                <v-textarea  label="Statement"
                    solo  flat  dense  counter auto-grow clearable
                    v-model="sql.req"
                ></v-textarea>
            </v-card>
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="3">
            <v-card>
                <v-card class="ml-0 rounded-lg d-flex"
                    elevation="0" height="44"
                ><span class="black--text text-subtitle-2 font-weight-bold ma-auto" 
                    >{{sql.msg}}
                    </span>
                </v-card>
            </v-card>
        </v-col>
        <v-col>
            <v-card>
                <v-badge class="ml-3" left color="amber" overlap :content="sql.count">
                    <v-card style="background:none;" color="white" min-height="50">
                        <span class="text-subtitle-2 font-weight-bold ma-auto"
                            style="max-width:240px;word-break:break-all;"
                        >{{sql.value}}
                        </span>
                    </v-card>
                </v-badge>
            </v-card>
        </v-col>
    </v-row>

    <v-row>
        <v-col>
            <v-card wdith="100" height="300"></v-card>
        </v-col>
        <v-col>
            <v-card wdith="200" height="300"></v-card>
        </v-col>
    </v-row>
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
            'Test',
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
        name:'__TEST__',
        field:['field1','field2','field3'],
        detail:[['NULL','NULL','NULL']],
        mod_line:0,
        rules:{
            required: value => !!value || 'Value Required',
        }
    }),
    created() {

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
            if(this.name == "__TEST__" || this.name == ""){
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
    },
}
</script>