<?php

namespace MyRoutines\Resources;
use MyRoutines\Classes\Response;
use MyRoutines\Classes\Auth;

class Login
{
    /**
     * @return mixed
     **/
    public function getLogins()
    {
        $l = Auth::authenticate(null, true);
        if ($l === Auth::SUCCESS) {
            return ['ID' => Auth::$id];
        }
        Response::setStatus('fail');
        if ($l === Auth::EMPTY_CREDENTIALS) {
            return 'No credentials supplied!';
        }
        if ($l === Auth::EMPTY_MAIL) {
            return 'Empty mail!';
        }
        if ($l === Auth::EMPTY_PASSWORD) {
            return 'Empty password!';
        }
        if ($l === Auth::MAIL_NOT_FOUND) {
            return 'Mail not found!';
        }
        if ($l === Auth::WRONG_PASSWORD) {
            return 'Incorrect password!';
        }

        // Should never end up here...
        Response::setStatus('error');
        return 'Something went really wrong...';
    }
}
