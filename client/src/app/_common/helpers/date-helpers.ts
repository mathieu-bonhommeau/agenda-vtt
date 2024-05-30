import dayjs from 'dayjs'

export const monthsFr = [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre',
]

export type Weeks = { [weekIndex: string]: { startDate: string; endDate: string } }
export const getWeeks = (startDate: Date, numberOfWeeks: number): Weeks => {
    const weeks: { [weekIndex: string]: { startDate: string; endDate: string } } = {}
    let date = new Date(startDate)
    const weekNumber = dayjs(date).week()

    // Get the current Monday
    while (date.getDay() !== 1) {
        date.setDate(date.getDate() - 1)
    }

    for (let i = weekNumber; i < numberOfWeeks + weekNumber; i++) {
        const startDate = new Date(date)
        date.setDate(date.getDate() + 6)
        const endDate = new Date(date)

        weeks[i] = {
            startDate: startDate.toLocaleDateString('FR-fr', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            }),
            endDate: endDate.toLocaleDateString('FR-fr', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            }),
        }
        date.setDate(date.getDate() + 1)
    }
    return weeks
}
