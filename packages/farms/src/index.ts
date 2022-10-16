import { formatEther, formatUnits } from '@ethersproject/units'
import { MultiCallV2 } from '@pancakeswap/multicall'
import { ChainId } from '@pancakeswap/sdk'
import { masterChefAddresses } from './const'
import type { FarmWithPrices } from './farmPrices'
import { farmV2FetchFarms, FetchFarmsParams, fetchMasterChefV2Data } from './fetchFarms'

const supportedChainId = [ChainId.GOERLI, ChainId.BSC, ChainId.BSC_TESTNET]
export const bCakeSupportedChainId = [ChainId.BSC, ChainId.BSC_TESTNET]

export function createFarmFetcher(multicallv2: MultiCallV2) {
  const fetchFarms = async (
    params: {
      isTestnet: boolean
    } & Pick<FetchFarmsParams, 'chainId' | 'farms'>,
  ) => {
    const { isTestnet, farms, chainId } = params
    const masterChefAddress = isTestnet ? masterChefAddresses[ChainId.BSC_TESTNET] : masterChefAddresses[ChainId.BSC]
    const { poolLength, totalRegularAllocPoint, cakePerBlock } = await fetchMasterChefV2Data({
      isTestnet,
      multicallv2,
      masterChefAddress,
    })
    console.log('dddddddd', poolLength.toNumber(), totalRegularAllocPoint.toNumber(), cakePerBlock.toNumber())
    const regularCakePerBlock = formatUnits(cakePerBlock, 9)
    console.log('ssss', regularCakePerBlock)
    console.log('aaa', multicallv2, masterChefAddress, isTestnet, chainId, farms, totalRegularAllocPoint)
    const farmsWithPrice = await farmV2FetchFarms({
      multicallv2,
      masterChefAddress,
      isTestnet,
      chainId,
      farms,
      totalRegularAllocPoint,
    })
    console.log('bbb', farmsWithPrice)

    return {
      farmsWithPrice,
      poolLength: poolLength.toNumber(),
      regularCakePerBlock: +regularCakePerBlock,
    }
  }
  return {
    fetchFarms,
    isChainSupported: (chainId: number) => supportedChainId.includes(chainId),
    supportedChainId,
    isTestnet: (chainId: number) => ![ChainId.BSC].includes(chainId),
  }
}

export * from './apr'
export * from './farmsPriceHelpers'
export * from './types'
export type { FarmWithPrices }
