import { Nav } from 'components/admin/nav'
import styles from './layout.module.scss'

export const Layout = ({ children }) => (
  <div className={styles.layout}>
    <Nav
      links={[
        {
          name: 'Favourites',
          links: [
            {
              name: 'Home',
              href: '/auto-admin-2/',
            },
            {
              name: 'Users',
              href: '/auto-admin-2/users',
            },
            {
              name: 'Posts',
              href: '/auto-admin-2/posts',
            },
            {
              name: 'Something Nested',
              href: '/auto-admin-2/nested',
              links: [
                {
                  name: 'A nested one',
                  href: '#',
                },
              ],
            },
          ],
        },
      ]}
    />
    <div className={styles.body}>
      Layout
      {children}
    </div>
  </div>
)
