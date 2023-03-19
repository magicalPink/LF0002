<template>
  <el-form :inline="true">
    <el-form-item label="菜单名称">
      <el-input v-model="input" placeholder="请输入菜单名称" style="width: 200px" clearable />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" :icon="Search" @click="search" style="margin-left: -20px"
        >搜索</el-button
      >
    </el-form-item>
  </el-form>
  <el-row>
    <el-button
      type="primary"
      plain
      :icon="Plus"
      style="margin-bottom: 20px"
      @click="dialogVisible = true"
      >新增</el-button
    ></el-row
  >
  <el-table
    :data="asideMenu"
    style="width: 100%; margin-bottom: 20px"
    row-key="id"
    border
    default-expand-all
  >
    <el-table-column prop="name" label="菜单名称" width="180" sortable />
    <el-table-column prop="path" label="路径" width="380" sortable />
    <el-table-column prop="fileAddress" label="文件地址" sortable />
    <el-table-column prop="jurisdiction" label="权限" sortable />
    <el-table-column label="Operations">
      <template #default="scope">
        <el-button
          size="small"
          type="primary"
          text
          :icon="EditPen"
          @click="handleEdit(scope.$index, scope.row)"
          >修改</el-button
        >
        <el-button
          size="small"
          type="primary"
          text
          @click="handleDelete(scope.$index, scope.row)"
          :icon="Delete"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>

  <el-dialog v-model="dialogVisible" title="添加菜单" width="30%">
    <el-form :model="form" label-width="120px" :rules="rules">
      <el-form-item label=" 名称" prop="name">
        <el-input v-model="form.name" clearable />
      </el-form-item>
      <el-form-item label="类型 " prop="region" class="mb-2 flex items-center text-sm">
        <el-radio-group v-model="form.region" class="ml-4">
          <el-radio label="1" size="large">目录 </el-radio>
          <el-radio label="2" size="large">菜单 </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="父级目录 " prop="name">
        <el-select v-model="form.region2">
          <el-option label=" 父级" value="shanghai" />
          <el-option label="目录" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label=" 路由地址" prop="name">
        <el-input v-model="form.path" clearable />
      </el-form-item>
      <el-form-item label=" 文件位置" prop="name">
        <el-input v-model="form.fileAddress" clearable />
      </el-form-item>
      <el-form-item label="是否缓存 " prop="region" class="mb-2 flex items-center text-sm">
        <el-radio-group v-model="form.keepAlive" class="ml-4">
          <el-radio label="1" size="large">缓存 </el-radio>
          <el-radio label="2" size="large">不缓存 </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="排序 ">
        <el-input-number v-model="form.sort" :min="1" :max="10" />
      </el-form-item>
      <el-form-item label="显示状态 " prop="region" class="mb-2 flex items-center text-sm">
        <el-radio-group v-model="form.loading" class="ml-4">
          <el-radio label="1" size="large">目录 </el-radio>
          <el-radio label="2" size="large">菜单 </el-radio>
        </el-radio-group>
        <el-form-item label="权限标志 " prop="region" class="mb-2 flex items-center text-sm">
          <el-switch v-model="form.isshow" />
        </el-form-item>
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">确定</el-button>
        <el-button type="primary" @click="dialogVisible = false"> 取消 </el-button>
      </span>

    </template>
  </el-dialog>
</template>

<script setup>
import asideMenu from '@/router/asideMenu.js'
import { getRouteList } from '@/api/system.js'
import { Search, Plus, EditPen, Delete } from '@element-plus/icons-vue'
import {onBeforeMount, ref} from 'vue'
import { reactive } from 'vue'
const form = reactive({
  name: '',
  region: '',
  region2: '',
  path: '',
  sort: 1,
  fileAddress: '',
  keepAlive: '',
  loading: '',
  isshow: true
})
const input = ref('')

const dialogVisible = ref(false)

const getRouteList1 = async () => {
  let { data } = await getRouteList()
}

const search = () => {
  console.log(input.value)
  console.log(asideMenu)
}
const handleEdit = (index, row) => {
  console.log(index, row)
}
const handleDelete = (index, row) => {
  console.log(index, row)
}

onBeforeMount(() => {
  getRouteList1()
})

const rules = reactive({
  name: [{ required: true, message: 'Please input activity form', trigger: 'blur' }]
})
</script>

<style scoped></style>
