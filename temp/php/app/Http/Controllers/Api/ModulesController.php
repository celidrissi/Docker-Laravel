<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Module;
use App\ModuleType;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class ModulesController extends Controller
{

    /**
     * Retourne la liste de tous les modules
     * @return JsonResponse
     */
    public function index() {
        return new JsonResponse([
            "modules" => Module::orderBy('id', 'desc')->with('type')->get()
        ]);
    }


    /**
     * Retourne le module correspondant à l'id passé en paramètre
     * @param int $id id du module
     * @return JsonResponse
     */
    public function show($id) {
        $modules = Module::find($id);

        if($modules != null)
            return new JsonResponse([
               "module" => Module::find($id)
            ]);
        else return new JsonResponse("unknown", 500);
    }


    /**
     * Retourne les données nécéssaires à la création d'un nouveau module
     * @return JsonResponse
     */
    public function create() {
        return new JsonResponse([
           "modules" => ModuleType::all()
        ]);
    }


    /**
     * Ajoute un nouveau module dans la base de données
     * @param Request $request
     * @return JsonResponse
     * @throws ValidationException
     */
    public function store(Request $request) {
        $this->validate($request, [
            'name' => 'required|max:255|min:1',
            'number_identifier' => 'required|unique:modules|min:0',
            'newType' => 'min:0',
            'description' => 'required|min:0'
        ]);

        $module = new Module;
        $module->name = $request->name;
        $module->number_identifier = $request->number_identifier;
        $module->description = $request->description;

        if($request->newType != "") {
            $id = DB::table('module_types')->insertGetId([
               'name' => $request->newType
            ]);
            $module->module_type_id = $id;
        } else {
            $module->module_type_id = ModuleType::select('id')->where('name', $request->type)->first()->id;
        }


        if(in_array("temperature", $request->infos)) {
            $module->show_temperature = true;
        }
        if(in_array("time", $request->infos)) {
            $module->show_used_time = true;
        }
        if(in_array("datas", $request->infos)) {
            $module->show_datas_send = true;
        }
        if(in_array("state", $request->infos)) {
            $module->show_status = true;
        }

        $module->save();

        return new JsonResponse(null, 200);
    }

}
