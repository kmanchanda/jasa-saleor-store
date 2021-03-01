import { styled, media } from "@styles";

export const Wrapper = styled.div`
  display: grid;
  grid-template-areas: "sidebar preview";
  height: 100%;
  grid-template-columns: 76px 1fr;
  grid-column-gap: 40px;

  ${media.smallScreen`
    display: grid;
    grid-column-gap: 20px;
  `}
`;

export const Thumbnail = styled.div<{ activeThumbnail: boolean }>`
  width: 76px;
  display: flex;
  border-width: 1px;
  border-style: solid;
  border-color: ${props =>
    props.activeThumbnail === true ? "#F5A930" : "transparent"};
  justify-content: center;
  height: 100px;
  overflow: hidden;
  img {
    width: 100%;
    object-fit: contain;
  }

  margin-top: 20px;
  margin-bottom: 20px;
`;

export const Button = styled.div`
  height: 50px;
  width: 100%;
  position: absolute;
  z-index: 1;
  background-color: rgba(50, 50, 50, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const TopButton = styled(Button)`
  top: 0%;

  transform: rotate(180deg);
`;

export const BottomButton = styled(Button)`
  bottom: 0%;
`;

export const ThumbnailsContainer = styled.div`
  position: relative;
`;

export const ThumbnailList = styled.div`
  position: relative;
  height: 420px;
  overflow-y: scroll;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    width: 0px !important;
  }

  ul {
    position: absolute;
    display: block;
    padding: 0;
    margin: 0;
  }
`;

export const Preview = styled.div`
  grid-area: preview;
  width: 460px;
  max-height: 520px;
  background: #f9f9f9;
  padding-inline:40px;
  padding-top:60px;
  padding-bottom:60px
  img {
     width: 100%;
  }
`;
