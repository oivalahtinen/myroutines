<?php

namespace MyRoutines\Classes;

/**
 *
 **/
class Response
{
    private static $status = 'success';
    private static $data = 'No data';

    /**
     *
     **/
    public static function setStatus($status)
    {
        self::$status = $status;
    }

    /**
     *
     **/
    public static function setData($data)
    {
        self::$data = $data;
    }

    /**
     *
     **/
    public static function send($data = null)
    {
        $response = array('status' => self::$status);
        $data = $data !== null ? $data : self::$data;
        if (self::$status === 'error') {
            $response['message'] = $data;
        } else {
            $response['data'] = $data;
        }
        echo json_encode($response)."\n";
    }
}
