import React, { useEffect, useState } from "react";
import Container from "../Components/Container";
import BreadCrump from "../Components/BreadCrump";
import { Rate } from "antd";
import { FaMinus, FaPlus } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { TbTruckDelivery } from "react-icons/tb";
import { GiReturnArrow } from "react-icons/gi";
import { useParams } from "react-router";
import CardSkeleton from "../Components/CardSkeleton";
import SecHead from "../Components/SecHead";
import Paginate from "../Components/Paginate";

const ProductDetails = () => {
    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);

    const [selectedColor, setSelectedColor] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [quantity, setQuantity] = useState(1);

    const itemsPerPage = 4;

    const sizes = ["XS", "S", "M", "L", "XL"];

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

                                    <h3 className="font-medium">
                                        Color:
                                    </h3>

                                    <label className="cursor-pointer">
                                        <input
                                            type="radio"
                                            name="color"
                                            value="red"
                                            checked={selectedColor === "red"}
                                            onChange={(e) =>
                                                setSelectedColor(e.target.value)
                                            }
                                            className="hidden"
                                        />

                                        <span
                                            className={`
                                                block w-6 h-6 rounded-full bg-red-400
                                                border-2 cursor-pointer transition-all duration-200
                                                ${
                                                    selectedColor === "red"
                                                        ? "border-black scale-110"
                                                        : "border-transparent"
                                                }
                                            `}
                                        ></span>
                                    </label>

                                    <label className="cursor-pointer">
                                        <input
                                            type="radio"
                                            name="color"
                                            value="blue"
                                            checked={selectedColor === "blue"}
                                            onChange={(e) =>
                                                setSelectedColor(e.target.value)
                                            }
                                            className="hidden"
                                        />

                                        <span
                                            className={`
                                                block w-6 h-6 rounded-full bg-[#87CEEB]
                                                border-2 cursor-pointer transition-all duration-200
                                                ${
                                                    selectedColor === "blue"
                                                        ? "border-black scale-110"
                                                        : "border-transparent"
                                                }
                                            `}
                                        ></span>
                                    </label>

                                </div>

                                <div className="flex items-center gap-5 mb-6">

                                    <h4 className="font-medium">
                                        Size:
                                    </h4>

                                    <div className="flex gap-2">
                                        {sizes.map((size) => (
                                            <button
                                                key={size}
                                                onClick={() =>
                                                    setSelectedSize(size)
                                                }
                                                className={`
                                                    w-8 h-8 border rounded
                                                    font-medium uppercase cursor-pointer
                                                    transition-all duration-200
                                                    ${
                                                        selectedSize === size
                                                            ? "bg-primary text-white border-primary"
                                                            : "border-[#0000004f] hover:bg-primary hover:text-white"
                                                    }
                                                `}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>

                                </div>

                                <div className="flex items-center gap-4">

                                    <div className="flex items-center border border-[#0000004f] rounded">

                                        <button
                                            onClick={decreaseQuantity}
                                            className="w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-primary hover:text-white transition duration-200"
                                        >
                                            <FaMinus className="text-sm" />
                                        </button>

                                        <span className="w-10 h-10 flex items-center justify-center border-x border-[#0000004f] font-medium">
                                            {quantity}
                                        </span>

                                        <button
                                            onClick={increaseQuantity}
                                            className="w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-primary hover:text-white transition duration-200"
                                        >
                                            <FaPlus className="text-sm" />
                                        </button>

                                    </div>

                                    <div className="flex gap-4.75 items-center">

                                        <button className="bg-primary text-white px-8 py-2.5 rounded cursor-pointer font-medium transition-all duration-300 hover:opacity-90 hover:scale-105">
                                            Buy Now
                                        </button>

                                        <CiHeart
                                            className="
                                                p-1 text-4xl border
                                                border-[#00000054] rounded-sm
                                                cursor-pointer transition-all duration-300
                                                hover:bg-primary hover:text-white
                                                hover:border-primary hover:scale-110
                                            "
                                        />

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

                                            <p className="text-sm underline">
                                                Enter your postal code for Delivery Availability
                                            </p>
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
                    <div>
                        <h2 className="bg-amber-500 text-5xl">HEllo </h2>
                    </div>
                </Container>
            </div>
        </>
    );
};

export default ProductDetails;