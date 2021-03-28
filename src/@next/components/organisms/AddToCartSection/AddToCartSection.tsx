import React, { useContext } from "react";
import { ICheckoutModelLine } from "@saleor/sdk/lib/helpers";
import {
  ProductDetails_product_pricing,
  ProductDetails_product_variants,
} from "@saleor/sdk/lib/queries/gqlTypes/ProductDetails";
import { ChevronRightBlackIcon } from "@temp/ImageMapping/imageMapping";
import addMeticon from "../../../../images/addM.png";
import "react-accessible-accordion/dist/fancy-example.css";
import IconAssetWrapper from "../../../../components/IconAssetWrapper/index";
import "./scss/index.scss";

import {
  OverlayContext,
  OverlayTheme,
  OverlayType,
} from "../../../../components/index";
import * as S from "./styles";

export type ObjectDto = Record<string | number, any>;
export interface IAddToCartSection {
  productId: string;
  productVariants: ProductDetails_product_variants[];
  name: string;
  productPricing: ProductDetails_product_pricing;
  items: ICheckoutModelLine[];
  queryAttributes: Record<string, string>;
  descriptionJson: string;
  isAvailableForPurchase: boolean | null;
  availableForPurchase: string | null;
  variantId: string;
  setVariantId(variantId: string): void;
  onAddToCart(variantId: string, quantity?: number): void;
  metadata: any;
  onAttributeChangeHandler(slug: string | null, value: string): void;
}

const AddToCartSection: React.FC<IAddToCartSection> = ({ name, metadata }) => {
  const overlayContext = useContext(OverlayContext);
  const otherMaterials = metadata["Product image (Tryk)"]
    ? JSON.parse(metadata["Product image (Tryk)"])
    : null;

  const otherMaterialData = {
    title: "Vedligeholdelse",
    data: otherMaterials,
  };

  const specifications = {
    title: "Specifikationer & mål",
    data: metadata,
  };
  const dealer = {
    title: "Vores forhandlere",
    data: metadata,
  };

  return (
    <S.AddToCartSelection>
      <S.ProductNameHeader data-test="productName">{name}</S.ProductNameHeader>
      <div className="cfinner">
        <div className="finner1">Varenr.: {metadata.Varenummer}</div>
        <div className="finner1">DB nr.: {metadata["DB number"]}</div>
      </div>
      <div className="Maindes">
        Dørgreb L-Form i PVD messing. Med 2 mm massiv roset Ø52 mm. CC 30 mm.
        Inkl. skruer. Passer til dørtykkelse 30-75 mm.
      </div>
      <div className="btn-blo">
        <button
          className="btnIn2"
          onClick={() => {
            const { title, data } = dealer;
            overlayContext.show(OverlayType.DisplayDealer, OverlayTheme.right, {
              title,
              data,
            });
          }}
        >
          Se forhandlerliste
        </button>
      </div>
      <div className="addsmettel">
        <div className="addstitle">ANDET MATERIALE</div>
        <div className="addmetlist">
          <div className="addmetbox">
            <img src={addMeticon} alt="addMeticon" />
          </div>
        </div>
      </div>

      {otherMaterials ? (
        <div
          onClick={() => {
            const { title, data } = otherMaterialData;
            overlayContext.show(
              OverlayType.DisplayOtherDocuments,
              OverlayTheme.right,
              { title, data }
            );
          }}
          className="accordian-list"
        >
          <span className="accordianTitle">Vedligeholdelse</span>
          <IconAssetWrapper source={ChevronRightBlackIcon} />
        </div>
      ) : null}
      <div
        onClick={() => {
          const { title, data } = specifications;
          overlayContext.show(
            OverlayType.DisplaySpecifications,
            OverlayTheme.right,
            { title, data }
          );
        }}
        className="accordian-list"
      >
        <span className="accordianTitle">Specifikationer & mål</span>
        <IconAssetWrapper source={ChevronRightBlackIcon} />
      </div>
    </S.AddToCartSelection>
  );
};
AddToCartSection.displayName = "AddToCartSection";
export default AddToCartSection;
