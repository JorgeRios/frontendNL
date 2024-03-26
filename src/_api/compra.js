import { client } from "_api/api";

const createCompra = async (params) => {
  console.log("aqui en llamada ", params);
  return await client.post("/compra", params);
};

const getAllCompras = async (params) => {
  console.log("aqui en llamada ", params);
  const val = await client.get("/compras", params);
  return val.data;
};

const getCompraId = async (id) => {
  return await client.get(`/compra/${id}`);
};
export { createCompra, getAllCompras, getCompraId };
