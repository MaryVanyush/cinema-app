<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Hall extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'row', 'col', 'price', 'vip_price', 'is_active'];
    protected $hidden = ['created_at', 'updated_at', 'deleted_at'];

    public function place(): HasOne
    {
        return $this->hasOne(Place::class);
    }
    public function session(): HasOne
    {
        return $this->hasOne(Place::class);
    }

}
