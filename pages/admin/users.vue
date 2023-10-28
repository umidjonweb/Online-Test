    <script lang="ts" setup>
    import { formatDate_UTIL } from "@/utils"
      import {  AxiosResponse} from "@/services/axios";
      import { userList_API, UserModel, UserBlock_API, updateUserVerify_API} from '@/services/users'
      const _items = ref<UserModel[]>([])
      const _payload = ref({
          page: 0,
          size: 10,
          verified: null
      })
       const handleClick = () => {
        console.log('click')
      }
      async function getUsers(){
        const [response, error] = await userList_API()
        if(error) return
        _items.value = response
      }
      getUsers()

      async function userBlock(id){
        const [response, error] = await UserBlock_API(id)
        if(error){
        ElMessage.error(error)
        return
       }
       ElMessage.success("User Rad etildi")
       getUsers()
      }
      
      async function userVerify(id){
        const [response, error] = await updateUserVerify_API(id)
        if(error){
          ElMessage.error(error)
          return
        }
        ElMessage.success("User tasdiqlandi!!")

      getUsers()

      }
      const tableData = [
        {
          date: '2016-05-03',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036',
          tag: 'Home',
        },
        {
          date: '2016-05-02',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036',
          tag: 'Office',
        },
        {
          date: '2016-05-04',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036',
          tag: 'Home',
        },
        {
          date: '2016-05-01',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036',
          tag: 'Office',
        },
      ]
    </script>
<template>
  <NuxtLayout>
    <div>Userlar ro'yxati</div>
    <div class="">
     <el-table :data="_items.content" style="width: 100%">
    <el-table-column fixed prop="email" label="Email" width="150" />
    <el-table-column prop="username" label="Username" width="120" />
    <el-table-column prop="firstName" label="Ism" width="120" />
    <el-table-column prop="lastName" label="Familiya" width="120" />
    <el-table-column prop="createdDate" label="Yaratilgan sana" width="210">
       <template #default='scope'>
           <p>{{ formatDate_UTIL(scope.row.createdDate) }}</p>
      </template>
    </el-table-column>
    <el-table-column prop="lastModifiedDate" label="lastModifiedDate" width="220">
        <template #default='scope'>
           <p>{{ formatDate_UTIL(scope.row.lastModifiedDate) }}</p>
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="Status" width="220">
         <template #default='scope'>
          <el-button link type="primary" size="small" @click="userVerify(scope.row.id)">Tasdiqlash</el-button>
        <el-button link type="danger" size="small" @click="userBlock(scope.row.id)">Rad etish</el-button>
      </template>
    </el-table-column>
  </el-table>
    </div>
  </NuxtLayout>
</template>


<style>

</style>