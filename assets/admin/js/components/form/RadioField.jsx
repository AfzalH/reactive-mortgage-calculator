import React from 'react';

// dumb component ... only props and presentation
const RadioField = ({val, curval, onch, name, label, aclass}) => (
    <p className={aclass}>
        <input type="radio" name={name} id={val} onChange={onch}
               value={val} checked={curval == val}/>
        <label htmlFor={val}>{label}</label>
    </p>
);

export default RadioField;