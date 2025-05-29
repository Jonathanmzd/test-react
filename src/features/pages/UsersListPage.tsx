import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, CircularProgress } from '@mui/material';
import { DataGrid, type GridColDef, type GridPaginationModel } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../app/store';
import { setSkip, setLimit, setTotal } from '../paginacion/paginationSlice';
import { useGetUsersQuery } from '../users/usersApi';

const columns: GridColDef[] = [
  { field: 'firstName', headerName: 'First Name', flex: 1 },
  { field: 'lastName', headerName: 'Last Name', flex: 1 },
  { field: 'age', headerName: 'Age', type: 'number', flex: 0.5 },
  { field: 'email', headerName: 'Email', flex: 1.5 },
  { field: 'username', headerName: 'Username', flex: 1 },
];

export default function UsersListPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { limit, skip, total } = useSelector((state: RootState) => state.pagination);
  const { data, isError, isLoading, error } = useGetUsersQuery({ limit, skip });

  useEffect(() => {
    if (data?.total) {
      dispatch(setTotal(data.total));
    }
  }, [data, dispatch]);

  const handlePaginationModelChange = (model: GridPaginationModel) => {
    dispatch(setSkip(model.page * model.pageSize));
    dispatch(setLimit(model.pageSize));
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography color="error" variant="h6" align="center">
          {error instanceof Error ? error.message : 'Failed to load users.'}
        </Typography>
      </Box>
    );
  }

  if (!data?.users) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography color="error" variant="h6" align="center">
          No users found.
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
          rows={data.users}
          columns={columns}
          pagination
          paginationMode="server"
          rowCount={total}
          onPaginationModelChange={handlePaginationModelChange}
          getRowId={(row) => row.id}
          onRowClick={(params) => navigate(`/users/${params.id}`)}
          pageSizeOptions={[10, 20, 30, 50]}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: limit,
                page: skip / limit,
              },
            },
          }}
          sx={{
            '& .MuiDataGrid-iconSeparator': { display: 'inline' },
            '& .MuiDataGrid-sortIcon': { opacity: 1 },
          }}
        />
      </Box>
    </Box>
  );
}
