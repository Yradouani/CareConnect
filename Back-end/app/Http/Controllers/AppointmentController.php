<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;

class AppointmentController extends Controller
{
    public function addAppointment(Request $request)
    {
        //Vérifier qu'on ne peut pas prendre 2 fois le même rendez-vous
        try {
            $appointmentInfo = $request->validate([
                "dateOfAppointment" => ["required"],
                "timeOfAppointment" => ["required"],
                "doctor_id" => ["required"]
            ]);

            $appointment = new Appointment([
                'dateOfAppointment' => $appointmentInfo['dateOfAppointment'],
                'timeOfAppointment' => $appointmentInfo['timeOfAppointment'],
                'doctor_id' => $appointmentInfo['doctor_id']
            ]);
            $appointment->save();
            return response()->json($appointment, 200);
        } catch (Exception $e) {
            echo '</br> <b> Exception Message: ' . $e->getMessage() . '</b>';
        }
    }

    public function getAllAppointmentsOfOneDoctor($id)
    {
        try {
            $appointments = Appointment::where('doctor_id', $id)->get();
            return response()->json($appointments, 200);
        } catch (Exception $e) {
            echo '</br> <b> Exception Message: ' . $e->getMessage() . '</b>';
        }
    }
}
