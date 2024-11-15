import API from "./api"

export const getDumpSites = async (params) => {
    const { data } = await API.get(`/dumpsites`, { params });
    return data.data;
}

export const createDumpSites = async (payload) => {
    const { data } = await API.post(`/dumpsites/new`, payload);
    return data;
}

export const editDumpSites = async (payload) => {
    const { _id, ...rest } = payload
    const { data } = await API.patch(`/dumpsites/${_id}`, rest);
    return data;
}