import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'
import { HomeLayout } from '@app-layouts'

function HomePage() {
  return (
    <Fragment>
      <Helmet>
        <title>{'Underwolf Studio - Strona główna'}</title>
        {/*<link rel={'canonical'} href={'https://www.tacobell.com/'} />*/}
      </Helmet>
      <HomeLayout>
        <div>{'homePage 1'}</div>
        <div>{'homePage 2'}</div>
      </HomeLayout>
    </Fragment>
  )
}

export default HomePage
