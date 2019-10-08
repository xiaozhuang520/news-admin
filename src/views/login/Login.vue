<template>
  <el-row type="flex" class="row-bg login_page" justify="center" align="middle">
    <el-row type="flex" class="row-bg login" justify="center">
      <el-form ref="form" :rules="rules" :model="form" label-width="60px">
        <p>登录</p>
        <el-form-item label="账号" prop="username">
          <el-input v-model="form.username" ></el-input>
        </el-form-item>
        <el-form-item label="密码"  prop="password">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item >
          <el-button class="submit" type="primary" @click="submitForm">提交</el-button>
        </el-form-item>
      </el-form>
    </el-row>
  </el-row>
</template>

<script>
import config from "./login";
export default config;
</script>

<style scoped lang="less">
@import url("./login.less");
</style>