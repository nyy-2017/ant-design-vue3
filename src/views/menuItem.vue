<template>
    <!-- 2级 -->
    <template v-if="!item.children || item.children.length == 0">
        <a-menu-item :key="item.key">
            <template v-if="item.icon">
                <icon :type="item.icon" />
            </template>
            <span>{{ item.title }}</span>
        </a-menu-item>
    </template>

    <template v-else>
        <!-- 3级 -->
        <a-sub-menu :key="item.key" >
            <span slot="title">
                <span>{{ item.title }}</span>
                <template v-if="item.icon">
                    <icon :type="item.icon" />
                </template>
            </span>
            <menu-item :item="elm" v-for="elm in item.children" :key="elm.key" />
        </a-sub-menu>
    </template>

</template>

<script>
  import Icon from '@ant-design/icons-vue'
  export default {
    name: 'menuItem',
    props: {
      item: String
    }
  }
  </script>
  
  <style lang="less">
  .ant-layout,
  .ant-layout-has-sider {
    height: 100%;
  }
  .ant-menu.ant-menu-inline.ant-menu-root.ant-menu-dark {
    overflow-x: hidden;
    overflow-y: auto;
    height: calc(100% - 64px);
  
    /* 定义滚动条高宽及背景高宽分别对应横竖滚动条的尺寸 */
    &::-webkit-scrollbar {
      width: 10px;
      height: 10px;
      background-color: #f5f5f5;
    }
    /* 定义滚动条轨道 内阴影+圆角 */
    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      // border-radius: 5px;
      background-color: #f5f5f5;
    }
    /* 定义滑块 内阴影+圆角 */
    &::-webkit-scrollbar-thumb {
      // border-radius: 5px;
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      background-color: #001529;
    }
  }
  .ant-menu-item {
    margin-top: 0 !important;
  }
  </style>
  