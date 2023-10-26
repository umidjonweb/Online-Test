
export function useTimer(name: string, initialCountDownDate: number = 0) {
    let src: any = null    

    stopTimer()
    const timer = useState(name || Math.random().toString(), () => '')
    
    if (initialCountDownDate) startTimer(initialCountDownDate)

    function stopTimer() {
        clearInterval(src)
    }

    function startTimer(countDownDate: number) {
        if (src) stopTimer()

        src = setInterval(() => {
            if (!countDownDate) return
            
            const now = new Date().getTime();
            
            const timeleft = (Math.round(countDownDate * 1)) - now;    
            
            if (timeleft < 0) {
                
                timer.value = `0`
                clearInterval(src);
                return
            }
    
    
            const days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
            
            timer.value = `${ ("0" + hours).slice(-2) }:${ ("0" + minutes).slice(-2) }:${ ("0" + seconds).slice(-2) }`
        }, 1000)
    }

    return { 
        timer,    
        stopTimer,
        startTimer
    }
}