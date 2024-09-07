import { changeInput, initMainTickets } from "@/features/tickets";
import { AppDispatch } from "../app/store";
import CountryCodes from "./countyCodes.json";
import { filter } from "../features/auth/authReducer";
import { initMainPageTickets } from "@/api";
import axios from "axios";

interface ExchangeRates {
  [key: string]: number;
}
const countryCurrencyMap: { [key: string]: string } = {
  US: "USD", // United States
  EU: "EUR", // European Union
  JP: "JPY", // Japan
  GB: "GBP", // United Kingdom
  AU: "AUD", // Australia
  CA: "CAD", // Canada
  CH: "CHF", // Switzerland
  CN: "CNY", // China
  RU: "RUB", // Russia
  IN: "INR", // India
  BR: "BRL", // Brazil
  ZA: "ZAR", // South Africa
  MX: "MXN", // Mexico
  TR: "TRY", // Turkey
  KR: "KRW", // South Korea
  AE: "AED", // United Arab Emirates
  SG: "SGD", // Singapore
  HK: "HKD", // Hong Kong
  MY: "MYR", // Malaysia
  TH: "THB", // Thailand
  AM: "AMD", // Armenia
  BY: "BYN", // Belarus
  UA: "UAH", // Ukraine
  VN: "VND", // Vietnam
  NZ: "NZD", // New Zealand
};

export const initHomePageTickets = async (
  dispatch: AppDispatch,
  code: string
) => {
  const countryName = CountryCodes.filter((e) => e.value === code)[0].label;
  const mainTickets = await initMainPageTickets(countryName);
  dispatch(
    changeInput({
      name: "from",
      value: countryName,
    })
  );
  dispatch(initMainTickets(mainTickets.data.payload));
};

export const fetchExchangeRate = async (exchange: string) => {
  try {
    const EXCHANGE_API_KEY = "f4c68eb5bb8ead8efd481dc3";
    const response = await axios.get(
      `https://v6.exchangerate-api.com/v6/${EXCHANGE_API_KEY}/latest/USD`
    );
    const rates: ExchangeRates = response.data.conversion_rates;
    return Math.floor(rates[exchange]);
  } catch (error) {
    console.error("Ошибка при получении курса валют:", error);
    return 0;
  }
};

export async function initLocationApp(dispatch: AppDispatch) {
  try {
    const response = await fetch("https://ipinfo.io/json");
    const data = await response.json();

    if (data.country) {
      initHomePageTickets(dispatch, data.country);
    }
    const exchange = countryCurrencyMap[data.country];
    const rate = await fetchExchangeRate(exchange);
    dispatch(
      filter({
        exchange,
        country: data.country,
        rate,
      })
    );

    return data;
  } catch (error) {
    console.error("Error fetching location:", error);
  }
}
