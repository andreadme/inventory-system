<?php

namespace App\Http\Controllers;

use App\Models\InventoryLog;
use App\Models\Product;
use App\Models\ProductCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;

class InventoryLogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $exception = DB::transaction(function () use ($request) {
            [$productId, $categoryId, $productName] = explode(',', $request->product_id_and_name_and_category_id);

            if ($request->display_sacks) {
                $retail = ProductCategory::where('name', 'Retail')->first();
                $product = Product::where('name', $productName)->where('product_category_id', $retail->id)->first();
                $wholesaleProduct = Product::where('id', $productId)->first();
                if (! $product) {
                    $product = Product::create([
                        'product_category_id' => $retail->id,
                        'name' => $productName,
                        'quantity' => 0,
                        'weight_per_sack' => $wholesaleProduct->weight_per_sack,
                    ]);
                }

                $quantityToAdd = $wholesaleProduct->weight_per_sack * $request->quantity_sold;
                InventoryLog::create([
                    'product_category_id' => $product->product_category_id,
                    'product_id' => $product->id,
                    'quantity_added' => $quantityToAdd,
                    'quantity_sold' => 0,
                ]);
            }

            InventoryLog::create([
                'product_category_id' => $categoryId,
                'product_id' => $productId,
                'quantity_added' => $request->quantity_added ?? 0,
                'quantity_sold' => $request->quantity_sold ?? 0,
            ]);
        });

        return Redirect::route('dashboard');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
