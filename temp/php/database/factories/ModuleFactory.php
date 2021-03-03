<?php

/** @var Factory $factory */

use App\Module;
use Faker\Generator as Faker;
use Illuminate\Database\Eloquent\Factory;

$factory->define(Module::class, function (Faker $faker) {
    return [
        'name' => $faker->words(3, true),
        'number_identifier' => $faker->slug(1),
        'description' => $faker->paragraph(),
        'temperature' => $faker->numberBetween(0, 100),
        'used_time' => $faker->time(),
        'datas_send' => $faker->numberBetween(0, 1000),
        'module_type_id' => $faker->numberBetween(1, 4)
    ];
});
