<script setup lang="ts">
import { _loginStore } from '@/services/auth'


</script>

<template>
  <div class="">
    <div class="w-full flex items-center justify-between bg-green-dark px-10 border border-b-white ">
         <router-link to="/login" class="test-2xl text-white">
          <img class="h-8" src="@/assets/img/logos.png" alt="">
         </router-link>
         <div class="py-4 px-6 flex gap-1 items-center">
           <img src="@/assets/img/person.png" alt="">
           <div>
               <p class="text-white font-poppins-600 mt-1 text-lg leading-3">{{ _loginStore.sub }}</p>
               <span class="font-poppins-400 text-white text-[11px] leading-3">{{ _loginStore.role[0] }}</span>
           </div>
      </div>
    </div>
    <div class="bg-green-dark flex justify-between h-screen py-5">
      <Sidebar />
      <div style="width: calc(100vw - 270px)" class="rounded-2xl grow bg-white h-full py-6 px-8 overflow-auto">
        <slot />
      </div>

    </div>
  </div>
</template>