import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/Router";
import GlobalStyle from "./styles/GlobalStyle";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
