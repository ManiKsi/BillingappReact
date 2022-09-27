import React, { useEffect } from "react";

import { AiOutlinePlus, AiOutlineDelete } from "react-icons/ai";

import axios from "axios";
import { useState } from "react";
import { ModalDialogue } from "../components/ModalDialogue";
import {
  Button,
  HStack,
  Input,
  VStack,
  Box,
  Spacer,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Table,
  Thead,
  Tr,
  Td,
  Tbody,
  FormControl,
  FormErrorMessage,
  useToast,
  IconButton,
} from "@chakra-ui/react";

import { useDisclosure } from "@chakra-ui/react";
const URL = "http://localhost:3001";

const AddItems = () => {
  var moment = require("moment");
  const [loading, setLoading] = useState(true);
  const [cat, setCat] = useState([]);
  const [styles, setStyles] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [item_list, setItemList] = useState([]);
  const [addError, setAddError] = useState(false);
  const [saving, setSaving] = useState(false);
  const [adding, setAdding] = useState(false);
  const toast = useToast();

  useEffect(() => {
    axios.get(URL + "/getCat").then(function (response) {
      // handle success

      var ar = [];
      var cat = response.data;
      cat.map((item) => {
        if (!ar.includes(item.category)) {
          ar.push(item.category);
        }
      });

      setCat(ar);
      setLoading(false);
    });
    // setCat(categories);
  }, []);

  useEffect(() => {
    if (localStorage.items) {
      var items = JSON.parse(localStorage.items);
      setItemList(items);
    }
  }, []);
  //add Options

  const getStyles = (x) => {
    let styles = [];
    const data = {
      category: x,
    };
    axios.post(URL + "/getStyles", data).then(function (response) {
      var ar = [];
      var styles = response.data;
      styles.map((item) => {
        if (!ar.includes(item.style_id) && item.style_id !== "NA") {
          ar.push(item.style_id);
        }
      });

      setStyles(ar);
    });
  };

  const getSizeAndColor = (x) => {
    let sizes = [];
    let colors = [];

    const category = document.getElementById("category").value;
    if (x && category) {
      const data = {
        category: category,
        style_id: x,
      };
      axios.post(URL + "/getSizeColor", data).then(function (response) {
        const data = response.data[0];
        if (data.colors) {
          setColors(data.colors);
        } else {
          setColors([]);
        }
        if (data.sizes) {
          setSizes(data.sizes);
        } else {
          setSizes([]);
        }
        // var size = response.data;
        // console.log(styles);
        // styles.map((item) => {
        //   if (!ar.includes(item.style_id)) {
        //     ar.push(item.style_id);
        //   }
        // });

        // setStyles(ar);
      });
    } else {
      setColors([]);
      setSizes([]);
    }
  };

  const generateId = async (e) => {
    e.preventDefault();
    const Id = await axios.get(URL + "/generateId");
    var input = document.getElementById("product_id");
    input.value = Id.data;
  };

  const addList = (e) => {
    e.preventDefault();
    let category = "";
    let style_id = "";
    let size = "";
    let color = "";
    let product_id = "";
    let product_name = "";
    let hsn = "";
    let store_id = "";
    let cost = "";
    let gst = "";
    let mrp = "";
    let qty = 0;

    category = !!e.target.category.value ? e.target.category.value : "";
    style_id = !!e.target.style_id.value ? e.target.style_id.value : "";
    size = !!e.target.size.value ? e.target.size.value : "";
    color = !!e.target.color.value ? e.target.color.value : "";
    product_id = !!e.target.product_id.value ? e.target.product_id.value : "";
    product_name = !!e.target.product_name.value
      ? e.target.product_name.value
      : "";
    hsn = !!e.target.hsn.value ? e.target.hsn.value : "";
    store_id = !!e.target.location.value ? e.target.location.value : "";
    cost = !!e.target.cost.value ? e.target.cost.value : "";
    gst = !!e.target.gst.value ? e.target.gst.value : "";
    mrp = !!e.target.mrp.value ? e.target.mrp.value : "";
    qty = Number(!!e.target.qty.value ? e.target.qty.value : "");

    let item_data = {
      product_id: product_id,
      store_id: store_id,
      category: category,
      style_id: style_id,
      color: color,
      product_name: product_name,
      size: size,
      hsn: hsn,
      cost: cost,
      gst: gst,
      mrp: mrp,
      qty: qty,
    };
    localStorage.items = JSON.stringify([...item_list, item_data]);
    // var items = JSON.parse(localStorage.items);
    setItemList([...item_list, item_data]);
    e.target.reset();

    // console.log(item_list);
  };

  //Modal State Management
  const {
    isOpen: isOpenCat,
    onOpen: onOpenCat,
    onClose: onCloseCat,
  } = useDisclosure();
  const {
    isOpen: isOpenStyle,
    onOpen: onOpenStyle,
    onClose: onCloseStyle,
  } = useDisclosure();
  const {
    isOpen: isOpenSize,
    onOpen: onOpenSize,
    onClose: onCloseSize,
  } = useDisclosure();
  const {
    isOpen: isOpenColor,
    onOpen: onOpenColor,
    onClose: onCloseColor,
  } = useDisclosure();

  //Adding
  //Adding new category
  const addCat = async () => {
    let new_cat = document.getElementById("new_cat").value;
    document.getElementById("new_cat").value = "";
    const data = {
      category: new_cat,
    };
    if (new_cat !== "") {
      setSaving(true);
      await axios.post(URL + "/setNewCategory", data).then((response) => {
        if (response.status == 200) {
          setCat([...cat, new_cat]);
          toast({
            bg: "red",
            render: () => (
              <Box color='white' p={4} bg='linkedin.500' fontSize={14}>
                New category {new_cat} added!
              </Box>
            ),
            duration: 2000,
            isClosable: true,
          });
          setSaving(false);
        } else {
          setAddError(true);
          setSaving(false);
        }
      });
    }
  };

  const addStyle = async () => {
    let new_style = document.getElementById("new_style").value;
    let category = document.getElementById("category").value;
    document.getElementById("new_style").value = "";
    if (category === "") {
      toast({
        render: () => (
          <Box color='white' p={4} bg='red.500' fontSize={14}>
            Please select a category first.
          </Box>
        ),
      });
      return;
    } else if (new_style !== "" && category !== "") {
      setSaving(true);
      const data = {
        category: category,
        style_id: new_style,
      };

      await axios.post(URL + "/setNewStyle", data).then((response) => {
        if (response.status === 200) {
          setStyles([...styles, new_style]);
          toast({
            render: () => (
              <Box color='white' p={4} bg='linkedin.500' fontSize={14}>
                New category {new_style} added in {category}!
              </Box>
            ),
            duration: 2000,
            isClosable: true,
          });
          setSaving(false);
        } else {
          setAddError(true);
          setSaving(false);
        }
      });
    }
  };
  // Add size

  const addSize = async () => {
    let style_id = document.getElementById("style_id").value;
    let category = document.getElementById("category").value;
    let new_size = document.getElementById("new_size").value;
    document.getElementById("new_size").value = "";
    if (category === "" && style_id === "") {
      toast({
        render: () => (
          <Box color='white' p={4} bg='red.500' fontSize={14}>
            Please select a category and style first.
          </Box>
        ),
      });
      return;
    } else if (new_size !== "" && style_id !== "" && category !== "") {
      setSaving(true);
      const data = {
        category: category,
        style_id: style_id,
        size: new_size,
      };

      await axios.post(URL + "/setNewSize", data).then((response) => {
        if (response.status === 200) {
          setSizes([...sizes, new_size]);
          toast({
            render: () => (
              <Box color='white' p={4} bg='linkedin.500' fontSize={14}>
                New size option :{new_size} added to {style_id}!
              </Box>
            ),
            duration: 2000,
            isClosable: true,
          });
          setSaving(false);
        } else {
          setAddError(true);
          setSaving(false);
        }
      });
    }
  };
  const addColor = async () => {
    let style_id = document.getElementById("style_id").value;
    let category = document.getElementById("category").value;
    let new_color = document.getElementById("new_color").value;
    document.getElementById("new_color").value = "";
    if (category === "" && style_id === "") {
      toast({
        render: () => (
          <Box color='white' p={4} bg='red.500' fontSize={14}>
            Please select a category and style first.
          </Box>
        ),
      });
      return;
    } else if (new_color !== "" && style_id !== "" && category !== "") {
      setSizes([...colors, new_color]);
      setSaving(true);
      const data = {
        category: category,
        style_id: style_id,
        color: new_color,
      };

      await axios.post(URL + "/setNewColor", data).then((response) => {
        if (response.status === 200) {
          setColors([...colors, new_color]);
          toast({
            render: () => (
              <Box color='white' p={4} bg='linkedin.500' fontSize={14}>
                New color option: {new_color} added to {style_id}!
              </Box>
            ),
            duration: 2000,
            isClosable: true,
          });
          setSaving(false);
        } else {
          setAddError(true);
          setSaving(false);
        }
      });
    }
  };
  useEffect(() => {
    localStorage.items = JSON.stringify(item_list);
  }, [item_list]);
  //On Click Delete
  const onClickDelete = (e, i) => {
    setItemList(item_list.filter((_, index) => index !== i));
    // setItemList(item_list.filter((_, index) => index !== i));
    // console.log(item_list);
  };
  // Add Final Items
  const addInventory = async () => {
    setAdding(true);
    const date = moment();
    var mfgDate = date.subtract(20, "days").format("YYYY-MM-DD");
    var addedAt = date.format("YYYY-MM-DD");
    var itemsArray = [];
    !!item_list &&
      item_list.map((item) => {
        item.addedAt = addedAt;
        item.mfgDate = mfgDate;
        itemsArray.push({
          PutRequest: {
            Item: item,
          },
        });
      });
    const data = {
      itemsArray: itemsArray,
    };

    await axios.post(URL + "/addInventory", data).then((response) => {
      if (response.status === 200) {
        toast({
          render: () => (
            <Box color='white' p={4} bg='linkedin.500' fontSize={14}>
              Items successfully added to inventory.
            </Box>
          ),
          duration: 2000,
        });
        setItemList([]);
        localStorage.items = JSON.stringify(item_list);
        setAdding(false);
      } else {
        toast({
          render: () => (
            <Box color='white' p={4} bg='red.500' fontSize={14}>
              Failed to add items.
            </Box>
          ),
          duration: 2000,
        });
        setAdding(false);
      }
    });
  };

  if (loading) {
    return <h1>Loading</h1>;
  } else {
    return (
      <>
        <ModalDialogue
          isOpen={isOpenCat}
          onClose={onCloseCat}
          onOpen={onOpenCat}
          title='Add a new category'
          placeholder='Enter a new category'
          handler={addCat}
          saving={saving}
        >
          <FormControl isInvalid={addError}>
            <Input size='sm' placeholder='Enter a new category' id='new_cat' />
            <FormErrorMessage>failed, try again!</FormErrorMessage>
          </FormControl>
        </ModalDialogue>
        <ModalDialogue
          isOpen={isOpenStyle}
          onClose={onCloseStyle}
          onOpen={onOpenStyle}
          title='Add a new style ID'
          handler={addStyle}
          saving={saving}
        >
          <FormControl isInvalid={addError}>
            <Input
              size='sm'
              placeholder='Enter a new Style ID'
              id='new_style'
            />
            <FormErrorMessage>failed, try again!</FormErrorMessage>
          </FormControl>
        </ModalDialogue>

        <ModalDialogue
          isOpen={isOpenColor}
          onClose={onCloseColor}
          onOpen={onOpenColor}
          handler={addColor}
          title='Add a new color'
          saving={saving}
        >
          <FormControl isInvalid={addError}>
            <Input
              size='sm'
              placeholder='Enter a new color option'
              id='new_color'
            />
            <FormErrorMessage>failed, try again!</FormErrorMessage>
          </FormControl>
        </ModalDialogue>

        <ModalDialogue
          isOpen={isOpenSize}
          onClose={onCloseSize}
          onOpen={onOpenSize}
          title='Add a new size'
          handler={addSize}
          saving={saving}
        >
          <FormControl isInvalid={addError}>
            <Input
              size='sm'
              id='new_size'
              placeholder='Enter a new size option'
            />
            <FormErrorMessage>failed, try again!</FormErrorMessage>
          </FormControl>
        </ModalDialogue>
        <div className=' bg-gray-50 shadow p-2 '>
          <form onSubmit={(e) => addList(e)} id='addIemsForm'>
            <VStack className='text-xs pb-2 pr-2' spacing={4} align='stretch'>
              <HStack spacing={5}>
                <Box>
                  <label htmlFor='categories' className='my-2 block'>
                    Category
                    <Button
                      type='button'
                      size='xs'
                      className='float-right mb-1 text-xl'
                      onClick={onOpenCat}
                      colorScheme='linkedin'
                    >
                      <AiOutlinePlus color='white' />
                    </Button>
                  </label>
                  <select
                    required
                    id='category'
                    name='category'
                    className='w-80 border p-2'
                    onChange={(e) => getStyles(e.target.value)}
                  >
                    <option value=''>Select Category</option>
                    {cat.map((item) => (
                      <option value={item} key={item}>
                        {item}
                      </option>
                    ))}
                  </select>{" "}
                </Box>
                <Box>
                  <label htmlFor='style_id' className='my-2 block'>
                    Style ID
                    <Button
                      type='button'
                      size='xs'
                      className='float-right mb-1 text-xl'
                      onClick={onOpenStyle}
                      colorScheme='linkedin'
                    >
                      <AiOutlinePlus color='white' />
                    </Button>
                  </label>
                  <select
                    required
                    id='style_id'
                    name='style_id'
                    className='w-80 border p-2'
                    onChange={(e) => getSizeAndColor(e.target.value)}
                  >
                    <option value=''>Select Style</option>
                    {styles.map((item) => (
                      <option value={item} key={item}>
                        {item}
                      </option>
                    ))}
                  </select>{" "}
                </Box>
                <Box>
                  <label htmlFor='size' className='my-2 block'>
                    Size
                    <Button
                      type='button'
                      size='xs'
                      className='float-right mb-1 text-xl'
                      onClick={onOpenSize}
                      colorScheme='linkedin'
                    >
                      <AiOutlinePlus color='white' />
                    </Button>
                  </label>
                  <select
                    id='size'
                    name='size'
                    className='w-80 border p-2'
                    required
                  >
                    <option>Select a size</option>
                    {sizes.map((item) => (
                      <option value={item} key={item}>
                        {item}
                      </option>
                    ))}
                  </select>{" "}
                </Box>
                <Box>
                  <label htmlFor='color' className='my-2 block'>
                    Color
                    <Button
                      type='button'
                      size='xs'
                      className='float-right mb-1 text-xl'
                      onClick={onOpenColor}
                      colorScheme='linkedin'
                    >
                      <AiOutlinePlus color='white' />
                    </Button>
                  </label>
                  <select
                    id='color'
                    name='color'
                    className='w-80 border p-2'
                    required
                  >
                    <option>Select a color</option>
                    {colors.map((item) => (
                      <option value={item} key={item}>
                        {item}
                      </option>
                    ))}
                  </select>{" "}
                </Box>
              </HStack>
              <HStack spacing={5}>
                <Box>
                  <label htmlFor='product_id' className='my-2 block'>
                    Product ID{" "}
                    <Button
                      size='xs'
                      type='button'
                      colorScheme='linkedin'
                      className='float-right mb-2'
                      fontSize={10}
                      onClick={(e) => generateId(e)}
                    >
                      Generate
                    </Button>
                  </label>
                  <input
                    required
                    id='product_id'
                    name='product_id'
                    className='w-80 border p-2'
                  />
                </Box>
                <Box>
                  <label htmlFor='product_name' className='my-2 block'>
                    Product Name
                  </label>
                  <input
                    required
                    id='product_name'
                    name='product_name'
                    className='w-80 border p-2'
                  />
                </Box>
                <Box>
                  <label htmlFor='hsn' className='my-2 block'>
                    HSN Code
                  </label>
                  <input
                    required
                    id='hsn'
                    name='hsn'
                    className='w-80 border p-2'
                    defaultValue='60000213'
                  />
                </Box>
                <Box>
                  <label htmlFor='location' className='my-2 block'>
                    Location
                  </label>
                  <select
                    required
                    id='location'
                    name='location'
                    className='w-80 border p-2'
                    defaultValue='warehouse'
                  >
                    <option>warehouse</option>
                    <option>guntur</option>
                    <option>vijayawada</option>
                  </select>{" "}
                </Box>
              </HStack>
              <HStack spacing={5}>
                <Box>
                  <label htmlFor='cost' className='my-2 block'>
                    Cost
                  </label>
                  <input
                    required
                    id='cost'
                    name='cost'
                    className='w-80 border p-2'
                  />
                </Box>
                <Box>
                  <label htmlFor='gst' className='my-2 block'>
                    GST
                  </label>
                  <input
                    required
                    id='gst'
                    name='gst'
                    className='w-80 border p-2'
                  />
                </Box>

                <Box>
                  <label htmlFor='MRP' className='my-2 block'>
                    MRP
                  </label>
                  <input
                    required
                    id='mrp'
                    name='mrp'
                    className='w-80 border p-2'
                    type='number'
                    onChange={(e) => {
                      document.getElementById("gst").value = Math.round(
                        e.target.value * 0.18
                      );
                    }}
                  />
                </Box>
                <Box>
                  <label htmlFor='qty' className='my-2 block'>
                    Quantity
                  </label>
                  <NumberInput
                    required
                    size='sm'
                    bg='white'
                    defaultValue='1'
                    min='0'
                    name='qty'
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </Box>
                <Box>
                  <Button size='sm' type='submit' w={20} mt={8}>
                    Add
                  </Button>
                </Box>
              </HStack>
            </VStack>
          </form>
          <section className='w-full bg-white mt-4'>
            <Table size='sm' bg='white'>
              <Thead bg='linkedin.500' color='white'>
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
                  <Td>Actions</Td>
                </Tr>
              </Thead>
              <Tbody>
                {!!item_list.length &&
                  item_list.map((item, i) => {
                    return (
                      <Tr key={i}>
                        <Td>{i + 1}</Td>
                        <Td>{item.product_id}</Td>
                        <Td>{item.product_name}</Td>
                        <Td>{item.category}</Td>
                        <Td>{item.style_id}</Td>
                        <Td>{item.size}</Td>
                        <Td>{item.color}</Td>
                        <Td>{item.hsn}</Td>
                        <Td>{item.store_id}</Td>
                        <Td>{item.cost}</Td>
                        <Td>{item.gst}</Td>
                        <Td>{item.mrp}</Td>
                        <Td>{item.qty}</Td>
                        <Td>
                          <IconButton
                            colorScheme='red'
                            icon={<AiOutlineDelete />}
                            variant='outline'
                            size='xs'
                            onClick={(e) => onClickDelete(e, i)}
                          ></IconButton>
                        </Td>
                      </Tr>
                    );
                  })}
              </Tbody>
            </Table>
          </section>
          <section className=' mt-5'>
            <HStack spacing={5}>
              <Button
                size='sm'
                colorScheme='linkedin'
                onClick={addInventory}
                isLoading={adding}
              >
                Add to Inventory
              </Button>

              <Button
                size='sm'
                colorScheme='red'
                onClick={() => setItemList([])}
              >
                Clear
              </Button>
            </HStack>
          </section>
        </div>
      </>
    );
  }
};

export default AddItems;
