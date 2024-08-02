<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class InventoryLog extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'inventory_logs';

    protected $primaryKey = 'id';

    public $incrementing = false;

    protected $keyType = 'string';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'product_category_id',
        'product_id',
        'quantity_added',
        'quantity_sold',
        'deleted_by',
        'updated_by',
        'created_by',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($user) {
            $user->created_by = auth()->user()->user_id;
        });

        static::updating(function ($user) {
            $user->updated_by = auth()->user()->user_id;
        });

        static::deleting(function ($user) {
            $user->deleted_by = auth()->user()->user_id;
        });
    }
}
