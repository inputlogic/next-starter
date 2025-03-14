'use client';

import { Table, Flex, Text, Heading, Button, Card, Badge } from '@radix-ui/themes';

const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'Active' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Viewer', status: 'Inactive' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Editor', status: 'Active' },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Viewer', status: 'Active' },
];

export default function UsersPage() {
  return (
    <div>
      <Flex justify="between" align="center" mb="5">
        <Heading size="6">Users</Heading>
        <Button size="3">Add User</Button>
      </Flex>
      
      <Card>
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Role</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          
          <Table.Body>
            {users.map((user) => (
              <Table.Row key={user.id}>
                <Table.Cell>
                  <Text weight="medium">{user.name}</Text>
                </Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>{user.role}</Table.Cell>
                <Table.Cell>
                  <Badge color={user.status === 'Active' ? 'green' : 'amber'}>
                    {user.status}
                  </Badge>
                </Table.Cell>
                <Table.Cell>
                  <Flex gap="2">
                    <Button variant="soft" size="1">Edit</Button>
                    <Button variant="soft" color="red" size="1">Delete</Button>
                  </Flex>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Card>
    </div>
  );
}