import { client } from "_api/api";

const createOrdenCompra = async (params) => {
  console.log("aqui en llamada ", params);
  return await client.post("/ordencompra", params);
};

const updateStateRequisicion = async (params) => {
  return await client.post("/updatestaterequisicion", params);
};

const getAllOrderCompra = async (params) => {
  console.log("aqui en llamada ", params);
  const val = await client.get("/ordercompra", params);
  return val.data;
};

const getOrdenCompraId = async (id) => {
  return await client.get(`/ordencompra/${id}`);
};

export {
  createOrdenCompra,
  getAllOrderCompra,
  getOrdenCompraId,
  //   getRequisicionId,
  //   updateStateRequisicion,
};
