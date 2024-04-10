export const minutesToSeconds = (minutes: string): string => {
    const minutesNumber = parseFloat(minutes)

    if (isNaN(minutesNumber)) {
        return 'Invalid input'
    }

    const seconds = minutesNumber * 60
    return seconds.toString()
}

export const minutesToMilliseconds = (minutes: string): string => {
    const minutesNumber = parseFloat(minutes)

    if (isNaN(minutesNumber)) {
        return 'Invalid input'
    }

    const milliseconds = minutesNumber * 60 * 1000
    return milliseconds.toString()
}
