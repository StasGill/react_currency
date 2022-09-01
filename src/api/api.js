// import axios from "axios";

// export const getCurrency = () => {
//   return axios.get(
//     "https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11"
//   );
// };

var myHeaders = new Headers();
myHeaders.append("apikey", "vcMbbDznPaQbBcI0L8lH9XnbtMZdcfsh");

var requestOptions = {
  method: "GET",
  redirect: "follow",
  headers: myHeaders,
};

// fetch(
//   "https://api.apilayer.com/exchangerates_data/convert?to={to}&from={from}&amount={amount}",
//   requestOptions
// )
//   .then((response) => response.text())
//   .then((result) => console.log(result))
//   .catch((error) => console.log("error", error));

export const getCurrency = (from, to, amount) => {
  return fetch(
    `https://api.apilayer.com/exchangerates_data/convert?to=${to}&from=${from}&amount=${amount}`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => result)
    .catch((error) => console.log("error", error));
};
