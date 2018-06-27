import React from 'react';


const PurchaseItem = (props) => {

    const {type, price, itemName} = props;

    return (<div>
                <p> Type: {type} </p>
                <p> Bought {itemName} </p>

        </div>
    )
}