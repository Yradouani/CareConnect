import React, { useState } from 'react';
//Icons
import { CgDanger } from "react-icons/cg";
import { BsCheckLg } from "react-icons/bs";
import { ImCross } from "react-icons/im";

const FormAddAppointment = ({ handleAddAppointment,
    validDateOfAppointment,
    dateOfAppointment,
    setDateOfAppointment,
    validTimeOfAppointment,
    timeOfAppointment,
    setTimeOfAppointment,
    validEndTimeOfAppointment,
    endTimeOfAppointment,
    setEndTimeOfAppointment,
    validDuration,
    duration,
    setDuration,
    closeModal }) => {

    const [dateOfAppointmentFocus, setDateOfAppointmentFocus] = useState(false);
    const [timeOfAppointmentFocus, setTimeOfAppointmentFocus] = useState(false);
    const [endTimeOfAppointmentFocus, setEndTimeOfAppointmentFocus] = useState(false);
    const [durationFocus, setDurationFocus] = useState(false);

    return (
        <form onSubmit={e => handleAddAppointment(e)}>
            <label htmlFor="appointment-date">
                <span data-testid="check-icon" className={validDateOfAppointment ? "valid" : "hide"}>
                    <BsCheckLg />
                </span>
                <span data-testid="cross-icon" className={validDateOfAppointment || !dateOfAppointment ? "hide" : "invalid"}>
                    <ImCross />
                </span>
                Date du rendez-vous* :
            </label>
            <input
                type="date"
                name="appointment-date"
                required
                id="appointment-date"
                data-testid="appointment-date-input"
                aria-invalid={validDateOfAppointment ? "false" : "true"}
                aria-describedby="datenote"
                onChange={(e) => setDateOfAppointment(e.target.value)}
                onFocus={() => setDateOfAppointmentFocus(true)}
                onBlur={() => setDateOfAppointmentFocus(false)}
            />
            <div id="datenote" data-testid="appointment-date-note" className={dateOfAppointmentFocus && dateOfAppointment && !validDateOfAppointment ? "instructions" : "offscreen"}>
                <CgDanger className='danger' />
                Date invalide (ne peut pas être antérieure à la date actuelle)
            </div>

            <label htmlFor="appointment-time">
                <span data-testid="check-icon-time" className={validTimeOfAppointment ? "valid" : "hide"}>
                    <BsCheckLg />
                </span>
                <span data-testid="cross-icon-time" className={validTimeOfAppointment || !timeOfAppointment ? "hide" : "invalid"}>
                    <ImCross />
                </span>
                De* :</label>
            <input
                type="time"
                name="appointment-time"
                id="appointment-time"
                required
                aria-invalid={validTimeOfAppointment ? "false" : "true"}
                aria-describedby="timenote"
                data-testid="appointment-time-input"
                onChange={(e) => setTimeOfAppointment(e.target.value)}
                onFocus={() => setTimeOfAppointmentFocus(true)}
                onBlur={() => setTimeOfAppointmentFocus(false)}
            />
            <div id="timenote" className={timeOfAppointmentFocus && timeOfAppointment && !validTimeOfAppointment ? "instructions" : "offscreen"}>
                <CgDanger className='danger' />
                Heure invalide (au moins une heure après l'heure actuelle)
            </div>

            <label htmlFor="endappointment-time">
                <span data-testid="check-icon-end-time" className={validEndTimeOfAppointment ? "valid" : "hide"}>
                    <BsCheckLg />
                </span>
                <span data-testid="cross-icon-end-time" className={validEndTimeOfAppointment || !endTimeOfAppointment ? "hide" : "invalid"}>
                    <ImCross />
                </span>
                à* :</label>
            <input
                type="time"
                name="endappointment-time"
                id="endappointment-time"
                required
                aria-invalid={validEndTimeOfAppointment ? "false" : "true"}
                aria-describedby="endtimenote"
                data-testid="appointment-end-time-input"
                onChange={(e) => setEndTimeOfAppointment(e.target.value)}
                onFocus={() => setEndTimeOfAppointmentFocus(true)}
                onBlur={() => setEndTimeOfAppointmentFocus(false)}
            />
            <div id="timenote" className={endTimeOfAppointmentFocus && endTimeOfAppointment && !validEndTimeOfAppointment ? "instructions" : "offscreen"}>
                <CgDanger className='danger' />
                Heure invalide (doit être postérieure à l'heure de début)
            </div>

            <label htmlFor="duration">
                <span data-testid="check-icon-duration" className={validDuration ? "valid" : "hide"}>
                    <BsCheckLg />
                </span>
                <span data-testid="cross-icon-duration" className={validDuration || !duration ? "hide" : "invalid"}>
                    <ImCross />
                </span>
                durée des rendez-vous en min* :</label>

            <input
                type="number"
                name="duration"
                id="duration"
                required
                aria-invalid={validDuration ? "false" : "true"}
                aria-describedby="durationnote"
                data-testid="appointment-duration-input"
                onChange={(e) => setDuration(e.target.value)}
                onFocus={() => setDurationFocus(true)}
                onBlur={() => setDurationFocus(false)}
            />
            <div id="durationnote" className={durationFocus && duration && !validDuration ? "instructions" : "offscreen"}>
                <CgDanger className='danger' />
                Durée des rendez-vous invalide
            </div>

            <input type="submit" value="Valider" />
            <button
                onClick={() => closeModal()}
            >Annuler</button>
        </form>
    );
};

export default FormAddAppointment;