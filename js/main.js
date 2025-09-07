// ===== Three.js Scene Setup =====
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("heroCanvas"), antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// ===== 3D Hero Cube =====
const geometry = new THREE.BoxGeometry(2,2,2);
const material = new THREE.MeshStandardMaterial({ color: 0x00ffff, metalness: 0.7, roughness: 0.1 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// ===== Lighting =====
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0x00ffff, 1);
pointLight.position.set(5,5,5);
scene.add(pointLight);

// ===== Particle Background =====
const particleCount = 500;
const particles = new THREE.BufferGeometry();
const positions = new Float32Array(particleCount * 3);

for(let i=0; i<particleCount*3; i++){
  positions[i] = (Math.random() - 0.5) * 20;
}
particles.setAttribute('position', new THREE.BufferAttribute(positions,3));

const particleMaterial = new THREE.PointsMaterial({ color: 0x00ffff, size: 0.05 });
const particleSystem = new THREE.Points(particles, particleMaterial);
scene.add(particleSystem);

// ===== Animation Loop =====
function animate(){
  requestAnimationFrame(animate);

  // Cube rotation
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  // Particle movement
  particleSystem.rotation.y += 0.001;

  renderer.render(scene, camera);
}
animate();

// ===== Responsive =====
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// ===== GSAP Scroll Animations =====
gsap.registerPlugin(ScrollTrigger);

// Cards animation
gsap.from(".card", {
  scrollTrigger: {
    trigger: ".cards",
    start: "top 80%",
    toggleActions: "play none none none"
  },
  opacity: 0,
  y: 50,
  stagger: 0.2,
  duration: 1,
  ease: "power3.out"
});

// Section fade-in
gsap.utils.toArray("section").forEach(section => {
  gsap.from(section, {
    scrollTrigger: {
      trigger: section,
      start: "top 80%",
      toggleActions: "play none none none"
    },
    opacity: 0,
    y: 50,
    duration: 1,
    ease: "power2.out"
  });
});