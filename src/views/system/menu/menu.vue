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

    <el-table-column prop="jurisdiction" label="权限" sortable
      ><template #default="{ row }">
        <el-switch
          v-model="row.jurisdiction"
          active-color="#1890FF"
          inactive-color="#A9A8A8"
          @change="turn(row)"
        />
      </template>
    </el-table-column>
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
      <el-form-item label="是否显示 " prop="region" class="mb-2 flex items-center text-sm">
        <el-switch v-model="form.showOrNot" />
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
        <el-input-number v-model="form.level" :min="1" :max="10" />
      </el-form-item>
      <el-form-item label="显示状态 " prop="region" class="mb-2 flex items-center text-sm">
        <el-radio-group v-model="form.isCatalogue" class="ml-4" @input="input">
          <el-radio label="1" size="large">目录 </el-radio>
          <el-radio label="2" size="large">菜单 </el-radio>
        </el-radio-group>

        <el-form-item label="权限标志 " prop="region" class="mb-2 flex items-center text-sm">
          <el-switch v-model="form.jurisdiction" />
        </el-form-item>
      </el-form-item>
      <el-form-item label="请选择目录" v-show="form.isCatalogue==2">
        <el-select v-model="form.parentId" placeholder="请选择目录" >
          <el-option v-for="item in asideMenu2" :key="item.id" :label="item.name" :value="item.id" v-show="item.isCatalogue==1">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirm" >确定  </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
// import asideMenu from '@/router/asideMenu.js'
import { getRouteList } from '@/api/system.js'
import { addRouter } from '@/api/system.js'
import { ElMessage } from 'element-plus'
import { Search, Plus, EditPen, Delete } from '@element-plus/icons-vue'
import { onBeforeMount, ref } from 'vue'
import { reactive } from 'vue'
import { login } from '@/api/user.js'
const form = reactive({
  name: '',
  showOrNot: true,
  path: '',
  level: '',
  fileAddress: '',
  keepAlive: '',
  isCatalogue: '1',
  jurisdiction: true,
  parentId: ''
})
// const jurisdiction=ref(1)
let asideMenu = ref([])
let asideMenu2 = ref([])
const input = ref('')

const dialogVisible = ref(false)

const getRouteList1 = async () => {
  let { data } = await getRouteList()
  console.log(data.data)
  if (data.status == 0) {
    asideMenu.value = data.data
    asideMenu2.value = data.data
    console.log(asideMenu2)
  }
}

const search = async () => {
  console.log(input.value)
  console.log(input)
  let { data } = await getRouteList({ name: input.value })
  console.log(data.data)
  if (data.status == 0) {
    asideMenu.value = data.data
  }
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
  name: [{ required: true, message: '请输入值', trigger: 'blur' }]
})
const turn = (row) => {
  let list = asideMenu
  for (let i = 0; i < list.length; i++) {
    if (list[i].id == row.id) {
      list[i].enable = row.enable
    }
  }
  asideMenu = list
}
// const input=()=>{
//   console.log(111)
// }
const confirm = async () => {
  let { data } = await addRouter(form)
  console.log(data)
  if (data.status == 0) {
    ElMessage({
      message: '添加成功',
      type: 'success'
    })
    dialogVisible.value = false
    getRouteList1()
  }
}
</script>

<style scoped></style>
