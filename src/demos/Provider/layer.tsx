import { createContext, useState } from "react";

const ThemeContext = createContext<{ color: string } | null>(null);

const Grandson = () => {
  return <ThemeContext.Consumer>
    {
      (theme) => <div style={{ color: theme?.color }}>grandSon</div>
    }
  </ThemeContext.Consumer>
}

const Son = () => {
  const [middletheme, setTheme] = useState({ color: 'orange' });
  return <ThemeContext.Consumer>
    {
      (theme) => <>
        <div style={{ color: theme?.color }}>son</div>
        <ThemeContext.Provider value={middletheme}>
          <Grandson></Grandson>
        </ThemeContext.Provider>
      </>
    }
  </ThemeContext.Consumer >
}

export const LayerProvider = () => {
  const [theme, setTheme] = useState({ color: 'green' });
  return <>
    <ThemeContext.Provider value={theme}>
      <Son></Son>
    </ThemeContext.Provider>
  </>
}
