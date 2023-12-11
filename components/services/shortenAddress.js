export function getAddressSubstring(address) {
  if (address === null || address === undefined) return "N/A";
  const commas = address.split(","); // split the address into an array using commas as the separator
  if (commas.length < 4) {
    // if there are fewer than 4 commas, return the original address
    return address;
  } else {
    const startIndex = commas.length - 3; // get the index of the third last comma
    return commas.slice(startIndex).join(","); // join the array of address portions from the third last comma to the end back into a string using commas as the separator
  }
}
