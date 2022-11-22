import React, { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
import Form from 'react-bootstrap/Form';

const NAME_REGEX = /^[a-zA-Z][a-zA-z]{1,23}$/;
const USERNAME_REGEX = /^[0-9]{9}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const ROLE_REGEX = /\b(student|lecturer)\b/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;



const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [name, setName] = useState('');
    const [validName, setValidName] = useState(false);
    const [nameFocus, setNameFocus] = useState(false);

    const [username, setUsername] = useState('');
    const [validUsername, setValidUsername] = useState(false);
    const [usernameFocus, setUsernameFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [role, setRole] = useState('');
    const [validRole, setValidRole] = useState(false);
    const [roleFocus, setRoleFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [confirmPassword, setConfirmPassword] = useState('');
    const [validConfirmPassword, setValidConfirmPassword] = useState(false);
    const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(NAME_REGEX.test(name));
    }, [name])

    useEffect(() => {
        setValidUsername(USERNAME_REGEX.test(username));
    }, [username])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setValidRole(ROLE_REGEX.test(role));
    }, [role])

    useEffect(() => {
        setValidPassword(PASSWORD_REGEX.test(password));
    }, [password])

    useEffect(() => {
        setValidPassword(PASSWORD_REGEX.test(password));
        const match = password === confirmPassword
        setValidConfirmPassword(match);
    }, [password, confirmPassword])

    useEffect(() => {
        setErrMsg('');
    }, [name, username, email, password, confirmPassword])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const v1 = NAME_REGEX.test(name);
        const v2 = USERNAME_REGEX.test(username);
        const v3 = EMAIL_REGEX.test(email);
        const v4 = PASSWORD_REGEX.test(confirmPassword);
        const v5 = ROLE_REGEX.test(role);

        if (!v1 || !v2 || !v3 || !v4 || !v5) {
            setErrMsg("Invalid Entry");
            return;
        }

        try {
            setSuccess(true);

            axios.post('http://localhost:3500/users/register', { name: name, username: username, email: email, password: password, role: role, status: undefined })
                .then(res => console.log(res.data))
            //clear state and controlled inputs
            //need value attrib on inputs for this
            setName('');
            setUsername('');
            setEmail('');
            setRole('');
            setConfirmPassword('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 500) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            {success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                        <a href="/create-user">Create Another</a>
                    </p>
                    <p>
                        <a href="/list-user">View Users</a>
                    </p>
                </section>
            ) : (
                <div className="register">
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="name">
                                Full name
                                <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validName || !name ? "hide" : "invalid"} />
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter full name"
                                id="name"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setName(e.target.value)}
                                required
                                aria-invalid={validName ? "false" : "true"}
                                aria-describedby="uidnote"
                                onFocus={() => setNameFocus(true)}
                                onBlur={() => setNameFocus(false)}
                            />
                        </Form.Group>
                        <p id="uidnote" className={nameFocus && name && !validName ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />2 to 24 characters.<br />
                            Letters only allowed.
                        </p>

                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="username">
                                Username
                                <FontAwesomeIcon icon={faCheck} className={validUsername ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validUsername || !username ? "hide" : "invalid"} />
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter student# / lecturer#"
                                id="username"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                aria-invalid={validUsername ? "false" : "true"}
                                aria-describedby="uidnote"
                                onFocus={() => setUsernameFocus(true)}
                                onBlur={() => setUsernameFocus(false)}
                            />
                        </Form.Group>
                        <p id="uidnote" className={usernameFocus && username && !validUsername ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />Please only enter 9 numbers.
                        </p>

                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="email">
                                Email
                                <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
                            </Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                id="email"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                aria-invalid={validEmail ? "false" : "true"}
                                aria-describedby="uidnote"
                                onFocus={() => setEmailFocus(true)}
                                onBlur={() => setEmailFocus(false)}
                            />
                        </Form.Group>
                        <p id="uidnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />Must have an @.<br />
                            Must have a domain.
                        </p>

                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="role">
                                Role
                                <FontAwesomeIcon icon={faCheck} className={validRole ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validRole || !role ? "hide" : "invalid"} />
                            </Form.Label><br />
                            <select
                                type="text"
                                id="role"
                                ref={userRef}
                                onChange={(e) => setRole(e.target.value)}
                                required
                                aria-invalid={validRole ? "false" : "true"}
                                aria-describedby="uidnote"
                                onFocus={() => setRoleFocus(true)}
                                onBlur={() => setRoleFocus(false)}
                            >
                                <option selected disabled="disabled">-- select an option --</option>
                                <option label="student" value="student">Student</option>
                                <option label="lecturer" value="lecturer">Lecturer</option>
                            </select>
                        </Form.Group>
                        <p id="uidnote" className={roleFocus && role && !validRole ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />Please select a valid option.
                        </p>

                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="password">
                                Password
                                <FontAwesomeIcon icon={faCheck} className={validPassword ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validPassword || !password ? "hide" : "invalid"} />
                            </Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter password"
                                id="password"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                aria-invalid={validPassword ? "false" : "true"}
                                aria-describedby="uidnote"
                                onFocus={() => setPasswordFocus(true)}
                                onBlur={() => setPasswordFocus(false)}
                            />
                        </Form.Group>
                        <p id="uidnote" className={passwordFocus && password && !validPassword ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} /> 8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters:
                            <span aria-label="exclamation mark"> ! </span>
                            <span aria-label="at symbol"> @ </span>
                            <span aria-label="hashtag"> # </span>
                            <span aria-label="dollar sign"> $ </span>
                            <span aria-label="pecent"> % </span>
                        </p>

                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="confirmPassword">
                                Confirm Password
                                <FontAwesomeIcon icon={faCheck} className={validConfirmPassword ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validConfirmPassword || !confirmPassword ? "hide" : "invalid"} />
                            </Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Re-enter password"
                                id="confirmPassword"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                aria-invalid={validConfirmPassword ? "false" : "true"}
                                aria-describedby="uidnote"
                                onFocus={() => setConfirmPasswordFocus(true)}
                                onBlur={() => setConfirmPasswordFocus(false)}
                            />
                        </Form.Group>
                        <p id="uidnote" className={confirmPasswordFocus && confirmPassword && !validConfirmPassword ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} /> 8 to 24 characters.<br />
                            Please match passwords correctly
                        </p>

                        <button disabled={!validName || !validUsername || !validEmail || !validPassword || !validConfirmPassword ? true : false}>
                            Submit
                        </button>
                    </form>
                </div>
            )}
        </>
    )
}

export default Register