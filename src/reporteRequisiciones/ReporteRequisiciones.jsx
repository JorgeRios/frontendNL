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

import { getAllRequisiciones } from "_api/requisicion";
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

const ReporteRequisicion = () => {
  const [data, setData] = useState([]);

  const openDeleteConfirmModal = (row) => {
    console.log("viendo row ", row);
  };

  useEffect(() => {
    const fillUp = async () => {
      const val = await getAllRequisiciones();
      setData(val);
    };
    fillUp();
  }, []);
  const navegarRequisicion = (id) => {
    history.navigate(`/requisicion/${id}`, { replace: true });
  };
  const navegarCrearCotizacion = (id) => {
    history.navigate(`/orden/${id}`, { replace: true });
  };
  //should be memoized or stable
  const columns = useMemo(
    () => [
      {
        accessorKey: "consecutivo", //access nested data with dot notation
        header: "Consecutivo",
        size: 150,
      },
      {
        accessorKey: "fecha",
        header: "Fecha",
        size: 150,
      },
      {
        accessorKey: "motivo", //normal accessorKey
        header: "Motivo",
        size: 200,
      },
      {
        accessorKey: "solicitante",
        header: "Solicitante",
        size: 150,
      },
      {
        accessorKey: "estatus",
        header: "Estatus",
        size: 150,
      },
      // {
      //   accessorKey: "name.lastName",
      //   header: "State",
      //   size: 150,
      // },
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
        {row.original.estatus === "autorizada" && (
          <Tooltip title="Generar Cotizacion">
            <Button
              color="success"
              onClick={() => {
                navegarCrearCotizacion(row.original.consecutivo);
              }}
            >
              Crear Orden de Compra
            </Button>
          </Tooltip>
        )}
        <Tooltip title="Ver Requisición">
          <Button
            color="info"
            onClick={() => {
              navegarRequisicion(row.original.consecutivo);
            }}
          >
            Ver Requisición
          </Button>
        </Tooltip>
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

export { ReporteRequisicion };
