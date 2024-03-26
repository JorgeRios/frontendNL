import { client } from "_api/api";

const getDepartamentoCatalogo = async (params) => {
  return await client.request({
    method: "get",
    url: "/departamento",
    params,
  });
};

export { getDepartamentoCatalogo };
