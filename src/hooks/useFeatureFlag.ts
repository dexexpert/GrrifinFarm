import { FLAG_FARM } from 'config/flag'
import { Atom, useAtomValue } from 'jotai'
import { atomWithStorage, createJSONStorage } from 'jotai/utils'

const storage = typeof window !== 'undefined' ? createJSONStorage(() => sessionStorage) : null
export const featureFarmApiAtom = atomWithStorage<typeof FLAG_FARM>(
  'feature-farm-api',
  FLAG_FARM,
  // @ts-ignore
  {...storage, delayInit : true},
)

featureFarmApiAtom.onMount = (set) => {
  const params = new URL(window.location.href).searchParams
  const flag = params.get('use')
  if (flag === 'farmApi') {
    set('api')
  }
}

export function useFeatureFlag<T>(featureAtom: Atom<T>) {
  return useAtomValue(featureAtom)
}
