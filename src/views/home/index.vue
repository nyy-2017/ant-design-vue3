<template>
    <div>
        GPT打字机效果—— fetchEventSouce进行sse流式请求
        <a-row>
            <a-col :span="20">
                <a-progress :percent="percentNum" status="active" />
        
                <a-textarea
                    v-model:value="containText"
                    placeholder="number"
                    :auto-size="{ minRows: 2, maxRows: 5 }"
                />
                
            </a-col>
        </a-row>
    </div>
</template>

<script lang="ts" setup>
    import { fetchEventSource } from '@microsoft/fetch-event-source'
    import { ref } from 'vue';
    const percentNum = ref<Number>(0);
    const containText = ref<string>('');
    let strArr = []
    getData()
    function getData() {
        let controller = new AbortController();
        fetchEventSource('/event_api/get_eventSource', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
            // body: '{}', // POST请求需要
            // signal: controller.signal,
            mode: 'cors',
            openWhenHidden: true,
            credentials: 'include',
            signal: controller?.signal,
            async onopen(response: any) {
                console.log('open=============')
                if (response.ok) {
                    console.log('开始建立连接');
                }
            },
            onmessage: async (event: any) => {
                let data = event.data
                let jsonData = JSON.parse(data)
                console.log('jsonData====', jsonData)
                strArr.push(jsonData.data)
                percentNum.value = jsonData.percentage *100
                containText.value = strArr.join('')
            },
            onerror(err: any) {
                console.log('err=====', err)
                // controller.abort(); // 出错后不要重试
                controller?.abort();
            },
            onclose() {
                console.log('oncloce======')
                controller?.abort();
                throw new Error();
            },

        }).catch((err: any) => {
            controller?.abort();
            console.log({ err });
            throw new Error(err);
        });
    }
</script>