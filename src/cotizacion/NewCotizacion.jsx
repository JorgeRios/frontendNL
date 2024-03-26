import { useEffect, useState } from "react";
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

import { getProveedorCatalogo } from "_api/proveedor";
import { getAlmacenCatalogo } from "_api/almacen";
import { getRamoCatalogo } from "_api/ramo";
import { getDepartamentoCatalogo } from "_api/departamento";
import { getProyectoCatalogo } from "_api/proyecto";
import { createOrdenCompra } from "_api/orden";
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
  Divider,
} from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

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

export { NewCotizacion };

const options = ["Option 1", "Option 2"];

// function CustomTabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box sx={{ p: 3 }}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// CustomTabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };

const NewCotizacion = ({ ...props }) => {
  const [fecha, setFecha] = React.useState("");
  const [fechaEntrega, setFechaEntrega] = React.useState("");
  const [estatus, setEstatus] = React.useState("");
  const [proveedorCatalogo, setProveedorCatalogo] = React.useState([]);
  const [proveedor, setProveedor] = React.useState("");
  const [almacenCatalogo, setAlmacenCatalogo] = useState([]);
  const [almacen, setAlmacen] = React.useState("");
  const [ramoCatalogo, setRamoCatalogo] = useState([]);
  const [ramo, setRamo] = React.useState("");
  const [departamentoCatalogo, setDepartamentoCatalogo] = useState([]);
  const [departamento, setDepartamento] = React.useState("");
  const [proyecto, setProyecto] = React.useState("");
  const [proyectoCatalogo, setProyectoCatalogo] = useState([]);

  const [tipoOperacion, setTipoOperacion] = React.useState("");

  const [motivo, setMotivo] = React.useState("");
  const [grupoProd, setGrupoProd] = React.useState("");
  const [oficinaEntrega, setOficinaEntrega] = React.useState("");
  const [direccion, setDireccion] = React.useState("");
  const [ramoData, setRamoData] = React.useState([]);
  const [consecutivo, setConsecutivo] = React.useState("");
  const [value, setValue] = React.useState(options[0]);
  const [tipoProd, setTipoProd] = React.useState("");
  const [productos, setProductos] = React.useState([]);
  const [productoAux, setProductoAux] = React.useState({});
  const [comentario, setComentario] = React.useState("");
  const [archivo, setArchivo] = React.useState("");
  const authStore = useSelector((state) => state.auth.user);
  const [flagModalError, setFlagModalError] = useState(false);
  const [msgModalError, setMsgModalError] = useState({});
  const [order, setOrder] = useState({});

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  console.log("viendo authStore ", authStore.permisos);

  const { id } = useParams();
  const { pathname } = useLocation();
  const fillForm = (order) => {
    setOrder(order);

    // let formatFechaEntrega = order.fechaEntrega.split("/");
    // let fechaGood = `${formatFechaEntrega[1]}/${formatFechaEntrega[0]}/${formatFechaEntrega[2]}`;
    // setFechaEntrega(dayjs(new Date(fechaGood)));
    formik.setFieldValue("almacen", order.oficinaEntrega);
    setDepartamento(order.departamento);
    setAlmacen(order.oficinaEntrega);

    formik.setFieldValue("departamento", order.departamento);
    setDepartamento(order.departamento);
    formik.setFieldValue("ramo", order.ramo);
    setRamo(order.ramo);
    formik.setFieldValue("proyecto", order.proyecto);
    setProyecto(order.proyecto);

    setProductos(order.productos);

    if (!order.ordenCompraId) {
      setEstatus("borrador");
      formik.setFieldValue("estatus", "borrador");
    }
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
    const fillSelects = async () => {
      try {
        const val = await getProveedorCatalogo();
        if (val.data) {
          console.log("aqwui ", val.data);
          setProveedorCatalogo(val.data);
        }
        const val2 = await getAlmacenCatalogo();
        if (val2.data) {
          setAlmacenCatalogo(val2.data);
        }
        const val3 = await getRamoCatalogo();
        if (val3.data) {
          console.log("jajaja esto ", val3.data);
          setRamoCatalogo(val3.data);
        }
        const val4 = await getDepartamentoCatalogo();
        if (val4.data) {
          setDepartamentoCatalogo(val4.data);
        }
        const val5 = await getProyectoCatalogo();
        if (val5.data) {
          setProyectoCatalogo(val5.data);
        }
        var now = dayjs();
        let fecha = dayjs(now).format("DD/MM/YYYY");
        setFecha(val);
        formik.setFieldValue("fecha", fecha);
      } catch (e) {}
    };
    fillSelects();
  }, []);

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
      //setFlagModalError(true)
      //setMsgModalError
      console.log(
        "aqui hay que regresar un error no se puede llegar sin requisicion id"
      );
      //formik.resetForm();
      // setDepartamento("");
      // setRamo("");
      // setMotivo("");
      // setGrupoProd("");
      // setDireccion("");
      // setProyecto("");
      // setOficinaEntrega("");
      // setTipoGasto("");
      // setProductos([]);
      // setComentario("");
      // var now = dayjs();
      // let val = dayjs(now).format("DD/MM/YYYY");
      // setFecha(val);
      // formik.setFieldValue("fecha", val);
      // setFechaEntrega(val);
      // formik.setFieldValue("fechaEntrega", val);
    } else {
      fillData();
    }
  }, [pathname]);

  const formik = useFormik({
    initialValues: {
      proveedor: "",
      almacen: "",
      fecha: "",
      fechaRecepcion: "",
      referencia: "",
      estatus: "",
      tipoComprobanteFiscal: "",
      unidadAdministrativa: "",
      proyectoProceso: "",
      fuenteFinanciamiento: "",
      productos: [],
      comentario: "",
    },
    validationSchema: Yup.object({
      proveedor: Yup.string("Debes seleccionar un departamento").required(
        "required"
      ),
      almacen: Yup.string("Debe de seleccionar un ramo").required("required"),
      fecha: Yup.string()
        .max(10, "Debe ser una fecha correcta")
        .required("Required"),
      fechaRecepcion: Yup.string()
        .max(10, "Debe ser una fecha correcta")
        .required("Required"),
      referencia: Yup.string(),
      estatus: Yup.string()
        .max(10, "tiene que tener un estatus correcto")
        .required("Required"),
      tipoComprobanteFiscal: Yup.string("Debe de seleccionar un ramo").required(
        "required"
      ),
      unidadAdministrativa: Yup.string("Debe de seleccionar un ramo").required(
        "required"
      ),
      proyectoProceso: Yup.string("Debe de seleccionar un ramo").required(
        "required"
      ),
      fuenteFinanciamiento: Yup.string("Debe de seleccionar un ramo").required(
        "required"
      ),
    }),
    onSubmit: async (values) => {
      console.log("viendo el form", values);
      values.comentario = comentario;
      try {
        const val = await createRequisicion(values);
        console.log("viendo response create", val.data);
        if (val.data) {
          console.log("aquiooooo");
          history.navigate(`/orden/${val.consecutivo}`);
        }
      } catch (e) {
        console.log("hubo un error ", e);
      }
    },
  });
  const handleChangeProveedor = (event) => {
    setProveedor(event.target.value);
    formik.setFieldValue("proveedor", event.target.value);
    console.log("viendo proveedor ", event.target.value);
    let found = proveedorCatalogo.filter((item) => {
      return item.value === event.target.value;
    });
    console.log("lo encontro ", found);
  };
  const handleChangeAlmacen = (event) => {
    setAlmacen(event.target.value);
    formik.setFieldValue("almacen", event.target.value);
  };
  const handleChangeDepartamento = (event) => {};
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
  const handleTipoProd = (event) => {
    setTipoProd(event.target.value);
    formik.setFieldValue("tipoProd", event.target.value);
  };
  const handleFecha = (event) => {
    let val = dayjs(event).format("DD/MM/YYYY");
    formik.setFieldValue("fecha", val);
  };
  const handleFechaEntrega = (event) => {
    let val = dayjs(event).format("DD/MM/YYYY");
    formik.setFieldValue("fechaRecepcion", val);
  };
  const handleAgregarProducto = () => {
    if (Object.keys(productoAux).length === 0) {
      return;
    }
    let valor = productos;
    valor.push(productoAux);
    setProductos(valor);
    setProductoAux({});
    formik.setFieldValue("productos", valor);
  };
  const crearOdenCompra = async () => {
    console.log("si hace esto ");
    try {
      const params = {
        ProveedorId: formik.values.proveedor,
        AlmacenId: formik.values.almacen,
        TipoOperacionId: "",
        TipoComprobanteFiscalId: 0,
        Ejercicio: 2024,
        Fecha: formik.values.fecha,
        FechaRecepcion: formik.values.fechaRecepcion,
        Referencia: formik.values.referencia,
        Status: "",
        Observacion: comentario,
        GastoPorComprobarId: null,
        productos: productos,
        reqId: order.consecutivo,
      };
      console.log("ciendo params", params);
      const val = await createOrdenCompra(params);
      if (val.data) {
        console.log("si entro aqui");
        history.navigate("/ordenesCompra");
      }
      history.navigate("/ordenesCompra");
      console.log("termino ", val);
    } catch (e) {
      console.log("eeorr ", e);
    }
  };

  const handleMessageChange = (event) => {
    // 👇️ access textarea value
    setComentario(event.target.value);
    console.log(event.target.value);
  };
  return (
    <form onSubmit={formik.handleSubmit}>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h2>Orden De Compra</h2>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <MySelect
            style={{
              padding: "5px",
              display: "flex",
              width: "100%",
            }}
            keyLabel={"RFC"}
            onChange={handleChangeProveedor}
            value={proveedor}
            label={"Proveedor"}
            data={proveedorCatalogo}
            error={
              formik.touched.departamento &&
              formik.errors.departamento !== undefined
            }
            helperText={formik.errors.departamento}
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
          <MySelect
            style={{
              padding: "5px",
              display: "flex",
              width: "100%",
            }}
            onChange={handleChangeAlmacen}
            value={almacen}
            label={"Almacén"}
            data={almacenCatalogo}
            error={
              formik.touched.departamento &&
              formik.errors.departamento !== undefined
            }
            helperText={formik.errors.departamento}
            fullWidth
            required
            disabled
          />
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
            ></div>
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
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        {/* <div
          style={{
            display: "flex",
            flexDirection: "column",
            flexBasis: "100%",
            flex: 1,
          }}
        >
          <span style={{ paddingTop: "25px" }}>
            <MyInput
              label={"Tipo de Operacion"}
              error={
                formik.touched.tipoOperacion &&
                formik.errors.tipoOperacion !== undefined
              }
              helperText={formik.errors.tipoOperacion}
              fullWidth
              value={formik.values.tipoOperacion}
              onChange={formik.handleChange("tipoOperacion")}
              required
              placeholder="Tipo de Operacion"
              disabled
            />
          </span>
        </div> */}

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
              Fecha
              <DatePicker
                defaultValue={dayjs(new Date())}
                onChange={handleFecha}
                errorr={
                  formik.touched.fecha && formik.errors.fecha !== undefined
                }
              />
            </span>
          </LocalizationProvider>
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
              Fecha Recepción
              <DatePicker
                defaultValue={dayjs(new Date())}
                onChange={handleFechaEntrega}
                errorr={
                  formik.touched.fechaRecepcion &&
                  formik.errors.fechaRecepcion !== undefined
                }
              />
            </span>
          </LocalizationProvider>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flexBasis: "100%",
            flex: 1,
          }}
        >
          <span style={{ paddingTop: "25px" }}>
            <MyInput
              label={"Referencia"}
              error={
                formik.touched.fecha && formik.errors.referencia !== undefined
              }
              helperText={formik.errors.referencia}
              fullWidth
              value={formik.values.referencia}
              onChange={formik.handleChange("referencia")}
              required
              placeholder="Referencia"
            />
          </span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flexBasis: "100%",
            flex: 1,
          }}
        >
          <span style={{ paddingTop: "25px" }}>
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
              placeholder="Estatus"
              disabled
            />
          </span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flexBasis: "100%",
            flex: 1,
          }}
        >
          <span style={{ paddingTop: "25px" }}>
            {/* <MySelect
              style={{
                padding: "5px",
                display: "flex",
              }}
              onChange={handleChangeDepartamento}
              value={departamento}
              label={"Tipo Comprobante Fiscal"}
              data={[
                { value: "dep1", label: "departamento 1" },
                { value: "dep2", label: "departamento 2" },
                { value: "dep3", label: "departamento 3" },
              ]}
              error={
                formik.touched.departamento &&
                formik.errors.departamento !== undefined
              }
              helperText={formik.errors.departamento}
              fullWidth
              required
              disabled={id}
            /> */}
          </span>
        </div>
      </div>

      <div style={{ marginTop: "10px" }}></div>
      <div style={{ marginTop: "10px" }}>
        <div style={{ flexDirection: "column", width: "40%" }}></div>
        <div style={{ flexDirection: "column", width: "40%" }}></div>
      </div>
      <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <MySelect
            style={{
              padding: "5px",
              display: "flex",
            }}
            onChange={handleChangeDepartamento}
            value={departamento}
            label={"Unidad Administrativa"}
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
            width: "100%",
          }}
        >
          <MySelect
            data={ramoCatalogo}
            onChange={handleChangeRamo}
            value={ramo}
            //label={"Proyecto / Proceso"}
            label={"Fuente Financiamiento"}
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
            width: "100%",
          }}
        >
          <MySelect
            data={proyectoCatalogo}
            onChange={handleChangeProyecto}
            value={proyecto}
            label={"Proyecto / Proceso"}
            error={
              formik.touched.proyecto && formik.errors.proyecto !== undefined
            }
            helperText={formik.errors.proyecto}
            fullWidth
            required
            disabled={id}
          />
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "row" }}>
        {/* <div
          style={{
            display: "flex",
            flexDirection: "column",
            paddingLeft: "10px",
          }}
        >
          <FormGroup>
            <FormControlLabel
              required
              control={<Checkbox />}
              label="Con Ajuste"
            />
          </FormGroup>
        </div> */}
      </div>
      <div style={{ marginTop: "10px" }}>
        <MyTextArea
          value={comentario}
          placeholder={"comentario"}
          onChange={handleMessageChange}
          style={id ? { color: "gray" } : {}}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "row" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            paddingLeft: "10px",
          }}
        >
          <BasicTable data={productos} otra={true} />
        </div>
      </div>
      <div
        style={{ display: "flex", flexDirection: "row", marginTop: "20px" }}
      ></div>

      <Button onClick={crearOdenCompra} variant="contained" color="info">
        Crear Orden Compra
      </Button>
    </form>
  );
};
