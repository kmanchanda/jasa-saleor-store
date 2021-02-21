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
  text-transform: uppercase;
  font-weight: normal;
  ${textProps}
`;

export const Price = styled.p`
  ${textProps}
`;

export const Description = styled.p` 
${textProps}
font-weight: normal;
font-size: 12px;
line-height: 26px;
`;

export const Image = styled.div`
  max-width: 100%;
  width: 250px;
        height: 300px;
        background-color: #F9F9F9;
        border-radius: 2px;
        overflow: hidden;
        padding: 4px 0px;

  > img {
    width: auto;
    height: auto;
    max-width: 100%;
  }
`;
