import { Button, Modal, ModalContent } from '@nextui-org/react'
import React from 'react'
import FormField from './Text';
import { _notifyError, _notifySuccess } from '@/utils/alert';
import { createDumpSites } from '@/services/dumpsite.service';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from 'react-hook-form';
import { CircularProgress } from '@mui/material';
import { createDumpSchema } from '@/schema';
import SelectField from './Select';
import { PKS_STATUS } from '@/utils/constants';

const initialState = {
    status: "",
    latitude: 0.0,
    longitude: 0.0,
    capacity: 0.
}

const AddNewPKS = ({ menuOpen, toggle, latLng, setLatLng }) => {
    const { handleSubmit, control, reset, formState: { isValid } } = useForm({
        mode: "onBlur",
        defaultValues: { 
            ...initialState,
            latitude: latLng?.lat || '0.0',
            longitude: latLng?.lng || '0.0'
        },
        resolver: yupResolver(createDumpSchema),
    });

    const { mutate, isPending } = useMutation({
        mutationFn: (values) => createDumpSites({ ...values, status: values.status.toLowerCase() }),
        onError: (error) => {
            _notifyError(error.response.data.message);
            reset(initialState)
            setLatLng({})
        },
        onSuccess: (data) => {
            const { message } = data
            reset(initialState)
            setLatLng({})
            _notifySuccess(message)
            toggle()
        },
    });

  return (
    <Modal isOpen={menuOpen} onClose={toggle}>
        <ModalContent className='p-8'>
            <h3 className='text-center text-semibold'>Add a new PKS Dumpsite</h3>
            <form onSubmit={handleSubmit(mutate)}>
                <Controller
                    name='latitude'
                    control={control}
                    render={({field, fieldState: { error }}) => {
                        const { ...fieldProps } = field;
                        return (
                            <FormField 
                                label="Latitude" 
                                name="latitude"
                                id="latitude"
                                placeholder="5.610867"
                                type="text"
                                {...fieldProps}
                                value={latLng.lat}
                                error={error}
                            />
                        )
                    }}
                />
                <Controller
                    name='longitude'
                    control={control}
                    render={({field, fieldState: { error }}) => {
                        const { ...fieldProps } = field;
                        return (
                            <FormField 
                                label="Longitude" 
                                name="longitude"
                                id="longitude"
                                placeholder="8.171645"
                                type="text"
                                {...fieldProps}
                                value={latLng.lng}
                                error={error}
                            />
                        )
                    }}
                />
                <Controller
                    name='capacity'
                    control={control}
                    render={({field, fieldState: { error }}) => {
                        const { ...fieldProps } = field;
                        return (
                            <FormField 
                                label="Capacity" 
                                name="capacity"
                                id="capacity"
                                placeholder="8"
                                type="tel"
                                {...fieldProps}
                                error={error}
                            />
                        )
                    }}
                />
                <Controller
                    name='status'
                    control={control}
                    render={({field, fieldState: { error }}) => {
                        const { ...fieldProps } = field;
                        return (
                            <SelectField 
                                label="Status" 
                                name="status"
                                id="status"
                                placeholder="Select option"
                                options={PKS_STATUS}
                                {...fieldProps}
                                error={error}
                            />
                        )
                    }}
                />
                <Button type='submit' disabled={!isValid || isPending} className='bg-[#5C43A9] w-full h-12 text-white my-6 disabled:bg-[grey]'>
                    {isPending ? <CircularProgress color="#FFFFFF" size={28} /> : 'Create'}
                </Button>
            </form>
        </ModalContent>
    </Modal>
  )
}

export default AddNewPKS