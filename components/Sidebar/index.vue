<script lang="ts" setup>
import { _loginStore } from '@/services/auth'

const _links = computed(()=> { 
    if(_loginStore.value?.role[0] === 'SUPER_ADMIN'){
        return [
        {
              "to": "/admin/users",
              "title": "Userlar ro'yhati",
              "img": resolveComponent("IconDriver"),
              "activeClass": "users"
          },  
       
          {
              "to": "/admin/questionList",
              "title": "Savollar",
              "img": resolveComponent("IconQuestion"),
              "activeClass": "testList"
          },     
            {
              "to": "/subject",
              "title": "Fanlar",
              "img": resolveComponent("IconTest"),
              "activeClass": "subject"
          },     
          {
              "to": "/tests",
              "title": "Testlar",
              "img": resolveComponent("IconDriver"),
              "activeClass": "tests"
          },
          {
              "to": "/lesson",
              "title": "Video Darslar",
              "img": resolveComponent("IconVideo"),
              "activeClass": "lesson"
          },
      
        ]
    }
      if(_loginStore.value.role[0] === 'USER'){
        
          return  [
          {
              "to": "/dashbords",
              "title": "dashbord",
              "img": resolveComponent("IconDashbord"),
               "activeClass": "dashbord"
          },
           {
              "to": "/tests",
              "title": "Testlar",
              "img": resolveComponent("IconDriver"),
              "activeClass": "tests"
          },
          {
              "to": "/myTests",
              "title": "Natijalarim",
              "img": resolveComponent("IconDriver"),
              "activeClass": "myTests"
          },
           {
              "to": "/lesson",
              "title": "Video Darslar",
              "img": resolveComponent("IconVideo"),
              "activeClass": "lesson"
          },
      ]
    }
}
)

</script>
<template>
    <div class="sidebar w-[270px]">
        <h4 class="font-montserrat-800 text-xs text-white/60 px-7 mb-7">Menyular</h4>
        <div v-for="link, ind in _links" :key="ind">    
            <NuxtLink :to="link.to" :class="$route.path.includes(link.activeClass) ? 'router-link-active' : ''" class="relative ml-2 flex gap-3 items-center px-5 py-3 mt-1 rounded-l-3xl">
                <img class="absolute right-0 -top-6  z-0 hidden" src="@/assets/img/top.svg" alt="">
                <img class="absolute right-0 -bottom-6   z-0 hidden" src="@/assets/img/bottom.svg" alt="">
                <component class="w-4 h-4" :is="link.img"></component>
                <p class="font-montserrat-600 text-sm text-white">{{ link.title }}</p>
            </NuxtLink>
        </div>
    </div>
</template>
<style lang="scss">
 .sidebar {   
     .router-link-active{
        background: white;
        img{
            display: block;
        }
        p{
            color: #025256;
        }
     }
 }
</style>