const fs = require('fs')
const compareImages = require("resemblejs/compareImages")

/**
 * 
 * @param {string} a DataURI representing an image to compare
 * @param {string} b DataURI representing an image to compare
 * @returns {number} A decimal value between 0 and 1 where 1 is a perfect match
 */
async function compare(a, b) {
  const data = await compareImages(a, b, {})

  return 1 - data.rawMisMatchPercentage / 100
}

function toDataUrl(file, mimeType) {
  if (!fs.existsSync(file)) {
    throw new Error(`${file} does not exist`)
  }

  if (!mimeType) {
    throw new Error(`You must provide the mime-type for the image (e.g. image/jpg, image/png, etc.)`)
  }

  const image = fs.readFileSync(file)

  return `data:${mimeType};base64,${image.toString('base64')}`
}

module.exports = {
  compare, 
  toDataUrl
}