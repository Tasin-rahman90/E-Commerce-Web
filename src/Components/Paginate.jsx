import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Card from "./Card";
import { getDiscountedPrice } from "../Utils/price";

const Paginate = ({ itemsPerPage, products, }) => {
    const [itemOffset, setItemOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        setItemOffset(0);
        setCurrentPage(0);
    }, [products, itemsPerPage]);

    const endOffset = itemOffset + itemsPerPage;
    const currentItems = products.slice(itemOffset, endOffset);
    const pageCount = products.length > 0 ? Math.ceil(products.length / itemsPerPage) : 0;

    const handlePageClick = (event) => {
        if (products.length === 0) return;
        const newOffset = (event.selected * itemsPerPage) % products.length;
        setItemOffset(newOffset);
        setCurrentPage(event.selected);
    };

    if (products.length === 0) {
        return <p className="py-12 text-center text-gray-500">No products found.</p>;
    }

    return (
        <>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {currentItems.map((item) => (
                    <div key={item.id} className="min-w-0">
                        <Card
                            id={item.id}
                            productDetails={item}
                            percent={item.discountPercentage}
                            title={item.title}
                            discountPrice={getDiscountedPrice(item)}
                            rate={item.rating}
                            itemImg={item.thumbnail}
                        />
                    </div>
                ))}
            </div>

            <ReactPaginate
                previousLabel=""
                nextLabel=""
                breakLabel="..."
                pageCount={pageCount}
                forcePage={Math.min(currentPage, Math.max(pageCount - 1, 0))}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                renderOnZeroPageCount={null}
                className="mt-10 flex flex-wrap gap-2 cursor-pointer sm:gap-4"
                pageClassName=" py-0.5 px-6.25 bg-black text-white"
            />

       
        </>
    );
};

export default Paginate;