import React, { useEffect, useRef, useState } from 'react'
import Container from './Container'
import Logo from '../assets/Logo.png'
import { IoMdHeartEmpty } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
import { CiSearch } from "react-icons/ci";
import { FiX } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import { NavLink, useLocation, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { searchProducts } from '../Utils/productSearch';
import { getCurrentAccount, subscribeToAccountChanges } from '../Utils/localAccount';

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const searchContainerRef = useRef(null)
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState([])
  const [suggestionsLoading, setSuggestionsLoading] = useState(false)
  const [suggestionsError, setSuggestionsError] = useState(false)
  const [popularCategories, setPopularCategories] = useState([])
  const [popularCategoriesLoading, setPopularCategoriesLoading] = useState(false)
  const [popularCategoriesError, setPopularCategoriesError] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [currentAccount, setCurrentAccount] = useState(getCurrentAccount)

  const data = useSelector(state=>state.products.cart)
  const wishlist = useSelector(state=>state.products.wishlist)

  useEffect(() => {
    if (location.pathname === "/search") {
      setQuery(new URLSearchParams(location.search).get("q") || "")
    } else {
      setQuery("")
    }
    setDropdownOpen(false)
  }, [location.pathname, location.search])

  useEffect(() => subscribeToAccountChanges(() => setCurrentAccount(getCurrentAccount())), [])

  useEffect(() => {
    const searchTerm = query.trim()
    if (searchTerm.length < 2) {
      setSuggestions([])
      setSuggestionsLoading(false)
      setSuggestionsError(false)
      return
    }

    const controller = new AbortController()
    setSuggestionsLoading(true)
    setSuggestionsError(false)
    const timer = setTimeout(() => {
      searchProducts(searchTerm, { limit: 5, signal: controller.signal })
        .then((products) => setSuggestions(products))
        .catch((error) => {
          if (error.name !== "AbortError") {
            setSuggestionsError(true)
            setSuggestions([])
          }
        })
        .finally(() => {
          if (!controller.signal.aborted) setSuggestionsLoading(false)
        })
    }, 250)

    return () => {
      clearTimeout(timer)
      controller.abort()
    }
  }, [query])

  useEffect(() => {
    const closeOnOutsideClick = (event) => {
      if (!searchContainerRef.current?.contains(event.target)) setDropdownOpen(false)
    }
    document.addEventListener("mousedown", closeOnOutsideClick)
    return () => document.removeEventListener("mousedown", closeOnOutsideClick)
  }, [])

  const submitSearch = (event) => {
    event.preventDefault()
    const searchTerm = query.trim()
    if (!searchTerm) return
    setDropdownOpen(false)
    navigate(`/search?q=${encodeURIComponent(searchTerm)}`)
  }

  const loadPopularCategories = () => {
    if (popularCategories.length > 0 || popularCategoriesLoading) return

    setPopularCategoriesLoading(true)
    setPopularCategoriesError(false)
    fetch("https://dummyjson.com/products/categories")
      .then((response) => {
        if (!response.ok) throw new Error("Could not load categories.")
        return response.json()
      })
      .then((categories) => setPopularCategories(categories.slice(0, 8)))
      .catch(() => setPopularCategoriesError(true))
      .finally(() => setPopularCategoriesLoading(false))
  }

  const handleSearchKeyDown = (event) => {
    if (event.key === "Escape") setDropdownOpen(false)
    if (event.key === "ArrowDown" && (suggestions.length > 0 || popularCategories.length > 0)) {
      event.preventDefault()
      searchContainerRef.current?.querySelector("[data-search-suggestion]")?.focus()
    }
  }

  const openProduct = (product) => {
    setDropdownOpen(false)
    navigate(`/productDetails/${product.id}`)
  }
 
  return (
    <>
      <div className='border-b-2'>


        <Container className="px-4 py-6 md:py-8 ">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">


            <div>
              <img src={Logo} alt="Logo" />
            </div>


            <ul className="flex flex-wrap justify-center gap-4 md:gap-8 lg:gap-12">
              <li className="cursor-pointer border-b-2 border-transparent hover:border-black duration-200">
                <NavLink to="/" end>Home</NavLink>
              </li>

              <li className="cursor-pointer border-b-2 border-transparent hover:border-black duration-200">
                <NavLink to="/contact" className={({ isActive }) => isActive ? "border-b border-black" : ""}>Contact</NavLink>
              </li>

              <li className="cursor-pointer border-b-2 border-transparent hover:border-black duration-200">
                <NavLink to="/about" className={({ isActive }) => isActive ? "border-b border-black" : ""}>About</NavLink>
              </li>

              <li className="cursor-pointer border-b-2 border-transparent hover:border-black duration-200">
                <NavLink to="/signup" className={({ isActive }) => isActive ? "border-b border-black" : ""}>Sign Up</NavLink>
              </li>

            </ul>


            <div className="flex items-center gap-3 md:gap-6 w-full lg:w-auto justify-center">

              <form
                ref={searchContainerRef}
                onSubmit={submitSearch}
                className="relative w-full sm:w-72 md:w-80 lg:w-auto"
                role="search"
              >
                <div className="relative">
                  <input
                    type="search"
                    value={query}
                    onChange={(event) => {
                      setQuery(event.target.value)
                      setDropdownOpen(true)
                    }}
                    onFocus={() => {
                      setDropdownOpen(true)
                      if (!query.trim()) loadPopularCategories()
                    }}
                    onKeyDown={handleSearchKeyDown}
                    placeholder="What are you looking for?"
                    aria-label="Search products"
                    aria-autocomplete="list"
                    aria-expanded={dropdownOpen && query.trim().length >= 2}
                    className="w-full rounded-md bg-[#F5F5F5] py-2.5 pl-4 pr-20 outline-none focus:ring-1 focus:ring-gray-400"
                  />
                  {query && (
                    <button
                      type="button"
                      aria-label="Clear search"
                      onClick={() => {
                        setQuery("")
                        setDropdownOpen(false)
                      }}
                      className="absolute right-10 top-1/2 -translate-y-1/2 p-1 text-gray-600 hover:text-black"
                    >
                      <FiX />
                    </button>
                  )}
                  <button
                    type="submit"
                    aria-label="Search products"
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-xl text-gray-700 hover:text-primary"
                  >
                    <CiSearch />
                  </button>
                </div>

                {dropdownOpen && (query.trim().length >= 2 || !query.trim()) && (
                  <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-sm border border-gray-200 bg-white shadow-lg">
                    {!query.trim() ? (
                      <div className="p-3">
                        <p className="px-1 pb-2 text-xs font-semibold uppercase text-gray-500">Popular categories</p>
                        {popularCategoriesLoading ? (
                          <div className="space-y-3 p-1" role="status" aria-label="Loading categories">
                            {Array.from({ length: 4 }, (_, index) => (
                              <div key={index} className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
                            ))}
                          </div>
                        ) : popularCategoriesError ? (
                          <button
                            type="button"
                            onClick={loadPopularCategories}
                            className="p-1 text-left text-sm text-primary"
                          >
                            Categories unavailable. Try again.
                          </button>
                        ) : (
                          <ul>
                            {popularCategories.map((category) => (
                              <li key={category.slug}>
                                <button
                                  type="button"
                                  data-search-suggestion
                                  onClick={() => {
                                    setDropdownOpen(false)
                                    navigate(`/ShopByCategory?category=${encodeURIComponent(category.slug)}`)
                                  }}
                                  className="w-full rounded-sm px-2 py-2 text-left text-sm transition-colors hover:bg-gray-50 focus:bg-gray-50"
                                >
                                  {category.name}
                                </button>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ) : suggestionsLoading ? (
                      <p className="px-4 py-4 text-sm text-gray-500" role="status">Searching products...</p>
                    ) : suggestionsError ? (
                      <p className="px-4 py-4 text-sm text-gray-500" role="status">Suggestions are unavailable. Press Enter to try the full search.</p>
                    ) : suggestions.length > 0 ? (
                      <>
                        <ul aria-label="Product suggestions">
                          {suggestions.map((product) => (
                            <li key={product.id}>
                              <button
                                type="button"
                                data-search-suggestion
                                onClick={() => openProduct(product)}
                                className="flex w-full items-center gap-3 px-3 py-2 text-left transition-colors hover:bg-gray-50 focus:bg-gray-50"
                              >
                                <img src={product.thumbnail} alt="" className="h-11 w-11 rounded-sm bg-gray-100 object-contain" />
                                <span className="min-w-0 flex-1 truncate text-sm font-medium">{product.title}</span>
                                <span className="shrink-0 text-sm text-gray-500">${Number(product.price).toFixed(2)}</span>
                              </button>
                            </li>
                          ))}
                        </ul>
                        <button
                          type="submit"
                          className="w-full border-t border-gray-200 px-4 py-3 text-left text-sm font-medium hover:bg-gray-50"
                        >
                          See all results for “{query.trim()}”
                        </button>
                      </>
                    ) : (
                      <p className="px-4 py-4 text-sm text-gray-500" role="status">No matching products found.</p>
                    )}
                  </div>
                )}
              </form>

              <div className="flex gap-3 md:gap-4">
                <NavLink
                  to={currentAccount ? "/account" : "/login"}
                  aria-label={currentAccount ? "My account" : "Log in to your account"}
                  title={currentAccount ? "My account" : "Log in"}
                  className={({ isActive }) => `flex h-8 w-8 items-center justify-center rounded-full ${isActive ? "bg-primary text-white" : "text-black hover:bg-gray-100"}`}
                >
                  <FiUser className="h-5 w-5" />
                </NavLink>
                <NavLink to="/wishlist" aria-label="Open wishlist" className="relative">
                  <IoMdHeartEmpty className="w-7 h-7 md:w-8 md:h-8 cursor-pointer" />
                  {wishlist.length > 0 && (
                    <span className="absolute -top-2 -right-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-xs font-medium text-white">
                      {wishlist.length}
                    </span>
                  )}
                </NavLink>

                <div onClick={()=> navigate("/cartPage")} className="relative cursor-pointer">
                  <FiShoppingCart className="w-7 h-7 md:w-8 md:h-8" />

                  <span className="absolute -top-2 -right-2 flex items-center justify-center min-w-5 h-5 px-1 bg-primary text-white text-xs font-medium rounded-full">
                    {data.length}
                  </span>
                </div>
              </div>

            </div>

          </div>
        </Container>
      </div>
    </>
  )
}

export default Navbar