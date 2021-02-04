import * as React from "react";

import { NavLink } from "..";
import { TypedSecondaryMenuQuery } from "./queries";

import "./scss/index.scss";

class Nav extends React.PureComponent {
    render() {
        return (
            <footer className="footer-nav">
                {
                    dummyFooterData.map((item, index) => {
                        const { heading, subHeading } = item;
                        return (
                            <div className='heading-item'>
                                <span className='heading-footer-item'>
                                    {heading}
                                </span>
                                {
                                    subHeading.map((item, indexChild) => {
                                        return (<span className='subheading-footer-item'>
                                            {item}
                                        </span>)
                                    })
                                }

                            </div>
                        )
                    })
                }

                {/* <div className="container">
                    <TypedSecondaryMenuQuery>
                        {({ data }) => {
                            return data.shop.navigation.secondary.items.map(item => (
                                <div className="footer-nav__section" key={item.id}>
                                    <h4 className="footer-nav__section-header">
                                        <NavLink item={item} />
                                    </h4>
                                    <div className="footer-nav__section-content">
                                        {item.children.map(subItem => (
                                            <p key={subItem.id}>
                                                   <NavLink item={subItem} />
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            ));
                        }}
                    </TypedSecondaryMenuQuery>
                </div> */}
            </footer>
        );
    }
}

export default Nav;



const dummyFooterData = [
    {
        heading: 'Find det hurtigt',
        subHeading: ['Vision og værdier', 'Om Jasa', 'Vores histore', 'Jasafe'],
    }, {
        heading: 'ÅBNINGSTIDER',
        subHeading: ['FAQ', 'Nyheder', 'Kataloger', 'Medarbejdere', 'Job'],
    }, {
        heading: 'ÅBNINGSTIDER',
        subHeading: ['Mandag - Torsdag: Kl. 8:00 - 16:30 \
        Fredag: Kl. 8:00 - 14:00 \
        Lørdag - Søndag: Lukket'],
    }, {
        heading: 'Kontakt',
        subHeading: ['Marøgeljøj 17 \
        DK-8520 Lystrup \
        CVR nr. 29309027'],

    }]
