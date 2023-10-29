export const formatDollarValue = (value: number) => {
   return `$${Number(value.toFixed(2)).toLocaleString('en-US', {minimumIntegerDigits: 2, minimumFractionDigits: 2})}`
}