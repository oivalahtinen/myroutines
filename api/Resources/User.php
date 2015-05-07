<?php

namespace MyRoutines\Resources;
use \MyRoutines\Classes\Input;
use \MyRoutines\Classes\Response;
use \MyRoutines\Classes\DB;

class User
{
    public static function postUsers ()
    {
        $r = ['mail' => false, 'password' => false];
        $mail = Input::get('mail');
        $password = Input::get('password');

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

        $q = DB::query(
            'INSERT INTO
                User (
                    Mail,
                    Password
                )
            VALUES (
                \'' . $mail . '\',
                \'' . $password . '\'
            )'
        );
        if ($q === true) {
            return DB::insertId();
        }
        Response::setStatus('fail');
        $r['mail'] = false;
        return $r;
    }
}
