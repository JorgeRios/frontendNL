import { client } from "_api/api";

const getGrupoProductoCatalogo = async (params) => {
  return await client.request({
    method: "get",
    url: "/grupoproducto",
    params,
  });
};

export { getGrupoProductoCatalogo };
