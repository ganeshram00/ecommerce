import React from 'react';
import ReactStars from 'react-rating-stars-component';

const ReviewCard = ({ reviews }) => {
    const starOptions = {
        edit: false,
        color: 'rgba(20,20,20,0.1)',
        activeColor: 'tomato',
        size: 25,
        isHalf: true,
        value: reviews.rating
    };

    return (
        <div className="flex flex-col justify-between items-center rounded-md border border-neutral-500 p-8 shadow-sm mt-24 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
            <div className="h-10 w-10 rounded-full overflow-hidden shadow-sm outline-neutral-800">
                <img
                    alt={`${reviews.name}'s profile`}
                    src="/images/Profile.png"
                    width={50}
                    height={50}
                    loading="lazy"
                    className="inline-block"
                />
            </div>
            <div className="mt-6 flex items-center gap-6">
                <div>
                    <p className="leading-relaxed tracking-wide text-gray-600 capitalize">
                        {reviews.name}
                    </p>
                </div>
            </div>
            {/* Stars */}
            <div className="text-violet-500 flex gap-2">
                <ReactStars {...starOptions} />
            </div>
            {/* Comment Text */}
            <p className="my-4 mb-0 text-base font-normal leading-relaxed tracking-wide text-gray-400 max-w-full capitalize">
                {reviews.comment}
            </p>
        </div>
    );
};

export default ReviewCard;
