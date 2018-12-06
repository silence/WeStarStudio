<template>
    <div class="container">
        <!-- 展示文字,类似we重邮 -->
        <div class="title">StarStudio</div>
        <!-- 展示logo -->
        <div class="content">
            <div class="hd" :style="{transform: 'rotateZ(' + angle + 'deg)'}">
                <img class="logo" src="../images/logo.png">
                <img class="wave" src="../images/wave.png" mode="aspectFill">
                <img class="wave wave-bg" src="../images/wave.png" mode="aspectFill">
            </div>
            <div class="bd">
                <form class="login-form">
                    <div class="input-group">
                        <span class="input-label">账号</span>
                        <input
                            type="number"
                            v-model.lazy="username"
                            cursor-spacing="30"
                            id="userid"
                            maxlength="7"
                            placeholder="工作室SSO账号"
                        >
                    </div>
                    <div class="input-group">
                        <span class="input-label">密码</span>
                        <input
                            password="true"
                            v-model.lazy="password"
                            cursor-spacing="30"
                            id="passwd"
                            placeholder="工作室SSO密码"
                        >
                    </div>
                    <!-- <div class="login-help" bindtap="showHelp">
                    <span>帮助</span>
                    <img class="login-help-img" src="/images/more/help.png"></img>
                    </div>-->
                </form>
                <div class="confirm-btn" bindtap="bind" @click="onConfirm">
                    <div>确认绑定</div>
                </div>
                <button @click="test1">test</button>
            </div>
        </div>
    </div>
</template>
<script>
import { throttle } from '../utils/'
import WXP from 'minapp-api-promise'

export default {
    data() {
        return {
            angle: 0,
            userid: '',
            passwd: ''
        }
    },
    // computed: {
    //     style() {
    //         return {
    //             transform: 'rotateZ(' + this.angle + 'deg)'
    //         }
    //     }
    // },
    methods: {
        test() {
            console.log(1)
        },
        onConfirm() {
            WXP.request({
                url: 'http://stuhome.uestc.edu.cn/api/v1/authserver/login?appid=1',
                data: {
                    username: 'Admin',
                    password: 'starstudio'
                },
                method: 'POST'
            }).then(res => {
                console.log(res)
                wx.setStorageSync('sessionid', res.header['Set-Cookie'])
            })
        },
        test1() {
            WXP.request({
                url: 'http://stuhome.uestc.edu.cn/api/v1/authserver/login?appid=1',
                data: {},
                method: 'POST',
                header: { cookie: wx.getStorageSync('sessionid') }
            })
        }
    },
    mounted() {
        wx.startAccelerometer({
            interval: 'ui'
        })
        wx.onAccelerometerChange(
            throttle(res => {
                let angle = -(res.x * 30).toFixed(1)
                // 边缘修正
                if (angle > 14) {
                    angle = 14
                } else if (angle < -14) {
                    angle = -14
                }

                if (this.angle !== angle) {
                    this.angle = angle
                }

                console.log(this.angle)
            }, 100)
        )
    },
    // beforeDestroy() {
    //     wx.stopAccelerometer()
    // }, 不是这个
    // destroyed() {
    //     wx.stopAccelerometer()
    // } 不是这个
    // onHide() {
    //     wx.stopAccelerometer()
    // } 不是这个
    onUnload() {
        wx.stopAccelerometer()
    }
}
</script>
<style scoped>
.container {
    background: #7acfa6;
    height: 100vh;
    overflow: hidden;
}
.title {
    width: 100%;
    height: 30vh;
    animation: show 2.5s cubic-bezier(0.19, 1, 0.22, 1) 0.5s forwards;
    font-family: 'Courier New', Courier, monospace;
    font-size: 40px;
    font-weight: 800;
    font-style: italic;
    color: #ffffff;
    text-align: center;
    line-height: 17vh;
}
@keyframes show {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 0.95;
    }
}
.content {
    width: 100%;
    height: 70vh;
    background: -webkit-gradient(
        linear,
        left top,
        left bottom,
        from(rgba(244, 244, 244, 0)),
        color-stop(0.1, #f4f4f4),
        to(#f4f4f4)
    );
    transform: translate3d(0, 100%, 0);
    animation: rise 3s cubic-bezier(0.19, 1, 0.22, 1) 0.25s forwards;
}
@keyframes rise {
    0% {
        opacity: 0;
        transform: translate3d(0, 100%, 0);
    }
    50% {
        opacity: 1;
    }
    100% {
        opacity: 1;
        transform: translate3d(0, 0, 0);
    }
}
.hd {
    display: relative;
    width: 100%;
    height: 200rpx;
    transition: all 0.5s ease-in-out;
}
.logo {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 160rpx;
    height: 160rpx;
    border-radius: 160rpx;
    z-index: 2;
    animation: sway 10s ease-in-out infinite;
    opacity: 0.95;
    top: -150rpx;
}
@keyframes sway {
    0% {
        transform: translate(-50%, 20rpx) rotate(-15deg);
    }
    17% {
        transform: translate(-50%, 0rpx) rotate(25deg);
    }
    34% {
        transform: translate(-50%, -20rpx) rotate(-20deg);
    }
    50% {
        transform: translate(-50%, -10rpx) rotate(15deg);
    }
    67% {
        transform: translate(-50%, 10rpx) rotate(-25deg);
    }
    84% {
        transform: translate(-50%, 15rpx) rotate(15deg);
    }
    100% {
        transform: translate(-50%, 20rpx) rotate(-15deg);
    }
}
.wave {
    position: absolute;
    z-index: 3;
    right: 0;
    bottom: 0;
    opacity: 0.725;
    height: 260rpx;
    width: 2250rpx;
    animation: wave 10s linear infinite;
}
.wave-bg {
    z-index: 1;
    animation: wave-bg 10.25s linear infinite;
}
@keyframes wave {
    from {
        transform: translate3d(125rpx, 0, 0);
    }
    to {
        transform: translate3d(1125rpx, 0, 0);
    }
}
@keyframes wave-bg {
    from {
        transform: translate3d(375rpx, 0, 0);
    }
    to {
        transform: translate3d(1375rpx, 0, 0);
    }
}
.bd {
    position: relative;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    animation: bd-rise 2s cubic-bezier(0.23, 1, 0.32, 1) 0.75s forwards;
    opacity: 0;
}
@keyframes bd-rise {
    from {
        opacity: 0;
        transform: translate3d(0, 60rpx, 0);
    }
    to {
        opacity: 1;
        transform: translate3d(0, 0, 0);
    }
}
form {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
}
.input-group {
    display: flex;
    align-items: center;
    padding: 25rpx 10rpx;
    margin: 40rpx 3%;
    background: #fff;
    border-radius: 5px;
    border: 2px solid #f4f4f4;
    transition: all 0.25s ease-in-out;
}
.input-group.active {
    border: 2px solid #7acfa6;
}
.input-label {
    color: #888;
    font-size: 13pt;
    height: 25rpx;
    line-height: 25rpx;
    padding: 0 25rpx;
    border-right: 1px solid #d8d8d8;
}
.input-group input,
.input-group picker {
    flex: 1;
    font-size: 13pt;
    min-height: 52rpx;
    height: 52rpx;
    line-height: 52rpx;
    padding: 0 25rpx;
}
.input-placeholder,
.input-group picker.placeholder {
    color: #ccc;
}
.confirm-btn {
    font-size: 13pt;
    line-height: 85rpx;
    height: 85rpx;
    background: #7acfa6;
    color: #fff;
    text-align: center;
    border-radius: 5px;
    margin: 50rpx 3%;
}
.confirm-btn:active {
    opacity: 0.8;
}
</style>


