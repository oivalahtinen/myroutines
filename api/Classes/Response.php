<?php

namespace MyRoutines\Classes;

class Response
{
    private static $status = 'success';

    public static function setStatus($status)
    {
        self::$status = $status;
    }

    public static function send($data)
    {
        $response = array('status' => self::$status);
        if (self::$status === 'error') {
            $response['message'] = $data;
        } else {
            $response['data'] = $data;
        }
        echo json_encode($response) . "\n";
    }
}
