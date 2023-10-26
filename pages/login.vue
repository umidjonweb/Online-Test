<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import { _loginStore, login_API } from '@/services/auth'

const router = useRouter()
const formRef = ref<FormInstance>()
const _form = ref({
    login: '',
    password:''
})

const rules = reactive<FormRules<any>>({
  login: [{required: true, message: "Maydonni to'ldiring", trigger: 'blur' }],
  password: [{required: true, message: "Maydonni to'ldiring", trigger: 'blur' }],
})

const submitForm = () => {

  if (!formRef.value) return
  formRef.value.validate(async(valid) => {
    if (valid) {
      const [response, error] = await login_API(_form.value.login, _form.value.password)
      if(error) return
      console.log(error,response);
      
      if(response?.token){
       _loginStore.value =  await parseJwt(response.token)

       if(_loginStore.value.role[0] === 'SUPER_ADMIN'){
         router.push('/admin/users')
       }
        else if(_loginStore.value.role[0] === 'USER'){
         router.push('/dashbords')
       }
      }

    } else {
      console.log('error submit!')
      return false
    }
  })
}
function parseJwt (token: string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return {token: token, ...JSON.parse(jsonPayload)};
}
</script>
<template>
  <NuxtLayout
    name="auth"
    class="login flex justify-center items-center h-screen"
  >
    <div
      class="w-[780px] overflow-hidden flex h-3/4 border border-gray rounded-xl"
    >
      <div class="bg-green w-1/2 flex justify-center items-center">
        <img class="w-3/4"  src="@/assets/img/logos.png" alt="">
      </div>
      <div class="w-1/2 px-7 py-16">
        <div class="flex items-center gap-2">
          <img src="@/assets/img/login.svg" alt="" />
          <p class="font-inter-600 text-center font-weight-medium">
            Online Test tizimi
          </p>
        </div>
        <h3 class="text-center font-inter-600 text-xl mt-16 mb-10">Login</h3>
        <el-form
          @submit.prevent="submitForm"
          :model="_form"
          :rules="rules"
          ref="formRef"
          label-position="top"
        >
          <el-form-item label="username" prop="login">
            <el-input
              class="border rounded-lg overflow-hidden text-green-800"
              v-model.trim="_form.login"
              placeholder="Введите логин"
            />
          </el-form-item>
          <el-form-item label="Parol" prop="password">
            <el-input
              class="border rounded-lg overflow-hidden text-green-800"
              v-model.trim="_form.password"
              placeholder="Maydonni to'ldiring"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              native-type="submit"
              class="!h-12 !rounded-lg !w-full !bg-green-800 !text-white mt-3"
              >Войти</el-button
            >
          </el-form-item>
          <p class="font-inter-400 text-gray text-center">
            Parolni unutdingizmi?
            <router-link
              to="/register"
              class="text-green-800 font-inter-400"
              href="!#"
            >
              Registratsiyadan o'tish</router-link
            >
          </p>
        </el-form>
      </div>
    </div>
  </NuxtLayout>
</template>
<style lang="scss">
.login {
  .el-form-item__label {
    color: #358589 !important;
  }
  .el-input__wrapper {
    box-shadow: none;
  }
}
</style>
