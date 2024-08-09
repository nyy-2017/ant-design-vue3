<template>
    <a-modal :title="titles" width="25%" v-model:open="modal1" :afterClose="closeEvent" okText="提交">
        <a-form ref="formRef" :form="formRef" :model="formData" :rules="formRules" :label-col="labelCol" :wrapper-col="wrapperCol" @submit.native.prevent>
            <a-form-item v-if="parentOrgName" :label="resultLableName">
                <span style="color: #67C23A; font-weight: bold;"> {{ parentOrgName }} </span>
            </a-form-item>
            <a-form-item label="机构名称" name="orgName">
                <span v-if="titles === '机构详情'"> {{ formData.orgName }} </span>
                <a-input v-else v-model:value="formData.orgName" :maxlength="48" placeholder="请输入机构名称" clearable />
            </a-form-item>

            <!-- <a-form-item label="部门负责人" name="leader">
                <span v-if="titles === '机构详情'"> {{ formData.leader }} </span>
                <a-input v-else v-model:value="formData.leader" :maxlength="64" placeholder="请输入部门负责人名字" clearable />
            </a-form-item> -->

            <!-- <a-form-item label="联系电话" name="phone">
                <span v-if="titles === '机构详情'"> {{ formData.phone }} </span>
                <a-input v-else v-model:value="formData.phone" :maxlength="11" placeholder="请输入联系电话" clearable />
            </a-form-item> -->

            <!-- <a-form-item label="邮箱" name="email">
                <span v-if="titles === '机构详情'"> {{ formData.email }} </span>
                <a-input v-else v-model:value="formData.email" :maxlength="64" placeholder="请输入邮箱" clearable />
            </a-form-item> -->

            <!-- <a-form-item label="状态" name="status">
                <span v-if="titles === '机构详情'"> {{ formData.status === 0 ? '启用' : '禁用' }} </span>
                <a-radio-group v-else v-model:value="formData.status">
                    <a-radio
                        v-for="item in statusArry"
                        :key="item.value"
                        :value="item.value"
                        >{{ item.label }}
                    </a-radio>
                </a-radio-group>
            </a-form-item> -->
        </a-form>
        <template v-if="titles !== '机构详情' " v-slot:footer>
            <a-button type="primary" @click="sumitData('ruleForm')">提交</a-button>
        </template>
        <template v-if="titles == '机构详情' " v-slot:footer>
        </template>
    </a-modal>
</template>
<script setup lang="ts">
    import { message } from 'ant-design-vue';
    import { add_organInfo, edit_organInfo } from '@/api/system/organ';
    // import { validEmail, validPhone } from '@/utils/validate'
    import { ref, reactive } from 'vue';

    const formRef = ref()
    // 机构名称验证
    const validateOrgName = (_rule: any, value: string | string[] | undefined, _callback: any) => {
        if (value === '') {
            return Promise.reject(new Error('请输入机构名称'))
        } else if (value === undefined || value.indexOf('未知') !== -1) {
            return Promise.reject(new Error('请输入正确的机构名称(不能含有"未知")'))
        } else {
            return Promise.resolve()
        }
    }
    // 验证负责人名字
    // const validateLeader = (_rule: any, value: string | string[] | undefined, _callback: any) => {
    //     if (value === '') {
    //         return Promise.reject(new Error('请输入负责人名字'))
    //     } else if (value === undefined || value.indexOf('未知') !== -1) {
    //         return Promise.reject(new Error('请输入正确的负责人名字(不能含有"未知")'))
    //     } else {
    //         return Promise.resolve()
    //     }
    // }

    // 邮箱验证
    // const validateEmail = (_rule: any, value: any, _callback: any) => {
    //     if (!value) {
    //         return Promise.reject(new Error('请输入邮箱账号'))
    //     } else if (!validEmail(value)) {
    //         // 判断用户输入的值是否符合规则
    //         return Promise.reject(new Error('请输入正确的邮箱账号地址'))
    //     } else {
    //         return Promise.resolve()
    //     }
    // }
    // 邮箱手机号
    // const validatePhone = (_rule: any, value: any, _callback: any) => {
    //     if (!value) {
    //         return Promise.reject(new Error('请输入电话号码'))
    //     } else if (!validPhone(value)) {
    //         // 判断用户输入的值是否符合规则
    //         return Promise.reject(new Error('请输入正确的11位手机号码'))
    //     } else {
    //         return Promise.resolve()
    //     }
    // }
    const emit = defineEmits(['refresh'])
    const labelCol = { style: { width: '120px' } };
    const wrapperCol = { span: 14 };
    const modal1 = ref(false)
    const titles = ref()
    
    // const statusArry = ref([
    //     { value: 0, label: '启用' },
    //     { value: 1, label: '禁用' }
    // ])
    const parentOrgName = ref('')
    const resultLableName = ref('')
    
    
    const formData = ref({
        orgName: '',
        parentId: 0,
        // leader: '',
        // phone: '',
        // email: '',
        // status: 0
    })
    const formRules = reactive({
        orgName: [
          { required: true, message: '请输入机构名称', trigger: 'change' },
          { validator: validateOrgName, trigger: 'blur' }
        ],
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
    function closeEvent(){
        modal1.value = false
        formRef.value.resetFields()
        // 清除所有校验
        if (formRef.value) {
            formRef.value.clearValidate()
        }
    }

     // 提交
    function sumitData(_p0?: string) {
      if (titles.value === '新增本级机构' || titles.value === '新增子级机构') {
        addOrgData()
      } else if (titles.value === '机构编辑') {
        editOrgData()
      }
    }
    
    const AddData = (data: { [x: string]: any; children: null; orgName: any; }) =>{
        if (data.children == null) {
            resultLableName.value = '上级机构'
        } else {
            resultLableName.value = '本级机构'
        }
        formData.value['dataNum'] = data['dataNum']
        formData.value['parentId'] = data['dataNum']
        parentOrgName.value = data.orgName
        titles.value = '新增子级机构'
        modal1.value = true
    }
    const detailData = (data: { [x: string]: any; } ) =>{
        titles.value = '机构详情'
        parentOrgName.value = ''
        setTimeout(() => {
            formData.value['orgName'] = data['orgName']
            // formData.value['leader'] = data['leader']
            // formData.value['phone'] = data['phone']
            // formData.value['email'] = data['email']
            // formData.value['status'] = data['status']
        }, 0);
        modal1.value = true
    }

    const  EditData = (data: { [x: string]: any; }, _name: any) =>{
        // console.log('_name:', _name, data)
        if (data.children == null) {
            resultLableName.value = '上级机构'
        } else {
            resultLableName.value = '本级机构'
        }
        titles.value = '机构编辑'
        parentOrgName.value = _name
        setTimeout(() => {
            formData.value['orgName'] = data['orgName']
            // formData.value['leader'] = data['leader']
            // formData.value['phone'] = data['phone']
            // formData.value['email'] = data['email']
            // formData.value['status'] = data['status']
            formData.value['dataNum'] = data['dataNum']
            formData.value['children'] = data['children']
        }, 0);
        modal1.value = true
    }
    
    // 新增
    const addChildData = async () => {
        titles.value = '新增本级机构'
        modal1.value = true
        parentOrgName.value = ''
        // 清除所有校验
        if (formRef.value) {
            formRef.value.resetFields()
            formRef.value.clearValidate()
        }
    }

    // 添加
    const addOrgData = async () => {
       let valid = await formRef.value.validate().then(() =>{
          add_organInfo(formData.value).then((res) =>{
            console.log('res+++++', res)
            const { code } = res.data
              if (code === 0) {
                modal1.value = false
                message.success('成功添加一条数据.')
                emit('refresh')
              } else {
                message.error(res.data.message)
              }
          }).catch(_err =>{
            console.log(_err)
        })
      }).catch((err: any) =>{
          console.log(err)
          message.error('表单验证不通过, 请检查核对相应字段是否合法.')
      })
    }
   
     // 修改
    const editOrgData = async ()=> {
        let valid = await formRef.value.validate().then(() =>{
            edit_organInfo(formData.value).then((res) =>{
                const { code } = res.data
                if (code === 0) {
                    modal1.value = false
                    message.success('成功修改一条数据.')
                    emit('refresh')
                } else {
                    message.error(res.message)
                }
            }).catch(_err =>{
                console.log(_err) 
            })
        }).catch((err: any) =>{
            console.log(err)
            message.error('表单验证不通过, 请检查核对相应字段是否合法.')
        })
    }
    defineExpose({
        addChildData, AddData, EditData, detailData
    })
</script>