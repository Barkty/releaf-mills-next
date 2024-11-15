import { Select, SelectItem } from '@nextui-org/react';
import React from 'react';

const SelectField = (props) => {
    const { label, name, type, placeholder, error, options = [], ...otherProps } = props;

    return (
        <div className='mb-3'>
            <label className="font-medium text-black my-1">{label}</label>
            <div className='rounded-md flex bg-inherit item-center justify-between outline-none focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 bg-inherit w-full h-12 rounded-lg border border-black'>
                <Select 
                    className="outline-none border-0 w-full bg-transparent"
                    name={name} 
                    placeholder={placeholder} 
                    {...otherProps}
                >
                    {...options.map(({ label, value }) => (
                        <SelectItem className='bg-transparent' key={label}>{value}</SelectItem>
                    ))}
                </Select>
            </div>
          {error && <span className="text-danger text-xs my-1.5 font-semibold">{error.message}</span>}
        </div>
    )
}

export default SelectField;