<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\hasOne;

class Session extends Model
{
    use HasFactory;

    protected $fillable = ['datetime', 'hall_id', 'film_id', 'seats'];
    protected $hidden = ['created_at', 'updated_at', 'deleted_at'];

    public function film()
    {
        return $this->hasOne(Film::class,'id','film_id');
    }
    public function hall()
    {
        return $this->hasOne(Hall::class,'id','hall_id');
    }
}
