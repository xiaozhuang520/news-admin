<template>
  <div class="postadd_page">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="文章内容">
        <textarea cols="100" rows="10" v-model="form.content"></textarea>
      </el-form-item>
      <el-form-item label="栏目">
        <el-checkbox-group v-model="form.category">
          <el-checkbox
            :label="item.id"
            name="type"
            v-for="(item,index) in allCate"
            :key="index"
            v-if="item.id !==999"
          >{{item.name}}</el-checkbox>
        </el-checkbox-group>
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
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="类型">
        <el-radio v-model="radio" label=1>文章</el-radio>
        <el-radio v-model="radio" label=2>视频</el-radio>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import config from "./postadd.js";
export default config;
</script>

<style scoped lang="less">
@import url("./postadd.less");
</style>