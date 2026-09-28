import React, { useEffect, useState } from "react";
import Container from "../Components/Container";
import BreadCrump from "../Components/BreadCrump";
import { Rate } from "antd";
import { FaMinus, FaPlus } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { TbTruckDelivery } from "react-icons/tb";
import { GiReturnArrow } from "react-icons/gi";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import CardSkeleton from "../Components/CardSkeleton";
import SecHead from "../Components/SecHead";
import Paginate from "../Components/Paginate";
import CheckoutModal from "../Components/CheckoutModal";
import { AddToWishlist, RemoveFromWishlist } from "../Slices/ProductSlice";

const ProductDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const wishlist = useSelector((state) => state.products.wishlist);

    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);

    const [selectedColor, setSelectedColor] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [postalCode, setPostalCode] = useState("");
    const [deliveryMessage, setDeliveryMessage] = useState("");
    const [checkoutOpen, setCheckoutOpen] = useState(false);
    const itemsPerPage = 4;

    const sizes = ["XS", "S", "M", "L", "XL"];

    const isWishlisted = product && wishlist.some((item) => item.id === product.id);

    useEffect(() => {
        setProduct(null);

        fetch(`https://dummyjson.com/products/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setProduct(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    useEffect(() => {
        fetch("https://dummyjson.com/products?limit=20")
            .then((res) => res.json())
            .then((data) => {
                setRelatedProducts(data.products);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const increaseQuantity = () => {
        setQuantity((prev) => prev + 1);
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

    if (!product) {
        return <CardSkeleton />;
    }

    return (
        <>
            <div className="pt-20 pb-35">
                <Container>

                    <BreadCrump />

                    <div className="pt-20">
                        <div className="flex gap-7.5">

                            <div className="space-y-12.5">
                                {product.images?.slice(0, 4).map((img, index) => (
                                    <img
                                        key={index}
                                        className="w-36 h-28 object-contain py-3 px-6.25 bg-[#F5F5F5] rounded-sm cursor-pointer hover:scale-105 transition duration-300"
                                        src={img}
                                        alt={product.title}
                                    />
                                ))}
                            </div>

                            <div>
                                <img
                                    className="w-125 object-contain px-6.75 pt-20 pb-16 bg-[#F5F5F5] rounded-sm h-150"
                                    src={product.thumbnail}
                                    alt={product.title}
                                />
                            </div>

                            <div className="w-100">

                                <h2 className="text-[24px] font-semibold font-inter">
                                    {product.title}
                                </h2>

                                <div className="flex items-center gap-2.5 py-4">
                                    <Rate
                                        allowHalf
                                        value={product.rating}
                                        disabled
                                    />

                                    <h4 className="text-[#0000004f]">
                                        ({product.reviews?.length || 0} Reviews) |
                                    </h4>

                                    <h4 className="text-[#00FF66]">
                                        {product.stock > 0
                                            ? "In Stock"
                                            : "Out of Stock"}
                                    </h4>
                                </div>

                                <h3 className="text-[24px] font-inter">
                                    ${product.price}
                                </h3>

                                <p className="pb-6 border-b border-[#0000004f] w-full my-6 leading-6">
                                    {product.description}
                                </p>

                                <div className="flex items-center gap-6 mb-5">
                                    <h3 className="font-medium">Color:</h3>
                                    <label className="cursor-pointer">
                                        <input type="radio" name="color" value="red" checked={selectedColor === "red"} onChange={(e) => setSelectedColor(e.target.value)} className="hidden" />
                                        <span className={`block w-6 h-6 rounded-full bg-red-400 border-2 cursor-pointer transition-all duration-200 ${selectedColor === "red" ? "border-black scale-110" : "border-transparent"}`}></span>
                                    </label>
                                    <label className="cursor-pointer">
                                        <input type="radio" name="color" value="blue" checked={selectedColor === "blue"} onChange={(e) => setSelectedColor(e.target.value)} className="hidden" />
                                        <span className={`block w-6 h-6 rounded-full bg-[#87CEEB] border-2 cursor-pointer transition-all duration-200 ${selectedColor === "blue" ? "border-black scale-110" : "border-transparent"}`}></span>
                                    </label>
                                </div>

                                <div className="flex items-center gap-5 mb-6">
                                    <h4 className="font-medium">Size:</h4>
                                    <div className="flex gap-2">
                                        {sizes.map((size) => (
                                            <button key={size} onClick={() => setSelectedSize(size)} className={`w-8 h-8 border rounded font-medium uppercase cursor-pointer transition-all duration-200 ${selectedSize === size ? "bg-primary text-white border-primary" : "border-[#0000004f] hover:bg-primary hover:text-white"}`}>
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="flex items-center border border-[#0000004f] rounded">
                                        <button onClick={decreaseQuantity} className="w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-primary hover:text-white transition duration-200"><FaMinus className="text-sm" /></button>
                                        <span className="w-10 h-10 flex items-center justify-center border-x border-[#0000004f] font-medium">{quantity}</span>
                                        <button onClick={increaseQuantity} className="w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-primary hover:text-white transition duration-200"><FaPlus className="text-sm" /></button>
                                    </div>

                                    <div className="flex gap-4.75 items-center">
                                        <button type="button" onClick={() => setCheckoutOpen(true)} className="bg-primary text-white px-8 py-2.5 rounded cursor-pointer font-medium transition-all duration-300 hover:opacity-90 hover:scale-105">Buy Now</button>
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

                    <div className="pt-35">

                        <SecHead title="Related Item" />

                        <Paginate
                            itemsPerPage={6}
                            products={relatedProducts}
                        />

                    </div>
                </Container>
            </div>
            {checkoutOpen && (
                <CheckoutModal
                    items={[{ ...product, quantity }]}
                    total={Number(product.price) * quantity}
                    initialPostalCode={postalCode}
                    onClose={() => setCheckoutOpen(false)}
                    onSubmit={confirmDirectOrder}
                />
            )}
        </>
    );
};

export default ProductDetails;