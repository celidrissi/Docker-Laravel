<?php

namespace App\Http\Controllers\Api;

use App\History;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class HistoryController extends Controller
{

    /**
     * Retourne la liste de tous les modules
     * @return JsonResponse
     */
    public function index() {
        return new JsonResponse([
            "history" => History::orderBy('id', 'desc')->with('module')->get()
        ]);
    }


    /**
     * Ajoute arbitrairement une entrée d'historique pour simuler un disfonctionnement de certains modules & envoie une notification d'avertissement.
     * @return JsonResponse
     */
    public function simulate() {
        $min = DB::table('modules')->min('id');
        $max = DB::table('modules')->max('id');

        $history = new History;
        $history->status = 1;
        $history->module_id = rand($min, $max);
        $history->save();

        return new JsonResponse([
            'count' => DB::table('history')->count()
        ]);
    }


    /**
     * Permet de marquer un problème comme lu
     * @param int $id
     * @return JsonResponse|void
     */
    public function markAsRead(int $id) {
        $history = History::find($id);
        if(!$history) return;

        $history->read = true;
        $history->save();

        return $this->index();
    }

}
