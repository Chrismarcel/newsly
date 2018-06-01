<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Newsly</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/solid.css" integrity="sha384-Rw5qeepMFvJVEZdSo1nDQD5B6wX0m7c5Z/pLNvjkB14W6Yki1hKbSEQaX9ffUbWe" crossorigin="anonymous">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/fontawesome.css" integrity="sha384-GVa9GOgVQgOk+TNYXu7S/InPTfSDTtBalSgkgqQ7sCik56N9ztlkoTr2f/T44oKV" crossorigin="anonymous">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/css?family=Lato|Leckerli+One" rel="stylesheet">
    <link rel="stylesheet" href="./css/style.css">
</head>
<body>
    <nav class="navbar navbar-default navbar-fixed-top visible-xs">
        <div class="container-fluid">
            <div class="navbar-header text-center">
                <a class="navbar-toggle collapsed">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </a>
                <a class="navbar-brand logo" href="#">Newsly</a>
                <a href="" class="navbar-right search-mobile"><i class="fas fa-search"></i></a>
            </div>
        </div>
    </nav>
    <div class="container">
        <div class="row">
            <div class="col-sm-3 sidebar" id="sidebar">
                <div class="hidden-xs">
                    <h4 class="logo text-center">Newsly</h4>
                    <form action="" class="search">
                        <div class="input-group">
                            <input type="text" class="form-control search-box" placeholder="Search...">
                            <span class="input-group-btn">
                                <button class="btn btn-default search-btn" type="submit"><i class="fas fa-search"></i></button>
                            </span>
                        </div>
                    </form>
                </div>
                <span class="pull-right visible-xs" id="close-menu"><i class="fas fa-times"></i></span>
                <div class="nav-links">
                    <ul class="text-left">
                        <li><a>Business</a></li>
                        <li><a>Health</a></li>
                        <li><a>Sports</a></li>
                        <li><a>Technology</a></li>
                        <li><a>Entertainment</a></li>
                    </ul>
                </div>
            </div>
            <div class="col-sm-9 news-content">
                <div class="col-sm-4 col-xs-12">
                    <a href="#">
                        <div class="card">
                            <div class="card-header">
                                <span class="news-time text-left">2 mins ago</span>
                                <span class="news-source text-right visible-xs">90min.com</span>
                            </div>
                            <div class="col-xs-5 col-sm-12 news-image-parent remove-padding">
                                <img class="news-img" src="./images/placeholder.jpg">
                            </div>
                            <div class="col-xs-6 col-sm-12 news-body-parent remove-padding">
                                <p class="news-title">Fernando Torres on the Verge of Joining Chicago Fire Following Spaniard's Atletico Madrid Release</p>
                                <p class="news-body">Fernando Torres is reportedly close to joining MLS outfit Chicago Fire this summer. The striker has become one of ​Atletico ...</p>
                            </div>
                            <div class="card-footer hidden-xs">
                                <span class="news-source text-right">90min.com</span>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </div>
</body>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.22.1/moment.min.js" integrity="sha256-L3S3EDEk31HcLA5C6T2ovHvOcD80+fgqaCDt2BAi92o=" crossorigin="anonymous"></script>
<script src="./js/main.js"></script>
<script src="./sw.js"></script>
</html>