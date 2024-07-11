<template>
    <!-- 分页 -->
    <vxe-pager
        background
        :current-page.sync="currentPage"
        :page-size.sync="pageSize"
        :page-sizes="[20, 50, 100, 500, 1000]"
        :total="total"
        :layouts="['PrevPage', 'JumpNumber', 'NextPage', 'Sizes','Total']"
        @page-change="handlePageChange">
    </vxe-pager>
</template>

<script>
export default {
    data() {
        return {
            currentPage: 1,
            pageSize: 20,
            total: 0
        }
    },
    methods:{
        // 分页
        handlePageChange ({ currentPage, pageSize }) {
            this.currentPage = currentPage
            this.pageSize = pageSize
            this.$emit('chilPageSize', currentPage, pageSize) // 传给父组件
        }
    },
    destroyed() {
        this.$destroy()
        this.total = 0
        this.currentPage = 1
        this.pageSize = 20
    }
}
</script>