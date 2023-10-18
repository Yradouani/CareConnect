<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    use HasFactory;

    protected $fillable = [
        'dateOfAppointment',
        'timeOfAppointment',
        'endTimeOfAppointment',
        'doctor_id',
        'patient_id',
        'available'
    ];

    public function doctor()
    {
        return $this->belongsTo(Doctor::class, 'doctor_id', 'user_id');
    }
}

// INSERT INTO appointments (dateOfAppointment, timeOfAppointment, doctor_id, available)
// VALUES
//     ('2023-09-28', '08:00:00', 32, 1, true),
//     ('2023-09-28', '09:00:00', 32, 1, true),
//     ('2023-09-29', '10:00:00', 32, 1, true),
//     ('2023-09-29', '11:00:00', 32, 1, true),
//     ('2023-09-30', '14:00:00', 32, 1, true);
