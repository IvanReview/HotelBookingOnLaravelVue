<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GuestSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('guests')->insert([
            [
                'name' => 'Вася',
                'surname' => 'Васян',
                'phone' => '89278485485',
                'passport' => '7308487950'
            ],
            [
                'name' => 'Роман',
                'surname' => 'Обрамович',
                'phone' => '89278485485',
                'passport' => '7308487951'
            ],
            [
                'name' => 'Гена',
                'surname' => 'Букин',
                'phone' => '89278488985',
                'passport' => '7308489650'
            ],
            [
                'name' => 'Петя',
                'surname' => 'Петров',
                'phone' => '89278485483',
                'passport' => '7308487912'
            ],
            [
                'name' => 'Акакий',
                'surname' => 'Иванов',
                'phone' => '89278485488',
                'passport' => '7308487972'
            ],
            [
                'name' => 'Инакентий',
                'surname' => 'Сидоров',
                'phone' => '89278485129',
                'passport' => '7308487890'
            ],
            [
                'name' => 'Идрак',
                'surname' => 'Петров',
                'phone' => '89278485484',
                'passport' => '7308487970'
            ],

        ]);

    }
}
