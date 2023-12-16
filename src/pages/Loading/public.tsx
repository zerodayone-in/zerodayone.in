import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../components/ui/button";
import { Progress } from "../../components/ui/progress";
import "./styles.css";
import { setActiveRoute } from "../../redux/global/reducer";

export const LoadingPage = () => {
  const [buttonClicked, setButtonClicked] = useState(false);
  const [renderLoading, setRenderLoading] = useState(true);

  const dispatch = useDispatch();
  let items = useSelector((state: any) => state.loader.items);
  let loading = useSelector((state: any) => state.loader.loading);

  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        setRenderLoading(false);
      }, 1000);
    }
  }, [loading]);

  const handleButtonClick = () => {
    setButtonClicked(true);
    dispatch(setActiveRoute("landing"));
    
  };

  if (buttonClicked) {
    return <></>;
  }

  return (
    <div
      className={`fixed inset-0 flex flex-col justify-center items-center w-full h-screen`}
      id="loading-page"
    >
      <p className="font-poppins" id="loading-page__brand">
        zerodayone
      </p>
      {renderLoading && (
        <Progress
          className=""
          id="loading-page__loading-bar"
          value={items.reduce(
            (acc: number, item: any) => acc + item.progress / items.length,
            0
          )}
        />
      )}

      <ul className="text-black" id="loading-page__loading-content">
        {renderLoading ? (
          [...items]
            .sort((a: any, b: any) => b.height - a.height)
            .map((item: any) => (
              <li
                key={item.content}
                style={{ opacity: item.progress === 100 ? 0.5 : 1 }}
              >
                {item.content}... {item.progress !== 100 && item.progress + "%"}{" "}
                {item.progress === 100 && "Done"}
              </li>
            ))
        ) : (
          <></>
        )}
      </ul>

      <div className="p-5 font-poppins" id="loading-page__label">
        {(renderLoading) ? (
          <div id="loading-page__loading-label">
            <p>All good things take time</p>
          </div>
        ) : (
          <Button onClick={handleButtonClick} id="loading-page__active-label">
            Let's go!
          </Button>
        )}
      </div>
    </div>
  );
};
