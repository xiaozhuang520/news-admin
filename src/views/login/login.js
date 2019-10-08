
export default {
    data() {
        return {
            form: {
                username: '',
                password: ''
            },
            rules: {
                username: [
                    { required: true, message: '请输入账号', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]
            }


        }
    },
    methods: {
        submitForm() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    this.$axios({
                        url: '/login',
                        method: 'post',
                        data: this.form
                    }).then(res => {
                        const { message, data } = res.data;
                        if (res.data.statusCode === 401) {
                            this.$message.error(message);
                        }
                        if (message === '登录成功') {
                            this.$message.success(message);
                            localStorage.setItem('user', JSON.stringify(data))
                            setTimeout(() => {
                                this.$router.push('/')
                            }, 1000)
                        }
                    })
                } else {
                    this.$message.error('error submit!!');
                    return false;
                }
            })

        }
    },
    mounted() {

    }
}