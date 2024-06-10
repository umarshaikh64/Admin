import React from 'react'
import { useSelector } from 'react-redux';

const AddCategoryModal = ({
    handleAddCategory,
    modalClose,
    handleCategoryName,
    handleCategorySlug,
    categoryName,
    categorySlug,
    isEdit
}) => {
    const { isRequestLoading } = useSelector((state) => state.blog);
    return (
        <section>
            <input type="checkbox" id="uploadPopUp" className="modal-toggle" />
            <div className="modal modal-middle ">
                <div className="modal-box w-8/12 max-w-5xl bg-white ">
                    <div className="flex flex-col justify-center gap-6 px-4">
                        <div className="w-full flex justify-end">
                            <label
                                htmlFor="uploadPopUp"
                                className="cursor-pointer"
                                data-hs-overlay={modalClose || ""}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="35"
                                    height="35"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    className="rounded-full"
                                >
                                    <path
                                        d="M21.49 7.80863V7.81V16.19C21.49 17.9106 20.9791 19.2238 20.0964 20.1064C19.2138 20.9891 17.9006 21.5 16.18 21.5H7.81C6.08945 21.5 4.77634 20.9891 3.89377 20.1054C3.01114 19.2217 2.5 17.9059 2.5 16.18V7.81C2.5 6.08944 3.01093 4.77618 3.89355 3.89355C4.77618 3.01093 6.08944 2.5 7.81 2.5H16.19C17.9107 2.5 19.2237 3.01097 20.105 3.89333C20.9861 4.77559 21.4947 6.08838 21.49 7.80863ZM15.7136 15.7136C16.1988 15.2283 16.1988 14.4317 15.7136 13.9464L13.7671 12L15.7136 10.0536C16.1988 9.56829 16.1988 8.77171 15.7136 8.28645C15.2283 7.80118 14.4317 7.80118 13.9464 8.28645L12 10.2329L10.0536 8.28645C9.56829 7.80118 8.77171 7.80118 8.28645 8.28645C7.80118 8.77171 7.80118 9.56829 8.28645 10.0536L10.2329 12L8.28645 13.9464C7.80118 14.4317 7.80118 15.2283 8.28645 15.7136C8.53516 15.9623 8.85455 16.08 9.17 16.08C9.48545 16.08 9.80484 15.9623 10.0536 15.7136L12 13.7671L13.9464 15.7136C14.1952 15.9623 14.5145 16.08 14.83 16.08C15.1455 16.08 15.4648 15.9623 15.7136 15.7136Z"
                                        fill="#FF6B6B"
                                        stroke="#FF6B6B"
                                    />
                                </svg>
                            </label>
                        </div>
                        <div className="w-full flex flex-col gap-1 text-blackHigh">
                            <span className="text-base font-poppins font-bold text-blackMediumEmp">
                                Category Name
                            </span>
                            <input
                                type="text"
                                required
                                value={categoryName}
                                className="p-4 border border-neutralColorTwoHundread rounded-lg outline-none"
                                placeholder="Enter Category Name"
                                onChange={(e) => handleCategoryName(e.target.value)}
                            />
                        </div>
                        <div className="w-full flex flex-col gap-1 text-blackHigh">
                            <span className="text-base font-poppins font-bold text-blackMediumEmp">
                                Category Slug
                            </span>
                            <input
                                type="text"
                                required
                                value={categorySlug}
                                className="p-4 border border-neutralColorTwoHundread rounded-lg outline-none"
                                placeholder="Enter Category Name"
                                onChange={(e) => handleCategorySlug(e.target.value)}
                            />
                        </div>
                        <div className="flex justify-center py-5">
                            <label
                                onClick={() => {
                                    if (categoryName &&
                                        categorySlug) {
                                        handleAddCategory(isEdit);
                                    } else {
                                        toast.error("Please Add Name & Slug", {
                                            position: "top-right",
                                            autoClose: 1500,
                                            hideProgressBar: false,
                                            closeOnClick: true,
                                            pauseOnHover: true,
                                            draggable: true,
                                            progress: undefined,
                                            theme: "colored",
                                        });
                                    }
                                }}
                                htmlFor={`${"uploadPopUp"}`}
                                data-hs-overlay={modalClose || ""}
                                className=" text-center cursor-pointer w-[200px] bg-maincolor  py-[10px] px-4 rounded-full text-white font-semibold"
                            >
                                {isRequestLoading ? (
                                    <span className="loading loading-dots loading-sm"></span>
                                ) : (
                                    isEdit ? "Update Category" : "Add Category"
                                )}

                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AddCategoryModal