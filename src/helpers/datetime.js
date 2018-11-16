import moment from 'moment';

/**
 * Returns a greeting string respecting following rules:
 *
 * 4:00am - 12:00 noon : good morning
 * 12:01pm - 04:00pm : good afternoon
 * 4:01pm - 8:00 pm : Good evening
 * 8:01pm - 3:59am : Good night.
 *
 * @param momentDate Moment object represent the datetime
 */
export function getMomentGreeting(momentDate) {
    if (!momentDate) return '';

    const currentHour = momentDate.hours();

    if (currentHour >= 4 && currentHour < 12) {
        return "Good morning";
    } else if (currentHour >= 12 && currentHour < 16) {
        return "Good afternoon";
    } else if (currentHour > 16 && currentHour < 20) {
        return "Good evening";
    }
    return "Good night";
}
