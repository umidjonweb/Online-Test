<script lang="ts" setup>
import {
  processTest_API,
  postTestCreate_API,
  startTest_API,
  getMyTest_API,
  sertificatDownload_API
} from "@/services/tests";
import { formatDate_UTIL, hours_UTIL } from "@/utils";
import { _loginStore } from "~/services/auth";
const router = useRouter();
const _items = ref<any>({});
const route = useRoute()
const dialogFormVisible = ref(false);
const form = ref({
  name: "",
  totalQuestion: 0,
  totalTime: 0,
  subjectId: "",
});


async function processTest(id) {
  console.log('asdasdsad',id);
  
  const [response, error] = await processTest_API(id);
  console.log("redsdssdsdsd", response);

  _items.value = response;
}
async function handleItem(url) {
  const [response, error] = await sertificatDownload_API(url);
  console.log("11111", response);
   let fileURL = window.URL.createObjectURL(new Blob([response]));
    let fileLink = document.createElement('a');
  
     fileLink.href = fileURL;
     fileLink.setAttribute('download', _items.value.certificateUrl);
     document.body.appendChild(fileLink);
   
     fileLink.click();
}
processTest(route.params.id)
</script>
<template>
  <NuxtLayout>
    <div v-if="_items?.startTime" class="grid grid-cols-2">
        <!-- <p><strong>Yo'nalish: </strong>{{ _items.test.name }}</p> -->
       <div>
          <p>
            <strong>Sarflangan vaqt: </strong
              >{{ hours_UTIL(new Date(_items.endTime) - new Date(_items.startTime))}}
            </p>
            <p>
              <strong> Savollar soni: </strong>{{ _items.test.totalQuestion }}
            </p>
            <p>
              <strong>To'g'ri javoblar soni: </strong>{{ _items.result }}
            </p>
            <p v-if="_items.certificateUrl">
              <a class="text-primary flex items-center"  download target="_blank" :href="`http://217.18.63.130:8004/api/files/v1/certificates?path=${_items.certificateUrl}`">
                <strong>setificatni ko'rish </strong>
                <img class="mt-1" src="@/assets/img/arrow.svg" alt="">
              </a>
            </p>
            <!-- <strong>
              <a @click="handleItem(_items.certificateUrl)">Download</a>
            </strong> -->
            
      </div>
      <div>
        <el-progress :width="200" :stroke-width="12" type="circle" :percentage=" Math.floor((_items.result / _items.test.totalQuestion) * 100)" />
      </div>
    </div>
  </NuxtLayout>
</template>


