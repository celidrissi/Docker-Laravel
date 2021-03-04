<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function(){
    return 'Hello World';
});

Route::get('/{name}-{id}', function($name, $id){
    return "Hello $name ;) Ton id est le $id ";
});

Route::get('/welcome', function () {
    return view('welcome');
});
