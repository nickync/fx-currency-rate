import axios from "axios";

export const getRate = async (date) => await axios.get(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/${date}/currencies/usd.json`)

export const getDefinition = () => axios.get(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json`)