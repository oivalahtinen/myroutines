<?php

namespace MyRoutines\Resources;
use MyRoutines\Classes\Response;
use MyRoutines\Classes\Auth;
use MyRoutines\Classes\BaseResource;

class Login extends BaseResource
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
