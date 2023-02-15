import { ReactNode } from 'react'
import { createStyles } from '@mantine/core'
import clsx from 'clsx'

interface IProps {
  children: ReactNode | ReactNode[]
}

const useStyles = createStyles(() => ({
  page: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}))

function HomeLayout({ children }: IProps) {
  const { classes } = useStyles()

  return (
    <div className={clsx('min-h-screen h-full sm:min-h-full sm:h-screen', 'relative', classes.page)}>{children}</div>
  )
}

export default HomeLayout
