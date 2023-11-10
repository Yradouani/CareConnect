<?php

namespace App\Http\Controllers;

use App\Mail\confirmAppointment;
use App\Mail\deleteAppointment;
use App\Models\Appointment;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class AppointmentController extends Controller
{
    public function addAppointment(Request $request)
    {
        // dd($request->all());
        try {
            $appointmentInfo = $request->validate([
                "dateOfAppointment" => ["required", "date", "date_format:Y-m-d"],
                "timeOfAppointment" => ["required", "date_format:H:i"],
                "endTimeOfAppointment" => ["required", "date_format:H:i", function ($attribute, $value, $fail) use ($request) {
                    $startTime = strtotime($request->input('timeOfAppointment'));
                    $endTime = strtotime($value);

                    if ($startTime >= $endTime) {
                        $fail("endTimeOfAppointment needs to be after timeOfAppointment");
                    }
                },],
                "doctor_id" => ["required", "integer"],
                "role" => ["required", "string"]
            ]);

            // check if there is already an appointment
            if ($appointmentInfo["role"] === "doctor") {
                $existingAppointments = Appointment::where('dateOfAppointment', $appointmentInfo['dateOfAppointment'])
                    ->where('doctor_id', $appointmentInfo['doctor_id'])
                    ->get();

                foreach ($existingAppointments as $existingAppointment) {
                    $date1 = strtotime($appointmentInfo['dateOfAppointment']);
                    $date2 = strtotime($existingAppointment->dateOfAppointment);

                    $start1 = strtotime($appointmentInfo['timeOfAppointment']);
                    $end1 = strtotime($appointmentInfo['endTimeOfAppointment']);
                    $start2 = strtotime($existingAppointment->timeOfAppointment);
                    $end2 = strtotime($existingAppointment->endTimeOfAppointment);

                    if ($date1 == $date2 && $start1 < $end2 && $end1 > $start2) {
                        return response()->json(['error' => 'Les horaires de rendez-vous se chevauchent.'], 400);
                    }
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
            } else {
                return response()->json(['error' => 'You don\'t have rights to create appointment'], 404);
            }
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function getAllAppointmentsOfOneUser($id)
    {
        $user = User::find($id);
        if ($user) {
            $column = ($user->role === 'doctor') ? 'doctor_id' : 'patient_id';
            $relationship = ($user->role === 'doctor') ? 'patient.user' : 'doctor.user';
            try {
                $appointments = Appointment::where($column, $id)
                    ->orderBy('dateOfAppointment', 'asc')
                    ->orderBy('timeOfAppointment', 'asc')
                    ->with($relationship)
                    ->get();
                return response()->json($appointments, 200);
            } catch (Exception $e) {
                echo '</br> <b> Exception Message: ' . $e->getMessage() . '</b>';
            }
        } else {
            return response()->json(['message' => 'User not found'], 404);
        }
    }

    public function deleteAppointment($id, Request $request)
    {
        $appointment = Appointment::find($id);
        $user = $appointment->user_patient;

        if (!$appointment) {
            return response()->json(['error' => 'Appointment not found'], 404);
        }

        if ($request->role === "doctor") {
            try {
                $appointment->delete();
                if ($user) {
                    try {
                        Mail::to($user->email)->send(new deleteAppointment($appointment, $user));
                    } catch (Exception $e) {
                        return $e;
                    }
                }
                return response()->json(['message' => 'Appointment delete successfully'], 200);
            } catch (Exception $e) {
                return response()->json(['error' => 'Error, impossible to delete appointment'], 500);
            }
        } else if ($request->role === "patient") {
            try {
                $appointment->patient_id = null;
                $appointment->save();
                return response()->json(['message' => 'Appointment delete successfully'], 200);
            } catch (Exception $e) {
                return response()->json(['error' => 'Error, impossible to delete appointment'], 500);
            }
        }
    }

    public function makeAppointment($id, Request $request)
    {
        try {
            $appointment = Appointment::find($id);
            $user = User::find($request->patient_id);
            if (!$appointment) {
                return response()->json(['error' => 'Appointment not found'], 404);
            }

            if ($request->role === "doctor") {
                return response()->json(['error' => 'You can\'t book appointment with profesionnal account'], 401);
            }

            if (is_null($appointment->patient_id)) {
                $appointment->patient_id = $request->input('patient_id');
                $appointment->save();
                try {
                    Mail::to($user->email)->send(new confirmAppointment($appointment, $user));
                } catch (Exception $e) {
                    return $e;
                }
                return response()->json(['message' => 'Appointment booked successfully.'], 200);
            } else {
                return response()->json(['error' => 'The appointment is already made by another patient'], 400);
            }
        } catch (Exception $e) {
            return response()->json(['error' => 'Error making appointment.'], 500);
        }
    }
}
