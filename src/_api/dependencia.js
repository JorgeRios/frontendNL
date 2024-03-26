import { client } from "_api/api";

const getDependenciaCatalogo = async (params) => {
  return await client.request({
    method: "get",
    url: "/dependencia",
    params,
  });
};

export { getDependenciaCatalogo };
