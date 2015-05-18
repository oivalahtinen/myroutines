<?php

namespace MyRoutines\Resources;

use MyRoutines\Classes\Input;
use MyRoutines\Classes\Response;
use MyRoutines\Classes\DB;
use MyRoutines\Classes\BaseResource;

class User extends BaseResource
{
    public function postUser()
    {
        $input = Input::get(array('mail', 'password'));
        if ($input['ok'] === false) {
            Response::setStatus('fail');

            return $input['fields'];
        }

        $created = $this->create($input['values']);
        if ($created === true) {
            return DB::insertId();
        }

        // Creating resource failed
        Response::setStatus('fail');
        $input['fields']['mail'] = false;

        return $input['fields'];
    }
}
