

import React, { useEffect, useState } from 'react'
import SearchBar from '../../components/shared/searchbar/SearchBar'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllBlogs } from '../../features/blog/blogSlice';
import SearchLoader from '../../components/loaders/SearchLoader';
import SomethingWrong from '../../components/shared/ui/SomethingWrong';
import NoData from '../../components/shared/ui/NoData';
import BlogTable from '../../components/tables/blog/BlogTable';

const Blogs = () => {
    const dispatch = useDispatch();
    const blog = useSelector((state) => state.blog);
    const blogData = blog.allBlog;
    const [searchValue, setSearchValue] = useState("");
    console.log(blogData)

    useEffect(() => {
        dispatch(fetchAllBlogs());
    }, [dispatch]);

    const onChange = (event) => {
        setSearchValue(event.target.value);
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


    useEffect(() => {
        let isMounted = true;
        if (isMounted && blog.isLoading) {
            dispatch(fetchAllBlogs());
        }
        return () => {
            isMounted = false;
        };
    }, [dispatch, blog.isLoading]);

    let content = null;

    if (blog.isLoading) {
        content = <SearchLoader></SearchLoader>;
    } else if (!blog.isLoading && blog.isError) {
        content = <SomethingWrong></SomethingWrong>;
    } else if (!blog.isLoading && !blog.isError && blogData?.length === 0) {
        content = <NoData></NoData>;
    } else if (!blog.isLoading && !blog.isError && blogData?.length > 0) {
        const newData = [...blogData]?.sort(sortByTime)?.filter(filterBySearch);
        content = <BlogTable data={newData}></BlogTable>;
    }


    return (
        <section className="h-full w-full px-8 py-6">
            <div className="bg-themeMid shadow-sm w-full h-full rounded-2xl overflow-hidden">
                <SearchBar
                    title="Blogs"
                    path="/blog-add"
                    value={searchValue}
                    onChange={onChange}
                ></SearchBar>
                <div className="h-[calc(100%-78px)]">{content}</div>
            </div>
        </section>
    )
}

export default Blogs