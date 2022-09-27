import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Text,
  Select,
  Box,
  Divider,
  useDisclosure,
  VStack,
  IconButton,
  ButtonGroup,
  Table,
  Tr,
  Th,
  Tbody,
  Thead,
  Td,
} from "@chakra-ui/react";
import React from "react";
import DataTable from "../components/DataTable";
import { ModalDialogue2 } from "../components/ModalDialogue";
import { MdDone } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
const COLUMNS = [
  {
    Header: "Product ID",
    accessor: "pid",
  },
  {
    Header: "Style ID",
    accessor: "sid",
  },
  {
    Header: "Category",
    accessor: "category",
  },

  {
    Header: "Product Name",
    accessor: "name",
  },
  {
    Header: "Size",
    accessor: "size",
  },
  {
    Header: "Color",
    accessor: "color",
  },
  {
    Header: "Store",
    accessor: "store",
  },
  {
    Header: "Qty",
    accessor: "qty",
  },
  {
    Header: "Cost",
    accessor: "cost",
  },
  {
    Header: "HSN Code",
    accessor: "hsn",
  },
  {
    Header: "Price",
    accessor: "price",
  },

  {
    Header: "GST",
    accessor: "gst",
  },
  {
    Header: "MRP",
    accessor: "mrp",
  },

  {
    Header: "Actions",
    accessor: "actions",
  },
];
const DATA = [
  {
    pid: "CRENW232",
    sid: "CEKWIUD",
    name: "KURTHA",
    price: "3200",
    gst: "25",
    hsn: "2000934",
    status: "InStock",
    qty: "1",
    store: "Guntur",
    mrp: "4000",
    sold: "3700",
    actions: "CRENW232",
  },
  {
    pid: "CRENW232",
    sid: "CEKWIUD",
    name: "KURTHA",
    price: "3200",
    gst: "25",
    hsn: "2000934",
    status: "InStock",
    store: "Guntur",
    mrp: "4000",
    sold: "3700",
    actions: "CRENW232",
  },
];
const Transfer = () => {
  const {
    isOpen: isOpenPending,
    onOpen: onOpenPending,
    onClose: onClosePending,
  } = useDisclosure();
  return (
    <>
      <ModalDialogue2
        isOpen={isOpenPending}
        onClose={onClosePending}
        onOpen={onOpenPending}
        title='Pending transfer requests'
      >
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>Locations</Th>
              <Th>Items</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody fontSize={14} minW={400}>
            <Tr>
              <Td>Warehouse - Location2</Td>
              <Td>125 (units)</Td>
              <Td>
                <ButtonGroup justify='center'>
                  <IconButton
                    colorScheme='blue'
                    icon={<MdDone />}
                    size='sm'
                    variant='outline'
                  ></IconButton>
                  <IconButton
                    colorScheme='red'
                    icon={<AiOutlineDelete />}
                    variant='outline'
                    size='sm'
                  ></IconButton>
                </ButtonGroup>
              </Td>
            </Tr>
            <Tr>
              <Td>Warehouse - Location2</Td>
              <Td>125 (units)</Td>
              <Td>
                <ButtonGroup justify='center'>
                  <IconButton
                    colorScheme='blue'
                    icon={<MdDone />}
                    size='sm'
                    variant='outline'
                  ></IconButton>
                  <IconButton
                    colorScheme='red'
                    icon={<AiOutlineDelete />}
                    variant='outline'
                    size='sm'
                  ></IconButton>
                </ButtonGroup>
              </Td>
            </Tr>
            <Tr>
              <Td>Warehouse - Location2</Td>
              <Td>125 (units)</Td>
              <Td>
                <ButtonGroup justify='center'>
                  <IconButton
                    colorScheme='blue'
                    icon={<MdDone />}
                    size='sm'
                    variant='outline'
                  ></IconButton>
                  <IconButton
                    colorScheme='red'
                    icon={<AiOutlineDelete />}
                    variant='outline'
                    size='sm'
                  ></IconButton>
                </ButtonGroup>
              </Td>
            </Tr>
          </Tbody>
        </Table>
        {/* <VStack align='flex-start' spacing={4} mb={5}>
          <HStack className='w-full' justify='space-between'>
            <Text fontSize={14}>
              <span>Location1</span> - <span>Location2</span>
            </Text>
            <Text>520</Text>
            <ButtonGroup justify='center'>
              <IconButton
                colorScheme='blue'
                icon={<MdDone />}
                size='sm'
                variant='outline'
              ></IconButton>
              <IconButton
                colorScheme='red'
                icon={<AiOutlineDelete />}
                variant='outline'
                size='sm'
              ></IconButton>
            </ButtonGroup>
          </HStack>
          <HStack className='w-full' justify='space-between'>
            <Text fontSize={14}>
              <span>Location1</span> - <span>Location2</span>
            </Text>
            <Text>520</Text>
            <ButtonGroup justify='center'>
              <IconButton
                colorScheme='blue'
                icon={<MdDone />}
                size='sm'
                variant='outline'
              ></IconButton>
              <IconButton
                colorScheme='red'
                icon={<AiOutlineDelete />}
                variant='outline'
                size='sm'
              ></IconButton>
            </ButtonGroup>
          </HStack>
        </VStack> */}
      </ModalDialogue2>
      <div className=' bg-gray-100 shadow p-2'>
        <HStack justify='right'>
          <Button colorScheme='messenger' size='sm' onClick={onOpenPending}>
            Pending transfer requests
          </Button>
        </HStack>
        <form>
          <HStack justify='space-between'>
            <FormControl>
              <FormLabel htmlFor='product_id' fontSize={12}>
                Product ID
              </FormLabel>
              <Input
                w={300}
                size='sm'
                id='product_id'
                name='product_id'
                className='w-60 border p-1'
                bg='white'
              />
            </FormControl>
            <FormControl className='ml-2' w={400}>
              <FormLabel htmlFor='location' fontSize={12}>
                Location
              </FormLabel>
              <Select
                bg='white'
                size='sm'
                id='location'
                name='location'
                className='w-60 border p-1'
              >
                <option>All</option>
                <option>Warehouse</option>
                <option>Guntur</option>
                <option>Vijayawada</option>
              </Select>{" "}
            </FormControl>
          </HStack>
        </form>
        <section className='w-full bg-white mt-4'>
          <DataTable COLUMNS={COLUMNS} DATA={DATA} />
        </section>
        <HStack className='flex justify-end  mt-2' align='flex-start'>
          <Box bg='white' p={2}>
            <HStack fontSize={14} justify='space-between' mb={1}>
              <p>Total Items : </p>
              <span className='   ml-2 text-right'>200 /-</span>
            </HStack>
            <HStack fontSize={14} justify='space-between'>
              <p>Total Styles : </p>
              <span className='  ml-2 text-right'>200 /-</span>
            </HStack>
          </Box>
          <Box bg='white' p={2}>
            <HStack fontSize={14} justify='space-between' mb={1}>
              <p>Price : </p>
              <span className='  ml-2 text-right'>200 /-</span>
            </HStack>
            <HStack fontSize={14} justify='space-between'>
              <p>SGST : </p>
              <span className='   ml-2 text-right'>200 /-</span>
            </HStack>
            <HStack fontSize={14} justify='space-between'>
              <p>IGST : </p>
              <span className='  ml-2 text-right'>200 /-</span>
            </HStack>
            <HStack fontSize={14} justify='space-between'>
              <p>GST : </p>
              <span className='   ml-2 text-right'>200 /-</span>
            </HStack>
            <Divider />
            <HStack fontSize={14} justify='space-between' mt={2}>
              <p>Total Price : </p>
              <span className='font-semibold   ml-2 text-right'>200 /-</span>
            </HStack>
          </Box>
        </HStack>
        <HStack className='p-2 text-xs flex justify-end align-middle'>
          <div className='flex '>
            <FormControl className='ml-4'>
              <FormLabel htmlFor='t_to' className='my-2 block' fontSize={12}>
                Transfer to
              </FormLabel>
              <Select id='t_to' name='location' size='sm' bg='white' w={300}>
                <option>All</option>
                <option>Warehouse</option>
                <option>Guntur</option>
                <option>Vijayawada</option>
              </Select>{" "}
            </FormControl>
          </div>
          <HStack pt={8}>
            <Button size='sm' colorScheme='facebook'>
              Generate transfer invoice
            </Button>
            <Button size='sm' colorScheme='linkedin'>
              Create transfer request
            </Button>
          </HStack>
        </HStack>
      </div>
    </>
  );
};

export default Transfer;
