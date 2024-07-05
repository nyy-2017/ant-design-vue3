<template>
    <div>
        organ
    </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
// import { getMapping } from "../../api/request";

onMounted(() => {
    getListUser()
})
//获取用户列表
const getListUser = () => {
    // getMapping("/api/system/user/list").then((res) => {
    //     const { result } = res.data
    //     console.log('请求结果：', result)
    // })
}
</script>