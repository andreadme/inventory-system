<?php

namespace Database\Seeders;

use App\Models\ProductCategory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProductCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'id' => Str::uuid(),
                'name' => 'Retail',
            ],
            [
                'id' => Str::uuid(),
                'name' => 'Wholesale',
            ],
        ];

        foreach ($data as $item) {
            ProductCategory::firstOrCreate(
                ['name' => $item['name']],
                $item
            );
        }
    }
}
