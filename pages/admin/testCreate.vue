<template>
  <NuxtLayout>
    <div>
      <el-form
        :model="_items"
        :rules="rules"
        ref="formRef"
        label-position="top"
      >
        <el-form-item prop="content" label="Savolni kiriting">
          <el-input
            v-model="_items.content"
            :rows="2"
            type="textarea"
            placeholder="Savolni kiriting"
          />
        </el-form-item>
        <el-form-item prop="forms[0].content" label="To'g'ri javobni kiriting">
          <el-input
            v-model="_items.forms[0].content"
            :rows="2"
            type="textarea"
            placeholder="To'g'ri Javobni kiriting"
          />
        </el-form-item>
        <el-form-item
          prop="forms[1].content"
          label="1. Noto'g'ri javobni kiriting"
        >
          <el-input
            v-model="_items.forms[1].content"
            :rows="2"
            type="textarea"
            placeholder="Noto'g'ri javobni kiriting"
          />
        </el-form-item>
        <el-form-item
          prop="forms[2].content"
          label="2. Noto'g'ri javobni kiriting"
        >
          <el-input
            v-model="_items.forms[2].content"
            :rows="2"
            type="textarea"
            placeholder="Noto'g'ri javobni kiriting"
          />
        </el-form-item>
        <el-form-item
          prop="forms[3].content"
          label="3. Noto'g'ri javobni kiriting"
        >
          <el-input
            v-model="_items.forms[3].content"
            :rows="2"
            type="textarea"
            placeholder="Noto'g'ri javobni kiriting"
          />
        </el-form-item>
        <el-form-item>
          <el-button @click="submit" type="primary">Saqlash</el-button>
        </el-form-item>
      </el-form>
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { postQuestionCreate_API } from "@/services/tests";
import type { FormInstance, FormRules } from "element-plus";

const formRef = ref<FormInstance>();

const rules = reactive<any>({
  forms: [
    {
      content: [
        { required: true, message: "Maydonni to'ldiring", trigger: "blur" },
      ],
    },
    {
      content: [
        { required: true, message: "Maydonni to'ldiring", trigger: "blur" },
      ],
    },
    {
      content: [
        { required: true, message: "Maydonni to'ldiring", trigger: "blur" },
      ],
    },
    {
      content: [
        { required: true, message: "Maydonni to'ldiring", trigger: "blur" },
      ],
    },
  ],
  content: [
    { required: true, message: "Maydonni to'ldiring", trigger: "blur" },
  ],
});
const _items = ref({
  content: "",
  forms: [
    {
      content: "",
      isCorrect: true,
    },
    {
      content: "",
      isCorrect: false,
    },
    {
      content: "",
      isCorrect: false,
    },
    {
      content: "",
      isCorrect: false,
    },
  ],
  subjectId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
});

async function submit() {
  if (!formRef.value) return;
  formRef.value.validate(async (valid) => {
    if (valid) {
      const [response, error] = await postQuestionCreate_API(_items.value);
      if (error) {
        ElMessage.error(error);
        return;
      }
      ElMessage.success("Test qo'shildi");
    } else {
      console.log("error submit!");
      return false;
    }
  });
}
</script>

<style></style>
