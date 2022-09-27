import React, { useState, useEffect } from "react";
import {
  HStack,
  Vstack,
  FormControl,
  FormLabel,
  Button,
  Box,
  Input,
  Divider,
  Select,
  VStack,
  Text,
  Spacer,
  FormHelperText,
  Table,
  Thead,
  Td,
  Tbody,
  Tr,
  FormErrorMessage,
} from "@chakra-ui/react";
import axios from "axios";
const URL = "https://afternoon-citadel-59731.herokuapp.com";
const Billing = () => {
  const [cart, setCart] = useState([]);
  const [final, setFinal] = useState({
    discount: 0,
    final_amount: 0,
  });
  const [cartDetails, setCartDetails] = useState({
    total_items: 0,
    total_price: 0,
    total_amount: 0,
    cgst: 0,
    sgst: 0,
    igst: 0,
    gst: 0,
  });
  useEffect(() => {
    let totalDetails = {
      total_items: 0,
      total_price: 0,
      total_amount: 0,
      cgst: 0,
      sgst: 0,
      igst: 0,
      total_tax: 0,
    };
    cart.map((item) => {
      totalDetails.total_items += Number(item.qty);
      totalDetails.total_price += Number(item.cost);
      totalDetails.total_tax += Number(item.gst);
      totalDetails.total_amount += Number(item.mrp);
    });
    setCartDetails(totalDetails);
    setFinal({
      ...final,
      final_amount: totalDetails.total_amount - final.discount,
    });
  }, [cart]);
  const [inputError, setInputError] = useState(false);

  const pid_input = (e) => {
    var input = e.target.value;
    if (input.length === 13) {
      const data = {
        product_id: input,
        store_id: "guntur",
      };
      axios.post(URL + "/getItem", data).then(function (response) {
        if (!!response.data) {
          setInputError(false);
          if (Number(response.data.qty) >= 1) {
            if (cart.some((e) => e.product_id === response.data.product_id)) {
              cart.map((item, i) => {
                if (item.product_id === response.data.product_id) {
                  let new_arr = [...cart];
                  new_arr[i].qty += 1;
                  new_arr[i].mrp = new_arr[i].qty * new_arr[i].cost;

                  setCart(new_arr);
                  return;
                }
              });
            } else {
              response.data.qty = 1;

              setCart([...cart, response.data]);
            }
          } else {
            alert("This product has zero quantity!");
          }
        } else {
          setInputError(true);
        }
      });
    }
  };
  return (
    <div className=' bg-gray-100 shadow p-2'>
      <form>
        <HStack justify='flex-start'>
          <FormControl isInvalid={inputError}>
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
              mr={4}
              onChange={(e) => pid_input(e)}
            />
            <Button colorScheme='linkedin' size='sm'>
              Add
            </Button>
            <FormErrorMessage fontSize={12}>
              This product does not exist.
            </FormErrorMessage>
          </FormControl>
        </HStack>
      </form>

      <VStack align='flex-start' mt={4} spacing={5}>
        <VStack>
          <p className='text-xs'>Customer Details</p>
          <Divider />
        </VStack>

        <HStack mt={5} justify='flex-start'>
          <FormControl>
            <FormLabel htmlFor='product_id' fontSize={12}>
              Name
            </FormLabel>
            <Input
              w={300}
              size='sm'
              id='product_id'
              name='product_id'
              className='w-60 border p-1'
              bg='white'
              mr={4}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor='product_id' fontSize={12}>
              Area
            </FormLabel>
            <Input
              w={300}
              size='sm'
              id='product_id'
              name='product_id'
              className='w-60 border p-1'
              bg='white'
              mr={4}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor='product_id' fontSize={12}>
              Locality
            </FormLabel>
            <Input
              w={300}
              size='sm'
              id='product_id'
              name='product_id'
              className='w-60 border p-1'
              bg='white'
              mr={4}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor='product_id' fontSize={12}>
              State
            </FormLabel>
            <Select
              w={300}
              size='sm'
              id='product_id'
              name='product_id'
              className='w-60 border p-1'
              bg='white'
              mr={4}
            >
              <option>sfgs</option>
            </Select>
          </FormControl>
        </HStack>
        <HStack justify='flex-start'>
          <FormControl>
            <FormLabel htmlFor='product_id' fontSize={12}>
              Phone
            </FormLabel>
            <Input
              w={300}
              size='sm'
              id='product_id'
              name='product_id'
              className='w-60 border p-1'
              bg='white'
              mr={4}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor='product_id' fontSize={12}>
              Email
            </FormLabel>
            <Input
              w={300}
              size='sm'
              id='product_id'
              name='product_id'
              className='w-60 border p-1'
              bg='white'
              mr={4}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor='product_id' fontSize={12}>
              GSTIN
            </FormLabel>
            <Input
              w={300}
              size='sm'
              id='product_id'
              name='product_id'
              className='w-60 border p-1'
              bg='white'
              mr={4}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor='product_id' fontSize={12}>
              Referred by
            </FormLabel>
            <Input
              w={300}
              size='sm'
              id='product_id'
              name='product_id'
              className='w-60 border p-1'
              bg='white'
              mr={4}
            />
          </FormControl>
        </HStack>
      </VStack>
      <p className='text-xs mt-5 mb-2'>Items Details</p>
      <Divider />
      <section className='w-full bg-white mt-4'>
        <Table>
          <Thead>
            <Tr
              bg='linkedin.400'
              color='gray.100'
              fontSize={12}
              textTransform='uppercase'
              fontWeight='bold'
            >
              <Td>Product ID</Td>
              <Td>Style ID</Td>
              <Td>Category</Td>
              <Td>Product Name</Td>
              <Td>Size</Td>
              <Td>Color</Td>
              <Td>HSN Code</Td>
              <Td>Quantity</Td>
              <Td>Price</Td>
              <Td>MRP</Td>
              <Td>Actions</Td>
            </Tr>
          </Thead>
          <Tbody>
            {cart.map((item, i) => {
              return (
                <Tr
                  key={i}
                  color='gray.600'
                  fontSize={12}
                  textTransform='uppercase'
                  fontWeight='500'
                >
                  <Td className='p-5 border'>{item.product_id}</Td>
                  <Td className='p-5 border'>{item.style_id}</Td>
                  <Td className='p-5 border'>{item.category}</Td>
                  <Td className='p-5 border'>{item.product_name}</Td>
                  <Td className='p-5 border'>{item.size}</Td>
                  <Td className='p-5 border'>{item.color}</Td>

                  <Td className='p-5 border'>{item.hsn}</Td>
                  <Td className='p-5 border' isNumeric>
                    {item.qty}
                  </Td>
                  <Td className='p-5 border' isNumeric>
                    {item.cost}
                  </Td>
                  <Td className='p-5 border' isNumeric>
                    {item.mrp}
                  </Td>
                  <Td className='p-5 border'>Actions</Td>
                </Tr>
              );
            })}
            <Tr
              color='gray.600'
              fontSize={12}
              textTransform='uppercase'
              fontWeight='semibold'
              className='!h-2 border-t-2'
            >
              <Td className='!p-2  '></Td>
              <Td className='!p-2 '></Td>
              <Td className='!p-2'></Td>
              <Td className='!p-2 '></Td>
              <Td className='!p-2'></Td>

              <Td className='!p-2 '></Td>
              <Td className='!p-2 border border-r-0'>Total Quantity :</Td>
              <Td className='!pl-2 border border-l-0' isNumeric>
                {cartDetails.total_items}
              </Td>
              <Td className='!p-2 border border-r-0'>Total MRP :</Td>
              <Td className='!pl-2 border border-l-0' isNumeric>
                {cartDetails.total_amount}
              </Td>
              <Td className='!p-2 '></Td>
            </Tr>
          </Tbody>
        </Table>
      </section>
      <HStack className='flex justify-between  mt-2'>
        <Box>
          <FormControl>
            <FormLabel fontSize={12}>Discount Coupon</FormLabel>
            <Select size='sm' bg='white' w={200}>
              <option>AJSMSJS</option>
            </Select>
            <FormHelperText fontSize={10} color='blue.500' pl={1}>
              2000/- off on orders above 4000/-
            </FormHelperText>
          </FormControl>
        </Box>
        <HStack align='flex-start'>
          <Box bg='white' p={2}>
            <HStack fontSize={14} justify='space-between' mb={1}>
              <p>Total Items : </p>
              <span className='   ml-2 text-right'>
                {cartDetails.total_items}
              </span>
            </HStack>
          </Box>
          <Box bg='white' p={2}>
            <HStack fontSize={14} justify='space-between' mb={1}>
              <p>Price : </p>
              <span className='  ml-2 text-right'>
                {cartDetails.total_price} /-
              </span>
            </HStack>
            <HStack fontSize={14} justify='space-between' mb={1}>
              <p>SGST : </p>
              <span className='   ml-2 text-right' mb={1}>
                0 /-
              </span>
            </HStack>
            <HStack fontSize={14} justify='space-between' mb={1}>
              <p>IGST : </p>
              <span className='  ml-2 text-right' mb={1}>
                + 0 /-
              </span>
            </HStack>
            <HStack fontSize={14} justify='space-between' mb={1}>
              <p>Total Tax : </p>
              <span className='   ml-2 text-right'>
                {cartDetails.total_tax} /-
              </span>
            </HStack>
            <HStack fontSize={14} justify='space-between' mb={1}>
              <p>Discount : </p>
              <span className='   ml-2 text-right'>- {final.discount} /-</span>
            </HStack>
            <Divider />
            <HStack fontSize={14} justify='space-between' mt={2}>
              <p>Total Amout : </p>
              <span className='font-semibold   ml-2 text-right'>
                {final.final_amount} /-
              </span>
            </HStack>
          </Box>
        </HStack>
      </HStack>
      <HStack className='p-2 text-xs flex justify-end align-middle'>
        <HStack pt={8}>
          <Button size='sm' colorScheme='red'>
            Cancel
          </Button>
          <Button size='sm' colorScheme='linkedin'>
            Generate Invoice
          </Button>
        </HStack>
      </HStack>
    </div>
  );
};

export default Billing;
