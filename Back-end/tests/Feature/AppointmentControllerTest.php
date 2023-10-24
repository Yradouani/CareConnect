<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Tymon\JWTAuth\Facades\JWTAuth;

class AppointmentControllerTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_it_can_create_an_appointment()
    {
        $user = User::factory()->create();
        $token = JWTAuth::fromUser($user);
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->json('POST', '/api/ajouter-un-rendez-vous', [
            'dateOfAppointment' => '2023-10-28',
            'timeOfAppointment' => '09:00',
            'endTimeOfAppointment' => '10:00',
            'doctor_id' => 5,
            'role' => 'doctor',
        ]);

        $response->assertStatus(200);

        $response->assertJson([
            'dateOfAppointment' => '2023-10-28',
            'timeOfAppointment' => '09:00',
            'endTimeOfAppointment' => '10:00',
            'doctor_id' => 5,
            'available' => true,
        ]);
    }

    public function test_it_can_not_create_appointment_with_bad_data()
    {
        $user = User::factory()->create();
        $token = JWTAuth::fromUser($user);

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->json('POST', '/api/ajouter-un-rendez-vous', [
            'dateOfAppointment' => '2023-11-30',
            'timeOfAppointment' => '09:00',
            'endTimeOfAppointment' => '10:00',
            'doctor_id' => 2,
            'role' => 'doctor',
        ]);

        $response->assertStatus(400);
    }
}
