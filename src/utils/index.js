export const formatIndianCurrency = (amount) => {
    if (amount === null || amount === undefined || isNaN(amount)) {
        return '₹0.00';
    }

    const num = typeof amount === 'string' ? parseFloat(amount) : Number(amount);

    if (isNaN(num)) {
        return '₹0.00';
    }

    const isNegative = num < 0;
    const absoluteNum = Math.abs(num);

    const [integerPart, decimalPart = '00'] = absoluteNum
        .toFixed(2)
        .split('.')
        .map((str) => str.padStart(1, '0'));

    let formattedInteger = '';
    const len = integerPart.length;

    if (len <= 3) {
        formattedInteger = integerPart;
    } else {
        formattedInteger = integerPart.slice(-3);
        let remaining = integerPart.slice(0, -3);

        while (remaining.length > 0) {
            formattedInteger = remaining.slice(-2) + ',' + formattedInteger;
            remaining = remaining.slice(0, -2);
        }

        if (formattedInteger.startsWith(',')) {
            formattedInteger = formattedInteger.slice(1);
        }
    }

    const formattedAmount = `₹ ${formattedInteger}.${decimalPart}`;
    return isNegative ? `-${formattedAmount}` : formattedAmount;
};

export const getPercFrom52WeekLow = (currentPrice, yearLow) => {
    if (yearLow <= 0) {
        throw new Error('52-week low must be greater than 0');
    }

    const difference = currentPrice - yearLow;
    const percentage = (difference / yearLow) * 100;

    return percentage.toFixed(2);
};
