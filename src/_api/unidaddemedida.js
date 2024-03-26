import { client } from "_api/api";

const getUnidadDeMedidaCatalogo = async (params) => {
  return await client.request({
    method: "get",
    url: "/unidaddemedida",
    params,
  });
};

export { getUnidadDeMedidaCatalogo };
