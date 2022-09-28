import { createContext, useState } from "react";

const ThemeContext = createContext<{ color: string } | null>(null);
const LangContext = createContext<string | null>(null);


const Son = () => {
  return <ThemeContext.Consumer>
    {
      (theme) => <LangContext.Consumer>
        {
          (lang) => <div style={{ color: theme?.color }}>{lang}</div>
        }
      </LangContext.Consumer>
    }
  </ThemeContext.Consumer>
}

export const NestedProvider = () => {
  const [theme, setTheme] = useState({ color: 'green' });
  const [lang, setLang] = useState('CH');
  return <>
    <ThemeContext.Provider value={theme}>
      <LangContext.Provider value={lang}>
        <Son></Son>
      </LangContext.Provider>
    </ThemeContext.Provider>
    <button onClick={() => setTheme({ color: "red" })}>changeTheme</button>
    <button onClick={() => setLang('En')}>changeLang</button>
  </>
}
