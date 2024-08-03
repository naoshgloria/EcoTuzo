// src/components/ShopTable.tsx
import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { visuallyHidden } from '@mui/utils';
import { useMutation, useQueryClient } from 'react-query';
import { MdDeleteForever, MdEdit } from 'react-icons/md';
import * as apiClient from '../api-client';

interface Data {
  _id: string;
  name: string;
  city: string;
  country: string;
  type: string;
  bottleCode: string;
  rating: number;
  payment: number;
  collection: number;
  location: string;
  adminId: string; // Added admin ID field
}

const headCells: readonly { id: keyof Data; numeric: boolean; disablePadding: boolean; label: string }[] = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Shop Name' },
  { id: 'city', numeric: false, disablePadding: false, label: 'City' },
  { id: 'country', numeric: false, disablePadding: false, label: 'Country' },
  { id: 'type', numeric: false, disablePadding: false, label: 'Type' },
  { id: 'bottleCode', numeric: false, disablePadding: false, label: 'Bottle Code' },
  { id: 'rating', numeric: true, disablePadding: false, label: 'Rating' },
  { id: 'payment', numeric: true, disablePadding: false, label: 'Payment' },
  { id: 'collection', numeric: true, disablePadding: false, label: 'Collection' },
  { id: 'location', numeric: false, disablePadding: false, label: 'Location' },
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(order: Order, orderBy: Key): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array?.map((el, index) => [el, index] as [T, number]);
  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis?.map((el) => el[0]);
}

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all shops' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
  onDelete: () => void;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected, onDelete } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
          Shops
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={onDelete}>
            <MdDeleteForever />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Edit">
          <IconButton>
            <MdEdit />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}
interface Shop {
    _id:string;
    name: string;
    city: string;
    country: string;
    type: string;
    bottleCode: string;
    rating: number;
    payment: number;
    collection: number;
    location: string;
    adminId: string; 
  }
interface ShopTableProps {
  shops: Shop[];
}

const Admin2: React.FC<ShopTableProps> = ({ shops }) => {
  const queryClient = useQueryClient();
  const mutation = useMutation((id: string) => apiClient.deleteShop(id), {
    onSuccess: () => {
      queryClient.invalidateQueries('shops');
      console.log("success")
    },
    onError:(error) =>{
        console.log("Error in the House" + error)
    }
  });

  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('name');
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = shops.map((shop) => shop?._id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  };

  const handleDelete = () => {
    selected.forEach((id) => mutation.mutate(id));
    setSelected([]);
  };

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  const sortedShops = stableSort(shops, getComparator(order, orderBy));
  const paginatedShops = sortedShops?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Paper sx={{ width: '100%', mb: 2 }}>
      <EnhancedTableToolbar numSelected={selected.length} onDelete={handleDelete} />
      <TableContainer>
        <Table>
          <EnhancedTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            onSelectAllClick={handleSelectAllClick}
            rowCount={shops?.length}
          />
          <TableBody>
            {paginatedShops?.map((shop) => {
              const isItemSelected = isSelected(shop?._id);
              const labelId = `enhanced-table-checkbox-${shop?._id}`;

              return (
                <TableRow
                  hover
                  onClick={() => handleClick(shop?._id)}
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={shop._id}
                  selected={isItemSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isItemSelected}
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </TableCell>
                  <TableCell component="th" id={labelId} scope="row" padding="none">
                    {shop?.name}
                  </TableCell>
                  <TableCell>{shop?.city}</TableCell>
                  <TableCell>{shop?.country}</TableCell>
                  <TableCell>{shop?.type}</TableCell>
                  <TableCell>{shop?.bottleCode}</TableCell>
                  <TableCell align="right">{shop?.rating}</TableCell>
                  <TableCell align="right">{shop?.payment}</TableCell>
                  <TableCell align="right">{shop?.collection}</TableCell>
                  <TableCell>{shop?.location}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={shops?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default Admin2;
