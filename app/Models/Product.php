<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Product extends Model
{
    use HasFactory;

    protected $table = 'products';

    protected $primaryKey = 'id';

    public $incrementing = false;

    protected $keyType = 'string';

    // protected $appends = ['product_name_w_category'];

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'product_category_id',
        'name',
        'description',
        'quantity',
        'weight_per_sack',
    ];

    protected $appends = ['product_name_w_category'];

    public function getProductNameWCategoryAttribute()
    {
        $categoryName = $this->product_category ? $this->product_category->name : 'No Category';

        return $this->name.' ('.$categoryName.')';
    }

    public function product_category(): BelongsTo
    {
        return $this->belongsTo(ProductCategory::class);
    }

    // public function getProductNameWCategoryAttribute()
    // {
    //     return $this->name.' ('.$this->product_category->name.')';
    // }
}
