import { media, styled } from "@styles";
import { css } from "styled-components";

const textProps = css`
  font-size: ${props => props.theme.typography.baseFontSize};
  margin: 0 0 0.5rem 0;
  text-align: left;
`;

export const Wrapper = styled.div`
  padding: 1.1rem;
  text-align: center;
  max-height: 30rem;
  transition: 0.3s;

  ${media.largeScreen`
    padding: 1.8rem;
  `}
`;

export const Title = styled.h4`
  ${textProps}
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 26px;
  color: #131313;
  padding-top:12px

`;

export const Price = styled.p`
  ${textProps}
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: #131313;
`;

export const Description = styled.p`
  ${textProps}
  font-weight: normal;
  font-style: normal;
  font-size: 14px;
  line-height: 24px;
`;

export const Image = styled.div`
  max-width: 100%;
  width: 250px;
  height: 320px;
  background-color: #f9f9f9;
  border-radius: 2px;
  overflow: hidden;
  padding: 50px 20px;

  > img {
    height: 100% !important;
    width:100% !important
  }
`;
