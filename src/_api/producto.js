import { client } from "_api/api";

const getProductoCatalogo = async (params) => {
  console.log("aquiiiiii");
  return await client.request({
    method: "get",
    url: "/producto",
    params,
  });
};

export { getProductoCatalogo };
