export const parseTypeArray = (obj) => {
    for (const key in obj) {
        if (obj[key] instanceof Array) {
          obj[key] = obj[key].join("");
        }
    }

    return obj;
}