<?php

namespace App\Http\Resources;

use App\Models\Place;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class HallResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'row' => $this->row,
            'col' => $this->col,
            'price' => $this->price,
            'vip_price' => $this->vip_price,
            'is_active' => $this->is_active,
        ];
    }
}
