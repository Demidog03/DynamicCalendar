const currentDate = document.querySelector('.current-date')
const daysTag = document.querySelector('.days')
const prevNextIcons = document.querySelectorAll('.icons span')
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December']

//getting current date, year and month
let date = new Date()
let currYear = date.getFullYear()
let currMonth = date.getMonth()


const renderCalendar = () => {
    let lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate() //getting last date of month ('0' index of next month)
    let lastWeekDayOfMonth = new Date(currYear, currMonth, lastDateOfMonth).getDay() //Index of week day of last day of month
    let firstWeekDayOfMonth = new Date(currYear, currMonth, 1).getDay() //getting the week number of first day of month
    let lastDateOfPrevMonth = new Date(currYear, currMonth, 0).getDate() //getting last date of previous month

    let liTags = ''
    console.log(lastWeekDayOfMonth)
    for (let i = firstWeekDayOfMonth; i > 0; i--) {
        liTags += `<li class="inactive">${lastDateOfPrevMonth-i+1}</li>`
    }
    for (let i = 1; i <= lastDateOfMonth; i++) {
        let isToday = i === date.getDate() && currMonth === new Date().getMonth()
        && currYear === new Date().getFullYear() ? 'active' : '';
        liTags += `<li class="${isToday}">${i}</li>`

    }
    //from week number of last day month until 6 (because at list 1 day is last day of month)
    //for example - 31 1 2 3 4 5 6 or 29 30 31 1 2 3 4
    //if last month is last day of week there is no continue and loop will not work
    for (let i = lastWeekDayOfMonth; i < 6; i++) {
        liTags += `<li class="inactive">${i-lastWeekDayOfMonth+1}</li>`
    }

    currentDate.innerHTML = `${months[currMonth]} ${currYear}`
    daysTag.innerHTML = liTags //inserting all li tags in 'days' tag
}
renderCalendar()

prevNextIcons.forEach(icon => {
    icon.addEventListener('click', ()=>{ //adding click event for both icons
        /**if calendar of 2022 year just*/
        //Updating month by clicking icons
        //I initially wrote if statements before the month update and in second case when month is 0
        //firstly it is going to set to -1 and there is infinite -1 loop
        //If it is 0 needed to change the month to 11 immediately
        currMonth = icon.id === 'prev' ? currMonth-1 : currMonth+1
        // if(currMonth<0){
        //     currMonth=11
        // }
        // if(currMonth>11){
        //     currMonth=0
        // }
        if(currMonth < 0 || currMonth > 11){
            date = new Date(currYear, currMonth)
            currYear = date.getFullYear()
            currMonth = date.getMonth()
        }
        else{
            date = new Date()
        }
        console.log(currMonth)
        renderCalendar()
    })
})