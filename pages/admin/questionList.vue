<script lang="ts" setup>
import { getQuestionLists_API } from "@/services/tests";
const _items = ref([]);

async function getTestLists() {
  const [response, error] = await getQuestionLists_API();
  _items.value = response;
}
getTestLists();
</script>
<template>
  <NuxtLayout>
    <div>
      <el-table
        highlight-current-row
        :data="_items?.content"
        style="width: 100%"
      >
        <el-table-column type="index" width="50" />
        <el-table-column prop="id" label="id" />
        <el-table-column prop="content" label="Username" />

        <el-table-column fixed="right" label="Status" width="220">
          <template #default="scope">
            <el-button
              link
              type="danger"
              size="small"
              @click="deleteTest(scope.row.id)"
              >Delete</el-button
            >
            <el-button
              link
              type="primary"
              size="small"
              @click="editTest(scope.row.id)"
              >Edit</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </NuxtLayout>
</template>

<style></style>
