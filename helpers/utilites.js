const months = [{
    "abbreviation": "Jan",
    "name": "January"
},
    {
        "abbreviation": "Feb",
        "name": "February"
    },
    {
        "abbreviation": "Mar",
        "name": "March"
    },
    {
        "abbreviation": "Apr",
        "name": "April"
    },
    {
        "abbreviation": "May",
        "name": "May"
    },
    {
        "abbreviation": "Jun",
        "name": "June"
    },
    {
        "abbreviation": "Jul",
        "name": "July"
    },
    {
        "abbreviation": "Aug",
        "name": "August"
    },
    {
        "abbreviation": "Sep",
        "name": "September"
    },
    {
        "abbreviation": "Oct",
        "name": "October"
    },
    {
        "abbreviation": "Nov",
        "name": "November"
    },
    {
        "abbreviation": "Dec",
        "name": "December"
    }
]

const weekdaysShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

export const useFormatDate = (date) => {
    const day = date.getDate();
    const weekDay = date.getDay();
    const month = date.getMonth();
    const year = date.getFullYear();

    return `${weekdaysShort[weekDay]} ${day}, ${months[month].abbreviation} ${year}`
}

