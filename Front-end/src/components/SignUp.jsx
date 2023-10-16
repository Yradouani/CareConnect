import React from 'react';
import axios from '../api/axios';
import { useRef, useState, useEffect } from 'react';
import { BsCheckLg } from "react-icons/bs";
import { ImCross } from "react-icons/im";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { CgDanger } from "react-icons/cg";
import Login from './Login';

const SignUp = (props) => {
    const registerFirstname = useRef();
    const registerLastname = useRef();
    const registerPhone = useRef();
    const registerEmail = useRef();
    const registerPassword = useRef();
    const registerConfirmPassword = useRef();
    const registerRole = useRef();
    const registerSocialSecurityNumber = useRef();
    const registerDateOfBirth = useRef();
    const registerSpecialization = useRef();
    const registerOfficeAddress = useRef();
    const registerOfficePostalCode = useRef();
    const registerOfficeCity = useRef();
    const registerRPPSNumber = useRef();
    const errRef = useRef();

    const specializationList = ["Médecin généraliste", "Cardiologue", "Dermatologue", "Gastro-entérologue", "Pédiatre", "Psychiatre", "Orthopédiste", "Chirurgien", "Ophtalmologiste", "Dentiste", "Gynécologue", "Ostéopathe", "Endocrinologue", "Pneumologue", "ORL"];

    //REGEX
    const USER_REGEX = /^[a-zA-Z][a-zA-Z-éÉèÈàÀùÙâÂêÊîÎôÔûÛïÏëËüÜçÇ]{2,24}$/;
    const PHONE_REGEX = /^\d{10,13}$/;
    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%£§&]).{8,24}$/;
    const SOCIAL_SECURITY_REGEX = /^[0-9]{15}$/;
    const ADDRESS_REGEX = /^\d+\s+[\w\s-]+$/;
    const POSTAL_CODE_REGEX = /^[0-9]{5}$/;
    const RPPS_REGEX = /^[0-9]{11}$/;
    const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const DATE_OF_BIRTH_REGEX = /^\d{4}-\d{2}-\d{2}$/;

    //Register constants
    const SIGNIN_URL = '/inscription';

    const [socialSecurityNumber, setSocialSecurityNumber] = useState('');
    const [validSocialSecurityNumber, setValidSocialSecurityNumber] = useState(false);
    const [socialSecurityNumberFocus, setSocialSecurityNumberFocus] = useState(false);

    const [firstName, setFirstName] = useState('');
    const [validFirstName, setValidFirstName] = useState(false);
    const [firstNameFocus, setFirstNameFocus] = useState(false);

    const [lastName, setLastName] = useState('');
    const [validLastName, setValidLastName] = useState(false);
    const [lastNameFocus, setLastNameFocus] = useState(false);

    const [phone, setPhone] = useState('');
    const [validPhone, setValidPhone] = useState(false);
    const [phoneFocus, setPhoneFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [role, setRole] = useState('');
    const [validRole, setValidRole] = useState(false);

    const [dateOfBirth, setDateOfBirth] = useState('');
    const [validDateOfBirth, setValidDateOfBirth] = useState(false);
    const [dateOfBirthFocus, setDateOfBirthFocus] = useState(false);

    const [specialization, setSpecialization] = useState('');
    const [validSpecialization, setValidSpecialization] = useState(false);
    const [specializationFocus, setSpecializationFocus] = useState(false);

    const [officeAddress, setOfficeAddress] = useState('');
    const [validOfficeAddress, setValidOfficeAddress] = useState(false);
    const [officeAddressFocus, setOfficeAddressFocus] = useState(false);

    const [officePostalCode, setOfficePostalCode] = useState('');
    const [validOfficePostalCode, setValidOfficePostalCode] = useState(false);
    const [officePostalCodeFocus, setOfficePostalCodeFocus] = useState(false);

    const [officeCity, setOfficeCity] = useState('');
    const [validOfficeCity, setValidOfficeCity] = useState(false);
    const [officeCityFocus, setOfficeCityFocus] = useState(false);

    const [RPPSNumber, setRPPSNumber] = useState('');
    const [validRPPSNumber, setValidRPPSNumber] = useState(false);
    const [RPPSNumberFocus, setRPPSNumberFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    //Focus on first element when page is loaded
    useEffect(() => {
        registerFirstname.current.focus();
    }, [])

    useEffect(() => {
        const result = SOCIAL_SECURITY_REGEX.test(socialSecurityNumber);
        setValidSocialSecurityNumber(result);
        //eslint-disable-next-line
    }, [socialSecurityNumber])

    useEffect(() => {
        const result = USER_REGEX.test(firstName);
        setValidFirstName(result);
        //eslint-disable-next-line
    }, [firstName])

    useEffect(() => {
        const result = USER_REGEX.test(lastName);
        setValidLastName(result);
        //eslint-disable-next-line
    }, [lastName])

    useEffect(() => {
        const result = PHONE_REGEX.test(phone);
        setValidPhone(result);
        //eslint-disable-next-line
    }, [phone])

    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        setValidEmail(result);
        //eslint-disable-next-line
    }, [email])

    useEffect(() => {
        setValidRole(role);
        //eslint-disable-next-line
    }, [role])

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatch(match);
        //eslint-disable-next-line
    }, [pwd, matchPwd])

    useEffect(() => {
        const isDateOfBirthValid = DATE_OF_BIRTH_REGEX.test(dateOfBirth);
        const isOver18YearsOld = calculateAge(dateOfBirth) >= 18;
        setValidDateOfBirth(isDateOfBirthValid && isOver18YearsOld);
        //eslint-disable-next-line
    }, [dateOfBirth])

    useEffect(() => {
        const result = specializationList.includes(specialization);
        setValidSpecialization(result);
        //eslint-disable-next-line
    }, [specialization])

    useEffect(() => {
        const result = ADDRESS_REGEX.test(officeAddress);
        setValidOfficeAddress(result);
        //eslint-disable-next-line
    }, [officeAddress])

    useEffect(() => {
        const result = POSTAL_CODE_REGEX.test(officePostalCode);
        setValidOfficePostalCode(result);
        //eslint-disable-next-line
    }, [officePostalCode])

    useEffect(() => {
        const result = USER_REGEX.test(officeCity);
        setValidOfficeCity(result);
        //eslint-disable-next-line
    }, [officeCity])

    useEffect(() => {
        const result = RPPS_REGEX.test(RPPSNumber);
        setValidRPPSNumber(result);
        //eslint-disable-next-line
    }, [RPPSNumber])

    useEffect(() => {
        setErrMsg('');
    }, [firstName, lastName, email, pwd, matchPwd, role])


    function calculateAge(dateOfBirth) {
        const birthDate = new Date(dateOfBirth);
        const currentDate = new Date();
        const age = currentDate.getFullYear() - birthDate.getFullYear();

        if (
            currentDate.getMonth() < birthDate.getMonth() ||
            (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate())
        ) {
            return age - 1;
        }
        return age;
    }

    const handleRegister = async (e) => {
        e.preventDefault();

        if (
            validFirstName
            && validLastName
            && validEmail
            && validPwd
            && validMatch
            && validRole
            && (role !== "doctor" || (validSpecialization && validOfficeAddress && validOfficePostalCode && validOfficeCity && validRPPSNumber))
            && (role !== "patient" || (validDateOfBirth && validSocialSecurityNumber))
        ) {
            try {
                const response = await axios.post(
                    SIGNIN_URL,
                    JSON.stringify({
                        firstname: firstName,
                        lastname: lastName,
                        phone,
                        role,
                        email,
                        password: pwd,
                        confirm_password: matchPwd,
                        ...(role === "patient" ? { dateOfBirth, socialSecurityNumber } : {}),
                        ...(role === "doctor" ? { specialization, officeAddress, officePostalCode, officeCity, RPPSNumber } : {})
                    }),
                    {
                        headers: { 'Content-Type': 'application/json' },
                        // withCredentials: true
                    }
                );
                props.setSuccess(true);
                props.setSignUp(false);
            } catch (err) {
                console.log(err);
                if (!err?.response) {
                    setErrMsg('Pas de réponse du serveur');
                } else if (err.response?.status === 409) {
                    setErrMsg("Inscription échouée");
                }
                errRef.current.focus();
            }
        } else {
            setErrMsg("Formulaire invalide");
            return;
        }
    }

    return (
        <>
            {props.success ? (
                <div>
                    <Login />
                </div>
            ) : (
                <div className='signup'>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
                        {errMsg}
                    </p>
                    <form onSubmit={(e) => handleRegister(e)}>
                        <table>
                            <tbody>
                                {/* FirstName */}
                                <tr>
                                    <td>
                                        <label htmlFor="firstname">Prénom * :
                                            <span className={validFirstName ? "valid" : "hide"}>
                                                <BsCheckLg />
                                            </span>
                                            <span className={validFirstName || !firstName ? "hide" : "invalid"}>
                                                <ImCross />
                                            </span>
                                        </label>
                                    </td>
                                    <td><input
                                        type="text"
                                        name="firstname"
                                        id="firstname"
                                        required
                                        ref={registerFirstname}
                                        autoComplete='off'
                                        aria-invalid={validFirstName ? "false" : "true"}
                                        aria-describedby="firstnamenote"
                                        onChange={(e) => setFirstName(e.target.value)}
                                        onFocus={() => setFirstNameFocus(true)}
                                        onBlur={() => setFirstNameFocus(false)}
                                    /></td>
                                </tr>
                                <tr>
                                    <td colspan="2" id="firstnamenote" className={firstNameFocus && firstName && !validFirstName ? "instructions" : "offscreen"}>
                                        <CgDanger className='danger' />
                                        Entre 3 et 23 lettres
                                    </td>
                                </tr>

                                {/* LastName */}
                                <tr>
                                    <td>
                                        <label htmlFor="lastname">Nom * :
                                            <span className={validLastName ? "valid" : "hide"}>
                                                <BsCheckLg />
                                            </span>
                                            <span className={validLastName || !lastName ? "hide" : "invalid"}>
                                                <ImCross />
                                            </span>
                                        </label>
                                    </td>
                                    <td><input
                                        type="text"
                                        name="lastname"
                                        id="lastname"
                                        required
                                        ref={registerLastname}
                                        autoComplete='off'
                                        aria-invalid={validLastName ? "false" : "true"}
                                        aria-describedby="lastnamenote"
                                        onChange={(e) => setLastName(e.target.value)}
                                        onFocus={() => setLastNameFocus(true)}
                                        onBlur={() => setLastNameFocus(false)}
                                    /></td>
                                </tr>
                                <tr>
                                    <td colspan="2" id="lastnamenote" className={lastNameFocus && lastName && !validLastName ? "instructions" : "offscreen"}>
                                        <CgDanger className='danger' />
                                        Entre 3 et 23 lettres
                                    </td>
                                </tr>

                                {/* Phone */}
                                <tr>
                                    <td>
                                        <label htmlFor="phone">Numéro de téléphone * :
                                            <span className={validPhone ? "valid" : "hide"}>
                                                <BsCheckLg />
                                            </span>
                                            <span className={validPhone || !phone ? "hide" : "invalid"}>
                                                <ImCross />
                                            </span>
                                        </label>
                                    </td>
                                    <td><input
                                        type="text"
                                        name="phone"
                                        id="phone"
                                        required
                                        ref={registerPhone}
                                        autoComplete='off'
                                        aria-invalid={validPhone ? "false" : "true"}
                                        aria-describedby="lastnamenote"
                                        onChange={(e) => setPhone(e.target.value)}
                                        onFocus={() => setPhoneFocus(true)}
                                        onBlur={() => setPhoneFocus(false)}
                                    /></td>
                                </tr>
                                <tr>
                                    <td colspan="2" id="phone" className={phoneFocus && phone && !validPhone ? "instructions" : "offscreen"}>
                                        <CgDanger className='danger' />
                                        Veuillez saisir un numéro de téléphone valide
                                    </td>
                                </tr>

                                {/* Input for Email */}
                                <tr>
                                    <td>
                                        <label htmlFor="email">Email * :
                                            <span className={validEmail ? "valid" : "hide"}>
                                                <BsCheckLg />
                                            </span>
                                            <span className={validEmail || !email ? "hide" : "invalid"}>
                                                <ImCross />
                                            </span>
                                        </label>
                                    </td>
                                    <td><input
                                        type="email"
                                        name="email"
                                        id="email"
                                        required
                                        ref={registerEmail}
                                        autoComplete='off'
                                        aria-invalid={validEmail ? "false" : "true"}
                                        aria-describedby="emailnote"
                                        onChange={(e) => setEmail(e.target.value)}
                                        onFocus={() => setEmailFocus(true)}
                                        onBlur={() => setEmailFocus(false)}
                                    /></td>
                                </tr>
                                <tr>
                                    <td colspan="2" id="emailnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                                        <CgDanger className='danger' />
                                        Veuillez saisir un email correct
                                    </td>
                                </tr>

                                {/* Input for Password */}
                                <tr>
                                    <td>
                                        <label htmlFor="password">Mot de passe * :
                                            <span className={validPwd ? "valid" : "hide"}>
                                                <BsCheckLg />
                                            </span>
                                            <span className={validPwd || !pwd ? "hide" : "invalid"}>
                                                <ImCross />
                                            </span>
                                        </label>
                                    </td>
                                    <td className='password_content'>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            id="password"
                                            required
                                            ref={registerPassword}
                                            aria-invalid={validPwd ? "false" : "true"}
                                            aria-describedby="passwordnote"
                                            onChange={(e) => setPwd(e.target.value)}
                                            onFocus={() => setPwdFocus(true)}
                                            onBlur={() => setPwdFocus(false)}
                                        />
                                        {!showPassword ?
                                            (<AiFillEyeInvisible
                                                className='eye'
                                                onClick={() => setShowPassword(!showPassword)}
                                            />) : (<AiFillEye
                                                className='eye'
                                                onClick={() => setShowPassword(!showPassword)}
                                            />)
                                        }
                                    </td>
                                </tr>
                                <tr >
                                    <td colspan="2" id="passwordnote" className={pwdFocus && pwd && !validPwd ? "instructions" : "offscreen"}>
                                        <CgDanger className='danger' />
                                        8 caractères min, dont 1 minuscule, 1 majuscule, 1 chiffre et 1 caractère spécial
                                    </td>
                                </tr>

                                {/* Input for confirm password */}
                                <tr>
                                    <td><label htmlFor="confirmPassword">Confirmer le mot de passe * :
                                        <span className={validMatch && matchPwd ? "valid" : "hide"}>
                                            <BsCheckLg />
                                        </span>
                                        <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                                            <ImCross />
                                        </span>
                                    </label></td>
                                    <td className='password_content'>
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            name="confirmPassword"
                                            id="confirmPassword"
                                            required
                                            ref={registerConfirmPassword}
                                            aria-invalid={validMatch ? "false" : "true"}
                                            aria-describedby="confirmpasswordnote"
                                            onChange={(e) => setMatchPwd(e.target.value)}
                                            onFocus={() => setMatchFocus(true)}
                                            onBlur={() => setMatchFocus(false)}
                                        />
                                        {!showConfirmPassword ?
                                            (<AiFillEyeInvisible
                                                className='eye'
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            />) : (<AiFillEye
                                                className='eye'
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            />)
                                        }
                                    </td>
                                </tr>
                                {validPwd ?
                                    <tr>
                                        <td colspan="2" id="confirmpasswordnote" className={matchFocus && matchPwd && !validMatch ? "instructions" : "offscreen"}>
                                            <CgDanger className='danger' />
                                            La confirmation ne correspond pas au mot de passe
                                        </td>
                                    </tr>
                                    :
                                    <tr>
                                        <td colspan="2" id="confirmpasswordnote" className={matchFocus && matchPwd && !validMatch ? "instructions" : "offscreen"}>
                                            <CgDanger className='danger' />
                                            Veuillez entrer un mot de passe valide avant de confirmer
                                        </td>
                                    </tr>
                                }

                                {/* Input for Role */}
                                <tr>
                                    <td>
                                        <label>Vous êtes :

                                            <span className={validRole ? "valid" : "hide"}>
                                                <BsCheckLg />
                                            </span>
                                            <span className={validRole || !role ? "hide" : "invalid"}>
                                                <ImCross />
                                            </span>
                                        </label>
                                    </td>
                                    <td>
                                        <input
                                            type="radio"
                                            name="role"
                                            value="patient"
                                            ref={registerRole}
                                            onChange={(e) => setRole(e.target.value)}
                                        />
                                        <label htmlFor="patientRole">Patient</label>
                                        <input
                                            type="radio"
                                            name="role"
                                            value="doctor"
                                            ref={registerRole}
                                            onChange={(e) => setRole(e.target.value)}
                                        />
                                        <label htmlFor="doctorRole">Docteur</label>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2" id="rolenote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                                        <CgDanger className='danger' />
                                        Veuillez choisir une des 2 options
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        {role === "patient" ?
                            (
                                <table>
                                    <tbody>
                                        {/* SocialSecurityNumber */}
                                        <tr>
                                            <td>
                                                <label htmlFor="socialSecurityNumber">Numéro de sécurité sociale * :
                                                    <span className={validSocialSecurityNumber ? "valid" : "hide"}>
                                                        <BsCheckLg />
                                                    </span>
                                                    <span className={validSocialSecurityNumber || !socialSecurityNumber ? "hide" : "invalid"}>
                                                        <ImCross />
                                                    </span>
                                                </label></td>
                                            <td><input
                                                type="text"
                                                name="socialSecurityNumber"
                                                id="socialSecurityNumber"
                                                required
                                                autoComplete='off'
                                                aria-invalid={validSocialSecurityNumber ? "false" : "true"}
                                                aria-describedby="socialSecurityNumbernote"
                                                ref={registerSocialSecurityNumber}
                                                onChange={(e) => setSocialSecurityNumber(e.target.value)}
                                                onFocus={() => setSocialSecurityNumberFocus(true)}
                                                onBlur={() => setSocialSecurityNumberFocus(false)}
                                            /></td>
                                        </tr>
                                        <tr>
                                            <td colspan="2" id="socialSecurityNumbernote" className={socialSecurityNumberFocus && socialSecurityNumber && !validSocialSecurityNumber ? "instructions" : "offscreen"}>
                                                <CgDanger className='danger' />
                                                15 chiffres obligatoires
                                            </td>
                                        </tr>

                                        {/* DateOfBirth */}
                                        <tr>
                                            <td>
                                                <label htmlFor="dateOfBirth">Date de naissance * :
                                                    <span className={validDateOfBirth ? "valid" : "hide"}>
                                                        <BsCheckLg />
                                                    </span>
                                                    <span className={validDateOfBirth || !dateOfBirth ? "hide" : "invalid"}>
                                                        <ImCross />
                                                    </span>
                                                </label>
                                            </td>

                                            <td><input
                                                type="date"
                                                name="dateOfBirth"
                                                id="dateOfBirth"
                                                required
                                                ref={registerDateOfBirth}
                                                autoComplete='off'
                                                aria-invalid={validDateOfBirth ? "false" : "true"}
                                                aria-describedby="dateofbirthnote"
                                                onChange={(e) => setDateOfBirth(e.target.value)}
                                                onFocus={() => setDateOfBirthFocus(true)}
                                                onBlur={() => setDateOfBirthFocus(false)}
                                            /></td>
                                        </tr>
                                        <tr>
                                            <td colspan="2" id="dateofbirthnote" className={dateOfBirthFocus && dateOfBirth && !validDateOfBirth ? "instructions" : "offscreen"}>
                                                <CgDanger className='danger' />
                                                Vous devez avoir au moins 18 ans pour vous inscrire
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            )
                            :
                            ""
                        }
                        {role === "doctor" ? (
                            <table>
                                <tbody>
                                    {/* Specialization */}
                                    <tr>
                                        <td>
                                            <label htmlFor="specialization">Domaine d'exercice * :
                                                <span className={validSpecialization ? "valid" : "hide"}>
                                                    <BsCheckLg />
                                                </span>
                                                <span className={validSpecialization || !specialization ? "hide" : "invalid"}>
                                                    <ImCross />
                                                </span>
                                            </label>
                                        </td>
                                        <td>
                                            <select
                                                name="specialization"
                                                id="specialization"
                                                required
                                                aria-invalid={validSpecialization ? "false" : "true"}
                                                aria-describedby="specializationnote"
                                                ref={registerSpecialization}
                                                onChange={(e) => setSpecialization(e.target.value)}
                                                onFocus={() => setSpecializationFocus(true)}
                                                onBlur={() => setSpecializationFocus(false)}
                                            >
                                                {specializationList.map((specialization, index) => (
                                                    <option key={index} value={specialization}>
                                                        {specialization}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="2" id="specializationnote" className={specializationFocus && specialization && !validSpecialization ? "instructions" : "offscreen"}>
                                            <CgDanger className='danger' />
                                            Veuillez choisir un domaine d'exercice
                                        </td>
                                    </tr>

                                    {/* OfficeAddress */}
                                    <tr>
                                        <td>
                                            <label htmlFor="officeAddress">Adresse du cabinet * :
                                                <span className={validOfficeAddress ? "valid" : "hide"}>
                                                    <BsCheckLg />
                                                </span>
                                                <span className={validOfficeAddress || !officeAddress ? "hide" : "invalid"}>
                                                    <ImCross />
                                                </span>
                                            </label>
                                        </td>

                                        <td><input
                                            type="text"
                                            name="officeAddress"
                                            id="officeAddress"
                                            required
                                            ref={registerOfficeAddress}
                                            autoComplete='off'
                                            aria-invalid={validOfficeAddress ? "false" : "true"}
                                            aria-describedby="officeaddressnote"
                                            onChange={(e) => setOfficeAddress(e.target.value)}
                                            onFocus={() => setOfficeAddressFocus(true)}
                                            onBlur={() => setOfficeAddressFocus(false)}
                                        /></td>
                                    </tr>
                                    <tr>
                                        <td colspan="2" id="officeaddressnote" className={officeAddressFocus && officeAddress && !validOfficeAddress ? "instructions" : "offscreen"}>
                                            <CgDanger className='danger' />
                                            Veuillez saisir une adresse valide
                                        </td>
                                    </tr>

                                    {/* OfficePostalCode */}
                                    <tr>
                                        <td>
                                            <label htmlFor="officePostalCode">Code postal du cabinet * :
                                                <span className={validOfficePostalCode ? "valid" : "hide"}>
                                                    <BsCheckLg />
                                                </span>
                                                <span className={validOfficePostalCode || !officePostalCode ? "hide" : "invalid"}>
                                                    <ImCross />
                                                </span>
                                            </label>
                                        </td>

                                        <td><input
                                            type="text"
                                            name="officePostalCode"
                                            id="officePostalCode"
                                            required
                                            ref={registerOfficePostalCode}
                                            autoComplete='off'
                                            aria-invalid={validOfficePostalCode ? "false" : "true"}
                                            aria-describedby="officepostalcodenote"
                                            onChange={(e) => setOfficePostalCode(e.target.value)}
                                            onFocus={() => setOfficePostalCodeFocus(true)}
                                            onBlur={() => setOfficePostalCodeFocus(false)}
                                        /></td>
                                    </tr>
                                    <tr>
                                        <td colspan="2" id="officepostalcodenote" className={officePostalCodeFocus && officePostalCode && !validOfficePostalCode ? "instructions" : "offscreen"}>
                                            <CgDanger className='danger' />
                                            Veuillez saisir un code postal valide
                                        </td>
                                    </tr>

                                    {/* OfficeCity */}
                                    <tr>
                                        <td>
                                            <label htmlFor="officeCity">Ville du cabinet * :
                                                <span className={validOfficeCity ? "valid" : "hide"}>
                                                    <BsCheckLg />
                                                </span>
                                                <span className={validOfficeCity || !officeCity ? "hide" : "invalid"}>
                                                    <ImCross />
                                                </span>
                                            </label>
                                        </td>

                                        <td><input
                                            type="text"
                                            name="officeCity"
                                            id="officeCity"
                                            required
                                            ref={registerOfficeCity}
                                            autoComplete='off'
                                            aria-invalid={validOfficeCity ? "false" : "true"}
                                            aria-describedby="officecitynote"
                                            onChange={(e) => setOfficeCity(e.target.value)}
                                            onFocus={() => setOfficeCityFocus(true)}
                                            onBlur={() => setOfficeCityFocus(false)}
                                        /></td>
                                    </tr>
                                    <tr>
                                        <td colspan="2" id="officecitynote" className={officeCityFocus && officeCity && !validOfficeCity ? "instructions" : "offscreen"}>
                                            <CgDanger className='danger' />
                                            Veuillez saisir une ville valide
                                        </td>
                                    </tr>

                                    {/* RPPSNumber */}
                                    <tr>
                                        <td>
                                            <label htmlFor="officeCity">Numéro RPPS * :
                                                <span className={validRPPSNumber ? "valid" : "hide"}>
                                                    <BsCheckLg />
                                                </span>
                                                <span className={validRPPSNumber || !RPPSNumber ? "hide" : "invalid"}>
                                                    <ImCross />
                                                </span>
                                            </label>
                                        </td>

                                        <td><input
                                            type="text"
                                            name="RPPSNumber"
                                            id="RPPSNumber"
                                            required
                                            ref={registerRPPSNumber}
                                            autoComplete='off'
                                            aria-invalid={validRPPSNumber ? "false" : "true"}
                                            aria-describedby="rppsnumbernote"
                                            onChange={(e) => setRPPSNumber(e.target.value)}
                                            onFocus={() => setRPPSNumberFocus(true)}
                                            onBlur={() => setRPPSNumberFocus(false)}
                                        /></td>
                                    </tr>
                                    <tr>
                                        <td colspan="2" id="rppsnumbernote" className={RPPSNumberFocus && RPPSNumber && !validRPPSNumber ? "instructions" : "offscreen"}>
                                            <CgDanger className='danger' />
                                            Veuillez saisir un numéro RPPS valide
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        ) : ""}

                        <div className='signup_submit'>
                            <input
                                type="submit"
                                value="S'inscrire"
                            />
                        </div>
                    </form >
                </div >
            )}
        </>
    );
};

export default SignUp;