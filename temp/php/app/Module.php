<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Module extends Model
{

    protected $table = "modules";

    public function type() {
        return $this->belongsTo(ModuleType::class, 'module_type_id');
    }

    public function orderByDesc() {
        return $this->orderBy('created_at', 'DESC')->get();
    }

}
