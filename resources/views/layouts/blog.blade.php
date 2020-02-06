<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="keywords" content="">

    <title>

        @yield('title')

    </title>

    <!-- Styles -->
    <link href="{{ asset('css/page.min.css') }}" rel="stylesheet">
    <link href="{{ asset('css/style.css') }}" rel="stylesheet">

    <!-- Favicons -->
    <link rel="apple-touch-icon" href="{{ asset('img/apple-touch-icon.png') }}">
    <link rel="icon" href="{{ asset('img/favicon.png') }} ">


  </head>

  <body>

    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light navbar-stick-dark" data-navbar="sticky">
      <div class="container">

        <div class="navbar-left">
          <!-- <button class="navbar-toggler" type="button">&#9776;</button> -->
          <a class="navbar-brand" href="{{ route('welcome') }}">
            <!-- <img class="logo-dark" src="{{ asset('img/logo-dark1.png') }}" alt="logo" style="width: 45%;">
            <img class="logo-light" src="{{ asset('img/logo-light1.png') }}" alt="logo" style="width: 45%;"> -->
          </a>
        </div>

        <section class="navbar-mobile">
          <span class="navbar-divider d-mobile-none"></span>
        </section>

        <a class="btn btn-xs btn-round btn-success" href="{{ route('login') }}">Login</a>

      </div>
    </nav><!-- /.navbar -->

    <!-- Header -->
    @yield('header')

    <!-- Main Content -->
    @yield('content')


    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <div class="row gap-y align-items-center">

          <div class="col-6 col-lg-3">
            <a href="/"><img src="{{ asset('img/logo-dark1.png') }}" alt="logo" style="width: 65%;"></a>
          </div>


            <div class="social">
              <a class="social-facebook" href="https://www.facebook.com/iammanozz" style="padding-left: 300px; font-size: 30px;"><i class="fa fa-facebook"></i></a>
              <a class="social-instagram" href="https://www.instagram.com/manojthapaa" style="padding-left:40px; font-size: 30px;"><i class="fa fa-instagram"></i></a>
            </div>


        </div>
      </div>
    </footer>


    <!-- Scripts -->

    <script src="{{ asset('js/page.min.js') }}"></script>
    <script src="{{ asset('js/script.js') }}"></script>
    <script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5dc7bca306951a23"></script>

</body>
</html>
