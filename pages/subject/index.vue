<script lang="ts" setup>
 import {getSubjectLists_API, postSubject_API} from "@/services/subjects"
 import { formatDate_UTIL } from "@/utils"
 const dialogFormVisible = ref(false)
const _items  = ref([])
const form = ref({
  name: ''
})

  async  function getSubjects(){
      const [response, error] = await getSubjectLists_API()
      if(error)
      console.log('re' , response);
    _items.value = response.content
  }
  getSubjects()
     async  function postSubject(){
      const [response, error] = await postSubject_API(form.value)
      await getSubjects()
      dialogFormVisible.value = false
      
  }
</script>


<template>
  <NuxtLayout>
<div >
    <div class="flex justify-end items-end my-6">
        <el-button   @click="dialogFormVisible = true"  type="primary">Fan qo'shish</el-button>
    </div>
      <el-dialog v-if="dialogFormVisible"  v-model="dialogFormVisible" title="Fanni qo'shing">
        <el-form label-position="top" :model="form">
          <el-form-item label="Fanni nomini kiriting" >
            <el-input class="!w-full"  v-model="form.name"  />
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogFormVisible = false">Bekor qilish</el-button>
            <el-button type="primary" @click="postSubject">
              Saqlash
            </el-button>
          </span>
        </template>
      </el-dialog>

    <div v-if="_items?.length" class="grid grid-cols-3 gap-4">
        <div class="border rounded-md p-3" v-for="item,ind in  _items" :key="ind">
          <div class="flex justify-end items-end pb-3 ">
            <router-link class="text-primary text-end ml-auto inline-block px-2 py-1 bg-primary-600 rounded-md" :to="`/subject/${item.id}`">Test qo'shish</router-link>
          </div>
          <p><span class=""> <strong>Fan yaratilgan sana: </strong></span>{{formatDate_UTIL(item.createdDate)}}</p>
           <p><strong>Fan nomi: </strong>{{item.name}}</p>
        </div>
    </div>
          
    </div>
  </NuxtLayout>
</template>


<style scoped>

.el-button {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>