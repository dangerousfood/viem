import { beforeAll, expect, test, vi } from 'vitest'
import { publicClient, setBlockNumber } from '../../../../test/src/utils.js'
import { optimism } from '../chains.js'
import { getTimeToNextL2Output } from './getTimeToNextL2Output.js'

beforeAll(async () => {
  await setBlockNumber(18772363n)
})

test('default', async () => {
  const { interval, seconds, timestamp } = await getTimeToNextL2Output(
    publicClient,
    {
      l2BlockNumber: 113405763n,
      targetChain: optimism,
    },
  )
  expect(interval).toBe(3600)
  expect(seconds).toBeDefined()
  expect(timestamp).toBeDefined()
})

test('Date.now < latestOutputTimestamp', async () => {
  vi.setSystemTime(new Date(1702399191000))
  const { seconds, timestamp } = await getTimeToNextL2Output(publicClient, {
    l2BlockNumber: 113405763n,
    targetChain: optimism,
  })
  vi.useRealTimers()
  expect(seconds).toBe(0)
  expect(timestamp).toBe(undefined)
})

test('elapsedBlocks > blockInterval (w/ l2BlockNumber)', async () => {
  vi.setSystemTime(new Date(1702412427000))
  const { seconds, timestamp } = await getTimeToNextL2Output(publicClient, {
    l2BlockNumber: 113409263n,
    targetChain: optimism,
  })
  vi.useRealTimers()
  expect(seconds).toBe(9983)
  expect(timestamp).toBe(1702422410000)
})

test('l2BlockNumber < latestOutput.blockNumber (no l2BlockNumber)', async () => {
  vi.setSystemTime(new Date(1702412427000))
  const { seconds, timestamp } = await getTimeToNextL2Output(publicClient, {
    l2BlockNumber: 113400763n,
    targetChain: optimism,
  })
  vi.useRealTimers()
  expect(seconds).toBe(0)
  expect(timestamp).toBe(undefined)
})

test('args: chain', async () => {
  const { seconds, timestamp } = await getTimeToNextL2Output(publicClient, {
    l2BlockNumber: 113405763n,
    chain: null,
    targetChain: optimism,
  })
  expect(seconds).toBeDefined()
  expect(timestamp).toBeDefined()
})

test('args: l2OutputOracleAddress', async () => {
  const { seconds, timestamp } = await getTimeToNextL2Output(publicClient, {
    l2BlockNumber: 113405763n,
    l2OutputOracleAddress: '0xdfe97868233d1aa22e815a266982f2cf17685a27',
  })
  expect(seconds).toBeDefined()
  expect(timestamp).toBeDefined()
})
