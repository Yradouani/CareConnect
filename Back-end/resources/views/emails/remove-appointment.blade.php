@php
use Carbon\Carbon;
@endphp

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Annulation de votre rendez-vous</title>
</head>

<body>
    <div class="confirm-mail">
        <div class="confirm-mail__date">Nous avons le regrès de vous informer que votre {{ $appointment->doctor->specialization }} {{ $appointment->user_doctor->firstname }} {{ $appointment->user_doctor->lastname }} vient d'annuler votre rendez-vous du {{ Carbon::parse($appointment->dateOfAppointment)->format('d/m/Y') }} à {{ Carbon::parse($appointment->timeOfAppointment)->format('H\hi') }}</div>

        <button>
            <a href="http://127.0.0.1:3000">
                je souhaite prendre un nouveau rendez-vous
            </a>
        </button>
    </div>
    <style>
        h1 {
            color: #75b6fe;
            font-weight: bold;
        }

        div {
            font-size: 20px;
            font-weight: bold;
        }

        button {
            background-color: #75b6fe;
            color: white;
            padding: 10px;
            margin-top: 20px;
            border: none;
        }

        a {
            text-decoration: none;
            color: inherit;
        }
    </style>
</body>

</html>
