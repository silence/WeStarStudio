<template>
    <div>
        <h1>test</h1>
        <button type="default" @click="showPicker">选择请假时间</button>
        <mp-picker ref="mpPicker" :mode="mode" :pickerValueDefault="pickerValueDefault" @onChange="onChange" @onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="pickerValueArray"></mp-picker>
        <textarea v-model="leaveReason" placeholder="请假原因"></textarea>
    </div>
</template>
<script>
import mpPicker from 'mpvue-weui/src/picker'
export default {
    components: {
        mpPicker
    },
    data() {
        return {
            mode: 'selector',
            leaveReason: '',
            pickerValueArray: [
                {
                    label: '住宿费',
                    value: 1
                },
                {
                    label: '活动费',
                    value: 2
                },
                {
                    label: '通讯费',
                    value: 3
                },
                {
                    label: '补助',
                    value: 4
                }
            ]
        }
    },
    methods: {
        showPicker() {
            this.$refs.mpPicker.show()
        }
    }
}
</script>
<style scoped>
</style>


