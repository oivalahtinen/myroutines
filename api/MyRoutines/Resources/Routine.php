<?php

namespace MyRoutines\Resources;

use MyRoutines\Classes\Auth;
use MyRoutines\Classes\Response;
use MyRoutines\Classes\BaseResource;

class Routine extends BaseResource
{
    public function getRoutine($userId)
    {
        if (Auth::authenticate($userId) === true) {
            return $this->find(array('UserID' => $userId));
        }
        Response::setStatus('fail');
        return;
    }
}
