<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ModuleTypesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('module_types')->insert([
           [
               "name" => 'NFC'
            ],
            [
                "name" => 'Bluetooth'
            ],
            [
                "name" => 'Wi-Fi'
            ],
            [
                "name" => 'Radio'
            ]
        ]);
    }
}
