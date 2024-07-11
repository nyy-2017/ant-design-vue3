<template>
    <div>
        <vxe-grid v-bind="gridOptions">
            <template #toolbar_buttons>
                <vxe-button status="success" size='mini' icon="vxe-icon-add" @click="addChild()">新增</vxe-button>
            </template>
            <template #operation="{ row }">
                <vxe-button status="primary" size="mini" icon="vxe-icon-information" @click="menuPermissionsData(row)"> 角 色 菜 单 </vxe-button>
                <vxe-button status="warning" size='mini' icon="vxe-icon-star" @click="handleDetail(row)"> 查 看 </vxe-button>
                <vxe-button status="primary" size='mini' icon="vxe-icon-edit" @click="handleEdit(row)"> 编 辑 </vxe-button>
                <vxe-button status="danger" size='mini' icon="vxe-icon-delete" @click="handleDelete(row)"> 删 除 </vxe-button>
            </template>
        </vxe-grid>

        <!-- 分页组件 -->
        <my-pagination
            ref="changPageSize"
            @chilPageSize="parentChangePage"
        >
        </my-pagination>
    </div>
  </template>
  
  <script lang="ts" setup>
    import { ref, reactive, onMounted } from 'vue'
    import { VxeGridProps } from 'vxe-table'
    import { Modal, message } from 'ant-design-vue';
    import { get_role_condition, delete_roleInfo} from '@/api/system/role'
    import MyPagination from '@/components/PageSize/myPagination.vue';

    const state = reactive({
        currentPage: 1,
        pageSize: 20
    });

    const changPageSize = ref();
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
        columns: [
            { type: 'seq', title: '序号', width: 80 },
            { field: 'roleName', title: '角色名称', minWidth: 300 },
            { field: 'roleDesc', title: '角色描述', minWidth: 300 },
            { field: 'speed', title: '操作', align: 'center', width: 400, slots: { default: 'operation' } }
        ],
        data: [],
        pagerConfig: {
            enabled: false
        },
        toolbarConfig: {
            perfect: true,
            custom: true,
            zoom: { 
                iconIn: 'vxe-icon-zoom-out',
                iconOut: 'vxe-icon-zoom-in'
            },
            slots: {
                buttons: 'toolbar_buttons'
            }
        },
    })

    
    
    function addChild() { // 新增
        // organModalComponent.value.addChildData()
    }
    function menuPermissionsData (row: any) {
        // 角 色 菜 单
    }
    function handleDetail(row: any) {  // 详情
        // organModalComponent.value.detailData(row)
    }
    function handleEdit(_row: any) { // 编辑
        // let parentOrgName: any
        // organModalComponent.value.EditData(_row, parentOrgName)
    }
    async function handleDelete(row: { dataNum: any; }) {   // 删除
        Modal.confirm({
            title: '温馨提示：',
            content: '您确定删除该数据吗？',
            okText: '确认',
            cancelText: '取消',
            onOk() {
                delete_roleInfo({orgId: row.dataNum}).then((res) => {
                    const { code } = res.data
                    if (code === 0) {
                        message.success('成功删除一条数据.')
                        // gridGetData()
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
    // 改变分页
    function parentChangePage(currentPage: { value: any; }, pageSize: { value: any; }) {
        console.log('++++:', currentPage, pageSize)
        state.currentPage = currentPage
        state.pageSize = pageSize
        console.log(currentPage, pageSize)
        setTimeout(()=> {
            gridGetData()
        }, 500)
    }
    // 查询
    async function gridGetData(){
        gridOptions.loading = true;
        let parmsData = {
            currentPage: state.currentPage, 
            pageSize: state.pageSize
        }
        let response = await get_role_condition(parmsData)
        // console.log('response:', response)
        const { list, total} = response.data.data
        if (list) {
            console.log('list:', list, total)
            gridOptions.data = list
            // total = total
            gridOptions.loading = false
        }
    }
</script>