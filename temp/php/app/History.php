<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class History extends Model
{

    protected $table = "history";
    protected $dateFormat = 'H:i:s';

    public function module() {
        return $this->belongsTo(Module::class);
    }

    public function orderByDesc() {
        return $this->orderBy('created_at', 'DESC')->get();
    }

}
