export default function formatDate(date: string): string {
	// Format YYYY-MM-DD to DD-MM-YYYY
	return date
      .split('-')
      .reverse()
      .join('-');
}
