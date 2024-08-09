<template>
    <div class="reviewReport">
        <a-tabs v-model="activeKey" @tabClick="handleClick">
            <a-tab-pane key="first" tab="待审核记录">
                <div v-if="activeKey === 'first'">
                    <review-report ref="chidReviewReport" />
                </div>
            </a-tab-pane>
            <a-tab-pane key="two" tab="全部审查记录">
                <div v-if="activeKey === 'two'">
                    <allReviewReport ref="chidAllReviewReport" />
                </div>
            </a-tab-pane>
        </a-tabs>
        <div class="header-btn">
            <vxe-button size="mini" @click="loadData(activeKey)"> 刷新 </vxe-button>
            <vxe-button status="success" size="mini" @click="addData(activeKey)">录入信息</vxe-button> 
            <vxe-button status="warning" size="mini" @click="downloadData(activeKey)"> 导出 </vxe-button>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { ref } from 'vue';
    import reviewReport from './c3analysisModule/reviewReport.vue';
    import allReviewReport from './c3analysisModule/allReviewReport.vue';
    // 默认选择第1个
    const activeKey = ref('first');

    // 引用子组件实例，然后调用子组件的方法
    const chidReviewReport = ref(null);
    const chidAllReviewReport = ref(null);

    // tab栏切换
    const handleClick = (tab: any, event: any) => {
      console.log(tab, event)
    }

    // 刷新
    const loadData = (_activeKey?: string) => {
        // console.log("_activeKey:", _activeKey)
        if (_activeKey === 'first') {
            if (chidReviewReport.value) {
                chidReviewReport.value.reviewReportLoadData('refresh')
            }
        } else if (_activeKey === 'two') {
            if (chidAllReviewReport.value) {
                // chidAllReviewReport.value.reviewReportLoadData('refresh')
            }
        }
    }
    
    // 录入信息
    const addData = (_activeKey?: string) => {
        if (_activeKey === 'first') {
            if (chidReviewReport.value) {
                chidReviewReport.value.enterInfoData()
            }
        } else if (_activeKey === 'two') {
            if (chidAllReviewReport.value) {
            //     chidAllReviewReport.value.enterInfoData()
            }
        }
    }
    // 导出
    const downloadData = (_activeKey?: string) => {
        if (_activeKey === 'first') {
            console.log('子组件方法被调用', _activeKey);
            if (chidReviewReport.value) {
                chidReviewReport.value.reviewReportDownload()
            }
        } else if (_activeKey === 'two') {
            if (chidAllReviewReport.value) {
                // chidAllReviewReport.value.downloadData()
            }
        }
    }
</script>

<style lang="scss" scoped>
  .reviewReport{
    position: relative;
    .header-btn{
      position: absolute;
      top: 0;
      right: 0;
    }
  }
</style>
