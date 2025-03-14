'use client';

import { Tabs, Flex, Box, Heading, Card, TextField, Switch, Text, Button, Grid } from '@radix-ui/themes';

export default function SettingsPage() {
  return (
    <div>
      <Heading size="6" mb="5">Settings</Heading>
      
      <Tabs.Root defaultValue="general">
        <Tabs.List mb="4">
          <Tabs.Trigger value="general">General</Tabs.Trigger>
          <Tabs.Trigger value="appearance">Appearance</Tabs.Trigger>
          <Tabs.Trigger value="security">Security</Tabs.Trigger>
          <Tabs.Trigger value="api">API</Tabs.Trigger>
        </Tabs.List>
        
        <Box>
          <Tabs.Content value="general">
            <Card>
              <Box p="4">
                <Heading size="4" mb="4">General Settings</Heading>
                
                <Grid columns="1" gap="4" width="400px" mb="4">
                  <Box>
                    <Text as="label" size="2" weight="bold" mb="2" display="block">
                      Site Name
                    </Text>
                    <TextField.Root defaultValue="My Admin Panel" />
                  </Box>
                  
                  <Box>
                    <Text as="label" size="2" weight="bold" mb="2" display="block">
                      Contact Email
                    </Text>
                    <TextField.Root defaultValue="admin@example.com" />
                  </Box>
                  
                  <Box>
                    <Text as="label" size="2" weight="bold" mb="2" display="block">
                      Timezone
                    </Text>
                    <TextField.Root defaultValue="UTC" />
                  </Box>
                  
                  <Flex align="center" gap="4">
                    <Switch defaultChecked />
                    <Text size="2">Enable email notifications</Text>
                  </Flex>
                  
                  <Flex align="center" gap="4">
                    <Switch defaultChecked />
                    <Text size="2">Allow public registration</Text>
                  </Flex>
                </Grid>
                
                <Button>Save Changes</Button>
              </Box>
            </Card>
          </Tabs.Content>
          
          <Tabs.Content value="appearance">
            <Card>
              <Box p="4">
                <Heading size="4" mb="4">Appearance Settings</Heading>
                
                <Grid columns="1" gap="4" width="400px" mb="4">
                  <Box>
                    <Text as="label" size="2" weight="bold" mb="2" display="block">
                      Theme
                    </Text>
                    <TextField.Root defaultValue="Dark" />
                  </Box>
                  
                  <Box>
                    <Text as="label" size="2" weight="bold" mb="2" display="block">
                      Primary Color
                    </Text>
                    <TextField.Root defaultValue="#3B82F6" />
                  </Box>
                  
                  <Flex align="center" gap="4">
                    <Switch defaultChecked />
                    <Text size="2">Show user avatars</Text>
                  </Flex>
                  
                  <Flex align="center" gap="4">
                    <Switch defaultChecked />
                    <Text size="2">Enable animations</Text>
                  </Flex>
                </Grid>
                
                <Button>Save Changes</Button>
              </Box>
            </Card>
          </Tabs.Content>
          
          <Tabs.Content value="security">
            <Card>
              <Box p="4">
                <Heading size="4" mb="4">Security Settings</Heading>
                
                <Grid columns="1" gap="4" width="400px" mb="4">
                  <Flex align="center" gap="4">
                    <Switch defaultChecked />
                    <Text size="2">Enable two-factor authentication</Text>
                  </Flex>
                  
                  <Flex align="center" gap="4">
                    <Switch />
                    <Text size="2">Force strong passwords</Text>
                  </Flex>
                  
                  <Box>
                    <Text as="label" size="2" weight="bold" mb="2" display="block">
                      Session Timeout (minutes)
                    </Text>
                    <TextField.Root defaultValue="30" />
                  </Box>
                  
                  <Box>
                    <Text as="label" size="2" weight="bold" mb="2" display="block">
                      Failed Login Attempts Before Lockout
                    </Text>
                    <TextField.Root defaultValue="5" />
                  </Box>
                </Grid>
                
                <Button>Save Changes</Button>
              </Box>
            </Card>
          </Tabs.Content>
          
          <Tabs.Content value="api">
            <Card>
              <Box p="4">
                <Heading size="4" mb="4">API Settings</Heading>
                
                <Grid columns="1" gap="4" width="400px" mb="4">
                  <Flex align="center" gap="4">
                    <Switch defaultChecked />
                    <Text size="2">Enable API access</Text>
                  </Flex>
                  
                  <Box>
                    <Text as="label" size="2" weight="bold" mb="2" display="block">
                      API Key
                    </Text>
                    <TextField.Root defaultValue="••••••••••••••••••••••••••••••" />
                  </Box>
                  
                  <Flex align="center" gap="4">
                    <Switch defaultChecked />
                    <Text size="2">Rate limiting</Text>
                  </Flex>
                  
                  <Box>
                    <Text as="label" size="2" weight="bold" mb="2" display="block">
                      Rate Limit (requests per minute)
                    </Text>
                    <TextField.Root defaultValue="60" />
                  </Box>
                </Grid>
                
                <Flex gap="3">
                  <Button>Save Changes</Button>
                  <Button variant="soft">Generate New API Key</Button>
                </Flex>
              </Box>
            </Card>
          </Tabs.Content>
        </Box>
      </Tabs.Root>
    </div>
  );
}