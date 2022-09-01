import { useEffect, useState } from "react";
import { getCurrency } from "./api/api";
import "./App.scss";

function App() {
  const [currencyData, setCurrencyData] = useState([]);
  const [leftSelect, setLeftSelect] = useState("USD");
  const [rightSelect, setRightSelect] = useState("UAH");
  const [leftInput, setLeftInput] = useState(1);
  const [rightInput, setRightInput] = useState(1);

  const leftCountCurrency = async (e) => {
    setLeftSelect(e.target.value);
    const data = await getCurrency(e.target.value, rightSelect, leftInput);
    setRightInput(JSON.parse(data).result);
  };

  const rightCountCurrency = async (e) => {
    setRightSelect(e.target.value);
    const data = await getCurrency(e.target.value, leftSelect, rightInput);
    setLeftInput(JSON.parse(data).result);
  };

  const leftCountInput = async (e) => {
    setLeftInput(e.target.value);
    const data = await getCurrency(leftSelect, rightSelect, e.target.value);
    setRightInput(JSON.parse(data).result);
  };

  const rightCountInInput = async (e) => {
    setRightInput(e.target.value);
    const data = await getCurrency(rightSelect, leftSelect, e.target.value);
    setLeftInput(JSON.parse(data).result);
  };

  useEffect(() => {
    getCurrency("USD", "UAH", 1).then((data) => {
      setRightInput(JSON.parse(data).result);
    });
  }, []);

  return (
    <div className="App">
      <div className="header">
        <div>
          {/* <p> USD = {currencyData[0]?.buy} UAH</p>
          <p> USD = {currencyData[0]?.buy} UAH</p> */}
        </div>
      </div>
      <div className="main">
        <div>
          <div className="main_select-container">
            <select value={leftSelect} onChange={leftCountCurrency}>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="UAH">UAH</option>
            </select>
            <select value={rightSelect} onChange={rightCountCurrency}>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="UAH">UAH</option>
            </select>
          </div>
          <div className="main_input-container">
            <input value={leftInput} onChange={leftCountInput} />
            <input value={rightInput} onChange={rightCountInInput} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
