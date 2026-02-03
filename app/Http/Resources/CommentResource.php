<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CommentResource extends JsonResource
{

public function toArray(Request $request): array{
    return [
                    'id'=>$this->id,
        'user'=>new UserResource($this->user),
    'company'=>new CompanyResource($this->company),
    'comment'=>$this->comment,'rating'=>$this->rating];
    }
}
