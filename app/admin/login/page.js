'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import * as y from 'yup'
import { useForm } from 'components/form/util/use-form'
import { Form } from 'components/form/form'
import { TextFormInput, AdminSubmitButton } from '../components/form'
import { Card, Heading, Flex, Box, Text } from '@radix-ui/themes'
import useTheme from 'hooks/use-theme'
import styles from './page.module.scss'
import { useRouter, useSearchParams } from 'next/navigation'
import { axiosClient } from 'util/axios-client'
import { queryClient } from 'util/query-client'

const AdminLoginPage = () => {
  const { theme } = useTheme()
  const router = useRouter()
  const searchParams = useSearchParams()
  const nextPath = searchParams.get('next') || '/admin'
  const isDarkMode = theme === 'dark'

  const methods = useForm({
    resolver: yupResolver(
      y.object().shape({
        email: y.string().email('Please enter a valid email').required('Email is required'),
        password: y.string().required('Password is required')
      })
    ),
    onSubmit: async (data) => {
      try {
        await axiosClient.post('/public/user/login', data)
        
        // Verify if the user is an admin
        const { data: user } = await axiosClient.get('/public/user/is-logged-in')
        
        if (!user.isAdmin) {
          throw new Error('You do not have administrator privileges')
        }
        
        queryClient.resetQueries({
          predicate: query => query.queryKey[0]?.includes('is-logged-in')
        })
        
        router.push(nextPath)
      } catch (error) {
        methods.setError('root', {
          type: 'manual',
          message: error.message || 'Authentication failed'
        })
      }
    }
  })

  return (
    <div className={styles['admin-login-container']}>
      <Card className={`${styles['admin-login-card']} ${isDarkMode ? styles['dark-mode'] : ''}`}>
        <Box p="5">
          <Heading size="5" mb="4" style={{ color: isDarkMode ? 'white' : 'inherit' }}>Admin Login</Heading>
          
          <Form methods={methods}>
            <Flex direction="column" gap="3">
              {methods.formState.errors.root && (
                <Text color="red" size="2" mb="2">
                  {methods.formState.errors.root.message}
                </Text>
              )}
              
              <TextFormInput
                name="email"
                placeholder="admin@example.com"
                type="email"
              />
              
              <TextFormInput
                name="password"
                placeholder="••••••••"
                type="password"
              />
              
              <AdminSubmitButton mt="2">
                Log in
              </AdminSubmitButton>
            </Flex>
          </Form>
        </Box>
      </Card>
    </div>
  )
}

export default AdminLoginPage
