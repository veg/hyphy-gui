const validateMSA = require('./../src/helpers/validateMSA.js');
const path = require('path');

// Get the absolute paths to example datasets.
const dataPath = path.join(process.cwd(), 'data');
const validMSAPath = path.join(dataPath, 'CD2_reduced.fna')
const stopCodonMSAPath = path.join(dataPath, 'CD2_reduced_stopcodon.fasta')

// Test pass/fail.
test('Passes with valid file', () => {
  validateMSA(validMSAPath, '1', (validationOutput) => {
  expect(validationOutput.valid).toBe(true)
  })
})

test('Fails with file with stop codon', () => {
  validateMSA(stopCodonMSAPath, '1', (validationOutput) => {
  expect(validationOutput.valid).toBe(false)
  })
})

test('Fails with incorrect path', () => {
  validateMSA('./exampleIncorrectPath', '1', (validationOutput) => {
    expect(validationOutput.valid).toBe(false)
  })
})

// Test validation output messages.
test('Returns valid output message with the correct number of items', () => {
  validateMSA(validMSAPath, '1', (validationOutput) => {
    expect(Object.keys(validationOutput.message).length).toBe(3)
  })
})

test('Returns expected output message when a stop codon is incountered', () => {
  validateMSA(stopCodonMSAPath, '1', (validationOutput) => {
    expect(validationOutput.message).toBe("1 stop codons found (detailed report below). Please double-check your alignment and ensure that only coding data are present and that the correct genetic code is selected.")
  })
})
