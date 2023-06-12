<template>
  <el-form :inline="true">
    <el-form-item label="菜单名称">
      <el-input v-model="input" placeholder="请输入菜单名称" style="width: 200px" clearable />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" :icon="Search" @click="getList" style="margin-left: -20px"
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
      @click="handleAdd"
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

    <el-table-column prop="authority" label="权限" sortable
      ><template #default="{ row }">
        <el-switch v-model="row.authority" :active-value="1" :inactive-value="0" />
      </template>
    </el-table-column>
    <el-table-column label="Operations">
      <template #default="scope">
        <el-button
          size="small"
          type="primary"
          text
          :icon="EditPen"
          @click="handleEdit(scope.row)"
          >修改</el-button
        >
        <el-button
          size="small"
          type="primary"
          text
          @click="handleDelete(scope.row.id)"
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
      <el-form-item label="菜单类型 " prop="isCatalogue">
        <el-radio-group v-model="form.isCatalogue" class="ml-4" @input="input">
          <el-radio :label="1" size="large">目录 </el-radio>
          <el-radio :label="0" size="large">菜单 </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="选择目录" prop="parentId" v-if="form.isCatalogue == 0">
        <el-select v-model="form.parentId" placeholder="请选择目录">
          <el-option label="无" :value="0" />
          <el-option
            v-for="item in catalogueList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
            v-show="item.isCatalogue == 1"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="是否显示 ">
        <el-switch v-model="form.showOrNot" :active-value="1" :inactive-value="0" />
      </el-form-item>

      <el-form-item label=" 路由地址" prop="name">
        <el-input v-model="form.path" clearable />
      </el-form-item>
      <el-form-item label=" 文件位置" prop="name">
        <el-input v-model="form.fileAddress" clearable />
      </el-form-item>

      <el-form-item label="是否缓存 " prop="region">
        <el-radio-group v-model="form.keepAlive" class="ml-4">
          <el-radio :label="1" size="large">缓存 </el-radio>
          <el-radio :label="0" size="large">不缓存 </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="排序">
        <el-input-number v-model="form.level" :min="1" :max="99" />
      </el-form-item>

      <el-form-item label="权限标志 " prop="region">
        <el-switch v-model="form.authority" :active-value="1" :inactive-value="0" />
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
        <el-button type="primary" @click="confirm">确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { getRouteList,addRouter,deleteRouter } from '@/api/system.js'
import { ElMessage } from 'element-plus'
import { Search, Plus, EditPen, Delete } from '@element-plus/icons-vue'
import { onBeforeMount, ref } from 'vue'
import { reactive } from 'vue'
let form = ref({})
let asideMenu = ref([])
let catalogueList = ref([])
const input = ref('')
const dialogVisible = ref(false)

const getList = async (initial = false) => {
  let { data } = await getRouteList({ name: input.value })
  console.log(data);
  if (data.status == 0) {
    asideMenu.value = data.data
    if (initial) {
      catalogueList.value = data.data
    }
  }
}
//重置表单
const resetForm = () => {
  form.value = {
    name: '',
    showOrNot: true,
    path: '',
    level: 1,
    fileAddress: '',
    keepAlive: '',
    isCatalogue: 0,
    authority: true,
    parentId: 0
  }
}
//新增
const handleAdd = () => {
  dialogVisible.value = true
  resetForm()
}
const handleEdit = (row) => {
  console.log(row);
  dialogVisible.value = true
  form.value = row
}
const handleDelete = async (id) => {
  await deleteRouter(id)
  ElMessage({
    message: '删除成功',
    type: 'success'
  })
  await getList()
}

onBeforeMount(() => {
  getList(true)
  resetForm()
})

const rules = reactive({
  name: [{ required: true, message: '请输入值', trigger: 'blur' }]
})

const confirm = async () => {
  await addRouter(form.value)
  ElMessage({
    message: form.value.id ? '修改成功' : '添加成功',
    type: 'success'
  })
  dialogVisible.value = false
  await getList()
}
</script>

<style scoped></style>
