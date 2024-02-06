export function getTimeNoSeconds(input: Date | string | undefined) {
  if (!input) return ""
  const date = new Date(input);
  const formattedTime = date.toLocaleString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  return formattedTime;
}

export function FormatDatetimeLocalInput(value: Date | string | undefined) {
  if (!value) return "";
  const date = new Date(value);
  return FormatYearMonthDay(date, "-") + "T" + FormatHourMinute(date);
}

export function FormatHourMinute(value: Date | string | undefined) {
  if (!value) return "";
  const date = new Date(value);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  });
}

export function FormatYearMonthDay(
  value: Date | string | undefined,
  delimiter: string = "/"
) {
  if (!value) return "";
  const date = new Date(value);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year + delimiter + month + delimiter + day}`;
}

export function FormatDate(date: Date): string {
  const d = new Date(date);
  return new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric' }).format(d);
}

