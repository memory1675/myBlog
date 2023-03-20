import request from "@/utils/request";

export const getAllAbout = async () => {
    const result = await request.get('/getabout');
    return result;
}

export const addAbout = async (data :any) => {
    const value = Object.entries(data).map(item => item[0] + '=' + item[1]).join("&")
    const result = await request.put(`/addabout?${value}`, data.file);
    return result;
}