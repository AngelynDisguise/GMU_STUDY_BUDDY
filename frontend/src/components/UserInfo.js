import axios from 'axios';

function getUserInfo() {
    try {
        const response = await axios.get("http://localhost:3001/users");
    } catch (error) {
        return error;
    }
    return response.data;
}

function updateDate(data) {
    //data = email, date
    try {
        const response = await axios.get("http://localhost:3001/users/updateDate", data);
    } catch (error) {
        return error;
    }
    return response.data;
}

function updateGender(data) {
    //data = email, gender
    try {
        const response = await axios.get("http://localhost:3001/users/updateGender", data);
    } catch (error) {
        return error;
    }
    return response.data;
}

function updateFirstName(data) {
    //data = email, firstName
    try {
        const response = await axios.get("http://localhost:3001/users/updateFirstName", data);
    } catch (error) {
        return error;
    }
    return response.data;
}

function updateMajor(data) {
    //data = email, major
    try {
        const response = await axios.get("http://localhost:3001/users/updateMajor", data);
    } catch (error) {
        return error;
    }
    return response.data;
}

function removeUserInfo(data) {
    //data = email
    try {
        const response = await axios.get("http://localhost:3001/users/remove", data);
    } catch (error) {
        return error;
    }
    return response.data;
}