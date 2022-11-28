import { ReactNode, useMemo } from 'react'
import { Logo } from '@home'
import { createStyles, Text } from '@mantine/core'
import clsx from 'clsx'

interface IProps {
  children: ReactNode | ReactNode[]
}

const useStyles = createStyles(() => ({
  logo: {
    cursor: 'default',
    userSelect: 'none',

    '& > span': {
      fontWeight: 'bold',
    },
  },
}))

function HomeLayout({ children }: IProps) {
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
    <div className={clsx('min-h-screen h-full sm:min-h-full sm:h-screen', 'relative')}>
      <header className={clsx('h-[80px] md:h-[100px] w-full', 'flex justify-center', 'absolute')}>
        <Logo name={siteName} />
      </header>
      <main className={clsx('grid grid-cols-2', 'h-full')}>{children}</main>
    </div>
  )
}

export default HomeLayout
