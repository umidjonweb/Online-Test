<template>
  <NuxtLayout>
    <div v-if="_items?.length" class="grid grid-cols-3 gap-4">
      <div
        class="border rounded-md p-3"
        v-for="(item, ind) in _items"
        :key="ind"
      >
        <div class="flex cursor-pointer justify-end items-end mb-3">
          <p
            v-if="item.status == 'ENDED'"
            class="text-danger text-end ml-auto inline-block px-2 py-1 bg-primary-600 rounded-md"
            @click="handleTest(item)"
          >
            Test tugadi
          </p>
          <p
            v-else
            class="text-primary text-end ml-auto inline-block px-2 py-1 bg-primary-600 rounded-md"
            @click="handleTest(item)"
          >
            Davom ettirish
          </p>
        </div>
        <p><strong>Yo'nalish: </strong>{{ item.test.name }}</p>
        <p>
          <strong>Sana va vaqti:: </strong
          >{{ formatDate_UTIL(item.endTime, false) }}
        </p>
        <p>
          <strong>Sarflangan vaqt: </strong
          >{{ hours_UTIL(new Date(item.endTime) - new Date(item.startTime))}}
        </p>
        <p>
          <strong> Savollar soni: </strong>{{ item.test.totalQuestion }}
        </p>
        <p>
          <strong>To'g'ri javoblar soni: </strong>{{ item.result }}
        </p>
        <p>
          <strong>Natija:</strong>
          {{
            item.result == null
              ? "davom etmoqda"
              : Math.floor((item.result / item.test.totalQuestion) * 100)
          }}{{ item.result != null ? "% " : "" }}
        </p>
        <p>
          <strong>Jami urinishlar soni: </strong>
          {{ item.test.tryCount }}  
        </p>
        <p>
          <strong>Sizning urinishlariz soni: </strong>{{ item.test.triedCount }} 
        </p>
             <p v-if="item.certificateUrl">
              <a class="text-primary flex items-center"  download target="_blank" :href="`http://217.18.63.130:8004/api/files/v1/certificates?path=${item.certificateUrl}`">
                <strong>setificatni ko'rish </strong>
                <img class="mt-1" src="@/assets/img/arrow.svg" alt="">
              </a>
            </p>
      </div>
    </div>
    <div v-else>
      <p class="text-center">Sizda hali natijalar mavjud emas</p>
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import {
  getTestLists_API,
  postTestCreate_API,
  startTest_API,
  getMyTest_API,
} from "@/services/tests";
import { getSubjectLists_API, postSubject_API } from "@/services/subjects";
import { formatDate_UTIL, hours_UTIL } from "@/utils";
import { _loginStore } from "~/services/auth";
const router = useRouter();
const _items = ref([]);

const dialogFormVisible = ref(false);
const form = ref({
  name: "",
  totalQuestion: 0,
  totalTime: 0,
  subjectId: "",
});
async function handleTest(item) {
  console.log("dddd", item);

  item.status == "STARTED"
    ? router.push(`/tests/${item.id}`)
    : router.push(`/tests/${item.id}`);
}

async function getMyTest() {
  const [response, error] = await getMyTest_API();
  if (error) console.log("redsdssdsdsd", response);
  _items.value = response?.content;
}
getMyTest();

</script>
