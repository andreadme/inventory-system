<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductSummaryView extends Model
{
    use HasFactory;

    protected $table = 'product_summary_view';

    public $incrementing = false;

    protected $keyType = 'string';
}
