<template>
    <div class="transverse-menu" :style="`--activeColor:${activeColor || 'white'};--color:${color || 'black'}`">
        <div class="toggle" @click="isActive = !isActive" :class="{ active: isActive }"></div>
        <ul class="t-menu" :class="{ active: isActive }">
            <li><i class='iconfont icon-home' @click="handleToPush('home')"></i></li>
            <li><i class='iconfont icon-box' @click="handleToPush('archives')"></i></li>
            <li><i class="iconfont icon-component" @click="handleToPush('somecomponent')"></i></li>
            <li><i class='iconfont icon-chain' @click="handleToPush('chain')"></i></li>
            <li><i class='iconfont icon-head' @click="handleToPush('about')"></i></li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { ref, toRefs } from 'vue'
import router from '@/router';
const props = defineProps(['activeColor', 'color'])
const { activeColor, color } = toRefs(props)
let isActive = ref(false)
const handleToPush = (path: string) => {
    router.push(`/${path}`)
}
</script>

<style scoped lang="less">
.transverse-menu {
    position: fixed;
    left: 50%;
    top: 70%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;

    .toggle {
        position: absolute;
        top: 60px;
        left: 50%;
        transform: translateX(-50%);
        width: 40px;
        height: 40px;
        border-radius: 50%;
        cursor: pointer;
        box-shadow: 0 1px 5px 1px var(--color);

        &:hover {
            background: rgba(0, 0, 0, .1);
        }

        &::before {
            content: '';
            position: absolute;
            left: 7.5px;
            top: 13px;
            height: 3px;
            width: 25px;
            transform-origin: center;
            transition: .5s;
            border-radius: 20px;
            background-color: var(--color);
        }

        &::after {
            content: '';
            position: absolute;
            left: 7.5px;
            top: 23px;
            height: 3px;
            width: 25px;
            transform-origin: center;
            transition: .5s;
            border-radius: 20px;
            background-color: var(--color);
        }

        &.active {
            box-shadow: 0 1px 5px 1px var(--activeColor);
        }

        &.active::before {
            background-color: var(--activeColor);
            transform: translateY(5px) rotate(45deg);
        }

        &.active::after {
            background-color: var(--activeColor);
            transform: translateY(-5px) rotate(-45deg);
        }
    }

    .t-menu {
        width: 0;
        height: 50px;
        overflow: hidden;
        display: flex;
        justify-content: space-around;
        border: 2px solid transparent;
        align-items: center;
        border-radius: 50px;
        transition: .6s;

        li {
            i {
                color: var(--color);
                font-weight: 400;
                font-size: 30px;

                &:hover {
                    cursor: pointer;
                    color: var(--activeColor);
                }
            }
        }
    }

    .t-menu.active {
        border-color: var(--activeColor);
        width: 400px;
    }
}
</style>