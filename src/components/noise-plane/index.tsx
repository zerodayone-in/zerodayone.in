import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import shaders from "./shaders";
import { hexToThreeJSVector4 } from "../../utils";
import toggleLoading from "../../redux/public/global/actions/toggleLoading";

function NoisePlane(props: any) {
	console.log("loading shader");
  const meshRef = useRef<THREE.Mesh>();
	toggleLoading({ loading: true });

  useFrame(() => {
		toggleLoading({ loading: false });
    const mesh = meshRef.current;
    if (
      mesh &&
      mesh.material &&
      (mesh.material as THREE.ShaderMaterial).uniforms
    ) {
      mesh.rotation.x = -0.7;
      mesh.rotation.z = -0.2;
      (mesh.material as THREE.ShaderMaterial).uniforms.u_intensity.value = 0.5;
      (mesh.material as THREE.ShaderMaterial).uniforms.u_speed.value = 0.2;
      (mesh.material as THREE.ShaderMaterial).uniforms.u_rotate.value = true;
      (mesh.material as THREE.ShaderMaterial).uniforms.u_scale.value = 1.5;
      (mesh.material as THREE.ShaderMaterial).uniforms.u_time.value += 0.009;
      (mesh.material as THREE.ShaderMaterial).uniforms.u_color.value =
        hexToThreeJSVector4("#8a36a8");
      (mesh.material as THREE.ShaderMaterial).uniforms.u_color2.value =
        hexToThreeJSVector4("#3532C0");
      (mesh.material as THREE.ShaderMaterial).uniforms.u_noise.value = true;
      (mesh.material as THREE.ShaderMaterial).uniforms.u_noise_color.value =
        hexToThreeJSVector4("#ff0000");
    }
  });

  return (
    <mesh ref={meshRef} {...props}>
      <planeGeometry args={[20, 5, 2800, 2800]} />
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
