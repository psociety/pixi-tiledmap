import * as PIXI from 'pixi.js';

declare module 'pixi-tiledmap' {
  interface ITMXData {
    version: string;
    orientation: string;
    width: number;
    height: number;
    tileWidth: number;
    tileHeight: number;
    backgroundColor?: string;
    layers: ILayerData[];
    properties: {};
    tileSets: ITileSetData[];
  }

  interface ILayerData {
    map: ITMXData;
    type: string;
    name: string;
    image?: {
      format?: string;
      height: number;
      source: string;
      trans?: boolean;
      width: number;
    };
    opacity: number;
    visible: boolean;
    properties: {};
    tiles: ITileData[];
    horizontalFlips: boolean[];
    verticalFlips: boolean[];
    diagonalFlips: boolean[];
  }

  interface ITileSetData {
    firstGid: number;
    source: string;
    name: string;
    tileWidth: number;
    tileHeight: number;
    spacing?: number;
    margin?: number;
    tileOffset: {
      x: number;
      y: number;
    };
    properties: {};
    image: {
      format?: string;
      height: number;
      source: string;
      trans?: boolean;
      width: number;
    };
    tiles: ITileData[];
    terrainTypes: [];
  }

  interface ITileData {
    animations: IAnimation[];
    gid: number;
    id: number;
    image?: {
      format?: string;
      height: number;
      source: string;
      trans?: boolean;
      width: number;
    };
    objectGroups: [];
    probability?: number;
    properties: {};
    terrain: [];
  }

  interface IAnimation {
    tileId: number;
    duration: number;
  }

  class TileSet {
    public firstGid: number;
    public baseTexture: PIXI.Texture;
    public textures: PIXI.Texture[];
    public margin: number;
    public spacing: number;
    public tileHeight: number;
    public tileWidth: number;
    public image: {
      source: string;
      height: number;
      width: number;
    };
    public tileOffset?: {
      x: number;
      y: number;
    };
    constructor(route: string, tileSet: ITileSetData);
  }

  class Tile {
    private static getTextures;
    public animations: IAnimation[];
    public gid: number;
    public _x: number;
    public _y: number;
    public tile: ITileData;
    public tileSet: TileSet;
    public horizontalFlip: boolean;
    public verticalFlip: boolean;
    public diagonalFlip: boolean;
    private flip;
    constructor(
      tile: ITileData,
      tileSet: TileSet,
      horizontalFlip: boolean,
      verticalFlip: boolean,
      diagonalFlip: boolean
    );
  }

  class TileLayer {
    private static findTileSet;
    public layer: ILayerData;
    public tileSets: TileSet[];
    public tiles: Tile[];
    constructor(layer: ILayerData, tileSets: TileSet[]);
    public create(): void;
  }

  export default class TiledMap extends PIXI.Container {
    public resourceUrl: string;
    public tileSets: TileSet[];
    public layers: {
      [index: string]: TileLayer;
    };
    public background: PIXI.Graphics;
    public _width?: number;
    public tileWidth: number;
    public _height?: number;
    public tileHeight: number;
    constructor(resourceUrl: string);
    public create(): void;
  }
}
