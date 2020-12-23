import React, { useState } from "react";
import { useIntl } from "react-intl";

import { commonMessages } from "@temp/intl";
import { ICheckoutModelLine } from "@saleor/sdk/lib/helpers";
import {
  ProductDetails_product_pricing,
  ProductDetails_product_variants,
  ProductDetails_product_variants_pricing,
} from "@saleor/sdk/lib/queries/gqlTypes/ProductDetails";

import { IProductVariantsAttributesSelectedValues } from "@types";
import QuantityInput from "../../molecules/QuantityInput";
import AddToCartButton from "../../molecules/AddToCartButton";
import ReactSVG from "react-svg";
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';

import featureImg from "../../../../images/feature-icon.svg";
import addMeticon from "../../../../images/addM.png";

import ProductVariantPicker from "../ProductVariantPicker";
import * as S from "./styles";
import {
  getAvailableQuantity,
  getProductPrice,
  canAddToCart,
} from "./stockHelpers";

const LOW_STOCK_QUANTITY: number = 5;

export interface IAddToCartSection {
  productId: string;
  productVariants: ProductDetails_product_variants[];
  name: string;
  productPricing: ProductDetails_product_pricing;
  items: ICheckoutModelLine[];
  queryAttributes: Record<string, string>;
  isAvailableForPurchase: boolean | null;
  availableForPurchase: string | null;
  variantId: string;
  setVariantId(variantId: string): void;
  onAddToCart(variantId: string, quantity?: number): void;
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
  onAddToCart,
  onAttributeChangeHandler,
  setVariantId,
  variantId,
}) => {
  const intl = useIntl();

  const [quantity, setQuantity] = useState<number>(1);
  const [variantStock, setVariantStock] = useState<number>(0);
  const [
    variantPricing,
    setVariantPricing,
  ] = useState<ProductDetails_product_variants_pricing | null>(null);

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

  const onVariantPickerChange = (
    _selectedAttributesValues?: IProductVariantsAttributesSelectedValues,
    selectedVariant?: ProductDetails_product_variants
  ): undefined => {
    if (!selectedVariant) {
      setVariantId("");
      setVariantPricing(null);
      setVariantStock(0);
      return;
    }
    setVariantId(selectedVariant.id);
    setVariantPricing(selectedVariant?.pricing);
    setVariantStock(selectedVariant?.quantityAvailable);
  };

  return (
    <S.AddToCartSelection>
      <S.ProductNameHeader data-test="productName">{name}</S.ProductNameHeader>
      {isOutOfStock ? (
        renderErrorMessage(
          intl.formatMessage(commonMessages.outOfStock),
          "outOfStock"
        )
      ) : (
         <S.ProductPricing>
        {getProductPrice(productPricing, variantPricing)}
         </S.ProductPricing>
      )}
	  
	  <div className="cfinner">
	  <div className="finner1">
	  Varenr.: 13744
      </div>
	  <div className="finner1">
	  DB nr.: 1553418
      </div>
	    </div>
      <div className="Maindes">
	  Dørgreb L-Form i PVD messing. Med 2 mm massiv roset Ø52 mm. CC 30 mm. Inkl. skruer. Passer til dørtykkelse 30-75 mm.
      </div>
	 
	  
      {noPurchaseAvailable &&
        renderErrorMessage(
          intl.formatMessage(commonMessages.noPurchaseAvailable),
          "notAvailable"
        )}
      {purchaseAvailableDate &&
        renderErrorMessage(
          intl.formatMessage(commonMessages.purchaseAvailableOn, {
            date: new Intl.DateTimeFormat("default", {
              year: "numeric",
              month: "numeric",
              day: "numeric",
            }).format(purchaseAvailableDate),
            time: new Intl.DateTimeFormat("default", {
              hour: "numeric",
              minute: "numeric",
            }).format(purchaseAvailableDate),
          }),
          "timeRestrictedAvailability"
        )}
		
		
      {isLowStock &&
        renderErrorMessage(
          intl.formatMessage(commonMessages.lowStock),
          "lowStockWarning"
        )}
      {isNoItemsAvailable &&
        renderErrorMessage(
          intl.formatMessage(commonMessages.noItemsAvailable),
          "noItemsAvailable"
        )}
      <S.VariantPicker>
        <ProductVariantPicker
          productVariants={productVariants}
          onChange={onVariantPickerChange}
          selectSidebar
          queryAttributes={queryAttributes}
          onAttributeChangeHandler={onAttributeChangeHandler}
        />
      </S.VariantPicker>
      <S.QuantityInput>
        <QuantityInput
          quantity={quantity}
          maxQuantity={availableQuantity}
          disabled={isOutOfStock || isNoItemsAvailable}
          onQuantityChange={setQuantity}
          hideErrors={!variantId || isOutOfStock || isNoItemsAvailable}
          testingContext="addToCartQuantity"
        />
      </S.QuantityInput>
      <AddToCartButton
        onSubmit={() => onAddToCart(variantId, quantity)}
        disabled={disableButton}
      />
     <div className="btn-blo">
	  <button className="btnIn2">Se forhandlerliste</button>
	  </div>
	  <div  className="featurelists">
	  <ReactSVG path={featureImg} /> Opnå gratis forsendelse ved køb over 500 kr.
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
	   <Accordion>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                    Vedligeholdelse
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p>
                        Exercitation in fugiat est ut ad ea cupidatat ut in
                        cupidatat occaecat ut occaecat consequat est minim minim
                        esse tempor laborum consequat esse adipisicing eu
                        reprehenderit enim.
                    </p>
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                    Specifikationer & Mål
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p>
                        In ad velit in ex nostrud dolore cupidatat consectetur
                        ea in ut nostrud velit in irure cillum tempor laboris
                        sed adipisicing eu esse duis nulla non.
                    </p>
                </AccordionItemPanel>
            </AccordionItem>
        </Accordion>
    </S.AddToCartSelection>
  );
};
AddToCartSection.displayName = "AddToCartSection";
export default AddToCartSection;
