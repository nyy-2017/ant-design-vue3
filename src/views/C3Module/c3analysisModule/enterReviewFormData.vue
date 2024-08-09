<template>
    <div class="dialog-next">
        <div class="titles">
            <span v-if="currentSatus === 0"> {{ fileSource === 0 ? '创建' : '待提交' }} </span>
            <span v-if="currentSatus === 1"> 待审核 </span>
            <span v-if="currentSatus === 2"> 待复核 </span>
            <span class="tipsTitle" v-if="!editUserShow && fileSource !== 0">{{ allowEditName ? allowEditName + ',' : allowEditName }} 仅供浏览</span>
            <span class="tipsTitle1" v-else-if="editUserShow && fileSource !== 0">您当前正在审批，其他用户仅能浏览 </span>
        </div>
        <a-form ref="formRef" :form="formRef" :model="formData" :rules="formRules" :label-col="labelCol" :wrapper-col="wrapperCol" class="review-form" @submit.native.prevent>
            <a-row :gutter="24" class="review-top">
                <a-card :bordered="true" style="width: 100%;-webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);">
                    <div class="review-top-title">指定审批人：</div>
                    <a-row>
                        <a-col :span="12">
                            <a-form-item label="审批人" name="assignApproveUserId">
                                <a-select v-model:value="formData.assignApproveUserId" placeholder="请选择审批人">
                                    <a-select-option v-for="(item, index) in approverUserData" :value="item.value" :label="item.label" :key="index">
                                        {{ item.label }}
                                    </a-select-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <div class="review-top-title">C3超时信息:</div>
                    <a-col :span="12">
                        <a-form-item label="ATP类型" name="atpNum">
                            <a-select v-model:value="formData.atpNum" placeholder="请选择ATP类型" @change="onChangeAtpNum" style="width:100%">
                                <a-select-option v-for="(item, index) in atpNumArry" :value="item.value" :label="item.label" :key="index">
                                    {{ item.label }}
                                </a-select-option>
                            </a-select>
                        </a-form-item>
                        <a-form-item label="起呼时间" name="startTime">

                        </a-form-item>
                        <a-form-item label="超时所在路局" name="eventBureauNum">
                            <a-select v-model:value="formData.eventBureauNum" placeholder="请选择超时所在路局" style="width:100%">
                                <a-select-option v-for="(item, index) in bureauNumArry" :value="item.value" :label="item.label" :key="index">
                                    {{ item.label }}
                                </a-select-option>
                            </a-select>
                        </a-form-item>
                        <a-form-item label="车次号" name="trainNum">
                            <a-input v-model="formData.trainNum" :maxlength="8"  placeholder="请输入车次号" clearable />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        
                    </a-col>

                </a-card>
            </a-row>
            <a-row :gutter="24" class="review-bottom">

            </a-row>
        </a-form>



    </div>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted } from 'vue';
    const currentSatus = ref(0); // 当前状态
    const editUserShow = ref(false); // 提示文字红色
    const fileSource = ref(0); // 文件类型  0 创建 1 编辑
    const allowEditName = ref(''); // 锁定状态的文字提示

    const formRef = ref()
    const labelCol = { style: { width: '120px' } };
    const wrapperCol = { span: 14 };
    const approverUserData = ref([])
    const atpNumArry = ref([])
    const bureauNumArry = ref([])

    const formData = ref({
        assignApproveUserId: null,
        atpNum: null,
        startTime: '',
        eventBureauNum: null,
        trainNum: '',

    })
    const formRules = reactive({
        // orgName: [
        //   { required: true, message: '请输入机构名称', trigger: 'change' },
        //   { validator: validateOrgName, trigger: 'blur' }
        // ],
        // leader: [
        //   { required: true, message: '请输入负责人名字', trigger: 'change' },
        //   { validator: validateLeader, trigger: 'blur' }
        // ],
        // phone: [
        //   { required: true, message: '请输入手机号', trigger: 'change' },
        //   { validator: validatePhone, trigger: 'blur' }
        // ],
        // email: [
        //   { required: true, message: '请输入邮箱账号', trigger: 'change' },
        //   { validator: validateEmail, trigger: 'blur' }
        // ],
        // status: [
        //   { required: true, message: '请选择部门状态', trigger: 'blur' }
        // ]
    })
</script>

<style lang="scss" scoped>
    .dialog-next {
        // padding: 2px 20px 5px 20px;
        .titles {
            font-size: 20px;
            font-weight: bold;
            color: #85ce61;
            margin-bottom: 2px;
            margin-left: 10px;
            .tipsTitle, .tipsTitle1 {
                float: right;
                color: #ebb563;
                font-size: 14px;
            }
            .tipsTitle1 {
                color:#85ce61;
            }
        }
        .review-form {
            height: 500px;
            min-height: 500px;
            overflow-y: auto;
            position: relative;
            padding: 0px 20px;
            .review-top-title, .review-bottom-title {
                font-size: 1.17em;
                margin-bottom: 5px;
                color: #303133;
                font-weight: bold;
            }
            .upload-demo1{
                display: flex;
            }
            .review-bottom {
                margin-top: 20px;
                margin-bottom: 40px;
            }
        }
        .foot-Btn{
            text-align: center; 
            height:50px; 
            line-height: 50px;
            margin:10px; 
            background: #f8f8f8;
            .el-button{
                min-width: 100px;
            }
            .el-button:nth-child(1){
                min-width: 80px;
            }
            .el-button:nth-child(2){
                margin-left: 50px;
            }
        }

    }
</style>