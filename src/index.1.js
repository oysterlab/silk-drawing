
const WIDTH = window.innerWidth
const HEIGHT = window.innerHeight

class Particle {
    constructor(x, y) {
        this.x = x
        this.y = y 

        this.prevX = x
        this.prevY = y

        this.rad = Math.random() * Math.PI * 0.6
        this.init = { 
            x: this.x,
            y: this.y
        }
        this.from = {
            x: this.x,
            y: this.y
        }

        this.to = {
            x: this.x + Math.cos(this.rad) * 100 ,
            y: this.y + Math.sin(this.rad) * 100
        }

        this.startTime = null
        this.duration = 400
        this.resetTo()
    }

    resetTo() {
        this.from.x = this.init.x
        this.from.y = this.init.y        
        
        const addRad = Math.random() * Math.PI * 0.1
        this.rad += addRad
        const dir = (Math.random() < 0.5 ? -1.0 : 1.0)
        this.to.x = this.init.x + dir * Math.cos(this.rad) * 100
        this.to.y = this.init.y + dir * Math.sin(this.rad) * 100

        this.duration = 400 + parseInt(400 * addRad / (Math.PI * 0.6))
        this.startTime = (new Date()).getTime()
    }

    update(t) {
        const { startTime, duration, to, from } = this
        if (!startTime) return

        const currTime = (new Date()).getTime()
        const a = (currTime - startTime) / duration

        console.log(a)
        if (a > 1.0) {
            this.resetTo()
        } else {
            const x = from.x + (to.x - from.x) * a
            const y = from.y + (to.y - from.y) * a

            this.prevX = this.x
            this.prevY = this.y
    
            this.x = x
            this.y = y
        }
    }

    draw(context) {
        const { x, y, prevX, prevY } = this

        
        context.beginPath()
        context.strokeStyle = 'rgba(255, 255, 255, 0.2)'
        context.moveTo(prevX, prevY, 1, 0, 2 * Math.PI)
        context.lineTo(x, y, 1, 0, 2 * Math.PI)
        context.stroke()
    }
}

const particle = new Particle(WIDTH * 0.5, HEIGHT * 0.5)

const canvas = document.createElement('canvas')
canvas.width = WIDTH
canvas.height = HEIGHT
document.body.append(canvas)
const context = canvas.getContext('2d')

context.fillStyle = '#444'
context.fillRect(0, 0, WIDTH, HEIGHT)

function render(t) {
    particle.update(t)
    particle.draw(context)
    requestAnimationFrame(render)
}

requestAnimationFrame(render)
