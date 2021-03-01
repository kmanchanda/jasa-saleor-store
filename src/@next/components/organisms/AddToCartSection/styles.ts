import { styled } from "@styles";

export const AddToCartSelection = styled.div``;

export const ProductNameHeader = styled.span`
  font-family: Helvetica Neue;
  font-style: normal;
  font-weight: 500;
  font-size: 24px !important;
  line-height: 36px;
  color: #131313;
`;

export const ProductPricing = styled.h4`
  font-weight: ${props => props.theme.typography.boldFontWeight};
  margin-bottom: ${props => props.theme.spacing.spacer};
`;

export const UndiscountedPrice = styled.span`
  text-decoration: line-through;
  color: ${props => props.theme.colors.baseFontColorSemiTransparent};
  font-size: ${props => props.theme.typography.smallFontSize};
`;

export const VariantPicker = styled.div`
  display: grid;
  margin-top: 20px;

  .react-select-wrapper,
  .input {
    width: 50%;
    margin-bottom: 1rem;
  }
`;

export const QuantityInput = styled.div`
  margin-top: 20px;
  padding-top: 20px;
`;

export const ErrorMessage = styled.p`
  color: ${props => props.theme.colors.error};
`;
