import { useState, useEffect } from "react";
import "./styles.css";

function Grid() {
  const grid_size = 10;
  const [boxColors, setBoxColors] = useState<string[][]>([]);

  useEffect(() => {
    const generateRandomColors = () => {
      const colors = ["#8F4F9E", "#3532C0", "#4A39B8", "#6040B0"];

      const getRandomColor = () => {
        const seed = Math.floor(Math.random() * colors.length);
        return colors[seed];
      };

      const boxColors = Array(grid_size)
        .fill(null)
        .map(() =>
          Array(grid_size)
            .fill(null)
            .map(() => getRandomColor())
        );

      setBoxColors(boxColors);
    };

    const timeoutId = setTimeout(() => {
      generateRandomColors();
      const intervalId = setInterval(() => {
        generateRandomColors();
      },250); // Set the intervfffal duration as needed (in milliseconds)

      setTimeout(() => {
        clearInterval(intervalId);
      }, 700); // Stop the interval after 2 seconds

    }, 0); // Run the initial randomization immediately

    return () => {
      clearTimeout(timeoutId); // Cleanup the timeout when the component unmounts
    };
  }, [grid_size]);

  return (
    <div className="grid">
      {boxColors.map((rowColors, i) => (
        <div className="row" key={i}>
          {rowColors.map((color, j) => (
            <div
              className="box"
              style={{ backgroundColor: color }}
              key={j}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Grid;
