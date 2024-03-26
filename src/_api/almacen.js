import { client } from "_api/api";

const getAlmacenCatalogo = async (params) => {
  return await client.request({
    method: "get",
    url: "/almacen",
    params,
  });
};

export { getAlmacenCatalogo };
