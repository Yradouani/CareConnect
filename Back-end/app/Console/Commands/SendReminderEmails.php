<?php

namespace App\Console\Commands;

use App\Mail\ReminderEmail;
use App\Models\Appointment;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class SendReminderEmails extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'email:send-reminders';
    protected $description = 'Send email reminders for upcoming appointments.';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $appointments = Appointment::where('dateOfAppointment', '>=', now())
            ->where('dateOfAppointment', '<=', now()->addHours(48))
            ->get();

        foreach ($appointments as $appointment) {
            if ($appointment->patient_id) {
                Mail::to($appointment->user_patient->email)
                    ->send(new ReminderEmail($appointment));
            }
        }

        $this->info('Reminder emails sent successfully.');
    }
}
