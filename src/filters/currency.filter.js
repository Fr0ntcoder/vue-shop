export default function currencyFilter(value,currency = "RUB") {
    return Intl.NumberFormat("ru-RU",{
        style: "currency",
        minimumFractionDigits: 0,
        currency
    }).format(value)
}