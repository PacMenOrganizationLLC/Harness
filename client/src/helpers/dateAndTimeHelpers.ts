export function getTimeNoSeconds(input: Date | string | undefined) {
  if (!input) return ""
  const date = new Date(input);
  const formattedTime = date.toLocaleString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  return formattedTime;
}
