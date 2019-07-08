
const WIDTH = window.innerWidth
const HEIGHT = window.innerHeight

class Particle {
    constructor(x, y) {
        this.x = x
        this.y = y

        this.prevX = x
        this.prevY = y

        this.initX = x
        this.initY = y

        this.radius = 100

        this.resetTo()
    }

    resetTo(fromRad) {
        this.fromRad = fromRad
        this.toRad = this.fromRad + Math.random() * Math.PI * 0.1

        this.duration = 200
        this.startTime = (new Date()).getTime()
        this.fromRadius = 0
        this.toRadius = 100 + 20 * Math.random()

        this.seedX = parseInt(WIDTH * Math.random())
        this.seedY = parseInt(HEIGHT * Math.random())

        this.x = this.initX
        this.y = this.initY
        this.prevX = this.x
        this.prevY = this.y
    }

    update(t, perlin) {
        const { startTime, duration, fromRadius, toRadius, initX, initY, toRad, fromRad } = this
        if (!startTime) return

        const currTime = (new Date()).getTime()
        const a = (currTime - startTime) / duration

        if (a > 1.0) {            
            this.resetTo(Math.sin(t * 0.001) * 2 * Math.PI)
        } else {
            const currRad = fromRad + (toRad - fromRad) * a
            const radius = fromRadius + (fromRadius - toRadius) * a
            const perlinX = parseInt((this.seedX + Math.sin(t * 0.1) * 0.5))
            const perlinY = parseInt((this.seedY + Math.cos(t * 0.1) * 0.5))
            const perlinRad = perlin.data[(perlinX + perlinY * WIDTH) * 4] / 255. * 10.
            
            const x = initX + Math.cos(currRad + perlinRad) * radius
            const y = initY + Math.sin(currRad + perlinRad) * radius
            
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


const init = (perlin) => {
    const particles = []

    for (let i = 0; i < 20; i++) {
        const particle = new Particle(WIDTH * 0.5, HEIGHT * 0.5)
        particles.push(particle)
    }
    
    const canvas = document.createElement('canvas')
    canvas.width = WIDTH
    canvas.height = HEIGHT
    document.body.append(canvas)
    const context = canvas.getContext('2d')
    
    context.fillStyle = '#444'
    context.fillRect(0, 0, WIDTH, HEIGHT)
    
    function render(t) {
    
    
        particles.forEach((particle) => {
            particle.update(t, perlin)
            particle.draw(context)
        })
        requestAnimationFrame(render)
    }
    
    requestAnimationFrame(render)
    
}

const perlinImg = new Image()
perlinImg.src = './perlin.png'

perlinImg.onload = () => {
    const c = document.createElement('canvas').getContext('2d')
    c.drawImage(perlinImg, 0, 0, WIDTH, HEIGHT)
    const perlin = c.getImageData(0, 0, WIDTH, HEIGHT)
    init(perlin)
}

