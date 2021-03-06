import React, { useState } from "react";
import Footer from "./components/Footer";
import Routes from "./routes/Routes";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

import {
  IntlProvider
} from "react-intl";
import messages from "./language/messages";

function App() {
  const [darkMode] = useState(true);
  const language = navigator.language.split("-")[0];
  const theme = createTheme({
    spacing: 4,
    palette: {

      type: darkMode ? 'dark' : 'light',

      background: {
        default: '#2b2b2b',
        dark: '#181818',
        paper: 'rgba(0, 0, 0, 0.5)',
      },
      
      primary: {
        main: "#2b2b2b",
        darker: "#ffc107",
      },
      neutral: {
        main: "#ffc107",
        contrastText: "#fff",
      },
      secondary: {
        main: "#ffc107",
        contrastText: "#fff",
      }
    },
  });

  return (
    <IntlProvider locale={language} messages={messages[language]}>
      <ThemeProvider theme={theme}>
        
        <Routes />
        <Footer />
      </ThemeProvider>
    </IntlProvider>
  );
}

export default App;
