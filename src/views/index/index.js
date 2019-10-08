export default {
    data(){
        return {
            user:{
                user:{}
            }
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