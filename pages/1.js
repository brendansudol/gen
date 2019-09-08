import React from "react"
import { getCubeLines } from "../util/cube"

const SIZE = 400
const START_ANGLE = Math.PI / 8

class Page extends React.Component {
  state = { angleX: START_ANGLE, angleY: START_ANGLE }

  handleMouseMove = e => {
    const { clientX, clientY } = e
    const dx = ((clientX * Math.PI) / 360) * -1
    const dy = ((clientY * Math.PI) / 360) * -1

    this.setState({
      angleX: START_ANGLE + dy,
      angleY: START_ANGLE + dx
    })
  }

  render() {
    const { angleX, angleY } = this.state
    const lines = getCubeLines({ angleX, angleY, origin: [SIZE / 2, SIZE / 2] })

    return (
      <div>
        <svg width={SIZE} height={SIZE} onMouseMove={this.handleMouseMove}>
          <g>
            {lines.map((l, i) => (
              <line
                key={i}
                x1={l[0].projected.x}
                y1={l[0].projected.y}
                x2={l[1].projected.x}
                y2={l[1].projected.y}
                stroke="#000"
                strokeWidth={2}
              />
            ))}
          </g>
        </svg>
      </div>
    )
  }
}

export default Page
