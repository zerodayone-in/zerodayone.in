import { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "../../components/ui/button";

export const LoadingPage = () => {
  const [buttonClicked, setButtonClicked] = useState(false);

  let items = useSelector((state: any) => state.loader.items);
  let loading = useSelector((state: any) => state.loader.loading);

  const handleButtonClick = () => {
    setButtonClicked(true);
  };

  if (buttonClicked) {
    return <></>;
  }

  return (
    <div
      className={`fixed inset-0 flex flex-col justify-center items-center w-full h-screen bg-black`}
    >
      <h1 className="text-6xl font-poppins font-bold text-white">Loading</h1>
      <ul className="text-white">
        {items.map((item: any) => (
          <li key={item.content}>
            {item.content} {item.progress}%
          </li>
        ))}
      </ul>

      {loading ? (
        <Button variant="default">All good things take time</Button>
      ) : (
        <Button onClick={handleButtonClick} variant="outline">
          Enter experience
        </Button>
      )}
    </div>
  );
};
