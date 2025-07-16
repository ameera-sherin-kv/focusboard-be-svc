export function getWeekdayRange(date: Date): Date[] {
    const start = new Date(date);
    const day = start.getDay();
    const mondayOffset = day === 0 ? -6 : 1 - day;
    const monday = new Date(start.setDate(start.getDate() + mondayOffset));
  
    return Array.from({ length: 5 }, (_, i) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      return d;
    });
  }
  
  export function formatDayLabel(date: Date): string {
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  }
  