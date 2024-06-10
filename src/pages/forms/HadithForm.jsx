import { Select } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SearchLoader from "../../components/loaders/SearchLoader";
import BackToPrev from "../../components/shared/back/BackToPrev";
import SomethingWrong from "../../components/shared/ui/SomethingWrong";
import { addNewHadith } from "../../features/hadith/hadithSlice";
import { fetchAllHadithCategory } from "../../features/hadithCategories/hadithCategoriesSlice";
import { errorNotify, infoNotify } from "../../util/getNotify";
function HadithForm() {
  const dispatch = useDispatch();
  const { isRequestLoading } = useSelector((state) => state.hadith);
  const { allHadithCategory, isLoading, isError } = useSelector(
    (state) => state.hadithCategories
  );
  const navigate = useNavigate();
  const [category_id, setCategoryId] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const narratedBy = form.narratedBy.value;
    const referenceBook = form.referenceBook.value;
    const hadithArabic = form.hadithArabic.value;
    const hadithEnglish = form.hadithEnglish.value;
    const hadithTurkish = form.hadithTurkish.value;
    const hadithUrdu = form.hadithUrdu.value;

    const isComplete =
      narratedBy &&
      referenceBook &&
      hadithArabic &&
      hadithEnglish &&
      hadithTurkish &&
      hadithUrdu &&
      category_id;

    if (!isComplete) {
      errorNotify("Incomplete Input");
      return;
    } else {
      const data = {
        narratedBy,
        referenceBook,
        hadithArabic,
        hadithEnglish,
        hadithTurkish,
        hadithUrdu,
        category_id,
      };
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));
      dispatch(addNewHadith(formData))
        .unwrap()
        .then((res) => {
          navigate("/hadith");
          infoNotify("Successfully add hadith");
        })
        .catch((error) => {
          errorNotify("Failed to add hadith");
        });
    }
  };

  useEffect(() => {
    if (allHadithCategory?.length === 0) {
      dispatch(fetchAllHadithCategory());
    }
  }, []);

  useEffect(() => {
    if (allHadithCategory?.length > 0) {
      setCategoryId(allHadithCategory[0]?._id);
    }
  }, [allHadithCategory]);
  return isLoading ? (
    <SearchLoader></SearchLoader>
  ) : isError ? (
    <SomethingWrong></SomethingWrong>
  ) : (
    <section className="w-full h-full px-8 py-6">
      <BackToPrev path="/hadith" title={`Back`}></BackToPrev>

      <div className="bg-white p-6 rounded-2xl">
        <form onSubmit={handleSubmit}>
          <div>
            {/* narrated by and reference */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex-1 flex flex-col gap-1 ">
                <span className="text-base font-poppins font-bold text-blackMediumEmp">
                  Narrated By
                </span>
                <input
                  type="text"
                  className=" font-poppins p-4 border border-neutralColorTwoHundread rounded-lg outline-none leading-[19.5px]"
                  placeholder="Enter author name"
                  required
                  name="narratedBy"
                />
              </div>
              {/* Reference Book */}
              <div className="w-full flex flex-col gap-1 ">
                <span className="text-base font-poppins font-bold text-blackMediumEmp">
                  Reference Book
                </span>
                <input
                  type="text"
                  className=" font-poppins p-4 border border-neutralColorTwoHundread rounded-lg outline-none leading-[19.5px]"
                  placeholder="Enter reference book"
                  required
                  name="referenceBook"
                />
              </div>
              {/* category */}
              <div className="w-full mb-8 col-span-2">
                <div className="flex flex-col gap-1 ">
                  <span className="text-base font-poppins font-bold text-blackMediumEmp">
                    Category
                  </span>
                  <Select
                    className="font-poppins border border-neutralColorTwoHundread rounded-lg outline-none adSetting w-2/4"
                    value={category_id}
                    onChange={(e) => setCategoryId(e)}
                    aria-required
                    name="category_id"
                  >
                    {allHadithCategory?.map((category, idx) => {
                      return (
                        <Select.Option
                          key={category?._id}
                          value={category?._id}
                          className="mb-[1px]"
                        >
                          <span>{category?.categoryEnglish}</span>
                        </Select.Option>
                      );
                    })}
                  </Select>
                </div>
              </div>
            </div>

            {/* hadith in arabic */}
            <div className="flex-1 flex flex-col gap-1 mb-8 ">
              <span className="text-base font-poppins font-bold text-blackMediumEmp">
                Hadith in Arabic
              </span>
              <textarea
                type="text"
                className="font-poppins p-4 border border-neutralColorTwoHundread rounded-lg outline-none leading-[19.5px] h-[89px] resize-none"
                placeholder="Enter hadith in arabic"
                required
                name="hadithArabic"
              ></textarea>
            </div>
            {/* hadith in english */}
            <div className="flex-1 flex flex-col gap-1 mb-8 ">
              <span className="text-base font-poppins font-bold text-blackMediumEmp">
                Hadith in English
              </span>
              <textarea
                type="text"
                className=" font-poppins p-4 border border-neutralColorTwoHundread rounded-lg outline-none leading-[19.5px] h-[89px] resize-none text-black"
                placeholder="Enter hadith in english"
                required
                name="hadithEnglish"
              ></textarea>
            </div>

            {/* hadith in Turkish */}
            <div className="flex-1 flex flex-col gap-1 mb-8 ">
              <span className="text-base font-poppins font-bold text-blackMediumEmp">
                Hadith in Turkish
              </span>
              <textarea
                type="text"
                className="font-poppins p-4 border border-neutralColorTwoHundread rounded-lg outline-none leading-[19.5px] h-[89px] resize-none"
                placeholder="Enter hadith in turkish"
                required
                name="hadithTurkish"
              ></textarea>
            </div>
            {/* hadith in Urdu */}
            <div className="flex-1 flex flex-col gap-1 mb-8 ">
              <span className="text-base font-poppins font-bold text-blackMediumEmp">
                Hadith in Urdu
              </span>
              <textarea
                type="text"
                className=" font-poppins p-4 border border-neutralColorTwoHundread rounded-lg outline-none leading-[19.5px] h-[89px] resize-none text-black"
                placeholder="Enter hadith in urdu"
                required
                name="hadithUrdu"
              ></textarea>
            </div>
          </div>
          {/* submit button  */}
          {/* button components - index.css */}
          <div className="mt-6">
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
    </section>
  );
}

export default HadithForm;
