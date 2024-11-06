import React, { forwardRef } from 'react'
import * as ToolTip from '@radix-ui/react-tooltip'

import styles from './tooltip.module.scss'

/**
 * Tooltip component.
 *
 * @component
 *
 * @param {ReactNode} children - The content to render inside the button.
 * @param {string} label - The text to display inside the tooltip.
 * @param {string} position - The position relative to the button, adjusting automatically if space is limited. Can be: top, bottom, left, right. Defaults to 'top'.
 * @param {integer} offset - The distance between the tooltip and its trigger (in pixels) along the specified position side. Defaults to 5.
 *
 * @example
 * <Tooltip label='Open Link' position='bottom' offset=10>
 *    <Button> Click Here </Button>
 * </Tooltip>   
 */
export const Tooltip = forwardRef(({ children, label, position, offset = 5 }, ref) => {
  return (
    <ToolTip.Provider>
      <ToolTip.Root>
        <ToolTip.Trigger asChild ref={ref}>
          {children}
        </ToolTip.Trigger>
        <ToolTip.Portal>
          <ToolTip.Content
            className={styles['tooltip-content']}
            side={position}
            sideOffset={offset}
          >
            {label}
            <ToolTip.Arrow className={styles['tooltip-arow']} />
          </ToolTip.Content>
        </ToolTip.Portal>
      </ToolTip.Root>
    </ToolTip.Provider>
  )
})
