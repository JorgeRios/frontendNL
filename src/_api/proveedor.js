import { client } from "_api/api";

const getProveedorCatalogo = async (params) => {
  return await client.request({
    method: "get",
    url: "/proveedor",
    params,
  });
};

export { getProveedorCatalogo };
