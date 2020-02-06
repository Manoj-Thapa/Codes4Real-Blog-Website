 <?php

use App\User;

use Illuminate\Database\Seeder;

use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $user = User::where('email','thapam807@gmail.com')->first();

        if(!$user) {

          User::create([

            'role' => 'admin',

            'name' => 'Manoj Kumar Thapa',

            'email' => 'thapam807@gmail.com',

            'password' => Hash::make('bangalorecse1998')

          ]);

        }

    }
}
