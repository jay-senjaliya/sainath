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
import destinationService from '../services/destinationService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmationDialog from '../components/ConfirmationDialog';
import axios from 'axios';
import { usePackageContext } from '../context/PackageContext';

const DestinationList = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(0);
  const [destinationlist, setDestinationlist] = useState();
  const context = usePackageContext();
  const { setLoading } = context;

  useEffect(() => {
    destinationService
      .GetAllDestination()
      .then((res) => {
        setDestinationlist(res.data.data);
      })
      .catch((err) => {
        toast.error(err.message, { position: 'bottom-right' });
      });
  }, []);

  const handleDelete = (id) => {
    destinationService
      .DeleteDestination(id)
      .then((res) => {
        setOpen(false);
        setDestinationlist(destinationlist.filter((el) => el._id !== id));
        console.log(res.data.message);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const columns = [
    { id: 'name', label: 'Package Name', minWidth: 100 },
    { id: 'description', label: 'Description', minWidth: 100 },
    { id: 'category', label: 'Category', minWidth: 100 },
    { id: 'createdAt', label: 'Crated At', minWidth: 100 },
  ];
  return (
    <>
      {/* {!destinationlist && setLoading(true)}
      {destinationlist && setLoading(false)} */}

      <h1 className="text-center pt-3">Destination List</h1>
      <div
        className="destination-list-page container"
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
            onClick={() => navigate('/add-destination')}
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
                {destinationlist?.map((destinationItem, index) => {
                  return (
                    <TableRow
                      key={index}
                      style={{ fontSize: 14, color: '#212121' }}
                    >
                      <TableCell align="left">{destinationItem.name}</TableCell>
                      <TableCell align="left">
                        {`${destinationItem.description.slice(0, 25)}...`}
                      </TableCell>
                      <TableCell align="left">
                        {destinationItem.category}
                      </TableCell>
                      {/* <TableCell align="left">
                        {destinationItem.startingPrice}
                      </TableCell> */}
                      <TableCell align="left">
                        {destinationItem.createdAt}
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
                            navigate(`/edit-destination/${destinationItem._id}`)
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
                            setId(destinationItem._id);
                            setOpen(true);
                          }}
                        >
                          Delete
                        </button>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {destinationlist?.length === 0 && (
                  <TableRow className="w-100">
                    <TableCell align="center" colSpan={4}>
                      No Destination Found..
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
          title="Delete Destination"
          description="Are you sure you want to delete this destination?"
        />
      </div>
    </>
  );
};

export default DestinationList;
