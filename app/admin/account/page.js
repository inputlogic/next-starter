'use client';

import { Card, Heading, Text, Flex, Separator } from '@radix-ui/themes';

export default function AdminAccountPage() {
  return (
    <div>
      <Heading size="6" mb="5">Account Settings</Heading>
      
      <Card size="2" style={{ maxWidth: '800px' }}>
        <Flex direction="column" gap="5">
          <div>
            <Heading size="4" mb="2">User Information</Heading>
            <Separator size="4" mb="3" />
            <Flex direction="column" gap="3">
              <Flex justify="between">
                <Text weight="medium">Email</Text>
                <Text>admin@example.com</Text>
              </Flex>
              <Flex justify="between">
                <Text weight="medium">Role</Text>
                <Text>Administrator</Text>
              </Flex>
              <Flex justify="between">
                <Text weight="medium">Last Login</Text>
                <Text>March 14, 2025</Text>
              </Flex>
            </Flex>
          </div>
          
          <div>
            <Heading size="4" mb="2">Security</Heading>
            <Separator size="4" mb="3" />
            <Flex direction="column" gap="3">
              <Flex justify="between">
                <Text weight="medium">Password</Text>
                <Text color="blue">Change Password</Text>
              </Flex>
              <Flex justify="between">
                <Text weight="medium">Two-Factor Authentication</Text>
                <Text color="gray">Not Enabled</Text>
              </Flex>
            </Flex>
          </div>
          
          <div>
            <Heading size="4" mb="2">Preferences</Heading>
            <Separator size="4" mb="3" />
            <Flex direction="column" gap="3">
              <Flex justify="between">
                <Text weight="medium">Language</Text>
                <Text>English</Text>
              </Flex>
              <Flex justify="between">
                <Text weight="medium">Timezone</Text>
                <Text>UTC-7:00 (Pacific Time)</Text>
              </Flex>
            </Flex>
          </div>
        </Flex>
      </Card>
    </div>
  );
}