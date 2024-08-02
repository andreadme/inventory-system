<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductStatusType extends Model
{
    use HasFactory;

    protected $table = 'product_status_types';

    protected $primaryKey = 'id';

    public $incrementing = false;

    protected $keyType = 'string';
}
