import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { history } from "_helpers";
import { Nav, PrivateRoute } from "_components";
import { Home } from "home";
import { Login } from "login";
import { NewOrder } from "newOrder";
import { NewCotizacion } from "cotizacion";

import { ReporteRequisicion } from "reporteRequisiciones";
import { ReporteReOrdenes } from "reporteOrdenes";
import { ReporteCompras } from "reporteCompras";
import { OrdenCompra } from "ordenCompra";
import { AutorizarPago } from "AutorizarPago";
import { ReportePagos } from "reportePagos";
import { AplicarPago } from "AplicarPago";
import { Compra } from "compra";

export { App };

function App() {
  // init custom history object to allow navigation from
  // anywhere in the react app (inside or outside components)
  history.navigate = useNavigate();
  history.location = useLocation();

  return (
    <div className="app-container bg-light">
      <Nav />
      <div className="container pt-4 pb-4">
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/requisicion/:id"
            element={
              <PrivateRoute>
                <NewOrder />
              </PrivateRoute>
            }
          />
          <Route
            path="/requisicion"
            element={
              <PrivateRoute>
                <NewOrder />
              </PrivateRoute>
            }
          />
          <Route
            path="/requisiciones"
            element={
              <PrivateRoute>
                <ReporteRequisicion />
              </PrivateRoute>
            }
          />
          <Route
            path="/orden/:id"
            element={
              <PrivateRoute>
                <NewCotizacion />
              </PrivateRoute>
            }
          />
          <Route
            path="/cotizacion"
            element={
              <PrivateRoute>
                <NewCotizacion />
              </PrivateRoute>
            }
          />
          <Route
            path="/ordenesCompra"
            element={
              <PrivateRoute>
                <ReporteReOrdenes />
              </PrivateRoute>
            }
          />
          <Route
            path="/ordencompra/:id"
            element={
              <PrivateRoute>
                <OrdenCompra />
              </PrivateRoute>
            }
          />
          <Route
            path="/compras"
            element={
              <PrivateRoute>
                <ReporteCompras />
              </PrivateRoute>
            }
          />
          <Route
            path="/compra/:id"
            element={
              <PrivateRoute>
                <Compra />
              </PrivateRoute>
            }
          />
          <Route
            path="/autorizarpago/:id"
            element={
              <PrivateRoute>
                <AutorizarPago />
              </PrivateRoute>
            }
          />
          <Route
            path="/pagos"
            element={
              <PrivateRoute>
                <ReportePagos />
              </PrivateRoute>
            }
          />
          <Route
            path="/aplicarpago/:id"
            element={
              <PrivateRoute>
                <AplicarPago />
              </PrivateRoute>
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
}
