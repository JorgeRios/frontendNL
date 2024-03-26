import { client } from "_api/api";

const getPagoId = async (id) => {
  return await client.get(`/pago/${id}`);
};

const autorizarPago = async (params) => {
  return await client.post("/autorizarpago", params);
};

const getAllPagos = async (params) => {
  console.log("aqui en llamada ", params);
  const val = await client.get("/pagos", params);
  return val.data;
};

const aplicarPago = async (params) => {
  return await client.post("/aplicarpago", params);
};

export { getPagoId, autorizarPago, getAllPagos, aplicarPago };
