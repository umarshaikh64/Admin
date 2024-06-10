
import React, { useEffect, useState } from 'react'
import SearchBar from '../../components/shared/searchbar/SearchBar'
import SearchLoader from '../../components/loaders/SearchLoader';
import SomethingWrong from '../../components/shared/ui/SomethingWrong';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllHafiz } from '../../features/hafiz/hafizSlice';
import NoData from '../../components/shared/ui/NoData';
import HafizTable from '../../components/tables/hafiz/HafizTable';

const HafizPage = () => {
    const [searchValue, setSearchValue] = useState("");
    const dispatch = useDispatch();

    const [isAscending, setIsAscending] = useState(false);
    const hafiz = useSelector((state) => state.hafiz);
    const usersData = hafiz?.allHafiz || [];
    const onChange = (event) => {
           setSearchValue(event.target.value);
    }

    useEffect(() => {
        dispatch(fetchAllHafiz());
    }, []);



    // const sortByTime = (a, b) => {
    //     if (isAscending) {
    //       return a.timestamp - b.timestamp;
    //     } else {
    //       return b.timestamp - a.timestamp;
    //     }
    //   };

    const filterBySearch = (data) => {
        if (searchValue.trim().length > 0) {
            return data?.first_name?.toLowerCase().includes(searchValue?.toLowerCase());
        } else {
            return true;
        }
    };

    let content = null;

    if (hafiz.isLoading) {
        content = <SearchLoader></SearchLoader>;
    } else if (!hafiz.isLoading && hafiz.isError) {
        content = <SomethingWrong></SomethingWrong>;
    } else if (!hafiz.isLoading && !hafiz.isError && usersData?.length === 0) {
        content = <NoData></NoData>;
    } else if (!hafiz.isLoading && !hafiz.isError && usersData?.length > 0) {
        const newData = [...usersData]?.filter(filterBySearch);
        content = (
            <HafizTable data={newData} setIsAscending={setIsAscending}></HafizTable>
        );
    }
    return (
        <section className="h-full w-full px-8 py-6">
            <div className="bg-themeMid shadow-sm w-full h-full rounded-2xl overflow-hidden">
                <SearchBar
                    title="Hafiz"
                    path=""
                    value={searchValue}
                    onChange={onChange}
                    isNotAddable={true}
                ></SearchBar>

                <div className="h-[calc(100%-78px)]">{content}</div>
            </div>
        </section>
    )
}

export default HafizPage