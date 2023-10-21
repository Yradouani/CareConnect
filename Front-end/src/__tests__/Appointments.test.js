import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FormAddAppointment from '../components/FormAddAppointment';

describe('AddAppointment Component', () => {
    let handleAddAppointment;
    let validDateOfAppointment;
    let dateOfAppointment;
    let setDateOfAppointment;
    let validTimeOfAppointment;
    let timeOfAppointment;
    let setTimeOfAppointment;
    let validEndTimeOfAppointment;
    let endTimeOfAppointment;
    let setEndTimeOfAppointment;
    let validDuration;
    let duration;
    let setDuration;
    let closeModal;

    beforeEach(() => {
        handleAddAppointment = jest.fn();
        validDateOfAppointment = false; // Initial value
        dateOfAppointment = ''; // Initial value
        setDateOfAppointment = jest.fn();
        validTimeOfAppointment = jest.fn();
        timeOfAppointment = jest.fn();
        setTimeOfAppointment = jest.fn();
        validEndTimeOfAppointment = jest.fn();
        endTimeOfAppointment = jest.fn();
        setEndTimeOfAppointment = jest.fn();
        validDuration = jest.fn();
        duration = jest.fn();
        setDuration = jest.fn();
        closeModal = jest.fn();
    });

    it('should validate date input', async () => {
        const { rerender } = render(
            <FormAddAppointment
                handleAddAppointment={handleAddAppointment}
                validDateOfAppointment={validDateOfAppointment}
                dateOfAppointment={dateOfAppointment}
                setDateOfAppointment={setDateOfAppointment}
                validTimeOfAppointment={validTimeOfAppointment}
                timeOfAppointment={timeOfAppointment}
                setTimeOfAppointment={setTimeOfAppointment}
                validEndTimeOfAppointment={validEndTimeOfAppointment}
                endTimeOfAppointment={endTimeOfAppointment}
                setEndTimeOfAppointment={setEndTimeOfAppointment}
                validDuration={validDuration}
                duration={duration}
                setDuration={setDuration}
                closeModal={closeModal}
            />
        );

        // Vérifie que validDateOfAppointment est initialement faux
        expect(validDateOfAppointment).toBe(false);

        // Simule la saisie d'une date valide
        const dateInput = screen.getByTestId('appointment-date-input');
        fireEvent.change(dateInput, { target: { value: '2023-12-31' } });

        // Mise à jour du composant après le changement
        rerender(
            <FormAddAppointment
                handleAddAppointment={handleAddAppointment}
                validDateOfAppointment={validDateOfAppointment}
                dateOfAppointment={dateOfAppointment}
                setDateOfAppointment={setDateOfAppointment}
                validTimeOfAppointment={validTimeOfAppointment}
                timeOfAppointment={timeOfAppointment}
                setTimeOfAppointment={setTimeOfAppointment}
                validEndTimeOfAppointment={validEndTimeOfAppointment}
                endTimeOfAppointment={endTimeOfAppointment}
                setEndTimeOfAppointment={setEndTimeOfAppointment}
                validDuration={validDuration}
                duration={duration}
                setDuration={setDuration}
                closeModal={closeModal}
            />
        );

        // Vérifie que validDateOfAppointment est mis à jour à vrai
        expect(validDateOfAppointment).toBe(true);

        // Vérifie l'affichage des icônes
        const checkIcon = screen.getByTestId('check-icon');
        const crossIcon = screen.queryByTestId('cross-icon');
        expect(checkIcon).toHaveClass("valid");
        expect(crossIcon).toHaveClass("hide");
    });
});

// import React from 'react';
// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import FormAddAppointment from '../components/FormAddAppointment';

// describe('AddAppointment Component', () => {
//     let handleAddAppointment;
//     let validDateOfAppointment;
//     let dateOfAppointment;
//     let setDateOfAppointment;
//     let validTimeOfAppointment;
//     let timeOfAppointment;
//     let setTimeOfAppointment;
//     let validEndTimeOfAppointment;
//     let endTimeOfAppointment;
//     let setEndTimeOfAppointment;
//     let validDuration;
//     let duration;
//     let setDuration;
//     let closeModal;

//     beforeEach(() => {
//         handleAddAppointment = jest.fn();
//         validDateOfAppointment = jest.fn();
//         dateOfAppointment = jest.fn();
//         setDateOfAppointment = jest.fn();
//         validTimeOfAppointment = jest.fn();
//         timeOfAppointment = jest.fn();
//         setTimeOfAppointment = jest.fn();
//         validEndTimeOfAppointment = jest.fn();
//         endTimeOfAppointment = jest.fn();
//         setEndTimeOfAppointment = jest.fn();
//         validDuration = jest.fn();
//         duration = jest.fn();
//         setDuration = jest.fn();
//         closeModal = jest.fn();
//     });
//     it('should validate date input', async () => {

//         const { rerender } = render(
//             <FormAddAppointment
//                 handleAddAppointment={handleAddAppointment}
//                 validDateOfAppointment={validDateOfAppointment}
//                 dateOfAppointment={dateOfAppointment}
//                 setDateOfAppointment={setDateOfAppointment}
//                 validTimeOfAppointment={validTimeOfAppointment}
//                 timeOfAppointment={timeOfAppointment}
//                 setTimeOfAppointment={setTimeOfAppointment}
//                 validEndTimeOfAppointment={validEndTimeOfAppointment}
//                 endTimeOfAppointment={endTimeOfAppointment}
//                 setEndTimeOfAppointment={setEndTimeOfAppointment}
//                 validDuration={validDuration}
//                 duration={duration}
//                 setDuration={setDuration}
//                 closeModal={closeModal}
//             />
//         );

//         //Valid date
//         expect(validDateOfAppointment).toBe(false);
//         const dateInput = screen.getByTestId('appointment-date-input');
//         fireEvent.change(dateInput, { target: { value: '2023-12-31' } });


//         rerender(<FormAddAppointment
//             handleAddAppointment={handleAddAppointment}
//             validDateOfAppointment={validDateOfAppointment}
//             dateOfAppointment={dateOfAppointment}
//             setDateOfAppointment={setDateOfAppointment}
//             validTimeOfAppointment={validTimeOfAppointment}
//             timeOfAppointment={timeOfAppointment}
//             setTimeOfAppointment={setTimeOfAppointment}
//             validEndTimeOfAppointment={validEndTimeOfAppointment}
//             endTimeOfAppointment={endTimeOfAppointment}
//             setEndTimeOfAppointment={setEndTimeOfAppointment}
//             validDuration={validDuration}
//             duration={duration}
//             setDuration={setDuration}
//             closeModal={closeModal}
//         />)

//         expect(validDateOfAppointment).toBe(true);
//         const checkIcon = screen.getByTestId('check-icon');
//         expect(checkIcon).toHaveClass("valid");

//         await waitFor(() => {
//             const crossIcon = screen.queryByTestId('cross-icon');
//             expect(crossIcon).toHaveClass("hide");
//         })

//         //Invalid Date
//         // fireEvent.change(dateInput, { target: { value: '2021-01-01' } });

//         // await waitFor(() => {
//         //     const crossIcon = screen.getByTestId('cross-icon');
//         //     expect(crossIcon).toHaveClass("invalid");
//         // })
//         // await waitFor(() => {
//         //     const checkIcon = screen.getByTestId('check-icon');
//         //     expect(checkIcon).toHaveClass("hide");
//         // })
//     });

//     // it('should not validate date input', async () => {
//     //     render(
//     //         <FormAddAppointment
//     //             handleAddAppointment={handleAddAppointment}
//     //             validDateOfAppointment={validDateOfAppointment}
//     //             dateOfAppointment={dateOfAppointment}
//     //             setDateOfAppointment={setDateOfAppointment}
//     //             validTimeOfAppointment={validTimeOfAppointment}
//     //             timeOfAppointment={timeOfAppointment}
//     //             setTimeOfAppointment={setTimeOfAppointment}
//     //             validEndTimeOfAppointment={validEndTimeOfAppointment}
//     //             endTimeOfAppointment={endTimeOfAppointment}
//     //             setEndTimeOfAppointment={setEndTimeOfAppointment}
//     //             validDuration={validDuration}
//     //             duration={duration}
//     //             setDuration={setDuration}
//     //             closeModal={closeModal}
//     //         />
//     //     );

//     //     const dateInput = screen.getByTestId('appointment-date-input');
//     //     expect(dateInput).toBeInTheDocument();
//     //     fireEvent.change(dateInput, { target: { value: '2021-01-01' } });

//     //     const crossIcon = screen.getByTestId('cross-icon');
//     //     expect(crossIcon).toBeInTheDocument();

//     //     await waitFor(() => {
//     //         const checkIcon = screen.getByTestId('check-icon');
//     //         expect(checkIcon).toHaveClass("valid");
//     //     })
//     // });
// });