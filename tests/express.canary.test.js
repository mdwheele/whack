/**
 * @jest-environment ./tests/ExpressEnvironment
 */

const axios = require('axios').default

test('can retrieve the OpenAPI specification', async () => {
  const response = await axios.get(`${global.address}/api/openapi.yaml`)

  expect(response.data).toContain('title: Whack')
})