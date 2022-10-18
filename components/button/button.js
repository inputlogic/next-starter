import Link from 'next/link'
import { useRouter } from 'next/router'
import { Icon } from '../icon'
import { classnames } from 'util/classnames'

export const Button = ({
  href,
  target = '_self',
  variation = 'primary',
  size = 'medium',
  text,
  children,
  icon,
  type = 'button',
  iconPosition = 'right',
  iconFill = 'stroked',
  className,
  ...props
}) => {
  const iconComponent = icon ? (
    <Icon
      name={icon}
      variation={iconFill}
      className={`btn-icon btn-icon-${
        iconPosition == 'left' ? 'left' : 'right'
      }`}
    />
  ) : null

  const classes = classnames([
    'btn',
    `btn-${variation}`,
    `btn-${size}`,
    `btn-${href ? 'link' : 'button'}`,
    className,
    icon ? 'btn-icon' : null,
    small ? 'btn-small' : null,
    wide ? 'btn-wide' : null,
  ])

  const InnerMarkup = () => {
    return (
      <span className="btn-wrap">
        {icon && iconPosition == 'left' && iconComponent}
        {text && <span className="btn-text">{text}</span>}
        {icon && iconPosition == 'right' && iconComponent}
        {children}
      </span>
    )
  }

  return href ? (
    <LinkButton
      href={href}
      target={target}
      InnerMarkup={InnerMarkup}
      className={classes}
      {...props}
    />
  ) : (
    <StandardButton
      InnerMarkup={InnerMarkup}
      className={classes}
      type={type}
      {...props}
    />
  )
}

const LinkButton = ({ href, target, className, InnerMarkup, ...props }) => {
  const router = useRouter()
  const isOffsite =
    href.includes('http') &&
    !href.includes(
      process.env.NEXT_PUBLIC_VERCEL_ENV === 'development'
        ? 'localhost:3000'
        : process.env.NEXT_PUBLIC_VERCEL_URL
    )

  return isOffsite ? (
    <a
      href={href}
      className={className}
      target="_blank"
      rel="noreferrer nofollow"
      {...props}
    >
      <InnerMarkup />
    </a>
  ) : (
    <Link href={href}>
      <a className={className} target={target} {...props}>
        <InnerMarkup />
      </a>
    </Link>
  )
}

const StandardButton = ({ className, InnerMarkup, type, ...props }) => {
  return (
    <button type={type} className={className} {...props}>
      <InnerMarkup />
    </button>
  )
}
