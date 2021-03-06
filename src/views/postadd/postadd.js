import VueEditor from "vue-word-editor";
import "quill/dist/quill.snow.css"

export default {
    data() {
        return {
            form: {
                categories: [],
                title: '',
                content: '',
                cover: [],
                type: 1
            },
            allCate: [],
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
        onSubmit() {
            const { categories } = this.form;
            const arr = [];
            categories.forEach(e => {
                arr.push({
                    id: e
                })
            })
            const { cover }=this.form;
            cover.forEach((item,index)=>{
                if(item.url.indexOf('http')===-1){
                    item.url=this.$axios.defaults.baseURL+item.url;
                }
            })
            this.form.categories = arr;

            if (this.form.type === 1) {
                this.form.content = this.$refs.vueEditor.editor.root.innerHTML;
            }
           
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
                    this.$message.success(message);
                    
                }

            })

        },
        // 上传图片
        handleAvatarSuccess(res, file) {
            this.form.cover.push(res.data)
        },
        // 移除图片
        handleRemove(file, fileList) {
            const id = file.response.data.id;
            const { cover } = this.form;
            const arr = [];
            cover.forEach(e => {
                if (e.id !== id) {
                    arr.push(e)
                }
            })
            this.form.cover = arr;

        },
        // 视频上传成功
        handleVideo(file) {
            this.form.content = this.$axios.defaults.baseURL + file.data.url;
        }
    },
    mounted() {
        this.token = JSON.parse(localStorage.getItem('user') || `{}`).token;

        this.$axios({
            url: '/category',
            headers: {
                Authorization: JSON.parse(localStorage.getItem('user') || `{}`).token
            }
        }).then(res => {
            const { data } = res.data;
            this.allCate = data
        })
    },
    components: {
        VueEditor
    },
}