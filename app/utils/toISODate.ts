import { parse } from 'date-fns';
import { ru } from 'date-fns/locale';

export function toISODate(russianDate: string): string {
    const parsedDate = parse(russianDate, 'd MMMM yyyy', new Date(), { locale: ru });
    return parsedDate.toISOString();
}
