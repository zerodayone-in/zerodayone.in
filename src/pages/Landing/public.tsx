import { Canvas } from "@react-three/fiber";
import { LoadingPage } from "../../pages/Loading/public.tsx";
import "./styles.css";
import { useDispatch } from "react-redux";
import { pushContent } from "../../redux/loader/reducer.tsx";
import { Suspense } from "react";
import NoisePlane from "../../components/noise-plane";

export const landingLoader = () => {
  return (
    <div className="h-screen w-full" id="landing">
      <h1 className="text-6xl font-poppins font-bold text-white">Loading</h1>
    </div>
  );
};

export const LandingPage = () => {
  const dispatch = useDispatch();

  dispatch(
    pushContent({
      content: "Compiling shaders",
      progress: 0,
    })
  );

  return (
    <>
      <Suspense fallback={<LoadingPage />}>
        <div className="h-screen w-full" id="landing">
          <Canvas>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <NoisePlane position={[0, 0, 2]} />
          </Canvas>
        </div>
      </Suspense>
      <LoadingPage />
    </>
  );
};
