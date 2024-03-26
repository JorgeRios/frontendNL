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
import { useLocation } from "react-router-dom";

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
import { history } from "_helpers";
import { getPagoId, aplicarPago } from "_api/pago";
import { getAllTipoPagos } from "_api/tipopago";
import { getAllCuentaBancos } from "_api/cuentabanco";

import { userActions } from "_store";

export { AplicarPago };

const options = ["Option 1", "Option 2"];

const AplicarPago = ({ ...props }) => {
  const authStore = useSelector((state) => state.auth.user);
  const [flagModalError, setFlagModalError] = useState(false);
  const [msgModalError, setMsgModalError] = useState({});
  const [comentario, setComentario] = useState("");
  const [proveedor, setProveedor] = useState("");
  const [proveedorId, setProveedorId] = useState(0);
  const [rfc, setRfc] = useState("");
  const [total, setTotal] = useState("");
  const [factura, setFactura] = useState("");
  const [tipoPagoCatalogo, setTipoPagoCatalogo] = useState([]);
  const [cuentaBancoCatalogo, setCuentaBancoCatalogo] = useState([]);
  const [tipoPago, setTipoPago] = useState("");
  const [cuentaBanco, setCuentaBanco] = useState("");

  const handleChangeTipoPago = (event) => {
    setTipoPago(event.target.value);
    //formik.setFieldValue("ramo", event.target.value);
  };
  const handleChangeCuentaBanco = (event) => {
    setCuentaBanco(event.target.value);
    //formik.setFieldValue("ramo", event.target.value);
  };

  const handleMessageChange = (event) => {
    // 👇️ access textarea value
    setComentario(event.target.value);
    console.log(event.target.value);
  };

  console.log("viendo authStore ", authStore.permisos);

  useEffect(() => {});

  const { pathname } = useLocation();

  const { id } = useParams();

  let location = useLocation();
  console.log("ciendo uselocation ", location.pathname);

  const handleFecha = (event) => {
    let val = dayjs(event).format("DD/MM/YYYY");
    formik.setFieldValue("fecha", val);
  };

  const handleAplicarPago = async () => {
    console.log("tratando aplicar");
    try {
      const params = {
        pagoProveedorId: proveedorId,
        formaDePagoId: tipoPago,
        ejercicio: 2024,
        fecha: formik.values.fecha,
        refCuentaBancoId: cuentaBanco,
        folio: formik.values.folioCheque,
        concepto: formik.values.comentario,
        total: total,
        compraId: id,
      };
      const val = await aplicarPago(params);
      history.navigate("/pagos");
    } catch (e) {
      console.log("hubo error ", e);
    }
  };

  useEffect(() => {
    const fillData = async () => {
      const val = await getPagoId(id);
      console.log("viendo data jaja", val.data);
      setProveedor(val.data.Provedor);
      setProveedorId(val.data.ProveedorId);
      setFactura(val.data.FolioFactura);
      setTotal(val.data.Total);
      setRfc(val.data.RFC);
      if (location.search) {
        console.log("viendo val.data", val.data);
        setTipoPago(val.data.FormaDePagoId);
        setCuentaBanco(val.data.RefCuentaBancoId);
        formik.setFieldValue("folioCheque", val.data.FolioFactura);
        formik.setFieldValue("comentario", val.data.Concepto);
      }
    };
    fillData();
  }, [pathname]);

  useEffect(() => {
    const fillSelects = async () => {
      const val = await getAllTipoPagos();
      console.log("viendo val ", val);
      if (val) {
        setTipoPagoCatalogo(val);
      }
      const val2 = await getAllCuentaBancos();
      if (val2) {
        console.log("vald2 ", val2);
        setCuentaBancoCatalogo(val2);
      }
    };

    fillSelects();
  }, []);

  const formik = useFormik({
    initialValues: {
      fecha: "",
      estatus: "",
      departamento: "",
      ramo: "",
      folioCheque: "",
      comentario: "",
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
          {!location.search && <h2>Aplicar Pago</h2>}
          {location.search && <h2>Pago Proveedor</h2>}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ display: "flex", flexDirection: "column", width: "50%" }}>
          <MyInput
            label={"Proveedor"}
            fullWidth
            value={proveedor}
            placeholder="Consecutivo"
            onChange={formik.handleChange("consecutivo")}
            disabled
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <MyInput
            label={"RFC"}
            fullWidth
            value={rfc}
            placeholder="Consecutivo"
            onChange={formik.handleChange("consecutivo")}
            disabled
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flexBasis: "100%",
            flex: 1,
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
            <span style={{ marginTop: "5px", marginLeft: "5px" }}>
              <DatePicker
                disabled={location.search}
                defaultValue={dayjs(new Date())}
                onChange={handleFecha}
                errorr={
                  formik.touched.fecha && formik.errors.fecha !== undefined
                }
              />
            </span>
          </LocalizationProvider>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ display: "flex", flexDirection: "column", width: "50%" }}>
          <MyInput
            label={"Factura"}
            fullWidth
            value={factura}
            placeholder="Consecutivo"
            onChange={formik.handleChange("consecutivo")}
            disabled
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <MyInput
            label={"Total"}
            fullWidth
            value={total}
            placeholder="Consecutivo"
            onChange={formik.handleChange("consecutivo")}
            disabled
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <MyInput
            label={"Folio Cheque"}
            fullWidth
            value={formik.values.folioCheque}
            placeholder="Consecutivo"
            onChange={formik.handleChange("folioCheque")}
            disabled={location.search}
          />
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ display: "flex", flexDirection: "column", width: "50%" }}>
          <MySelect
            disabled={location.search}
            style={{
              padding: "5px",
              display: "flex",
              width: "100%",
            }}
            onChange={handleChangeTipoPago}
            value={tipoPago}
            label={"Forma De Pago"}
            data={tipoPagoCatalogo}
            error={
              formik.touched.departamento &&
              formik.errors.departamento !== undefined
            }
            helperText={formik.errors.departamento}
            fullWidth
            required
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", width: "50%" }}>
          <MySelect
            disabled={location.search}
            style={{
              padding: "5px",
              display: "flex",
              width: "100%",
            }}
            onChange={handleChangeCuentaBanco}
            value={cuentaBanco}
            label={"Cuenta Banco / Efectivo"}
            data={cuentaBancoCatalogo}
            error={
              formik.touched.departamento &&
              formik.errors.departamento !== undefined
            }
            helperText={formik.errors.departamento}
            fullWidth
            required
          />
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ display: "flex", flexDirection: "column", width: "50%" }}>
          <MyInput
            disabled={location.search}
            label={"Comentario"}
            fullWidth
            value={formik.values.comentario}
            placeholder="Comentario"
            onChange={formik.handleChange("comentario")}
          />
        </div>
      </div>

      {!location.search && (
        <div style={{ marginTop: "10px" }}>
          <Button onClick={handleAplicarPago} variant="contained" color="info">
            Aplicar Pago
          </Button>
        </div>
      )}
    </form>
  );
};
