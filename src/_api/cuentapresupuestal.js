import { client } from "_api/api";

const getCuentaPrespuestal = async (params) => {
  return await client.request({
    method: "get",
    url: "/producto",
    params,
  });
};

export { getCuentaPrespuestal };
