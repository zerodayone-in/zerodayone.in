import { Canvas } from "@react-three/fiber";
import NoisePlane from "../../components/noise-plane";
import "./styles.css";

export const landingLoader = () => {
	console.log("loading");
	return (
		<div className="h-screen w-full" id="landing">
			<h1 className="text-6xl font-poppins font-bold text-white">Loading</h1>
		</div>
	);
};

export const LandingPage = () => {
	console.log("loaded");
  return (
    <div className="h-screen w-full" id="landing">
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <NoisePlane position={[0, 0, 2]} />
      </Canvas>
      <div
        className="fixed inset-0 flex flex-col justify-center items-center w-full h-screen"
        id="overlay"
      >
				<h1 className="text-6xl font-poppins font-bold text-white"></h1>
				<h1 className="text-6xl font-poppins font-bold text-white"></h1>
	
      </div>
    </div>
  );
};

