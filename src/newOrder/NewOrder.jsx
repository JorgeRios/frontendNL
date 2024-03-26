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

import { userActions } from "_store";

export { NewOrder };

const options = ["Option 1", "Option 2"];

const NewOrder = ({ ...props }) => {
  const [reqId, setReqId] = useState(null);
  const [fecha, setFecha] = React.useState("");
  const [fechaEntrega, setFechaEntrega] = React.useState("");
  const [estatus, setEstatus] = React.useState("");
  const [departamento, setDepartamento] = React.useState("");
  const [ramo, setRamo] = React.useState("");
  const [motivo, setMotivo] = React.useState("");
  const [grupoProd, setGrupoProd] = React.useState("");
  const [oficinaEntrega, setOficinaEntrega] = React.useState("");
  const [direccion, setDireccion] = React.useState("");
  const [proyecto, setProyecto] = React.useState("");
  const [ramoData, setRamoData] = React.useState([]);
  const [consecutivo, setConsecutivo] = React.useState("");
  const [value, setValue] = React.useState(options[0]);
  const [tipoGasto, setTipoGasto] = React.useState("");
  const [productos, setProductos] = React.useState([]);
  const [productoAux, setProductoAux] = React.useState({});
  const [comentario, setComentario] = React.useState("");
  const [archivo, setArchivo] = React.useState("");
  const authStore = useSelector((state) => state.auth.user);
  const [flagModalError, setFlagModalError] = useState(false);
  const [msgModalError, setMsgModalError] = useState({});
  const [order, setOrder] = useState({});
  const [ramoCatalogo, setRamoCatalogo] = useState([]);
  const [departamentoCatalogo, setDepartamentoCatalogo] = useState([]);
  const [grupoProductoCatalogo, setGrupoProductoCatalogo] = useState([]);
  const [direccionCatalogo, setDireccionCatalogo] = useState([]);
  const [proyectoCatalogo, setProyectoCatalogo] = useState([]);
  const [almacenCatalogo, setAlmacenCatalogo] = useState([]);
  const [productoCatalogo, setProductoCatalogo] = useState([]);
  const [productoCatalogoFiltro, setProductoCatalogoFiltro] = useState([]);
  const [unidadDeMedidaCatalogo, setUnidadDeMedidaCatalogo] = useState([]);
  const [unidadDeMedida, setUnidadDeMedida] = useState([]);

  console.log("viendo authStore ", authStore.permisos);

  useEffect(() => {
    console.log("viendo grupo prod ", grupoProd);
    let val = `${grupoProd}`;
    const vals = productoCatalogo.filter((item) => {
      return item.value.startsWith(val[0]);
    });
    setProductoCatalogoFiltro(vals);
  }, [grupoProd]);
  const { pathname } = useLocation();

  useEffect(() => {
    const fillSelects = async () => {
      try {
        const val = await getRamoCatalogo();
        if (val.data) {
          console.log("jajaja esto ", val.data);
          setRamoCatalogo(val.data);
        }
        const val2 = await getDepartamentoCatalogo();
        if (val2.data) {
          setDepartamentoCatalogo(val2.data);
        }
        const val3 = await getUnidadDeMedidaCatalogo();
        if (val3.data) {
          setUnidadDeMedidaCatalogo(val3.data);
        }
        setGrupoProductoCatalogo([
          { value: 2000, label: "2000-Materiales y Suministros" },
          { value: 3000, label: "3000-Servicios Generales" },
          { value: 5000, label: "5000-Bienes Muebles E Inmuebles" },
        ]);
        const val4 = await getDependenciaCatalogo();
        if (val4.data) {
          setDireccionCatalogo(val4.data);
        }
        const val5 = await getProyectoCatalogo();
        if (val5.data) {
          setProyectoCatalogo(val5.data);
        }
        const val6 = await getAlmacenCatalogo();
        if (val6.data) {
          setAlmacenCatalogo(val6.data);
        }
        const val7 = await getProductoCatalogo();
        if (val7.data) {
          setProductoCatalogo(val7.data);
        }
      } catch (e) {
        console.log("hubo un error", e);
      }
    };
    fillSelects();
  }, []);

  const { id } = useParams();
  const fillForm = (order) => {
    setOrder(order);
    formik.setFieldValue("fecha", order.fecha);
    formik.setFieldValue("estatus", order.estatus);
    formik.setFieldValue("departamento", order.departamento);
    setDepartamento(order.departamento);
    formik.setFieldValue("ramo", order.ramo);
    setRamo(order.ramo);
    formik.setFieldValue("motivo", order.motivo);
    formik.setFieldValue("grupoProd", order.grupoProd);
    setGrupoProd(order.grupoProd);
    formik.setFieldValue("consecutivo", order.consecutivo);
    formik.setFieldValue("direccion", order.direccion);
    setDireccion(order.direccion);
    formik.setFieldValue("proyecto", order.proyecto);
    setProyecto(order.proyecto);
    formik.setFieldValue("fechaEntrega", order.fechaEntrega);
    let formatFechaEntrega = order.fechaEntrega.split("/");
    let fechaGood = `${formatFechaEntrega[0]}/${formatFechaEntrega[1]}/${formatFechaEntrega[2]}`;
    console.log("viendo esta fechaentrega ", fechaGood);
    setFechaEntrega(fechaGood);
    formik.setFieldValue("fechaEntrega", fechaGood);
    formik.setFieldValue("oficinaEntrega", order.oficinaEntrega);
    setOficinaEntrega(order.oficinaEntrega);
    formik.setFieldValue("tipoProd", order.tipoGasto);
    setTipoGasto(order.tipoGasto);
    formik.setFieldValue("comentario", order.comentario);
    setComentario(order.comentario);
    formik.setFieldValue("solicitante", order.solicitante);
    setProductos(order.productos);
  };
  const validarOrden = async () => {
    if (id) {
      try {
        const val = await updateStateRequisicion({ id, estatus: "validada" });
        if (val.data) {
          console.log("viendo esto val", val);
          fillForm(val.data);
        }
      } catch (e) {
        console.log("error updating");
      }
    }
  };
  const autorizarOrden = async () => {
    if (id) {
      try {
        const val = await updateStateRequisicion({ id, estatus: "autorizada" });
        if (val.data) {
          console.log("viendo esto val", val);
          fillForm(val.data);
        }
      } catch (e) {
        console.log("error updating");
      }
    }
  };
  const rechazarOrden = async () => {
    if (id) {
      try {
        const val = await updateStateRequisicion({ id, estatus: "rechazada" });
        if (val.data) {
          console.log("viendo esto val", val);
          fillForm(val.data);
        }
      } catch (e) {
        console.log("error updating");
      }
    }
  };

  useEffect(() => {
    const fillData = async () => {
      let order;
      try {
        const response = await getRequisicionId(id);
        order = response.data;
      } catch (error) {
        if (error.response.status === 404) {
          setFlagModalError(true);
          setMsgModalError(error);
          return;
        }
      }
      fillForm(order);
    };
    if (!id) {
      console.log("si entra en esto");
      formik.resetForm();
      setDepartamento("");
      setRamo("");
      setMotivo("");
      setGrupoProd("");
      setDireccion("");
      setProyecto("");
      setOficinaEntrega("");
      setTipoGasto("");
      setProductos([]);
      setComentario("");
      var now = dayjs();
      let val = dayjs(now).format("DD/MM/YYYY");
      setFecha(val);
      formik.setFieldValue("fecha", val);
      setFechaEntrega(val);
      formik.setFieldValue("fechaEntrega", val);
      formik.setFieldValue("solicitante", authStore.email);
      formik.setFieldValue("estatus", "borrador");
    } else {
      fillData();
    }
  }, [pathname]);

  const formikProducto = useFormik({
    initialValues: {
      producto: {},
      um: "",
      precio: "",
      cantidad: "",
    },
    validationSchema: Yup.object({
      producto: Yup.object().required(),
      um: Yup.string()
        .min(3, "Agrega una unidad de medida correcta")
        .required("Required"),
      precio: Yup.string()
        .min(1, "Agrega una unidad de medida correcta")
        .required("Required"),
      cantidad: Yup.string()
        .min(1, "Agrega una unidad de medida correcta")
        .required("Required"),
    }),
  });

  const formik = useFormik({
    initialValues: {
      fecha: "",
      estatus: "",
      departamento: "",
      ramo: "",
      motivo: "",
      grupoProd: "",
      consecutivo: "",
      direccion: "",
      proyecto: "",
      fechaEntrega: "",
      oficinaEntrega: "",
      tipoGasto: "",
      productos: [],
      comentario: "",
      solicitante: "",
      archivo: {},
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
      motivo: Yup.string("Debes de llenar motivo").required("required"),
      grupoProd: Yup.string("Debes seleccionar un Grupo Prod").required(
        "required"
      ),
      direccion: Yup.string("Debes seleccionar Dirección").required("required"),
      fechaEntrega: Yup.string()
        .max(10, "Debe ser una fecha correcta")
        .required("Required"),
      oficinaEntrega: Yup.string("Debes seleccionar un departamento").required(
        "required"
      ),
      tipoGasto: Yup.string("Debes seleccionar un Tipo de Gasto").required(
        "required"
      ),
    }),
    onSubmit: async (values) => {
      console.log("viendo el form", values);
      try {
        values.comentario = comentario;
        const val = await createRequisicion(values);
        console.log("viendo response create", val);
        if (val.data) {
          history.navigate(`/orden/${val.data.consecutivo}`);
        }
      } catch (error) {
        if (error.response.status === 404) {
          setFlagModalError(true);
          setMsgModalError(error);
          return;
        }
      }
    },
  });

  const handleChangeDepartamento = (event) => {
    setDepartamento(event.target.value);
    formik.setFieldValue("departamento", event.target.value);
  };
  const handleChangeDireccion = (event) => {
    setDireccion(event.target.value);
    formik.setFieldValue("direccion", event.target.value);
  };
  const handleChangeProyecto = (event) => {
    setProyecto(event.target.value);
    formik.setFieldValue("proyecto", event.target.value);
  };
  const handleChangeOficinaEntrega = (event) => {
    setOficinaEntrega(event.target.value);
    formik.setFieldValue("oficinaEntrega", event.target.value);
  };
  const handleChangeRamo = (event) => {
    setRamo(event.target.value);
    formik.setFieldValue("ramo", event.target.value);
  };
  const handleGrupoProd = (event) => {
    setGrupoProd(event.target.value);
    formik.setFieldValue("grupoProd", event.target.value);
  };
  const handleTipoGasto = (event) => {
    setTipoGasto(event.target.value);
    formik.setFieldValue("tipoGasto", event.target.value);
  };
  const handleUnidadDeMedida = (event) => {
    setTipoGasto(event.target.value);
    formikProducto.setFieldValue("um", event.target.value);
  };
  const handleFechaEntrega = (event) => {
    let val = dayjs(event).format("DD/MM/YYYY");
    formik.setFieldValue("fechaEntrega", val);
  };
  const handleAgregarProducto = () => {
    let valor = productos;
    productoAux["precio"] = formikProducto.values.precio;
    productoAux["cantidad"] = formikProducto.values.cantidad;
    productoAux["um"] = formikProducto.values.um;
    valor.push(productoAux);
    setProductos(valor);
    setProductoAux({});
    formikProducto.setFieldValue("producto", {});
    formikProducto.setFieldValue("um", "");
    formikProducto.setFieldValue("precio", 0);
    formikProducto.setFieldValue("cantidad", 0);
    formik.setFieldValue("productos", valor);
    console.log("viendo productos", productos);
  };

  const handleMessageChange = (event) => {
    setComentario(event.target.value);
    console.log(event.target.value);
  };
  return (
    <form onSubmit={formik.handleSubmit}>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {!id && <h2>Nueva Requisición</h2>}
          {id && <h2>Requisición {id}</h2>}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flex: 1,
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flexBasis: "100%",
            flex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flex: 1,
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flexBasis: "100%",
                flex: 1,
              }}
            >
              <MyInput
                label={"Fecha"}
                error={
                  formik.touched.fecha && formik.errors.fecha !== undefined
                }
                helperText={formik.errors.fecha}
                fullWidth
                value={formik.values.fecha}
                onChange={formik.handleChange("fecha")}
                required
                placeholder="Fecha"
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
              <MyInput
                label={"Estatus"}
                error={
                  formik.touched.estatus && formik.errors.estatus !== undefined
                }
                helperText={formik.errors.estatus}
                fullWidth
                value={formik.values.estatus}
                onChange={formik.handleChange("estatus")}
                required
                placeholder="estatus"
                disabled
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flexBasis: "100%",
              flex: 1,
            }}
          >
            <MySelect
              onChange={handleChangeDepartamento}
              value={departamento}
              label={"Departamento"}
              data={departamentoCatalogo}
              error={
                formik.touched.departamento &&
                formik.errors.departamento !== undefined
              }
              helperText={formik.errors.departamento}
              fullWidth
              required
              disabled={id}
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
            <MySelect
              data={ramoCatalogo}
              onChange={handleChangeRamo}
              value={ramo}
              label={"Ramo"}
              error={formik.touched.ramo && formik.errors.ramo !== undefined}
              helperText={formik.errors.ramo}
              fullWidth
              required
              disabled={id}
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
            <MyInput
              label={"Motivo"}
              error={
                formik.touched.motivo && formik.errors.motivo !== undefined
              }
              helperText={formik.errors.motivo}
              fullWidth
              value={formik.values.motivo}
              onChange={formik.handleChange("motivo")}
              required
              placeholder="Motivo"
              disabled={id}
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
            <MySelect
              data={grupoProductoCatalogo}
              onChange={handleGrupoProd}
              value={grupoProd}
              label={"Grupo Prod"}
              error={
                formik.touched.grupoProd &&
                formik.errors.grupoProd !== undefined
              }
              helperText={formik.errors.grupoProd}
              fullWidth
              required
              disabled={id}
            />
          </div>
        </div>

        {/* right side*/}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flexBasis: "100%",
            flex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flex: 1,
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flexBasis: "100%",
                flex: 1,
              }}
            >
              <MyInput
                label={"Consecutivo"}
                fullWidth
                value={formik.values.consecutivo}
                placeholder="Consecutivo"
                onChange={formik.handleChange("consecutivo")}
                disabled
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {grupoProd === 2000 && (
                <span
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "red",
                    fontWeight: "bold",
                  }}
                >
                  Presupuesto -320394
                </span>
              )}
              {grupoProd === 3000 && (
                <span
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "green",
                    fontWeight: "bold",
                  }}
                >
                  Presupuesto 230,5030
                </span>
              )}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flexBasis: "100%",
                flex: 1,
              }}
            ></div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flexBasis: "100%",
              flex: 1,
            }}
          >
            <MySelect
              data={direccionCatalogo}
              onChange={handleChangeDireccion}
              value={direccion}
              label={"Dirección"}
              error={
                formik.touched.direccion &&
                formik.errors.direccion !== undefined
              }
              helperText={formik.errors.direccion}
              fullWidth
              required
              disabled={id}
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
            <MySelect
              data={proyectoCatalogo}
              onChange={handleChangeProyecto}
              value={proyecto}
              label={"Proyecto"}
              error={
                formik.touched.proyecto && formik.errors.proyecto !== undefined
              }
              helperText={formik.errors.proyecto}
              fullWidth
              required
              disabled={id}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flex: 1,
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flexBasis: "100%",
                flex: 1,
              }}
            >
              {!id && (
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale="es"
                >
                  <span style={{ marginTop: "5px", marginLeft: "5px" }}>
                    Fecha Entrega
                    <DatePicker
                      defaultValue={dayjs(new Date())}
                      onChange={handleFechaEntrega}
                      disabled={id}
                      errorr={
                        formik.touched.fechaEntrega &&
                        formik.errors.fechaEntrega !== undefined
                      }
                    />
                  </span>
                </LocalizationProvider>
              )}
              {id && (
                <span style={{ paddingTop: "20px" }}>
                  <MyInput
                    label={"Fecha Entrega"}
                    error={
                      formik.touched.fecha && formik.errors.fecha !== undefined
                    }
                    helperText={formik.errors.fecha}
                    fullWidth
                    value={formik.values.fechaEntrega}
                    onChange={formik.handleChange("fecha")}
                    required
                    placeholder="Fecha"
                    disabled
                  />
                </span>
              )}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flexBasis: "100%",
                flex: 1,
              }}
            >
              <MySelect
                style={{ padding: "5px", paddingTop: "27px" }}
                data={almacenCatalogo}
                onChange={handleChangeOficinaEntrega}
                value={oficinaEntrega}
                label={"Entregar en"}
                error={
                  formik.touched.oficinaEntrega &&
                  formik.errors.oficinaEntrega !== undefined
                }
                helperText={formik.errors.oficinaEntrega}
                fullWidth
                required
                disabled={id}
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flexBasis: "100%",
              flex: 1,
            }}
          >
            <MySelect
              data={[
                { value: 1, label: "corriente" },
                { value: 2, label: "capital" },
              ]}
              onChange={handleTipoGasto}
              value={tipoGasto}
              label={"Tipo De Gasto"}
              error={
                formik.touched.tipoGasto &&
                formik.errors.tipoGasto !== undefined
              }
              helperText={formik.errors.tipoGasto}
              fullWidth
              required
              disabled={id}
            />
          </div>
        </div>
      </div>
      <div>
        {flagModalError && (
          <MymodalError
            showModal={flagModalError}
            handleClose={() => {
              setFlagModalError(false);
            }}
            msgModalError={msgModalError}
          ></MymodalError>
        )}
        <MyModal
          textButton={"Agregar Producto"}
          colorButton={"secondary"}
          disabled={id}
        >
          <div>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Agregar Producto
            </Typography>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2 }}
            ></Typography>
            <form onSubmit={formikProducto.handleSubmit}>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <MyAutoComplete
                    label={"Producto"}
                    data={productoCatalogoFiltro}
                    acualizafun={(val) => {
                      console.log("viendo val ", val);
                      formikProducto.setFieldValue("producto", val);
                      setProductoAux(val);
                    }}
                  />
                  <MySelect
                    data={unidadDeMedidaCatalogo}
                    onChange={handleUnidadDeMedida}
                    value={tipoGasto}
                    label={"Unidad De Medida"}
                    error={
                      formikProducto.touched.um &&
                      formikProducto.errors.um !== undefined
                    }
                    helperText={formikProducto.errors.um}
                    fullWidth
                    required
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <MyInput
                    label={"Precio"}
                    error={
                      formikProducto.touched.precio &&
                      formikProducto.errors.precio !== undefined
                    }
                    helperText={formikProducto.errors.precio}
                    fullWidth
                    value={formikProducto.values.precio}
                    onChange={formikProducto.handleChange("precio")}
                    required
                    placeholder="Precio"
                  />
                  <MyInput
                    label={"Cantidad"}
                    error={
                      formikProducto.touched.cantidad &&
                      formikProducto.errors.cantidad !== undefined
                    }
                    helperText={formikProducto.errors.cantidad}
                    fullWidth
                    value={formikProducto.values.cantidad}
                    onChange={formikProducto.handleChange("cantidad")}
                    required
                    placeholder="Cantidad"
                  />
                </div>
              </div>
            </form>
          </div>
          <Button
            onClick={handleAgregarProducto}
            disabled={!formikProducto.isValid}
          >
            Guardar Producto
          </Button>
        </MyModal>
      </div>
      <div>{productos.length > 0 && <BasicTable data={productos} />}</div>
      <div style={{ marginTop: "10px" }}>
        <MyTextArea
          value={comentario}
          onChange={handleMessageChange}
          disabled={id}
          style={id ? { color: "gray" } : {}}
        />
      </div>
      <div style={{ marginTop: "10px" }}>
        <div style={{ flexDirection: "column", width: "40%" }}>
          <MyInput
            label={"Solicitante"}
            error={
              formik.touched.solicitante &&
              formik.errors.solicitante !== undefined
            }
            helperText={formik.errors.solicitante}
            fullWidth
            value={formik.values.solicitante}
            disabled
            placeholder="Solicitante"
          />
        </div>
        <div style={{ flexDirection: "column", width: "40%" }}>
          <UploadFile
            disabled={id}
            data={formik.values}
            errors={formik.errors}
            setFieldValue={formik.setFieldValue}
          />
        </div>
      </div>

      <Button
        type="submit"
        disabled={!formik.isValid || id || productos.length === 0}
      >
        Guardar
      </Button>
      {authStore.permisos.includes("vistoBuenoReq") &&
        ["elaborada", "borrador"].includes(order.estatus) && (
          <Button color={"primary"} onClick={validarOrden}>
            Visto bueno
          </Button>
        )}
      {authStore.permisos.includes("autorizarReq") &&
        order.estatus === "validada" && (
          <Button color={"primary"} onClick={autorizarOrden}>
            Autorizar
          </Button>
        )}
      {order.estatus !== "rechazada" && id && (
        <Button color={"warning"} onClick={rechazarOrden}>
          Rechazar
        </Button>
      )}
    </form>
  );
};
