import { client } from "_api/api";

const getAllTipoPagos = async (params) => {
  console.log("aqui en llamada ", params);
  const val = await client.get("/tipopagos", params);
  return val.data;
};

export { getAllTipoPagos };
