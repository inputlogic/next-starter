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
              href: '/admin/dashboard',
            },
            {
              name: 'Users',
              href: '/admin/users',
            },
            //            {
            //              name: 'Something Nested',
            //              href: '/auto-admin-2/nested',
            //              links: [
            //                {
            //                  name: 'A nested one',
            //                  href: '#',
            //                },
            //              ],
            //            },
          ],
        },
      ]}
    />
    <div className={styles.body}>{children}</div>
  </div>
)
