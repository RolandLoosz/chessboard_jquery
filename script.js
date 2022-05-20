let game_area;

let tile_size = 100;

function createTile(row, col) {
    let tile;

    if ((row + col) % 2 === 0) {
        tile = $('<div class="tile black"></div>');
    } else {
        tile = $('<div class="tile white"></div>');
    }

    tile.attr('row', row);
    tile.attr('col', col);

    tile.attr('ko', 0);


    tile.css({
        top: row * tile_size,
        left: col * tile_size,
        height: tile_size,
        width: tile_size,
    });

    return tile;
}

function createBoard() {
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            let tile = createTile(row, col);
            game_area.append(tile);
        }
    }
}

function createGameArea() {
    game_area = $('#gameArea');

    game_area.css({
        height: 800,
        width: 800,
        border: "1px solid black",
    });
}

function createKo() {
    let ko = $('<img src="./images/ko.png" id="ko" >');

    ko.css({
        top: 0,
        left: 0,
        height: tile_size,
        width: tile_size,
    });

    ko.animate({
        opacity: 0,
    }, 0).animate({
        opacity: 1,
    }, 1000, clickEvent);

    return ko;
}

function onClick() {
    clickOff();
    let row = $(this).attr("row");
    let col = $(this).attr("col");
    // 0-tól indexelve
    console.log('row:', row, 'column:', col);
    if ($(this).attr('ko') === '0') {
        $(".tile[row=" + row.toString() + "][col=" + col.toString() + "]").append(createKo());
        $(this).attr("ko", 1);
    }
}

function clickEvent() {
    game_area.find('.tile').on('click', onClick);
}

function clickOff() {
    game_area.find('.tile').off('click');
}

$(document).ready(function () {
    createGameArea();
    createBoard();
    clickEvent();
});