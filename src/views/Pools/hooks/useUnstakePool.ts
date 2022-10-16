import { useCallback } from 'react'
import { parseUnits } from '@ethersproject/units'
import { useSousChef } from 'hooks/useContract'
import { useGasPrice } from 'state/user/hooks'
import { getFirstThreeNonZeroDecimals } from 'utils/formatInfoNumbers'

const sousUnstake = (sousChefContract: any, amount: string, decimals: number, gasPrice: string) => {
  const units = parseUnits(amount, decimals)
  console.log('unstake', amount, decimals, gasPrice)

  return sousChefContract.withdraw(units.toString(), {
    gasPrice,
  })
}

const sousEmergencyUnstake = (sousChefContract: any, gasPrice: string) => {
  return sousChefContract.emergencyWithdraw({ gasPrice })
}

const useUnstakePool = (sousId: number, enableEmergencyWithdraw = false) => {
  const sousChefContract = useSousChef(sousId)
  const gasPrice = useGasPrice()

  const handleUnstake = useCallback(
    async (amount: string, decimals: number) => {
      if (enableEmergencyWithdraw) {
        return sousEmergencyUnstake(sousChefContract, gasPrice)
      }

      return sousUnstake(sousChefContract, amount, decimals, gasPrice)
    },
    [enableEmergencyWithdraw, sousChefContract, gasPrice],
  )

  return { onUnstake: handleUnstake }
}

export default useUnstakePool
