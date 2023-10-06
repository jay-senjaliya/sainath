import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePackageContext } from '../context/PackageContext';
import vehicleService from '../services/vehicleService';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import ConfirmationDialog from '../components/ConfirmationDialog';
import fixedDepartureService from '../services/fixedDepartureService';

const FixedDepartureList = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(0);

  const packageContext = usePackageContext();
  const { fixedDepartureData, updateFixedDepartureData } = packageContext;

  useEffect(() => {
    updateFixedDepartureData();
  }, [fixedDepartureData]);

  const handleDelete = (id) => {
    fixedDepartureService
      .DeleteFixedDeparture(id)
      .then((res) => {
        setOpen(false);
        updateFixedDepartureData(
          fixedDepartureData.filter((el) => el._id !== id)
        );
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const columns = [
    { id: 'package', label: 'Package', minWidth: 100 },
    { id: 'price', label: 'Price', minWidth: 100 },
  ];
  return (
    <>
      <h1
        className="text-center pt-3"
        style={{ fontFamily: "'Nunito', sans", fontWeight: 700 }}
      >
        Fixed Departure List
      </h1>
      <div
        className="package-list-page container"
        style={{ marginTop: 45, fontFamily: "'Roboto', sans-serif" }}
      >
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search..."
            aria-label="Search"
            style={{
              width: 300,
              height: 40,
              color: 'rgb(65,65,65)',
              borderRadius: 0,
            }}
            // value={filters.keyword}
            // onChange={(e) => {
            //   setFilters({
            //     ...filters,
            //     keyword: e.target.value,
            //     pageIndex: 1,
            //   });
            // }}
          />
          <button
            className="btn"
            style={{
              width: 100,
              height: 40,
              color: 'white',
              backgroundColor: '#F58634',
              borderRadius: 0,
            }}
            onClick={() => navigate('/add-fixed-departure')}
          >
            Add
          </button>
        </div>
        <div style={{ marginTop: 32, marginBottom: 80 }}>
          <TableContainer>
            <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => {
                    return (
                      <TableCell
                        key={column.id}
                        style={{
                          minWidth: column.minWidth,
                          fontWeight: 600,
                          fontSize: 14,
                          color: '#212121',
                        }}
                      >
                        {column.label}
                      </TableCell>
                    );
                  })}
                  <TableCell style={{ width: 10 }}> </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {fixedDepartureData?.map((fixedDepartureItem, index) => {
                  return (
                    <TableRow
                      key={index}
                      style={{ fontSize: 14, color: '#212121' }}
                    >
                      <TableCell align="left">
                        {fixedDepartureItem.package.name}
                      </TableCell>
                      <TableCell align="left">
                        {fixedDepartureItem?.price}
                      </TableCell>
                      <TableCell align="right" style={{ width: 250 }}>
                        <button
                          className="btn"
                          style={{
                            border: '2px solid #80BF32',
                            color: '#80BF32',
                            marginRight: 10,
                            width: 80,
                            height: 30,
                            padding: '3px 10px',
                          }}
                          onClick={() =>
                            navigate(
                              `/edit-fixed-departure/${fixedDepartureItem._id}`
                            )
                          }
                        >
                          Edit
                        </button>
                        <button
                          className="btn"
                          style={{
                            border: '2px solid #f14d54',
                            color: '#f14d54',
                            width: 80,
                            height: 30,
                            padding: 3,
                          }}
                          onClick={() => {
                            setId(fixedDepartureItem._id);
                            setOpen(true);
                          }}
                        >
                          Delete
                        </button>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {fixedDepartureData?.length === 0 && (
                  <TableRow className="w-100">
                    <TableCell align="center" colSpan={4}>
                      No Fixed Departure Found..
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <ConfirmationDialog
          open={open}
          onClose={() => setOpen(false)}
          onConfirm={() => handleDelete(id)}
          title="Delete Fixed Departure"
          description="Are you sure you want to delete this fixed departure?"
        />
      </div>
    </>
  );
};

export default FixedDepartureList;
