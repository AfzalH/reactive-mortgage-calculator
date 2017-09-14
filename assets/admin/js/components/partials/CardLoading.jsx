import React from 'react';
import CircularLoaderCard from './CircularLoaderCard';

const CardLoading = ({title}) => (
    <div className="col s12 l4 m6">
        <div className="card small">
            <div className="card-content">
                {title ?
                    <div className="center">
                        <h5 className="thin">{title}</h5>
                    </div>
                    : ''}
                <CircularLoaderCard />
            </div>
        </div>
    </div>
);


// connect and export
export default CardLoading;
