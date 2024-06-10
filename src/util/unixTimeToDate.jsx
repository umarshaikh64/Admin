function unixTimeToDate(unixTimestamp) {
  const timestampInMilliseconds = unixTimestamp * 1000;
  const date = new Date(timestampInMilliseconds);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

export default unixTimeToDate;
