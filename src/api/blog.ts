import request from "@/utils/request";

export async function getAllBlog() {
    return await request("/getallarticle");
}

export const getTags = async function(){
    const result = await request.get('/gettags');
    return result
}

export const getTypes = async function(){
    const result = await request.get('/gettypes');
    return result
}

export const getAll = async function() {
    const result = await request.get('/getall');
    return result
}