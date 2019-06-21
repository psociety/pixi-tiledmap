import * as PIXI from 'pixi.js';

import { ITileSetData } from './types/interfaces';

export default class TileSet {
  public firstGid: number = 0;
  public baseTexture: PIXI.BaseTexture;
  public textures: PIXI.Texture[];
  public margin: number = 0;
  public spacing: number = 0;
  public tileHeight: number = 0;
  public tileWidth: number = 0;
  public image: {
    source: string;
    height: number;
    width: number;
  } = {
    height: 0,
    source: '',
    width: 0,
  };
  public tileOffset?: {
    x: number;
    y: number;
  };

  constructor(route: string, tileSet: ITileSetData) {
    Object.assign(this, tileSet);

    const texture = PIXI.Texture.from(`${route}/${this.image.source}`);
    this.baseTexture = texture.baseTexture;
    this.textures = [];

    for (
      let y = this.margin;
      y < this.image.height;
      y += this.tileHeight + this.spacing
    ) {
      for (
        let x = this.margin;
        x < this.image.width;
        x += this.tileWidth + this.spacing
      ) {
        this.textures.push(
          new PIXI.Texture(
            this.baseTexture,
            new PIXI.Rectangle(x, y, this.tileWidth, this.tileHeight)
          )
        );
      }
    }
  }
}
