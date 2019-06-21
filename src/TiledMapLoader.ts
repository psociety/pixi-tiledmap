import * as PIXI from 'pixi.js';

import * as tmx from './lib/tmx-parser.js';
import { ITMXData } from './types/interfaces';

export default class TileMapLoader implements PIXI.ILoaderPlugin {
  public loader = new PIXI.Loader();

  public use = (resource: PIXI.LoaderResource, next: () => void) => {
    if (
      !resource.data ||
      !resource.xhr ||
      resource.type !== PIXI.LoaderResource.TYPE.XML ||
      !resource.data.children ||
      !resource.data.children[0].getElementsByTagName('tileset')
    ) {
      return next();
    }

    const loadOptions = {
      crossOrigin: resource.crossOrigin,
      parentResource: resource,
    };

    const resourcePath = new URL(
      resource.url,
      this.loader.baseUrl || window.location.href
    ).href;

    tmx.parse(
      resource.xhr.responseText,
      resourcePath,
      (err: Error, map: ITMXData) => {
        if (err) {
          throw err;
        }

        map.tileSets.forEach((tileset: any) => {
          if (!(tileset.image.source in this.loader.resources)) {
            this.loader.add(
              tileset.image.source,
              `${resourcePath}/${tileset.image.source}`,
              loadOptions
            );
          }
        });

        resource.data = map;
        next();
      }
    );
  };
}
