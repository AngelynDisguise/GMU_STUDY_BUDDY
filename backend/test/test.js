const express = require("express");
const chai = require("chai");
const request = require("supertest");

const app = express();

//Angelyn
describe('GET Health', () => {
    it('should test that the express server is working', () => {
        request(app)
        .get('health')
        .send({})
        .expect(200)
        .then((res) => {
         expect(res.json).to.be.eql("Health Check Success!");
         // more validations can be added here as required
        });
    });
});


//Manav
describe('GET UserList', () => {
    it('should get the list of users in the database', () => {
        request(app)
        .get('/users/userList')
        .send({})
        .expect(200)
        .then((res) => {
         expect(res.json).to.not.eql("No users found!");
         expect(res.json).to.not.eql("Error fetching users list! :(");
         // more validations can be added here as required
        });
    });
});