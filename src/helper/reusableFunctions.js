export const removeBigWhiteSpace = function (name) {
    const inputValue = name
        .toLowerCase()
        .replaceAll(/\s+/g, "+")
        .split("+")
        .join(" ")
        .trim();
    const inputValueFormated = inputValue.split(" ");
    const namesUpper = [];

    for (const n of inputValueFormated) {
        namesUpper.push(n[0].toUpperCase() + n.slice(1));
    }
    return namesUpper.join(" ");
};