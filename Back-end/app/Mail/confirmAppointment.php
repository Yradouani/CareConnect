<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class confirmAppointment extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    protected $appointment;
    protected $user;

    public function __construct($appointment, $user)
    {
        $this->appointment = $appointment;
        $this->user = $user;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject('Confirmation de réservation de rendez-vous')
            ->view('emails.confirm-appointment')
            ->with(['appointment' => $this->appointment, 'user' => $this->user]);
    }
}
