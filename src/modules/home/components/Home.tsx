import { useMemo } from 'react'
import { HomeLayout } from '@app-layouts'
import { createStyles, Text } from '@mantine/core'
import clsx from 'clsx'

import Logo from './Logo'

const useStyles = createStyles((theme) => ({
  logo: {
    cursor: 'default',
    userSelect: 'none',
    color: theme.black,
    fontWeight: 300,
    fontSize: '1.4rem',

    '& > span': {
      fontWeight: 600,
    },
  },
  text: {
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontWeight: 300,

    '&:first-of-type': {
      marginBottom: '1rem',

      [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
        marginRight: '1rem',
        marginBottom: 0,
      },
    },

    '&:last-of-type': {
      [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
        marginLeft: '1rem',
      },
    },
  },
}))

function Home() {
  const { classes } = useStyles()

  const siteName = useMemo(() => {
    return (
      <Text className={clsx('ml-4', classes.logo)}>
        {'under'}
        <span>{'wolf'}</span>
        {' studio'}
      </Text>
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <HomeLayout>
      <div className={'flex flex-col items-center'}>
        <Logo name={siteName} />
        <div className={'flex flex-col md:flex-row items-center mt-8 text-center'}>
          <Text className={classes.text}>{'Web Development'}</Text>
          <Text className={classes.text}>{'Game Development'}</Text>
        </div>
      </div>
    </HomeLayout>
  )
}

export default Home
