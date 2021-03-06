import { LIBRARY_UPDATED, BORROWED_UPDATED, ORDERS_UPDATED
, NEW_PAGE_CLICKED, NEW_TAB_CLICKED,
} from './constants';



export function newTabClicked(tab){

    return {
        type: NEW_TAB_CLICKED,
        tab,
    };

}

export function newPageClicked(page){

    return {
        type: NEW_PAGE_CLICKED,
        page,
    }

}

export function libraryUpdated(library){

    return {
        type: LIBRARY_UPDATED,
        library,
    };

}

export function borrowedUpdated(borrowed){

    return {
        type: BORROWED_UPDATED,
        borrowed,
    };
}

export function ordersUpdated(orders){

    return {
        type: ORDERS_UPDATED,
        orders,
    };
}
