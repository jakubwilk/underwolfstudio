import { ReactElement } from 'react'
import logo from '@app-assets/underwolf-stuido-logo-dark.svg'
import clsx from 'clsx'

interface IProps {
  name: ReactElement
  height?: number
  width?: number
  alt?: string
}

function Logo({ name, height, width = 50, alt }: IProps) {
  return (
    <div className={clsx('flex items-center')}>
      <img src={logo} height={height} width={width} alt={alt} />
      {name}
    </div>
  )
}

export default Logo
