<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'id' => Str::uuid(),
                'name' => 'Andrea Evanculla',
                'email' => 'admin.drea@testmail.com',
                'password' => Hash::make('admin123'),
            ],
            [
                'id' => Str::uuid(),
                'name' => 'Mike Wang',
                'email' => 'admin.mayk@testmail.com',
                'password' => Hash::make('admin123'),
            ],
        ];

        User::insert($data);
    }
}
