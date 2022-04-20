import axios from 'axios';

function getUserInfo() {
    try {
        const response = await axios.get("http://localhost:3001/users");
    } catch (error) {
        return error;
    }
    return response.data;
}

function update(data) {
    //data = email, date
    try {
        const response = await axios.get("http://localhost:3001/users/register2", data);
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