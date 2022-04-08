import '../styles/Register.css';

function Register (){
    return(
        <div className='Register'>
            <label>
                <p>Enter Username</p>
                <input type="text"/>
            </label>
            
            <label>
                <p>Enter Password</p>
                <input type="password"/>
            </label>

            <label>
                <p>Re-enter Password</p>
                <input type="password"/>
            </label>

            <label>
                <p>Enter e-mail</p>
                <input type="text"/>
            </label>

            <label>
                <p>First Name</p>
                <input type="text"/>
            </label>

            <label>
                <p>Last Name</p>
                <input type="text"/>
            </label>
            
            <div>
                <br></br>
                <button type="submit">Submit</button>
            </div>
        </div>
    );
}

export default Register