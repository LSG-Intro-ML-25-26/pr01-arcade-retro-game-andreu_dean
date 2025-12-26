// Código generado automáticamente. No editar.
namespace myTiles {
    //% fixedInstance jres blockIdentity=images._tile
    export const transparency16 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile1 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile2 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile3 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile4 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile5 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile6 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile7 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile8 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile9 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile10 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile11 = image.ofBuffer(hex``);

    helpers._registerFactory("tilemap", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "nivel2":
            case "nivel2":return tiles.createTilemap(hex`1000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000`, img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
`, [myTiles.transparency16], TileScale.Sixteen);
            case "nivel3":
            case "nivel3":return tiles.createTilemap(hex`1400140000000000000000000000000000000000000000000001000000010101010101000001010101010100000100000001000000000101010100000000010000010101010101010101010000010101010101000001000000010000010001000001000000000100000100000001000001000100000100000100010000010101010101010101010101010101010101000101000000010000010000000001000000000100000101010101010101010101010101010101010000010000000001000000000001000001000000000001010101000100000000000100000100000000000001000100010000000000010000010101010000010100010001010101010101010101000001000001000001000100000000000100000000000100000101010101010101000101010101010101010000010000000001000100010001000000000001010001010101010101010101010101010101010100000100000000010001000000000100000000010000010101010101010101010101010101000101000000000000000000000000000000000000000000`, img`
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
`, [myTiles.transparency16,sprites.castle.tilePath5], TileScale.Sixteen);
            case "nivel1":
            case "nivel1":return tiles.createTilemap(hex`1400140001010101010101010101010101010101010101010103010101030303030303010103030303030301010301010103010101010303030301010101030101030303030303030303030101030303030303010103010101030101030103010103010101010301010301010103010103010301010301010301030101030303030303030303030303030303030303010403010101030101030101010103010101010301010303030303030303030303030303030303030101030101010103010105010103010103010101010103030303010301020202010301010301010101010103010301030101010101030101030303030101030301030103030303030303030303010103010103010103010301010101010301010101010301010303030303030303010303030303030303030101030101010103010301030103010101010103040103030303030303030303030303030303030301010301010101030103010101010301010101030101030303030303030303030303030303010303010101010101010101010101010101010101010101`, img`
22222222222222222222
2.222......22......2
2.222.2222....2222.2
2..........22......2
2.222.22.2.22.2222.2
2.222.22.2.22.22.2.2
2..................2
..222.22.2222.2222.2
2..................2
2.2222.22222.22.2222
2....2.22222.22.2222
22.2.2.22222.22....2
2..2.2..........22.2
2.22.2.22222.22222.2
2........2.........2
2.2222.2.2.2.22222..
2..................2
2.2222.2.2222.2222.2
2...............2..2
22222222222222222222
`, [myTiles.transparency16,myTiles.tile1,myTiles.tile2,myTiles.tile11,sprites.castle.tileDarkGrass3,sprites.castle.tileGrass2], TileScale.Sixteen);
        }
        return null;
    })

    helpers._registerFactory("tile", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "transparency16":return transparency16;
            case "miMosaico":
            case "tile1":return tile1;
            case "miMosaico0":
            case "tile2":return tile2;
            case "miMosaico1":
            case "tile3":return tile3;
            case "miMosaico2":
            case "tile4":return tile4;
            case "miMosaico3":
            case "tile5":return tile5;
            case "miMosaico4":
            case "tile6":return tile6;
            case "miMosaico5":
            case "tile7":return tile7;
            case "miMosaico6":
            case "tile8":return tile8;
            case "miMosaico7":
            case "tile9":return tile9;
            case "miMosaico8":
            case "tile10":return tile10;
            case "miMosaico9":
            case "tile11":return tile11;
        }
        return null;
    })

}
// Código generado automáticamente. No editar.
