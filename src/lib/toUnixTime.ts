const toUnixTime = (date: string): number => {
  const formatted = date.replace("/", "T") + ":00";
  const unixdate = new Date(formatted);
  if (isNaN(unixdate.getTime())) throw new Error("Invalid date format");
  return unixdate.getTime();
}