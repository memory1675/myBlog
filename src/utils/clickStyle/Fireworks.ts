import { h, render } from 'vue'
export default class {
    constructor(_: string,index: number = 20) {
        this.fire(index)
    }

    random(min: number, max: number) {
        let result = Math.floor(Math.random() * (max - min + 1)) + min
        return result
    }

    add(x: number, y: number) {
        const { random } = this
        const div = document.createElement('div')
        div.setAttribute('class', 'clickText')
        div.style.height = div.style.width = random(1, 3) + 'px'
        div.style.left = x - (parseInt(div.style.width) / 2) + 'px'
        div.style.top = y - (parseInt(div.style.width) / 2) + 'px'
        div.style.background = `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`
        div.style.animation = 'hidden 1s'
        document.body.appendChild(div)
        setTimeout(() => {
            div.style.transform = `translate(${random(-100, 100)}px,${random(-100, 100)}px)`
        }, 0)
        setTimeout(() => {
            div.remove()
        }, 1000)
    }

    fire(index: number) {
        document.body.onclick = (e) => {
            const { x, y } = { x: e.pageX, y: e.pageY }
            for (let i = 0; i <= index; i++) this.add(x, y)
        }
    }

    /* add(x: number, y: number) {
        const { random } = this
        const size = random(3, 10)
        const div = h('div', {
            class:'vnode',
            style: {
                position: 'absolute',
                left: x + 'px',
                top: y + 'px',
                height: `${size}px`,
                width: `${size}px`,
                background: `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`,
                borderRadius: '50%',
            },
            onVnodeMounted(vnode) {
                vnode.props.style.left = 100 + 'px';         
            },
        })
        render(div, document.body)

    } */

    static remove() {
        document.body.onclick = () => { }
    }
}