import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../app/store';
import { setSkip, setLimit, setTotal } from '../paginacion/paginationSlice';
import { useGetUsersQuery } from '../users/usersApi';

export default function UsersListPage() {
  const dispatch = useDispatch();
  const { limit, skip, total } = useSelector((state: RootState) => state.pagination);
  const { data, isError } = useGetUsersQuery({ limit, skip });
  const navigate = useNavigate();

  // Update total users in Redux when data is fetched
  useEffect(() => {
    if (data?.total) {
      dispatch(setTotal(data.total));
    }
  }, [data, dispatch]);

  // Define columns for the DataGrid
  const columns: GridColDef[] = [
    { field: 'firstName', headerName: 'First Name', flex: 1 },
    { field: 'lastName', headerName: 'Last Name', flex: 1 },
    { field: 'age', headerName: 'Age', type: 'number', flex: 0.5 },
    { field: 'email', headerName: 'Email', flex: 1.5 },
    { field: 'username', headerName: 'Username', flex: 1 },
  ];

  // Handle error or empty data
  if (isError || !data) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography color="error" variant="h6" align="center">
          Failed to load users.
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Users List
      </Typography>
      <Box sx={{ height: { xs: 400, sm: 500 }, width: '100%' }}>
        <DataGrid
          rows={data?.users || []}
          columns={columns}
          pagination
          paginationMode="server"
          rowCount={total}
          onPaginationModelChange={(model) => {
            dispatch(setSkip(model.page * model.pageSize));
            dispatch(setLimit(model.pageSize));
          }}
          getRowId={(row) => row.id}
          onRowClick={(params) => navigate(`/users/${params.id}`)}
          sx={{
            '& .MuiDataGrid-iconSeparator': {
              display: 'inline',
            },
            '& .MuiDataGrid-sortIcon': {
              opacity: 1,
            },
          }}
        />
      </Box>
    </Box>
  );
}
