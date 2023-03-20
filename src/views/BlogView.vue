<template>
    <Header />
    <Img>
    <div class="content-text">
        <h1>M-Mory</h1>
        <p>The first step is as good as half over.</p>
    </div>
    <ul class="content-bottom">
        <li style="--text:'访问我的github';"><a href="https://github.com/memory1675">
                <i class='iconfont icon-github'></i></a></li>
        <li style="--text:'邮箱联系我';"><a><i class='iconfont icon-email-fill'></i></a></li>
        <li style="--text:'微信扫一扫';"><a><i class='iconfont icon-wechat-fill'></i></a></li>
        <li style="--text:'QQ联系我:2856855810';"><a
                href="tencent://AddContact/?fromId=45&fromSubId=1&subcmd=all&uin=2856855810&website=www.oicqzone.com"><i
                    class='iconfont icon-QQ'></i></a></li>
    </ul>
    </Img>
    <Container>
        <template #blog>
            <div class="blog-item">
                <md-editor v-model="showEdit" class="edt" preview-only showCodeRowNumber />
            </div>
        </template>
    </Container>
</template>

<script setup lang="ts">
import { onMounted, ref, onUpdated } from 'vue';
import Header from '@/components/home/Header.vue'
import Img from '@/components/home/Img.vue'
import Container from '@/components/home/Container.vue';
import MdEditor from 'md-editor-v3';
import axois from 'axios'
import 'md-editor-v3/lib/style.css';
import { useRoute } from 'vue-router';
const route = useRoute()
const showEdit = ref('')
onMounted(async () => {
    const res = await axois.get(`/file/${route.path.replace('/', '')}.md`)
    if (res.status == 200) showEdit.value = res.data
})
onUpdated(async () => {
    const res = await axois.get(`/file/${route.path.replace('/', '')}.md`)
    if (res.status == 200) showEdit.value = res.data
})
</script>

<style scoped lang="less">
.show-phone-nav {
    position: fixed;
    top: 0;
    right: -100%;
    z-index: 6;
    width: 300px;
    height: 100%;
    background-color: white;
    opacity: .7;
    transition: .3s;
}

.edt {
    background: rgba(255, 255, 255, 0);
}

.overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: none;
    background-color: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(3px);
    z-index: 5;
}
</style>