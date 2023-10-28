<script lang="ts" setup>
import { ref } from "vue";
import {
  getTestLists_API,
  postTestCreate_API,
  startTest_API,
  processTest_API,
  putSelectTest_API,
  finishMyTest_API
} from "@/services/tests";

const router = useRouter();
const route = useRoute();

const outerVisible = ref(false)
const innerVisible = ref(false)

const _itemsCount = ref([]);
const _testItems = ref({});
const _payload = ref({
  id: route.params?.id,
  formId: "",
  questionId: "",
});
const radio = ref("");
const activeCount = ref(route?.query?.id ? route.query.id : 0);


async function putSelectTest(content: any, item: any) {
  _payload.value.questionId = content.id;
  _payload.value.formId = item.id;
  const [response, error] = await putSelectTest_API(_payload.value);
  if (error) return;
}

async function processTest() {
  const [response, error] = await processTest_API(route.params.id);
  console.log("res", response);
  if (error) return;
  _testItems.value = response
  console.log('activeCount.value-1' , activeCount.value);
  
  radio.value = _testItems.value?.questions[activeCount.value]?.selected
}
processTest()

async function nextTest(id){
  console.log(id,_testItems.value?.questions?.length);
  radio.value = ''
  if(id == 0 || _testItems.value?.questions?.length + 1 == id) return
  router.push({ path: "/tests/" + route.params.id, query: { id: id } });
  activeCount.value = id - 1;
  await processTest()
}
async function handleFinish() {
  outerVisible.value = false
  const [response, error] = await finishMyTest_API(route.params.id);
  console.log("res", response);
  if (error) return;
   ElMessage.success("Test muvofaqiyatli tugatildi")
   router.push(`/tests/${route.params.id}/finish`)
}

const { timer,startTimer, stopTimer } = useTimer(_testItems.value?.id, +new Date(_testItems.value?.endTime))
onUnmounted(stopTimer)
watch(()=> startTimer(+new Date(_testItems.value?.endTime)))

</script>
<template>
  <NuxtLayout>
    <div v-if="_testItems?.questions?.length">
      <div  class="flex justify-between items-end">
        <div>
           <p class="text-2xl font-montserrat-600">{{_testItems.test.name}}</p>
           <p class="text-xl font-montserrat-600"> Test tugash vaqti: <strong class="text-secondary text-xl font-manrope-500 ml-2" v-html="(timer !='0' ? timer : 'Vaqt tugadi')"></strong></p>
        </div>
        <el-button v-if="timer !='0'" @click="outerVisible = true" type="primary">Tugatish</el-button>

      </div>
    <div>
       <!-- <el-button text @click="outerVisible = true">
     Tugatish
  </el-button> -->

  <el-dialog v-model="outerVisible" title="Outer Dialog">
    <template #default>
      <el-dialog
        v-model="innerVisible"
        width="30%"
        title="Inner Dialog"
        append-to-body
      />
    </template>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="outerVisible = false">Qolish</el-button>
        <el-button type="primary" @click="handleFinish">
          Tugatish
        </el-button>
      </div>
    </template>
  </el-dialog>
    </div>
    
    <div class="flex my-6 justify-center">
      <div
        v-for="(count, ind) in _testItems.questions"
        :key="ind"
        @click="nextTest(ind + 1)"
        class="flex justify-center items-center w-8 h-7 border border-white cursor-pointer bg-[#9edcc2] text-white"
        :class="{
          'bg-green-dark': (route.query?.id == ind+1 || !route.query?.id && !ind || count.selected),
          '!bg-danger': (timer =='0' &  !(count.forms.find((el)=> el.correct == 'true')?.id == count?.selected))
          }">
        {{ ind + 1 }}
      </div>
    </div>
    <div v-if="_testItems?.questions?.length" class="">
      <p class="text-center text-danger mb-2" v-if="timer == '0' & !_testItems?.questions[activeCount]?.selected">Siz bu testni javobini belgilamadiz</p>
      <el-card>
        <p>
          <strong>{{ activeCount + 1 }} - Savol: </strong> 
           {{ _testItems?.questions[activeCount]?.content }}
        </p>
        <p class="test-3xl my-4">ixtiyoriy variantni tanlang</p>
        <el-radio-group class="w-full block space-y-6" v-model="radio">
          <el-radio
            :disabled="timer == 0"
            v-for="(test, ind) in _testItems?.questions[activeCount].forms"
            :key="ind"
            @change="putSelectTest(_testItems?.questions[activeCount], test)"
            class="w-full block !mx-0"
            :label="test.id"
            :class="{'bg-green-800': test.correct == 'true',
             'bg-danger': timer == 0 &&  (test?.correct && !JSON.parse(test?.correct) && radio == test.id)
             }"
            border
            >{{ test.content }}</el-radio
          >
        </el-radio-group>
      </el-card>
    </div>
    <div class="flex gap-4 mt-4 justify-center">
      <el-button @click="nextTest(route.query.id-1)">Oldingi</el-button>
      <el-button @click="nextTest(route.query.id ? +route.query.id+1 : 2)" type="primary">keyingi</el-button>
      <!-- <el-button v-if="timer !='0'" @click="handleFinish" type="primary">Tugatish</el-button> -->
    </div>
  </div>
  </NuxtLayout>
</template>

<style lang="scss">
.el-radio {
  // flex-wrap: wrap !important;
  height: max-content;
  padding: 10px 20px !important;
  white-space: pre-wrap !important;
}
.el-radio.el-radio--large {
  height: max-content !important;
  min-height: 40px !important;
}
.el-radio.is-bordered.is-checked {
  background: #e9e9f7 ;
}
.bg-danger.is-bordered.is-checked {
  background: red !important;
  border-color: red ;
}
  
.bg-danger{
  .el-radio__input.is-checked+.el-radio__label {
   color: white !important;
  } 
  .el-radio__input.is-checked .el-radio__inner {
    background: white !important;
    border-color: white !important;
  }
}
  .bg-green-800{
    background: #358589 !important;
    border-color: #358589;
  .el-radio__inner {
    background: white !important;
    border-color: white !important;
  }
  .el-radio__label {
   color: white !important;
  } 
  }
</style>
