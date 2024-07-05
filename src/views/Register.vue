<template>
    <a-form ref="formRef" name="custom-validation" :model="formState" :rules="rules" v-bind="layout"
        @finish="handleFinish" @validate="handleValidate" @finishFailed="handleFinishFailed" class="regClass">
        <a-form-item has-feedback label="用户名" name="userName" :rules="[{ required: true, message: '请输入用户名!' }]">
            <a-input v-model:value="formState.userName" autocomplete="off" />
        </a-form-item>
        <a-form-item has-feedback label="姓名" name="fullName" :rules="[{ required: true, message: '请输入姓名!' }]">
            <a-input v-model:value="formState.fullName" autocomplete="off" />
        </a-form-item>
        <a-form-item has-feedback label="密码" name="password">
            <a-input v-model:value="formState.password" type="password" autocomplete="off" />
        </a-form-item>
        <a-form-item has-feedback label="确认密码" name="checkPass">
            <a-input v-model:value="formState.checkPass" type="password" autocomplete="off" />
        </a-form-item>
        <a-form-item has-feedback label="年龄" name="age">
            <a-input-number v-model:value="formState.age" />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
            <a-button type="primary" html-type="submit">提交</a-button>
            <a-button style="margin-left: 10px" @click="resetForm">重置</a-button>
            <a-button type="link" :size="20" @click="toLogin">已有账号？去登录</a-button>
        </a-form-item>
    </a-form>
</template>
<script setup lang="ts">
import type { Rule } from 'ant-design-vue/es/form';
import { reactive, ref, toRaw } from 'vue';
import type { FormInstance } from 'ant-design-vue';
import router from "../router";
import { postMapping } from "../api/request";
interface FormState {
    userName: string,
    fullName: string,
    password: string;
    checkPass: string;
    age: number;
}
const formRef = ref<FormInstance>();
const formState = reactive<FormState>({
    userName: '',
    fullName: '',
    password: '',
    checkPass: '',
    age: 18,
});
//自定义校验规则,本例还使用 has-feedback 属性为输入框添加了表示校验结果的反馈图标
let checkAge = async (_rule: Rule, value: number) => {
    if (!value) {
        return Promise.reject('请输入年龄！');
    }
    if (!Number.isInteger(value)) {
        return Promise.reject('请输入数字！');
    } else {
        if (value < 18) {
            return Promise.reject('年龄必须大于18！');
        } else {
            return Promise.resolve();
        }
    }
};
let validatePass = async (_rule: Rule, value: string) => {
    if (value === '') {
        return Promise.reject('请输入密码!');
    } else {
        if (formState.checkPass !== '') {
            formRef.value?.validateFields('checkPass');
        }
        return Promise.resolve();
    }
};
let validatePass2 = async (_rule: Rule, value: string) => {
    if (value === '') {
        return Promise.reject('请确认密码!');
    } else if (value !== formState.password) {
        return Promise.reject("两次输入密码不一样!");
    } else {
        return Promise.resolve();
    }
};
const rules: Record<string, Rule[]> = {
    password: [{ required: true, validator: validatePass, trigger: 'change' }],
    checkPass: [{ validator: validatePass2, trigger: 'change' }],
    age: [{ validator: checkAge, trigger: 'change' }],
};
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
};
const handleFinish = (values: FormState) => {
    console.log(values, formState);
    postMapping("/api/sys/sysUser/addUser", toRaw(values)).then((res) => {
        console.log("请求成功", res)
    })
};
const handleFinishFailed = (errors: any) => {
    console.log(errors);
};
const resetForm = () => {
    formRef.value?.resetFields();
};
const handleValidate = (...args: any[]) => {
    console.log(args);
};
const toLogin = () => {
    router.push({ path: '/' });
}
</script>
<style>
.regClass {
    position: absolute;
    top: 50%;
    right: 0%;
    transform: translate(-30%, -30%);
    width: 700px;
    height: 600px;
}
</style>