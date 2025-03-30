export const buildUserProfileURL = (href, userID) => {
    let userProfileURL = new URL(href);
    let userProfileURLParameters = new URLSearchParams(userProfileURL.search);
    userProfileURLParameters.set("user_id", userID);
    userProfileURL.search = userProfileURLParameters.toString();
    return userProfileURL;
}

export const buildLinkURL = (href, key, value) => {
    let givenURL = new URL(href);
    let URLParameters = new URLSearchParams(givenURL.search);
    URLParameters.set(key, value);
    givenURL.search = URLParameters.toString();
    return givenURL;
}

export const getURLParameter = (href, key) => {
    let givenURL = new URL(href);
    let URLParameters = new URLSearchParams(givenURL.search);
    return URLParameters.get(key);
}

export const getLoggedUserID = () => {
    let userID = localStorage.getItem("user_id");
    return userID === null || userID === undefined ? "0" : userID;
}

export const parseDateTimeLocal = (datetimeLocal) => {
    const date = new Date(datetimeLocal);

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const dayOfWeek = days[date.getDay()];
    const dayOfMonth = date.getDate();
    const month = months[date.getMonth()];
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    const timeString = `${hours}:${minutes}`;

    return `${dayOfWeek} ${dayOfMonth}, ${month} ${timeString}`;
};