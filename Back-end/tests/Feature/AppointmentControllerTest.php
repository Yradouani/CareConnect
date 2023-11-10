<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;
use Tymon\JWTAuth\Facades\JWTAuth;

class AppointmentControllerTest extends TestCase
{
    use DatabaseTransactions;
    /**
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
            'timeOfAppointment' => '10:00',
            'endTimeOfAppointment' => '11:00',
            'doctor_id' => 5,
            'role' => 'doctor',
        ]);

        $response->assertStatus(200);

        $response->assertJson([
            'dateOfAppointment' => '2023-10-28',
            'timeOfAppointment' => '10:00',
            'endTimeOfAppointment' => '11:00',
            'doctor_id' => 5,
            'available' => true,
        ]);
    }

    public function test_it_can_not_create_appointment_with_overlap()
    {
        $user = User::factory()->create();
        $token = JWTAuth::fromUser($user);

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->json('POST', '/api/ajouter-un-rendez-vous', [
            'dateOfAppointment' => '2023-11-20',
            'timeOfAppointment' => '18:30',
            'endTimeOfAppointment' => '19:00',
            'doctor_id' => 3,
            'role' => 'doctor',
        ]);

        $response->assertStatus(400);
    }

    public function test_it_can_not_create_appointment_with_bad_role()
    {
        $user = User::factory()->create();
        $token = JWTAuth::fromUser($user);

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->json('POST', '/api/ajouter-un-rendez-vous', [
            'dateOfAppointment' => '2023-10-20',
            'timeOfAppointment' => '18:30',
            'endTimeOfAppointment' => '19:00',
            'doctor_id' => 3,
            'role' => 'patient',
        ]);

        $response->assertStatus(404);
    }

    public function test_it_can_not_create_appointment_with_bad_date()
    {
        $user = User::factory()->create();
        $token = JWTAuth::fromUser($user);

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->json('POST', '/api/ajouter-un-rendez-vous', [
            'dateOfAppointment' => '2023-25-20',
            'timeOfAppointment' => '18:30',
            'endTimeOfAppointment' => '19:00',
            'doctor_id' => 3,
            'role' => 'doctor',
        ]);

        $response->assertStatus(500);
    }

    public function test_it_can_not_create_appointment_with_bad_time()
    {
        $user = User::factory()->create();
        $token = JWTAuth::fromUser($user);
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->json('POST', '/api/ajouter-un-rendez-vous', [
            'dateOfAppointment' => '2023-25-20',
            'timeOfAppointment' => '20:30',
            'endTimeOfAppointment' => '19:00',
            'doctor_id' => 3,
            'role' => 'doctor',
        ]);

        $response->assertStatus(500);
    }
}
