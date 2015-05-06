<?php

class DB
{
    private static $con;

    public static function connect ($host, $user, $pass, $db)
    {
        self::$con = new mysqli($host, $user, $pass, $db);
        self::$con->set_charset('utf8');
    }

    public static function query ($sql)
    {
        if (self::$con === null) {
            self::connect('localhost', 'root', 'oiva', 'myroutines');
        }
        return self::$con->query($sql);
    }

    public static function select ($sql)
    {
        $result = self::query($sql);
        $ret = array();
        while (!empty($result) && $row = $result->fetch_assoc()) {
            $ret[] = $row;
        }
        return $ret;
    }

    public static function selectOne ($sql)
    {
        return self::query($sql)->fetch_assoc();
    }

    public static function close ()
    {
        self::$con->close();
    }
}
