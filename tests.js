const expect = chai.expect;



describe('integerToRoman', function() {

  it('should convert 1 to "I"', function() {
    expect(integerToRoman(1)).to.equal('I');
  });

  it('should convert 4 to "IV"', function() {
    expect(integerToRoman(4)).to.equal('IV');
  });

  it('should convert 9 to "IX"', function() {
    expect(integerToRoman(9)).to.equal('IX');
  });

  it('should convert 58 to "LVIII"', function() {
    expect(integerToRoman(58)).to.equal('LVIII');
  });

  it('should convert 1994 to "MCMXCIV"', function() {
    expect(integerToRoman(1994)).to.equal('MCMXCIV');
  });

  it('should convert 3999 to "MMMCMXCIX"', function() {
    expect(integerToRoman(3999)).to.equal('MMMCMXCIX');
  });

  it('should throw an error for numbers less than 1', function() {
    expect(() => integerToRoman(0)).to.throw("The number must be between 1 and 3999.");
  });

  it('should throw an error for numbers greater than 3999', function() {
    expect(() => integerToRoman(4000)).to.throw("The number must be between 1 and 3999.");
  });

    it('should throw error for mixed numbers and letters like "123df"', function() {
    expect(() => romanToInteger('123df')).to.throw("The Roman numeral contains invalid characters.");
  });

  it('should throw error for decimal number 3.5', function() {
  expect(() => integerToRoman(3.5)).to.throw('Input must be an integer.');
  });

  it('should throw error for string "10"', function() {
  expect(() => integerToRoman("10")).to.throw('Input must be a valid number.');
  });
  
  it('should throw error for NaN', function() {
  expect(() => integerToRoman(NaN)).to.throw('Input must be a valid number.');
  });

  it('should throw error for null', function() {
    expect(() => integerToRoman(null)).to.throw('Input must be a valid number.');
  });
});


describe('romanToInteger', function() {

  it('should convert "I" to 1', function() {
    expect(romanToInteger('I')).to.equal(1);
  });

  it('should convert "IV" to 4', function() {
    expect(romanToInteger('IV')).to.equal(4);
  });

  it('should convert "IX" to 9', function() {
    expect(romanToInteger('IX')).to.equal(9);
  });

  it('should convert "LVIII" to 58', function() {
    expect(romanToInteger('LVIII')).to.equal(58);
  });

  it('should convert "MCMXCIV" to 1994', function() {
    expect(romanToInteger('MCMXCIV')).to.equal(1994);
  });

  it('should accept lowercase input', function() {
    expect(romanToInteger('xvii')).to.equal(17);
  });

  it('should throw error for invalid characters', function() {
    expect(() => romanToInteger('ABC')).to.throw("The Roman numeral contains invalid characters.");
  });

  it('should throw error for non-canonical numerals', function() {
    expect(() => romanToInteger('IIII')).to.throw("The Roman numeral is not in canonical form.");
  });

  it('should throw error for empty input', function() {
    expect(() => romanToInteger('')).to.throw("Input must be a valid Roman numeral.");
  });

  it('should throw error for mixed roman and numbers like "XII123"', function() {
    expect(() => romanToInteger('XII123')).to.throw("The Roman numeral contains invalid characters.");
  });

  it('should throw error for mixed valid and invalid letters like "XIIabc"', function() {
    expect(() => romanToInteger('XIIabc')).to.throw("The Roman numeral contains invalid characters.");
  });

  it('should throw error for spaces inside input like "X II"', function() {
  expect(() => romanToInteger('X II')).to.throw("The Roman numeral contains invalid characters.");
});

});
