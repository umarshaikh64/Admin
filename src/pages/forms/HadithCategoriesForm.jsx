import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BackToPrev from "../../components/shared/back/BackToPrev";
import { postHadithCategory } from "../../features/hadithCategories/hadithCategoriesSlice";
import { errorNotify, infoNotify } from "../../util/getNotify";

function HadithCategoriesForm() {
  const { isRequestLoading } = useSelector((state) => state.hadithCategories);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const categoryEnglish = form.categoryEnglish.value;
    const categoryArabic = form.categoryArabic.value;
    const categoryTurkish = form.categoryTurkish.value;
    const categoryUrdu = form.categoryUrdu.value;
    const isComplete =
      categoryEnglish && categoryArabic && categoryTurkish && categoryUrdu;

    if (!isComplete) {
      errorNotify("Incomplete Input");
      return;
    } else {
      const data = {
        categoryEnglish,
        categoryArabic,
        categoryTurkish,
        categoryUrdu,
      };

      const formData = new FormData();
      formData.append("data", JSON.stringify(data));
      dispatch(postHadithCategory(formData))
        .unwrap()
        .then((res) => {
          navigate("/hadith-categories");
          infoNotify("Successfully added");
          
        })
        .catch((error) => {
          errorNotify("Something went wrong");
        });
    }
  };
  return (
    <section className="py-6 px-8">
      <div>
        <BackToPrev path="/hadith-categories" title={`Back`}></BackToPrev>
        <div className="bg-white p-6 rounded-2xl">
          <form action="" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-8">
              {/* english */}

              <div className="flex-1 flex flex-col gap-1 ">
                <span className="text-base font-poppins font-bold text-blackMediumEmp">
                  Name (English)
                </span>
                <input
                  type="text"
                  className=" font-poppins p-4 border border-neutralColorTwoHundread rounded-lg outline-none leading-[19.5px]"
                  placeholder="Enter category in english"
                  required
                  name="categoryEnglish"
                />
              </div>

              {/* arabic */}

              <div className="flex-1 flex flex-col gap-1 ">
                <span className="text-base font-poppins font-bold text-blackMediumEmp">
                  Name (Arabic)
                </span>
                <input
                  type="text"
                  className=" font-poppins p-4 border border-neutralColorTwoHundread rounded-lg outline-none leading-[19.5px]"
                  placeholder="Enter category in arabic"
                  name="categoryArabic"
                />
              </div>
              {/* Turkish */}

              <div className="flex-1 flex flex-col gap-1 ">
                <span className="text-base font-poppins font-bold text-blackMediumEmp">
                  Name (Turkish)
                </span>
                <input
                  type="text"
                  className=" font-poppins p-4 border border-neutralColorTwoHundread rounded-lg outline-none leading-[19.5px]"
                  placeholder="Enter category in turkish"
                  required
                  name="categoryTurkish"
                />
              </div>

              {/* Urdu */}

              <div className="flex-1 flex flex-col gap-1 ">
                <span className="text-base font-poppins font-bold text-blackMediumEmp">
                  Name (Urdu)
                </span>
                <input
                  type="text"
                  className=" font-poppins p-4 border border-neutralColorTwoHundread rounded-lg outline-none leading-[19.5px]"
                  placeholder="Enter category in urdu"
                  required
                  name="categoryUrdu"
                />
              </div>
            </div>

            {/* submit button  */}
            {/* button components - index.css */}
            <div className="mt-8">
              {/* <button className={`btn-main`}>Update</button> */}
              <button className={`btn-main`} disabled={isRequestLoading}>
                {isRequestLoading ? (
                  <span className="loading loading-dots loading-sm"></span>
                ) : (
                  "Add"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default HadithCategoriesForm;
