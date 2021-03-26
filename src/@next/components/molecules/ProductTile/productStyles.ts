import { media, styled } from "@styles";
import { css } from "styled-components";

const textProps = css`
  font-size: ${props => props.theme.typography.baseFontSize};
  margin: 0 0 0.5rem 0;
  text-align: left;
`;

export const Wrapper = styled.div`
  padding-top:1.3rem;
  padding:right:2rem
  text-align: center;
  transition: 0.3s;

  ${media.largeScreen`
    padding: 1.8rem;
  `}
`;

export const Title = styled.h4`
  ${textProps}
  padding-top: 12px;
  font-family: Helvetica Neue;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 26px;
  color: #131313;
`;

export const Price = styled.p`
  ${textProps}
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: #131313;
`;

export const Description = styled.p`
  ${textProps}
  font-family: Helvetica Neue;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: #888888;
`;

export const Image = styled.div`
  max-width: 100%;
  background-color: #f9f9f9;
  border-radius: 2px;
  overflow: hidden;
  padding: 89px 28px;
  max-width: 340px;
  height: 440px;

  > img {
    height: 100% !important;
    width: 100% !important;
  }
`;
