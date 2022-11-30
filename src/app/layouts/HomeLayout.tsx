import { ReactNode, useMemo } from 'react'
import background from '@app-assets/background.jpg'
import { Logo } from '@home'
import { createStyles, Text } from '@mantine/core'
import clsx from 'clsx'

interface IProps {
  children: ReactNode | ReactNode[]
}

const useStyles = createStyles((theme) => ({
  page: {
    backgroundImage: `url(${background})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'repeat',

    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      backgroundColor: 'rgba(255,255,255, 0.97)',
      zIndex: 1,
    },
  },
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
    <div className={clsx('min-h-screen h-full sm:min-h-full sm:h-screen', 'relative', classes.page)}>
      <header className={clsx('h-[80px] md:h-[100px] w-full', 'flex justify-center', 'absolute', 'z-10')}>
        <Logo name={siteName} />
      </header>
      <main className={clsx('grid grid-cols-2', 'h-full')}>{children}</main>
    </div>
  )
}

export default HomeLayout
