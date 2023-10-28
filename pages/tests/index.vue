<script lang="ts" setup>
import { Check, Close } from '@element-plus/icons-vue'
import {
  getTestLists_API,
  postTestCreate_API,
  startTest_API,
  _testItems,
  _startTestId,
} from "@/services/tests";
import { getSubjectLists_API, postSubject_API } from "@/services/subjects";
import { formatDate_UTIL } from "@/utils";
import { _loginStore } from "~/services/auth";

const router = useRouter();
const _items = ref([]);
const _optionSubject = ref([]);

const dialogFormVisible = ref(false);
const form = ref({
  name: "",
  totalQuestion: 0,
  totalTime: 0,
  subjectId: "",
  tryCount: 0,
  certified: null,
  certifiedPercentage: 0
});
async function handleTest(item) {
  const [response, error] = await startTest_API(item.id);
  if (error) return;
  _startTestId.value = response;
  console.log("_startTestId.value ", _startTestId.value);

  router.push("/tests/" + _startTestId.value);
}
async function testCreate() {
  const [response, error] = await postTestCreate_API(form.value);
  dialogFormVisible.value = false;
  if (error) return;
  getTestLists();
}
async function getSubjects() {
  const [response, error] = await getSubjectLists_API();
  if (error) console.log("redsdssdsdsd", response);
  _optionSubject.value = response?.content;
}

async function getTestLists() {
  const [response, error] = await getTestLists_API();
  _items.value = response;
}

getSubjects();
getTestLists();
</script>

<template>
  <NuxtLayout>
    <div>
      <div
        v-if="_loginStore.role[0] == 'SUPER_ADMIN'"
        class="flex justify-end items-end my-6"
      >
        <el-button @click="dialogFormVisible = true" type="primary"
          >Test qo'shish</el-button
        >
      </div>
      <el-dialog v-if="dialogFormVisible" v-model="dialogFormVisible" title="Testni qo'shing">
        <el-form label-position="top" :model="form">
          <el-form-item label="Testni nomini kiriting">
            <el-input class="!w-full" v-model="form.name" />
          </el-form-item>
          <div class="grid grid-cols-2 gap-5">
            <el-form-item label="Testni sonini kiriting">
              <el-input
                type="number"
                class="!w-full"
                v-model="form.totalQuestion"
              />
            </el-form-item>
            <el-form-item label="Test Vaqtini kiriting (minut)">
              <el-input
                type="number"
                class="!w-full"
                v-model="form.totalTime"
              />
            </el-form-item>
            <el-form-item class="!w-full" label="Fanni kiriting">
              <el-select
                class="!w-full"
                v-model="form.subjectId"
                clearable
                placeholder="Fanni kiriting"
              >
                <el-option
                  v-for="item in _optionSubject"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
               <el-form-item label="Urinishlar sonini kiriting">
              <el-input type="number" class="!w-full" v-model="form.tryCount" />
            </el-form-item>
            <el-form-item label="Sertificat qo'shish">
              <el-switch v-model="form.certified" :active-icon="Check" :inactive-icon="Close" />
            </el-form-item>
            <el-form-item v-if="form.certified" label="Sertificatning min Bahosi (%)">
              <el-input
               type="number"
               class="!w-full"
               v-model="form.certifiedPercentage"
             />
            </el-form-item>
         
          </div>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogFormVisible = false"
              >Bekor qilish</el-button
            >
            <el-button type="primary" @click="testCreate"> Saqlash </el-button>
          </span>
        </template>
      </el-dialog>
      <div v-if="_items?.content" class="grid grid-cols-3 gap-4">
        <div
          class="border rounded-md p-3"
          v-for="(item, ind) in _items?.content"
          :key="ind"
        >
          <div
            v-if="_loginStore.role[0] != 'SUPER_ADMIN'"
            class="flex justify-end items-end pb-3 cursor-pointer"
          >
            <p
              v-if="item.tryCount > item.triedCount"
              class="text-primary text-end ml-auto inline-block px-2 py-1 bg-primary-600 rounded-md"
              @click="handleTest(item)"
            >
              {{ item.isLastActive ? "Testni davom etish" : "Testni boshlash" }}
            </p>
            <p
              v-else
              class="text-danger text-end ml-auto inline-block px-2 py-1 bg-primary-600 rounded-md"
            >
              Imkoniyatlaringiz tugadi
            </p>
          </div>
          <!-- <p><strong>Test yaratilgan sana: </strong>{{formatDate_UTIL(item.createdDate, false)}}</p> -->
          <p><strong>Yo'nalish: </strong>{{ item.name }}</p>
          <p><strong>Test vaqti: </strong>{{ item.totalTime }} Minut</p>
          <p><strong>Test soni: </strong>{{ item.totalQuestion }}</p>
          <p><strong>Fan nomi: </strong>{{ item.subject.name }}</p>
          <p>
            <strong>Urinishlar soni: </strong>{{ item.triedCount }} /
            {{ item.tryCount }}
          </p>
          <p><strong v-if="item.certified">Sertifikat olishning min balli: </strong>
            {{ item.certifiedPercentage }} %</p>
        </div>
      </div>
      <div v-else>
        <p class="text-center">Sizda hali testlar mavjud emas</p>
      </div>
    </div>
  </NuxtLayout>
</template>

