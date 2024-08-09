<template>
    <div>
        <vxe-modal v-model="modal1" :title="titles" width="64.5%" :position="{ top: 60 }" @close="closeEvent" resize destroy-on-close>
            <div class="dialog-top" v-if="!clickNext && !clickNextStatus">
                <div class="manualTitle">直接创建或选择模板创建</div>
                <a-row :gutter="24" style="padding: 10px; margin-right: 0px">
                    <a-col :span="2" style="min-width: 90px;width: 7.5%;height: 28px;line-height: 28px">
                        <span><i style="color:red">*</i> 拆链日期</span>
                    </a-col>
                    <a-col :span="5" style="min-width: 130px">
                        <a-date-picker v-model:value="search.eventDate" style="min-width: 130px !important;width:100%" placeholder="选择拆链日期" />
                    </a-col>
                    <a-col :span="2" style="min-width: 96px;margin-left: 2%;height: 28px;line-height: 28px;padding-right: 0px !important;">
                        <span><i style="color:red">*</i> 动车组编号</span>
                    </a-col>
                    <a-col :span="5">
                        <a-input v-model:value="search.emnnum" :maxlength="32"  placeholder="请输入动车组编号" clearable />
                    </a-col>
                    <a-col :span="9" style="text-align: right;min-width: 80px;padding-left: 0px;padding-right: 0px">
                        <a-button type="primary" @click="searchReportData">查询报告</a-button>
                    </a-col>
                </a-row>
                <!-- 查询的报告列表 -->
                <a-row :gutter="24" style="padding: 10px 20px">
                    <div v-if="searchTableData.length > 0" class="tableTopTitle"><span style="color: red">*</span> 查询到相似报告 {{ searchTableData.length }} 条</div>

                    <vxe-table
                        border
                        ref="tableRef"
                        height="300"
                        size="mini"
                        :data="searchTableData"
                        :radio-config="{ highlight: true, trigger: 'row' }"
                        @radio-change="radioChangeEvent"
                    >
                        <vxe-column type="radio" width="50">
                            <template #header>
                                <vxe-button mode="text" v-model="selectRow" @click="clearRadioRowEevnt" :disabled="!selectRow">
                                    <span v-if="selectRow" style="color: #e6a23c;"> 取消</span>
                                    <span v-else>选择</span>
                                </vxe-button>
                            </template>
                        </vxe-column>
                        <vxe-column type="seq" title="序号" width="58" />
                        <vxe-column field="discTime" title="拆连时间" width="150" />
                        <vxe-column field="eventBureauName" title="超时所在路局" width="120" />
                        <vxe-column field="trainNum" title="车次号" width="100" />
                        <vxe-column field="emnnum" title="动车组编号" width="160" />
                        <vxe-column field="installAMS" title="是否安装AMS" width="110">
                            <template #default="{ row }">
                                <span>{{ row.installAMS == 0 ? '否' : '是' }} </span>
                            </template>
                        </vxe-column>
                        <vxe-column field="downgrade" title="是否发生降级" width="106">
                            <template #default="{ row }">
                                <span>{{ row.downgrade == 0 ? '否' : '是' }} </span>
                            </template>
                        </vxe-column>
                        <vxe-column field="timeoutReasonName" title="超时原因类型" width="120" />
                        <vxe-column field="timeoutReasonDetailName" title="超时原因子类型" show-overflow minWidth="230"></vxe-column>
                    </vxe-table>
                    <div style="margin-top: 10px" v-if="selectRow">
                        <vxe-button status="warning" size="mini" @click="cancelRadioData">取消选中</vxe-button>
                    </div>
                </a-row>
                <!-- 操作说明 -->
                <div style="padding-left: 10px;">
                    <span style="color: red">*</span> 创建方式: 
                    <div> 1. 直接创建</div>
                    <div> 2. 选择模板创建：以选择的分析报告为模板，自动读取基础信息至新报告。</div>
                </div>

                <div style="text-align: center; padding-bottom: 2px">
                    <vxe-button status="success" @click="nextClickData"> {{ selectRow ? '根据模板创建' : '直接创建' }} </vxe-button>
                </div>
            </div>

            <!-- 点击下一步展开的内容 -->
            <div class="dialog-next" v-if="clickNext && clickNextStatus">
                <!-- 录入审查报告信息 表单--组件  -->
                <enter-review-formData ref="enterReviewFormData1" /> 
            </div>
        </vxe-modal>
    </div>
</template>

<script setup lang="ts">
    // import { FromTimes, nowDate } from '@/utils/times.ts'
    import { get_reviewListByEmnnumTime, add_reportInfo, edit_reportInfo, delet_file, get_reviewDataById, get_lockById, get_unlockById, get_historyById, get_download} from '@/api/C3/report.ts'
    import { message } from 'ant-design-vue';
    import { ref, reactive, onMounted } from 'vue';
    import type { Dayjs } from 'dayjs';
    import enterReviewFormData from './enterReviewFormData.vue'
    const titles = ref('')
    const modal1 = ref(false)

    const clickNext = ref(false); // 点击下一步的开关
    const clickNextStatus = ref(false); // 点击下一步的状态
    const search = reactive({
        eventDate: ref<Dayjs>(),
        emnnum: ''
    });
    const searchTableData = ref([]) // 查询的报告数据
    const selectRow = ref(null); // 查询的报告列表选中状态
    const tableRef = ref();

    onMounted(() => {
        // search.eventDate = nowDate(new Date())
    })

    // 取消选中
    function cancelRadioData() {
        if (tableRef.value) {
            selectRow.value = null
            tableRef.value.clearRadioRow()
        }
    }
    // 单选
    const radioChangeEvent = ({ row }) => {
        selectRow.value = row
        console.log('单选事件:', row)
    }
    // 取消
    const clearRadioRowEevnt = () => {
        if (tableRef.value) {
            selectRow.value = null
            tableRef.value.clearRadioRow()
        }
    }

    // 关闭弹窗
    function closeEvent() {
        modal1.value = false
        clickNext.value = false
        clickNextStatus.value = false
        // formRef.value.resetFields()
        // // 清除所有校验
        // if (formRef.value) {
        //     formRef.value.clearValidate()
        // }
    }

    // 查询报告
    function searchReportData() {
        if (search.eventDate && search.emnnum) {
            get_reviewListByEmnnumTime(search).then((res) => {
                // console.log("查询接口:", res)
                searchTableData.value = []
                if (res.status == 200) {
                    if (res.data.code === 0) {
                        if (res.data.data) {
                            searchTableData.value = res.data.data
                        } else {
                            message.warning('未查询到数据.')
                        }
                    } else {
                        message.error(res.data.message)
                    }
                }  
            })
        } else {
            message.warning('拆链时间和动车组编号不能为空.')
            return false  
        }
    }

    // 点击 自动创建 / 根据模板创建
    function nextClickData () {
        clickNext.value = true
        clickNextStatus.value = true
    }

    // 允许父组件访问子组件的特定属性或方法
    defineExpose({
        titles,
        modal1,
    });
</script>

<style lang="scss" scoped>
    :deep(.vxe-modal--content) {
        overflow: hidden !important;
    }
    .dialog-top {
        width: 100%;
        box-sizing: border-box;
        .manualTitle {
            text-align: center;
            font-size: 20px;
            font-weight: bold;
        }
        .tableTopTitle {
            font-size: 16px;
            font-weight: bold;
        }
    }
</style>