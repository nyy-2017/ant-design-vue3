<template>
  <div class="home">
    <a-layout>
      <a-layout-sider>
        <div class="logo">
          <img src="@/assets/images/logo1.png" alt />
          <span>&nbsp;&nbsp;六捷C3超时管理系统</span>
        </div>
        <a-menu
          :default-selected-keys="[1]"
          :default-open-keys="['sub1']"
          mode="inline"
          theme="dark"
        >
        <menuItem :item="item" v-for="item in menuList" :key="item.key" />
      </a-menu>
      </a-layout-sider>

      <a-layout>
        <a-layout-header>
          header
        </a-layout-header>
        <a-layout-content style="margin: 0 16px">
          <!-- 子路由跳转-->
          <router-view></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>
  
<script>
import menuItem from './menuItem.vue';
export default {
  name: 'Home',
  components:{
    menuItem
  },
  data() {
    return {
      menuList: [
        {
          key: 1,
          icon: 'pie-chart',
          title: '首页',
          children: []
        },
        {
          key: 2,
          icon: 'desktop',
          title: '表格',
          children: []
        },
        {
          key: 3,
          icon: 'inbox',
          title: '选择框',
          children: []
        },
        {
          key: 'sub1',
          icon: 'mail',
          title: '表单',
          children: [
            {
              key: '5',
              icon: 'mail',
              title: '输入框',
              children: []
            },
            {
              key: '6',
              icon: 'mail',
              title: '选择框',
              children: []
            }
          ]
        },
        {
          key: 'sub2',
          icon: 'appstore',
          title: '上传下载',
          children: [
            {
              key: '9',
              icon: '',
              title: '上传',
              children: []
            },
            {
              key: '10',
              icon: '',
              title: '下载',
              children: []
            },
            {
              key: 'sub3',
              icon: '',
              title: '其他',
              children: [
                {
                  key: '11',
                  icon: '',
                  title: '其他1',
                  children: []
                },
                {
                  key: '12',
                  icon: '',
                  title: '其他2',
                  children: []
                }
              ]
            }
          ]
        }
      ]
    }
  },
  methods: {
    getData: function (record) {
      console.log(record)
    }
  }
}
</script>
  
  <style lang="less" scoped>
  .home {
    width: 100%;
    height: 100vh;
    .title {
      font-size: 40px;
      letter-spacing: 2px;
    }
  }
  .logo {
    width: 120%;
    height: 64px;
    line-height: 64px;
    color: #fff;
    display: inline-block;
    vertical-align: middle;
    img {
      width: 36px;
      vertical-align: inherit;
    }
    span {
      font-size: 20px;
      font-weight: bold;
    }
  }
  </style>
  