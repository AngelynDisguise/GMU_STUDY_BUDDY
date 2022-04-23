import React , { useState, } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';

import '../styles/Register.css';

export default function Register(props) {
    const initialValues = {
        email: "",
        password: "",
    };
    
    const [response, setResponse] = useState("");
    const [registered, setRegistered] = useState(false);

    function statusMessage(response){
        if (registered) {
            console.log("(statusMessage) Registered: "+registered);
            return (<p className="status-message" 
            style={{color: 'blue', paddingTop: '.5em'}}
            >
            Registration successful!
            </p>);
        } else {
            console.log("(statusMessage) Registered: "+registered);
            return (<p className="status-message" 
            style={{color: 'red', paddingTop: '.5em'}}
            >
            {response}
            </p>);
        }
    };

    function authenticate(response) {
        //response is the token
        console.log("(authenticate) Response: "+response); //doesn't work
        if (response !== "User already exists!" &&
        response !== "") {
            const userToken = JSON.stringify(response);
            localStorage.setItem('token', userToken);
            setRegistered(true);
            console.log("(statusMessage) Registered: "+registered);
            props.setToken(userToken);
        }
    }
    
    async function onSubmit(data){
        try {
            //HTTP Request to post data to server
            const responseVal = await axios.post("http://localhost:3001/users/register", data);
            //Save and display response from server
            setResponse(responseVal.data); //doesn't save until after function???
            console.log("(onSubmit) ResponseVal: "+responseVal.data); //works
            console.log("(onSubmit) Response: "+response); //doesn't work
            //Assign token if user authenticated
            authenticate(responseVal.data);
            console.log("(statusMessage) Registered: "+registered);
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
        <div className='login-wrapper'>
            <div className= 'login-banner'>
            <h1>GMU STUDY BUDDY</h1>
            <h3>... a Tinder-like social media app for Mason students looking for study buddies!</h3>
            </div>
            <div className = 'login-wrapper'>
            <div className= 'login-title'>
                <h1>Register:</h1>
                {statusMessage(response)}
            </div>
            <Formik 
                initialValues={initialValues} 
                onSubmit={onSubmit} 
                validationSchema={validationSchema}
                >
                <Form className = 'form-container'>
                <div className='email-container'> 
                    <label>Email: </label>
                    <Field 
                    id="email" 
                    type="email" 
                    name="email" 
                    placeholder="{student@gmu.edu}"
                    />
                </div>
                <ErrorMessage className="err" name="email" component="span" />
                <div className= 'password-container'>
                    <label>Password: </label>
                    <Field 
                    id="password" 
                    type="password" 
                    name="password" 
                    placeholder="{password}" />
                </div>
                <ErrorMessage className="err" name="password" component="span" />
                <button type="submit">Register</button>
                </Form>
            </Formik>
            <button onClick={ () => {
                props.setRegister(false)
                }}>
                Already have an account?
            </button>
            </div> 
        </div>
    )
}

//******************************************************************************************************* */

  function register2(){
    const initialValues = {
        //pfp: null,
        password: "",
        name: "",
        month: "",
        dob: "",
        major: "",
        //bio: "",
    };

    async function onSubmit(data){
        try {
            console.log(data); //parse date...

          //HTTP Request to post data to server
          //const responseVal = await axios.post("http://localhost:3001/users/register2", data);
          //Save and display response from server
          //console.log("(onSubmit) ResponseVal: "+responseVal.data); //works
          //Assign token if user authenticated
        } catch(error) {
            console.log(error);
        }
    };

    const validationSchema = Yup.object().shape({
        password: Yup.string()
            .min(5, 'Password must be 5-15 characters.')
            .max(15, 'Password must be 5-15 characters.')
            .required('Password is required.'),
        name: Yup.string()
            .required('Name is required.'),
        //Validate birthdate by month/date/year
        //MM/DD/YYYY
        //
        dob: Yup.date()
            .max(new Date(), 'Birthday must be in the past.')
            .required('Birthday is required.'),
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
                    <h2>Create Your Account</h2>
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
                        <Field as="select" name="color">
                            <option value="red">Red</option>
                            <option value="green">Green</option>
                            <option value="blue">Blue</option>
                        </Field>
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

Register.propTypes = {
    setToken: PropTypes.func.isRequired,
    setUser: PropTypes.func.isRequired,
    setRegister: PropTypes.func.isRequired
};
