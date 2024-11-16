export function extractDeviceIdFromUrl(url: string): string | null {
    const match = url.match(/\/details\/([^\/]*)\//)
    return match ? match[1] : null
}
