<?php

namespace MyRoutines\Classes;

/**
 *
 **/
class BaseResource
{
    protected static $singleton;
    protected $name;

    /**
     *
     **/
    public static function getInstance()
    {
        if (self::$singleton === null) {
            self::$singleton = new static();
        }

        return self::$singleton;
    }

    protected function __construct()
    {
        $c = explode('\\', get_called_class());
        $this->name = $c[count($c) - 1];
    }

    protected function find()
    {
    }

    protected function create($values)
    {
        $values = DB::filter($values);

        return DB::query(
            'INSERT INTO
                '.$this->name.' (
                    '.implode(',', array_keys($values)).') VALUES (
                    '.implode(',', $values).')'
        );
    }

    protected function update()
    {
    }

    protected function delete()
    {
    }

    private function __clone()
    {
    }

    private function __wakeup()
    {
    }
}
