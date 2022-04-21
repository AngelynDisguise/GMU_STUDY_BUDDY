import React , { useState, useEffect } from 'react';
import { Link, Route, Routes, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';


function EditProfile(){
    const initialValues = {
        password: "",
        name: "",
        dob: "",
        gender: "",
        major: "",
        bio: "",
    };

    async function onSubmit(data){
        try {
          //HTTP Request to post data to server
          const responseVal = await axios.post("http://localhost:3001/users/register", data);
          //Save and display response from server
          console.log("(onSubmit) ResponseVal: "+responseVal.data); //works
          //Assign token if user authenticated
        } catch(error) {
            console.log(error);
        }
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email address.')
        .matches(/@gmu.edu/, 'Must be a GMU email address (i.e. student@gmu.edu)')
        .required('GMU email is required.'),
        password: Yup.string()
          .min(5, 'Password must be 5-15 characters.')
          .max(15, 'Password must be 5-15 characters.')
          .required('Password is required.')
    });
 
    return(
        <Formik 
            initialValues={initialValues} 
            onSubmit={onSubmit} 
            validationSchema={validationSchema}
        >

            <Form className = 'ed-form-container'>
              <ErrorMessage className="ed-err" name="email" component="span" />
              
                <div className='ed-form-header'>
                    <h2>Edit Profile</h2>
                </div>

                <div className='ed-form-body'>
                    <div className= 'ed-password-container'>
                        <label>Password: </label>
                        <Field 
                            id="password" 
                            type="password" 
                            name="password" 
                            placeholder="{password}" 
                        />
                    </div>

                    <div className='ed-name-container'>
                        <label>Name: </label>
                        <Field
                            id="name"
                            type="name"
                            name="name"
                            placeholder="{Name}"
                        />
                    </div>

                    <div className='ed-dob-container'>
                        <label>DOB: </label>
                        <Field
                            id="dob"
                            type="dob"
                            name="dob"
                            placeholder="{dob}"
                        />
                    </div>

                    <div className='ed-gender-container'>
                        <label>Gender: </label>
                        <Field
                            id="gender"
                            type="gender"
                            name="gender"
                            placeholder="{gender}"
                        />
                    </div>

                    <div className='ed-major-container'>
                        <label>Major: </label>
                        <Field
                            id="major"
                            type="major"
                            name="major"
                            placeholder="{major}"
                        />
                    </div>

                    <div className='ed-bio-container'>
                        <label>Bio: </label>
                        <Field
                            id="bio"
                            type="bio"
                            name="bio"
                            placeholder="{bio}"
                        />
                    </div>
                    
                    <ErrorMessage className="ed-err" name="password" component="span" />
                    <button type="submit">Update</button>
                </div>
                

              
            </Form>

        </Formik>
    )
}

export default EditProfile;