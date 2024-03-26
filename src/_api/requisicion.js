import { client } from "_api/api";

const createRequisicion = async (params) => {
  console.log("aqui en llamada ", params);
  return await client.post("/requisicion", params);
};

const updateStateRequisicion = async (params) => {
  return await client.post("/updatestaterequisicion", params);
};

const getAllRequisiciones = async (params) => {
  console.log("aqui en llamada ", params);
  const val = await client.get("/requisiciones", params);
  return val.data;
};

const getRequisicionId = async (id) => {
  return await client.get(`/requisicion/${id}`);
};

export {
  createRequisicion,
  getAllRequisiciones,
  getRequisicionId,
  updateStateRequisicion,
};
