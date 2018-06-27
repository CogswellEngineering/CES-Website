import React from 'react';


const BorrowedItem = (props) => {

    const {dateBorrowed, itemName} = props;

    return (<div>
                <p> Borrowed {itemName} </p>
        </div>
    )
}