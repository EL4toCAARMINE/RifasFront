// Convierte un valor de tipo date en unix
function convertToUnix(dateTimeString) {
    const dateTime = new Date(dateTimeString);
    const unixTime = Math.floor(dateTime.getTime() / 1000)
    return unixTime;
}

// Convierte unix en date
function unixToDate(unixTime) {
    const date = new Date(unixTime * 1000);

    if (!unixTime) {
        return "";
    }

    const year = date.getUTCFullYear();
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const day = date.getUTCDate().toString().padStart(2, '0'); 

    return `${year}-${month}-${day}`;
}

// Convierte unix en String
function unixToString(unixTime) {
    const date = new Date(unixTime * 1000);
    const year = date.getUTCFullYear();
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const day = date.getUTCDate().toString().padStart(2, '0');
    const hour = ('0' + date.getUTCHours()).slice(-2);
    const minutes = ('0' + date.getUTCSeconds()).slice(-2);
    
    return `${year}-${month}-${day} ${hour}:${minutes}`;
}

// Convertir un timestamp UNIX a formato "dd-MMM-yyyy"
function unixToStringYMD(unixTimestamp) {
    const months = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];
    const date = new Date(unixTimestamp * 1000);
    const year = date.getUTCFullYear();
    const month = months[(date.getUTCMonth())];
    const day = date.getUTCDate().toString().padStart(2, '0');
    return `${day}/${month}/${year}`;
  }

export {unixToDate, unixToString, convertToUnix, unixToStringYMD};