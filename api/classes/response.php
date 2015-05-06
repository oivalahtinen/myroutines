<?php

class Response
{
    public static function send($data, $status = 'success')
    {
        $response = array('status' => $status);
        if ($status === 'error') {
            $response['message'] = $data;
        } else {
            $response['data'] = $data;
        }
        echo json_encode($response);
    }
}
