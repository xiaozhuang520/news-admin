export default {
    data(){
        return {
            user:{
                user:{}
            },
            
        }
    },
    computed:{
        breaks(){
            const {matched}=this.$route;
            const arr=[];
            matched.forEach(e=>{
                arr.push(e.meta)
            })
            return arr.join(' / ')
        }
    },
    methods:{
        handleLoginOut(){
           localStorage.removeItem('user')
           this.$router.push('/login')
        }
    },
    mounted(){
       this.user=JSON.parse(localStorage.getItem('user') || `{}`)
    }
}