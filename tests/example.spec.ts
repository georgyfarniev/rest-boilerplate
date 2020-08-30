import 'jest'
import axios from 'axios'
import { startServer } from '../src/index'

// TODO: get port automatically
const TEST_PORT = 10101

const api = axios.create({
  baseURL: `http://localhost:${TEST_PORT}/api/routes`
})

describe('rest api test example', () => {
  let stopServer: any
  let db: any

  beforeAll(async () => {
    const ret = await startServer({ dbUrl: process.env.MONGO_URL, port: TEST_PORT })
    db = ret.db
    stopServer = ret.stopServer
  })

  afterAll(async () => stopServer)

  test('list pets when empty', async () => {
    await expect(api.get('pets')).resolves.toHaveProperty('data', [])
  })
})
