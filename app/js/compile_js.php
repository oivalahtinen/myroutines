<?php

$outputFile = fopen("../app.js", "w+");
$files = array(
    './app.js',
    './pform.js',
    './controllers/user-registration.js',
    './controllers/home.js',
);

foreach ($files as $file) {
    $input = file_get_contents($file);
    fwrite($outputFile, $input);
}

fclose($outputFile);
