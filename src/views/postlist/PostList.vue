<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="ID" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.$index }}</span>
        </template>
      </el-table-column>
      <el-table-column label="标题" width="500">
        <template slot-scope="scope">
          <span>{{scope.row.title}}</span>
        </template>
      </el-table-column>
      <el-table-column label="显示" width="120">
        <template slot-scope="scope">
          <span>{{scope.row.open === 1?'打开':'关闭'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" :type="scope.row.open===1 ? 'danger':'success'" @click="handleDelete(scope.$index, scope.row)">{{scope.row.open===1 ? '关闭':'打开'}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
    class="paging"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageIndex"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
import config from "./postlist.js";
export default config;
</script>

<style scoped lang="less">
@import url("./postlist.less");
</style>