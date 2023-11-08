@php
use Carbon\Carbon;
@endphp

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirmation de rendez-vous</title>
</head>

<body>
    <div class="confirm-mail">
        <h1>Rendez-vous confirmé pour {{ $user->firstname }}</h1>
        <div class="confirm-mail__date">Nous vous confirmons votre rendez-vous du {{ Carbon::parse($appointment->dateOfAppointment)->format('d/m/Y') }} à {{ Carbon::parse($appointment->timeOfAppointment)->format('H\hi') }}</div>
        <div>Avec votre {{ $appointment->doctor->specialization }} {{ $appointment->user_doctor->firstname }} {{ $appointment->user_doctor->lastname }}</div>
        <br />
        <div>Voici l'adresse du cabinet :</div>
        <div>{{ $appointment->doctor->officeAddress }}</div>
        <div>{{ $appointment->doctor->officePostalCode }} {{ $appointment->doctor->officeCity }}</div>

        <button>
            <a href="http://127.0.0.1:3000">
                Annuler mon rendez-vous
            </a>
        </button>
    </div>
    <style>
        .confirm-mail h1 {
            color: #75b6fe;
            font-weight: bold;
        }

        .confirm-mail div {
            font-size: 20px;
            font-weight: bold;
        }

        .confirm-mail button {
            background-color: red;
            color: white;
            padding: 10px;
            margin-top: 20px;
            border: none;
        }

        .confirm-mail a {
            text-decoration: none;
            color: inherit;
        }
    </style>
</body>

</html>
