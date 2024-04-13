export const setCookie = (name: string, value: string, minutes: string): void => {
    const minutesNumber = parseInt(minutes)
    const date = new Date()
    date.setTime(date.getTime() + minutesNumber * 60 * 1000)
    const expires = 'expires=' + date.toUTCString()
    document.cookie = name + '=' + value + ';' + expires + ';path=/'
}

export const getCookie = (name: string, value?: string): boolean => {
    let nameEQ = name + '='
    let ca = document.cookie.split(';')
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i]
        while (c.charAt(0) === ' ') c = c.substring(1, c.length)
        if (c.indexOf(nameEQ) === 0) {
            const cookieValue = c.substring(nameEQ.length, c.length)
            if (value !== undefined) {
                return cookieValue === value
            }
            return true
        }
    }
    return false
}

export function deleteCookie(name: string, value?: string): void {
    if (value === undefined) {
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'
    } else {
        let nameEQ = name + '='
        let ca = document.cookie.split(';')
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i]
            while (c.charAt(0) === ' ') c = c.substring(1, c.length)
            if (c.indexOf(nameEQ) === 0) {
                const cookieValue = c.substring(nameEQ.length, c.length)
                if (cookieValue === value) {
                    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'
                    break
                }
            }
        }
    }
}
