import { HomeLayout } from '@app-layouts'
import { createStyles } from '@mantine/core'

import HomeLink from './HomeLink'

const useStyles = createStyles((theme) => ({
  webDevLink: {
    overflow: 'hidden',
    justifyContent: 'end',

    '& > div': {
      textAlign: 'right',
    },
  },
  gameDevLink: {
    overflow: 'hidden',
    justifyContent: 'start',

    '& > div': {
      textAlign: 'left',
    },
  },
}))

function Home() {
  const { classes } = useStyles()

  return (
    <HomeLayout>
      <HomeLink
        title={'Web Dev'}
        description={'Aplikacje internetowe i wszelkiego rodzaju szeroko rozumiany Front-End'}
        styles={classes.webDevLink}
        isExternalUrl
      />
      <HomeLink
        title={'Game Dev'}
        description={'Gry z wciągającą historią, ciekawymi postaciami i przeróżnymi typami'}
        styles={classes.gameDevLink}
      />
    </HomeLayout>
  )
}

export default Home
