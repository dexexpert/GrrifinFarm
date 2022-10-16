import { bscTestnetTokens } from '@pancakeswap/tokens'
import { SerializedFarmConfig } from '../../types'

const priceHelperLps: SerializedFarmConfig[] = [
  {
    pid: null,
    lpSymbol: 'GART-BNB LP',
    lpAddress: '0xE8851cf6894a10A28579FfC05bF7A8F0a1dc2fa9',
    token: bscTestnetTokens.gart,
    quoteToken: bscTestnetTokens.wbnb,
  },
].map((p) => ({ ...p, token: p.token.serialize, quoteToken: p.quoteToken.serialize }))

export default priceHelperLps
