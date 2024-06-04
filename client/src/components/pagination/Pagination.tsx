import React, { useEffect, useState } from 'react';
import TablePagination from '@mui/material/TablePagination';
import axios from 'axios';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const [data, setData] = useState<any[]>([]); // State to store fetched data

  useEffect(() => {
    fetchData();
  }, [currentPage]); // Fetch data whenever currentPage changes

  const fetchData = async () => {
    try {
      const response = await axios.get(`your_api_endpoint?${currentPage}${itemsPerPage}`);
      setData(response.data); // Update data state with fetched data
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    onPageChange(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    // You can handle rows per page change here if needed
  };

  return (
    <div>
      {/* Your data rendering logic goes here */}
      <TablePagination
        component="div"
        count={totalItems}
        page={currentPage}
        onPageChange={handleChangePage}
        rowsPerPage={itemsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default Pagination;
