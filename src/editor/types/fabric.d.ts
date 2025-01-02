import { CurvatureFilter } from "../filters/CurvatureFilter";

declare module "fabric" {
  namespace fabric {
    namespace Image {
      namespace filters {
        interface BaseFilter {
          applyTo2d(options: { imageData: ImageData }): void;
        }
      }
    }

    interface IImageFilters {
      Curvature: typeof CurvatureFilter;
    }

    interface Image {
      filters?: Array<CurvatureFilter | fabric.Image.filters.BaseFilter>;
    }
  }
}
