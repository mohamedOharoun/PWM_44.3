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

export const getLoggedUserID = () => {
    let userID = localStorage.getItem("user_id");
    return userID === null || userID === undefined ? "1" : userID;
}