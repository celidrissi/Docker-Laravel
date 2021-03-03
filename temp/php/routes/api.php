<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/modules', 'Api\ModulesController@index');
Route::get('/module/new', 'Api\ModulesController@create');
Route::get('/module/{id}', 'Api\ModulesController@show')->where(['id', '[0-9]+']);

Route::post('/module', 'Api\ModulesController@store');

Route::get('/history', 'Api\HistoryController@index');
Route::get('/history/simulate', 'Api\HistoryController@simulate');
Route::get('/history/mark/{id}', 'Api\HistoryController@markAsRead');
