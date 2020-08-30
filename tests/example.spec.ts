import 'jest'
import axios from 'axios'
import { startServer } from '../src/index'
import db from '../src/db'

// TODO: get port automatically
const TEST_PORT = 10101

const api = axios.create({
  baseURL: `http://localhost:${TEST_PORT}/api/routes`
})

describe('rest api test example', () => {
  let stopServer: () => void

  beforeAll(async () => {
    stopServer = await startServer({ dbUrl: process.env.MONGO_URL, port: TEST_PORT })
  })

  afterAll(async () => stopServer())

  test('list pets when empty', async () => {
    await expect(api.get('pets')).resolves.toHaveProperty('data', [])
  })

  test('test one pet exists', async () => {
    await db.Pet.create({ name: 'Manis', type: db.PetType.Cat })

    const { data } = await api.get('pets')

    expect(data).toHaveLength(1)
    expect(data[0]).toMatchSnapshot({
      _id: expect.any(String)
    })
  })
})
