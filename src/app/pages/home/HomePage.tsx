import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'
import { Home } from '@home'

function HomePage() {
  return (
    <Fragment>
      <Helmet>
        <title>{'Underwolf Studio - Strona główna'}</title>
        <link rel={'canonical'} href={'https://www.underwolfstudio.com/'} />
      </Helmet>
      <Home />
    </Fragment>
  )
}

export default HomePage
