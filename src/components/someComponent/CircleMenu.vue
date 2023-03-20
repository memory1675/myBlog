<template>
    <div class="circle-menu">
        <div class="main" @click.prevent="active = !active">
            <ul class="circle1" :class="{ active }">
                <li style="--left:-30px;--top:13px"><i class='iconfont icon-home' @click="handleToPush('home')"></i></li>
                <li style="--left:-12px;--top:-15px"><i class='iconfont icon-box' @click="handleToPush('archives')"></i>
                </li>
                <li style="--left:30px;--top:-30px"><i class="iconfont icon-component"
                        @click="handleToPush('somecomponent')"></i></li>
                <li style="--left:78px;--top:-15px"><i class='iconfont icon-chain' @click="handleToPush('chain')"></i>
                </li>
                <li style="--left:97px;--top:13px"><i class='iconfont icon-head' @click="handleToPush('about')"></i></li>
            </ul>
            <div class="circle2" :class="{ active }">

            </div>
            <div class="circle3" :class="{ active }">

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import router from '@/router';
let active = ref(false)
const handleToPush = (path: string) => {
    router.push(`/${path}`)
}
</script>

<style lang="less" scoped>
.circle-menu {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    .main {
        position: relative;
        height: 50px;
        width: 50px;
        border-radius: 50%;
        box-shadow: 0 0 10px 2px #DF179B;

        &::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translateX(-50%);
            width: 170px;
            height: 85px;
            z-index: 4;
            background: white;
        }

        .circle1,
        .circle2,
        .circle3 {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            display: flex;
            height: 170px;
            width: 170px;
            clip: rect(0, 170px, 85px, 0);
            border-top-left-radius: 50%;
            border-top-right-radius: 50%;
            border: 40px solid #DF179B;
            transition: 1s linear;

            &.active {
                transform: translate(-50%, -50%) rotate(-180deg);
            }
        }

        .circle1 {
            z-index: 3;

            li {
                position: absolute;
                left: var(--left);
                top: var(--top);
                height: fit-content;

                i {
                    font-size: 25px;
                }
            }
        }

        .circle2 {
            z-index: 2;
            opacity: .5;

            &.active {
                transition-delay: .2s;
            }
        }

        .circle3 {
            z-index: 1;
            opacity: .2;
            transition-delay: .4s;
        }
    }
}
</style>