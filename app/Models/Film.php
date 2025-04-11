<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Film extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description', 'poster', 'country', 'duration'];
    protected $hidden = ['created_at', 'updated_at', 'deleted_at'];
}
