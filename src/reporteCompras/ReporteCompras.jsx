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

import { getAllOrderCompra } from "_api/orden";
import { getAllCompras } from "_api/compra";
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

const ReporteCompras = () => {
  const [data, setData] = useState([]);

  const openDeleteConfirmModal = (row) => {
    console.log("viendo row ", row);
  };

  useEffect(() => {
    const fillUp = async () => {
      const val = await getAllCompras();
      setData(val);
    };
    fillUp();
  }, []);
  const navegarRequisicion = (id) => {
    history.navigate(`/compra/${id}`, { replace: true });
  };
  const navegarAuthorizarPago = (id) => {
    history.navigate(`/autorizarpago/${id}`, { replace: true });
  };
  const navegarAplicarPago = (id) => {
    history.navigate(`/aplicarpago/${id}`, { replace: true });
  };
  //should be memoized or stable
  const columns = useMemo(
    () => [
      {
        accessorKey: "consecutivo", //access nested data with dot notation
        header: "Consecutivo comprass",
        size: 150,
      },
      {
        accessorKey: "Proveedor",
        header: "Proveedor",
        size: 150,
      },
      {
        accessorKey: "RFC",
        header: "RFC",
        size: 150,
      },
      {
        accessorKey: "Status", //normal accessorKey
        header: "Estatus",
        size: 50,
      },
      {
        accessorKey: "Fecha",
        header: "Fecha",
        size: 150,
      },
      {
        accessorKey: "PagoId",
        header: "Pago",
        size: 100,
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

        <Tooltip title="Ver Compra">
          <Button
            color="info"
            onClick={() => {
              navegarRequisicion(row.original.requisicionId);
            }}
          >
            Ver Compra
          </Button>
        </Tooltip>
        {row.original.Status === "A" && !row.original.PagoId && (
          <Tooltip title="Autorizar Pago">
            <Button
              color="success"
              onClick={() => {
                navegarAuthorizarPago(row.original.consecutivo);
                //navegarRequisicion(row.original.requisicionId);
              }}
            >
              Autorizar Pago
            </Button>
          </Tooltip>
        )}
        {row.original.Status === "A" && row.original.PagoId && (
          <Tooltip title="Aplicar Pago">
            <Button
              color="secondary"
              onClick={() => {
                navegarAplicarPago(row.original.consecutivo);
                //navegarRequisicion(row.original.requisicionId);
              }}
            >
              Aplicar Pago
            </Button>
          </Tooltip>
        )}
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

export { ReporteCompras };
