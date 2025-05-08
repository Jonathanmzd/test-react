export function formatDate(input: string | Date): string {
   const date = new Date(input);
   const pad = (num: number) => num.toString().padStart(2, '0');
 
   const day = pad(date.getDate());
   const month = pad(date.getMonth() + 1);
   const year = date.getFullYear();
   const hours = pad(date.getHours());
   const minutes = pad(date.getMinutes());
   const seconds = pad(date.getSeconds());
   
   return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
 }