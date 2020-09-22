import config from './config.js'

// const title = document.createElement('h1')
// title.innerHTML = 'hello'

const canvas = document.createElement('canvas')
canvas.width = 800
canvas.height = 500
const ctx = canvas.getContext('2d')


// let coord;


let i = 0 

function loop() {

  ctx.fillStyle = 'white'
  ctx.fillRect(0, 0, 800, 500)
  ctx.lineCap ="round"
  const bowl = new Path2D()
  bowl.arc(400, 390, 100, 0, Math.PI)
  ctx.stroke(bowl)
  
  ctx.moveTo(300,390)
  ctx.lineTo(500,390)
  ctx.stroke()

  ctx.fillStyle ="red"
  ctx.fill(bowl)

  
  let height = 460 -i
  let width = 15 
  const noodle1 = new Path2D()
  noodle1.rect(360, 0, width, height)
  ctx.fillStyle ='#e1e3ac'
  ctx.fill(noodle1)

  const noodle2 = new Path2D()
  noodle2.rect(390, 0, width, height)
  ctx.fillStyle ='#e1e3ac'
  ctx.fill(noodle2)

  const noodle3 = new Path2D()
  noodle3.rect(420, 0, width, height)
  ctx.fillStyle ='#e1e3ac'
  ctx.fill(noodle3)

  i++ 
  window.requestAnimationFrame(loop)
}

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app')
  app.append(canvas)
  loop()
  
})



// document.addEventListener('mousemove',(e) => {
//   coord = [e.clientX, e.clientY]
// })