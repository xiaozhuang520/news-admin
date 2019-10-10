<template>
  <div class="postadd_page">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-radio-group v-model="form.type">
          <el-radio :label="1">文章</el-radio>
          <el-radio :label="2">视频</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="内容" v-if="form.type===1">
        <VueEditor :config="config" ref="vueEditor" />
      </el-form-item>
      <el-form-item label="视频" v-if="form.type===2">
        <el-upload
          class="upload-demo"
          action="http://127.0.0.1:3000/upload"
          :headers="{
             Authorization:token
          }"
          :on-success="handleVideo"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          
        </el-upload>
      </el-form-item>
     
      <el-form-item label="封面">
        <el-upload
          action="http://127.0.0.1:3000/upload"
          list-type="picture-card"
          :on-success="handleAvatarSuccess"
          :on-remove="handleRemove"
          :headers="{
            Authorization:token
          }"
          :file-list="form.cover"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import config from "./postedit.js";
export default config;
</script>

<style scoped lang="less">
@import url("./postedit.less");
</style>