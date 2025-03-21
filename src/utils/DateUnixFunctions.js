function convertToUnix(dateTimeString) {
    const dateTime = new Date(dateTimeString);
    return Math.floor(dateTime.getTime() / 1000);
}

function unixToDate(unixTime) {
    if (!unixTime) {
        return "";
    }
     
    const date = new Date(unixTime * 1000);
    const options = { timeZone: 'America/Mexico_City', year: 'numeric', month: '2-digit', day: '2-digit' };
    const formattedDate = new Intl.DateTimeFormat('es-MX', options).format(date);
    
    return formattedDate;
}

function unixToString(unixTime) {
    const months = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];
    const date = new Date(unixTime * 1000);
    
    // Opciones para la zona horaria de Ciudad de México
    const options = { timeZone: 'America/Mexico_City', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
    const formattedDate = new Intl.DateTimeFormat('es-MX', options).format(date);
    
    const [day, month, year, hour, minutes] = formattedDate.split(/[/ :]/);
    const monthName = months[parseInt(month) - 1]; // Convertir número de mes a nombre
    
    return `${day}/${monthName}/${year} - ${hour}:${minutes}`;
}

function unixToString2(unixTime) {
    const date = new Date(unixTime * 1000);
    
    // Opciones para la zona horaria de Ciudad de México
    const options = { timeZone: 'America/Mexico_City', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
    const formattedDate = new Intl.DateTimeFormat('es-MX', options).format(date);
    
    const [day, month, year, hour, minutes] = formattedDate.split(/[/ :]/);
    
    return `${year}-${month}-${day} ${hour}:${minutes}`;
}

function unixToStringYMD(unixTimestamp) {
    const months = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];
    const date = new Date(unixTimestamp * 1000);
    
    // Opciones para la zona horaria de Ciudad de México
    const options = { timeZone: 'America/Mexico_City', year: 'numeric', month: '2-digit', day: '2-digit' };
    const formattedDate = new Intl.DateTimeFormat('es-MX', options).format(date);
    
    const [day, month, year] = formattedDate.split(/[/ :]/);
    const monthName = months[parseInt(month) - 1]; // Convertir número de mes a nombre
    
    return `${day}/${monthName}/${year}`;
}

export { convertToUnix, unixToDate, unixToString, unixToStringYMD };