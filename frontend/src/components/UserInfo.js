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

function getAllUserInfo() {
    try {
        const response = await axios.get("http://localhost:3001/users/userList");
    } catch (error) {
        return error;
    }
    return response.data;
}

function register(data) {
    //data = email, date
    try {
        const response = await axios.get("http://localhost:3001/users/register", data);
    } catch (error) {
        return error;
    }
    return response.data;
}

function login(data) {
    //data = email
    try {
        const response = await axios.get("http://localhost:3001/users/login", data);
    } catch (error) {
        return error;
    }
    return response.data;
}

function createMatchList(data) {
    //data = email
    try {
        const response = await axios.get("http://localhost:3001/users/match", data);
    } catch (error) {
        return error;
    }
    return response.data;
}

function addStudyBuddy(data) {
    //data = email
    try {
        const response = await axios.get("http://localhost:3001/users/addStudyBuddy", data);
    } catch (error) {
        return error;
    }
    return response.data;
}

function removeStudyBuddy(data) {
    //data = email
    try {
        const response = await axios.get("http://localhost:3001/users/removeStudyBuddy", data);
    } catch (error) {
        return error;
    }
    return response.data;
}