import React from 'react';

export interface ButtonProps {
    vouchFor: string;
}

const VouchButton: React.FC<ButtonProps> = ({ vouchFor }) => {
    function vouch() {
        console.log(`Vouching for ${vouchFor}`);
    }

    return <button onClick={vouch}>Vouch for {vouchFor}</button>;
}

export default VouchButton;