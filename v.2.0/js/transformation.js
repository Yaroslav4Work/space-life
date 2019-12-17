function normalFont() {
    $('html, body').css({'font-family': '"Monaco", monospace'});
}

function animateMobileMenu() {
    if($('.space-js.space-nav ul').css('display') != 'flex') {
        $('.space-js.space-nav ul').css({display: 'flex'}, 700);
    } else {
        $('.space-js.space-nav ul').css({display: 'none'}, 700);
    }
}