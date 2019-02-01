<template>
    <div class="login-wrap">
        <h1></h1>
        <div class="login-box">
            <el-form ref="loginForm" label-position="top" :model="loginForm" :rules="rules" label-width="80px">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="loginForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="loginForm.password"></el-input>
                </el-form-item>
                <el-form-item class="btn-margin-top">
                    <el-button type="primary" @click="onSubmit('loginForm')">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                loginForm: {
                    username: '',
                    password:''
                },
                rules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$store.dispatch('Login', this.loginForm).then(() => {
                            this.$router.push({ path: 'dashboard' })
                        })
                    } else {
                        alert('error submit!!');
                        return false;
                    }
                })
            }
        }
    }
</script>

<style scoped lang="less">
    .login-wrap {
        width: 360px;
        height: 400px;
        margin: 100px auto;
        h1 {
            width: 180px;
            height: 80px;
            margin: 0 auto;
            background: url("../../assets/images/login-logo.png") no-repeat;
        }
        .login-box {
            box-shadow: 0 0 20px rgba(0,0,0,.2);
            border-radius: 4px;
            padding: 32px;
            .el-form--label-top .el-form-item__label {
                line-height: 24px !important;
            }
            .btn-margin-top {
                margin-top: 50px;
            }
        }
    }
</style>
<style lang="less">
    .login-box {
        .el-form-item__label {
            line-height: 24px !important;
        }
        .el-button--primary {
            width: 100%;
        }
    }
</style>