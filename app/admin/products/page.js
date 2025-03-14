'use client';

import { Table, Flex, Text, Heading, Button, Card, Badge, Grid, TextField } from '@radix-ui/themes';

const products = [
  { id: 1, name: 'Product A', price: '$19.99', stock: 42, category: 'Electronics', status: 'In Stock' },
  { id: 2, name: 'Product B', price: '$29.99', stock: 0, category: 'Clothing', status: 'Out of Stock' },
  { id: 3, name: 'Product C', price: '$9.99', stock: 15, category: 'Books', status: 'In Stock' },
  { id: 4, name: 'Product D', price: '$49.99', stock: 5, category: 'Electronics', status: 'Low Stock' },
  { id: 5, name: 'Product E', price: '$39.99', stock: 20, category: 'Home', status: 'In Stock' },
];

export default function ProductsPage() {
  return (
    <div>
      <Flex justify="between" align="center" mb="5">
        <Heading size="6">Products</Heading>
        <Button size="3">Add Product</Button>
      </Flex>
      
      <Card mb="5">
        <Grid columns="3" gap="4" p="4">
          <TextField.Root placeholder="Search products..." />
          <Flex gap="3">
            <TextField.Root placeholder="Min price" />
            <TextField.Root placeholder="Max price" />
          </Flex>
          <Flex justify="end">
            <Button variant="soft">Filter</Button>
          </Flex>
        </Grid>
      </Card>
      
      <Card>
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Price</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Stock</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Category</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          
          <Table.Body>
            {products.map((product) => (
              <Table.Row key={product.id}>
                <Table.Cell>
                  <Text weight="medium">{product.name}</Text>
                </Table.Cell>
                <Table.Cell>{product.price}</Table.Cell>
                <Table.Cell>{product.stock}</Table.Cell>
                <Table.Cell>{product.category}</Table.Cell>
                <Table.Cell>
                  <Badge 
                    color={
                      product.status === 'In Stock' ? 'green' : 
                      product.status === 'Low Stock' ? 'amber' : 'red'
                    }
                  >
                    {product.status}
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