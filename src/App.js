import { useEffect, useState } from "react";
import { getCurrency, getCurrencyLive } from "./api/api";
import "./App.scss";

function round(value, precision) {
  if (precision === 0) return Math.round(value);

  let exp = 1;
  for (let i = 0; i < precision; i++) exp *= 10;

  return Math.round(value * exp) / exp;
}

function App() {
  const [currencyData, setCurrencyData] = useState({});
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
    if (!e.target.value) return;
    const data = await getCurrency(leftSelect, rightSelect, e.target.value);
    setRightInput(JSON.parse(data).result);
  };

  const rightCountInInput = async (e) => {
    setRightInput(e.target.value);
    if (!e.target.value) return;
    const data = await getCurrency(rightSelect, leftSelect, e.target.value);
    setLeftInput(JSON.parse(data).result);
  };

  useEffect(() => {
    getCurrency("USD", "UAH", 1).then((data) => {
      setRightInput(JSON.parse(data).result);
    });
    getCurrencyLive().then((data) => setCurrencyData(data));
  }, []);

  return (
    <div className="App">
      <div className="header">
        <p>CURRENCY CHECK</p>
        <div>
          <span>1 USD = {round(currencyData.quotes?.USDUAH, 2)} UAH</span>
          <span>1 USD = {round(currencyData.quotes?.USDEUR, 2)} EUR</span>
        </div>
      </div>
      <div className="main">
        <div className="main_select">
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
