import { useState, useEffect } from "react";
import "./styles.css";

function Grid() {
  const grid_size = 10;
  const [boxColors, setBoxColors] = useState<string[][]>([]);

  useEffect(() => {
    const generateRandomColors = () => {
      const colors = ["#8F4F9E", "#DA6882", "#3532C0", "#4A39B8", "#6040B0"];

      const boxColors = Array(grid_size)
        .fill(null)
        .map(() =>
          Array(grid_size)
            .fill(null)
            .map(() => {
              var seed = Math.floor(Math.random() * colors.length);
              console.log(seed);
              return colors[seed];
            })
        );

      setBoxColors(boxColors);
    };

    generateRandomColors();
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
