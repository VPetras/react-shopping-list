import React, { useContext } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

import { ShoppingListContext } from "../../context/shoppingListContext";

const SingleGauge = (props) => {
  const context = useContext(ShoppingListContext);
  let data = [];
  data = [
    { name: "checked", value: props.checked },
    { name: "r", value: props.items - props.checked },
  ];

  return (
    <>
      <div
        style={{
          minWidth: 0,
          minHeight: undefined,
          aspect: undefined,
          width: 180,
          height: 120,
        }}
        className="m-2">
        <ResponsiveContainer
          width="200%"
          height="160%"
          minWidth="0"
          minHeight="0">
          <PieChart>
            {/*name text*/}
            <text
              x="25%"
              y="6%"
              fontSize={24}
              textAnchor="middle"
              fill={context.theme === "dark" ? "#adb5bd" : "#000"}
              dominantBaseline="middle">
              {context.language === "en" ? "Items" : "Položky"}
            </text>
            {/*value text*/}
            <text
              x="25%"
              y="50%"
              fontSize={30}
              textAnchor="middle"
              fill={context.theme === "dark" ? "#adb5bd" : "#000"}
              dominantBaseline="middle">
              {props.checked}
            </text>
            {/*min text*/}
            <text
              x="5%"
              y="70%"
              fontSize={24}
              textAnchor="middle"
              fill={context.theme === "dark" ? "#adb5bd" : "#000"}
              dominantBaseline="middle">
              0
            </text>
            {/*max text*/}
            <text
              x="46%"
              y="70%"
              fontSize={24}
              textAnchor="middle"
              fill={context.theme === "dark" ? "#adb5bd" : "#000"}
              dominantBaseline="middle">
              {props.items}
            </text>
            <Pie
              dataKey="value"
              startAngle={180}
              endAngle={0}
              data={data}
              cx="25%"
              cy="60%"
              outerRadius="90%"
              innerRadius="70%"
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

export default SingleGauge;
