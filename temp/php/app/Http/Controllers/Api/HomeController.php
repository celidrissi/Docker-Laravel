<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Contracts\View\Factory;
use Illuminate\View\View;

class HomeController extends Controller
{

    /**
     * Retourne la vue principale
     * @return Factory|View
     */
    public function index() {
       return view('app');
    }

}
