import {
  Heading,
  HStack,
  Box,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Th,
  Tr,
  Text,
  Td,
} from "@chakra-ui/react";
import React from "react";

export const Stores = () => {
  return (
    <Box>
      <HStack>
        <Heading size='xl'>Stores Management</Heading>
      </HStack>
      <Box>
        <HStack>
          <Table colorScheme='linkedin' size='md'>
            <Thead bg='linkedin.200'>
              <Tr>
                <Th>Location</Th>
                <Th>Total Stock</Th>
                <Th>Total Stock In Value</Th>
                <Th>Balance</Th>
              </Tr>
            </Thead>
            <Tbody fontSize={14}>
              <Tr>
                <Td>
                  <Text>Store_1</Text>
                </Td>
                <Td>600 Items</Td>
                <Td> 230200/-</Td>
                <Td> 100000/-</Td>
              </Tr>
            </Tbody>
          </Table>
        </HStack>
      </Box>
    </Box>
  );
};
