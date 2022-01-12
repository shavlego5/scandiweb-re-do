export function detectCurrencySymbol(symbol) {
  switch (symbol) {
    case "USD":
      return "$";
    case "GBP":
      return "£";
    case "AUD":
      return "A$";
    case "JPY":
      return "¥";
    case "RUB":
      return "₽";
    default:
      return "$";
  }
}

