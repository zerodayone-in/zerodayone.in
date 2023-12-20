import * as THREE from "three";
import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import shaders from "./shaders";
import { hexToThreeJSVector4 } from "../../utils";
import { pushContent } from "../../redux/loader/reducer";
import { useDispatch } from "react-redux";

const convertPointerToMeshCoordinates = (pointer: any, mesh: any, camera: any) => {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2(pointer.x, pointer.y);

  raycaster.setFromCamera(mouse, camera);

  const intersection = new THREE.Vector3();
  raycaster.ray.intersectPlane(new THREE.Plane().setFromNormalAndCoplanarPoint(mesh.up, mesh.position), intersection);

  return intersection;
};

function NoisePlane(props: any) {
  const dispatch = useDispatch();
  const meshRef = useRef<THREE.Mesh>();
  let loading = true;
  let frameCount = 0;
  const { camera } = useThree();

  useFrame(({pointer, clock}) => {
    frameCount++;
    if (loading && frameCount > 100) {
      dispatch(
        pushContent({
          content: "Compiling shaders",
          progress: 100,
        })
      );
      loading = false;
    }
    const mesh = meshRef.current;
    if (
      mesh &&
      mesh.material &&
      (mesh.material as THREE.ShaderMaterial).uniforms
    ) {
      mesh.rotation.x = -0.5;
      mesh.rotation.z = 0;
      (mesh.material as THREE.ShaderMaterial).uniforms.u_intensity.value = 0.5;
      (mesh.material as THREE.ShaderMaterial).uniforms.u_speed.value = 0.1;
      (mesh.material as THREE.ShaderMaterial).uniforms.u_rotate.value = true;
      (mesh.material as THREE.ShaderMaterial).uniforms.u_scale.value = 2;
      (mesh.material as THREE.ShaderMaterial).uniforms.u_time.value = clock.getElapsedTime();
      (mesh.material as THREE.ShaderMaterial).uniforms.u_color.value =
        hexToThreeJSVector4("#3532C0");
      (mesh.material as THREE.ShaderMaterial).uniforms.u_color2.value =
        hexToThreeJSVector4("#FFF847");
      (mesh.material as THREE.ShaderMaterial).uniforms.u_noise.value = true;
      (mesh.material as THREE.ShaderMaterial).uniforms.u_noise_color.value =
        hexToThreeJSVector4("#ff0000");

      const mouseCoordinates = convertPointerToMeshCoordinates(pointer, mesh, camera);
      console.log(mouseCoordinates);

      (mesh.material as THREE.ShaderMaterial).uniforms.u_mouse.value = new THREE.Vector3(
        mouseCoordinates.x,
        mouseCoordinates.y,
        mouseCoordinates.z
      );
    }

  });

  return (
    <mesh ref={meshRef} {...props}>
      <planeGeometry args={[20, 15, 2800, 150]} />
      <shaderMaterial
        attach="material"
        uniforms={shaders.uniforms}
        vertexShader={shaders.resolved_vertex}
        fragmentShader={shaders.resolved_fragment}
      />
    </mesh>
  );
}

export default NoisePlane;
