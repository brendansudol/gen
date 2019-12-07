// prettier-ignore
const CUBE_LINES = [
  [[-1, -1, -1], [1, -1, -1]],
  [[1, -1, -1], [1, 1, -1]],
  [[1, 1, -1], [-1, 1, -1]],
  [[-1, 1, -1], [-1, -1, -1]],
  [[-1, 1, -1], [-1, 1, 1]],
  [[1, 1, -1], [1, 1, 1]],
  [[-1, -1, -1], [-1, -1, 1]],
  [[1, -1, -1], [1, -1, 1]],
  [[-1, 1, 1], [1, 1, 1]],
  [[-1, 1, 1], [-1, -1, 1]],
  [[1, 1, 1], [1, -1, 1]],
  [[-1, -1, 1], [1, -1, 1]]
]

const rotateX = ({ x, y, z }, a) => ({
  x,
  y: y * Math.cos(a) - z * Math.sin(a),
  z: y * Math.sin(a) + z * Math.cos(a)
})

const rotateY = ({ x, y, z }, a) => ({
  x: z * Math.sin(a) + x * Math.cos(a),
  y,
  z: z * Math.cos(a) - x * Math.sin(a)
})

const rotateZ = ({ x, y, z }, a) => ({
  x: x * Math.cos(a) - y * Math.sin(a),
  y: x * Math.sin(a) + y * Math.cos(a),
  z
})

const rotateRzRyRx = ({ x, y, z }, angles) => {
  const { rotateCenter: rc } = angles
  const pt = { x: x - rc[0], y: y - rc[1], z: z - rc[2] }
  const rx = rotateX(rotateY(rotateZ(pt, angles.z), angles.y), angles.x)
  return { x: rx.x + rc[0], y: rx.y + rc[1], z: rx.z + rc[2] }
}

const orthographic = (d, { origin, scale }) => ({
  x: origin[0] + scale * d.x,
  y: origin[1] + scale * d.y
})

const toPoint = ([x, y, z]) => ({ x, y, z })

export const cubeData = ({
  origin = [200, 200],
  scale = 80,
  project = orthographic,
  angleX = Math.PI / 8,
  angleY = Math.PI / 8,
  angleZ = 0,
  rotateCenter = [0, 0, 0]
} = {}) => {
  const angles = { x: angleX, y: angleY, z: angleZ, rotateCenter }
  const enrich = ptArr => {
    const ptObj = toPoint(ptArr)
    const rotated = rotateRzRyRx(ptObj, angles)
    const projected = project(rotated, { origin, scale })
    return { orig: ptObj, rotated, projected }
  }

  return {
    lines: CUBE_LINES.map(([p1, p2]) => [enrich(p1), enrich(p2)])
  }
}
