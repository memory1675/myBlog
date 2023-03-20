export const blogFormat = function (data: any) {
    let timeline: any[] = []
    //过滤未发布或隐藏的博客 并格式化内容
    return data.filter((blog: any) => blog.ispub == '1').map((item: any) => {
        item.date = new Date(item.date).toLocaleString().replaceAll('/', '-')
        item.tags = item.tags.slice(1, -1).replaceAll("'", '').split(',')
        item.state = item.ispub > 0 ? (item.ispub == 1 ? { title: '已发布', type: 'success' } : { title: '隐藏中', type: 'info' }) : { title: '待发布', type: 'warning' }
        item.opencomment = item.opencomment == 1 ? true : false
        let time = new Date(item.date).toLocaleDateString().split('/').splice(0, 2).join('-')
        let filter = timeline.filter(f => f.date == time)
        if (filter.length > 0) {
            timeline[timeline.indexOf(filter[0])].sum += 1
        } else timeline.push({ date: time, sum: 1, check: false })
        item.timeline = timeline
        return item
    }) 
}