import React from 'react';

const SwitchField = ({val, onch, name, label, aclass, offtext='Disabled', ontext='Enabled'}) => (
    <div className={aclass}>
        <p>{label}</p>
        <div className="switch">
            <label>
                {offtext}<input type="checkbox" name={name} onChange={onch} checked={val}/><span
                className="lever"/>{ontext}
            </label>
        </div>
    </div>
);

export default SwitchField;