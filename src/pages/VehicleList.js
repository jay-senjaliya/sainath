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

const VehicleList = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(0);

  const packageContext = usePackageContext();
  const { vehicleData, updateVehicleData } = packageContext;

  useEffect(() => {
    updateVehicleData();
    console.log(vehicleData);
  }, []);

  const handleDelete = (id) => {
    vehicleService
      .DeleteVehicle(id)
      .then((res) => {
        setOpen(false);
        updateVehicleData(vehicleData.filter((el) => el._id !== id));
        // setPackagelist(packagelist.filter((el) => el._id !== id));
        // console.log(res.data.message);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const columns = [
    { id: 'name', label: 'Vehicle Name', minWidth: 100 },
    { id: 'price', label: 'Price per KM', minWidth: 100 },
    { id: 'category', label: 'Category', minWidth: 100 },
  ];
  return (
    <>
      <h1
        className="text-center pt-3"
        style={{ fontFamily: "'Nunito', sans", fontWeight: 700 }}
      >
        Vehicle List
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
            onClick={() => navigate('/add-vehicle')}
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
                {vehicleData?.map((vehicleItem, index) => {
                  return (
                    <TableRow
                      key={index}
                      style={{ fontSize: 14, color: '#212121' }}
                    >
                      <TableCell align="left">{vehicleItem.name}</TableCell>
                      <TableCell align="left">{vehicleItem?.price}</TableCell>
                      <TableCell align="left">
                        {vehicleItem?.category}
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
                            navigate(`/edit-vehicle/${vehicleItem._id}`)
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
                            setId(vehicleItem._id);
                            setOpen(true);
                          }}
                        >
                          Delete
                        </button>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {vehicleData?.length === 0 && (
                  <TableRow className="w-100">
                    <TableCell align="center" colSpan={4}>
                      No Vehicle Found..
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
          title="Delete Vehicle"
          description="Are you sure you want to delete this vehicle?"
        />
      </div>
    </>
  );
};

export default VehicleList;
