

var box = $("#box"),
container = $("#container"),
popcorn = $(".popcorn"),
popcorn1 = $("#popcorn1"),
popcorn2 = $("#popcorn2"),
popcorn3 = $("#popcorn3"),
popcorn4 = $("#popcorn4"),
floor = $("#floor");

// container.hide()

// $('#start').on("click" , function(){
//     container.show()
//     $("#container2").hide()
// })

/** Index.html > theGame.html */
$(document).ready(function(){
    $("#start").on("click", function(){
        ("#container2").hide();
    $("container").show();
    });
 });


/* Controls BOX Movement */
$(document).on('mousemove', function (e) {
    console.log(e.pageX);
    if ( e.pageX > 376 ) {
        box.css("transform", "translate(-100%, 0)");
    }
    else {
        box.css("transform", "translate(0,0)");
    }
    box.css('left', e.pageX);
});

popcorn_initial_pos = parseInt(popcorn.css('top'));
counter = 0,
anim_id = 0,
the_game = 0,
life = 10; /** Life Counter */
 

$(function () {
    the_game = function () {
        if (popcorn_floor(popcorn1) || popcorn_box(popcorn1)) {
            popcorn_initial(popcorn1);
        } else {
            /** Delays The Time of Falling */
            setTimeout(function() {
                fall(popcorn1);
                          }, 1000);
        }
        if (popcorn_floor(popcorn2) || popcorn_box(popcorn2)) {
            popcorn_initial(popcorn2);
        } else {
            fall(popcorn2);
        }
        if (popcorn_floor(popcorn3) || popcorn_box(popcorn3)) {
            popcorn_initial(popcorn3);
    
        } else {
            fall(popcorn3);
        }
        if (popcorn_floor(popcorn4) || popcorn_box(popcorn4)) {
            popcorn_initial(popcorn4);
        } else {
            setTimeout(function() {
                fall(popcorn4);
                          }, 1000);    
                            }

        if (life > 0) {
            anim_id = requestAnimationFrame(the_game);
        } else {
             stop_the_game(); 
        }
    };
    anim_id = requestAnimationFrame(the_game);
});

current = 0,
speed = 2;

/** Controls PopCorn Falling */
function fall(popcorn) {
    current = parseInt(popcorn.css('top'));
    popcorn.css('top', current + speed);
}


/** Popcorn Hits The Floor */
function popcorn_floor(popcorn) {
    if (collision(popcorn, floor)) {
        decrement_life();
        return true;
    }
    return false;
}

/** First Position for Popcorn */
function popcorn_initial(popcorn) {
    popcorn.css('top', popcorn_initial_pos);
}

/** Collision Detection for Popcorn & Floor */
function collision($div1, $div2) {
    var x1 = $div1.offset().left;
    var y1 = $div1.offset().top;
    var h1 = $div1.outerHeight(true);
    var w1 = $div1.outerWidth(true);
    var b1 = y1 + h1;
    var r1 = x1 + w1;
    var x2 = $div2.offset().left;
    var y2 = $div2.offset().top;
    var h2 = $div2.outerHeight(true);
    var w2 = $div2.outerWidth(true);
    var b2 = y2 + h2;
    var r2 = x2 + w2;

    if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
    return true;
}

box_height = box.height();
popcorn_top = 0;
container_height = container.height();
box_top = container_height - box_height;

/** Popcorn Hits Box */
function popcorn_box(popcorn) {
    if (collision(popcorn, box)) {
        popcorn_top = parseInt(popcorn.css('top'));
        if (popcorn_top < box_top) {
           update_score(); 
            return true;
        }
    }
    return false;
}

score = 0;
max_speed = 5;

function update_score() {
    score++;
 if (score % 10 === 0 && speed <= max_speed) {  
        speed++; 
}
    $("#score").text(score);
}

$("#life").text(life);
 function decrement_life() {
    life--;
    $("#life").text(life);
}
function stop_the_game() {
    cancelAnimationFrame(anim_id);
    $(".popcorn").remove();
    $("#restart").slideDown();
}

$("#restart").click(function () {
    location.reload();
});