var camera, scene, renderer, frame, freq;
var mesh;
let [rx, ry, rz] = [2, 2, 0];
const FREQ = 100;
init();
animate();
function init() {
  initThree();

  frame = rotate(FREQ, rx, ry, rz);

  initInputs();
}

function initThree() {
  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.z = 400;
  camera.position.y = -100;
  scene = new THREE.Scene();
  var texture = new THREE.TextureLoader().load("textures/crate.gif");
  var geometry = new THREE.BoxBufferGeometry(200, 15, 80);
  var material = new THREE.MeshBasicMaterial({ map: texture });
  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  window.addEventListener("resize", onWindowResize, false);
}

function initInputs() {
  const xInput = document.querySelector("#x");
  const yInput = document.querySelector("#y");
  const zInput = document.querySelector("#z");
  xInput.value = rx;
  yInput.value = ry;
  zInput.value = rz;
  const withUpdateFrame = f => (...args) => {
    f(...args);
    frame = rotate(FREQ, rx, ry, rz);
  };
  xInput.addEventListener(
    "change",
    withUpdateFrame(e => (rx = e.target.value))
  );
  yInput.addEventListener(
    "change",
    withUpdateFrame(e => (ry = e.target.value))
  );
  zInput.addEventListener(
    "change",
    withUpdateFrame(e => (rz = e.target.value))
  );
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  frame();
  renderer.render(scene, camera);
}

function rotate(freq, x, y, z) {
  let dx = (x * Math.PI) / freq;
  let dy = (y * Math.PI) / freq;
  let dz = (z * Math.PI) / freq;
  let t = 0;
  mesh.rotation.x = 0;
  mesh.rotation.y = 0;
  mesh.rotation.z = 0;
  return function frame() {
    if (~~(t / freq) % 2 == 0) {
      mesh.rotation.x += dx;
      mesh.rotation.y += dy;
      mesh.rotation.z += dz;
    }
    t = (t + 1) % (freq * 2);
  };
}
