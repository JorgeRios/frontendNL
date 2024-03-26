import { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { MyInput } from "_components/MyInput";
import MyTextArea from "_components/MyTextArea";
import MySelect from "_components/MySelect";
import { history } from "_helpers";

import {
  MaterialReactTable,
  useMaterialReactTable,
  getMRT_RowSelectionHandler,
} from "material-react-table";

import { getAllPagos } from "_api/pago";
import {
  Grid,
  InputLabel,
  Paper,
  TextField,
  Typography,
  useTheme,
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { userActions } from "_store";

const ReportePagos = () => {
  const [data, setData] = useState([]);

  const openDeleteConfirmModal = (row) => {
    console.log("viendo row ", row);
  };

  useEffect(() => {
    const fillUp = async () => {
      const val = await getAllPagos();
      console.log("si es este");
      setData(val);
    };
    fillUp();
  }, []);
  const navegarAplicarPago = (id) => {
    history.navigate(`/aplicarpago/${id}?solover=true`, {
      replace: true,
      soloVer: true,
    });
  };
  const navegarRequisicion = (id) => {
    history.navigate(`/ordencompra/${id}`, { replace: true });
  };
  const navegarAuthorizarPago = (id) => {
    history.navigate(`/autorizarpago/${id}`, { replace: true });
  };
  //should be memoized or stable
  const columns = useMemo(
    () => [
      {
        accessorKey: "CompraId", //access nested data with dot notation
        header: "Compra Id",
        size: 150,
      },
      {
        accessorKey: "RFC",
        header: "RFC",
        size: 150,
      },
      {
        accessorKey: "Proveedor",
        header: "Proveedor",
        size: 150,
      },
      {
        accessorKey: "FolioFactura",
        header: "Folio Factura",
        size: 150,
      },
      {
        accessorKey: "Total",
        header: "Total",
        size: 150,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data,
    createDisplayMode: "modal", //default ('row', and 'custom' are also available)
    editDisplayMode: "modal", //default ('row', 'cell', 'table', and 'custom' are also available)
    enableEditing: true,
    getRowId: (row) => row.id,
    /*muiTableBodyRowProps: ({ row }) => ({
      onClick: (event) => {
        console.log(
          "this is row ",
          row.getValue("consecutivo"),
          row.getValue("fecha")
        );
        navegar(row.getValue("consecutivo"));
      },
      sx: {
        cursor: "pointer", //you might want to change the cursor too when adding an onClick
      },
    }),*/
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        {/* <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip> */}

        <Tooltip title="Ver Pago">
          <Button
            color="info"
            onClick={() => {
              navegarAplicarPago(row.original.CompraId);
            }}
          >
            Ver Pago
          </Button>
        </Tooltip>
        {/* <Tooltip title="Autorizar Pago">
          {row.original.Status === "A" && (
            <Button
              color="success"
              onClick={() => {
                navegarAuthorizarPago(row.original.consecutivo);
                //navegarRequisicion(row.original.requisicionId);
              }}
            >
              Autorizar Pago
            </Button>
          )}
        </Tooltip> */}
        {/* <Tooltip title="Delete">
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip> */}
      </Box>
    ),
  });

  return <MaterialReactTable table={table} />;
};

export { ReportePagos };
