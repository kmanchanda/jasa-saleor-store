import React, { useContext, useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { commonMessages } from "@temp/intl";
import { useAuth, useCart } from "@saleor/sdk";

import Media from "react-media";
import { Link } from "react-router-dom";
import ReactSVG from "react-svg";

import { DemoBanner } from "@components/atoms";
import classNames from "classnames";
import TextField from "@material-ui/core/TextField";
import {
  MenuDropdown,
  Offline,
  Online,
  OverlayContext,
  OverlayTheme,
  OverlayType,
} from "..";
import * as appPaths from "../../app/routes";
import { maybe } from "../../core/utils";
import NavDropdown from "./NavDropdown";
import { TypedMainMenuQuery } from "./queries";

import cartImg from "../../images/cart.svg";
import hamburgerHoverImg from "../../images/hamburger-hover.svg";
import hamburgerImg from "../../images/hamburger.svg";
import logoImg from "../../images/logo.svg";
import searchImg from "../../images/search.svg";
import NewSearchIcon from "../../images/search-icon.svg";
import userImg from "../../images/user.svg";
import {
  mediumScreen,
  smallScreen,
} from "../../globalStyles/scss/variables.scss";
import "./scss/index.scss";
import InputAdornment from "@material-ui/core/InputAdornment";
import Autocomplete from "@material-ui/lab/Autocomplete";

interface MainMenuProps {
  demoMode: boolean;
}

const MainMenu: React.FC<MainMenuProps> = ({ demoMode }) => {
  const overlayContext = useContext(OverlayContext);

  const { user, signOut } = useAuth();
  const { items } = useCart();

  const handleSignOut = () => {
    signOut();
  };

  const cartItemsQuantity =
    (items &&
      items.reduce((prevVal, currVal) => prevVal + currVal.quantity, 0)) ||
    0;

  const [activeDropdown, setActiveDropdown] = useState<string>(undefined);
  useEffect(() => {
    if (activeDropdown) {
      overlayContext.show(OverlayType.mainMenuNav, OverlayTheme.modal);
    } else {
      overlayContext.hide();
    }
  }, [activeDropdown]);

  const showDropdownHandler = (itemId: string, hasSubNavigation: boolean) => {
    if (hasSubNavigation) {
      setActiveDropdown(itemId);
    }
  };

  const hideDropdownHandler = () => {
    if (activeDropdown) {
      setActiveDropdown(undefined);
    }
  };

  const top100Films = [
    { title: "The Shawshank Redemption", year: 1994 },
    { title: "The Godfather", year: 1972 },
    { title: "The Godfather: Part II", year: 1974 },
    { title: "The Dark Knight", year: 2008 },
    { title: "12 Angry Men", year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: "Pulp Fiction", year: 1994 },
    { title: "The Lord of the Rings: The Return of the King", year: 2003 },
    { title: "The Good, the Bad and the Ugly", year: 1966 },
    { title: "Fight Club", year: 1999 },
    { title: "The Lord of the Rings: The Fellowship of the Ring", year: 2001 },
    { title: "Star Wars: Episode V - The Empire Strikes Back", year: 1980 },
    { title: "Forrest Gump", year: 1994 },
    { title: "Inception", year: 2010 },
    { title: "The Lord of the Rings: The Two Towers", year: 2002 },
    { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { title: "Goodfellas", year: 1990 },
    { title: "The Matrix", year: 1999 },
    { title: "Seven Samurai", year: 1954 },
    { title: "Star Wars: Episode IV - A New Hope", year: 1977 },
    { title: "City of God", year: 2002 },
    { title: "Se7en", year: 1995 },
    { title: "The Silence of the Lambs", year: 1991 },
    { title: "It's a Wonderful Life", year: 1946 },
    { title: "Life Is Beautiful", year: 1997 },
    { title: "The Usual Suspects", year: 1995 },
    { title: "Léon: The Professional", year: 1994 },
    { title: "Spirited Away", year: 2001 },
    { title: "Saving Private Ryan", year: 1998 },
    { title: "Once Upon a Time in the West", year: 1968 },
    { title: "American History X", year: 1998 },
    { title: "Interstellar", year: 2014 },
    { title: "Casablanca", year: 1942 },
    { title: "City Lights", year: 1931 },
    { title: "Psycho", year: 1960 },
    { title: "The Green Mile", year: 1999 },
    { title: "The Intouchables", year: 2011 },
    { title: "Modern Times", year: 1936 },
    { title: "Raiders of the Lost Ark", year: 1981 },
    { title: "Rear Window", year: 1954 },
    { title: "The Pianist", year: 2002 },
    { title: "The Departed", year: 2006 },
    { title: "Terminator 2: Judgment Day", year: 1991 },
    { title: "Back to the Future", year: 1985 },
    { title: "Whiplash", year: 2014 },
    { title: "Gladiator", year: 2000 },
    { title: "Memento", year: 2000 },
    { title: "The Prestige", year: 2006 },
    { title: "The Lion King", year: 1994 },
    { title: "Apocalypse Now", year: 1979 },
    { title: "Alien", year: 1979 },
    { title: "Sunset Boulevard", year: 1950 },
    {
      title:
        "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
      year: 1964,
    },
    { title: "The Great Dictator", year: 1940 },
    { title: "Cinema Paradiso", year: 1988 },
    { title: "The Lives of Others", year: 2006 },
    { title: "Grave of the Fireflies", year: 1988 },
    { title: "Paths of Glory", year: 1957 },
    { title: "Django Unchained", year: 2012 },
    { title: "The Shining", year: 1980 },
    { title: "WALL·E", year: 2008 },
    { title: "American Beauty", year: 1999 },
    { title: "The Dark Knight Rises", year: 2012 },
    { title: "Princess Mononoke", year: 1997 },
    { title: "Aliens", year: 1986 },
    { title: "Oldboy", year: 2003 },
    { title: "Once Upon a Time in America", year: 1984 },
    { title: "Witness for the Prosecution", year: 1957 },
    { title: "Das Boot", year: 1981 },
    { title: "Citizen Kane", year: 1941 },
    { title: "North by Northwest", year: 1959 },
    { title: "Vertigo", year: 1958 },
    { title: "Star Wars: Episode VI - Return of the Jedi", year: 1983 },
    { title: "Reservoir Dogs", year: 1992 },
    { title: "Braveheart", year: 1995 },
    { title: "M", year: 1931 },
    { title: "Requiem for a Dream", year: 2000 },
    { title: "Amélie", year: 2001 },
    { title: "A Clockwork Orange", year: 1971 },
    { title: "Like Stars on Earth", year: 2007 },
    { title: "Taxi Driver", year: 1976 },
    { title: "Lawrence of Arabia", year: 1962 },
    { title: "Double Indemnity", year: 1944 },
    { title: "Eternal Sunshine of the Spotless Mind", year: 2004 },
    { title: "Amadeus", year: 1984 },
    { title: "To Kill a Mockingbird", year: 1962 },
    { title: "Toy Story 3", year: 2010 },
    { title: "Logan", year: 2017 },
    { title: "Full Metal Jacket", year: 1987 },
    { title: "Dangal", year: 2016 },
    { title: "The Sting", year: 1973 },
    { title: "2001: A Space Odyssey", year: 1968 },
    { title: "Singin' in the Rain", year: 1952 },
    { title: "Toy Story", year: 1995 },
    { title: "Bicycle Thieves", year: 1948 },
    { title: "The Kid", year: 1921 },
    { title: "Inglourious Basterds", year: 2009 },
    { title: "Snatch", year: 2000 },
    { title: "3 Idiots", year: 2009 },
    { title: "Monty Python and the Holy Grail", year: 1975 },
  ];

  return (
    <header
      className={classNames({
        "header-with-dropdown": !!activeDropdown,
      })}
    >
      {demoMode && <DemoBanner />}
      <nav className="main-menu" id="header">
        <Media
          query={{ minWidth: mediumScreen }}
          render={() => (
            <div className="main-menu__center">
              <Link to={appPaths.baseUrl}>
                <ReactSVG path={logoImg} />
              </Link>
            </div>
          )}
        />

        <div className="main-menu__left">
          <TypedMainMenuQuery renderOnError displayLoader={false}>
            {({ data }) => {
              const items = maybe(() => data.shop.navigation.main.items, []);
              return (
                <ul>
                  <Media
                    query={{ maxWidth: mediumScreen }}
                    render={() => (
                      <li
                        data-test="toggleSideMenuLink"
                        className="main-menu__hamburger"
                        onClick={() =>
                          overlayContext.show(
                            OverlayType.sideNav,
                            OverlayTheme.left,
                            { data: items }
                          )
                        }
                      >
                        <ReactSVG
                          path={hamburgerImg}
                          className="main-menu__hamburger--icon"
                        />
                        <ReactSVG
                          path={hamburgerHoverImg}
                          className="main-menu__hamburger--hover"
                        />
                      </li>
                    )}
                  />
                  <Media
                    query={{ minWidth: mediumScreen }}
                    render={() =>
                      items.map(item => {
                        const hasSubNavigation = !!item?.children?.length;
                        return (
                          <li
                            data-test="mainMenuItem"
                            className="main-menu__item"
                            key={item.id}
                          >
                            <NavDropdown
                              overlay={overlayContext}
                              showDropdown={
                                activeDropdown === item.id && hasSubNavigation
                              }
                              onShowDropdown={() =>
                                showDropdownHandler(item.id, hasSubNavigation)
                              }
                              onHideDropdown={hideDropdownHandler}
                              {...item}
                            />
                          </li>
                        );
                      })
                    }
                  />
                  <Online>
                    <Media
                      query={{ maxWidth: smallScreen }}
                      render={() => (
                        <>
                          {user ? (
                            <MenuDropdown
                              suffixClass="__rightdown"
                              head={
                                <li className="main-menu__icon main-menu__user--active">
                                  <ReactSVG path={userImg} />
                                </li>
                              }
                              content={
                                <ul className="main-menu__dropdown">
                                  <li data-test="mobileMenuMyAccountLink">
                                    <Link to={appPaths.accountUrl}>
                                      <FormattedMessage
                                        {...commonMessages.myAccount}
                                      />
                                    </Link>
                                  </li>
                                  <li data-test="mobileMenuOrderHistoryLink">
                                    <Link to={appPaths.orderHistoryUrl}>
                                      <FormattedMessage
                                        {...commonMessages.orderHistory}
                                      />
                                    </Link>
                                  </li>
                                  <li data-test="mobileMenuAddressBookLink">
                                    <Link to={appPaths.addressBookUrl}>
                                      <FormattedMessage
                                        {...commonMessages.addressBook}
                                      />
                                    </Link>
                                  </li>
                                  <li
                                    onClick={handleSignOut}
                                    data-test="mobileMenuLogoutLink"
                                  >
                                    <FormattedMessage
                                      {...commonMessages.logOut}
                                    />
                                  </li>
                                </ul>
                              }
                            />
                          ) : (
                            <li
                              data-test="mobileMenuLoginLink"
                              className="main-menu__icon"
                              onClick={() =>
                                overlayContext.show(
                                  OverlayType.login,
                                  OverlayTheme.left
                                )
                              }
                            >
                              <ReactSVG path={userImg} />
                            </li>
                          )}
                        </>
                      )}
                    />
                  </Online>
                </ul>
              );
            }}
          </TypedMainMenuQuery>
        </div>

        <Media
          query={{ maxWidth: mediumScreen }}
          render={() => (
            <div className="main-menu__center">
              <Link to={appPaths.baseUrl}>
                <ReactSVG path={logoImg} />
              </Link>
            </div>
          )}
        />
        <Media
          query={{ minWidth: mediumScreen }}
          render={() => (
            <Autocomplete
              options={top100Films}
              getOptionLabel={option => option.title}
              style={{ width: 400, borderRadius: "40px" }}
              renderInput={params => (
                <TextField
                  {...params}
                  placeholder="Hvad er du på udkig efter?"
                  variant="outlined"
                  className="searchBox"
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position="start">
                        <ReactSVG path={NewSearchIcon} />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          )}
        />
        <div className="main-menu__right">
          <ul>
            <Media
              query={{ minWidth: mediumScreen }}
              render={() => (
                <>
                  <li>
                    <a href="#">Kataloger</a>
                  </li>
                  <li>
                    <a href="contact-us">Kontakt</a>
                  </li>
                </>
              )}
            />
            <Online>
              <Media
                query={{ minWidth: smallScreen }}
                render={() => (
                  <>
                    {user ? (
                      <MenuDropdown
                        head={
                          <li className="main-menu__icon main-menu__user--active">
                            <ReactSVG path={userImg} />
                          </li>
                        }
                        content={
                          <ul className="main-menu__dropdown">
                            <li data-test="desktopMenuMyAccountLink">
                              <Link to={appPaths.accountUrl}>
                                <FormattedMessage
                                  {...commonMessages.myAccount}
                                />
                              </Link>
                            </li>
                            <li data-test="desktopMenuOrderHistoryLink">
                              <Link to={appPaths.orderHistoryUrl}>
                                <FormattedMessage
                                  {...commonMessages.orderHistory}
                                />
                              </Link>
                            </li>
                            <li data-test="desktopMenuAddressBookLink">
                              <Link to={appPaths.addressBookUrl}>
                                <FormattedMessage
                                  {...commonMessages.addressBook}
                                />
                              </Link>
                            </li>
                            <li
                              onClick={handleSignOut}
                              data-test="desktopMenuLogoutLink"
                            >
                              <FormattedMessage {...commonMessages.logOut} />
                            </li>
                          </ul>
                        }
                      />
                    ) : (
                      <li
                        data-test="desktopMenuLoginOverlayLink"
                        className="main-menu__icon"
                        onClick={() =>
                          overlayContext.show(
                            OverlayType.login,
                            OverlayTheme.right
                          )
                        }
                      >
                        <ReactSVG path={userImg} />
                      </li>
                    )}
                  </>
                )}
              />
              <li
                data-test="menuCartOverlayLink"
                className="main-menu__icon main-menu__cart"
                onClick={() => {
                  overlayContext.show(OverlayType.cart, OverlayTheme.right);
                }}
              >
                <ReactSVG path={cartImg} />
                {cartItemsQuantity > 0 ? (
                  <span className="main-menu__cart__quantity">
                    {cartItemsQuantity}
                  </span>
                ) : null}
              </li>
            </Online>
            <Offline>
              <li className="main-menu__offline">
                <Media
                  query={{ minWidth: mediumScreen }}
                  render={() => (
                    <span>
                      <FormattedMessage defaultMessage="Offline" />
                    </span>
                  )}
                />
              </li>
            </Offline>
            <Media
              query={{ maxWidth: mediumScreen }}
              render={() => (
                <li
                  data-test="menuSearchOverlayLink"
                  className="main-menu__search"
                  onClick={() =>
                    overlayContext.show(OverlayType.search, OverlayTheme.right)
                  }
                >
                  <Media
                    query={{ minWidth: mediumScreen }}
                    render={() => (
                      <span>
                        <FormattedMessage {...commonMessages.search} />
                      </span>
                    )}
                  />
                  <ReactSVG path={searchImg} />
                </li>
              )}
            />
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default MainMenu;
