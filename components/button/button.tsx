import { forwardRef, ReactNode } from 'react'
import Link from 'next/link'
import { Icon } from 'components/icon'
import { InlineLoader } from 'components/loading'
import { classnames } from 'util/classnames'

import styles from './button.module.scss'

type ButtonVariation = 'primary' | 'secondary' | 'outline' | 'text' | 'icon'
type ButtonSize = 'small' | 'medium'
type ButtonType = 'button' | 'submit' | 'reset'
type ButtonTarget = '_self' | '_blank'
type IconPosition = 'left' | 'right'
type IconVariation = 'filled' | 'stroked'

type CommonButtonProps = {
  variation?: ButtonVariation
  size?: ButtonSize
  children?: ReactNode
  icon?: string
  iconPosition?: IconPosition
  iconVariation?: IconVariation
  iconColor?: string
  isLoading?: boolean
  loadingText?: string
  hideText?: boolean
  fullWidth?: boolean
  className?: string
}

type ButtonAsButton = CommonButtonProps & {
  href?: never
  target?: never
  type?: ButtonType
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonButtonProps | 'type'>

type ButtonAsLink = CommonButtonProps & {
  href: string
  target?: ButtonTarget
  type?: never
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonButtonProps | 'href' | 'target'>

export type ButtonProps = ButtonAsButton | ButtonAsLink

interface InnerMarkupProps {
  text?: ReactNode
  isLoading?: boolean
  loadingText?: string
  icon?: string
  iconPosition?: IconPosition
  iconComponent?: React.ReactElement | null
  hideText?: boolean
  children?: ReactNode
}

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (props, ref) => {
    const {
      variation = 'primary',
      size = 'medium',
      children,
      icon,
      iconPosition = 'right',
      iconVariation = 'stroked',
      iconColor,
      isLoading,
      loadingText = 'Loading...',
      className,
      hideText,
      fullWidth = false,
      ...restProps
    } = props

    const href = 'href' in props ? props.href : undefined
    const target = 'target' in props ? props.target : '_self'
    const type = 'type' in props ? props.type : 'button'
    const iconComponent = icon ? (
      <Icon
        name={isLoading ? 'loading' : icon}
        variation={isLoading ? 'stroked' : iconVariation}
        color={iconColor}
        className={classnames(
          styles['btn-icon'],
          styles[`btn-icon-${iconPosition === 'left' ? 'left' : 'right'}`]
        )}
      />
    ) : null

    const classes = classnames([
      styles.btn,
      icon ? styles['btn-has-icon'] : null,
      styles[`btn-${variation}`],
      styles[`btn-${size}`],
      styles[`btn-${href ? 'link' : 'button'}`],
      fullWidth ? styles['btn-full-width'] : null,
      isLoading ? styles['is-loading'] : null,
      className,
    ])

    if (href) {
      return (
        <Link
          href={href}
          className={classes}
          target={target}
          ref={ref as React.Ref<HTMLAnchorElement>}
          {...(restProps as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          <InnerMarkup
            text={children}
            hideText={hideText}
            isLoading={isLoading}
            loadingText={loadingText}
            icon={icon}
            iconPosition={iconPosition}
            iconComponent={iconComponent}
          />
        </Link>
      )
    }

    return (
      <button
        type={type as ButtonType}
        className={classes}
        ref={ref as React.Ref<HTMLButtonElement>}
        {...(restProps as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        <InnerMarkup
          text={children}
          hideText={hideText}
          isLoading={isLoading}
          loadingText={loadingText}
          icon={icon}
          iconPosition={iconPosition}
          iconComponent={iconComponent}
        />
      </button>
    )
  }
)

const InnerMarkup: React.FC<InnerMarkupProps> = ({
  text,
  isLoading,
  loadingText,
  icon,
  iconPosition,
  iconComponent,
  hideText,
  children,
}) => (
  <span
    className={classnames([
      styles['btn-wrap'],
      hideText ? styles['hidden-text'] : null,
    ])}
  >
    {icon && iconPosition === 'left' && iconComponent}
    {text && (
      <span
        className={classnames([
          styles['btn-text'],
          hideText ? 'visually-hidden' : null,
        ])}
      >
        {isLoading ? loadingText : text}
        {isLoading && <InlineLoader className={styles['button-loading']} />}
      </span>
    )}
    {icon && iconPosition === 'right' && iconComponent}
    {children}
  </span>
)

Button.displayName = 'Button'