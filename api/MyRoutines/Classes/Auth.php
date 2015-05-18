<?php

namespace MyRoutines\Classes;

/**
 *
 **/
class Auth
{
    public static $id;

    /**
     *
     **/
    public static function authenticate($id = null, $includeFailureType = false)
    {
        if (array_key_exists('HTTP_CREDENTIALS', $_SERVER) === false) {
            Response::setData('No credentials supplied!');

            return false;
        }
        $c = json_decode($_SERVER['HTTP_CREDENTIALS']);
        if ($includeFailureType === true && empty($c->mail) === true) {
            Response::setData('Empty mail!');

            return false;
        } elseif ($includeFailureType === true && empty($c->password) === true) {
            Response::setData('Empty password!');

            return false;
        }

        $r = DB::selectOne(
            'SELECT
                ID,
                Mail
            FROM
                User
            WHERE
                Mail = \''.$c->mail.'\'
                AND Password = \''.$c->password.'\''
        );
        if (($id === null && $r !== null) || $id = $r['ID']) {
            self::$id = $r['ID'];

            return true;
        }
        if ($includeFailureType === false) {
            return false;
        }

        $r = DB::selectOne(
            'SELECT
                ID
            FROM
                User
            WHERE
                Mail = \''.$c->mail.'\''
        );
        if (empty($r) === true) {
            Response::setData('Mail not found!');

            return false;
        }

        Response::setData('Incorrect password!');

        return false;
    }
}
