<!-- <template>
    <Header />
    <div class="base">
        <div class="container">
            <div class="send-item">
                <div class="send-item-content">
                    <input type="file" ref="file" accept="image/*,video/*" hidden>
                    <textarea cols="30" rows="10" spellcheck="false" v-model="title"></textarea>
                    <button class="send-btn" @click="handleClick('send')">发送</button>
                    <button class="image-btn" @click="handleClick('image')"><i
                            class='iconfont icon-bx-image-add'></i></button>
                    <button class="video-btn" @click="handleClick('video')"><i
                            class='iconfont icon-videocameraadd'></i></button>
                </div>
            </div>
            <div class="show-item">
                <div class="item" v-for="(item, index) in aboutData" :key="index">
                    <div class="head"></div>
                    <div class="content">
                        <div class="main-content">
                            <div class="title">{{ item.title }}</div>
                            <div class="img-video" v-if="item.type == 1 || item.type == 2">
                                <div v-if="item.type == 1" class="img">
                                    <img v-for="(image, index) in item.imagename" :key="index"
                                        :src="`http://localhost:8002/${image}`" />
                                </div>
                                <video v-else controls :src="`http://localhost:8002/${item.videoname}`"></video>
                            </div>
                        </div>
                        <div class="message"><i class='bx bxs-devices'></i>{{ item.platform }} {{ item.showDate }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import Header from '@/components/home/Header.vue';
import about from '@/stores/aboutStore'
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { ElMessage } from 'element-plus'
const aboutStore = about();
const aboutData = ref(aboutStore.talks)
const file = ref()
const title = ref('')
const getData = async () => {
    await aboutStore.GETALLABOUT()
    aboutData.value = aboutStore.talks
    title.value = ''
}
onMounted(() => {
    getData()
})

const handleClick = async function (type: string) {
    const formData = new FormData()
    let filenames = []
    for (let i = 0; i < file.value?.files.length; i++) {
        formData.append(`file${i + 1}`, file.value.files[i])
        filenames.push(file.value.files[i].name)
    }
    const req = { files: formData, title: title.value, type: '0', imagename: '', videoname: '', platform: navigator.userAgentData.platform }
    if (file.value.files.length > 0) {
        if (file.value.files[0].type.split('/')[0] == 'image') {
            req.type = '1'
            req.imagename = `[${filenames}]`
        } else {
            req.type = '2'
            req.videoname = filenames[0]
        }
    } else if (!title.value) {
        ElMessage({
            message: '请至少写入一种',
            type: 'warning'
        })
        return
    }
    switch (type) {
        case 'send':
            console.log(req);
            axios.post('/aboutfile/load', formData)
            await aboutStore.ADDABOUT(req)
            getData()
            break;
        case 'image':
            file.value.setAttribute('multiple', '')
            file.value.setAttribute('accept', 'image/*')
            file.value.click()
            break;
        case 'video':
            file.value.removeAttribute('multiple')
            file.value.setAttribute('accept', 'video/*')
            file.value.click()
            break;
    }
}

</script>

<style lang="less" scoped>
.base {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #E1F1FF;
    overflow: hidden;
    .container {
        flex: 0 0 100%;
        height: 100vh;
        max-width: 1300px;
        display: flex;
        flex-direction: column;
        align-items: center;
        background: none;

        .send-item {
            flex: 0 0 25%;
            max-height: 300px;
            width: 100%;
            padding-top: 60px;
            height: 100%;
            display: flex;
            justify-content: space-around;
            position: relative;

            .send-item-content {
                width: 45%;
                height: 80%;
                position: relative;

                textarea {
                    width: 100%;
                    height: 100%;
                    max-height: 200px;
                    background: rgba(255, 255, 255, .8);
                    resize: none;
                    border: none;
                    outline: none;
                    border-radius: 100px;
                    font-size: 25px;
                    font-family: '方正舒体';
                    box-shadow: 0 1px 2px 1px rgba(0, 255, 149, .5);
                    padding: 0 5rem;
                    margin-bottom: 10px;

                }

                button {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    font-weight: 900;
                    font-size: 17px;
                    position: absolute;
                    border-radius: 50px;
                    border: none;
                    outline: none;
                    background: rgba(0, 255, 149, 1);
                    cursor: pointer;

                    i {
                        font-size: 20px;
                    }

                    &:hover {
                        box-shadow: 0 0 10px 1px white;
                        color: white;
                    }

                    &:active {
                        box-shadow: 0 5px 10px 1px white;
                    }

                }

                .send-btn {
                    height: 50px;
                    width: 100px;
                    left: 50%;
                    bottom: 0;
                    transform: translate(-50%, 50%);
                }

                .video-btn {
                    padding: 10px;
                    font-size: 20px;
                    top: 50%;
                    left: 0;
                    transform: translate(-50%, -50%);
                }

                .image-btn {
                    padding: 10px;
                    font-size: 20px;
                    top: 50%;
                    right: 0;
                    transform: translate(50%, -50%);
                }
            }

        }

        .show-item {
            flex: 1;
            width: 100%;
            overflow-y: scroll;
            display: flex;
            flex-direction: column;
            align-items: center;
            box-shadow: 0 -4px 8px 4px white;
            .item {
                margin-top: 20px;
                height: fit-content;
                width: 100%;
                display: flex;
                justify-content: center;

                .head {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    background-color: white;
                    background: url(@/assets/head.jpg);
                    background-size: cover;
                    transition: 1s;

                    &:hover {
                        transform: rotate(90deg);
                    }
                }

                .content {
                    flex: 0 0 60%;
                    min-height: 100px;
                    margin-left: 20px;
                    border-radius: 10px;
                    background-color: white;
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    transition: .3s;
                    padding: 10px;

                    &:hover {
                        transform: translateY(-5px);
                    }

                    &::before {
                        content: '';
                        position: absolute;
                        top: 10px;
                        left: -10px;
                        height: 30px;
                        width: 30px;
                        transform: rotate(45deg);
                        background-color: white;
                    }

                    .main-content {
                        height: fit-content;
                        width: 100%;
                        z-index: 2;

                        .title {
                            height: fit-content;
                            width: 100%;
                            max-width: 754px;
                            line-height: 30px;
                            font-size: 20px;
                            font-weight: bold;
                            font-family: 'Times New Roman', Times, serif;
                            word-wrap: break-word;
                            padding-bottom: 10px;
                        }

                        .img-video {
                            height: 100%;
                            width: 100%;

                            .img {
                                width: 100%;
                                height: fit-content;
                                background: url() no-repeat;
                                background-size: contain;
                                background-position: center;

                                img {
                                    width: 100%;
                                    height: 100%;
                                }
                            }

                            video {
                                width: 100%;
                                max-height: 100%;
                            }
                        }
                    }

                    .message {
                        margin-top: 2px;
                        border-top: 1px gray dashed;
                        height: 20px;
                        line-height: 20px;
                    }
                }
            }

            &::-webkit-scrollbar {
                background-color: transparent;
                width: 10px;
            }

            &::-webkit-scrollbar-thumb {
                background: white;
                border-radius: 30px;
            }
        }
    }
}</style> -->