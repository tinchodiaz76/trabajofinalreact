import {React, useState, useEffect} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { Link } from "react-router-dom";
import { API } from "../../API";

/*
const baseURL = "https://jsonplaceholder.typicode.com/posts/1";
*/


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  fab: {
    position: 'absolute',
    bottom: "50px",
    right: "50px",
  }
});


const ListItems = () => {
    const classes = useStyles();

    const [products, setPost] = useState(null);

    useEffect(() => {
        API.get("/files").then((response) => {
        console.log(response.data.files);
        setPost(response.data.files);
        });
    }, []);

    if (!products) return null;
    
  return (
        <>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align="right">Producto</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((row) => (
                <TableRow key={row.id}>
                    <TableCell style={{marginLeft:"20px"}} align="right">
                      <Link to={'/item/'+row.id}>{row.id}</Link>
                      </TableCell>
                    <TableCell align="right">
                      <Link to={'/item/'+row.id}>{row.itemName}</Link>
                      </TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Link to={'/new'}>
          <Fab color="primary" aria-label="add" className={classes.fab}>
            <AddIcon />
          </Fab>
        </Link>
        </>
      );
    
}
 
export default ListItems
