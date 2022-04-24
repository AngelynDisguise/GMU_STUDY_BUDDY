import React , { useState, } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
//import moment from 'moment';
import '../styles/Register.css';
import '../styles/Auth.css';

export default function Register(props) {
    const [response, setResponse] = useState("");
    const [registered, setRegistered] = useState(false);
    const [email, setEmail] = useState("");
    const [tok, setTok] = useState("");

    if(registered){
        return(
            <Register2 />
        );
    } else {
        return (
            <Register1 />
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
            // register2()
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
            //pfp: null,
            //password: "",
            firstName: "",
            //lastName: "",
            date: "",
            major: "",
            //bio: "",
        };
    
        async function onSubmit(data){
            try {
                let request = { ...data, email: email };
                //console.log(request);
                const responseVal = await axios.post("http://localhost:3001/users/register2", request);
                console.log(responseVal.data);
                if (responseVal) {
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


        const validationSchema = Yup.object().shape({
            firstName: Yup.string()
                .required('First name is required.'),
            //Validate birthdate by month/date/year
            //MM/DD/YYYY
            date: Yup.date()
                .max(new Date(), 'Birthday must be in the past.')
                .typeError('Date format must be MM/DD/YYYY')
                //.format('DD-MM-YYYY', true)
                .required('Birthday is required.'),
            gender: Yup.string(),
            major: Yup.string()
                .required('Major is required.'),
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
                        <div className='ed-name-container'>
                            <label>First Name: </label>
                            <Field
                                id="firstName"
                                type="firstName"
                                name="firstName"
                                placeholder="{ eg. John }"
                            />
                            <ErrorMessage className="ed-err" name="firstName" component="span" />
                        </div>
                        <div className='ed-dob-container'>
                            <label>Date of Birth: </label>
                            <Field
                                id="date"
                                type="date"
                                name="date"
                                placeholder="{ MM/DD/YYYY }"
                            />
                            <ErrorMessage className="ed-err" name="date" component="span" />
                        </div>
    
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
                            <ErrorMessage className="ed-err" name="gender" component="span" />
                        </div>
                        <div className='ed-major-container'>
                            <label>Major: </label>
                            <Field
                                id="major"
                                type="major"
                                name="major"
                                    placeholder="{ e.g. Computer Science }"
                            />
                            <ErrorMessage className="ed-err" name="major" component="span" />
                        </div>
                        {/* <div className='ed-bio-container'>
                            <label>Bio: </label>
                            <Field
                                id="bio"
                                type="bio"
                                name="bio"
                                placeholder="{bio}"
                            />
                        </div> */}
                        
                        <button type="submit">Create Account</button>
                    </div>
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