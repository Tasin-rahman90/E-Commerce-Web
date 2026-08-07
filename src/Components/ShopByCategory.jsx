import React, { useEffect, useState } from "react";
import Container from "./Container";
import BreadCrump from "./BreadCrump";
import Paginate from "./Paginate";
import Skeleton from "./Skeleton";

const ShopByCategory = () => {
    const [products, setProducts] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch("https://dummyjson.com/products")
            .then((res) => res.json())
            .then((data) => setProducts(data.products || []))
            .then(()=> setLoading(false))
    }, []);

    return (
        <div className="pt-20.25 pb-26">
            <Container>
                <BreadCrump />

                <div className="flex justify-between items-center pt-12.5 pb-6">
                    <h3 className="text-[20px] font-bold">Shop by Category</h3>

                    <div className="flex items-center gap-3">
                        <h3>Show :</h3>

                        <select
                            value={itemsPerPage}
                            onChange={(e) => setItemsPerPage(Number(e.target.value))}
                            className="border rounded-md py-1 px-5"
                        >
                            <option value={6}>6</option>
                            <option value={8}>8</option>
                            <option value={12}>12</option>
                        </select>
                    </div>
                </div>

                <div className="flex justify-between">
                    <div className="w-[20%]">
                        <ul className="space-y-4 cursor-pointer">
                            <li>Woman’s Fashion</li>
                            <li>Men’s Fashion</li>
                            <li>Electronics</li>
                            <li>Home & Lifestyle</li>
                            <li>Medicine</li>
                            <li>Sports & Outdoor</li>
                            <li>Baby’s & Toys</li>
                            <li>Groceries & Pets</li>
                            <li>Health & Beauty</li>
                        </ul>
                    </div>
                    <div className="w-[78%]">
                        {
                            loading ?
                                <>
                                    <div className="flex flex-wrap gap-x-7.5 gap-y-10">
                                        <Skeleton />
                                        <Skeleton />
                                        <Skeleton />
                                        <Skeleton />
                                        <Skeleton />
                                        <Skeleton />
                                    </div>
                                </>
                                :
                                <Paginate
                                    itemsPerPage={itemsPerPage}
                                    products={products}
                                />
                        }
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default ShopByCategory;