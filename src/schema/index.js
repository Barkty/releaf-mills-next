import * as Yup from "yup";

export const createDumpSchema = Yup.object().shape({
    latitude: Yup.number().required('Latitude is required!'),
    longitude: Yup.number().required('Longitude is required!'),
    capacity: Yup.number().required('PK Capacity is required!'),
    status: Yup.string().required('PK Status is required!')
});