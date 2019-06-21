import * as path from 'path';
import * as PIXI from 'pixi.js';

import ImageLayer from './ImageLayer';
import TiledMapLoader from './TiledMapLoader';
import TileLayer from './TileLayer';
import TileSet from './TileSet';

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

export default class TiledMap extends PIXI.Container {
  public tileSets: TileSet[] = [];
  public layers: { [index: string]: TileLayer } = {};
  public background = new PIXI.Graphics();
  public tileWidth: number = 0;
  public tileHeight: number = 0;
  // tslint:disable-next-line:variable-name
  public _width?: number;
  // tslint:disable-next-line:variable-name
  public _height?: number;

  constructor(public resourceUrl: string) {
    super();

    const loaderPlugin = new TiledMapLoader();
    PIXI.Loader.registerPlugin(loaderPlugin);

    const loader = new PIXI.Loader();
    loader.add(resourceUrl).load(this.onResourceLoaded);
  }

  private onResourceLoaded = (
    loader: PIXI.Loader,
    resources: PIXI.IResourceDictionary
  ) => {
    const resource = resources[this.resourceUrl];
    const route = path.dirname(resource.url);
    const { data } = resource;

    this.background.beginFill(0x000000, 0);
    this.background.drawRect(
      0,
      0,
      (this._width || 0) * (this.tileWidth || 0),
      (this._height || 0) * (this.tileHeight || 0)
    );
    this.background.endFill();
    this.addChild(this.background);

    data.tileSets.forEach((tileSet: any) => {
      this.tileSets.push(new TileSet(route, tileSet));
    });

    data.layers.forEach((layerData: any) => {
      switch (layerData.type) {
        case 'tile': {
          const tileLayer = new TileLayer(layerData, this.tileSets);
          this.layers[layerData.name] = tileLayer;
          this.addChild(tileLayer);
          break;
        }
        case 'image': {
          const imageLayer = new ImageLayer(layerData, route);
          this.layers[layerData.name] = imageLayer as TileLayer;
          this.addChild(imageLayer);
          break;
        }
      }
    });
  };
}
