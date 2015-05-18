<?php

namespace MyRoutines\Resources;

use MyRoutines\Classes\Input;
use MyRoutines\Classes\Response;
use MyRoutines\Classes\DB;
use MyRoutines\Classes\BaseResource;

class User extends BaseResource
{
    public function getUsers()
    {
        self::find();
    }

    public function postUsers()
    {
        $r = ['mail' => false, 'password' => false];
        $mail = Input::post('mail');
        $password = Input::post('password');

        if (empty($mail) === false) {
            $r['mail'] = true;
        }
        if (empty($password) === false) {
            $r['password'] = true;
        }
        if (empty($mail) === true || empty($password) === true) {
            Response::setStatus('fail');
            return $r;
        }

        $q = $this->create(array('Mail' => $mail, 'Password' => $password));
        if ($q === true) {
            return DB::insertId();
        }
        Response::setStatus('fail');
        $r['mail'] = false;
        return $r;
    }
}
