export function formatMongoDate(dateString: string): string {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    // Formats the date to a readable string like "Dec 25, 2024"
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

