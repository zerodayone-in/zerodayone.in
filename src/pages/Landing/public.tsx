import { Canvas } from "@react-three/fiber";
import { LoadingPage } from "../../pages/Loading/public.tsx";
import { useDispatch } from "react-redux";
import { pushContent } from "../../redux/loader/reducer.tsx";
import { Suspense } from "react";
import LandingContent from "../../pages/Landing/landing-content.tsx";
import NoisePlane from "../../components/noise-plane";
import "./styles.css";

export const LandingPage = () => {
  const dispatch = useDispatch();

  dispatch(
    pushContent({
      content: "Compiling shaders",
      progress: 0,
    })
  );

  dispatch(
    pushContent({
      content: "Reading state",
      progress: 100,
    })
  );

  return (
    <>
      <div className="h-screen w-full" id="landing">
        <Suspense fallback={<LoadingPage />}>
          <Canvas>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <NoisePlane position={[0, 4, -1]} />
          </Canvas>
        </Suspense>
        <div
          id="overlay"
          className="fixed inset-0 flex flex-col justify-center items-center w-full h-screen"
        >
          <LandingContent />
        </div>
        <LoadingPage />
      </div>
    </>
  );
};
