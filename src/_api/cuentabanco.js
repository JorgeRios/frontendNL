import { client } from "_api/api";

const getAllCuentaBancos = async (params) => {
  console.log("aqui en llamada ", params);
  const val = await client.get("/cuentabancos", params);
  return val.data;
};

export { getAllCuentaBancos };
