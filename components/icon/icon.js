import { classnames } from 'util/classnames'

export const Icon = ({
  variation = 'stroked',
  name,
  onClick,
  label,
  className,
  style,
}) => (
  <>
    <span
      onClick={onClick}
      className={classnames(['icon-wrap', className])}
      style={style}
    >
      <svg className={classnames(['icon', variation])}>
        <use xlinkHref={`#icon-${name}`}></use>
      </svg>
      <span className="icon-label">{label}</span>
    </span>
  </>
)
