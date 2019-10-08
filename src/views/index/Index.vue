<template>
  <el-container class="container">
    <el-aside width="200px">
      <h1>黑马头条</h1>
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo menu"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>文章管理</span>
          </template>
          <router-link to="/postlist">
              <el-menu-item index="1-1">文章列表</el-menu-item>
          </router-link>
          <router-link to="/postadd">
              <el-menu-item index="1-2">发布文章</el-menu-item>
          </router-link>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header>
          <img class="head" :src="$axios.defaults.baseURL+user.user.head_img" alt="">
          <i>{{user.user.nickname}}</i>
          <span @click="handleLoginOut">退出</span>
      </el-header>
      <el-main>
        <div class="bread_crumbs">{{breaks}}</div>
          <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import config from "./index.js";
export default config;
</script>

<style scoped lang="less">
@import url("./index.less");
</style>