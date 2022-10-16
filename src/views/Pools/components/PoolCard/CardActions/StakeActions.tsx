import { Flex, Text, Button, IconButton, AddIcon, MinusIcon, useModal, Skeleton, useTooltip } from '@pancakeswap/uikit'
import BigNumber from 'bignumber.js'
import { useTranslation } from '@pancakeswap/localization'
import { getBalanceNumber } from 'utils/formatBalance'
import { DeserializedPool } from 'state/types'
import Balance from 'components/Balance'
import NotEnoughTokensModal from '../../Modals/NotEnoughTokensModal'
import StakeModal from '../../Modals/StakeModal'
import {useSousChef} from "hooks/useContract"
import { useGasPrice } from 'state/user/hooks'
import { useWeb3React } from '@pancakeswap/wagmi'
import { useToast } from '@pancakeswap/uikit'
import { ToastDescriptionWithTx } from 'components/Toast'

interface StakeActionsProps {
  pool: DeserializedPool
  stakingTokenBalance: BigNumber
  stakedBalance: BigNumber
  isBnbPool: boolean
  isStaked: ConstrainBoolean
  isLoading?: boolean
}

const StakeAction: React.FC<React.PropsWithChildren<StakeActionsProps>> = ({
  pool,
  stakingTokenBalance,
  stakedBalance,
  isBnbPool,
  isStaked,
  isLoading = false,
}) => {
  const { account } = useWeb3React()
  const {sousId} = pool;
  const sousChefContract = useSousChef(sousId)
  const { stakingToken, stakingTokenPrice, stakingLimit, isFinished, userData } = pool
  const { t } = useTranslation()
  const stakedTokenBalance = getBalanceNumber(stakedBalance, stakingToken.decimals)
  const stakedTokenDollarBalance = getBalanceNumber(
    stakedBalance.multipliedBy(stakingTokenPrice),
    stakingToken.decimals,
  )

  const { toastWarning} = useToast()
  const [onPresentTokenRequired] = useModal(<NotEnoughTokensModal tokenSymbol={stakingToken.symbol} />)

  const [onPresentStake] = useModal(
    <StakeModal
      isBnbPool={isBnbPool}
      pool={pool}
      stakingTokenBalance={stakingTokenBalance}
      stakingTokenPrice={stakingTokenPrice}
    />,
  )

  const [onPresentUnstake] = useModal(
    <StakeModal
      stakingTokenBalance={stakingTokenBalance}
      isBnbPool={isBnbPool}
      pool={pool}
      stakingTokenPrice={stakingTokenPrice}
      isRemovingStake
    />,
  )

  const onPressUnstake = async () => {
    const result = await sousChefContract.isUnderLock(account)
    console.log("isunderLock : ", result);
    if(result === true) {
      toastWarning(
        t('Warning'),        
        t('You are under lock period and 10 % of your withdraw will be cut!')
        ,
      )
    }
    onPresentUnstake()
  }

  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    t('You’ve already staked the maximum amount you can stake in this pool!'),
    { placement: 'bottom' },
  )

  const reachStakingLimit = stakingLimit.gt(0) && userData.stakedBalance.gte(stakingLimit)

  const renderStakeAction = () => {
    return isStaked ? (
      <Flex justifyContent="space-between" alignItems="center">
        <Flex flexDirection="column">
          <>
            <Balance bold fontSize="20px" decimals={3} value={stakedTokenBalance} />
            {stakingTokenPrice !== 0 && (
              <Text fontSize="12px" color="textSubtle">
                <Balance
                  fontSize="12px"
                  color="textSubtle"
                  decimals={2}
                  value={stakedTokenDollarBalance}
                  prefix="~"
                  unit=" USD"
                />
              </Text>
            )}
          </>
        </Flex>
        <Flex>
          <IconButton variant="secondary" onClick={onPressUnstake} mr="6px">
            <MinusIcon color="primary" width="24px" />
          </IconButton>
          {reachStakingLimit ? (
            <span ref={targetRef}>
              <IconButton variant="secondary" disabled>
                <AddIcon color="textDisabled" width="24px" height="24px" />
              </IconButton>
            </span>
          ) : (
            <IconButton
              variant="secondary"
              onClick={stakingTokenBalance.gt(0) ? onPresentStake : onPresentTokenRequired}
              disabled={isFinished}
            >
              <AddIcon color="primary" width="24px" height="24px" />
            </IconButton>
          )}
        </Flex>
        {tooltipVisible && tooltip}
      </Flex>
    ) : (
      <Button disabled={isFinished} onClick={stakingTokenBalance.gt(0) ? onPresentStake : onPresentTokenRequired}>
        {t('Stake')}
      </Button>
    )
  }

  return <Flex flexDirection="column">{isLoading ? <Skeleton width="100%" height="52px" /> : renderStakeAction()}</Flex>
}

export default StakeAction
