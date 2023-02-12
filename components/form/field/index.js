import PropTypes from 'prop-types'
import { mergeStyles } from 'util/mergeStyles'
import defaultStyles from './field.module.scss'

/**
 * A wrapper for form inputs that adds common functionality:
 * - a label
 * - an error if applicable
 * - a hint
 */
export const Field = ({ label, error, hint, htmlFor, children, styles }) => {
  styles = mergeStyles(defaultStyles, styles)
  return (
    <div className={styles.field}>
      <div className={styles.top}>
        <label htmlFor={htmlFor} className={styles.label}>
          {label}
        </label>
      </div>
      <div className={styles.children}>{children}</div>
      <div className={styles.bottom}>
        {error && <div className={styles.error}>{error}</div>}
        {hint && !error && <div className={styles.hint}>{hint}</div>}
      </div>
    </div>
  )
}

Field.propTypes = {
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  hint: PropTypes.string,
  htmlFor: PropTypes.string,
  children: PropTypes.any,
  styles: PropTypes.shape({
    field: PropTypes.string,
    label: PropTypes.string,
    children: PropTypes.string,
    error: PropTypes.string,
    hint: PropTypes.string,
  }),
}
