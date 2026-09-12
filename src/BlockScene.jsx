import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js'
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js'

const mix = THREE.MathUtils.lerp
const smooth = (a, b, value) => THREE.MathUtils.smoothstep(value, a, b)

function roundedPath(path, x, y, w, h, r) {
  path.moveTo(x + r, y)
  path.lineTo(x + w - r, y)
  path.quadraticCurveTo(x + w, y, x + w, y + r)
  path.lineTo(x + w, y + h - r)
  path.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
  path.lineTo(x + r, y + h)
  path.quadraticCurveTo(x, y + h, x, y + h - r)
  path.lineTo(x, y + r)
  path.quadraticCurveTo(x, y, x + r, y)
  return path
}

function hollowGeometry() {
  const shape = roundedPath(new THREE.Shape(), -1.4, -.75, 2.8, 1.5, .06)
  for (const x of [-1.08, .22]) {
    shape.holes.push(roundedPath(new THREE.Path(), x, -.46, .86, .92, .07))
  }
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 1.08, bevelEnabled: true, bevelSegments: 3,
    steps: 1, bevelSize: .025, bevelThickness: .025, curveSegments: 8,
  })
  geometry.rotateX(-Math.PI / 2)
  geometry.translate(0, -.54, 0)
  return geometry
}

// Seeded surface data keeps the concrete grain consistent across renders.
function concreteTexture() {
  const size = 256
  const pixels = new Uint8Array(size * size * 4)
  let seed = 19
  for (let i = 0; i < size * size; i++) {
    seed = (seed * 1664525 + 1013904223) >>> 0
    const noise = seed / 4294967296
    const shade = Math.round(190 + noise * 52 - (noise < .08 ? 54 : 0))
    pixels.set([shade, shade, shade, 255], i * 4)
  }
  const texture = new THREE.DataTexture(pixels, size, size, THREE.RGBAFormat)
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(2, 2)
  texture.magFilter = THREE.LinearFilter
  texture.minFilter = THREE.LinearMipmapLinearFilter
  texture.generateMipmaps = true
  texture.needsUpdate = true
  return texture
}

const opening = [
  { p: [0, .3, 0], r: [.16, -.2, -.10], s: 1.52 },
  { p: [-3.5, 1.8, -1.2], r: [.4, .55, -.3], s: .58 },
  { p: [3.1, -.8, .4], r: [-.2, -.35, .23], s: .62 },
  { p: [2.7, 2.25, -1.9], r: [.5, .7, -.1], s: .42 },
  { p: [-2.8, -1.4, .4], r: [-.2, -.35, .15], s: .48 },
  { p: [.3, -1.9, -1.8], r: [.3, .25, -.1], s: .45 },
]

export default function BlockScene({ progressRef, paused, variant = 0, rotation = 0 }) {
  const containerRef = useRef(null)
  const settingsRef = useRef({ paused, variant, rotation })
  useEffect(() => { settingsRef.current = { paused, variant, rotation } }, [paused, variant, rotation])

  useEffect(() => {
    const host = containerRef.current
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    let disposed = false
    let renderer
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' })
    } catch {
      host.dataset.fallback = 'true'
      return
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7))
    renderer.setClearColor(0xe9e8e4, 0)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2
    host.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(34, 1, .1, 100)
    camera.position.set(6, 5, 12)
    camera.lookAt(0, 0, 0)
    const pmrem = new THREE.PMREMGenerator(renderer)
    const room = new RoomEnvironment()
    const environment = pmrem.fromScene(room, .04)
    scene.environment = environment.texture
    room.dispose()
    pmrem.dispose()
    scene.add(new THREE.HemisphereLight(0xffffff, 0x9b9689, 2.2))
    const sun = new THREE.DirectionalLight(0xfff5e6, 4)
    sun.position.set(-3, 9, 6)
    sun.castShadow = true
    sun.shadow.mapSize.set(1024, 1024)
    Object.assign(sun.shadow.camera, { left: -10, right: 10, top: 10, bottom: -10, near: .1, far: 30 })
    sun.shadow.normalBias = .04
    sun.shadow.bias = -.0002
    sun.shadow.radius = 4
    scene.add(sun)
    const rim = new THREE.DirectionalLight(0xd8e5ff, 2)
    rim.position.set(5, 3, -4)
    scene.add(rim)

    const texture = concreteTexture()
    const concrete = new THREE.MeshStandardMaterial({ color: 0xc2beb3, roughness: .89, metalness: .04, map: texture, bumpMap: texture, bumpScale: .052 })
    const pale = concrete.clone()
    pale.color.set(0xe0dcd2)
    const charcoal = concrete.clone()
    charcoal.color.set(0x525450)
    const orange = new THREE.MeshStandardMaterial({ color: 0xf46134, roughness: .45, metalness: .14, bumpMap: texture, bumpScale: .018 })
    const hollow = hollowGeometry()
    const solid = new RoundedBoxGeometry(2.8, 1.08, 1.5, 3, .035)
    const paver = new RoundedBoxGeometry(2.8, .55, 1.5, 3, .04)
    const assembly = new THREE.Group()
    scene.add(assembly)
    const blocks = opening.map((pose, i) => {
      const mesh = new THREE.Mesh(i % 3 === 0 ? hollow : solid, [pale, concrete, orange, charcoal, concrete, pale][i])
      mesh.castShadow = mesh.receiveShadow = true
      assembly.add(mesh)
      return mesh
    })

    const floor = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), new THREE.ShadowMaterial({ color: 0x554937, opacity: .2 }))
    floor.rotation.x = -Math.PI / 2
    floor.position.y = -2.7
    floor.receiveShadow = true
    scene.add(floor)

    const grit = new THREE.Group()
    const gritGeometry = new THREE.DodecahedronGeometry(.09, 0)
    for (let i = 0; i < 20; i++) {
      const fragment = new THREE.Mesh(gritGeometry, i % 5 === 0 ? orange : concrete)
      const angle = i * 2.39996
      fragment.position.set(Math.cos(angle) * (3.5 + i % 3 * .3), Math.sin(angle * 1.3) * 2.1, Math.sin(angle) * 2)
      fragment.rotation.set(angle, angle * .3, angle * 1.2)
      fragment.scale.setScalar(.45 + (i % 4) * .2)
      grit.add(fragment)
    }
    scene.add(grit)

    let width = 1
    let height = 1
    let inView = true
    let drag = false
    let lastX = 0
    let userRotation = 0
    let pointerX = 0
    let pointerY = 0
    let motionTime = 0
    let previousTime = 0
    let currentProgress = 0
    const resize = new ResizeObserver(entries => {
      const box = entries[0].contentRect
      width = box.width
      height = box.height
      camera.aspect = width / Math.max(1, height)
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    })
    resize.observe(host)
    const observer = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting })
    observer.observe(host)

    const pointerMove = event => {
      const rect = host.getBoundingClientRect()
      pointerX = (event.clientX - rect.left) / width - .5
      pointerY = (event.clientY - rect.top) / height - .5
      if (drag) { userRotation += (event.clientX - lastX) * .008; lastX = event.clientX }
    }
    const pointerDown = event => {
      if (event.pointerType === 'touch') return
      drag = true
      lastX = event.clientX
      host.setPointerCapture(event.pointerId)
    }
    const pointerUp = () => { drag = false }
    const pointerLeave = () => { pointerX = 0; pointerY = 0 }
    const contextLost = event => { event.preventDefault(); host.dataset.fallback = 'true' }
    const contextRestored = () => { delete host.dataset.fallback }
    host.addEventListener('pointermove', pointerMove)
    host.addEventListener('pointerdown', pointerDown)
    host.addEventListener('pointerup', pointerUp)
    host.addEventListener('pointercancel', pointerUp)
    host.addEventListener('pointerleave', pointerLeave)
    renderer.domElement.addEventListener('webglcontextlost', contextLost)
    renderer.domElement.addEventListener('webglcontextrestored', contextRestored)

    function render(time) {
      if (disposed) return
      const dt = Math.min((time - previousTime) / 1000 || 0, .05)
      previousTime = time
      if (!inView || document.hidden) return
      const reduced = media.matches || settingsRef.current.paused
      if (!reduced) motionTime += dt
      const targetProgress = media.matches ? 0 : progressRef.current
      currentProgress = mix(currentProgress, targetProgress, reduced ? 1 : 1 - Math.exp(-dt * 8))
      const explode = smooth(.15, .46, currentProgress)
      const assemble = smooth(.52, .86, currentProgress)
      const drift = reduced ? 0 : Math.sin(motionTime * .25) * .09 + pointerX * .1
      assembly.rotation.y = -.35 + explode * .55 - assemble * .6 + userRotation + drift + settingsRef.current.rotation
      assembly.rotation.x = reduced ? 0 : pointerY * .07
      assembly.position.y = -.25
      const mobile = width < 650
      assembly.scale.setScalar(mobile ? .72 : 1)
      camera.position.set(mix(5.5, 4, assemble), mix(4.5, 3.6, assemble), mobile ? 16.5 : 14.7)
      camera.lookAt(0, .15, 0)
      for (let i = 0; i < blocks.length; i++) {
        const block = blocks[i]
        const pose = opening[i]
        const col = i % 3
        const row = Math.floor(i / 3)
        const ex = (col - 1) * 3.7
        const ey = row === 0 ? 1.6 : -1.3
        const bob = reduced ? 0 : Math.sin(motionTime * .65 + i * 1.3) * .12 * (1 - assemble)
        block.position.set(
          mix(mix(pose.p[0], ex, explode), (col - 1) * 2.86 + row * .4 - .2, assemble),
          mix(mix(pose.p[1], ey, explode), row * 1.14 - .75, assemble) + bob,
          mix(mix(pose.p[2], (i % 2 - .5) * 2.6, explode), 0, assemble),
        )
        block.rotation.set(
          mix(mix(pose.r[0], .3 * (i % 2 ? 1 : -1), explode), 0, assemble),
          mix(mix(pose.r[1], .45 * (i - 2), explode), 0, assemble),
          mix(mix(pose.r[2], .2 * (i % 2 ? 1 : -1), explode), 0, assemble),
        )
        block.scale.setScalar(mix(mix(pose.s, .92, explode), 1, assemble))
      }
      blocks[0].geometry = settingsRef.current.variant === 1 ? solid : settingsRef.current.variant === 2 ? paver : hollow
      grit.rotation.y = motionTime * .035
      grit.scale.setScalar((1 - assemble * .9) * (mobile ? .75 : 1))
      renderer.render(scene, camera)
      host.dataset.ready = 'true'
    }
    renderer.setAnimationLoop(render)
    return () => {
      disposed = true
      renderer.setAnimationLoop(null)
      resize.disconnect()
      observer.disconnect()
      host.removeEventListener('pointermove', pointerMove)
      host.removeEventListener('pointerdown', pointerDown)
      host.removeEventListener('pointerup', pointerUp)
      host.removeEventListener('pointercancel', pointerUp)
      host.removeEventListener('pointerleave', pointerLeave)
      renderer.domElement.removeEventListener('webglcontextlost', contextLost)
      renderer.domElement.removeEventListener('webglcontextrestored', contextRestored)
      scene.traverse(object => { if (object.geometry) object.geometry.dispose() })
      for (const material of [concrete, pale, charcoal, orange, floor.material]) material.dispose()
      texture.dispose()
      environment.dispose()
      hollow.dispose()
      solid.dispose()
      paver.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [progressRef])

  return <div className="block-scene" ref={containerRef} aria-hidden="true">
    <img className="scene-fallback" src="/blocks-hero.png" alt="" />
  </div>
}
