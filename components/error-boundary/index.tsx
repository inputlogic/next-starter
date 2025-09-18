import React, { Component, ErrorInfo, ReactNode } from 'react'
import { Button } from 'components/button'
import { classnames } from 'util/classnames'

import styles from './error-boundary.module.scss'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)

    this.state = { hasError: false }
  }

  static getDerivedStateFromError(_error: Error): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log({ error, errorInfo })
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className={styles.wrapper}>
          <div className={classnames(['container'])}>
            <h2 className={styles.title}>Oops, there was an error!</h2>
            <p className={styles.caption}>
              Check the console for more information.
              <br />
              If you would like to report this error, please visit the support
              page. If you are able, copy the error message in the console /
              take a screenshot / describe the issue in detail so we can fix it
              as soon as possible.
            </p>
            <div className={styles.actions}>
              <Button
                type="button"
                onClick={() => this.setState({ hasError: false })}
                className={styles.button}
              >
                Try again?
              </Button>
              <Button
                className={styles.button}
                variation="secondary"
                href="/contact"
              >
                Support page
              </Button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
