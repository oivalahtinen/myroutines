<?php

function __autoload($class)
{
    @(include 'resources/'.strtolower($class).'.php')
    || @(include 'classes/'.strtolower($class).'.php');
}

Router::setUrl();
Router::route();
