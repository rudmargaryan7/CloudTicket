import codes from "./countyCodes.json";
import exchanges from "./countryExchange.json";

const getNameCountry = (code: string): string => {
  const countryName = codes.find((e) => e.value === code)?.label || "AMD";
  return countryName;
};

const getExchangeCountry = (code: string): string => {
  const countryName = exchanges.find((e) => e.value === code)?.label || "AMD";
  return countryName;
};

export { getNameCountry, getExchangeCountry };
