import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import Card from "./Card";

const Paginate = ({ itemsPerPage, products, }) => {
    const [itemOffset, setItemOffset] = useState(0);

    const endOffset = itemOffset + itemsPerPage;
    const currentItems = products.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(products.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % products.length;
        setItemOffset(newOffset);
    };

    return (
        <>
            <div className="flex flex-wrap justify-between gap-y-8">
                {currentItems.map((item) => (
                    <div key={item.id} className="w-[32%]">
                        <Card
                            id={item.id}
                            productDeatils={item}
                            parcent={item.discountPercentage}
                            modle={item.title}
                            discountPrice={(
                                item.price -
                                (item.price * item.discountPercentage) / 100
                            ).toFixed(2)}
                            regularPrice={item.price}
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
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                renderOnZeroPageCount={null}
                className="flex gap-4 cursor-pointer mt-10"
                pageClassName=" py-0.5 px-6.25 bg-black text-white"
            />

       
        </>
    );
};

export default Paginate;