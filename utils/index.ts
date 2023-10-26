export function formatDate_UTIL(unixtime: Date | string | number, isShort = true): string {
  if (!unixtime) {
    return '--.--.----'
  }
  const date = new Date(unixtime)

  if (isShort) {
    return (
      ('0' + date.getDate())?.slice(-2) +
      '.' +
      ('0' + (date.getMonth() + 1))?.slice(-2) +
      '.' +
      date.getFullYear()
    )
  }

  return (
    ('0' + date.getDate())?.slice(-2) +
    '.' +
    ('0' + (date.getMonth() + 1))?.slice(-2) +
    '.' +
    date.getFullYear() +
    ' ' +
    ('0' + date.getHours()).slice(-2) +
    ':' +
    ('0' + date.getMinutes()).slice(-2)
  )
}

export function hours_UTIL(hour: number) {
    let timer = ''
            const hours = Math.floor((hour % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((hour % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((hour % (1000 * 60)) / 1000);
            
            timer = `${ ("0" + hours).slice(-2) }:${ ("0" + minutes).slice(-2) }:${ ("0" + seconds).slice(-2) }`
  

    return timer
    
}