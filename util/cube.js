export const CUBE_LINES = [
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

export const toPoint = ([x, y, z]) => ({ x, y, z })

export const enrichLines = (lines, { angles, project, origin, scale }) => {
  const enrichPoint = ptArr => {
    const pt = toPoint(ptArr)
    const rotated = rotateRzRyRx(pt, angles)
    const projected = project(rotated, { origin, scale })
    return { orig: pt, rotated, projected }
  }

  return lines.map(([p1, p2]) => [enrichPoint(p1), enrichPoint(p2)])
}

export const getCubeLines = ({
  data = CUBE_LINES,
  origin = [200, 200],
  scale = 80,
  project = orthographic,
  angleX = Math.PI / 8,
  angleY = Math.PI / 8,
  angleZ = 0,
  rotateCenter = [0, 0, 0]
} = {}) => {
  const angles = { x: angleX, y: angleY, z: angleZ, rotateCenter }
  const options = { origin, scale, project, angles }
  return enrichLines(data, options)
}
