import React, { useContext, useEffect, useState } from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import Media from "react-media";
import { Link } from "react-router-dom";
import ReactSVG from "react-svg";
import { SearchProduct, SearchCategory } from "@temp/sitemap/fetchItems";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Loader } from "@components/atoms";
import classNames from "classnames";
import { mediumScreen } from "@styles/constants";
import { OverlayContext, OverlayTheme, OverlayType } from "..";
import * as appPaths from "../../app/routes";
import { maybe } from "../../core/utils";
import NavDropdown from "./NavDropdown";
import { TypedMainMenuQuery } from "./queries";
import hamburgerHoverImg from "../../images/hamburger-hover.svg";
import hamburgerImg from "../../images/hamburger.svg";
import logoImg from "../../images/logo.svg";
import searchImg from "../../images/search.svg";
import "./scss/index.scss";
import NothingFound from "../OverlayManager/Search/NothingFound";
import ProductItem from "../OverlayManager/Search/ProductItem";
import closeImg from "../../images/x.svg";

interface MainMenuProps {
  demoMode: boolean;
}
function getModalStyle() {
  return {
    top: `0%`,
    left: `35%`,
    borderRadius: `8px`,
    width: `43%`,
    border: `1px solid #000`,
    outline: "0",
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    maxHeight: "500px",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #F5A930",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 2, 1),
    outline: "0",
  },
  scrollSearch: {
    overflowY: "scroll",
    maxHeight: "400px",
  },
}));
const MainMenu: React.FC<MainMenuProps> = ({ demoMode }) => {
  const overlayContext = useContext(OverlayContext);
  const [searchResult, setSearchResult] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

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
    setSearchString("");
    setSearchResult([]);
  };

  const onSearch = e => {
    setSearchString(e);
    setTimeout(function () {
      if ((e && e.length < 1) || e === "") {
        return;
      }
      setIsLoading(true);
      const searchProductResultsQuery = `
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
      const searchCategory = `
      query {
        categories(filter: { search: "${e}" }, first: 50) {
          edges {
            node {
              id
              name,
              products {
                totalCount
              }
            }
          }
        }
      }
    `;

      const productResult = SearchProduct(searchProductResultsQuery);
      const categoryResult = SearchCategory(searchCategory);

      setIsLoading(false);
      setSearchResult([...categoryResult, ...productResult]);
      // setSearchResult(productResult)
    }, 1000);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <header
      className={classNames({
        "header-with-dropdown": !!activeDropdown,
      })}
    >
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
            <div
              className="main-menu__search"
              style={{ marginInlineEnd: "20px" }}
            >
              <ReactSVG path={searchImg} onClick={handleOpen} />
              <button
                style={{
                  marginLeft: "20px",
                  fontSize: "16px",
                  lineHeight: " 26px",
                  color: "#373737",
                }}
                type="button"
                onClick={handleOpen}
              >
                {searchString === ""
                  ? "Hvad er du på udkig efter?"
                  : searchString}
              </button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
              >
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
                  />
                  {isLoading && <Loader />}
                  <div className={classes.scrollSearch}>
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
                      searchString &&
                      !isLoading && <NothingFound search={searchString} />
                    )}
                  </div>
                </div>
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
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default MainMenu;
