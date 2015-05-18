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

    protected function find($criteria)
    {
        $sql = 'SELECT * FROM '.$this->name.' WHERE ';
        foreach ($criteria as $field => $value) {
            $sql.= '`'.$field.'` = \''.$value.'\' AND ';
        }
        $sql = rtrim($sql, ' AND ');
        return DB::select($sql);
    }

    protected function create($values)
    {
        $sql = 'INSERT INTO '.$this->name.' (';
        foreach (array_keys($values) as $key) {
            $sql .= '`'.$key.'`,';
        }
        $sql = rtrim($sql, ',').') VALUES (';
        foreach ($values as $value) {
            $sql .= '\''.$value.'\',';
        }
        $sql = rtrim($sql, ',').')';
        return DB::query($sql);
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
