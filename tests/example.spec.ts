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

  // Deleting all stuff to prevent side effects
  afterEach(async () => db.Pet.deleteMany({}))

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

  test('test creating pet via api positive', async () => {
    await expect(api.get('pets')).resolves.toHaveProperty('data', [])

    await expect(
      api.post('pets', {
        name: 'Chico',
        type: db.PetType.Dog
      })
    ).resolves.toHaveProperty('status', 200)

    const { data } = await api.get('pets')
    expect(data).toHaveLength(1)
  })

  test('test creating pet via api negative (missing parameter)', async () => {
    await expect(api.get('pets')).resolves.toHaveProperty('data', [])

    await expect(
      api.post('pets', { name: 'Chico' })
    ).rejects.toHaveProperty('response.status', 400)
  })
})
