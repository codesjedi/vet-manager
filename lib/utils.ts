import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateGreeting(time: Date) {
  const hour = time.getHours();

  let saludo: string;

  if (hour < 12 && hour > 6) {
    saludo = `Buenos dias 🌅`;
  } else if (hour > 12 && hour < 20) {
    saludo = `Buenas tardes 🌅`;
  } else {
    saludo = `Buenas noches 🌃`;
  }
  return saludo;
}
