const toUnixTime = (date: string | undefined): number => {
  if (date === undefined) throw new Error("date is undefined");
  const formatted = date.replace("/", "T") + ":00";
  const unixdate = new Date(formatted);
  if (isNaN(unixdate.getTime())) throw new Error("Invalid date format");
  return unixdate.getTime();
}