import React, { useEffect, useRef, useState } from 'react'
import SearchBar from '../../components/shared/searchbar/SearchBar'
import AddCategoryModal from '../../components/modals/AddCategoryModal';
import { addCategory, fetchCategory, updateBlogCategory } from '../../features/blog/blogSlice';
import { errorNotify, infoNotify } from '../../util/getNotify';
import { useDispatch, useSelector } from 'react-redux';
import NoData from '../../components/shared/ui/NoData';
import SomethingWrong from '../../components/shared/ui/SomethingWrong';
import SearchLoader from '../../components/loaders/SearchLoader';
import BlogCategoryTable from '../../components/tables/blogCategoryTable/BlogCategoryTable';

const BlogCategories = () => {
    const [categoryName, setCategoryName] = useState("");
    const [categorySlug, setCategorySlug] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [categoryId, setCategoryId] = useState(null);
    const dispatch = useDispatch();
    const blog = useSelector((state) => state.blog);
    const categoryData = blog.allCategory;

    const onChange = (event) => {
        setSearchValue(event.target.value);
    }

    const addCategoryButton = async (isEdit1) => {
        const formData = new FormData();
        formData.append("data", JSON.stringify({ categoryName, categorySlug }));

        if (isEdit1) {
            await dispatch(updateBlogCategory({data:formData,id:categoryId}))
                .then(async (res) => {
                    setCategoryName("");
                    setCategorySlug("");
                    await dispatch(fetchCategory());
                    infoNotify("Successfully Update");
                })
                .catch((error) => {
                    errorNotify("Something went wrong");
                });
        } else {
            await dispatch(addCategory(formData))
                .then(async (res) => {
                    setCategoryName("");
                    setCategorySlug("");
                    await dispatch(fetchCategory());
                    infoNotify("Successfully added");
                })
                .catch((error) => {
                    errorNotify("Something went wrong");
                });
        }
    }

    const sortByTime = (a, b) => {
        return b.timestamp - a.timestamp;
    };

    const filterBySearch = (data) => {
        if (searchValue.trim().length > 0) {
            return data?.title
                ?.toLowerCase()
                .startsWith(searchValue.toLowerCase());
        } else {
            return data;
        }
    };

    let content = null;
    const labelRef = useRef();
    const [isEdit, setIsEdit] = useState(false);

    const handleNavigate = (category) => {
        setCategoryId(category.id);
        setCategoryName(category.title);
        setCategorySlug(category.slug);
        setIsEdit(true);
        labelRef.current?.click();
    }

    if (blog.isLoading) {
        content = <SearchLoader></SearchLoader>;
    } else if (!blog?.isLoading && blog?.isError) {
        content = <SomethingWrong></SomethingWrong>;
    } else if (
        !blog?.isLoading &&
        !blog?.isError &&
        categoryData?.length === 0
    ) {
        content = <NoData></NoData>;
    } else if (
        !blog.isLoading &&
        !blog.isError &&
        categoryData?.length > 0
    ) {
        const newData = [...categoryData]
            ?.sort(sortByTime)
            ?.filter(filterBySearch);
        content = <BlogCategoryTable
            handleNavigate={handleNavigate}
            data={newData}></BlogCategoryTable>;
    }




    useEffect(() => {
        dispatch(fetchCategory());
    }, []);


    return (
        <section className="h-full w-full px-8 py-6">
            <div className="bg-themeMid shadow-sm w-full h-full rounded-2xl overflow-hidden">
                <SearchBar
                    title="Blog Categories"
                    path=""
                    value={searchValue}
                    onChange={onChange}
                    isNotAddable={true}
                    isWallpaperSearchBar={true}
                    modalId={"uploadPopUp"}
                    isBlog={true}
                    onClickBlogCategory={() => { setCategoryName(''); setCategorySlug(""); setIsEdit(false); }}
                ></SearchBar>
                <div className="h-[calc(100%-78px)]">{content}</div>
            </div>
            <label htmlFor='uploadPopUp' ref={labelRef}></label>

            <AddCategoryModal
                isEdit={isEdit}
                categoryName={categoryName}
                categorySlug={categorySlug}
                handleCategoryName={(e) => {
                    var slug = "/" + e;
                    setCategoryName(e); setCategorySlug(slug)
                }}
                handleCategorySlug={(e) => setCategorySlug(e)}
                modalClose={true}
                handleAddCategory={addCategoryButton}
            />
        </section>
    )
}

export default BlogCategories