export default function passportFilter(value) {
    //у фильтра 1 пареметр значения(value) это то которое стоит до черты |, см документац Intl.NumberFormat

    if (value) {
        let a =  value.split('')
        a.splice(4, 0, ' ')

        return a.join('')
    }
    return value
}
