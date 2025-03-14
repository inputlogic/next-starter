'use client';

import { Card, Flex, Text, Heading, Grid, Box } from '@radix-ui/themes';

export default function AdminDashboard() {
  return (
    <div>
      <Heading size="6" mb="5">Dashboard</Heading>
      
      <Grid columns={{ initial: '1', xs: '2', md: '4' }} gap="4" mb="6">
        <Card>
          <Flex direction="column" gap="2" p="3">
            <Text color="gray" size="2">Total Users</Text>
            <Text size={{ initial: '4', xs: '5', md: '6' }} weight="bold">1,234</Text>
          </Flex>
        </Card>
        <Card>
          <Flex direction="column" gap="2" p="3">
            <Text color="gray" size="2">Products</Text>
            <Text size={{ initial: '4', xs: '5', md: '6' }} weight="bold">56</Text>
          </Flex>
        </Card>
        <Card>
          <Flex direction="column" gap="2" p="3">
            <Text color="gray" size="2">Revenue</Text>
            <Text size={{ initial: '4', xs: '5', md: '6' }} weight="bold">$12,345</Text>
          </Flex>
        </Card>
        <Card>
          <Flex direction="column" gap="2" p="3">
            <Text color="gray" size="2">Active Sessions</Text>
            <Text size={{ initial: '4', xs: '5', md: '6' }} weight="bold">42</Text>
          </Flex>
        </Card>
      </Grid>
      
      <Grid columns={{ initial: '1', md: '2' }} gap="6">
        <Card>
          <Box p="4">
            <Heading size="4" mb="4">Recent Activity</Heading>
            {[1, 2, 3, 4, 5].map((i) => (
              <Flex key={i} justify="between" align="center" py="2" mb="2" style={{ borderBottom: '1px solid var(--gray-5)' }}>
                <Text>User updated their profile</Text>
                <Text size="1" color="gray">5 mins ago</Text>
              </Flex>
            ))}
          </Box>
        </Card>
        
        <Card>
          <Box p="4">
            <Heading size="4" mb="4">Quick Actions</Heading>
            <Flex direction="column" gap="2">
              <Card variant="classic" size="1" asChild>
                <button style={{ textAlign: 'left', cursor: 'pointer' }}>
                  <Text weight="medium">Create new user</Text>
                </button>
              </Card>
              <Card variant="classic" size="1" asChild>
                <button style={{ textAlign: 'left', cursor: 'pointer' }}>
                  <Text weight="medium">Add new product</Text>
                </button>
              </Card>
              <Card variant="classic" size="1" asChild>
                <button style={{ textAlign: 'left', cursor: 'pointer' }}>
                  <Text weight="medium">Generate report</Text>
                </button>
              </Card>
            </Flex>
          </Box>
        </Card>
      </Grid>
    </div>
  );
}