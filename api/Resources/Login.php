<?php

namespace MyRoutines\Resources;

class Login
{
    public static function getLogins ()
    {
        if (\MyRoutines\Classes\User::authenticate() === true) {
            return 'Succesful login!';
        }
        \MyRoutines\Classes\Response::setStatus('fail');
        return 'Bad login!';
    }
}
