<template>
    <div>
        organ
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getMapping } from "../../api/request";

onMounted(() => {
    getListUser()
})
//获取用户列表
const getListUser = () => {
    getMapping("http://172.16.2.195:8101/api/system/user/list").then((res) => {
        const { result } = res.data
        console.log('请求结果：', result)
    })
}
</script>