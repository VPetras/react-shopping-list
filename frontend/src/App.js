import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";

import Home from "./pages/home";
import ShoppingList from "./pages/shoppingList";

import { ShoppingListProvider } from "./context/shoppingListContext";
import RegisterPage from "./pages/register";
import LoginPage from "./pages/login";
import NavBar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import NotFoundPage from "./pages/404";

import "./App.css";

function List() {
  let { id } = useParams();
  return <ShoppingList id={id} />;
}

function App() {
  return (
    <ShoppingListProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/shared" element={<Home />} />
          <Route path="/archived" element={<Home />} />
          <Route path="/list/:id" element={<List />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/docs" element={<h1>Docs</h1>} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </Router>
    </ShoppingListProvider>
  );
}

export default App;
