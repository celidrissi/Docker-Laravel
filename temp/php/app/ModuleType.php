<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ModuleType extends Model
{

    protected $table = "module_types";

    public function module() {
        return $this->hasOne(Module::class);
    }

    public function orderByDesc() {
        return $this->orderBy('created_at', 'DESC')->get();
    }

}
