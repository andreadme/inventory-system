<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::with('product_category')
            ->orderBy('created_at', 'desc')
            ->get();

        $categories = ProductCategory::orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Product/Index', [
            'products' => $products,
            'categories' => $categories,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $exception = DB::transaction(function () use ($request) {
            Product::create([
                'product_category_id' => $request->product_category['value'],
                'name' => $request->name,
                'description' => $request->description,
                'quantity' => $request->quantity,
                'weight_per_sack' => $request->weight_per_sack,
            ]);
        });

        if ($exception) {
            return Redirect::back()->with('error', 'Failed to create product.');
        }

        return Redirect::route('product.view');
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
        $product = Product::with('product_category')
            ->where('id', $id)
            ->first();

        return response()->json($product);
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
    public function update(Request $request)
    {
        $product = Product::with('product_category')
            ->where('id', $request['id'])
            ->first();

        $exception = DB::transaction(function () use ($request, $product) {
            $product->update([
                'product_category_id' => $request->product_category_id,
                'name' => $request->name,
                'description' => $request->description,
                'quantity' => $request->quantity,
                'weight_per_sack' => $request->weight_per_sack,
            ]);
        });

        $products = Product::with('product_category')->orderBy('created_at', 'desc')->get();
        if ($exception) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update product',
            ], 500);
        }

        return response()->json([
            'success' => true,
            'message' => 'Product updated successfully',
            'data' => $products,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
