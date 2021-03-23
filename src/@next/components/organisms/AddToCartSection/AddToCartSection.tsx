import React, { useContext, useState } from "react";
import { useIntl } from "react-intl";
import { commonMessages } from "@temp/intl";
import { ICheckoutModelLine } from "@saleor/sdk/lib/helpers";
import {
  ProductDetails_product_pricing,
  ProductDetails_product_variants,
} from "@saleor/sdk/lib/queries/gqlTypes/ProductDetails";
import addMeticon from "../../../../images/addM.png";
import ReactSVG from "react-svg";
import { ChevronRightBlackIcon } from "@temp/ImageMapping/imageMapping";
import AddToCartButton from "../../molecules/AddToCartButton";
import "react-accessible-accordion/dist/fancy-example.css";

import featureImg from "../../../../images/feature-icon.svg";
import IconAssetWrapper from "../../../../components/IconAssetWrapper/index";
import "./scss/index.scss";

import {
  OverlayContext,
  OverlayTheme,
  OverlayType,
} from "../../../../components/index";
import * as S from "./styles";
import { getAvailableQuantity, canAddToCart } from "./stockHelpers";

const LOW_STOCK_QUANTITY: number = 5;

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

const AddToCartSection: React.FC<IAddToCartSection> = ({
  availableForPurchase,
  isAvailableForPurchase,
  items,
  name,
  productPricing,
  productVariants,
  queryAttributes,
  descriptionJson,
  onAddToCart,
  onAttributeChangeHandler,
  setVariantId,
  metadata,
  variantId,
}) => {
  const intl = useIntl();

  const [quantity] = useState<number>(1);
  const [variantStock] = useState<number>(0);

  const overlayContext = useContext(OverlayContext);

  const availableQuantity = getAvailableQuantity(
    items,
    variantId,
    variantStock
  );
  const isOutOfStock = !!variantId && variantStock === 0;
  const noPurchaseAvailable = !isAvailableForPurchase && !availableForPurchase;
  const purchaseAvailableDate =
    !isAvailableForPurchase &&
    availableForPurchase &&
    Date.parse(availableForPurchase);
  const isNoItemsAvailable = !!variantId && !isOutOfStock && !availableQuantity;
  const isLowStock =
    !!variantId &&
    !isOutOfStock &&
    !isNoItemsAvailable &&
    availableQuantity < LOW_STOCK_QUANTITY;

  const disableButton = !canAddToCart(
    items,
    !!isAvailableForPurchase,
    variantId,
    variantStock,
    quantity
  );

  const renderErrorMessage = (message: string, testingContextId: string) => (
    <S.ErrorMessage
      data-test="stockErrorMessage"
      data-testId={testingContextId}
    >
      {message}
    </S.ErrorMessage>
  );

  const otherMaterials = metadata["Product image (Tryk)"]
    ? JSON.parse(metadata["Product image (Tryk)"])
    : null;
  /* @todo will replace with api data */
  
  const otherMaterialData = {
    title : "Vedligeholdelse",
    data : otherMaterials
  }

  const specifications = {
    title : "Specifikationer & mål",
    data : metadata
  }

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
        <button className="btnIn2">Se forhandlerliste</button>
      </div>
      <div className="featurelists">
        <ReactSVG path={featureImg} /> Opnå gratis forsendelse ved køb over 500
        kr.
      </div>
      
      <div className="addsmettel">
        <div className="addstitle">
            ANDET MATERIALE
        </div>
        <div className="addmetlist">
            <div className="addmetbox">
                <img src={addMeticon} alt={"addMeticon"} />
            </div>
        </div>
      </div>
    
      {
        otherMaterials ? (
          <div
        onClick={() => {
          const { title, data} = otherMaterialData;
          overlayContext.show(
            OverlayType.DisplayOtherDocuments,
            OverlayTheme.right,
            { title, data }
          )
        }}
        className="accordian-list"
      >
        <span className="accordianTitle">Vedligeholdelse</span>
        <IconAssetWrapper source={ChevronRightBlackIcon} />
      </div>
        ) : null
      }
      
      
      <div
        onClick={() => {
          const { title, data} = specifications;
          overlayContext.show(
            OverlayType.DisplaySpecifications,
            OverlayTheme.right,
            { title, data }
          )
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
