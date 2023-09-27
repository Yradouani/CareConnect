<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AppointmentController extends Controller
{
    public function addAppointment(Request $request)
    {
        $appointmentInfo = $request->validate([
            "dateOfAppointment" => ["required", "date"],
            "timeOfAppointment" => ["required", "string", "min:2", "max:30"],
            "doctor_id" => ["required", "string", "min:10", "max:13"],
            "patient_id" => ["required", "string", "in:patient,doctor"],
            "available" => ["required", "email", "unique:users,email"]
        ]);
    }
}
