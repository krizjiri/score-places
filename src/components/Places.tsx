import MuiTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useQuery } from '@tanstack/react-query';
import { fetchPlaces } from '../utils/fetchPlaces.ts';
import { CircularProgress } from '@mui/material';
import PlacesSelect from './PlacesSelect.tsx';
import { useState } from 'react';

const Places = () => {
  const [searchFilter, setSearchFilter] = useState<string>('restaurant');

  const { data, isLoading } = useQuery({
    queryKey: ['places', searchFilter],
    queryFn: () => fetchPlaces({ searchFilter }),
  });

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <>
      <PlacesSelect value={searchFilter} onChange={setSearchFilter} />
      <TableContainer component={Paper}>
        <MuiTable sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Rating</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.rating}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </MuiTable>
      </TableContainer>
    </>
  );
};

export default Places;
