
const WIDTH = window.innerWidth
const HEIGHT = window.innerHeight

const canvas = document.createElement('canvas')
canvas.width = WIDTH
canvas.height = HEIGHT
document.body.appendChild(canvas)
const context = canvas.getContext('2d')


class Particle {
    constructor(pos, acc, perlin) {
        this.pos = pos
        this.acc = acc
        this.perlin = perlin
        this.alive = true
    }

    update() {
        if (!this.alive) return

        this.prevPos = {
            x: this.pos.x,
            y: this.pos.y
        }

        this.pos.x += this.acc.x
        this.pos.y += this.acc.y        

        const perlin = this.perlin

        const i = (parseInt(this.pos.x) + WIDTH * parseInt(this.pos.y)) * 4
        const deg = (perlin.data[i]  / 255. - 0.5) * 2.0
        
        const nx = Math.cos(deg * 2 * Math.PI) * 2.0
        const ny = Math.sin(deg * 2 * Math.PI) * 2.0


        this.pos.x += nx
        this.pos.y += ny        

        this.acc.x *= 0.9
        this.acc.y *= 0.9

        if (Math.abs(this.acc.x) < 0.2 && Math.abs(this.acc.y) < 0.2) {
            this.alive = false
        }
    }

    draw(context) {
        const { pos, prevPos } = this
        
        if(!prevPos) return

        for(let a = 0; a < 1.0; a += 0.1) {
            const x = prevPos.x + (pos.x - prevPos.x) * a
            const y = prevPos.y + (pos.y - prevPos.y) * a

            context.fillStyle = 'rgba(120, 150, 255, 0.1)'
            context.beginPath()
            context.arc(x, y, 0.2, 0, 2 * Math.PI)
            context.closePath()
            context.fill()
        }
    }    
}

const init = (perlin) => {
    const particles = [] 

    context.globalCompositeOperation = 'lighter'
    context.fillStyle = '#222'
    context.fillRect(0, 0, WIDTH, HEIGHT)

    function render(t) {

        for (let i = 0; i < particles.length; i++) {
            const particle = particles[i]
            particle.update()
            particle.draw(context)
            if (!particle.alive) {
                particles.splice(i, 1)
            }
        }
        requestAnimationFrame(render)
    }
    requestAnimationFrame(render)

    let isGenerative = false
    let prevPos = {
        x:0, y:0
    }
    let currPos = {
        x:0, y:0
    }

    const startDrawingCallback = (e) => {
        isGenerative = true
        currPos.x = e.clientX
        currPos.y = e.clientY
    }
    const drawingCallback = (e) => {
        if (isGenerative) {
            const x = e.clientX
            const y = e.clientY
            prevPos.x = currPos.x
            prevPos.y = currPos.y
            
            currPos.x = x
            currPos.y = y

            const diff = {
                x: (currPos.x - prevPos.x),
                y: (currPos.y - prevPos.y)
            }
            for (let i = 0; i < particles.length; i++) {
                particles[i].acc.x += diff.x * 0.1
                particles[i].acc.y += diff.y * 0.1          
            }
            for (let i = 0; i < 30; i++) {
                particles.push(new Particle({
                    x: x + (Math.random() - 0.5) * 2.0 * 3.0,
                    y: y + (Math.random() - 0.5) * 2.0 * 3.0
                }, {
                    x: diff.x * 0.1,
                    y: diff.y * 0.1
                }, perlin))    
            }

        }
    }
    const stopDrawingCallback = (e) => {
        isGenerative = false
    }

    window.addEventListener('mousedown', startDrawingCallback)
    window.addEventListener('mousemove', drawingCallback)
    window.addEventListener('mouseup', stopDrawingCallback)

    window.addEventListener('touchstart', startDrawingCallback)
    window.addEventListener('touchmove', drawingCallback)
    window.addEventListener('touchend', stopDrawingCallback)
}

const perlinImg = new Image()
perlinImg.src = './perlin.png'

perlinImg.onload = () => {
    const canvas = document.createElement('canvas')
    canvas.width = WIDTH
    canvas.height = HEIGHT
    const c = canvas.getContext('2d')
    c.drawImage(perlinImg, 0, 0, WIDTH, HEIGHT)
    const perlin = c.getImageData(0, 0, WIDTH, HEIGHT)
    init(perlin)
}
