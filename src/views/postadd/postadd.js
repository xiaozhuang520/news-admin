export default {
    data(){
        return{
            form:{
                category:[],
                title:'',
                content:'',
                cover:[],
                type:''
            },
            allCate:[],
            token:'',
            radio:'1'
            
        }
    },
    methods:{
        onSubmit(){
            this.form.type=this.radio-0
            this.$axios({
                url:'/post',
                method:'post',
                headers:{
                    Authorization :JSON.parse(localStorage.getItem('user') || `{}`).token
                },
                data:this.form
            }).then(res=>{
                const {message}=res.data;
                if(message==='文章发布成功'){
                    this.$message.success(message)
                }
                
            })
             
        },
        handleAvatarSuccess(res, file){
            this.form.cover.push({
                id:res.data.id
            })
        },
        handleRemove(file, fileList){
            const id=file.response.data.id;
            const {cover}=this.form;
            const arr=[];
            cover.forEach(e=>{
                if(e.id !== id ){
                    arr.push(e)
                }
            })
            this.form.cover=arr;
           
        }
    },
    mounted(){
        this.token=JSON.parse(localStorage.getItem('user') || `{}`).token;
        
        this.$axios({
            url:'/category',
            headers:{
                Authorization :JSON.parse(localStorage.getItem('user') || `{}`).token
            }
        }).then(res=>{
            const {data}=res.data;
            this.allCate=data
        })
    }
}