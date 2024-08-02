<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::statement('DROP VIEW IF EXISTS product_summary_view');
        DB::statement("
            CREATE VIEW product_summary_view AS
            SELECT
                p.id,
                p.name,
                tl.category_id,
                tl.category,
                p.quantity - COALESCE(tl.total_stock_sold, 0) + COALESCE(tl.total_stock_added, 0) AS current_stock,
                CASE
                    WHEN tl.category = 'Wholesale' THEN (CASE
                        WHEN p.quantity  - COALESCE(tl.total_stock_sold, 0) + COALESCE(tl.total_stock_added, 0) <= 0 THEN 'Out of stock'
                        WHEN p.quantity - COALESCE(tl.total_stock_sold, 0) + COALESCE(tl.total_stock_added, 0) <= 2 THEN 'Low stock'
                        ELSE 'In stock'
                        END)
                    ELSE (CASE
                        WHEN p.quantity  - COALESCE(tl.total_stock_sold, 0) + COALESCE(tl.total_stock_added, 0) <= 0 THEN 'Out of stock'
                        WHEN p.quantity - COALESCE(tl.total_stock_sold, 0) + COALESCE(tl.total_stock_added, 0) <= 25 THEN 'Low stock'
                        ELSE 'In stock'
                        END)
                END AS stock_status,
                tl.latest_updated_at,
                tl.created_by
            FROM products p
            LEFT JOIN (
                SELECT
                    tl.product_id,
                    pc.id as category_id,
                    pc.name as category,
                    SUM(tl.quantity_added) AS total_stock_added,
                    SUM(tl.quantity_sold) AS total_stock_sold,
                    MAX(tl.created_at) AS latest_updated_at,
        			tl.created_by
                FROM inventory_logs tl
        		LEFT JOIN users u ON u.id = tl.created_by
                LEFT JOIN product_categories pc ON pc.id = tl.product_category_id
                GROUP BY
                    tl.product_id,
                    pc.id,
                    pc.name,
                    tl.created_by
            ) AS tl ON tl.product_id = p.id
            WHERE p.deleted_at IS NULL
            GROUP BY
        		p.id,
                tl.category,
                tl.category_id,
                tl.created_by,
        		tl.latest_updated_at,
                tl.total_stock_sold,
                tl.total_stock_added
            ORDER BY p.name ASC;
        ");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement('DROP VIEW IF EXISTS product_summary_view');
    }
};
