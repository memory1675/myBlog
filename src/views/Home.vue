<template>
    <Header />
    <Img :half="false">
        <div class="content-text">
            <h1>M-Mory</h1>
            <p>The first step is as good as half over.</p>
        </div>
        <ul class="content-bottom">
            <li style="--text:'访问我的github';"><a href="https://github.com/memory1675">
                    <i class='iconfont icon-github'></i></a></li>
            <li style="--text:'邮箱联系我';"><a><i class='iconfont icon-email-fill'></i></a></li>
            <li style="--text:'微信扫一扫';"><a href=""><i class='iconfont icon-wechat-fill'></i></a></li>
            <li style="--text:'QQ联系我:2856855810';"><a
                    href="tencent://AddContact/?fromId=45&fromSubId=1&subcmd=all&uin=2856855810&website=www.oicqzone.com"><i
                        class='iconfont icon-QQ'></i></a></li>
        </ul>
    </Img>
    <Container>
        <template #blog="blogProps">
            <div class="blog-item" v-for="(item, index) in blogProps.blogs" :key="index">
                <div class="blog-title">
                    {{ item.title }}</div>
                <div class="blog-time-type">{{ item.date }} <span>{{ `${item.type}/${item.tags.join(',')}` }}</span></div>
                <div class="blog-content">
                    {{ item.text }}
                </div>
                <div class="blog-more"><button @click="handleToView(item.route)">read more</button></div>
            </div>
        </template>
    </Container>
</template>

<script setup lang="ts">
import Header from '@/components/home/Header.vue'
import Img from '@/components/home/Img.vue'
import Container from '@/components/home/Container.vue';
import { onMounted, ref } from 'vue';
import { blogStore } from '@/stores/blogStore';
import { useRouter } from 'vue-router';
const router = useRouter()
const blog = blogStore()
let blogs = ref(blog.blogs);

//路由跳转
const handleToView = (route: string) => {
    router.push(`/${route}`)
}

onMounted(() => {
    blogs.value.forEach((blog: any) => {
        router.addRoute(blog.route, {
            path: `/${blog.route}`,
            name: blog.route,
            component: () => import('@/views/BlogView.vue'),
            meta: {
                showMenu: true
            }
        })
    })
})
</script>

<style scoped lang="less"></style>