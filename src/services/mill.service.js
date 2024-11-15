import API from "./api"

export const getMills = async (params) => {
    const { data } = await API.get(`/mills`, { params });
    return data.data;
}

export const createMills = async (payload) => {
    const { data } = await API.post(`/mills/new`, payload);
    return data;
}

export const editMills = async (payload) => {
    const { _id, ...rest } = payload
    const { data } = await API.patch(`/mills/${_id}`, rest);
    return data;
}