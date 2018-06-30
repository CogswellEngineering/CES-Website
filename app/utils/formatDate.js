
function formatMDY(date){

    console.log("current year", date.getFullYear() );
    const formattedDate = date.getMonth() + "/" + date.getDay() + "/" + date.getFullYear();

    return formattedDate;
}

export {
    formatMDY}
    ;