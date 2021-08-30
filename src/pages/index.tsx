import {useCallback} from 'react'

import {HomePage, PageWrapper} from 'components'
import {getPageContent} from 'services'
import {useEffectAsync} from 'hooks'
import {Loader} from 'loaders'

export default function Index() {
  const fetchHomeContent = useCallback(() => getPageContent('/home'), [])
  const {data: homeContent} = useEffectAsync(fetchHomeContent, [fetchHomeContent])
  
  return (
    <PageWrapper pageTitle="andydierker.com">
      {homeContent ? <HomePage {...homeContent}/> : <Loader className="sq-24 m-auto"/>}
    </PageWrapper>
  )
}