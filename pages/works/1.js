import React from "react"
import rough from "roughjs/dist/rough.umd.js"
import { randomNum } from "../../util"
import { cubeData } from "../../util/cube"

const CUBE_SIZE = 25
const CUBE_CONTAINER_SIZE = CUBE_SIZE * 5

class Page extends React.Component {
  componentDidMount() {
    const rc = rough.canvas(this.canvas)

    const size = CUBE_CONTAINER_SIZE
    const { innerWidth: width, innerHeight: height } = window

    this.canvas.width = width
    this.canvas.height = height

    const [rows, cols] = [Math.floor(height / size), Math.floor(width / size)]
    const [xPad, yPad] = [(width - size * cols) / 2, (height - size * rows) / 2]
    const origin = (row, col) => [size * col + size / 2 + xPad, size * row + size / 2 + yPad]

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const { lines } = cubeData({
          angleX: randomNum(0, Math.PI),
          angleY: randomNum(0, Math.PI),
          origin: origin(i, j),
          scale: CUBE_SIZE
        })

        lines.forEach(l => {
          const { x: x1, y: y1 } = l[0].projected
          const { x: x2, y: y2 } = l[1].projected
          rc.line(x1, y1, x2, y2, { strokeWidth: 2, roughness: 2, bowing: 1 })
        })
      }
    }
  }

  render() {
    return (
      <div>
        <canvas ref={ref => (this.canvas = ref)} />
      </div>
    )
  }
}

export default Page
