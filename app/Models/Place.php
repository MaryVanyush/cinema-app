<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Place extends Model
{
    use HasFactory;

    protected $fillable = ['hall_id', 'seat_id', 'status', 'order_id'];
    protected $hidden = ['created_at', 'updated_at', 'deleted_at'];

    public function hall()
    {
        return $this->hasOne(Hall::class,'id','hall_id');
    }
}
