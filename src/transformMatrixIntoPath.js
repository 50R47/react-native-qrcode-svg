import React from "react";
import { Circle } from "react-native-svg";

export default (matrix, size, color) => {
  const cellSize = size / matrix.length;
  let path = "";
  matrix.forEach((row, i) => {
    let needDraw = false;
    row.forEach((column, j) => {
      if (column) {
        circles.push(
          <Circle
            key={`${i}${j}`}
            cx={cellSize * j + cellSize / 2}
            cy={cellSize / 2 + cellSize * i}
            r={cellSize / 2}
            fill={color}
          />
        );
      }
    });
  });
  return {
    cellSize,
    path,
  };
};
