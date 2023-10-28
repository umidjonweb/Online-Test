<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import { register_API } from '@/services/auth'


const router = useRouter()
const formRef = ref<FormInstance>()
const _form = ref({
    username: '',
    password:'',
    confirm_password: '',
    email:'',
    firstName:'',
    lastName:''
})
const validatePass2 = (rule: any, value: any, callback: any) => {
   console.log('val', value);
   
  if (!value) {
    callback(new Error("Inputni to'ldiring"))
  } else if (value !== _form.value.password) {
    callback(new Error("Parol xato kiritildi"))
  } else {
    callback()
  }
}

const rules = reactive<FormRules<any>>({
  email: [{required: true, message: "Inputni to'ldiring", trigger: 'blur' }],
  password: [{required: true, message: "Inputni to'ldirish", trigger: 'blur' }],
  firstName: [{required: true, message: "Inputni to'ldirish", trigger: 'blur' }],
  lastName: [{required: true, message: "Inputni to'ldirish", trigger: 'blur' }],
  username: [{required: true, message: "Inputni to'ldirish", trigger: 'blur' }],
  confirm_password: [{ validator: validatePass2, trigger: 'blur' }],
})


const submitForm = () => {
  if (!formRef.value) return
  formRef.value.validate(async(valid) => {
    if (valid) {
      console.log('submit!')
      
      const [response, error] = await register_API(_form.value)
       if(error){
        ElMessage.error(error)
        return
       }
        ElMessage.success("Ro'yxatdan muvofaqiyatli O'tdingiz")
        router.push('/login')
    } else {
      console.log('error submit!')
      return false
    }
  })
}
</script>
<template>
  <NuxtLayout name="auth" class="login flex justify-center items-center h-screen">
        <div class="w-[780px] overflow-hidden flex h-5/6 border border-gray rounded-xl">
            <div class="bg-green w-1/2 flex justify-center items-center">
                <img class="w-3/4"  src="@/assets/img/logos.png" alt="">
            </div>
            <div class="w-1/2 px-7 py-4">
               <div class="">
                  <p class="font-inter-600 text-center text-green-800 font-weight-medium">Registiratsiya</p>
               </div>
              <el-form class="mt-6" @submit.prevent="submitForm" :model="_form" :rules="rules" ref="formRef" label-position="top" >
                <el-form-item label="username" prop="username">
                 <el-input class="border rounded-lg overflow-hidden text-green-800" v-model.trim="_form.username" placeholder="usernameni kiriting"/>
               </el-form-item>
                <el-form-item label="Ism" prop="firstName">
                  <el-input class="border rounded-lg overflow-hidden text-green-800" v-model.trim="_form.firstName" placeholder="Ismni kiriting"/>
                </el-form-item>
                  <el-form-item label="Familiya" prop="lastName">
                  <el-input class="border rounded-lg overflow-hidden text-green-800" v-model.trim="_form.lastName" placeholder="Familiyani kiriting"/>
                </el-form-item>
                    <el-form-item label="email" prop="email">
                  <el-input class="border rounded-lg overflow-hidden text-green-800" v-model.trim="_form.email" placeholder="Emailni kiriting"/>
                </el-form-item>
                <el-form-item label="Parol" prop="password">
                  <el-input type="password" show-password class="border rounded-lg overflow-hidden text-green-800" v-model.trim="_form.password" placeholder="Parolni kiriting"/>
                </el-form-item>
                  <el-form-item label="Parolni takrorlang" prop="confirm_password">
                  <el-input type="confirm_password" show-password class="border rounded-lg overflow-hidden text-green-800" v-model.trim="_form.confirm_password" placeholder="Parolni kiriting"/>
                </el-form-item>
                <el-form-item>
                   <el-button native-type="submit" class="!h-12 !rounded-lg !w-full !bg-green-800 !text-white mt-3">Registatsiyadan o'tish</el-button>
                 </el-form-item>
                 <p class="font-inter-400 text-gray text-center">Ro'yxatdan o'tganmisiz?  <router-link to="/login" class="text-green-800 font-inter-400"> Kirish</router-link></p>
              </el-form>
            </div>
        </div>
    </NuxtLayout>
</template>
<style lang="scss">

.login {
  .el-form-item {
    margin-bottom: 10px;
  }
   .el-form-item__label{
     color: #358589 !important;
   }
   .el-input__wrapper {
    box-shadow: none;
   }
}
</style>
