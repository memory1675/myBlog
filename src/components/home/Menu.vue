<template>
    <ul class="menu" ref="menu" :class="size" v-if="router.currentRoute.value.meta.showMenu || show">
        <li class="set" :class="{ active: menuOpen }" @mousemove="handleMouseMove" @mousedown="handleMouseDown"
            @mouseup="handleMouseUp" @click="menuOpen = !menuOpen"><i class='iconfont icon-setting-filling'></i></li>
        <li @click="handleMenuClick('top')" :style="`--left: ${menuPosition.p1[0]}; --top: ${menuPosition.p1[1]}`"><i
                class='iconfont icon-blog'></i></li>
        <li @click="handleMenuClick('blogTop')" :style="`--left: ${menuPosition.p2[0]}; --top: ${menuPosition.p2[1]}`"><i
                class='iconfont icon-doubleup'></i>
        </li>
        <li @click="handleMenuClickToRoute('home')" :style="`--left: ${menuPosition.p3[0]}; --top: ${menuPosition.p3[1]}`">
            <i class='iconfont icon-home'></i>
        </li>
        <li @click="handleMenuClickToRoute('archives')"
            :style="`--left: ${menuPosition.p4[0]}; --top: ${menuPosition.p4[1]}`"><i class='iconfont icon-box'></i>
        </li>
        <li @click="handleMenuClickToRoute('chain')"
            :style="`--left: ${menuPosition.p5[0]}; --top: ${menuPosition.p5[1]}`"><i class='iconfont icon-chain'></i>
        </li>
        <li @click="handleMenuClickToRoute('about')" :style="`--left: ${menuPosition.p6[0]}; --top: ${menuPosition.p6[1]}`">
            <i class='iconfont icon-head'></i>
        </li>
    </ul>
</template>

<script setup lang="ts">
import { ref, toRefs } from 'vue'
// import { useRouter } from 'vue-router'
import router from '@/router'
// const router = useRouter()
const menu = ref()
let menuOpen = ref(false)
const props = defineProps([ 'menuPosition', 'size', 'where', 'show'])
const { menuPosition, size, where, show } = toRefs(props)
let dragging = false
const handleMouseDown = (e: MouseEvent) => {
    dragging = true;
}
const handleMouseMove = (e: MouseEvent) => {
    if (dragging === false) return
    const v = size.value ? 15 : 25
    const x = e.clientX - v
    const y = e.clientY - v
    menu.value.style.left = x + 'px';
    menu.value.style.top = y + 'px';
}
const handleMouseUp = () => {
    dragging = false;
}

//menu单击事件
const handleMenuClickToRoute = (route: string) => {
    menuOpen.value = false;
    router.push(`/${route}`)
}
const handleMenuClick = (topWhere: string) => {
    menuOpen.value = false;
    if (topWhere === 'blogTop') {
        document.querySelector('#app')!.scrollIntoView({ behavior: 'smooth' })
    } else {
        document.querySelector(where.value ? where.value : '.container')!.scrollIntoView({ behavior: 'smooth' })
    }
}
</script>

<style lang="less" scoped>
.menu {
    position: fixed;
    right: 130px;
    bottom: 130px;
    height: fit-content;
    width: fit-content;
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

.small {
    right: 45px !important;
    bottom: 120px !important;
    display: none;

    li {
        width: 30px !important;
        height: 30px !important;

        i {
            line-height: 30px !important;
            font-size: 20px !important;
        }
    }
}

@media (max-width: 400px) {
    .menu {
        display: none;
    }

    .small {
        display: block !important;
    }
}
</style>