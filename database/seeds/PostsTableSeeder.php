<?php

use App\Post;

use App\Tag;

use App\Category;

use Illuminate\Database\Seeder;

use Illuminate\Support\Facades\Hash;

class PostsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $category1 = Category::create([

          'name' => 'News'

        ]);

        $author1 = App\User::create([

            'name' => 'Manoj Thapa',

            'email' => 'manojthapa1988@yahoo.com',

            'password' => Hash::make('manoj123')

          ]);


          $author2 = App\User::create([

              'name' => 'Manish Thapa',

              'email' => 'manishthapa1998@gmail.com',

              'password' => Hash::make('manish123')

            ]);

        $category2 = Category::create([

          'name' => 'Marketing'

        ]);

        $category3 = Category::create([

          'name' => 'Partnership'

        ]);

        $post1 = $author1->posts()->create([

            'title' => 'We relocated our office to a new designed garage',

            'description' => 't is a long established fact that a reader will be distracted by the readable content of a page when looking at its',

            'content' => 't is a long established fact that a reader will be distracte',

            'category_id' => $category1->id,

            'image' => 'uploads/posts/1.jpg'

        ]);

        $post2 = $author2->posts()->create([

          'title' => 'Top 5 brilliant content marketing strategies',

          'description' => 't is a long established fact that a reader will be distracted by the readable content',

          'content' => 't is a long established fact that a reader will be distracted by',

          'category_id' => $category2->id,

          'image' => 'uploads/posts/2.jpg'

          ]);

          $post3 = $author2 ->posts()->create([

            'title' => 'Best practices for minimalist design with example',

            'description' => 't is a long established fact that a reader will be distracted by the readable content of',
            'content' => 't is a long established fact that a reader will be distracted by the readable content',

            'category_id' => $category3->id,

            'image' => 'uploads/posts/3.jpg'

            ]);


              $tag1 = Tag::create([

                'name' => 'Job'

              ]);


              $tag2= Tag::create([

                'name' => 'Customers'

              ]);


              $tag3 = Tag::create([

                'name' => 'Record'

              ]);

              $post1->tags()->attach([$tag1->id,$tag2->id]);

              $post2->tags()->attach([$tag2->id,$tag3->id]);

              $post3->tags()->attach([$tag1->id,$tag3->id]);

    }
}
