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

export const calculateTimeDifferenceInMinutes = (isoDateTime: string): string => {
    // Obtener la fecha actual
    const currentDate = new Date()

    // Obtener las horas y minutos seleccionados
    const selectedTime = new Date(isoDateTime)
    const selectedHours = selectedTime.getHours()
    const selectedMinutes = selectedTime.getMinutes()

    // Calcular la diferencia en minutos
    const differenceMinutes = selectedHours * 60 + selectedMinutes

    return differenceMinutes.toString()
}
