const CUBE_VERTICES = [
  [-1, -1, -1],
  [1, -1, -1],
  [-1, 1, -1],
  [1, 1, -1],
  [-1, -1, 1],
  [1, -1, 1],
  [-1, 1, 1],
  [1, 1, 1]
]

const CUBE_LINES = [
  [0, 1],
  [1, 3],
  [3, 2],
  [2, 0],
  [2, 6],
  [3, 7],
  [0, 4],
  [1, 5],
  [6, 7],
  [6, 4],
  [7, 5],
  [4, 5]
]

// TODO: replace this
const CUBE_LINES2 = [
  [{ x: 1, y: 1, z: -1 }, { x: -1, y: 1, z: -1 }],
  [{ x: -1, y: -1, z: -1 }, { x: 1, y: -1, z: -1 }],
  [{ x: 1, y: 1, z: -1 }, { x: 1, y: -1, z: -1 }],
  [{ x: -1, y: 1, z: -1 }, { x: -1, y: -1, z: -1 }],
  [{ x: 1, y: 1, z: 1 }, { x: -1, y: 1, z: 1 }],
  [{ x: -1, y: -1, z: 1 }, { x: 1, y: -1, z: 1 }],
  [{ x: 1, y: 1, z: 1 }, { x: 1, y: -1, z: 1 }],
  [{ x: -1, y: 1, z: 1 }, { x: -1, y: -1, z: 1 }],
  [{ x: -1, y: 1, z: 1 }, { x: -1, y: 1, z: -1 }],
  [{ x: 1, y: 1, z: 1 }, { x: 1, y: 1, z: -1 }],
  [{ x: -1, y: -1, z: 1 }, { x: -1, y: -1, z: -1 }],
  [{ x: 1, y: -1, z: 1 }, { x: 1, y: -1, z: -1 }]
]

export const rotateX = ({ x, y, z }, a) => ({
  x,
  y: y * Math.cos(a) - z * Math.sin(a),
  z: y * Math.sin(a) + z * Math.cos(a)
})

export const rotateY = ({ x, y, z }, a) => ({
  x: z * Math.sin(a) + x * Math.cos(a),
  y,
  z: z * Math.cos(a) - x * Math.sin(a)
})

export const rotateZ = ({ x, y, z }, a) => ({
  x: x * Math.cos(a) - y * Math.sin(a),
  y: x * Math.sin(a) + y * Math.cos(a),
  z
})

export const rotateRzRyRx = ({ x, y, z }, angles) => {
  const { rotateCenter: rc } = angles
  const pt = { x: x - rc[0], y: y - rc[1], z: z - rc[2] }
  const rx = rotateX(rotateY(rotateZ(pt, angles.z), angles.y), angles.x)
  return { x: rx.x + rc[0], y: rx.y + rc[1], z: rx.z + rc[2] }
}

export const orthographic = (d, { origin, scale }) => ({
  x: origin[0] + scale * d.x,
  y: origin[1] + scale * d.y
})

export const enrichLines = (lines, options, angles) => {
  const point = pt => {
    const rotated = rotateRzRyRx(pt, angles)
    const projected = options.project(rotated, options)
    return { ...pt, rotated, projected }
  }

  return lines.map(line => {
    const [p1, p2] = line
    const newLine = [point(p1), point(p2)]
    return { ...newLine }
  })
}

export const getCubeLines = ({
  data = CUBE_LINES2,
  origin = [480, 250],
  scale = 80,
  project = orthographic,
  angleX = Math.PI / 8,
  angleY = Math.PI / 8,
  angleZ = 0,
  rotateCenter = [0, 0, 0]
} = {}) => {
  const options = { origin, scale, project }
  const angles = { x: angleX, y: angleY, z: angleZ, rotateCenter }
  return enrichLines(data, options, angles)
}
