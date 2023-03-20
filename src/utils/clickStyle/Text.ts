export default class {
    private _text: string[]
    private _index: number = 0
    constructor(text: string[] = ['I', 'Love', 'You']) {
        this._text = text
        this.do()
    }

    random(min: number, max: number) {
        let result = Math.floor(Math.random() * (max - min + 1)) + min
        return result
    }

    add(x: number, y: number) {
        const span = document.createElement('span')
        const { _text, _index, random } = this
        span.setAttribute('class', 'clickText')
        span.style.left = x + 'px'
        span.style.top = y + 'px'
        span.style.color = `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`
        span.style.animation = 'hidden 1s'
        span.textContent = _text[_index]
        _index >= _text.length - 1 ? this._index = 0 : this._index += 1
        document.body.appendChild(span)
        setTimeout(() => {
            span.style.top = parseInt(span.style.top) - 100 + 'px'
        }, 0)
        setTimeout(() => {
            span.remove()
        }, 1000)
    }

    do() {
        document.body.onclick = (e) => {
            const { x, y } = { x: e.pageX, y: e.pageY }
            this.add(x, y)
        }
    }

    static remove(){
        document.body.onclick = () => {}
    }

    set text(text: string[]) {
        this._text = text
        this.do()
    }
    get text() {
        return this._text
    }
}