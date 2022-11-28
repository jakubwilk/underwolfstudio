import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'

interface IProps {
  title: string
  description: string
  pathTo?: string
  styles?: string
  isExternalUrl?: boolean
}

function HomeLink({ title, description, pathTo = 'https://www.jakubwilk.pl', styles, isExternalUrl }: IProps) {
  const linkBody = useMemo(
    () => (
      <div className={clsx('w-max max-w-[80%] md:max-w-[50%]', 'mx-8', 'px-8 py-4')}>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    ),
    [description, title]
  )

  if (isExternalUrl) {
    return (
      <a className={clsx('flex items-center', 'relative', styles)} href={pathTo} title={title} rel={'noreferrer'}>
        {linkBody}
      </a>
    )
  }

  return (
    <Link className={clsx('flex items-center', 'relative', styles)} to={pathTo} title={title}>
      {linkBody}
    </Link>
  )
}

export default HomeLink
