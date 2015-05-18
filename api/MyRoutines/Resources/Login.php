<?php

namespace MyRoutines\Resources;
use MyRoutines\Classes\Response;
use MyRoutines\Classes\Auth;

class Login
{
    /**
     * @return mixed
     **/
    public function getLogin()
    {
        if (Auth::authenticate(null, true) === true) {
            return ['ID' => Auth::$id];
        }
        Response::setStatus('fail');
        return;
    }
}
