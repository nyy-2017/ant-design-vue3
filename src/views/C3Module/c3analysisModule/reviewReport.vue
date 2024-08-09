<template>
    <div class="reviewReport">
        <a-row :gutter="24">
            <a-col :span="24" class="row-item">
                <a-col :span="5" style="padding-left: 0px !important;">
                    <vxe-input v-model="filterName" type="search" size="mini" placeholder="输入关键字搜索" @input="searchEvent" clearable />
                </a-col>
                <vxe-table
                    class="mylist-table"
                    :height="tableHight"
                    :column-config="{useKey: true}"
                    :row-config="{useKey: true, isCurrent: true, isHover: true}"
                    size="mini"
                    :data="tableData"
                    @current-change="currentChangeEvent"
                >
                    <!-- <vxe-column type="seq" width="80"></vxe-column> -->
                    <vxe-column field="title" title="标题" type="html" min-width="550" />
                    <vxe-column field="createUser" title="创建者" type="html" width="200">
                        <template #default="{ row }">
                            <span>{{ row.createUser.nickName }}</span>
                        </template>
                    </vxe-column>
                    <vxe-column field="approvalUser" title="审批" type="html" width="200" :formatter="formatterApprovalUser" />
                    <vxe-column field="status" title="状态" type="html" width="160" :filters="statusOptions">
                        <template #default="{ row }">
                            <span v-if="row.status === 0"> 待提交 </span>
                            <span v-else-if="row.status === 1"> 待审核 </span>
                            <span v-else-if="row.status === 2"> 待复核 </span>
                            <span v-else-if="row.status === 3"> 完成 </span>
                        </template>
                    </vxe-column>
                    <vxe-column field="updateTime" title="更新时间" type="html" width="160"></vxe-column>
                    <vxe-column field="canRetract" title="撤回" type="html" width="160">
                        <template #default="{ row }">
                            <vxe-button status="primary" v-if="row.canRetract && row.canRetract !== 0" @click.stop="backRetract(row.timeoutInfoId)">撤 回</vxe-button>
                        </template>
                    </vxe-column>
                </vxe-table>
            </a-col>
        </a-row>

        <!-- 录入信息 子组件 -->
        <review-report-modal ref="reviewReportModal1" @submitReview="submitAddChange" />
    </div>
</template>

<script lang="ts" setup>
    import { ref, nextTick, onMounted, defineExpose } from 'vue';
    import { Modal, message } from 'ant-design-vue';
    import { DownLoadFromTime} from '@/utils/times.ts';
    import { optTypeName } from '@/components/Formatter/formaterData';
    import { get_loginUserList, get_reviewReportDownload, back_reportInfo } from '@/api/C3/report.ts';
    import reviewReportModal from './reviewReportModal.vue';
    const tableHight = (window.innerHeight) - 250;

    // 引用子组件实例，然后调用子组件的方法
    const reviewReportModal1 = ref(null);

    interface RowVO {
        title: string
        createUser: string
        approvalUser: string
        status: number
        updateTime: string
        canRetract: number
    }
    // 状态过滤
    const statusOptions = ref([
        { label: '待提交', value: 0 },
        { label: '待审核', value: 1 },
        { label: '待复核', value: 2 },
        { label: '完成', value: 3 }
    ])

    const filterName = ref('')
    const tableData = ref<RowVO[]>([])
    const newTableData = ref<RowVO[]>([])

    // 根据关键字过滤
    const searchEvent = () => {
        const filterVal = String(filterName.value).trim().toLowerCase()
        console.log('filterVal:', filterVal, filterName.value)
        if (filterVal) {
            tableData.value = newTableData.value
            tableData.value = tableData.value.filter(item => !filterVal || item.title.toLowerCase().includes(filterVal.toLowerCase()) 
            || item.createUser.nickName.toLowerCase().includes(filterVal.toLowerCase()))
        } else {
            // 无关键字
            tableData.value = []
            tableData.value = newTableData.value
        }
    }
    // 录入信息
    const enterInfoData = () => {
        // console.log('reviewReportModal1:', reviewReportModal1)
        if (reviewReportModal1.value) {
            // console.log('走了么')
            nextTick(() => {
                reviewReportModal1.value.modal1 = true
                reviewReportModal1.value.titles = '录入审查报告信息'
            })
        }
    }
    // 新增--保存后，子传给父组件
    const submitAddChange = () => {
        reviewReportLoadData('refresh')
    }

    // 格式化 审批 状态
    const formatterApprovalUser = ({row}) => {
        if (row.result == -1) {
            // console.log('row.optType???',row.optType, optTypeName(row.optType))
            if (row.optType == 0) {
                return row.approvalUser.nickName + ' '+ '提交审批'
            } else {
                return row.approvalUser.nickName + ' '+ optTypeName(row.optType)
            }
        } else if (row.result == 0) {
            return row.approvalUser.nickName + ' '+ '未通过'+ ' ' + optTypeName(row.optType)
        } else if (row.result == 1) {
            return row.approvalUser.nickName + ' '+ '通过'+ ' ' + optTypeName(row.optType)
        }
    }
    // 选中行
    const currentChangeEvent = ({row}) => {
        if (row) {
            console.log("待审查记录 点击打开row:", row)
            // this.$refs.reviewReportModal1.modal1 = true
            // this.$refs.reviewReportModal1.titles = '修改审查报告信息'
            // this.$refs.reviewReportModal1.fileSource = 1
            // this.$refs.reviewReportModal1.clickNext = true
            // this.$refs.reviewReportModal1.clickNextStatus = true

            // this.$refs.reviewReportModal1.currentSatus = row.status
            // if (row.status == 2) {
            // this.$refs.reviewReportModal1.passRevie = false
            // }
            // this.$refs.reviewReportModal1.get_lastApprovalTime = row.lastApprovalTime
            // this.$refs.reviewReportModal1.sendTimeoutInfoId = row.timeoutInfoId
            // setTimeout(() => {
            //     this.$refs.reviewReportModal1.getShowFormData(row.timeoutInfoId)
            // }, 300)
        }
    }
    onMounted(() => {
        reviewReportLoadData()
    })
    // 查询
    async function reviewReportLoadData (_val: undefined) {
        let response = await get_loginUserList()
        // console.log('response:', response)
        const { data } = response.data
        if (data) {
            // console.log('data:', data)
            tableData.value = JSON.parse(JSON.stringify(data))
            newTableData.value = JSON.parse(JSON.stringify(data))
            if (_val && _val == 'refresh' && filterName.value) {
                // 过滤
                searchEvent()
            }
        }
    }
    // 撤回
    async function backRetract({timeoutId}) { 
        Modal.confirm({
            title: '温馨提示：',
            content: '您确定要撤回该数据吗?',
            okText: '确认',
            cancelText: '取消',
            onOk() {
                back_reportInfo(timeoutId).then((res) => {
                    const { code } = res.data
                    if (code === 0) {
                        message.success('成功撤回.')
                        reviewReportLoadData()
                    } else {
                        message.error(res.data.message)
                    }
                })
            },
            onCancel() {},
        });
    }
    // 待办审查记录 下载
    const reviewReportDownload = () => {
        if (tableData.value.length <= 0 || tableData.value == null) {
            message.error('当前未查询到数据, 不可以导出...')
            return 
        } else {
            // 回调下载接口
            get_reviewReportDownload().then((res) => {
                // 获取文件名
                // const fileName = decodeURI(res.headers['content-disposition'].split('=')[1])
                const BLOB = res.data
                const fileReader = new FileReader()
                if(BLOB){fileReader.readAsDataURL(BLOB)}
                // 处理load事件，该事件在读取操作完成时触发
                fileReader.onload = (event) => {
                    let a = document.createElement('a')
                    let newTime = DownLoadFromTime(new Date())
                    a.download = '待办审查记录表_'+ `${newTime}` +'.xlsx' // 使用默认的文件名
                    a.href = event.target.result
                    document.body.appendChild(a)
                    a.click()
                    document.body.removeChild(a)
                }
            })
        }
    }
    // 允许父组件访问子组件的特定属性或方法
    defineExpose({
        reviewReportLoadData,
        reviewReportDownload,
        enterInfoData
    });
</script>

<style lang="scss" scoped>
.reviewReport {
  .row-item {
    background: #fff;
    min-height: 500px;
    width: 100%;
    border: 1px solid #eee;
    border-radius: 5px;
    padding-top: 12px;
    padding-bottom: 12px;
  }
}
</style>