export const formatDollarValue = (value: number) => {
   return `$${Number(value.toFixed(2)).toLocaleString('en-US', {minimumIntegerDigits: 2, minimumFractionDigits: 2})}`
}

export const parseLocaleNumber = (stringNumber: string) => {
   var thousandSeparator = Intl.NumberFormat('en-US').format(11111).replace(/\p{Number}/gu, '');
   var decimalSeparator = Intl.NumberFormat('en-US').format(1.1).replace(/\p{Number}/gu, '');

   return parseFloat(stringNumber
       .replace(new RegExp('\\' + thousandSeparator, 'g'), '')
       .replace(new RegExp('\\' + decimalSeparator), '.')
   );
}
