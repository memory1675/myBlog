export const format = function (data: any) {
    const result = data.map((item: any) => {
        if (item.type == 1) {
            item.imagename = item.imagename.slice(1, -1).split(',');
        }
        item.time = new Date(item.time).toLocaleString().replaceAll('/', '-')
        const date = (new Date().getDate() - new Date(item.time).getDate())
        switch (date) {
            case 0:
                item.showDate = '今天'
                break;
            case 1:
                item.showDate = '昨天'
                break;
            case 2:
                item.showDate = '前天'
                break;
            default:
                item.showDate = new Date(item.time).toLocaleDateString().replaceAll('/','-')
        }
        return item;
    })
    return result
}