/* global gtag */

/**
 * Sends a custom event to Google Analytics.
 */
function trackEvent(eventName, parameters = {}) {
  console.log('GA event fired:', eventName, parameters);

  if (typeof gtag === 'function') {
    gtag('event', eventName, {
      ...parameters,
      timestamp: new Date().toISOString()
    });
  }
}

/**
 * Converts integer to Roman numeral.
 */
function integerToRoman(num) {
  if (typeof num !== 'number' || isNaN(num)) {
    throw new Error('Input must be a valid number.');
  }

  if (!Number.isInteger(num)) {
    throw new Error('Input must be an integer.');
  }

  if (num <= 0 || num >= 4000) {
    throw new Error('The number must be between 1 and 3999.');
  }

  const romanNumerals = [
    { value: 1000, numeral: 'M' },
    { value: 900, numeral: 'CM' },
    { value: 500, numeral: 'D' },
    { value: 400, numeral: 'CD' },
    { value: 100, numeral: 'C' },
    { value: 90, numeral: 'XC' },
    { value: 50, numeral: 'L' },
    { value: 40, numeral: 'XL' },
    { value: 10, numeral: 'X' },
    { value: 9, numeral: 'IX' },
    { value: 5, numeral: 'V' },
    { value: 4, numeral: 'IV' },
    { value: 1, numeral: 'I' }
  ];

  let result = '';

  for (const { value, numeral } of romanNumerals) {
    while (num >= value) {
      result += numeral;
      num -= value;
    }
  }

  return result;
}

/**
 * Converts Roman numeral to integer.
 */
function romanToInteger(roman) {
  if (typeof roman !== 'string' || roman.trim() === '') {
    throw new Error('Input must be a valid Roman numeral.');
  }

  roman = roman.toUpperCase();

  if (!/^[IVXLCDM]+$/.test(roman)) {
    throw new Error('The Roman numeral contains invalid characters.');
  }

  const romanMap = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000
  };

  let total = 0;
  let previousValue = 0;

  for (let i = roman.length - 1; i >= 0; i--) {
    const currentValue = romanMap[roman[i]];

    if (currentValue < previousValue) {
      total -= currentValue;
    } else {
      total += currentValue;
    }

    previousValue = currentValue;
  }

  const reconversion = integerToRoman(total);

  if (reconversion !== roman) {
    throw new Error('The Roman numeral is not in canonical form.');
  }

  return total;
}

/**
 * Handles conversion.
 */
function handleConversion() {
  const mode = document.getElementById('conversionType').value;
  const input = document.getElementById('inputValue').value.trim();

  const resultDiv = document.getElementById('result');
  const errorDiv = document.getElementById('error');

  resultDiv.textContent = '';
  errorDiv.textContent = '';

  trackEvent('convert_clicked', {
    conversion_mode: mode,
    input_length: input.length
  });

  try {
    if (mode === 'intToRoman') {
      const num = parseInt(input, 10);

      if (isNaN(num)) {
        throw new Error('Please enter a valid integer.');
      }

      const roman = integerToRoman(num);

      resultDiv.textContent = `Roman Numeral: ${roman}`;

      trackEvent('conversion_success', {
        conversion_mode: mode,
        result_type: 'roman'
      });
    } else {
      const integer = romanToInteger(input);

      resultDiv.textContent = `Integer: ${integer}`;

      trackEvent('conversion_success', {
        conversion_mode: mode,
        result_type: 'integer'
      });
    }
  } catch (error) {
    errorDiv.textContent = error.message;

    trackEvent('conversion_error', {
      conversion_mode: mode,
      error_message: error.message
    });
  }
}

/**
 * Init after DOM is loaded
 */
document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('convertButton');

  if (button) {
    button.addEventListener('click', handleConversion);
  } else {
    console.error('Button with id "convertButton" not found.');
  }
});
