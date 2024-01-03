import { defineChain } from '../../../utils/chain/defineChain.js'

export const skaleCryptoColosseum = /*#__PURE__*/ defineChain({
  id: 2_046_399_126,
  name: 'SKALE | Crypto Colosseum',
  nativeCurrency: { name: 'sFUEL', symbol: 'sFUEL', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://mainnet.skalenodes.com/v1/haunting-devoted-deneb'],
      webSocket: ['wss://mainnet.skalenodes.com/v1/ws/haunting-devoted-deneb'],
    },
  },
  blockExplorers: {
    default: {
      name: 'SKALE Explorer',
      url: 'https://haunting-devoted-deneb.explorer.mainnet.skalenodes.com',
    },
  },
  contracts: {},
})
