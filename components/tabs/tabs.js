import { useState } from 'react'
import { classnames } from '@/util/classnames'
import { motion, AnimatePresence } from 'framer-motion'

import styles from './tabs.module.scss'

export const Tabs = ({ tabs }) => {
  const initialTab = tabs.findIndex((tab) => tab.initial)
  const initialTabIndex = initialTab > -1 ? initialTab : 0
  const [activeTab, setActiveTab] = useState(tabs[initialTabIndex])
  const TabContent = activeTab.content

  const tabAnimation = {
    initial: {
      opacity: 0,
      maxHeight: 0,
      transition: {
        duration: 0,
      },
    },
    animate: {
      opacity: 1,
      maxHeight: 9999,
      transition: {
        delay: 0.35,
        duration: 0.5,
      },
    },
  }

  return (
    <div className={styles.tabs}>
      <div className={styles['tabs-row']}>
        {tabs.map((tab, i) => {
          const { name, label } = tab
          const isActive = activeTab.name === name

          return (
            <button
              key={name}
              className={classnames([
                'button-reset',
                styles.tab,
                isActive ? styles.active : null,
              ])}
              onClick={() => setActiveTab(tabs[i])}
            >
              <span>{label}</span>
            </button>
          )
        })}
      </div>
      <div className={classnames(['panel', styles['tab-container']])}>
        <AnimatePresence>
          <motion.div
            initial="initial"
            variants={tabAnimation}
            animate="animate"
            exit="initial"
            key={activeTab.name}
          >
            <TabContent />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
