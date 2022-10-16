import { Flex, TooltipText, useTooltip } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import { DeserializedPool } from 'state/types'
import BigNumber from 'bignumber.js'
import Apr from 'views/Pools/components/Apr'

interface AprRowProps {
  pool: DeserializedPool
  stakedBalance: BigNumber
  performanceFee?: number
  showIcon?: boolean
}

const AprRow: React.FC<React.PropsWithChildren<AprRowProps>> = ({
  pool,
  stakedBalance,
  performanceFee = 0,
  showIcon = true,
}) => {
  const { t } = useTranslation()
  const { vaultKey } = pool
  console.log('poold', pool)
  // const tooltipContent = vaultKey
  //   ? t('APY includes compounding, APR doesn’t. This pool’s CAKE is compounded automatically, so we show APY.')
  //   : t('This pool’s rewards aren’t compounded automatically, so we show APR')
  const tooltipContent = vaultKey ? t('') : t('')

  const { targetRef, tooltip, tooltipVisible } = useTooltip(tooltipContent, { placement: 'bottom-start' })

  return (
    <>
      <Flex alignItems="center" justifyContent="space-between">
        {tooltipVisible && tooltip}
        <TooltipText ref={targetRef}>{vaultKey ? `${t('APY')}:` : `${t('APR')}:`}</TooltipText>
        <Apr pool={pool} stakedBalance={stakedBalance} performanceFee={performanceFee} showIcon={showIcon} />
      </Flex>
      <Flex alignItems="center" justifyContent="space-between">
        {tooltipVisible && tooltip}
        <TooltipText ref={targetRef}>{vaultKey ? `${t('LOCK PERIOD')}:` : `${t('LOCK PERIOD')}:`}</TooltipText>
        {/* <Apr pool={pool} stakedBalance={stakedBalance} performanceFee={performanceFee} showIcon={showIcon} /> */}
        <TooltipText ref={targetRef}>{vaultKey ? `${pool.lockDays}` : `${pool.lockDays} Days`}</TooltipText>
      </Flex>
    </>
  )
}

export default AprRow
