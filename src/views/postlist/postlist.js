export default {
    data() {
        return {
            tableData: [],
            pageIndex: 1,
            pageSize: 5,
            total: 1
        }
    },
    methods: {
        handleEdit(index, row) {
            this.$router.push('/post_edit/'+row.id)
        },
        handleDelete(index, row) {
            const id = row.id
            this.$axios({
                url: '/post_update/' + id,
                method: 'post',
                headers: {
                    Authorization: JSON.parse(localStorage.getItem('user') || `{}`).token
                },
                data: {
                    open: row.open === 1 ? 0 : 1
                }
            }).then(res=>{
                const {message}=res.data;
                
                if(message==='文章编辑成功'){
                    this.$message.success(message)
                    this.getPostList();
                }
            })
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.getPostList();
        },
        handleCurrentChange(val) {
            this.pageIndex = val;
            this.getPostList();
        },
        // 获取文章列表的函数
        getPostList() {
            this.$axios({
                url: `/post?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`
            }).then(res => {
                const { data } = res.data
                this.tableData = data
            })
        }
    },
    mounted() {
        // 获取所有文章列表
        this.getPostList();
        // 获取总文章数量
        this.$axios({
            url: `/post?pageIndex=${this.pageIndex}&pageSize=999`
        }).then(res => {
            const { data } = res.data
            this.total = data.length;
        })
    }
}