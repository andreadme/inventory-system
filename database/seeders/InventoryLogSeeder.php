<?php

namespace Database\Seeders;

use App\Models\InventoryLog;
use App\Models\Product;
use App\Models\ProductCategory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class InventoryLogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $retail = ProductCategory::where('name', 'Retail')->first();
        $wholesale = ProductCategory::where('name', 'Wholesale')->first();

        $wholesaleCoco = Product::where('name', 'Coco Pandan')
            ->where('product_category_id', $wholesale->id)->first();
        $wholesaleJas = Product::where('name', 'Sweet Jasmine')
            ->where('product_category_id', $wholesale->id)->first();

        $retailCoco = Product::where('name', 'Coco Pandan')
            ->where('product_category_id', $retail->id)->first();
        $retailJas = Product::where('name', 'Sweet Jasmine')
            ->where('product_category_id', $retail->id)->first();

        $data = [
            [
                'id' => Str::uuid(),
                'product_category_id' => $retail->id,
                'product_id' => $retailCoco->id,
                'quantity_sold' => 10,
                'quantity_added' => 20,
            ],
            [
                'id' => Str::uuid(),
                'product_category_id' => $retail->id,
                'product_id' => $retailJas->id,
                'quantity_sold' => 5,
                'quantity_added' => 10,
            ],
            [
                'id' => Str::uuid(),
                'product_category_id' => $wholesale->id,
                'product_id' => $wholesaleJas->id,
                'quantity_sold' => 0,
                'quantity_added' => 2,
            ],
            [
                'id' => Str::uuid(),
                'product_category_id' => $wholesale->id,
                'product_id' => $wholesaleCoco->id,
                'quantity_sold' => 1,
                'quantity_added' => 0,
            ],
        ];

        InventoryLog::insert($data);
    }
}
