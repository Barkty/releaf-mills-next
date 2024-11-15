import React from 'react';

const FormField = (props) => {
    const { label, name, type, placeholder, error, register, ...otherProps } = props;

    return (
        <div className='mb-3'>
            <label className="font-medium text-black my-1">{label}</label>
            <div className='rounded-md flex bg-inherit item-center justify-between outline-none focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 bg-inherit w-full h-12 rounded-lg border border-black py-2 px-3'>
                <input 
                    type={type} 
                    className="outline-none border-0 w-2/3"
                    name={name} 
                    placeholder={placeholder} 
                    {...otherProps}
                />
            </div>
          {error && <span className="text-danger text-xs my-1.5 font-semibold">{error.message}</span>}
        </div>
    )
}

export default FormField;