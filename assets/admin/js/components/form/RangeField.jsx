import React from 'react';

// dumb component ... only props and presentation
const RangeField = ({val, onch, name, label, aclass, min, max}) => (
    <div className={"input-field "+aclass}>
        <p className="grey-text bottom0">{label} : <span className="green-text text-darken-1">{val}</span></p>

        <p className="range-field top0">
            <input type="range" name={name} value={val}
                   onChange={onch} id={name} min={min} max={max}/>
        </p>
    </div>
);

export default RangeField;