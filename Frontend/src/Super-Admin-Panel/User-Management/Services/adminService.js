import api from "../../../Shared/Services/api";

export const createAdmin = async (data) => {
  const res = await api.post("/super-admin/users/create-admin", data);
  return res.data;
};
