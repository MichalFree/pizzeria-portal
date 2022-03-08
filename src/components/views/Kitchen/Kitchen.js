import React from 'react';
import styles from './Kitchen.module.scss';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const demoContent = [

  { id: '3', status: 'ordered', nextStatus: 'bon apetit', details: 'water', order: 123 },
  { id: '4', status: 'ready', nextStatus: 'ordered', details: 'pizza diabolo', order: 234 },
  { id: '5', status: 'ordered', nextStatus: 'bon apetit', details: 'pizza-burgerito', order: 345 },
  { id: '6', status: 'new', nextStatus: 'preparing', details: 'pizza hawaii x2 / pizza-burgetito extra onion', order: 456 },
  { id: '1', status: 'new', nextStatus: 'preparing', details: 'pizza margeritha + double cheese', order: 567 },
  { id: '2', status: 'preparing', nextStatus: 'ready', details: 'pizza vege', order: 678 },
  { id: '7', status: 'new', nextStatus: 'preparing', details: 'sprite ', order: 789 },
];

const renderActions = nextStatus => {
  switch (nextStatus) {
    case 'new':
    case 'preparing':
    case 'ready':
    case 'ordered':
    default:
      return (
        <Button>{nextStatus}</Button>
      );
  }
};

const Kitchen = () => (
  <div>
    <div className={styles.component}>
      <h2>Kitchen</h2>
    </div>
    <Paper className={styles.component}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Order</TableCell>
            <TableCell>Table</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Details</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {demoContent.map(row => (
            <TableRow key={row.id}>
              <TableCell>
                {row.order}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell>
                {row.status}
              </TableCell>
              <TableCell>
                {row.details}
              </TableCell>
              <TableCell>
                {renderActions(row.nextStatus)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  </div>
);

export default Kitchen;
