<template>
  <div>
    <vxe-grid ref="tableRef" v-bind="gridOptions">
      <template #toolbar_buttons>
        <vxe-button status="success" size='mini' icon="vxe-icon-add" @click="addChild()">新增</vxe-button>
      </template>
      <template #operation="{ row }">
        <vxe-button status="success" size='mini' icon="vxe-icon-square-plus" @click="handleAdd(row)"> 下 级 新 增 </vxe-button>
        <vxe-button status="warning" size='mini' icon="vxe-icon-star" @click="handleDetail(row)"> 查 看 </vxe-button>
        <vxe-button status="primary" size='mini' icon="vxe-icon-edit" @click="handleEdit(row)"> 编 辑 </vxe-button>
        <vxe-button status="danger" size='mini' icon="vxe-icon-delete" @click="handleDelete(row)"> 删 除 </vxe-button>
      </template>
    </vxe-grid>

    <!-- 机构子组件 -->
    <organModal ref="organModalComponent" @refresh="gridGetData"/>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import { VxeGridProps } from 'vxe-table'
import { Modal, message } from 'ant-design-vue';
import { get_organInfo, delete_organInfo } from '@/api/system/organ';
import organModal from './organModal.vue'
import { findParentName } from '@/utils/findParent'
const organModalComponent = ref();
const tableRef = ref();
let tableData: any
const gridOptions = reactive<VxeGridProps>({
  id: 'VxeTable',
  border: true,
  showOverflow: true,
  showFooter: true,
  size: 'mini',
  height: (window.innerHeight) - 140,
  loading: false,
  scrollX: {
    enabled: true,
  },
  scrollY: {
    enabled: true,
  },
  treeConfig: { expandAll: true, lazy: true, reserve: true, childrenField: 'children',  iconOpen: 'vxe-icon-square-minus', iconClose: 'vxe-icon-square-plus'},
  columns: [
    // { type: 'seq', title: '序号', width: 80 },
    { field: 'orgName', title: '机构名称', minWidth: 300, treeNode: true },
    { field: 'speed', title: '操作', align: 'center', width: 400, slots: { default: 'operation' } }
  ],
  data: [],
  pagerConfig: {
    enabled: false
  },
  toolbarConfig: {
    perfect: true,
    // export: false,
    // print: false,
    custom: true,
    // refresh: true,
    zoom: { 
      iconIn: 'vxe-icon-zoom-out',
      iconOut: 'vxe-icon-zoom-in'
    },
    slots: {
      buttons: 'toolbar_buttons'
    }
  },
})

function addChild() { // 本级新增
  organModalComponent.value.addChildData()
}
function handleAdd(row: any) {  // 下级新增
  organModalComponent.value.AddData(row)
}
function handleDetail(row: any) {  // 详情
  organModalComponent.value.detailData(row)
}
function handleEdit(_row: any) { // 编辑
  let parentOrgName: any
  // 上级 / 本机机构名称
  parentOrgName = findParentName(tableData, _row)
  organModalComponent.value.EditData(_row, parentOrgName)
}
async function handleDelete(row: { dataNum: any; }) {   // 删除
  Modal.confirm({
    title: '温馨提示：',
    content: '您确定删除该数据吗？',
    okText: '确认',
    cancelText: '取消',
    onOk() {
      delete_organInfo({orgId: row.dataNum}).then((res) => {
        const { code } = res.data
        if (code === 0) {
          message.success('成功删除一条数据.')
          gridGetData()
        } else {
          message.error(res.message)
        }
      })
    },
    onCancel() {},
  });
}

onMounted(() => {
  gridGetData()
})


async function gridGetData() {
  gridOptions.loading = true;
  let response = await get_organInfo()
  // console.log('response:', response)
  const { data } = response.data
  if (data) {
    // console.log('data:', data)
    gridOptions.data = data
    tableData = data
    const $table = tableRef.value
    if ($table) {
      $table.setAllTreeExpand(true)
    }
    gridOptions.loading = false
  }
}
</script>