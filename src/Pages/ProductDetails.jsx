import React, { useEffect, useState } from "react";
import Container from "../Components/Container";
import BreadCrump from "../Components/BreadCrump";
import { Rate } from "antd";
import { FaMinus, FaPlus } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { TbTruckDelivery } from "react-icons/tb";
import { GiReturnArrow } from "react-icons/gi";
import { Link, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import CardSkeleton from "../Components/CardSkeleton";
import SecHead from "../Components/SecHead";
import Paginate from "../Components/Paginate";
import CheckoutModal from "../Components/CheckoutModal";
import { AddToWishlist, CartReducer, RemoveFromWishlist } from "../Slices/ProductSlice";
import { getDiscountedPrice } from "../Utils/price";

const ProductDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const wishlist = useSelector((state) => state.products.wishlist);
    const cartQuantity = useSelector((state) => Number(state.products.cart.find((item) => item.id === Number(id))?.quantity) || 0);

    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [selectedImage, setSelectedImage] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [postalCode, setPostalCode] = useState("");
    const [deliveryMessage, setDeliveryMessage] = useState("");
    const [checkoutOpen, setCheckoutOpen] = useState(false);
    const [productLoading, setProductLoading] = useState(true);
    const [productError, setProductError] = useState(false);
    const [productNotFound, setProductNotFound] = useState(false);
    const [productRetryKey, setProductRetryKey] = useState(0);
    const [relatedLoading, setRelatedLoading] = useState(false);
    const [relatedError, setRelatedError] = useState(false);
    const [relatedRetryKey, setRelatedRetryKey] = useState(0);

    const isWishlisted = product && wishlist.some((item) => item.id === product.id);

    useEffect(() => {
        const controller = new AbortController();
        setProduct(null);
        setProductLoading(true);
        setProductError(false);
        setProductNotFound(false);
        setQuantity(1);

        fetch(`https://dummyjson.com/products/${id}`, { signal: controller.signal })
            .then(async (response) => {
                const data = await response.json();
                if (response.status === 404) {
                    setProductNotFound(true);
                    return;
                }
                if (!response.ok) throw new Error("Product could not be loaded.");
                if (data.message || !data.id) {
                    setProductNotFound(true);
                    return;
                }
                setProduct(data);
                setSelectedImage(data.thumbnail || data.images?.[0] || "");
            })
            .catch((error) => {
                if (error.name !== "AbortError") setProductError(true);
            })
            .finally(() => {
                if (!controller.signal.aborted) setProductLoading(false);
            });
        return () => controller.abort();
    }, [id, productRetryKey]);

    useEffect(() => {
        if (!product?.category) return;
        const controller = new AbortController();
        setRelatedLoading(true);
        setRelatedError(false);

        fetch(`https://dummyjson.com/products/category/${encodeURIComponent(product.category)}`, { signal: controller.signal })
            .then((response) => {
                if (!response.ok) throw new Error("Related products could not be loaded.");
                return response.json();
            })
            .then((data) => {
                if (data.message || !Array.isArray(data.products)) throw new Error("Invalid related-products response.");
                setRelatedProducts(data.products.filter((item) => item.id !== product.id));
            })
            .catch((error) => {
                if (error.name !== "AbortError") setRelatedError(true);
            })
            .finally(() => {
                if (!controller.signal.aborted) setRelatedLoading(false);
            });
        return () => controller.abort();
    }, [product?.category, product?.id, relatedRetryKey]);

    const increaseQuantity = () => {
        setQuantity((prev) => Math.min(availableQuantity, prev + 1));
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity((prev) => prev - 1);
        }
    };

    const toggleWishlist = () => {
        if (isWishlisted) {
            dispatch(RemoveFromWishlist({ id: product.id }));
            toast.info("Product removed from your wishlist.");
        } else {
            dispatch(AddToWishlist(product));
            toast.success("Product added to your wishlist.");
        }
    };

    const checkDeliveryAvailability = (event) => {
        event.preventDefault();
        if (!/^\d{4}$/.test(postalCode.trim())) {
            setDeliveryMessage("Enter a valid 4-digit postal code.");
            return;
        }
        setDeliveryMessage("Postal code accepted. Delivery availability will be confirmed during checkout.");
    };

    const confirmDirectOrder = (customerDetails) => {
        setCheckoutOpen(false);
        toast.success(`Order confirmed for ${customerDetails.fullName}!`);
    };

    const addToCart = () => {
        if (!inStock || quantity > availableQuantity) return;
        dispatch(CartReducer({ product, quantity }));
        toast.success(`${quantity} ${product.title} added to your cart.`);
    };

    if (productLoading) {
        return <CardSkeleton />;
    }

    if (productNotFound) {
        return (
            <Container className="flex min-h-[50vh] flex-col items-center justify-center px-6 text-center">
                <h1 className="text-3xl font-semibold">Product not found</h1>
                <p className="mt-3 text-gray-500">This product may have been removed or the link is invalid.</p>
                <Link to="/" className="mt-6 rounded-sm bg-primary px-7 py-3 font-medium text-white">Back to Home</Link>
            </Container>
        );
    }

    if (productError || !product) {
        return (
            <div className="flex min-h-[50vh] flex-col items-center justify-center px-6 text-center">
                <h1 className="text-2xl font-semibold">Product could not be loaded</h1>
                <p className="mt-2 text-gray-500">Check your connection and try again.</p>
                <button type="button" onClick={() => setProductRetryKey((current) => current + 1)} className="mt-6 rounded-sm bg-primary px-6 py-3 font-medium text-white">
                    Try again
                </button>
            </div>
        );
    }

    const inStock = Number(product.stock) > 0;
    const availableQuantity = Math.max(Number(product.stock) - cartQuantity, 0);

    return (
        <>
            <div className="py-12 lg:pt-20 lg:pb-35">
                <Container>

                    <BreadCrump />

                    <div className="pt-10 sm:pt-12 lg:pt-20">
                        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
                            <div className="flex min-w-0 flex-col gap-4 sm:flex-row lg:w-1/2">
                                <div className="flex shrink-0 gap-3 overflow-x-auto pb-1 sm:flex-col sm:overflow-visible sm:pb-0">
                                {(product.images?.length ? product.images : [product.thumbnail]).slice(0, 4).map((img, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        onClick={() => setSelectedImage(img)}
                                        aria-label={`View ${product.title} image ${index + 1}`}
                                        aria-pressed={selectedImage === img}
                                        className={`h-28 w-36 shrink-0 rounded-sm bg-[#F5F5F5] px-6 py-3 transition duration-300 hover:scale-105 ${selectedImage === img ? "ring-2 ring-primary" : ""}`}
                                    >
                                        <img className="h-full w-full object-contain" src={img} alt="" />
                                    </button>
                                ))}
                                </div>

                                <div className="grid min-w-0 flex-1 place-items-center rounded-sm bg-[#F5F5F5] p-4 sm:p-8">
                                <img
                                    className="aspect-square w-full max-w-125 object-contain"
                                    src={selectedImage || product.thumbnail}
                                    alt={product.title}
                                />
                                </div>
                            </div>

                            <div className="w-full min-w-0 lg:flex-1">

                                <h2 className="text-[24px] font-semibold font-inter">
                                    {product.title}
                                </h2>

                                <div className="flex flex-wrap items-center gap-2.5 py-4">
                                    <Rate
                                        allowHalf
                                        value={product.rating}
                                        disabled
                                    />

                                    <h4 className="text-[#0000004f]">
                                        ({product.reviews?.length || 0} Reviews) |
                                    </h4>

                                    <h4 className={inStock ? "text-[#00FF66]" : "text-primary"}>
                                        {inStock ? "In Stock" : "Out of Stock"}
                                    </h4>
                                </div>

                                <div className="flex items-baseline gap-3 font-inter">
                                    <h3 className="text-[24px]">${getDiscountedPrice(product).toFixed(2)}</h3>
                                    {Number(product.discountPercentage) > 0 && (
                                        <p className="text-lg text-gray-500 line-through">${Number(product.price).toFixed(2)}</p>
                                    )}
                                </div>

                                <p className="pb-6 border-b border-[#0000004f] w-full my-6 leading-6">
                                    {product.description}
                                </p>

                                <div className="flex items-center gap-4">
                                    <div className="flex items-center border border-[#0000004f] rounded">
                                        <button type="button" onClick={decreaseQuantity} disabled={!inStock || quantity <= 1} aria-label="Decrease quantity" className="w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-primary hover:text-white transition duration-200 disabled:cursor-not-allowed disabled:opacity-40"><FaMinus className="text-sm" /></button>
                                        <span className="w-10 h-10 flex items-center justify-center border-x border-[#0000004f] font-medium">{quantity}</span>
                                        <button type="button" onClick={increaseQuantity} disabled={!inStock || quantity >= availableQuantity} aria-label="Increase quantity" className="w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-primary hover:text-white transition duration-200 disabled:cursor-not-allowed disabled:opacity-40"><FaPlus className="text-sm" /></button>
                                    </div>

                                    <div className="flex flex-wrap gap-3 items-center">
                                        <button type="button" disabled={!inStock} onClick={() => setCheckoutOpen(true)} className="bg-primary text-white px-6 py-2.5 rounded cursor-pointer font-medium transition-all duration-300 hover:opacity-90 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50">Buy Now</button>
                                        <button type="button" disabled={!inStock || availableQuantity === 0 || quantity > availableQuantity} onClick={addToCart} className="rounded border border-primary px-5 py-2.5 font-medium text-primary transition-colors hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:opacity-50">Add to Cart</button>
                                        <button type="button" onClick={toggleWishlist} aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"} title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"} className={`rounded-sm border border-[#00000054] p-1 text-4xl transition-all duration-300 hover:scale-110 hover:border-primary hover:bg-primary hover:text-white ${isWishlisted ? "text-primary" : ""}`}><CiHeart /></button>
                                    </div>
                                </div>

                                <div className="border border-[#0000004f] mt-6 rounded">

                                    <div className="flex items-center gap-4 p-4 border-b border-[#0000004f]">

                                        <span className="text-2xl">
                                            <TbTruckDelivery />
                                        </span>

                                        <div>
                                            <h4 className="font-medium">
                                                Free Delivery
                                            </h4>

                                            <form onSubmit={checkDeliveryAvailability} className="mt-2 flex flex-wrap gap-2">
                                                <input
                                                    type="text"
                                                    inputMode="numeric"
                                                    maxLength={4}
                                                    value={postalCode}
                                                    onChange={(event) => {
                                                        setPostalCode(event.target.value);
                                                        setDeliveryMessage("");
                                                    }}
                                                    placeholder="Enter 4-digit postal code"
                                                    aria-label="Postal code"
                                                    className="min-w-0 flex-1 border-b border-gray-400 py-1 text-sm outline-none focus:border-primary"
                                                />
                                                <button type="submit" className="text-sm font-medium underline hover:text-primary">
                                                    Check
                                                </button>
                                            </form>
                                            {deliveryMessage && (
                                                <p className="mt-2 text-xs text-gray-600" role="status" aria-live="polite">
                                                    {deliveryMessage}
                                                </p>
                                            )}
                                        </div>

                                    </div>

                                    <div className="flex items-center gap-4 p-4">

                                        <span className="text-2xl">
                                            <GiReturnArrow />
                                        </span>

                                        <div>
                                            <h4 className="font-medium">
                                                Return Delivery
                                            </h4>

                                            <p className="text-sm">
                                                Free 30 Days Delivery Returns.
                                            </p>
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>
                    </div>

                    <div className="pt-20 lg:pt-35">

                        <SecHead title="Related Items" />
                        {relatedLoading ? (
                            <p className="py-12 text-center text-gray-500" role="status">Loading related items...</p>
                        ) : relatedError ? (
                            <div className="flex flex-col items-center gap-3 py-12 text-center">
                                <p className="text-gray-600">Related items could not be loaded.</p>
                                <button type="button" onClick={() => setRelatedRetryKey((current) => current + 1)} className="rounded-sm bg-primary px-5 py-2 font-medium text-white">Try again</button>
                            </div>
                        ) : (
                            <Paginate itemsPerPage={6} products={relatedProducts} />
                        )}

                    </div>
                </Container>
            </div>
            {checkoutOpen && (
                <CheckoutModal
                    items={[{ ...product, quantity }]}
                    total={getDiscountedPrice(product) * quantity}
                    initialPostalCode={postalCode}
                    onClose={() => setCheckoutOpen(false)}
                    onSubmit={confirmDirectOrder}
                />
            )}
        </>
    );
};

export default ProductDetails;