import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";

import Home from "./pages/home";
import ShoppingList from "./pages/shoppingList";

import { ShoppingListProvider } from "./context/shoppingListContext";

function List() {
  let { id } = useParams();
  return <ShoppingList id={id} />;
}

function App() {
  return (
    <ShoppingListProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/:id" element={<List />} />
        </Routes>
      </Router>
    </ShoppingListProvider>
  );
}

export default App;
