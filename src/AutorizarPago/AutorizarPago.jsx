import { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { MyInput } from "_components/MyInput";
import MyTextArea from "_components/MyTextArea";
import MySelect from "_components/MySelect";
import MyModal from "_components/Mymodal";
import MymodalError from "_components/MymodalError";
import MyAutoComplete from "_components/MyAutoComplete";
import BasicTable from "_components/MyTable";
import { authReducer } from "_store/auth.slice";
import UploadFile from "_components/MyUploadFile";

import {
  createRequisicion,
  getRequisicionId,
  updateStateRequisicion,
} from "_api/requisicion";
import { getRamoCatalogo } from "_api/ramo";
import { getDepartamentoCatalogo } from "_api/departamento";
import { getGrupoProductoCatalogo } from "_api/grupoProducto";
import { getDependenciaCatalogo } from "_api/dependencia";
import { getProyectoCatalogo } from "_api/proyecto";
import { getAlmacenCatalogo } from "_api/almacen";
import { getProductoCatalogo } from "_api/producto";
import { getUnidadDeMedidaCatalogo } from "_api/unidaddemedida";
import { getCuentaPrespuestal } from "_api/cuentapresupuestal";
import { useParams } from "react-router";
import {
  Box,
  Button,
  Grid,
  InputLabel,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";

import { styled } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import Stack from "@mui/material/Stack";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/es";
import dayjs from "dayjs";
import { useLocation } from "react-router-dom";
import { history } from "_helpers";
import { getPagoId, autorizarPago } from "_api/pago";

import { userActions } from "_store";

export { AutorizarPago };

const options = ["Option 1", "Option 2"];

const AutorizarPago = ({ ...props }) => {
  const authStore = useSelector((state) => state.auth.user);
  const [flagModalError, setFlagModalError] = useState(false);
  const [msgModalError, setMsgModalError] = useState({});
  const [comentario, setComentario] = useState("");
  const [proveedor, setProveedor] = useState("");
  const [rfc, setRfc] = useState("");
  const [total, setTotal] = useState("");
  const [factura, setFactura] = useState("");

  const handleMessageChange = (event) => {
    // 👇️ access textarea value
    setComentario(event.target.value);
    console.log(event.target.value);
  };

  console.log("viendo authStore ", authStore.permisos);

  useEffect(() => {});

  const { pathname } = useLocation();

  const { id } = useParams();

  const handleActualizarPago = async () => {
    var now = dayjs();
    let fecha = dayjs(now).format("DD/MM/YYYY");
    const params = {
      CompraId: id,
      Fecha: fecha,
      FechaPagoProgramado: fecha,
      Importe: total,
      Status: "A",
      Observaciones: comentario,
    };
    let val = await autorizarPago(params);
    if (val.data) {
      history.navigate("/compras");
    }
  };

  useEffect(() => {
    const fillData = async () => {
      const val = await getPagoId(id);
      console.log(val.data);
      setProveedor(val.data.Provedor);
      setFactura(val.data.FolioFactura);
      setTotal(val.data.Total);
      setRfc(val.data.RFC);
    };
    fillData();
  }, [pathname]);

  const formik = useFormik({
    initialValues: {
      fecha: "",
      estatus: "",
      departamento: "",
      ramo: "",
    },
    validationSchema: Yup.object({
      fecha: Yup.string()
        .max(10, "Debe ser una fecha correcta")
        .required("Required"),
      estatus: Yup.string()
        .max(10, "tiene que tener un estatus correcto")
        .required("Required"),
      departamento: Yup.string("Debes seleccionar un departamento").required(
        "required"
      ),
      ramo: Yup.string("Debe de seleccionar un ramo").required("required"),
    }),
    onSubmit: async (values) => {
      console.log("viendo el form", values);
      try {
        console.log("aca");
      } catch (error) {
        if (error.response.status === 404) {
          setFlagModalError(true);
          setMsgModalError(error);
          return;
        }
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h2>Autorizar Pago</h2>
        </div>
      </div>

      <div style={{ marginTop: "10px" }}>
        <MyInput
          label={"Proveedor"}
          fullWidth
          value={proveedor}
          placeholder="Consecutivo"
          onChange={formik.handleChange("consecutivo")}
          disabled
        />
        <MyInput
          label={"RFC"}
          fullWidth
          value={rfc}
          placeholder="Consecutivo"
          onChange={formik.handleChange("consecutivo")}
          disabled
        />
        <MyInput
          label={"Factura"}
          fullWidth
          value={factura}
          placeholder="Consecutivo"
          onChange={formik.handleChange("consecutivo")}
          disabled
        />
        <MyInput
          label={"Total"}
          fullWidth
          value={total}
          placeholder="Consecutivo"
          onChange={formik.handleChange("consecutivo")}
          disabled
        />
        <MyTextArea
          value={comentario}
          placeholder={"comentario"}
          onChange={handleMessageChange}
          style={id ? { color: "gray" } : {}}
        />
        <Button onClick={handleActualizarPago} variant="contained" color="info">
          Autorizar Pago
        </Button>
      </div>
    </form>
  );
};
