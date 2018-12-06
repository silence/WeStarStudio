<template>
    <div>
        <van-button @click="show=true">test</van-button>
        <van-popup :show="show" position="bottom" overlay="false" @click-overlay="show=false">
            <van-area
                :area-list="areaList"
                columns-num="1"
                title="标题"
                @confirm="onConfirm"
                @cancel="show=false"
            />
        </van-popup>
        <van-cell-group>
            <van-field
                :value="message"
                label="留言"
                type="textarea"
                placeholder="请输入留言"
                autosize
                border="false"
                @change="textChange"
            />
        </van-cell-group>
    </div>
</template>
<script>
// import WXP from 'minapp-api-promise'
export default {
    data() {
        return {
            message: '',
            areaList: {
                province_list: {
                    1: '第一周',
                    2: '第二周',
                    3: '第三周',
                    4: '第四周',
                    5: '第五周',
                    6: '第六周',
                    7: '第七周',
                    8: '第八周',
                    9: '第九周',
                    10: '第十周',
                    11: '第十一周',
                    12: '第十二周',
                    13: '第十三周',
                    14: '第十四周',
                    15: '第十五周',
                    16: '第十六周',
                    17: '第十七周'
                }
            },
            show: true
        }
    },
    methods: {
        onConfirm(e) {
            console.log(e)
            this.show = false
            // WXP.request({
            //     url: 'https://impapi.happyfatotaku.fun/Leave/LeaveRequest',
            //     data: {
            //         name: '陈军材',
            //         week: parseInt(e.target.detail.code),
            //         reason: this.message
            //     },
            //     method: 'POST'
            // })
        },
        textChange(e) {
            console.log(e.mp.detail)
            this.message = e.mp.detail
        },
        onClose() {}
    }
}
</script>
<style scoped>
</style>


