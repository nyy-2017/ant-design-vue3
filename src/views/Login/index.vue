<template>
    <div class="loginPage">
        <a-card class="login-wrapper">
            <div class="center-img">
                <img src="@/assets/images/logo_.png" width="100%" />
            </div>
            <a-form :model="formData" name="basic" :label-col="{ span: 5.5 }" :wrapper-col="{ span: 18 }" autocomplete="off"
                @finish="handleLogin" @finishFailed="onFinishFailed" class="loginForm">
                <a-form-item label="用户名" name="username" :rules="[{ required: true, message: '请输入用户名!' }]">
                    <a-input v-model:value="formData.username" style="width: 100%;" />
                </a-form-item>
                <a-form-item label="密&nbsp;&nbsp;&nbsp;码" name="password" :rules="[{ required: true, message: '请输入密码!' }]">
                    <a-input-password v-model:value="formData.password" />
                </a-form-item>
        
                <a-form-item label="验证码" name="code" :rules="[{ required: true, message: '请输入验证码!' }]">
                    <a-row class="enter-x">
                        <a-col :span="16">
                            <a-input
                                v-model:value="formData.code"
                                type="text"
                                placeholder="点击图片更换验证码"
                                class="vertify_code"
                                auto-complete="false"
                                style="font-size: 14px;min-width: 50px"
                                @keyup.enter.native="handleLogin"
                              ></a-input>
                        </a-col>
                        <a-col :span="8">
                            <img :src="codeImgUrl" class="vertify_img" @click="resetImg">
                        </a-col>
                    </a-row>
                </a-form-item>
        
                <a-form-item :wrapper-col="{ offset: 1, span: 22 }">
                    <a-button type="primary" size="large" style="width: 100%;margin-top: 20px;" html-type="submit">登录</a-button>
                </a-form-item>
                <!--加载效果-->
                <a-spin tip="Logining..." :spinning="spinning"></a-spin>
            </a-form>
        </a-card>
    </div>
</template>

<script setup lang="ts">
import { message } from 'ant-design-vue';
// import { reactive, ref, toRaw, unref, computed, onMounted } from 'vue';
import { reactive, ref, onMounted } from 'vue';
import { useRouter } from "vue-router";
import { useUserStore } from '@/store/modules/user'
import { getMapping, postMapping } from "@/api/request";
const userStore = useUserStore();

const codeImgUrl= ref<string>('')
const router = useRouter()
interface formData {
    username: string;
    password: string;
    randomKey: Number;
    code: string;
}
const spinning = ref(false)
const formData = reactive<formData>({
    username: '',
    password: '',
    randomKey: Math.floor(Math.random() * 4000 + 1000),
    code: ''
});
const handleLogin = () => {
    spinning.value = !spinning.value
    const userInfo = {
        password: formData.password,
        username: formData.username,
        randomKey: formData.randomKey,
        code: Number(formData.code),
        mode: 'none', // 不要默认的错误提示
    }
    // post请求
    postMapping("/api/login", userInfo).then((res) => {
        const { code, data } = res.data
        // console.log("code", code, data)
        if (0 == code) {
            // 获取数据, 更新数据
            sessionStorage.setItem('token', data.Authorization);
            sessionStorage.setItem('reftoken', data.reftoken);
            message.success('登录成功');
            spinning.value = !spinning.value
            // 更新store数据
            // userStore.setUserInfo({ data });

            // 传送登录成功的信息
            userStore.userLogin({ data });
            // 跳转到首页
            router.push({ path: '/' })
        } else {
            message.error('登录失败');
        }
    })
};
const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
};
onMounted(() => {
    resetImg()
});
// 点击图片更换验证码
async function resetImg() {
    const _code = {
        randomKey: formData.randomKey
    }
    // 回调接口
    await getMapping('/api/open/code', _code, 'blob').then((res) => {
        if (res.status == 200) {
            codeImgUrl.value = window.URL.createObjectURL(res.data)
        }
    })
}
</script>

<style scoped>
:deep(.ant-card-body) {
    height: 100%;
    padding: 10px !important;
}
.loginPage {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    background: url('../../assets/images/loginbg.png') no-repeat;
    background-size: 100% 100%;
    position: relative;
}
.login-wrapper {
    position: absolute;
    width: 350px;
    height: 400px;
    z-index: 1000;
    right: 5%;
    top: 35%;
    background: rgba(255, 255, 255);
    -webkit-box-shadow: 0px 0px 8px #b6b6b6;
    box-shadow: 0px 0px 8px #b6b6b6;
}
/* .loginForm {
    position: absolute;
    right: 15%;
} */
.center-img{
    margin-bottom: 20px;
}
/* // .enter-y {
//     width: 100% !important;
//     color: white  !important;
//     .vertify_code {
//         min-width: 65% !important;
//     }
//     .vertify_img {
//         position: absolute;
//         right: 0;
//         bottom: 0;
//         width: 35%;
//     }
// } */
</style>