import { ReactElement } from 'react'
import logo from '@app-assets/underwolf-stuido-logo-dark.svg'
import { createStyles } from '@mantine/core'
import clsx from 'clsx'

interface IProps {
  name: ReactElement
  height?: number
  width?: number
  alt?: string
}

const useStyles = createStyles((theme) => ({
  logoWrapper: {
    backgroundColor: 'white',
  },
}))

function Logo({ name, height, width = 50, alt }: IProps) {
  const { classes } = useStyles()

  return (
    <div className={clsx('flex items-center', 'px-10', 'rounded-b', classes.logoWrapper)}>
      <img src={logo} height={height} width={width} alt={alt} />
      {name}
    </div>
  )
}

export default Logo
