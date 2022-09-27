import React, { useMemo } from "react";
import { useTable, usePagination } from "react-table";
import { GrPrevious, GrNext } from "react-icons/gr";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";
const DataTable = ({ COLUMNS, DATA }) => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => DATA, []);
  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: { pageSize: 20 },
    },
    usePagination
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    previousPage,
    nextPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    state: { pageIndex },
    prepareRow,
  } = tableInstance;
  let product_id;
  let style_id;
  return (
    <>
      <Table {...getTableProps()} size='md'>
        <Thead bg='linkedin.400'>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((colums) => (
                <Th {...colums.getHeaderProps()} color='gray.100'>
                  {colums.render("Header")}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  if (cell.column.id !== "actions") {
                    return (
                      <Td {...cell.getCellProps()} className='border text-xs'>
                        {cell.render("Cell")}
                      </Td>
                    );
                  } else {
                    return (
                      <Td {...cell.getCellProps()} className='border text-xs'>
                        <a href='google.com'>{cell.render("Cell")}</a>
                      </Td>
                    );
                  }
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <div className='flex w-full justify-end p-2 mt-1 text-xs'>
        <span>
          page {pageIndex + 1} of {pageOptions.length}
        </span>
        <button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className='text-sm mx-2'
        >
          <GrPrevious />
        </button>
        <button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className='text-sm'
        >
          <GrNext />
        </button>
      </div>
    </>
  );
};

export default DataTable;
