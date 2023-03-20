<template>
    <div class="img" :class="{ half, repeat }" :style="styleCoputed">
        <div class="content-center">
            <slot></slot>
        </div>
        <div class="to-next" @click="toNext" :style="{ display: half ? 'none' : 'block' }">
            ↓
        </div>
    </div>
</template>

<script lang="ts" setup>
import { toRefs, computed } from 'vue'
const props = defineProps(['half', 'bg', 'repeat', 'color'])
const { half, bg, repeat, color } = toRefs(props)
const styleCoputed = computed(() => {
    let result: string[] = []
    if (bg.value) result.push(`background-image:${bg.value}`)
    if(color.value) result.push(`--fontColor:${color.value}`)
    return result.join(';')
})
function toNext() {
    document.querySelector('.container')!.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style>
.img {
    position: relative;
    width: 100%;
    height: 100vh;
    background-image: url('@/assets/back1.jpg');
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    background-position: center;
}

.repeat {
    background-repeat:repeat !important;
    background-size:auto !important;
}

.half {
    height: 40vh !important;
    box-shadow: 0 2px 10px 1px rgba(0, 0, 0, .8);
}

.img .content-center {
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    height: 200px;
    color: var(--fontColor);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

}

.img .content-center .content-text {
    font-family: 'Press Start 2P';
}

.img .content-center p {
    padding-top: 20px;
    font-size: 1rem;
}

.img .content-center .content-bottom {
    margin-top: 40px;
    height: 30px;
    width: 300px;
    display: flex;
    align-items: center;
    justify-content: space-around;
}

.img .content-center .content-bottom a {
    text-decoration: none;
}

.img .content-center .content-bottom li {
    position: relative;
    cursor: pointer;
}

.img .content-center .content-bottom li i {
    font-size: 22px;
}

.img .content-center .content-bottom li a {
    color: var(--fontColor);
}

.img .content-center .content-bottom li:hover::before {
    content: var(--text);
    position: absolute;
    top: -30px;
    left: 50%;
    transform: translateX(-50%);
    height: 30px;
    width: auto;
    background-color: black;
    color: white;
    text-align: center;
    font-size: 15px;
    white-space: nowrap;
    line-height: 30px;
    padding: 0 5px;
}

.img .to-next {
    font-family: 'Press Start 2P', sans-serif;
    font-size: 4rem;
    position: absolute;
    left: 50%;
    bottom: 10%;
    color: var(--fontColor);
    cursor: pointer;
    transform: translateX(-50%) translateY(-50%);
    animation: jump 1s ease-in-out infinite;
}

@keyframes jump {
    50% {
        bottom: 13%;
    }

    to {
        bottom: 10%;
    }
}
</style>