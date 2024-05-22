import React from "react";
import { useSelector } from "../../../../../utils/redux/store";
import DarkMode from "./DarkMode";
import LightMode from "./LightMode";

const PrismTheme = () => {
  const { theme } = useSelector((state) => state.theme);

  return <>{theme === "light" ? <LightMode /> : <DarkMode />}</>;
};

export default PrismTheme;
