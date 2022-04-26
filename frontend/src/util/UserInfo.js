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

// function deleteUser(email) {
//     try {
//         const response = await axios.post("http://localhost:3001/users/remove", data);
//     } catch (error) {
//         return error;
//     }
//     return response.data;
// }

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

// function addStudyBuddy(data) {
//     //data = email
//     try {
//         const response = await axios.get("http://localhost:3001/users/addStudyBuddy", data);
//     } catch (error) {
//         return error;
//     }
//     return response.data;
// }

// function removeStudyBuddy(data) {
//     //data = email
//     try {
//         const response = await axios.get("http://localhost:3001/users/removeStudyBuddy", data);
//     } catch (error) {
//         return error;
//     }
//     return response.data;
// }