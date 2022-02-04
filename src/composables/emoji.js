import { ref, computed } from 'vue'

import aliases from 'emojilib'
import data from 'unicode-emoji-json'

const emoji = Object
  .entries(data)      
  .reduce((output, [emoji, metadata]) => {
    output[metadata.group] = output[metadata.group] || []

    output[metadata.group].push({
      emoji,
      name: metadata.name,
      slug: metadata.slug,
      aliases: aliases[emoji]
    })

    return output
  }, {})

export default function useEmoji(query) {
  const results = computed(() => {
    return Object.entries(emoji).reduce((output, [category, emojis]) => {
      output[category] = emojis.filter(e => e.slug.toLowerCase().includes(query.value.toLowerCase()))

      return output
    }, {})
  })

  return {
    results
  }
}