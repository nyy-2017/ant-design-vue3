<template>
  <vxe-pager
    background
    size='mini'
    :current-page="props.currentPage"
    :page-size="props.pageSize"
    :total="props.total"
    :layouts="['PrevPage', 'JumpNumber', 'NextPage', 'Sizes','Total']"
    @page-change="handlePageChange">
  </vxe-pager>
</template>
   
<script lang="ts" setup>
  const props = defineProps({
    total: {
      type: Number,
      default: 0
    },
    pageSize: {
      type: Number,
      default: 20
    },
    limit: {
      type: Number,
      default: 10
    },
    currentPage: {
      type: Number,
      default: 1
    }
  });

  const emit = defineEmits(['chilPageSize']);

  const handlePageChange = ({ currentPage, pageSize }) => {
    props.currentPage = currentPage
    props.pageSize = pageSize
    emit('chilPageSize', currentPage, pageSize);
  };
   
  // watch(() => props.currentPage, (newVal) => {
  //   currentPage.value = newVal;
  // });
  </script>
   
  <style lang="scss" scoped>

  </style>