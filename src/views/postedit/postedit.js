import VueEditor from "vue-word-editor";
import "quill/dist/quill.snow.css"

export default {
    data() {
        return {
            form: {
                title: '',
                content: '',
                cover: [],
                type: 1
            },
            token: '',
            config: {
                // 上传图片的配置
                uploadImage: {
                    url: this.$axios.defaults.baseURL + "/upload",
                    name: "file",
                    headers: {
                        Authorization: JSON.parse(localStorage.getItem('user') || `{}`).token
                    },
                    // res是结果，insert方法会把内容注入到编辑器中，res.data.url是资源地址
                    uploadSuccess: (res, insert) => {
                        insert(this.$axios.defaults.baseURL + res.data.data.url)
                    }
                },

                // 上传视频的配置
                uploadVideo: {
                    url: this.$axios.defaults.baseURL + "/upload",
                    name: "file",
                    uploadSuccess: (res, insert) => {
                        insert(this.$axios.defaults.baseURL + res.data.url)
                    }
                }
            }


        }
    },
    methods: {
        // 编辑文章或视频
        onSubmit() {
            if (this.form.type === 1) {
                this.form.content = this.$refs.vueEditor.editor.root.innerHTML;
            }
            this.$axios({
                url:'/post_update/'+this.$route.params.id,
                method:'post',
                headers:{
                    Authorization :JSON.parse(localStorage.getItem('user') || `{}`).token
                },
                data:this.form
            }).then(res=>{
                const {message}=res.data;
                if(message==='文章编辑成功'){
                    this.$message.success(message);

                }
            })

        },
        // 上传图片
        handleAvatarSuccess(res, file) {
            if (res.data.url.indexOf('http') === -1) {

                res.data.url = this.$axios.defaults.baseURL + res.data.url;
            }
            delete res.data.uid
            
            this.form.cover.push(res.data)
            
        },
        // 移除图片
        handleRemove(file, fileList) {
            this.form.cover = fileList;

        },
        // 视频上传成功
        handleVideo(file) {
            this.form.content = this.$axios.defaults.baseURL + file.data.url;
        }
    },
    mounted() {
        // 获取token
        this.token = JSON.parse(localStorage.getItem('user') || `{}`).token;

        this.$axios({
            url: '/post/' + this.$route.params.id
        }).then(res => {
            const { data } = res.data;
            this.form = {
                title: data.title,
                type: data.type,
                content: this.$refs.vueEditor.editor.clipboard.dangerouslyPasteHTML(0, data.content),
                cover: data.cover
                
            }
            const { cover }=this.form;
            cover.forEach((item,index)=>{
                if(item.url.indexOf('http')===-1){
                    item.url=this.$axios.defaults.baseURL+item.url;
                }
            })
        })
    },
    components: {
        VueEditor
    },
}