import { defineStore } from "pinia";
import { getAllBlog,getTags,getTypes,getAll } from "@/api/blog";
import { blogFormat } from "@/utils/blogFormat";
export const blogStore = defineStore('blogStore',{
    state:() => ({
        blogs:[],
        tags:[],
        types:[],
        chains:[]
    }),
    actions:{
        async GETALLBLOG(){
            const result: any = await getAll()
            this.blogs = blogFormat(result.article)
            this.tags = result.tag
            this.types = result.type
            this.chains = result.chain
            /* const result :any = await Promise.all([getAllBlog(),getTags(),getTypes()])
            this.blogs = blogFormat(result[0])
            this.tags = result[1]
            this.types = result[2] */
        }
    },
    getters:{
    }
})