import React, { useContext, useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { commonMessages } from "@temp/intl";
import { useAuth, useCart } from "@saleor/sdk";
import InputAdornment from "@material-ui/core/InputAdornment";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Media from "react-media";
import { Link } from "react-router-dom";
import ReactSVG from "react-svg";

import { DemoBanner, Loader, Button } from "@components/atoms";
import classNames from "classnames";
import TextField from "@material-ui/core/TextField";
import {
  MenuDropdown,
  Offline,
  Online,
  OverlayContext,
  OverlayTheme,
  OverlayType,
  OfflinePlaceholder,
  NetworkStatus,
  Overlay,
  OverlayContextInterface,
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
import { DebouncedTextField } from "../Debounce";
import {
  mediumScreen,
  smallScreen,
} from "../../globalStyles/scss/variables.scss";
import "./scss/index.scss";
import { SearchProduct } from "@temp/sitemap/fetchItems";
import NothingFound from "../OverlayManager/Search/NothingFound";
import ProductItem from "../OverlayManager/Search/ProductItem";
import { SearchResults } from "../OverlayManager/Search/gqlTypes/SearchResults";
import closeImg from "../../images/x.svg";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { xxLargeScreen, largeScreen, xLargeScreen } from "@styles/constants";

interface MainMenuProps {
  demoMode: boolean;
}
function getModalStyle() {
  return {
    top: `0%`,
    left: `32%`,
    borderRadius: `8px`,
    minWidth: window.innerWidth > 1600 ? `43%` : `38%`,
    maxWidth: window.innerWidth > 1600 ? `43%` : `38%`,
    border: `1px solid #000`,
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    maxHeight: 500,
    overflow: "scroll",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 2, 1),
  },
}));
const MainMenu: React.FC<MainMenuProps> = ({ demoMode }) => {
  const overlayContext = useContext(OverlayContext);
  const { user, signOut } = useAuth();
  const { items } = useCart();
  const [searchResult, setSearchResult] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

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

  const clearInput = () => {
    // alert("clearInput")
    setSearchString("");
    setSearchResult([]);
  };
  const onSearch = async e => {
    console.log("searchProduct -> e", e);
    setSearchString(e);
    if (e && e.length < 1) {
      return;
    }
    setIsLoading(true);
    const searchResultsQuery = `
      query {
        products(filter: { search: "${e}" }, first: 20) {
          edges {
            node {
              id
              name
              thumbnail {
                url
                alt
              }
              thumbnail2x: thumbnail(size: 510) {
                url
              }
              category {
                id
                name
              }
            }
          }
          pageInfo {
            endCursor
            hasNextPage
            hasPreviousPage
            startCursor
          }
        }
      }
    `;
    const result = await SearchProduct(searchResultsQuery);
    setIsLoading(false);
    setSearchResult(result);
    console.log("result", result);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    console.log("handleClose");
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <TextField
        fullWidth
        variant="outlined"
        className="searchInput"
        onChange={evt => onSearch(evt.target.value)}
        value={searchString}
        autoFocus
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <ReactSVG
                path={closeImg}
                onClick={() => clearInput()}
                className="search__input__close-btn"
              />
            </InputAdornment>
          ),
        }}
      // onBlur={this.handleInputBlur}
      />
      {searchResult.length > 0 ? (
        <ul>
          {searchResult.map(product => (
            <ProductItem
              {...product}
              onClose={handleClose}
              key={product.node.id}
            />
          ))}
        </ul>
      ) : (
          <NothingFound search={searchString} />
        )}
      {isLoading ? <Loader /> : null}
    </div>
  );

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
                        const hasSubNavigation = !!item ?.children ?.length;
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
          query={{ minWidth: xxLargeScreen }}
          render={() => (
            <div className="main-menu__search">
              <ReactSVG path={searchImg} />
              <button
                style={{
                  marginLeft: "30px",
                  fontSize: '16px',
                  lineHeight: ' 26px',
                  color: '#373737',
                }}
                type="button"
                onClick={handleOpen}
              >
                {searchString === "" ? "Hvad er du på udkig efter?" : searchString}
              </button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
              >
                {body}
              </Modal>
            </div>
          )}
        />
        <Media
          query={{ minWidth: largeScreen, maxWidth: xLargeScreen }}
          render={() => (
            <div className="main-menu__search">
              <ReactSVG path={searchImg} />
              <button style={{
                marginLeft: "30px",
                fontSize: '16px',
                lineHeight: ' 26px',
                color: '#373737',
              }}
                type="button"
                onClick={handleOpen}
              >
                {searchString === "" ? "Hvad er du på udkig efter?" : searchString}
              </button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
              >
                {body}
              </Modal>
            </div>
          )}
        />

        <div style={{ flex: 1 }} className="main-menu__right">
          <ul>
            <Media
              query={{ minWidth: mediumScreen }}
              render={() => (
                <>
                  <li>
                    <a href="/">Kataloger</a>
                  </li>
                  <li>
                    <a href="/">Kontakt</a>
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
