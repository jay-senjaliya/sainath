import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import packageService from '../services/packageService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmationDialog from '../components/ConfirmationDialog';
import axios from 'axios';
import { usePackageContext } from '../context/PackageContext';

const PackageList = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(0);

  const packageContext = usePackageContext();
  const { packageData, updatePackageData, setLoading } = packageContext;

  useEffect(() => {
    // setLoading(true);
    updatePackageData();
    // setLoading(false);
    console.log(packageData);
    // packageService
    //   .GetAllPackage()
    //   .then((res) => {
    //     setPackagelist(res.data.data);
    //   })
    //   .catch((err) => {
    //     toast.error(err.message, { position: 'bottom-right' });
    //   });
  }, []);

  const handleDelete = (id) => {
    setLoading(true);
    packageService
      .DeletePackage(id)
      .then((res) => {
        setLoading(false);
        setOpen(false);
        updatePackageData(packageData.filter((el) => el._id !== id));
        // setPackagelist(packagelist.filter((el) => el._id !== id));
        // console.log(res.data.message);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const columns = [
    { id: 'name', label: 'Package Name', minWidth: 100 },
    { id: 'packageType', label: 'Package Type', minWidth: 100 },
    { id: 'code', label: 'Booking Code', minWidth: 100 },
    { id: 'startingPrice', label: 'Price', minWidth: 100 },
    { id: 'createdAt', label: 'Crated At', minWidth: 100 },
  ];
  return (
    <>
      {!packageData.length && setLoading(true)}
      {packageData.lrngth && setLoading(false)}
      <h1 className="text-center pt-3">Package List</h1>
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
              backgroundColor: '#f14d54',
              borderRadius: 0,
            }}
            onClick={() => navigate('/add-package')}
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
                {packageData?.map((packageItem, index) => {
                  return (
                    <TableRow
                      key={index}
                      style={{ fontSize: 14, color: '#212121' }}
                    >
                      <TableCell align="left">{packageItem.name}</TableCell>
                      <TableCell align="left">
                        {packageItem.packageType}
                      </TableCell>
                      <TableCell align="left">{packageItem.code}</TableCell>
                      <TableCell align="left">
                        {packageItem.startingPrice}
                      </TableCell>
                      <TableCell align="left">
                        {packageItem.createdAt}
                      </TableCell>
                      <TableCell align="right" style={{ width: 250 }}>
                        <button
                          className="btn"
                          style={{
                            border: '2px solid #F58634',
                            color: '#F58634',
                            marginRight: 10,
                            width: 80,
                            height: 30,
                            padding: '3px 10px',
                          }}
                          onClick={() =>
                            navigate(`/edit-package/${packageItem._id}`)
                          }
                        >
                          Edit
                        </button>
                        <button
                          className="btn"
                          style={{
                            border: '2px solid #5d3830',
                            color: '#5d3830',
                            width: 80,
                            height: 30,
                            padding: 3,
                          }}
                          onClick={() => {
                            setId(packageItem._id);
                            setOpen(true);
                          }}
                        >
                          Delete
                        </button>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {packageData?.length === 0 && (
                  <TableRow className="w-100">
                    <TableCell align="center" colSpan={4}>
                      No Package Found..
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          {/* <div style={{ margin: '40px auto 80px auto' }}>
            <TablePagination
              rowsPerPageOptions={[2, 5, 10, 100]}
              component="div"
              count={bookRecords.totalItems}
              rowsPerPage={filters.pageSize || 0}
              page={filters.pageIndex - 1}
              onPageChange={(e, newPage) => {
                setFilters({ ...filters, pageIndex: newPage + 1 });
              }}
              onRowsPerPageChange={(e) => {
                setFilters({
                  ...filters,
                  pageIndex: 1,
                  pageSize: Number(e.target.value),
                });
              }}
            />
          </div> */}
        </div>
        <ConfirmationDialog
          open={open}
          onClose={() => setOpen(false)}
          onConfirm={() => handleDelete(id)}
          title="Delete Package"
          description="Are you sure you want to delete this package?"
        />
      </div>
    </>
  );
};

export default PackageList;
