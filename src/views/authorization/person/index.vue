<template>
  <div>
    <a-row :gutter="24">
      <!-- left -->
      <a-col :span="8">
        <a-card class="box-card">
          <template v-slot:title>
            <UserOutlined />
            <span class="card-title"> 个人设置</span>
          </template>
          <div class="text item">
            <li>
              微信绑定: 
              <span> {{ wxOpenId }} </span>
              <a-button v-if="wxOpenId && wxOpenId !== null" type="primary" size="small" @click="wxUnbonndByUserId">解绑 </a-button>
            </li>
            <li></li>
            <li></li>
          </div>
        </a-card>
      </a-col>
      <!-- right -->
      <a-col :span="15"> 
        <a-card class="box-card">
          <template v-slot:title>
            <SettingOutlined />
            <span class="card-title"> 基本设置</span>
          </template>

          <a-row :gutter="24">
              <a-col :span="14">
                <!-- 表单信息 -->
                <a-form ref="formRef" :form="formRef" :model="fromData" :rules="formRules" :label-col="labelCol" :wrapper-col="wrapperCol" @submit.native.prevent>
                  <!-- <a-form-item label="昵称" name="nickName">
                    <a-input v-model:value="fromData.nickName" placeholder="请输入用户昵称，姓名, 必填" clearable></a-input>
                  </a-form-item> -->
                  <a-form-item label="旧密码" name="password">
                    <a-input type="password" :maxlength="48" v-model:value="fromData.password" placeholder="请输入用户旧密码, 必填" autocomplete="off" show-password clearable></a-input>
                  </a-form-item>
                  <a-form-item label="新密码" name="newPassword">
                    <a-input type="password" :maxlength="48" v-model:value="fromData.newPassword" placeholder="请输入用户新密码, 必填" autocomplete="off" show-password clearable></a-input>
                  </a-form-item>
                  <a-form-item label="确认新密码" name="checkPass">
                    <a-input type="password" :maxlength="48" v-model:value="fromData.checkPass" placeholder="请输入确认新密码, 必填" autocomplete="off" show-password clearable></a-input>
                  </a-form-item>
                  <a-form-item>
                    <a-button type="primary" @click="updateFormData">更新基本信息</a-button>
                  </a-form-item>
                </a-form>
  
              </a-col>
    
              <a-col :span="8">
                <div class="right-info">
                  <p>登录名： {{ fromData.username }} </p>
                  <img src="@/assets/images/header.png">
                  <p>
                    昵称：
                    <span v-if="!showEditIcon"> {{ fromData.nickName }} </span>
                    <a-input v-if="showEditIcon" v-model:value="fromData.nickName" clearable style="width: 50%"></a-input>
                    &nbsp;
                    <a-button type="link" :icon="h(EditOutlined)" @click="editIcon(1)" style="font-size: 18px"></a-button>
                  </p>
                  <div style="margin-bottom: 10px" v-if="showEditIcon">
                    <a-button type="primary" @click="updateNickeName">提交</a-button>
                  </div>
                </div>
              </a-col>
          </a-row>
        </a-card>
      </a-col>
    </a-row>
  
    <!-- 修改密码成功后的提示 -->
    <a-modal v-model:open="modal2" title="修改密码提示" :footer="null">
      <a-result
        status="success"
        title="登录密码更新成功"
      >
        <template #extra>
          <a-button type="primary" @click="resetLogin">重新登录</a-button>
        </template>
      </a-result>
    </a-modal>
  </div>
</template>
  
<script lang="ts" setup>
  import { update_userInfo, get_wxUnbound, get_currentUserUnboundStatus } from '@/api/system/user'
  import { ref, h, reactive, onMounted } from 'vue'
  import { UserOutlined, SettingOutlined, EditOutlined } from '@ant-design/icons-vue';
  import { Modal, message } from 'ant-design-vue';
  import { useUserStore } from '@/store/modules/user'
  import { useRouter } from "vue-router";
  const userStore = useUserStore();
  // console.log('getUserInfo:', userStore.userInfo)
  const router = useRouter();
  const { dataNum, username, nickName } = userStore.getUserInfo || {}

  const wxOpenId = ref('');
  const labelCol = { style: { width: '110px' } };
  const wrapperCol = { span: 14 };
  const formRef = ref()
  const modal2 = ref<boolean>(false);
  const showEditIcon = ref<boolean>(false);

  const validatePass1 = (_rule: any, value: string | string[] | undefined, _callback: any) => {
    if (value === '') {
      return Promise.reject(new Error('请输入密码(4-20个字母/数字/下划线)'))
    } else if (!/^(\w){4,20}$/.test(value)) {
      return Promise.reject(new Error('请输入4-20个字母/数字/下划线!'))
    } else {
      return Promise.resolve()
    }
  }
  const validatePass2 = (_rule: any, value: string | string[] | undefined, _callback: any) => {
    if (value === '') {
      return Promise.reject(new Error('请再次输入新密码'))
    } else if (value !== fromData.newPassword) {
      return Promise.reject(new Error('两次输入密码不一致!'))
    } else {
      return Promise.resolve()
    }
  }
  const fromData = reactive({
    dataNum: dataNum,
    username: username,
    nickName: nickName,
    password: '',
    newPassword: '',
    checkPass: '',
  })

  const formRules = reactive({
    // nickName: [
    //   { required: true, message: '请输入用户昵称，姓名', trigger: 'blur'}
    // ],
    password: [
      { required: true, message: '请输入旧密码', trigger: 'blur' }
    ],
    newPassword: [
      { required: true, min: 4, message: '请输入密码(4-20个字母/数字/下划线)', validator: validatePass1, trigger: 'blur' }
    ],
    checkPass: [
      { required: true, validator: validatePass2, trigger: 'blur' }
    ]
  })

  onMounted(() => {
    getUnboundUserStatus()
  });
  // 获取当前登录用户的 绑定状态
  function getUnboundUserStatus() {
    get_currentUserUnboundStatus().then((res) => {
      if (res.status == 200) {
        if (res.data.code == 0) {
          if (res.data.data) {
            wxOpenId.value = res.data.data
          }
        } else {
          message.error(res.data.message)
        }
      }
    })
  }

  // 微信状态解绑
  function wxUnbonndByUserId() {
    const paramsData = {
      userId: dataNum,
      noBindUserId: dataNum
    }
    Modal.confirm({
      title: '温馨提示：',
      content: `您确定要给 ${username} 用户，解除微信绑定状态吗?`,
      okText: '确认',
      cancelText: '取消',
      onOk() {
        get_wxUnbound(paramsData).then((res) => {
          if (res.status == 200){
            if (res.data.code == 0){
              message.success('微信解绑成功.')
              getUnboundUserStatus()
            } else {
              message.error(res.data.message)
            }
          }
        })
      },
      onCancel() {},
    });
  }
  // 点击编辑图标 
  function editIcon(params:number) {
    if (params) {
      showEditIcon.value = !showEditIcon.value
    }
  }

  // 更新用户信息
  function updateFormData() {
    if (fromData.nickName) {
      let valid = formRef.value.validate().then(() => {
      let new_fromData = fromData
        // 回调更新接口
        update_userInfo(new_fromData).then((res) => {
          if (res.status == 200) {
            if (res.data.code == 0) {
              message.success("密码和昵称更新成功.") 
              modal2.value = true
            } else {
              message.error(res.data.message)
            }
          }
        }).catch(_err =>{
          console.log(_err)
        })
      }).catch((err: any) =>{
        console.log(err)
        message.error('表单验证不通过, 请检查核对相应字段是否合法.')
      })
    } else {
      message.warning('昵称不能为空.')
    }
  }

  // 更新名称
  function updateNickeName(params:type) {
    if (fromData.nickName) {
      let new_fromData = fromData
      // 回调更新接口
      update_userInfo(new_fromData).then((res) => {
        if (res.status == 200) {
          if (res.data.code == 0) {
            message.success("昵称更新成功.") 
            showEditIcon.value = false
            userStore.getUserInfoByUserName(username);
            // 页面静态刷新更新dom
            // router.replace({
            //   path: '/refresh'
            // })
          } else {
            message.error(res.data.message)
          }
        }
      })
    } else {
      message.warning('昵称不能为空.')
    } 
  }

  // 重新登录
  function resetLogin() {
    // 关闭socket
    // if (window.$socket) {
    //   window.$socket.close()
    // }
    userStore.userLogOut()
    router.push({ path: '/login' })
  }

</script>
  
  <style lang="less" scoped>
  .box-card {
    width: 100%;
    .text {
      font-size: 14px;
    }
    .item {
      margin-bottom: 18px;
      span{
        // color: #66b1ff;
      }
    }
  }
  
  .right-info{
    text-align: center;
    span{
      display: inline-block;
      padding: 10px 0;
    }
    img{
      width: 150px;
      height: 100%;
      border-radius: 50%;
    }
  }
  </style> 