<template>
    <Header />
    <Img>
    <div class="content-text">
        <h1 style="font-size: 30px;">归档</h1>
        <p>The first step is as good as half over.</p>
    </div>
    </Img>
    <Container>
        <template #blog>
            <div class="blog-item" style="flex-direction: row;">
                <ul class="timeline" ref="timeline">
                    <li v-for="(item, index) in blogs" :key="index">
                        <div class="blogitem" @click="router.push(`/${item.route}`)">
                            <div class="item-outside">
                                <span class="item-time"><i class="iconfont icon-clock">{{ item.date }}</i></span>
                                <span class="item-title" :data-text="`发表了一篇${item.type}`">发表了一篇{{ item.type }}</span>
                                <span class="item-blog">{{ item.title }}</span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </template>
    </Container>
</template>
    
<script lang="ts" setup>
import Header from '@/components/home/Header.vue';
import Img from '@/components/home/Img.vue'
import Container from '@/components/home/Container.vue';
import { ref, onBeforeMount, nextTick } from 'vue';
import { blogStore } from '@/stores/blogStore';
import { useRouter } from 'vue-router';
const router = useRouter()
const blog = blogStore()
const timeline = ref()
let blogs = ref(blog.blogs)
onBeforeMount(async () => {
    if (blogs.value.length == 0) {
        await blog.GETALLBLOG()
        blogs.value = blog.blogs
    }
    nextTick(() => {
        let lis: any[] = []
        timeline.value.childNodes.forEach((item: HTMLElement) => {
            if (item.nodeName == 'LI') lis.push(item)
        })
        let obServer = new IntersectionObserver(function (mutations) {
            mutations.forEach(item => {
                if (item.isIntersecting) {
                    (item.target as HTMLElement).style.height = '200px'
                }
            })
            if (mutations[0].isIntersecting) {
                (mutations[0].target as HTMLElement).style.height = '200px'
            }
        })
        lis.forEach((li: any) => {
            obServer.observe(li)
        })
    })
})
</script>

<style lang="less" scoped>
.timeline {
    padding-top: 5vh;
    padding-bottom: 150px;

    li {
        height: 50px;
        width: 3px;
        position: relative;
        background: white;
        transition: 2s;

        .blogitem {
            position: relative;
            left: 30px;
            top: -30px;
            width: 300px;
            height: 150px;
            border-radius: 10px;
            overflow: hidden;
            padding: 2px;
            cursor: pointer;

            &:hover::before {
                background: yellow;
            }

            &:hover::after {
                background: yellow;
            }

            .item-outside {
                position: absolute;
                inset: 2px;
                border-radius: 10px;
                background: white;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                align-items: center;
                z-index: 5;

                span {
                    margin-top: 0 !important;
                }

                .item-time {
                    text-align: center;
                    color: gray;

                    i {
                        font-size: 5px;
                    }
                }

                &:hover .item-title::before {
                    width: 100%;
                }

                .item-title {
                    position: relative;
                    font-family: '方正舒体';
                    font-size: 30px;
                    width: fit-content;
                    color: transparent;
                    -webkit-text-stroke: 1px black;

                    &::before {
                        content: attr(data-text);
                        position: absolute;
                        color: black;
                        width: 0px;
                        border-right: 5px solid black;
                        white-space: nowrap;
                        overflow: hidden;
                        transition: 1s;
                    }
                }

                .item-blog {
                    font-family: '方正舒体';
                    font-size: 25px;
                    display: -webkit-box;
                    overflow: hidden;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                }
            }

            &::before {
                content: '';
                position: absolute;
                right: 50%;
                top: 50%;
                width: 200px;
                height: 300px;
                background: linear-gradient(to top, transparent, aqua, aqua);
                transform-origin: right top;
                animation: rotate 6s infinite linear;
            }

            &::after {
                content: '';
                position: absolute;
                left: 50%;
                bottom: 50%;
                width: 200px;
                height: 300px;
                background: linear-gradient(to top, aqua, aqua, transparent);
                transform-origin: left bottom;
                animation: rotate 6s infinite linear;
            }
        }

        &::before {
            content: '';
            position: absolute;
            left: 50%;
            height: 15px;
            width: 15px;
            border-radius: 50%;
            transform: translate(-50%, -50%);
            backdrop-filter: blur(5px);
            border: 4px solid white;
        }

        &:last-child {
            height: 0 !important;
        }
    }

}
</style>