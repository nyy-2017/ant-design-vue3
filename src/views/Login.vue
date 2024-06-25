<template>
    <a-form :model="formState" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off"
        @finish="handleLogin" @finishFailed="onFinishFailed" class="login">
        <a-form-item label="用户名" name="username" :rules="[{ required: true, message: '请输入用户名!' }]">
            <a-input v-model:value="formState.username" />
        </a-form-item>
        <a-form-item label="密&nbsp;&nbsp;&nbsp;码" name="password" :rules="[{ required: true, message: '请输入密码!' }]">
            <a-input-password v-model:value="formState.password" />
        </a-form-item>

        <a-form-item label="验证码" name="code" :rules="[{ required: true, message: '请输入验证码!' }]">
            <a-row class="enter-x">
                <a-col :span="16">
                    <a-input
                        v-model:value="formState.code"
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

        <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
            <a-checkbox v-model:checked="formState.remember">记住我</a-checkbox>
            <a-button type="link" @click="toReg">还没有账号？去注册</a-button>
        </a-form-item>
        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
            <a-button type="primary" html-type="submit">登录</a-button>
        </a-form-item>
        <!--加载效果-->
        <a-spin tip="Logining..." :spinning="spinning"></a-spin>
    </a-form>
</template>

<script setup lang="ts">
import { message } from 'ant-design-vue';
import { reactive, ref, toRaw, unref, computed, onMounted } from 'vue';
import { useRouter } from "vue-router";
import { useStore } from 'vuex'
import { getMapping, postMapping } from "../api/request";
const store = useStore()
// 在某个函数中触发action
// console.log('store:', store)

const codeImgUrl= ref<string>('')
const router = useRouter()
interface FormState {
    username: string;
    password: string;
    remember: boolean;
    randomKey: Number;
    code: string;
}
const spinning = ref(false)
const formState = reactive<FormState>({
    username: '',
    password: '',
    remember: true,
    randomKey: Math.floor(Math.random() * 4000 + 1000),
    code: ''
});
const handleLogin = () => {
    spinning.value = !spinning.value
    const userInfo = {
        password: formState.password,
        username: formState.username,
        randomKey: formState.randomKey,
        code: Number(formState.code),
        mode: 'none', // 不要默认的错误提示
    }
    // post请求
    postMapping("http://172.16.2.195:8101/api/login", userInfo).then((res) => {
        const { code, data } = res.data
        // console.log("code", code, data)
        if (0 == code) {
            message.success('登录成功');
            spinning.value = !spinning.value
            store.dispatch("user/userLogin", data).then(() =>{
                router.push({ path: '/home' }).catch(() => {})
            }).catch(() =>{
            })
        } else {
            message.error('登录失败');
        }
    })
};
const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
};
const toReg = () => {
    // router.push({ path: '/userReg' }).catch(() => {})
}
onMounted(() => {
    resetImg()
})
// 点击图片更换验证码
async function resetImg() {
    const _code = {
        randomKey: formState.randomKey
    }
    // 回调接口
    await getMapping('http://172.16.2.195:8101/api/open/code', _code, 'blob').then((res) => {
        if (res.status == 200) {
            codeImgUrl.value = window.URL.createObjectURL(res.data)
        }
    })
}
</script>

<style>
.login {
    position: absolute;
    top: 50%;
    right: 10%;
    transform: translate(-30%, -30%);
    width: 400px;
    height: 300px;
}
</style>

<style lang="scss" scoped>
// .enter-y {
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
// }
</style>