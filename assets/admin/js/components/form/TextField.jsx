import React from 'react';

// dumb component ... only props and presentation
const TextField = ({val, onch, name, label, aclass}) => (
    <div className={"input-field "+aclass}>
        <input type="text" name={name} value={val}
               onChange={onch}/>
        <label htmlFor={name}>{label}</label>
    </div>
);

export default TextField;