import React, { useContext, useState } from "react";
import { useIntl } from "react-intl";
import { sanitize } from "dompurify";
import draftToHtml from "draftjs-to-html";
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
import 'react-accessible-accordion/dist/fancy-example.css';

import featureImg from "../../../../images/feature-icon.svg";
import addMeticon from "../../../../images/addM.png";
import IconAssetWrapper from '../../../../components/IconAssetWrapper/index';
import './scss/index.scss';

import {
    OverlayContext,
    OverlayTheme,
    OverlayType,
} from "../../../../components/index";
import * as S from "./styles";
import {
    getAvailableQuantity,
    getProductPrice,
    canAddToCart,
} from "./stockHelpers";
import { ChevronRightBlackIcon } from "@temp/ImageMapping/imageMapping";

const LOW_STOCK_QUANTITY: number = 5;



export type ObjectDto = Record<string | number, any>

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
    metadata: any
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

    const [quantity, setQuantity] = useState<number>(1);
    const [variantStock, setVariantStock] = useState<number>(0);
    const [
        variantPricing,
        setVariantPricing,
    ] = useState<ProductDetails_product_variants_pricing | null>(null);


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
    let desc = (metadata['Beskrivelse']).replaceAll(/(\r\n|\n|\n\s+\n|\r)/g, " ")
    let array = (metadata['Beskrivelse']).split('\n').filter((item: string) => item !== '\n');



    return (
        <S.AddToCartSelection>
            <S.ProductNameHeader data-test="productName">{name}</S.ProductNameHeader>

            <div className="cfinner">
                <div className="finner1">
                    Varenr.: {metadata['Varenummer']}
                </div>
                <div className="finner1">
                    DB nr.: {metadata['DB number']}
                </div>
            </div>
            <div className="Maindes">
                {desc &&
                    array.map(item => {
                        return (
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: item
                                }}
                            />
                        )
                    })
                }

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
            {/* <S.VariantPicker>
        <ProductVariantPicker
          productVariants={productVariants}
          onChange={onVariantPickerChange}
          selectSidebar
          queryAttributes={queryAttributes}
          onAttributeChangeHandler={onAttributeChangeHandler}
        />
      </S.VariantPicker> */}
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
            <AddToCartButton
                onSubmit={() => onAddToCart(variantId, quantity)}
                disabled={disableButton}
            />
            <div className="btn-blo">
                <button className="btnIn2">Se forhandlerliste</button>
            </div>
            <div className="featurelists">
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
            {
                dummyData.map((item, key) => {

                    const { title, content } = item;

                    return (
                        <div onClick={() =>
                            overlayContext.show(OverlayType.DisplayContent, OverlayTheme.right, { title, content })
                        } className='accordian-list' >
                            <span>{title}</span>
                            <IconAssetWrapper source={ChevronRightBlackIcon} />
                        </div>
                    )
                })
            }
        </S.AddToCartSelection>
    );
};
AddToCartSection.displayName = "AddToCartSection";
export default AddToCartSection;

/* @todo will replace with api data */
const dummyData = [
    {
        title: 'Vedligeholdelse',
        content: 'Exercitation in fugiat est ut ad ea cupidatat ut in cupidatat occaecat ut occaecat consequat est minim minim esse tempor laborum consequat esse adipisicing eu reprehenderit enim.'
    }, {
        title: ' Specifikationer & Mål',
        content: " In ad velit in ex nostrud dolore cupidatat consectetur \
                            ea in ut nostrud velit in irure cillum tempor laboris \
                        sed adipisicing eu esse duis nulla non."
    },
]
