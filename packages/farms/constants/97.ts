import { bscTestnetTokens } from '@pancakeswap/tokens'
import { SerializedFarmConfig } from '@pancakeswap/farms'

const farms: SerializedFarmConfig[] = [
  /**
   * These 3 farms (PID 0, 2, 3) should always be at the top of the file.
   */
  // {
  //   pid: 0,
  //   lpSymbol: 'CAKE',
  //   lpAddress: '0x36e3E4fF6471559b19F66bD10985534d5e214D44',
  //   token: bscTestnetTokens.syrup,
  //   quoteToken: bscTestnetTokens.wbnb,
  // },
  // {
  //   pid: 0,
  //   lpSymbol: 'BUSD-CAKE LP',
  //   lpAddress: '0xb98C30fA9f5e9cf6749B7021b4DDc0DBFe73b73e',
  //   token: bscTestnetTokens.busd,
  //   quoteToken: bscTestnetTokens.cake,
  // },
  {
    pid: 0,
    lpSymbol: 'GLAND-BNB LP',
    lpAddress: '0x3c3ee1BEA968D968324DF026b5b3582248d8aFe2',
    token: bscTestnetTokens.gland,
    quoteToken: bscTestnetTokens.wbnb,
  },
  {
    pid: 1,
    lpSymbol: 'GART-BNB LP',
    lpAddress: '0xE8851cf6894a10A28579FfC05bF7A8F0a1dc2fa9',
    token: bscTestnetTokens.gart,
    quoteToken: bscTestnetTokens.wbnb,
  },
  // {
  //   pid: 300,
  //   lpSymbol: 'BUSD-BNB LP',
  //   lpAddress: '0x4E96D2e92680Ca65D58A0e2eB5bd1c0f44cAB897',
  //   token: bscTestnetTokens.wbnb,
  //   quoteToken: bscTestnetTokens.busd,
  // },
  // {
  //   pid: 9,
  //   lpSymbol: 'USDC-BUSD LP',
  //   lpAddress: '0xd1742b5eC6798cEB8C791e0ebbEf606A4946f67E',
  //   token: bscTestnetTokens.usdc, // coins[0]
  //   quoteToken: bscTestnetTokens.busd, // coins[1]
  //   stableSwapAddress: '0x1288026D2c5a76A5bfb0730F615131A448f4Ad06',
  //   infoStableSwapAddress: '0xaE6C14AAA753B3FCaB96149e1E10Bc4EDF39F546',
  // },
].map((p) => ({ ...p, token: p.token.serialize, quoteToken: p.quoteToken.serialize }))

export default farms
