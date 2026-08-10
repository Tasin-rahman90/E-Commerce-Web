import React from "react";
import Container from "./Container";

const CardSkeleton = () => {
    return (
        <div className="pt-20 pb-35">
            <Container>

                {/* Breadcrumb Skeleton */}
                <div className="flex items-center gap-4 mb-20">
                    <div className="w-12 h-4 bg-gray-200 rounded animate-pulse"></div>

                    <div className="w-2 h-4 bg-gray-200 rounded animate-pulse"></div>

                    <div className="w-28 h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>


                <div className="flex gap-7.5">

                    {/* LEFT THUMBNAILS */}
                    <div className="space-y-12.5">

                        <div className="w-36 h-28 bg-gray-200 rounded-sm animate-pulse"></div>

                        <div className="w-36 h-28 bg-gray-200 rounded-sm animate-pulse"></div>

                        <div className="w-36 h-28 bg-gray-200 rounded-sm animate-pulse"></div>

                        <div className="w-36 h-28 bg-gray-200 rounded-sm animate-pulse"></div>

                    </div>


                    {/* MAIN IMAGE */}
                    <div className="w-125 h-150 bg-gray-200 rounded-sm animate-pulse">
                    </div>


                    {/* PRODUCT DETAILS */}
                    <div className="w-100">

                        {/* Product Title */}
                        <div className="w-64 h-7 bg-gray-200 rounded animate-pulse mb-6">
                        </div>


                        {/* Rating */}
                        <div className="flex items-center gap-3 mb-5">

                            <div className="w-28 h-5 bg-gray-200 rounded animate-pulse">
                            </div>

                            <div className="w-24 h-4 bg-gray-200 rounded animate-pulse">
                            </div>

                            <div className="w-16 h-4 bg-gray-200 rounded animate-pulse">
                            </div>

                        </div>


                        {/* Price */}
                        <div className="w-20 h-7 bg-gray-200 rounded animate-pulse mb-6">
                        </div>


                        {/* Description */}
                        <div className="border-b border-gray-300 pb-6 mb-6 space-y-3">

                            <div className="w-full h-4 bg-gray-200 rounded animate-pulse">
                            </div>

                            <div className="w-full h-4 bg-gray-200 rounded animate-pulse">
                            </div>

                            <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse">
                            </div>

                        </div>


                        {/* COLOR */}
                        <div className="flex items-center gap-5 mb-6">

                            <div className="w-12 h-5 bg-gray-200 rounded animate-pulse">
                            </div>

                            <div className="w-6 h-6 rounded-full bg-gray-200 animate-pulse">
                            </div>

                            <div className="w-6 h-6 rounded-full bg-gray-200 animate-pulse">
                            </div>

                        </div>


                        {/* SIZE */}
                        <div className="flex items-center gap-5 mb-6">

                            <div className="w-10 h-5 bg-gray-200 rounded animate-pulse">
                            </div>

                            <div className="flex gap-2">

                                <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>

                                <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>

                                <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>

                                <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>

                                <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>

                            </div>

                        </div>


                        {/* QUANTITY + BUY */}
                        <div className="flex items-center gap-4 mb-6">

                            {/* Quantity */}
                            <div className="w-30 h-10 bg-gray-200 rounded animate-pulse">
                            </div>

                            {/* Buy Button */}
                            <div className="w-32 h-10 bg-gray-200 rounded animate-pulse">
                            </div>

                            {/* Heart */}
                            <div className="w-10 h-10 bg-gray-200 rounded animate-pulse">
                            </div>

                        </div>


                        {/* DELIVERY BOX */}
                        <div className="border border-gray-200 rounded">

                            {/* Free Delivery */}
                            <div className="flex items-center gap-4 p-4 border-b border-gray-200">

                                <div className="w-7 h-7 bg-gray-200 rounded animate-pulse">
                                </div>

                                <div className="flex-1 space-y-2">

                                    <div className="w-32 h-5 bg-gray-200 rounded animate-pulse">
                                    </div>

                                    <div className="w-64 h-4 bg-gray-200 rounded animate-pulse">
                                    </div>

                                </div>

                            </div>


                            {/* Return Delivery */}
                            <div className="flex items-center gap-4 p-4">

                                <div className="w-7 h-7 bg-gray-200 rounded animate-pulse">
                                </div>

                                <div className="space-y-2">

                                    <div className="w-32 h-5 bg-gray-200 rounded animate-pulse">
                                    </div>

                                    <div className="w-44 h-4 bg-gray-200 rounded animate-pulse">
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </Container>
        </div>
    );
};

export default CardSkeleton;