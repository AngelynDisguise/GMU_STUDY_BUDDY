import React , { useState, } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
//import moment from 'moment';

import SelectField from '../util/SelectField'
import '../styles/Register.css';

export default function Register(props) {
    const [response, setResponse] = useState("");
    const [registered, setRegistered] = useState(false);
    const [email, setEmail] = useState("");
    const [tok, setTok] = useState("");

    if(registered){
        return(
            <Register2/>
        );
    } else {
        return (
            <Register1/>
        );
    }

    function Register1() {
        // const [response, setResponse] = useState("");
        // const [registered, setRegistered] = useState(false);

        const initialValues = {
            email: "",
            password: "",
        };
    
        function statusMessage(response){
            if (registered) {
                //console.log("(statusMessage) Registered: "+registered);
                return (<p className="status-message" 
                style={{color: 'blue', paddingTop: '.5em'}}
                >
                Registration successful!
                </p>);
            } else {
                //console.log("(statusMessage) Registered: "+registered);
                return (<p className="status-message" 
                style={{color: 'red', paddingTop: '.5em'}}
                >
                {response}
                </p>);
            }
        };
    
        function authenticate(response, data) {
            //response is the token
            //console.log("(authenticate) Response: "+response); //doesn't work
            if (response !== "User already exists!" &&
            response !== "") {
                const userToken = JSON.stringify(response.data);
                //console.log("(statusMessage) Registered: "+registered);
                console.log("(authenticate) email: ", data.email);
                props.setUserEmail(data.email);
                setEmail(data.email);
                setTok(userToken);
                //console.log("(authenticate) token: ", userToken);
                setRegistered(true); //redirect to Register2 
            } else console.log("auth failed");
            //statusMessage will display returned error response
        }
        
        async function onSubmit(data){
            try {
                //HTTP Request to post data to server
                const responseVal = await axios.post("http://localhost:3001/users/register", data);
                //Save and display response from server
                setResponse(responseVal.data); //doesn't save until after function???
                console.log("(onSubmit) ResponseVal: "+responseVal.data); //works
                //Assign token if user authenticated
                authenticate(responseVal.data, data);
                console.log("(statusMessage) Registered: "+registered);
            } catch(error) {
                console.log("(onSubmit) Error: "+error);
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
            // <Register2 />
            <div className='login-wrapper'>
                <div className= 'login-banner'>
                    <h1>GMU STUDY BUDDY</h1>
                    <h3>... a Tinder-like social media app for Mason students looking for study buddies!</h3>
                </div>
                <div className = 'login-wrapper'>
                    <div className= 'login-title'>
                        <h1>Register:</h1>
                    </div>
                    {statusMessage(response)}
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
        );
    }

    function Register2(){
        const initialValues = {
            //password: "",
            pfp: "",
            firstName: "",
            lastName: "",
            date: "",
            preferences: [],
            // byMajor: false,
            // byGender: false,
            // byAge: false,
            gender: "",
            major: "",
            bio: "", //not required
            classTaken: [], //not required (yet)
        };
    
        async function onSubmit(data){
            try {
                console.log(data);
                let list = [];
                data.classesTaken.forEach((item) => list.push(item.value));
                let pref = [];
                data.preferences.forEach((item) => {
                    if(item === 'byGender'){
                        pref.push({byGender: true});
                    }
                    if(item === 'byMajor'){
                        pref.push({byMajor: true});
                    }
                    if(item === 'byAge'){
                        pref.push({byAge: true});
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
                    localStorage.setItem('userEmail', email);
                    localStorage.setItem('token', tok);
                    props.setToken(tok);
                } else throw "Something went wrong...";
            } catch(error) {
                console.log(error);
            }
        };
        
        // Yup.addMethod(date, 'format', function format(formats, parseStrict) {
        //     return this.transform((value, originalValue, ctx) => {
        //         if (ctx.isType(value)) return value;
        //         value = mmomoment(originalValue, formats, parseStrict);
        //         return value.isValid() ? value.toDate() : new Date('');
        //     });
        // });

        const selectObjects = [
            {
                label: "CS 112",
                value: "CS 112"
            },
            {
                label: "CS 211",
                value: "CS 211"
            },
            {
                label: "CS 310",
                value: "CS 310"
            },
            {
                label: "CS 321",
                value: "CS 321"
            },
            {
                label: "CS 367",
                value: "CS 367"
            },
            {
                label: "CS 330",
                value: "CS 330"
            }
            ];


        const validationSchema = Yup.object().shape({
            pfp: Yup.mixed()
                .nullable()
                .notRequired(),
                // .test("fileSize", "The file is too large", (value) => {
                //     if (!value.length) return true // profile pic is optional
                //     return value[0].size <= 2000000})
                    //.required("Profile image is required."),
            firstName: Yup.string()
                .required('First name is required.'),
            lastName: Yup.string(),
                //.required('Last name is required.'),
            //Validate birthdate by month/date/year
            //MM/DD/YYYY
            date: Yup.date()
                .max(new Date(), 'Birthday must be in the past.')
                .typeError('Date format must be MM/DD/YYYY')
                //.format('DD-MM-YYYY', true)
                .required('Birthday is required.'),
            preferences: Yup.mixed(),
                //.required('Preferences are required.'),
            gender: Yup.string()
                .required("Gender is required."),
            major: Yup.string()
                .required('Major is required.'),
            bio: Yup.string()
                .max(500, "Bio cannot exceed 500 characters.")
                .nullable()
                .notRequired(),
            classesTaken: Yup.mixed()
                .nullable()
                .notRequired(),
                //.required("Classes taken are required."),
        });
    
        return(
            <Formik 
                initialValues={initialValues} 
                onSubmit={onSubmit} 
                validationSchema={validationSchema}
            >
                <Form className = 'ed-form-container'>
                    <div className='ed-form-header'>
                        <h2>Create Your Account</h2>
                    </div>
                    <h3 className="ed-profile-info-title">Profile Information: </h3>
                    <div className='ed-profile-info-body'>
                        <div className="ed-pfp-container">
                            <label>Profile Picture: </label>
                            <Field
                                id="pfp"
                                type="file"
                                name="pfp"
                            />
                        </div>
                        <div className='ed-name-container'>
                            <label>First Name/Nickname: </label>
                            <Field
                                id="firstName"
                                type="firstName"
                                name="firstName"
                                placeholder="{ eg. John }"
                            />
                            <ErrorMessage className="ed-err" name="firstName" component="span" />
                            <label>Last Name: </label>
                            <Field
                                id="lastName"
                                type="lastName"
                                name="lastName"
                                placeholder="{ eg. Otten }"
                            />
                            <ErrorMessage className="ed-err" name="lastName" component="span" />
                        </div>
                        <div className='ed-dob-container'>
                            <label>Date of Birth: </label>
                            <Field
                                id="date"
                                type="date"
                                name="date"
                                placeholder="{ MM/DD/YYYY }"
                            />
                        </div>
                        <ErrorMessage className="ed-err" name="date" component="span" />
                        <div className='ed-gender-container'>
                            <label>Gender: </label>
                            <Field 
                                as="select" 
                                name="gender"
                                id="gender"
                                type="gender"
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Non-binary">Non-binary</option>
                                <option value="Other">Other</option>
                            </Field>
                        </div>
                        <ErrorMessage className="ed-err" name="gender" component="span" />
                        <div className='ed-major-container'>
                            <label>Major: </label>
                            <Field
                                id="major"
                                type="major"
                                name="major"
                                    placeholder="{ e.g. Computer Science }"
                            />
                        </div>
                        <ErrorMessage className="ed-err" name="major" component="span" />
                        <div className='ed-bio-container'>
                            <label>Bio (optional): </label>
                            <Field
                                as="textarea"
                                id="bio"
                                type="bio"
                                name="bio"
                            />
                        </div>
                        <ErrorMessage className="ed-err" name="bio" component="span" />
                        <div className='ed-class-container'>
                            <label>Classes Taken (optional): </label>
                            <Field
                                component={SelectField}
                                options={selectObjects}
                                id="classesTaken"
                                type="classesTaken"
                                name="classesTaken"
                            />
                        </div>
                        <ErrorMessage className="ed-err" name="classesTaken" component="span" />
                    </div>
                    <h3 className="ed-preferences-title">Matching Preferences: </h3>
                    <div className='ed-preferences-container'>
                        <div className='ed-pref-container'>
                            <label>
                                <Field type="checkbox" name="preferences" value="byMajor"/>
                                Major
                            </label>
                            <label>
                                <Field type="checkbox" name="preferences" value="byGender"/>
                                Gender
                            </label>
                            <label>
                                <Field type="checkbox" name="preferences" value="byAge"/>
                                Age
                            </label>
                        </div>
                    </div>
                    <button className="r2-button" type="submit">Create Account</button>
                </Form>
            </Formik>
        )
    }
}

//******************************************************************************************************* */

Register.propTypes = {
    setToken: PropTypes.func.isRequired,
    setUserEmail: PropTypes.func.isRequired,
    setRegister: PropTypes.func.isRequired
};
