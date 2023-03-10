export function convertDurationToTimeString(duration: number): string {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = Math.floor(duration % 60);

  //00:00:00 format
  const timeString = [hours, minutes, seconds]
    .map((item) => String(item).padStart(2, "0"))
    .join(":");

  return timeString;
}
