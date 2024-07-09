export const formatDateToFR = (timestamp: Date) => {
    const date = new Date(timestamp)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')

    const today = new Date()
    const yesterday = new Date()
    yesterday.setDate(today.getDate() - 1)

    const isToday = today.toDateString() === date.toDateString()
    const isYesterday = yesterday.toDateString() === date.toDateString()

    if (isToday) {
        return `Aujourd'hui à ${hours}:${minutes}`
    } else if (isYesterday) {
        return `Hier à ${hours}:${minutes}`
    } else {
        return `${day}/${month}/${year} à ${hours}:${minutes}`
    }
}
