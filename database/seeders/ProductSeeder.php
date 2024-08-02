<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\ProductCategory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $retail = ProductCategory::where('name', 'Retail')->first();
        $wholesale = ProductCategory::where('name', 'Wholesale')->first();

        $data = [
            [
                'id' => Str::uuid(),
                'product_category_id' => $retail->id,
                'name' => 'Coco Pandan',
                'quantity' => 200,
                'weight_per_sack' => 0,
            ],
            [
                'id' => Str::uuid(),
                'product_category_id' => $wholesale->id,
                'name' => 'Coco Pandan',
                'quantity' => 2,
                'weight_per_sack' => 25,
            ],
            [
                'id' => Str::uuid(),
                'product_category_id' => $retail->id,
                'name' => 'Sweet Jasmine',
                'quantity' => 300,
                'weight_per_sack' => 0,
            ],
            [
                'id' => Str::uuid(),
                'product_category_id' => $wholesale->id,
                'name' => 'Sweet Jasmine',
                'quantity' => 3,
                'weight_per_sack' => 25,
            ],
        ];

        foreach ($data as $item) {
            Product::firstOrCreate(
                [
                    'name' => $item['name'],
                    'product_category_id' => $item['product_category_id'],
                ],
                $item
            );
        }
    }
}
