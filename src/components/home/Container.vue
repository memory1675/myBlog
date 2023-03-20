<template>
    <div class="container">
        <div class="content">
            <div class="user order-2">
                <div class="user-content">
                    <img src="@/assets/head.jpg" alt="head">
                    <h2>M-Mory</h2>
                    <label>The first step is as good as half over.</label>
                    <label><i class='iconfont icon-location'></i>Nan Chang</label>
                    <div class="show">
                        <div class="show_item">
                            <h3>博文</h3><label>{{ articleLength }}</label>
                        </div>
                        <div class="show_item">
                            <h3>笔记</h3><label>{{ noteLength }}</label>
                        </div>
                        <div class="show_item">
                            <h3>标签</h3><label>{{ labels.tags.length }}</label>
                        </div>
                    </div>
                    <button @click="handleToGit">关注我</button>
                    <div class="git">
                        <a href="https://github.com/memory1675" title="github"
                            style="text-decoration: none; color: var(--fontColor);">
                            <i class='iconfont icon-github'></i>
                        </a>
                    </div>
                </div>
                <div class="blog-advice" v-if="adviceBlog.length > 0">
                    <label>最新文章</label>
                    <div class="newarticle" v-for="item in adviceBlog" :key="item.id" @click="handleToView(item.route)">
                        <div class="article-time">{{ item.date }}</div>
                        <div class="article-title">
                            <span>{{ item.text }}</span>
                        </div>
                        <div class="article-type">{{ `${item.type}/${item.tags.join(',')}` }}</div>
                    </div>
                </div>
                <div class="timeline" v-if="blogs[0]?.timeline.length > 0">
                    <span>时间线</span>
                    <div class="time">
                        <div class="time-item" :style="{ background: date.check ? 'rgba(255, 255, 255, .7)' : 'none' }"
                            @click="handleCondition('date', date.date, date)" v-for="(date, index) in blogs[0]?.timeline"
                            :key="index">
                            {{ `${date.date.split('-')[1]}月 ${date.date.split('-')[0]}` }}
                            <span>
                                {{ date.sum }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="blog">
                <slot name="blog" :blogs="blogShow"></slot>
            </div>
            <div class="label-content">
                <div class="type" v-if="labels.types.length > 0">
                    <span>类型</span>
                    <div class="types">
                        <div class="type-item" :style="{ background: item.check ? 'rgba(255, 255, 255, .8)' : 'none' }"
                            @click="handleCondition('type', item.type, item)" v-for="(item, index) in labels.types"
                            :key="index">
                            {{ item.type }}
                            <span>
                                {{ item.sum }}
                            </span>
                        </div>
                    </div>
                </div>
                <div class="label" v-if="labels.tags.length > 0">
                    <span>标签</span>
                    <div class="labels">
                        <div class="label-item" :style="{ background: item.check ? 'rgba(255, 255, 255, .8)' : 'none' }"
                            @click="handleCondition('tag', item.tag, item)" v-for="(item, index) in labels.tags"
                            :key="index">
                            {{ item.tag }}
                            <span>
                                {{ item.sum }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, reactive, onUnmounted } from 'vue';
import { blogStore } from '@/stores/blogStore'
import { useRouter } from 'vue-router';
const router = useRouter()
const blog = blogStore()
let blogs = ref(blog.blogs)
let condition = reactive({ tags: [], types: ['博文'], dates: [] })
const getData = async () => {
    await blog.GETALLBLOG()
    blogs.value = blog.blogs
}
//路由跳转
const handleToView = (route: string) => {
    router.push(`/${route}`)
}

interface Labels {
    types: any[],
    tags: any[]
}

//简化显示数据 (类型和标签的显示  和数量)
const labels = computed(() => {
    let result: Labels = { types: [], tags: [] }
    result.types = blog.types.map(item => {
        return {
            type: item.type,
            sum: blogs.value.reduce((sum, blog) => {
                if (item.type == blog.type) return sum + 1
                else return sum
            }, 0),
            check: router.currentRoute.value.path == '/archives' ? false : item.type == '博文' ? true : false
        }
    }).filter(item => item.sum > 0);
    result.tags = blog.tags.map(item => {
        return {
            tag: item.tag,
            sum: blogs.value.reduce((sum, blog) => {
                return sum + blog.tags.map((tag: any) => {
                    if (tag == item.tag) return 1
                    else return 0
                }).reduce((a: number, num: number) => a + num, 0)
            }, 0),
            check: false
        }
    }).filter(item => item.sum > 0);
    return result;
})

const blogShow = computed(() => {
    return blogs.value.filter(blog => {
        let typeCheck = false
        let tagCheck = false
        let dateCheck = false
        if (condition.dates.length == 0) dateCheck = true
        else dateCheck = condition.dates.some(date => date == new Date(blog.date).toLocaleDateString().split('/').splice(0, 2).join('-'))

        if (condition.types.length == 0) typeCheck = true
        else typeCheck = condition.types.some(type => type == blog.type)

        if (condition.tags.length == 0) tagCheck = true
        else tagCheck = condition.tags.some(tag => blog.tags.some((item: any) => item == tag))

        return typeCheck && tagCheck && dateCheck
    })
})

//最新文章(取5篇)
const adviceBlog = computed(() => {
    return blogs.value.filter((_, index) => index < 5)
})

//博文数量
const articleLength = computed(() => blogs.value.filter(item => item.type == '博文').length)
//笔记数量
const noteLength = computed(() => blogs.value.filter(item => item.type == '笔记').length)

const handleToGit = () => {
    location.href = 'https://github.com/memory1675'
}

//条件变化
const handleCondition = (type: string, item: string, check: any) => {
    check.check = !check.check
    switch (type) {
        case 'date':
            condition.dates.some(t => item == t) ? condition.dates.splice(condition.dates.indexOf(item), 1) : condition.dates.push(item)
            break;
        case 'type':
            condition.types.some(t => item == t) ? condition.types.splice(condition.types.indexOf(item), 1) : condition.types.push(item)
            break;
        case 'tag':
            condition.tags.some(t => item == t) ? condition.tags.splice(condition.tags.indexOf(item), 1) : condition.tags.push(item)
            break;
    }
}

onMounted(() => {
    if (blogs.value.length == 0) getData()
})

onUnmounted(() => {
    condition = { tags: [], types: [], dates: [] }
})
</script>

<style lang="less">
/* #region user模块 */
.user-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    img {
        width: 120px;
        height: 120px;
        border-radius: 50%;
    }

    h2 {
        font-family: 'Times New Roman', Times, serif;
        font-size: 2rem;
    }

    label {
        font-family: '方正舒体';
        font-size: 1.5rem;
        margin-top: 10px;
        text-align: center;
    }

    .show {
        width: 100%;
        height: 15%;
        margin-top: 30px;
        display: flex;
        justify-content: space-around;

        .show_item {
            flex: 0 0 30%;
            text-align: center;
            font-family: '宋体';

            label {
                font-size: 3rem;
                cursor: pointer;
            }
        }
    }

    button {
        width: 70%;
        height: 8%;
        border-radius: 30px;
        border: none;
        background: #6B63E3;
        cursor: pointer;


        &:hover {
            opacity: .9;
        }

        &:active {
            border: 2px solid rgba(88, 88, 128, .8);
        }
    }

    .git {
        width: 80%;
        margin-top: 10px;
    }
}

/* #endregion */

.blog-advice {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    label {
        flex: 0 0 5%;
        width: 80%;
        font-size: 1.6rem;
        font-family: '宋体';
        margin-top: 10px;
        padding-bottom: 20px;
    }

    .newarticle {
        flex: 0 0 20%;
        width: 80%;
        border-radius: 3px;
        margin-bottom: 20px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        cursor: pointer;

        &:hover {
            background: rgba(80, 80, 80, .5)
        }

        .article-time {
            width: 100%;
            color: gray;
        }

        .article-title {
            width: 100%;
            font-size: 1.6rem;
            display: -webkit-box;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
        }

        .article-type {
            flex: 0 0 20%;
            width: 100%;
            font-size: 1.3rem;
            color: gray;
        }
    }
}

.timeline,
.type,
.label {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    span {
        height: 30px;
        width: 90%;
        font-size: 1.6rem;
        font-family: '宋体';
        margin-top: 10px;
    }

    .time,
    .types,
    .labels {
        height: fit-content;
        width: 80%;
        display: flex;
        flex-direction: column;

        .time-item,
        .type-item,
        .label-item {
            position: relative;
            height: 40px;
            width: 100%;
            line-height: 40px;
            padding-left: 5px;
            border-radius: 3px;
            cursor: pointer;

            span {
                position: absolute;
                right: 5px;
                width: 20px;
                height: 20px;
                text-align: center;
                line-height: 20px;
                border-radius: 3px;
                background-color: gray;
            }

            &:hover {
                box-shadow: 0 1px 3px 1px black;
            }
        }

        margin-bottom: 10px;
    }
}

.blog-item {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    &>div {
        width: 95%;
        margin-bottom: 10px;
    }

    .blog-title {
        margin-top: 20px;
        font-size: 2rem;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }

    .blog-time-type {
        color: gray;

        span:hover {
            color: #6B63E3;
            cursor: pointer;
        }
    }

    .blog-content {
        font-size: 1.5rem;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;

    }

    .blog-more {
        button {
            cursor: pointer;
            width: 100px;
            height: 40px;
            background: #6B63E3;
            border: none;
            border-radius: 5px;

            &:hover {
                opacity: .8;
            }

            &:active {
                opacity: 0.5;
            }
        }
    }
}

.container {
    background: url(@/assets/back3.jpg) no-repeat;
    background-attachment: fixed;
    background-size: cover;
    background-position: center;
    display: flex;
    justify-content: center;
    height: fit-content;
    min-height: 100vh;

    .content {
        position: relative;
        max-width: 1600px;
        margin-top: 20px;
        width: 90vw;
        min-height: 300px;
        border-radius: 20px;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;

        &>div {
            margin-bottom: 20px;
        }

        .user {
            flex: 0 0 29%;
            height: fit-content;

            &>div {
                margin-bottom: 20px;
            }

            .user-content {
                height: 450px;
                border-radius: 20px;
                background: rgba(255, 255, 255, .7);
            }

            .blog-advice {
                height: fit-content;
                border-radius: 20px;
                background: rgba(255, 255, 255, .7);
            }

            .timeline {
                height: fit-content;
                border-radius: 20px;
                background: rgba(255, 255, 255, .7);
            }
        }

        .blog {
            flex: 0 0 49%;
            max-width: 49%;
            height: fit-content;

            .blog-item {
                width: 100%;
                height: fit-content;
                margin-bottom: 20px;
                border-radius: 20px;
                background: rgba(255, 255, 255, .7);
                overflow: hidden;
            }
        }

        .label-content {
            flex: 0 0 19%;
            height: fit-content;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;

            .type {
                flex: 0 0 100%;
                height: fit-content;
                border-radius: 20px;
                background: rgba(255, 255, 255, .7);
                margin-bottom: 20px;


            }

            .label {
                flex: 0 0 100%;
                height: fit-content;
                border-radius: 20px;
                background: rgba(255, 255, 255, .7);
            }
        }

        .timeline {
            flex: 0 0 29%;
            height: fit-content;
        }
    }
}

@media (max-width: 1300px) {
    .container .content .label-content {
        flex: 0 0 30%;
    }

    .container .content .blog {
        flex: 0 0 69%;
        max-width: 69%;
    }

    .container .content .user {
        flex: 0 0 30%;
    }
}

@media (max-width:1000px) {
    .container .content {
        flex-direction: row-reverse;
        justify-content: space-around;
    }

    .order-2 {
        order: 2 !important;
    }

    .container .content .label-content {
        flex: 0 0 96%;
    }

    .container .content .blog {
        flex: 0 0 96%;
        max-width: 96%;
    }

    .container .content .user {
        flex: 0 0 96%;
    }
}
</style>