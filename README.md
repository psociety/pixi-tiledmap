# pixi-tiledmap

**Fork of [riebel/pixi-tiledmap](https://github.com/riebel/pixi-tiledmap)**, updated for Pixi.js >=5.0.0

**⚠️ Some of the types are incorrect**

Use [Tiled Map Editor](http://www.mapeditor.org/) maps with [pixi.js](https://www.npmjs.com/package/pixi.js).

pixi-tiledmap is a Pixi loader middleware which loads Tiled Map Editor
[TMX maps](http://doc.mapeditor.org/reference/tmx-map-format/) and parses them with
[node-tmx-parser](https://www.npmjs.com/package/tmx-parser). It exports as standalone class
which is an extended `PIXI.Container` containing all layers of the tile map as an instance of `PIXI.Container` and all
tiles within as an instance of `PIXI.AnimatedSprite`.

## Installation

```sh
npm install eioo/pixi-tiledmap
```

or

```sh
yarn add eioo/pixi-tiledmap
```

or include `pixi-tiledmap.js` after pixi.js in your html file.

```html
<html>
  <head>
    <script
      type="text/javascript"
      src="https://pixijs.download/v4.8.7/pixi.min.js"
    ></script>
    <script type="text/javascript" src="pixi-tiledmap.js"></script>
  </head>
  <body>
    <script>
      (async () => {
        const app = new PIXI.Application();

        const tilemap = new TiledMap('assets/tilemap.tmx');
        await tilemap.load();

        this.app.stage.addChild(tileMap);
      })();
    </script>
  </body>
</html>
```

## Usage

```js
import * as PIXI from 'pixi.js';
import TiledMap from 'pixi-tiledmap';

(async () => {
  const app = new PIXI.Application();

  const tilemap = new TiledMap('assets/tilemap.tmx');
  await tilemap.load();

  this.app.stage.addChild(tilemap);
})();
```

## License & disclaimer

Most of the work was done by these guys:

- [riebel](https://github.com/riebel) (pixi-tiledmap)

- [andrewrk](https://github.com/andrewrk) (tmx-parser)

This project is licensed under the MIT License - see the LICENSE.md file for details
