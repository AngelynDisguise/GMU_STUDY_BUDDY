import axios from 'axios';

export async function getUserInfo(email) {
    //console.log("getUserInfo called, email: " + email);
    if (!email) return;
    try {
        const responseVal = await axios.post("http://localhost:3001/users", JSON.parse(`{ \"email\": \"${email}\" }`));
        //console.log("(UserInfo.getUserInfo) First name: " + responseVal.data.firstName);
        return (responseVal.data);
    } catch (err) {
        console.log("(UserInfo.getUserInfo) Error: " + err);
    }
}

export async function updateUserInfo(data) {
    //data params:
    // email,
    // password,
    // pfp,
    // firstName,
    // lastName,
    // date,
    // preferences, FIIIXXXX THISSSSS
    // gender,
    // major,
    // bio,
    // classesTaken
    try {
        console.log(data);
        let list = [];
        data.classesTaken.forEach((item) => list.push(item.value));
        let pref = [];
        data.preferences.forEach((item) => {
            if (item === 'byGender') {
                pref.push({ byGender: true });
            }
            if (item === 'byMajor') {
                pref.push({ byMajor: true });
            }
            if (item === 'byAge') {
                pref.push({ byAge: true });
            }
        });
        let request = {
            ...data,
            email: email,
            classesTaken: list,
            preferences: pref
        };
        //console.log(request);
        const responseVal = await axios.post("http://localhost:3001/users/register2", request);
        console.log(responseVal.data);
        if (responseVal) {
            localStorage.setItem('token', tok);
            props.setToken(tok);
        } else throw "Something went wrong...";
    } catch (error) {
        console.log(error);
    }
}

export async function deleteUser(email) {
    if (!email) return;
    try {
        const response = await axios.post("http://localhost:3001/users/remove", JSON.parse(`{ \"email\": \"${email}\" }`));
        return response;
    } catch (error) {
        return error;
    }
}

export async function popMatchUser(email) {
    if (!email) return;
    try {
        const response = await axios.post("http://localhost:3001/users/match/delete", JSON.parse(`{ \"email\": \"${email}\" }`));
        //console.log(response);
        return (response.data);
    } catch (error) {
        return error;
    }
}

export async function fetchMatchList(email) {
    if (!email) return;
    try {
        const response = await axios.post('http://localhost:3001/users/match', JSON.parse(`{ \"email\": \"${email}\" }`));
        if (response) {
            console.log("(UserInfo.fetchMatchList) response: " + response);
            return response.data;
        } else {
            throw "Something went wrong!";
        }
    } catch (error) {
        console.log("Home.js: fetchMatchList() error: " + error);
    }
}

export async function addStudyBuddy(userEmail, studyBuddyEmail) {
    //data = { userEmail, studyBuddyEmail }
    if (!userEmail || !studyBuddyEmail) return null;
    try {
        const response = await axios.post("http://localhost:3001/users/addStudyBuddy", JSON.parse(`{ \"userEmail\": \"${userEmail}\", \"studyBuddyEmail\": \"${studyBuddyEmail}\" }`));
        console.log("studyBuddy response: " + response.data);
        return response.data;
    } catch (error) {
        return error;
    }
}

export async function removeStudyBuddy(userEmail, studyBuddyEmail) {
    //data = { userEmail, studyBuddyEmail }
    if (!userEmail || !studyBuddyEmail) return null;
    try {
        const response = await axios.post("http://localhost:3001/users/removeStudyBuddy", JSON.parse(`{ \"userEmail\": \"${userEmail}\", \"studyBuddyEmail\": \"${studyBuddyEmail}\" }`));
        console.log("studyBuddy response: " + response.data);
        return response.data;
    } catch (error) {
        return error;
    }
}