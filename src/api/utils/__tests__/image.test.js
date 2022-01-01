const path = require('path')
const image = require('../image')

function getSampleDataUrl(name) {
  return image.toDataUrl(path.resolve(__dirname, `resources/${name}`), 'image/jpeg')
}

const PERFECT_MATCH = 1.0
const GOOD_ENOUGH_FOR_PASSWORD_MATCH = 0.95

test('when comparing two of the same image, we have a perfect match', async () => {
  const sample = getSampleDataUrl('sample-1.jpg')

  const confidence = await image.compare(sample, sample)

  expect(confidence).toBe(PERFECT_MATCH)
})

test('when comparing two different images, we have less than a perfect match', async () => {
  const sample1 = getSampleDataUrl('sample-1.jpg')
  const sample2 = getSampleDataUrl('sample-2.jpg')

  const confidence = await image.compare(sample1, sample2)

  expect(confidence).toBeLessThan(PERFECT_MATCH)
})

test('two doodles are similar enough for a possible password match', async () => {
  const sample1 = getSampleDataUrl('doodle-1.jpg')
  const sample2 = getSampleDataUrl('doodle-2.jpg')

  const confidence = await image.compare(sample1, sample2)

  expect(confidence).toBeGreaterThanOrEqual(GOOD_ENOUGH_FOR_PASSWORD_MATCH)
})

test('two dissimilar doodles on the same background are not a great match', async () => {
  const sample1 = getSampleDataUrl('doodle-1.jpg')
  const sample2 = getSampleDataUrl('bob-ross-doodle.jpg')

  const confidence = await image.compare(sample1, sample2)

  expect(confidence).toBeLessThan(GOOD_ENOUGH_FOR_PASSWORD_MATCH)
})