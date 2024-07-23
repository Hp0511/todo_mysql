function uuidv4() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0,
            v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
  }

function formatDate(isoDate) {
    console.log(isoDate);
    const dateObject = isoDate ? new Date(isoDate) : new Date();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObject.getDate().toString().padStart(2, '0');
    const year = dateObject.getFullYear();
    const formattedDate = `${month}/${day}/${year}`;
    return formattedDate;
}

export {uuidv4,formatDate};