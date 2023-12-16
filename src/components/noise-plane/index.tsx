import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import shaders from "./shaders";
import { hexToThreeJSVector4 } from "../../utils";
import { pushContent } from "../../redux/loader/reducer";
import { useDispatch } from "react-redux";

function NoisePlane(props: any) {
  const dispatch = useDispatch();
  const meshRef = useRef<THREE.Mesh>();
  let loading = true;
  let frameCount = 0;

  useFrame(() => {
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
      (mesh.material as THREE.ShaderMaterial).uniforms.u_intensity.value = 0.1;
      (mesh.material as THREE.ShaderMaterial).uniforms.u_speed.value = 0.1;
      (mesh.material as THREE.ShaderMaterial).uniforms.u_rotate.value = true;
      (mesh.material as THREE.ShaderMaterial).uniforms.u_scale.value = 2;
      (mesh.material as THREE.ShaderMaterial).uniforms.u_time.value += 0.009;
      (mesh.material as THREE.ShaderMaterial).uniforms.u_color.value =
        hexToThreeJSVector4("#3532C0");
      (mesh.material as THREE.ShaderMaterial).uniforms.u_color2.value =
        hexToThreeJSVector4("#FFF847");
      (mesh.material as THREE.ShaderMaterial).uniforms.u_noise.value = true;
      (mesh.material as THREE.ShaderMaterial).uniforms.u_noise_color.value =
        hexToThreeJSVector4("#ff0000");
    }
  });

  return (
    <mesh ref={meshRef} {...props}>
      <planeGeometry args={[20, 5, 2800, 150]} />
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
