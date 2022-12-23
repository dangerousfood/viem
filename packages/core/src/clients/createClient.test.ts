import { assertType, describe, expect, test, vi } from 'vitest'

import {
  createTransport,
  ethereumProvider,
  http,
  webSocket,
} from './transports'
import { localhost } from '../chains'
import type { Requests } from '../types/eip1193'

import { createClient } from './createClient'
import { localWsUrl } from '../../test/utils'

test('creates', () => {
  const mockTransport = () =>
    createTransport({
      key: 'mock',
      name: 'Mock Transport',
      request: vi.fn(async () => null) as unknown as Requests['request'],
      type: 'mock',
    })
  const { uid, ...client } = createClient({
    transport: mockTransport,
  })

  assertType<Requests['request']>(client.request)

  expect(uid).toBeDefined()
  expect(client).toMatchInlineSnapshot(`
    {
      "chain": undefined,
      "key": "base",
      "name": "Base Client",
      "pollingInterval": 4000,
      "request": [Function],
      "transport": {
        "key": "mock",
        "name": "Mock Transport",
        "request": [MockFunction spy],
        "type": "mock",
      },
      "type": "base",
    }
  `)
})

describe('transports', () => {
  test('http', () => {
    const { uid, ...client } = createClient({
      chain: localhost,
      transport: http(),
    })

    expect(uid).toBeDefined()
    expect(client).toMatchInlineSnapshot(`
      {
        "chain": {
          "id": 1337,
          "name": "Localhost",
          "nativeCurrency": {
            "decimals": 18,
            "name": "Ether",
            "symbol": "ETH",
          },
          "network": "localhost",
          "rpcUrls": {
            "default": {
              "http": [
                "http://127.0.0.1:8545",
              ],
            },
          },
        },
        "key": "base",
        "name": "Base Client",
        "pollingInterval": 4000,
        "request": [Function],
        "transport": {
          "key": "http",
          "name": "HTTP JSON-RPC",
          "request": [Function],
          "type": "http",
          "url": undefined,
        },
        "type": "base",
      }
    `)
  })

  test('webSocket', () => {
    const { uid, ...client } = createClient({
      chain: localhost,
      transport: webSocket({ url: localWsUrl }),
    })

    expect(uid).toBeDefined()
    expect(client).toMatchInlineSnapshot(`
      {
        "chain": {
          "id": 1337,
          "name": "Localhost",
          "nativeCurrency": {
            "decimals": 18,
            "name": "Ether",
            "symbol": "ETH",
          },
          "network": "localhost",
          "rpcUrls": {
            "default": {
              "http": [
                "http://127.0.0.1:8545",
              ],
            },
          },
        },
        "key": "base",
        "name": "Base Client",
        "pollingInterval": 4000,
        "request": [Function],
        "transport": {
          "getSocket": [Function],
          "key": "webSocket",
          "name": "WebSocket JSON-RPC",
          "request": [Function],
          "subscribe": [Function],
          "type": "webSocket",
        },
        "type": "base",
      }
    `)
  })

  test('ethereumProvider', () => {
    const { uid, ...client } = createClient({
      transport: ethereumProvider({ provider: { request: async () => null } }),
    })

    expect(uid).toBeDefined()
    expect(client).toMatchInlineSnapshot(`
      {
        "chain": undefined,
        "key": "base",
        "name": "Base Client",
        "pollingInterval": 4000,
        "request": [Function],
        "transport": {
          "key": "ethereumProvider",
          "name": "Ethereum Provider",
          "request": [Function],
          "type": "ethereumProvider",
        },
        "type": "base",
      }
    `)
  })
})

describe('config', () => {
  test('key', () => {
    const mockTransport = () =>
      createTransport({
        key: 'mock',
        name: 'Mock Transport',
        request: vi.fn(async () => null) as unknown as Requests['request'],
        type: 'mock',
      })
    const { uid, ...client } = createClient({
      key: 'bar',
      transport: mockTransport,
    })

    assertType<Requests['request']>(client.request)
    expect(uid).toBeDefined()
    expect(client).toMatchInlineSnapshot(`
      {
        "chain": undefined,
        "key": "bar",
        "name": "Base Client",
        "pollingInterval": 4000,
        "request": [Function],
        "transport": {
          "key": "mock",
          "name": "Mock Transport",
          "request": [MockFunction spy],
          "type": "mock",
        },
        "type": "base",
      }
    `)
  })

  test('name', () => {
    const mockTransport = () =>
      createTransport({
        key: 'mock',
        name: 'Mock Transport',
        request: vi.fn(async () => null) as unknown as Requests['request'],
        type: 'mock',
      })
    const { uid, ...client } = createClient({
      name: 'Mock Client',
      transport: mockTransport,
    })

    assertType<Requests['request']>(client.request)
    expect(uid).toBeDefined()
    expect(client).toMatchInlineSnapshot(`
      {
        "chain": undefined,
        "key": "base",
        "name": "Mock Client",
        "pollingInterval": 4000,
        "request": [Function],
        "transport": {
          "key": "mock",
          "name": "Mock Transport",
          "request": [MockFunction spy],
          "type": "mock",
        },
        "type": "base",
      }
    `)
  })

  test('pollingInterval', () => {
    const mockTransport = () =>
      createTransport({
        key: 'mock',
        name: 'Mock Transport',
        request: vi.fn(async () => null) as unknown as Requests['request'],
        type: 'mock',
      })
    const { uid, ...client } = createClient({
      pollingInterval: 10_000,
      transport: mockTransport,
    })

    assertType<Requests['request']>(client.request)
    expect(uid).toBeDefined()
    expect(client).toMatchInlineSnapshot(`
      {
        "chain": undefined,
        "key": "base",
        "name": "Base Client",
        "pollingInterval": 10000,
        "request": [Function],
        "transport": {
          "key": "mock",
          "name": "Mock Transport",
          "request": [MockFunction spy],
          "type": "mock",
        },
        "type": "base",
      }
    `)
  })

  test('type', () => {
    const mockTransport = () =>
      createTransport({
        key: 'mock',
        name: 'Mock Transport',
        request: vi.fn(async () => null) as unknown as Requests['request'],
        type: 'mock',
      })
    const { uid, ...client } = createClient({
      transport: mockTransport,
      type: 'foo',
    })

    assertType<Requests['request']>(client.request)
    expect(uid).toBeDefined()
    expect(client).toMatchInlineSnapshot(`
      {
        "chain": undefined,
        "key": "base",
        "name": "Base Client",
        "pollingInterval": 4000,
        "request": [Function],
        "transport": {
          "key": "mock",
          "name": "Mock Transport",
          "request": [MockFunction spy],
          "type": "mock",
        },
        "type": "foo",
      }
    `)
  })
})