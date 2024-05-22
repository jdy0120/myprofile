import React, { useEffect } from "react";
import { ThemeProvider } from "styled-components";
import Providers from "../../../utils/redux/provider";

import { useSelector, useDispatch } from "../../../utils/redux/store";
import { setLight, setDark } from "../../../utils/redux/features";

import { light, dark } from "../../../styles/theme";

import GlobalStyles from "../../../styles/GlobalStyle.styles";

import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);

  let isSystemDarkMode = null;
  if (typeof window !== "undefined") {
    isSystemDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
  }

  let localTheme = null;
  if (typeof localStorage !== "undefined") {
    localTheme = localStorage.getItem("theme");
  }

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    dispatch(nextTheme === "dark" ? setDark() : setLight());
    localStorage.setItem("theme", nextTheme);
  };

  useEffect(() => {
    if (isSystemDarkMode && !localTheme)
      dispatch(isSystemDarkMode ? setDark() : setLight());
    else if (localTheme)
      dispatch(localTheme === "dark" ? setDark() : setLight());
  }, []);

  return (
    <ThemeProvider theme={theme === "light" ? light : dark}>
      <GlobalStyles />
      <Header toggleTheme={toggleTheme} />
      <Body>{children}</Body>
      <Footer />
    </ThemeProvider>
  );
};

export default Layout;
