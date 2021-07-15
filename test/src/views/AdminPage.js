import React, { useState, useEffect } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
//table components
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TableHead from "@material-ui/core/TableHead";
// @material-ui/icons components
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
// import moment from "moment";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// custom styles for TPL
// import styles from "assets/jss/material-kit-react/views/commonStyles.js";
import PropTypes from "prop-types";
// const useStylesClasses = makeStyles(styles);
import '../styles.css';
const mytablestyles = makeStyles(theme => ({
    root: {
        width: "100%",
        marginTop: theme.spacing(3)
    },
    table: {
        minWidth: 500
    },
    tableWrapper: {
        overflowX: "auto",
        marginBottom: "50px"
    }
}));
const getLocalItems = () => {
    let list = localStorage.getItem('lists');
    if (list) {
        //console.log(JSON.parse(localStorage.getItem('lists')));
        return JSON.parse(localStorage.getItem('lists'));
    } else {
        return []
    }
};
export default function AdminPage() {
    const tables = mytablestyles();
    const [rows, setRows] = useState(getLocalItems());
    const [open, setOpen] = useState(false);
    const [tobeEditRow, setTobeEditRow] = useState([]);
    const [editId, setEditId] = useState(null);

    const deleteRow = (id) => {
        const updatedRows = rows.filter((row) => {
            return row.id !== id;
        })
        localStorage.setItem('lists', JSON.stringify(updatedRows));
        setRows(updatedRows);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const editRow = (id) => {
        let data = rows.find((elem) => {
            return elem.id === id;
        })
        setTobeEditRow(data);
        setOpen(true);
        setEditId(id);
    }

    const handleEditInputChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setTobeEditRow({ ...tobeEditRow, [name]: value })
    }
    const handleUpdate = (e) => {
        e.preventDefault();
            rows.map((row) => {
                if (row.id === editId) {
                    rows.shift(row);
                    rows.unshift(tobeEditRow);
                }
                setRows(rows);
                return row;
            })

        setOpen(false);
    }
//    console.log(rows);
    useEffect(() => {
        localStorage.setItem('lists', JSON.stringify(rows));
    }, [rows]);

    return (
        <Paper className={tables.root}>
            <div className={tables.tableWrapper}>
                <Table className={tables.table} aria-label="custom pagination table">
                    <TableHead>
                        <TableRow>
                            <TableCell>User ID</TableCell>
                            <TableCell>Full Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>UserName</TableCell>
                            <TableCell>Password</TableCell>
                            <TableCell>Operations</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(row => (
                            <TableRow key={row.id}>
                                <TableCell
                                    component="th"
                                    scope="row"
                                >
                                    {row.id}
                                </TableCell>
                                <TableCell>{row.fullname}</TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>{row.username}</TableCell>
                                <TableCell>{row.password}</TableCell>
                                <TableCell>
                                    <EditIcon color="primary" className="opt_icon" onClick={() => editRow(row.id)} />
                                    <DeleteIcon color="secondary" className="opt_icon" onClick={() => deleteRow(row.id)} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>

                        </TableRow>
                    </TableFooter>
                </Table>
            </div>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"

            >
                <DialogTitle id="alert-dialog-title">{"Update this infomation?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <form>

                            <div className="input_div">
                                <label>username</label>
                                <input type="text" autoComplete="off" value={tobeEditRow.username} onChange={handleEditInputChange} name="username" id="username" className="input_elm" autoComplete="off"></input>
                            </div>
                            <div className="input_div">
                                <label>password</label>
                                <input type="text" autoComplete="off" value={tobeEditRow.password} onChange={handleEditInputChange} name="password" id="password" className="input_elm" autoComplete="off"></input>
                            </div>
                            <div className="input_div">
                                <label>fullname</label>
                                <input type="text" autoComplete="off" value={tobeEditRow.fullname} onChange={handleEditInputChange} name="fullname" id="fullname" className="input_elm" autoComplete="off"></input>
                            </div>
                            <div className="input_div">
                                <label>email</label>
                                <input type="text" autoComplete="off" value={tobeEditRow.email} onChange={handleEditInputChange} name="email" id="email" className="input_elm" autoComplete="off"></input>
                            </div>
                        </form>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
          </Button>
                    <Button onClick={handleUpdate} color="primary" autoFocus>
                        Update
          </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
}

AdminPage.propTypes = {
    rows: PropTypes.array
};
