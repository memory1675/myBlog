<template>
    <Header color="white" />
    <Img :half="true" bg="url(http://memoryx.xyz:8002/file/bg1.png)" :repeat="true" color="white">
    <div class="content-text">
        <h1 style="font-size: 30px;">友链</h1>
        <p>The first step is as good as half over.</p>
    </div>
    </Img>
    <div class="chain">
        <div class="item-group">
            <div class="chain-item" v-for="item in blog.chains" :key="item.sort" :style="`--image:url(${item.logourl})`">
                <div class="head"></div>
                <a :href="item.url">
                    <div class="chain-item-content">
                        <div class="name">{{ item.chainname }}</div>
                        <div class="text">{{ item.text }}</div>
                    </div>
                </a>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Header from '@/components/home/Header.vue';
import Img from '@/components/home/Img.vue';
import { blogStore } from '@/stores/blogStore';
import { onMounted } from 'vue';
const blog = blogStore()

const getData = async () => {
    await blog.GETALLBLOG()
}

onMounted(() => {
    if(blog.chains.length == 0) getData()
})
</script>

<style lang="less" scoped>
.chain {
    height: fit-content;
    margin: 10px 0;
    display: flex;
    justify-content: center;
    align-items: center;

    .item-group {
        flex: 0 0 80%;
        height: fit-content;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        align-items: center;

        .chain-item {
            height: 170px;
            width: 300px;
            margin: 40px 20px;
            position: relative;

            a{
                text-decoration: none;
            }

            .chain-item-content {
                width: 100%;
                height: 100%;
                border-radius: 5px;
                overflow: hidden;
                position: relative;
                padding: 0 35px;
                display: flex;
                flex-direction: column;

                .name {
                    height: 40px;
                    font-size: 30px;
                    font-family: 'Press Start 2P';
                    line-height: 40px;
                    border-bottom: 2px solid var(--fontColor);
                    color: var(--fontColor);
                }

                .text {
                    flex: 1;
                    font-size: 30px;
                    font-family: '方正舒体';
                }

                &::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    margin: -30px;
                    background-color: var(--fontColor);
                    filter: blur(60px) opacity(.5) drop-shadow(2px 100px 0 white);
                }
            }

            &:hover .head {
                transform: translate(-50%, -50%) rotate(90deg);
            }

            .head {
                position: absolute;
                top: 50%;
                left: 0;
                width: 70px;
                height: 70px;
                border-radius: 50%;
                background-image: var(--image);
                background-repeat: no-repeat;
                background-position: center;
                background-size: cover;
                transform: translate(-50%, -50%);
                transition: .5s;
                z-index: 3;
            }
        }
    }
}

@media screen and (max-width:400px) {
    .chain {
        margin: 0;
    }

    .item-group {
        flex: 1 !important;
        padding-left: 20px !important;
    }
}

/* .content {
    width: 100%;
    height: 100vh;
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;

    .test1 {
        box-sizing: border-box;
        position: relative;
        height: 600px;
        width: 450px;
        border-radius: 10px;
        overflow: hidden;

        .inside {
            position: absolute;
            inset: 2px;
            border-radius: 10px;
            background-color: gray;
            z-index: 2;
        }

        &::before {
            content: '';
            position: absolute;
            left: -50%;
            top: -50%;
            height: 600px;
            width: 450px;
            background: linear-gradient(to top, transparent, aqua, aqua);
            transform-origin: right bottom;
            animation: rotate 6s infinite linear;
        }

        &::after {
            content: '';
            position: absolute;
            left: 50%;
            top: 50%;
            height: 600px;
            width: 450px;
            background: linear-gradient(to top, aqua, aqua, transparent);
            transform-origin: left top;
            animation: rotate 6s infinite linear;
        }
    }
}

@keyframes rotate {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
} */
</style>