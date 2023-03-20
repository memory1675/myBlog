<template>
    <header :style="computedColor">
        <div class="logo">
            <h1 @click="routePush('home')">M-Mory</h1>
        </div>
        <ul class="show-phone-nav">
        </ul>
        <ul class="nav">
            <li class="nav-item" @click="routePush('home')"><i class='iconfont icon-home'></i>首页</li>
            <li class="nav-item" @click="routePush('archives')"><i class='iconfont icon-box'></i>归档</li>
            <li class="nav-item" @click="routePush('somecomponent')"><i class='iconfont icon-component'></i>组件</li>
            <li class="nav-item" @click="routePush('chain')"><i class='iconfont icon-chain'></i>友链</li>
            <li class="nav-item" @click="routePush('about')"><i class='iconfont icon-head'></i>关于</li>
        </ul>
        <div class="phone-nav" @click="toggleNav" ref="phonenav"></div>
    </header>
    <ul class="show-phone-nav" :style="{ left: leftValue }">
        <li class="nav-head">
            <div class="head-top">
                <div class="head"></div>
                <div class="text">
                    <div class="name">M-Mory</div>
                    <div class="location"><i class="iconfont icon-location"></i>NanChang</div>
                </div>
            </div>
            <div class="head-bottom">
                <a href="https://github.com/memory1675" title="github">
                    <i class='iconfont icon-github'></i>
                </a>
                <a href="" title="email"><i class="iconfont icon-email-fill"></i></a>
                <a href="tencent://AddContact/?fromId=45&fromSubId=1&subcmd=all&uin=2856855810&website=www.oicqzone.com"
                    title="qq"><i class="iconfont icon-QQ"></i></a>
                <a href="" title="wechat"><i class="iconfont icon-wechat-fill"></i></a>
            </div>
        </li>
        <li class="nav-item" @click="routePush('home')" style="--size:0px">
            <i class='iconfont icon-home'></i><span>首页</span>
        </li>
        <li class="nav-item" @click="routePush('archives')" style="--size:1px">
            <i class='iconfont icon-box'></i><span>归档</span>
        </li>
        <li class="nav-item" @click="routePush('somecomponent')" style="--size:2px">
            <i class='iconfont icon-component'></i><span>一些组件</span>
        </li>
        <li class="nav-item" @click="routePush('chain')" style="--size:2px">
            <i class='iconfont icon-chain'></i><span>友链</span>
        </li>
        <li class="nav-item" @click="routePush('about')" style="--size:3px">
            <i class='iconfont icon-head'></i><span>关于</span>
        </li>
    </ul>
    <div class="overlay" v-show="phoneNavToggle" @click="handleDelayClick"></div>
    <Menu :menuPosition="menu1Position" />
    <Menu :menuPosition="menu2Position" size="small" />
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref, computed, toRefs } from 'vue';
import Menu from './Menu.vue';
const props = defineProps(['color'])
const { color } = toRefs(props)
const computedColor = computed(() => {
    return color.value ? `--fontColor:${color.value}` : ''
})
const router = useRouter();
const phonenav = ref();
const currentRoute = ref(router.currentRoute.value.meta.showMenu);
const menu1Position = {
    p1: ['-55px', '-55px'],
    p2: ['0px', '-75px'],
    p3: ['55px', '-55px'],
    p4: ['-55px', '55px'],
    p5: ['0px', '75px'],
    p6: ['55px', '55px'],
}
const menu2Position = {
    p1: ['-20px', '-75px'],
    p2: ['-45px', '-50px'],
    p3: ['-60px', '-20px'],
    p4: ['-60px', '13px'],
    p5: ['-45px', '50px'],
    p6: ['-20px', '75px'],
}
let phoneNavToggle = ref(false)
//简化数据并执行一些操作
const leftValue = computed(() => {
    document.body.style.overflowY = phoneNavToggle.value ? 'hidden' : 'auto';
    return phoneNavToggle.value ? '0' : '-100%'
})
//路由跳转
function routePush(route: string) {
    router.push(`/${route}`)
}
//导航按钮Toggle
function toggleNav(e: Event) {
    (e.target as HTMLElement).classList.toggle('nav-active')
    phoneNavToggle.value = (e.target as HTMLElement).classList.contains('nav-active')
}
//遮罩的单击事件
const handleDelayClick = () => {
    phoneNavToggle.value = false;
    phonenav.value.classList.remove('nav-active')
}
</script>
 

<style scoped lang="less">
header {
    position: absolute;
    z-index: 2;
    width: 100%;
    height: 60px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: -30px;
        background: var(--headerBG);
        filter: blur(120px) drop-shadow(10px 10px 20px var(--headerBG));
    }

    .logo {
        z-index: 3;
        width: 200px;
        height: 60px;
        display: flex;
        color: var(--fontColor);
        justify-content: center;

        h1 {
            font-family: 'Press Start 2P';
            font-size: 20px;
            line-height: 60px;
            cursor: pointer;
        }
    }

    .nav {
        z-index: 3;
        display: flex;
        margin-right: 50px;
        font-size: 1.5rem;

        .nav-item {
            position: relative;
            width: 75px;
            height: 60px;
            line-height: 60px;
            color: var(--fontColor);
            text-align: center;
            list-style: none;
            font-weight: 550;
            cursor: pointer;

            i {
                position: relative;
                top: 1px;
                padding-right: 5px;
            }

            &:first-child i {
                top: 0px;
            }

            &:hover::before {
                transition: width .5s;
                width: 40px;
            }

            &::before {
                content: '';
                position: absolute;
                left: 25%;
                bottom: 0;
                width: 0;
                height: 2px;
                background: var(--fontColor);
            }
        }
    }

    .phone-nav {
        position: relative;
        width: 30px;
        height: 30px;
        display: none;
        margin-right: 20px;
        cursor: pointer;

        &::before {
            content: '';
            position: absolute;
            top: 5px;
            width: 30px;
            height: 3px;
            background-color: var(--fontColor);
            border-radius: 50px;
            box-shadow: 0 10px var(--fontColor);
            transition: .5s;
            transform-origin: left;
        }

        &::after {
            content: '';
            position: absolute;
            bottom: 3px;
            width: 30px;
            height: 3px;
            background-color: var(--fontColor);
            border-radius: 50px;
            transition: .5s;
            transform-origin: left;
        }

        &.nav-active::before {
            //translateY(7px) 
            transform: translateY(-1px) rotate(45deg);
            box-shadow: none;
        }

        &.nav-active::after {
            //translateY(-12px) 
            transform: translateY(1.5px) rotate(-45deg);
            box-shadow: none;
        }
    }
}

.menu1,
.menu2 {
    position: fixed;
    right: 130px;
    bottom: 130px;
    z-index: 50;

    li {
        position: absolute;
        list-style: none;
        height: 50px;
        width: 50px;
        left: 0;
        top: 0;
        border-radius: 50%;
        background-color: #D7186C;
        cursor: pointer;
        text-align: center;
        transition: .5s;

        i {
            font-size: 30px;
            line-height: 50px;
        }

        &:nth-child(1) {
            z-index: 100;
        }

        &:nth-child(1).active~li {
            left: var(--left);
            top: var(--top);
        }
    }
}

.menu2 {
    right: 45px;
    bottom: 120px;
    display: none;

    li {
        width: 30px;
        height: 30px;

        i {
            line-height: 30px;
            font-size: 20px;
        }
    }
}

.show-phone-nav {
    position: fixed;
    top: 0;
    right: -100%;
    z-index: 20000;
    width: 40vw;
    height: 100%;
    background: rgba(255, 255, 255, .9);
    transition: .3s;

    display: flex;
    flex-direction: column;
    align-items: center;

    .nav-head {
        width: 100%;
        flex: 0 0 20%;
        display: flex;
        flex-direction: column;
        align-items: center;

        .head-top {
            width: 100%;
            flex: 0 0 80%;
            background: var(--fontColor);
            display: flex;
            justify-content: center;
            align-items: center;

            .head {
                width: 17vw;
                height: 17vw;
                border-radius: 50%;
                background: url(@/assets/head.jpg) no-repeat;
                background-size: cover;
                background-position: center;
            }

            .text {
                height: 100px;
                flex: 0 0 40%;
                font-family: 'Press Start 2P';
                color: white;
                display: flex;
                flex-direction: column;
                align-items: center;

                .name {
                    flex: 0 0 30%;
                    line-height: 50px;
                    font-size: 20px;
                }

                .location {
                    font-size: 15px;
                    flex: 1;
                    line-height: 50px;

                    i {
                        position: relative;
                        top: -2px;
                    }
                }
            }

        }

        .head-bottom {
            width: 100%;
            flex: 1;
            background: #91ABE1;
            display: flex;
            justify-content: space-around;
            align-items: center;

            a {
                text-decoration: none;
            }

            a:hover i {
                color: #6B63E3;
            }

            i {
                color: white;
                flex: 0 0 20%;
                text-align: center;
                font-size: 20px;
            }
        }
    }

    .nav-item {
        width: 100%;
        flex: 0 0 10%;
        padding: 10px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        font-size: 25px;
        box-shadow: -2px -2px 10px var(--size) rgba(0, 0, 0, 0.65);

        i {
            position: relative;
            top: 2px;
        }

        span {
            font-family: Georgia, 'Times New Roman', Times, serif;
            font-size: 18px;
            width: 60%;
        }

        &:hover {
            background: var(--fontColor);
            cursor: pointer;
        }

        &:active {
            opacity: .8;
        }
    }
}

.overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(3px);
    z-index: 5;
}


@media (max-width: 740px) {
    header .phone-nav {
        display: block;
    }

    header .nav {
        display: none;
    }
}

@media (max-width: 400px) {
    header .logo {
        width: 100px;

        h1 {
            font-size: 15px;
        }
    }

    .name {
        font-size: 13px !important;
    }

    .location {
        font-size: 10px !important;
    }
}

@media (max-width: 500px) {
    .show-phone-nav {
        width: 50vw;
    }
}

@media (min-width: 740px) {
    .show-phone-nav {
        display: none;
    }

    .overlay {
        display: none;
    }
}
</style>