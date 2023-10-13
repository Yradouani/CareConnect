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
        try {
            $appointmentInfo = $request->validate([
                "dateOfAppointment" => ["required", "date"],
                "timeOfAppointment" => ["required", "date_format:H:i"],
                "endTimeOfAppointment" => ["required", "date_format:H:i"],
                "doctor_id" => ["required", "integer"]
            ]);

            $existingAppointment = Appointment::where('dateOfAppointment', $appointmentInfo['dateOfAppointment'])
                ->where('timeOfAppointment', $appointmentInfo['timeOfAppointment'])
                ->where('doctor_id', $appointmentInfo['doctor_id'])
                ->first();

            if ($existingAppointment) {
                return response()->json(['error' => 'Ce rendez-vous est déjà pris.'], 400);
            }

            $appointment = new Appointment([
                'dateOfAppointment' => $appointmentInfo['dateOfAppointment'],
                'timeOfAppointment' => $appointmentInfo['timeOfAppointment'],
                'endTimeOfAppointment' => $appointmentInfo['endTimeOfAppointment'],
                'doctor_id' => $appointmentInfo['doctor_id'],
                'available' => true,
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
            $appointments = Appointment::where('doctor_id', $id)
                ->orderBy('dateOfAppointment', 'asc')
                ->orderBy('timeOfAppointment', 'asc')
                ->get();
            return response()->json($appointments, 200);
        } catch (Exception $e) {
            echo '</br> <b> Exception Message: ' . $e->getMessage() . '</b>';
        }
    }

    public function deleteAppointment($id)
    {
        try {
            $appointment = Appointment::find($id);

            if (!$appointment) {
                return response()->json(['error' => 'Rendez-vous introuvable.'], 404);
            }
            $appointment->delete();
            return response()->json(['message' => 'Rendez-vous supprimé avec succès.'], 200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Erreur lors de la suppression du rendez-vous.'], 500);
        }
    }

    public function makeAppointment($id, Request $request)
    {
        try {
            $appointment = Appointment::find($id);

            if (!$appointment) {
                return response()->json(['error' => 'Rendez-vous introuvable.'], 404);
            }

            if (is_null($appointment->patient_id)) {
                $appointment->patient_id = $request->input('patient_id');
                $appointment->save();
                return response()->json(['message' => 'Rendez-vous réservé avec succès.'], 200);
            } else {
                return response()->json(['error' => 'Le rendez-vous est déjà pris par un autre patient'], 400);
            }
        } catch (Exception $e) {
            return response()->json(['error' => 'Erreur lors de la prise de rendez-vous.'], 500);
        }
    }
}
