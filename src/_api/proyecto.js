import { client } from "_api/api";

const getProyectoCatalogo = async (params) => {
  return await client.request({
    method: "get",
    url: "/proyecto",
    params,
  });
};

export { getProyectoCatalogo };
