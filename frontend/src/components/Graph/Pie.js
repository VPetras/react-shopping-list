import React, { useContext } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

import { ShoppingListContext } from "../../context/shoppingListContext";

const SinglePie = (props) => {
  const context = useContext(ShoppingListContext);
  let data = [];
  data = [
    { name: "checked", value: props.checked },
    { name: "r", value: props.items - props.checked },
  ];

  return (
    <>
      <div className="m-2">
        <ResponsiveContainer
          width="99%"
          height="99%"
          minWidth="0"
          minHeight="0"
          aspect={0.4}>
          <PieChart>
            {/*name text*/}
            <text
              x="50%"
              y="10%"
              fontSize={24}
              textAnchor="middle"
              fill={context.theme === "dark" ? "#adb5bd" : "#000"}
              dominantBaseline="middle">
              {context.language === "en" ? "Items" : "Položky"}
            </text>
            {/*value text*/}
            <text
              x="50%"
              y="40%"
              fontSize={30}
              textAnchor="middle"
              fill={context.theme === "dark" ? "#adb5bd" : "#000"}
              dominantBaseline="middle">
              {props.checked}
            </text>
            <Pie
              dataKey="value"
              startAngle={180}
              endAngle={-540}
              data={data}
              cx="50%"
              cy="40%"
              outerRadius="80%"
              innerRadius="60%"
              fill="none">
              <Cell fill="#198754" />

              <Cell fill="#dc3545" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default SinglePie;
