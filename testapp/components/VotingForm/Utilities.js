import {CANDIDATE_NAME, PROVINCES, HAPPINESS_LABEL} from "../../constants";

export function GetHappinessName(value) {
    if (value === '') return;
    return HAPPINESS_LABEL[value];
}
export function GetCandidateName (value) {
    if (value === '') return;
    return CANDIDATE_NAME[value]
}
export function GetProvinceName (value){
    if (value === '') return;

    const position = PROVINCES.findIndex(function(province) {
        return province.code.toLowerCase() === value.toLowerCase()
    });
    return PROVINCES[position].name;
};

export function CalculateAge(dob) {
    var year = Number(dob.substr(0, 4));
    var month = Number(dob.substr(4, 2)) - 1
    var day = Number(dob.substr(6, 2))
    var today = new Date()
    var age = today.getFullYear() - year
    if (
        today.getMonth() < month ||
        (today.getMonth() === month && today.getDate() < day)
    ) {
        age--
    }
    return age
}

export function DayOfTheMonth(d) {
    return (d.getDate() < 10 ? '0' : '') + d.getDate();
}

export function GetMonthValue(d) {
    let month = d.getMonth() + 1;
    return month < 10 ? '0' + month : '' + month;
}
export function ConvertToFirestoreDateFormat(date) {
    let dateString = (date.getFullYear().toString() + GetMonthValue(date).toString() + DayOfTheMonth(date).toString())
    return dateString;
}
export function FormatBirthDate (date) {
    let day = DayOfTheMonth(date);
    let month = GetMonthValue(date);
    let year = date.getFullYear();
    return month + '/' + day + '/' + year
};

