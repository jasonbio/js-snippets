// URL sanitizing for ugly, user-generated links that must go in a db

var urlregex = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");
var hostregex = new RegExp("(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])");
var titleregex = new RegExp("[a-zA-Z0-9:' _-]+");
$('#validation').submit(function() {
    $('#result').show();
    $('.dim').show();
    $('#result2').html('');
    var urlcheck = $('#url').val();
    var titlecheck = $('#title').val();
    urlcheck = urlcheck.replace(/\s/g, "");
    urlcheck = urlcheck.replace(/&/g, "%26");
    urlcheck = urlcheck.replace(/\?/g, "%3F");