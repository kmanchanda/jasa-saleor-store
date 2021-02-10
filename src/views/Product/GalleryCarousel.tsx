import * as React from "react";

import { CachedImage } from "@components/molecules";

import { Carousel } from "../../components";
import { ProductDetails_product_images } from "./gqlTypes/ProductDetails";
import { useInView } from "react-intersection-observer";

import noPhotoImg from "../../images/no-photo.svg";

const GalleryCarousel: React.FC<{
    images: ProductDetails_product_images[];


}> = ({ images }) => {

    const [imageIndex, setImageIndex] = React.useState<number>(0);


    React.useEffect(() => {
        if (imageIndex >= images.length) {
            setImageIndex(0);
        }
    }, [images]);



    const bottomImageRef = React.useRef<HTMLDivElement | null>(null);
    const topImageRef = React.useRef<HTMLDivElement | null>(null);
    const [topImageIntersectionObserver, topImageInView] = useInView({
        threshold: 0.5,
    });

    const [bottomImageIntersectionObserver, bottomImageInView] = useInView({
        threshold: 0.5,
    });

    const setBottomRef = React.useCallback(
        node => {
            bottomImageRef.current = node;
            bottomImageIntersectionObserver(node);
        },
        [bottomImageIntersectionObserver]
    );

    const setTopRef = React.useCallback(
        node => {
            topImageRef.current = node;
            topImageIntersectionObserver(node);
        },
        [topImageIntersectionObserver]
    );

    const setIntersectionObserver = (index: number, lengthOfArray: number) => {
        if (lengthOfArray > 4) {
            if (index === 0) {
                return setTopRef;
            }
            if (index === lengthOfArray - 1) {
                return setBottomRef;
            }
        }
    };


    return (<div className="product-page__product__gallery">
        <Carousel
            renderCenterLeftControls={() => null}
            renderCenterRightControls={() => null}
            renderBottomCenterControls={props => {
                const indexes = [];

                for (let i = 0; i < props.slideCount; i++) {
                    indexes.push(i);
                }

                return (
                    <ul className="product-page__product__gallery__nav">
                        {indexes.map(index => (
                            <li
                                key={index}
                                onClick={props.goToSlide.bind(null, index)}
                                className={props.currentSlide === index ? "active" : ""}
                            >
                                <span />
                            </li>
                        ))}
                    </ul>
                );
            }}
        >
            {images.map(image => (
                <CachedImage url={image.url || noPhotoImg} key={image.id}>
                    <img src={noPhotoImg} alt={image.alt} />
                </CachedImage>
            ))}
        </Carousel>
        <div className='image-thumnbnail' >
            {images &&
                images.length > 0 &&
                images.map((image, index) => {
                    return (
                        <div
                            className={`image-item ${Boolean(index === imageIndex) ? 'active' : 'inactive'}`}
                            key={index}
                            data-test="galleryThumbnail"
                            data-test-id={index}
                            ref={setIntersectionObserver(index, images.length)}
                            onClick={() => setImageIndex(index)}
                            onMouseEnter={() => setImageIndex(index)}
                        >
                            <CachedImage alt={image.alt} url={image.url} style={{ width: 80 }} />
                        </div>

                    );
                })}
        </div>
    </div>
    );
}

export default GalleryCarousel;
