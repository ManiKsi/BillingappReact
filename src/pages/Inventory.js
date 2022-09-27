import React, { useEffect, useState } from "react";
import { AiOutlineEdit, AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import {
  HStack,
  Input,
  Select,
  Center,
  Spinner,
  Table,
  Thead,
  Tbody,
  Heading,
  Td,
  Tr,
  IconButton,
  ButtonGroup,
  Tooltip,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
  useToast,
  Box,
  VStack,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import axios from "axios";

var ModalDetails = {
  index: "",
  product_id: "",
  store_id: "",
};
const URL = "http://localhost:3001";

const Inventory = () => {
  const [Data, setData] = useState([]);
  const [dataCopy, setDataCopy] = useState([]);
  const [cat, setCat] = useState([]);
  const [stores, setStores] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [process, setProcess] = useState(false);
  const toast = useToast();
  const [modalLoading, setModalLoading] = useState(true);
  const [update, setUpdate] = useState(false);
  const [total, setTotal] = useState(0);

  //modal State management
  const {
    isOpen: isOpenQty,
    onOpen: onOpenQty,
    onClose: onCloseQty,
  } = useDisclosure();
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();

  useEffect(() => {
    axios.get(URL + "/getInventory").then(function (response) {
      // handle success
      const items = response.data.Items;
      let catAr = [];
      let storeAr = [];
      if (items.length !== 0) {
        items.map((item) => {
          if (!catAr.includes(item.category)) {
            catAr.push(item.category);
          }
          if (!storeAr.includes(item.store_id)) {
            storeAr.push(item.store_id);
          }
        });
      }
      setData(response.data.Items);
      setTotal(response.data.Count);
      setDataCopy(response.data.Items);
      setCat(catAr);
      setStores(storeAr);
      setLoading(false);
    });
  }, [update]);
  const onClickQty = (product_id, store_id) => {
    setProcess(true);
    const qty = document.getElementById("add_qty").value;
    const data = {
      product_id: product_id,
      store_id: store_id,
      qty: qty,
    };
    axios.post(URL + "/addQty", data).then(function (response) {
      // handle success
      if (response.status === 200) {
        toast({
          render: () => (
            <Box color='white' p={4} bg='linkedin.500' fontSize={14}>
              Quantity successfully updated.
            </Box>
          ),

          duration: 2000,
        });
        setProcess(false);

        setUpdate(!update);
      } else {
        toast({
          render: () => (
            <Box color='white' p={4} bg='red.500' fontSize={14}>
              Failed to add quantity.
            </Box>
          ),
          duration: 2000,
        });
        setProcess(false);
      }
    });
  };
  const onClickDelete = (product_id, store_id) => {
    setProcess(true);
    const data = {
      product_id: product_id,
      store_id: store_id,
    };
    axios.post(URL + "/deleteItem", data).then(function (response) {
      // handle success
      if (response.status === 200) {
        toast({
          render: () => (
            <Box color='white' p={4} bg='linkedin.500' fontSize={14}>
              Item Deleted
            </Box>
          ),
          duration: 2000,
        });
        setUpdate(!update);
        setProcess(false);

        onCloseDelete();
      } else {
        toast({
          render: () => (
            <Box color='white' p={4} bg='red.500' fontSize={14}>
              Failed to Delete.
            </Box>
          ),
          duration: 2000,
        });
        setProcess(false);
      }
    });
  };

  const onClickEdit = (product_id, store_id) => {
    setProcess(true);
    const data = {
      product_id: product_id,
      store_id: store_id,
    };
    axios.post(URL + "/getItemData", data).then(function (response) {
      // handle success
      if (response.status === 200) {
        toast({
          render: () => (
            <Box color='white' p={4} bg='linkedin.500' fontSize={14}>
              Quantity successfully updated.
            </Box>
          ),
          duration: 2000,
        });
        setProcess(false);
      } else {
        toast({
          render: () => (
            <Box color='white' p={4} bg='red.500' fontSize={14}>
              Failed to add quantity.
            </Box>
          ),
          duration: 2000,
        });
        setProcess(false);
      }
    });
  };

  const openQtyModal = (i, product_id, store_id) => {
    ModalDetails.index = i;
    ModalDetails.product_id = product_id;
    ModalDetails.store_id = store_id;

    onOpenQty();
  };

  const openEditModal = (i, product_id, store_id) => {
    ModalDetails.index = i;
    ModalDetails.product_id = product_id;
    ModalDetails.store_id = store_id;
    const data = {
      product_id: product_id,
      store_id: store_id,
    };
    axios.post(URL + "/getItem", data).then(function (response) {
      // handle success
      if (response.status === 200) {
        ModalDetails.product_id = response.data.product_id;
        ModalDetails.qty = response.data.qty;
        ModalDetails.category = response.data.category;
        ModalDetails.style_id = response.data.style_id;
        ModalDetails.product_name = response.data.product_name;
        ModalDetails.size = response.data.size;
        ModalDetails.color = response.data.color;
        ModalDetails.hsn = response.data.hsn;
        ModalDetails.cost = response.data.cost;
        ModalDetails.mrp = response.data.mrp;
        ModalDetails.gst = response.data.gst;
        setModalLoading(false);
        onOpenEdit();
      } else {
        toast({
          render: () => (
            <Box color='white' p={4} bg='red.500' fontSize={14}>
              Failed.
            </Box>
          ),
          duration: 2000,
        });
      }
    });
  };
  const openDeleteModal = (i, product_id, store_id) => {
    ModalDetails.index = i;
    ModalDetails.product_id = product_id;
    ModalDetails.store_id = store_id;

    onOpenDelete();
  };

  const setByCat = (e) => {
    const category = e.target.value;
    const data = {
      category: category,
    };
    axios.post(URL + "/getByCat", data).then(function (response) {
      setData(response.data);
    });
  };
  const setByStore = (e) => {
    const store_id = e.target.value;
    const data = {
      store_id: store_id,
    };
    axios.post(URL + "/getByStore", data).then(function (response) {
      setData(response.data);
    });
  };

  const dataSort = () => {
    const cat =
      document.getElementById("categories").value === "1"
        ? "all"
        : document.getElementById("categories").value;
    const store =
      document.getElementById("stores").value === "1"
        ? "all"
        : document.getElementById("stores").value;
    const dataAr = Data;
    let ar = [];
    var data = {};
    if (!(cat === "all" && store === "all")) {
      if (cat === "all" && store !== "all") {
        data = {
          store_id: store,
        };
      } else if (store === "all" && cat !== "all") {
        data = {
          category: cat,
        };
      } else {
        data = {
          category: cat,
          store_id: store,
        };
      }
      axios.post(URL + "/dataSort", data).then(function (response) {
        setData(response.data);
        setTotal(response.data.length);
      });
    } else {
    }
  };

  const dataSearch = (e) => {
    const text = e.target.value;
    let ar = [];
    dataCopy.map((item) => {
      if (item.product_id.includes(text)) {
        ar.push(item);
      }
    });
    setData(ar);
  };

  return (
    <>
      {
        //qty modal
      }

      <Modal isOpen={isOpenQty} onClose={onCloseQty}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={14}>
            Add quantity to {ModalDetails.product_id}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <NumberInput defaultValue={1} min={1} id='add_qty'>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='red' mr={3} size='sm' onClick={onCloseQty}>
              Close
            </Button>
            <Button
              colorScheme='blue'
              size='sm'
              isLoading={process}
              onClick={() =>
                onClickQty(ModalDetails.product_id, ModalDetails.store_id)
              }
            >
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpenEdit} onClose={onCloseEdit} size='2xl'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={14}>Edit item details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {modalLoading ? (
              <Center>
                <Spinner
                  thickness='4px'
                  speed='0.65s'
                  emptyColor='gray.200'
                  color='blue.500'
                  size='xl'
                />
              </Center>
            ) : (
              <VStack spacing={5}>
                <HStack w='full' spacing={5}>
                  <FormControl>
                    <FormLabel fontSize={12}>Product ID</FormLabel>
                    <Input defaultValue={ModalDetails.product_id} size='sm' />
                  </FormControl>
                  <FormControl>
                    <FormLabel fontSize={12}>Quantity</FormLabel>
                    <Input defaultValue={ModalDetails.qty} size='sm' />
                  </FormControl>
                </HStack>
                <HStack w='full' spacing={5}>
                  <FormControl>
                    <FormLabel fontSize={12}>Product Name</FormLabel>
                    <Input defaultValue={ModalDetails.product_name} size='sm' />
                  </FormControl>
                  <FormControl>
                    <FormLabel fontSize={12}>Category</FormLabel>
                    <Input defaultValue={ModalDetails.category} size='sm' />
                  </FormControl>
                </HStack>
                <HStack w='full' spacing={5}>
                  <FormControl>
                    <FormLabel fontSize={12}>Style ID</FormLabel>
                    <Input defaultValue={ModalDetails.style_id} size='sm' />
                  </FormControl>
                  <FormControl>
                    <FormLabel fontSize={12}>Store ID</FormLabel>
                    <Input defaultValue={ModalDetails.store_id} size='sm' />
                  </FormControl>
                </HStack>
                <HStack w='full' spacing={5}>
                  <FormControl>
                    <FormLabel fontSize={12}>Size</FormLabel>
                    <Input defaultValue={ModalDetails.size} size='sm' />
                  </FormControl>
                  <FormControl>
                    <FormLabel fontSize={12}>Color</FormLabel>
                    <Input defaultValue={ModalDetails.color} size='sm' />
                  </FormControl>
                </HStack>
                <HStack w='full' spacing={5}>
                  <FormControl>
                    <FormLabel fontSize={12}>HSN</FormLabel>
                    <Input defaultValue={ModalDetails.hsn} size='sm' />
                  </FormControl>
                  <FormControl>
                    <FormLabel fontSize={12}>Cost</FormLabel>
                    <Input defaultValue={ModalDetails.cost} size='sm' />
                  </FormControl>
                </HStack>
                <HStack w='full' spacing={5}>
                  <FormControl>
                    <FormLabel fontSize={12}>MRP</FormLabel>
                    <Input defaultValue={ModalDetails.mrp} size='sm' />
                  </FormControl>
                  <FormControl>
                    <FormLabel fontSize={12}>GST</FormLabel>
                    <Input defaultValue={ModalDetails.gst} size='sm' />
                  </FormControl>
                </HStack>
              </VStack>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='red' mr={3} size='sm' onClick={onCloseEdit}>
              Close
            </Button>
            <Button
              colorScheme='blue'
              size='sm'
              disabled
              isLoading={process}
              onClick={() =>
                onClickEdit(ModalDetails.product_id, ModalDetails.store_id)
              }
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpenDelete} onClose={onCloseDelete}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={14}>
            Delete {ModalDetails.product_id}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Center>
              <Heading>Are you sure?</Heading>
            </Center>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='red' mr={3} size='sm' onClick={onCloseDelete}>
              No
            </Button>
            <Button
              colorScheme='blue'
              size='sm'
              isLoading={process}
              onClick={() =>
                onClickDelete(ModalDetails.product_id, ModalDetails.store_id)
              }
            >
              Yes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <div className='shadow-md bg-gray-50 '>
        <HStack justify='space-between ' p={2}>
          <div className=''>
            <Input
              size='sm'
              placeholder='Search'
              name='search'
              id='search'
              bg='white'
              onChange={(e) => dataSearch(e)}
            />
          </div>
          <HStack className=''>
            <label htmlFor='categories' className='mx-2 text-sm'>
              Category
            </label>
            <Select
              bg='white'
              size='sm'
              id='categories'
              name='categories'
              className='w-60 border p-1'
              onChange={dataSort}
              defaultValue='1'
            >
              <option value='1'>All</option>
              {cat.map((x) => {
                return (
                  <option key={x} value={x}>
                    {x}
                  </option>
                );
              })}
            </Select>
            <label htmlFor='store' className='mx-2 text-sm'>
              Store
            </label>
            <Select
              id='stores'
              name='stores'
              size='sm'
              bg='white'
              onChange={dataSort}
            >
              <option value='1'>All</option>
              {stores.map((x) => {
                return (
                  <option key={x} value={x}>
                    {x}
                  </option>
                );
              })}
            </Select>
          </HStack>
        </HStack>
        {Loading ? (
          <Center p={5}>
            <Spinner
              thickness='4px'
              speed='0.65s'
              emptyColor='gray.200'
              color='blue.500'
              size='xl'
            />
          </Center>
        ) : (
          <div className=' '>
            <HStack className='justify-end text-xs mt-5'>
              <p>
                Total Entries: <span className='mx-2'>{total}</span>
              </p>
              <p>
                Total Value: <span className='mx-2'>32424/-</span>
              </p>
            </HStack>

            <div className='shadow-md p-2 '>
              <Table size='sm' border={1} className='bg-white' mb={2}>
                <Thead bg='cyan.400' color='white'>
                  <Tr>
                    <Td>S.No</Td>
                    <Td>Product ID</Td>
                    <Td>Product Name</Td>
                    <Td>Category</Td>
                    <Td>Style ID</Td>
                    <Td>Size</Td>
                    <Td>Color</Td>
                    <Td>HSN Code</Td>
                    <Td>Store ID</Td>
                    <Td>Cost</Td>
                    <Td>GST </Td>
                    <Td>MRP</Td>
                    <Td>Qty</Td>
                    <Td>Last Updated</Td>
                    <Td>Actions</Td>
                  </Tr>
                </Thead>
                <Tbody>
                  {Data.map((row, i) => {
                    return (
                      <Tr key={i}>
                        <Td className=' border !text-xs w-1'>{i + 1}</Td>
                        <Td className=' border !text-xs'>{row.product_id}</Td>
                        <Td className=' border !text-xs'>{row.product_name}</Td>
                        <Td className=' border !text-xs'>{row.category}</Td>
                        <Td className=' border !text-xs'>{row.style_id}</Td>
                        <Td className=' border !text-xs'>{row.size}</Td>
                        <Td className=' border !text-xs'>{row.color}</Td>
                        <Td className=' border !text-xs'>{row.cost}</Td>
                        <Td className=' border !text-xs'>{row.store_id}</Td>
                        <Td className=' border !text-xs'>{row.cost}</Td>
                        <Td className=' border !text-xs'>{row.gst} </Td>
                        <Td className=' border !text-xs'>{row.mrp}</Td>
                        <Td className=' border !text-xs'>{row.qty}</Td>
                        <Td className=' border !text-xs'>{row.addedAt}</Td>
                        <Td>
                          <ButtonGroup>
                            <Tooltip
                              hasArrow
                              label='Add Quantity'
                              fontSize={9}
                              bg='green.400'
                            >
                              <IconButton
                                size='xs'
                                icon={<AiOutlinePlus />}
                                colorScheme='green'
                                onClick={() =>
                                  openQtyModal(
                                    i - 1,
                                    row.product_id,
                                    row.store_id
                                  )
                                }
                              ></IconButton>
                            </Tooltip>

                            <Tooltip
                              hasArrow
                              label='Edit'
                              fontSize={9}
                              bg='blue.400'
                            >
                              <IconButton
                                size='xs'
                                icon={<AiOutlineEdit />}
                                colorScheme='blue'
                                onClick={() =>
                                  openEditModal(
                                    i - 1,
                                    row.product_id,
                                    row.store_id
                                  )
                                }
                              ></IconButton>
                            </Tooltip>
                            <Tooltip
                              hasArrow
                              label='Delete'
                              fontSize={9}
                              bg='red.400'
                            >
                              <IconButton
                                size='xs'
                                icon={<AiOutlineDelete />}
                                colorScheme='red'
                                onClick={() =>
                                  openDeleteModal(
                                    i - 1,
                                    row.product_id,
                                    row.store_id
                                  )
                                }
                              ></IconButton>
                            </Tooltip>
                          </ButtonGroup>
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Inventory;
