const fragmentShader= `
void main() {
		float gradient = gl_FragCoord.y / 500.0;
		gl_FragColor = vec4(gradient, 0.0, 1.0 - gradient, 1.0);
}
`;

const vertexShader = `
void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

camera.position.z = 2;
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);

const uniforms = {};
const material = new THREE.ShaderMaterial({
    uniforms,
    fragmentShader: fragmentShader,
    vertexShader: vertexShader,
});


const geometry = new THREE.PlaneGeometry(window.innerWidth / 2, window.innerHeight / 2);
const mesh = new THREE.Mesh(geometry, material);
mesh.rotation.x = 1.5;
mesh.rotation.y = .75;
scene.add(mesh);

// Render function
const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
};

// Handle window resize
window.addEventListener('resize', () => {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(newWidth, newHeight);
    geometry.width = newWidth;
    geometry.height = newHeight;
});

animate();
