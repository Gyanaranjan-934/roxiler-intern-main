import Barchart from "./components/BarChart.jsx";
import ProductStatsofMonth from "./components/ProductStatsofMonth.jsx";
import ProductTable from "./components/ProductTable.jsx"
import SearchDropdown from "./components/SearchDropdown.jsx"
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <SearchDropdown />
        <Routes>
        <Route exact path="/getAllTransactions" element={<ProductTable />}/>
        <Route exact path="/get-product-stats" element={<ProductStatsofMonth />}/>
        <Route exact path="/get-barchart" element={<Barchart/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
