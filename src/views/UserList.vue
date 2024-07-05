<template>
    <a-table :columns="columns" :data-source="data">
        <template #headerCell="{ column }">
            <template v-if="column.key === 'userName'">
                <span>
                    <smile-outlined />
                    用户名
                </span>
            </template>
        </template>
        <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'userName'">
                <a>
                    {{ record.userName }}
                </a>
            </template>
            <template v-else-if="column.key === 'tags'">
                <span>
                    <a-tag v-for="tag in record.tags" :key="tag" :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue'
                        : 'green'">
                        {{ tag.toUpperCase() }}
                    </a-tag>
                </span>
            </template>
            <template v-else-if="column.key === 'action'">
                <span>
                    <a>Invite 一 {{ record.name }}</a>
                    <a-divider type="vertical" />
                    <a>Delete</a>
                    <a-divider type="vertical" />
                    <a class="ant-dropdown-link">
                        More actions
                        <down-outlined />
                    </a>
                </span>
            </template>
        </template>
    </a-table>
</template>
<script setup lang="ts">
import { DownOutlined, SmileOutlined } from '@ant-design/icons-vue';
import { onMounted, ref } from "vue";
// import { getMapping } from "../api/request";
const columns = [
    {
        name: 'userName',
        dataIndex: 'userName',
        key: 'userName',
    },
    {
        title: '姓名',
        dataIndex: 'fullName',
        key: 'fullName',
    },
    {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: '性别',
        key: 'gender',
        dataIndex: 'gender',
    }, {
        title: '生日',
        key: 'birthday',
        dataIndex: 'birthday',
    }, {
        title: '创建日期',
        key: 'createTime',
        dataIndex: 'createTime',
    },
    {
        title: '操作',
        key: 'action',
    },
];
let data: any = ref([])
onMounted(() => {
    getListUser()
})
//获取用户列表
const getListUser = () => {
    // getMapping("/api/system/user/list", null).then((res) => {
    //     const { result } = res.data
    //     console.log('请求结果：', result)
    //     data.value = result
    //     console.log("data===222", data)
    // })
}
</script>