<template>
    <Header color="white" />
    <Img :half="true" bg="url(http://memoryx.xyz:8002/file/bg1.png)" :repeat="true" color="white">
    <div class="content-text">
        <h1 style="font-size: 30px;">我的组件</h1>
        <p>The first step is as good as half over.</p>
    </div>
    </Img>
    <MainContainer bgColor="rgba(41,126,166,.7)">
        <template #content>
            <div class="component-content">
                <ul class="mouse-click">
                    <div class="head">
                        <h1 data-text="&nbsp;Click Style&nbsp;">&nbsp;Click Style&nbsp;</h1><i
                            @click="handleItemClick('clickStyle')" class="iconfont icon-reset"
                            style="margin-left: 40px;"></i>
                    </div>
                    <li :class="{ active: item.active }" @click="handleItemClick('clickStyle', item)"
                        v-for="(item, index) in component.clickStyle" :key="index">{{ item.name }}</li>
                </ul>
                <ul class="choose-menu">
                    <div class="head">
                        <h1 data-text="&nbsp;Menus">&nbsp;Menus&nbsp;</h1>
                        <i @click="handleItemClick('menus')" class="iconfont icon-reset" style="margin-left: 40px;"></i>
                    </div>
                    <li :class="{ active: item.active }" @click="handleItemClick('menus', item)"
                        v-for="(item, index) in component.menus" :key="index">{{ item.name }}</li>
                </ul>
            </div>
        </template>
    </MainContainer>
    <div ref="menu"></div>
</template>
<script lang="ts" setup>
import { h, render, ref, onBeforeUnmount } from 'vue'
import Header from '@/components/home/Header.vue';
import Img from '@/components/home/Img.vue'
import MainContainer from '@/components/archives/MainContainer.vue';
import { componentStore } from '@/stores/componentStore';
const component = componentStore()
const menu = ref()
const handleItemClick = async (key: string, item?: any) => {
    component[key].forEach(async (item: any) => {
        item.active = false;
        if (key != 'menus') (await item.Module).remove()
    })
    if (item) {
        switch (key) {
            //单击菜单项
            case 'menus':
                item.active = !item.active
                const H = await item.component
                const Menu = h(H, {
                    menuPosition: item.position,
                    where: '.component-content',
                    size: item.size || '',
                    show: true,
                    activeColor: '#F30068',
                    color: 'white',
                    style: {
                        display: 'block'
                    }
                })
                if (item.size) Menu.scopeId = 'Menu'
                render(Menu, menu.value)
                break;
            //单击点击样式项
            case 'clickStyle':
                item.active = item.active ? false : true
                const Module = await item.Module
                new Module(['I', 'Love', 'You'], 40)
                break;
        }
    } else if(key == 'menus') render(h('div'),menu.value)
}
onBeforeUnmount(() => {
    component.menus.forEach(item => item.active = false)
    render(h('div'),menu.value)
})


</script>

<style lang="less" scoped>
.component-content {
    padding: 20px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;

    &>ul {
        padding: 10px;
        flex: 0 0 20%;
        min-width: 300px;
        height: fit-content;
        border-radius: 4px;
        background-color: rgba(0, 0, 0, .3);
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;

        .head {
            margin: 0 20px;
            height: fit-content;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 2px solid rgba(0, 0, 0, .5);

            i {
                transition: transform 1s;
                transform-origin: center;

                &:hover {
                    color: white;
                    cursor: pointer;
                    transform: rotate(360deg);
                }
            }
        }

        h1 {
            position: relative;
            color: transparent;
            font-size: 30px;
            cursor: default;
            -webkit-text-stroke: 1px rgba(255, 255, 255, .5);

            &::before {
                content: attr(data-text);
                position: absolute;
                color: white;
                width: 0px;
                border-right: 5px solid rgba(255, 255, 255, .5);
                white-space: nowrap;
                overflow: hidden;
                transition: 1s;
            }

            &:hover::before {
                cursor: default;
                width: 100%;
            }
        }

        li {
            margin: 10px 0;
            width: 100%;
            box-shadow: 1px 1px 3px 0px white;
            border-radius: 5px;
            padding: 10px 0;
            text-align: center;
            font-size: 15px;

            &:hover {
                cursor: pointer;
                background: rgba(255, 255, 255, .7);
            }
        }
    }

}

li.active {
    background: rgba(255, 255, 255, .7);
}

@media (min-width: 740px) {
    .component-content {
        padding: 20px 0;
    }
}
</style>