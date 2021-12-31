const { ref, computed } = require('vue')

const a = ref(null)

const sum = computed(() => a.value + 3)

test('a is null', () => {
  expect(a.value).toBe(null)
})

test('computed values update when their dependents are changed', () => {
  a.value = 1

  expect(sum.value).toBe(4)

  a.value = 4

  expect(sum.value).toBe(7)

  a.value -= 2

  expect(sum.value).toBe(5)
})
