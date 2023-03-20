import { defineStore } from "pinia";
import { getAllAbout, addAbout } from "@/api/about";
import { ElMessage } from 'element-plus'
import { format } from "@/utils/aboutFormat";

export default defineStore('about', {
    state: () => ({
        talks: []
    }),
    actions: {
        async GETALLABOUT() {
            const result = await getAllAbout()
            this.talks = format(result)
        },
        async ADDABOUT(data: any) {
            const { flag } = await addAbout(data)
            if (flag) {
                ElMessage({
                    message: '添加成功',
                    type: 'success'
                })
            }else ElMessage({
                message: 'error',
                type: 'error'
            })
        }
    },
    getters: {
    },
})

/* interface RootObject {
    talks: [
        {
            id: string;
            title: string;
            imagename: string;
            videoname?: any;
            platform: string;
            type: string;
            time: string;
        }
    ]
} */