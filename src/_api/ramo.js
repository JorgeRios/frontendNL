import { client } from "_api/api";

const getRamoCatalogo = async (params) => {
  return await client.request({
    method: "get",
    url: "/ramo",
    params,
  });
};

export { getRamoCatalogo };
