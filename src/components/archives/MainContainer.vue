<template>
    <div class="main-container" ref="main">
        <slot name="content"></slot>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUpdated } from 'vue'
const props = defineProps(['bgColor'])
const main = ref()
let settingArr = Object.entries(props)
const setting = () => {
    settingArr.forEach(item => {
        if (item[0]) {
            switch (item[0]) {
                case 'bgColor':
                    main.value.style.backgroundColor = item[1]
                    break;
                default: {
                    alert(item[0])
                }
            }
        }
    })
}
onMounted(setting)
</script>

<style lang="less" scoped>
.main-container {
    min-height: 100vh;
}
</style>