import React from 'react';


const LibraryItem = (props) => {

    const {type, itemName} = props;

    return (<div>
                <p> Type: {type} </p>
                <p> {itemName} </p>

        </div>
    )
}