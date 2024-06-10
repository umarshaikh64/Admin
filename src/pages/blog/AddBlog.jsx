import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import BackToPrev from '../../components/shared/back/BackToPrev';

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { uploadIcon } from "../../assets/getAssets";
import { addNewBlog, fetchCategory, updateBlog } from '../../features/blog/blogSlice';
import { errorNotify, infoNotify } from '../../util/getNotify';


const AddBlog = () => {
    const dispatch = useDispatch();
    const blog = useSelector((state) => state.blog);
    const categoryData = blog.allCategory;
    const { isRequestLoading } = useSelector((state) => state.hadith);
    const navigate = useNavigate();
    const [categoryId, setCategoryId] = useState("");
    const [tags, setTags] = useState([]);
    const [file1, setFile] = useState(null);
    const [htmlBody, setHtmlBody] = useState(null);
    const [title, setTitle] = useState('');

    const { state } = useLocation();
    const { payload } = state || {};


    useEffect(() => {

        if (payload) {
            setTitle(payload?.title);
            setCategoryId(payload?.categoryId);
            setHtmlBody(payload?.body);
            const t = JSON.parse(payload?.tags);
            setTags(t);
        }
    }, [payload]);


    useEffect(() => {
        if (categoryData?.length === 0) {
            dispatch(fetchCategory());
        }
    }, [])

    const auth = useSelector((state) => state.auth);

    const addBlog = async (event) => {
        event.preventDefault();
        // const form = event.target;
        // const title = form.title.value;
        if (payload != null) {
            const isComplete =
                title &&
                categoryId &&
                (tags.length > 0) &&
                htmlBody;
            if (!isComplete) {
                errorNotify("Incomplete Input");
                return;
            } else {
                const data = {
                    title,
                    status: 1,
                    categoryId,
                    htmlBody,
                    author_id: auth._id,
                };
                const formData = new FormData();
                if (file1 != null) {
                    formData.append("image", file1);
                }
                formData.append("tags", JSON.stringify(tags))
                formData.append("data", JSON.stringify(data));
                await dispatch(updateBlog({ data: formData, id: payload?.id }))
                    .unwrap()
                    .then((res) => {
                        navigate("/blogs");
                        infoNotify("Successfully add blog");
                    })
                    .catch((error) => {
                        errorNotify("Failed to add blog");
                    });
            }
        } else {
            const isComplete =
                title &&
                categoryId &&
                (tags.length > 0) &&
                file1 &&
                htmlBody;

            if (!isComplete) {
                errorNotify("Incomplete Input");
                return;
            } else {
                const data = {
                    title,
                    status: 1,
                    categoryId,
                    htmlBody,
                    author_id: auth._id,
                };
                const formData = new FormData();
                formData.append("image", file1);
                formData.append("tags", JSON.stringify(tags))
                formData.append("data", JSON.stringify(data));
                await dispatch(addNewBlog(formData))
                    .unwrap()
                    .then((res) => {
                        navigate("/blogs");
                        infoNotify("Successfully add blog");
                    })
                    .catch((error) => {
                        errorNotify("Failed to add blog");
                    });
            }
        }

    }

    const handleImage = (file) => {
        setFile(file);
    }
    return (
        <section className="w-full h-full px-8 py-6">
            <BackToPrev path="/blogs" title={`Back`}></BackToPrev>
            <div className="bg-white p-6 rounded-2xl">
                <form onSubmit={addBlog}>
                    <div>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="flex-1 flex flex-col gap-1 ">
                                <span className="text-base font-poppins font-bold text-blackMediumEmp">
                                    Title
                                </span>
                                <input
                                    type="text"
                                    className=" font-poppins p-3 border border-neutralColorTwoHundread rounded-lg outline-none leading-[19.5px]"
                                    placeholder="Enter  Blog Title "
                                    required
                                    value={title}
                                    name="title"
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            {/* Reference Book */}
                            <div className="w-full flex flex-col gap-1 ">
                                <span className="text-base font-poppins font-bold text-blackMediumEmp">
                                    Category
                                </span>
                                <Select
                                    options={
                                        categoryData.length > 0 ? categoryData?.map((d) => ({ value: d.id, "label": d.title })) : []
                                    }
                                    defaultValue={payload != null ? { id: payload.categoryId, label: payload?.category?.title } : {}}
                                    onChange={(e) => {
                                        setCategoryId(e.value);
                                    }}
                                />

                            </div>
                            {/* category */}
                            <div className="w-full mb-4 col-span-1">
                                <div className="flex flex-col gap-1 ">
                                    <span className="text-base font-poppins font-bold text-blackMediumEmp">
                                        Tags
                                    </span>
                                    <CreatableSelect
                                        isMulti
                                        defaultValue={payload != null ? JSON.parse(payload.tags) : {}}
                                        onChange={(e) => {
                                            // console.log(e);
                                            setTags(e);
                                        }}
                                    />
                                </div>
                                {/* <div className="flex mt-6 flex-col gap-1 ">
                                    <span className="text-base font-poppins font-bold text-blackMediumEmp">
                                        Status
                                    </span>
                                    <select name='status' defaultValue={""} className='ont-poppins p-3 border border-neutralColorTwoHundread rounded-lg outline-none leading-[19.5px]'>
                                        <option value={""}> --Select Status-- </option>
                                        <option value={"1"}>Active</option>
                                        <option value={"2"}>Inactive</option>
                                    </select>
                                </div> */}
                            </div>
                            <div className="w-full flex flex-col gap-1 ">
                                <span className="text-base font-poppins font-bold text-blackMediumEmp">
                                    Image
                                </span>

                                <label
                                    htmlFor="wallpaperImage"
                                    className="w-full h-[200px] rounded-lg border border=slate-900 flex flex-col justify-center items-center gap-2 px-5 py-5 cursor-pointer"
                                >
                                    {
                                        payload != null  &&file1 == null?
                                            <img src={payload?.image} /> :
                                            (file1 != null ?
                                                <img src={window.URL.createObjectURL(file1)} />
                                                :
                                                <><div className="w-full ">
                                                    <img
                                                        src={uploadIcon}
                                                        alt=""
                                                        className="w-[60px] h-[40px] mx-auto"
                                                    />
                                                </div>
                                                    <p className="font-semibold font-poppins text-xl text-[#3399DB]">
                                                        Upload Image
                                                    </p></>)}
                                    <input
                                        type="file"
                                        id="wallpaperImage"
                                        className="hidden"
                                        name='image'
                                        onChange={(e) => {
                                            if (e.target.files.length > 0) {
                                                handleImage(e.target.files[0])
                                            } else {
                                                errorNotify("Please Select The Image");
                                            }
                                        }}
                                    />
                                </label>
                            </div>

                            <div className="w-full mb-4 col-span-2">
                                {/* <ControlledEditor/> */}

                                <CKEditor
                                    editor={ClassicEditor}
                                    data={payload?.body}
                                    onReady={(editor) => {
                                        setHtmlBody(payload?.body)
                                        console.log("CKEditor5 React Component is ready to use!", editor);
                                    }}
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        setHtmlBody(data);
                                    }}
                                />

                            </div>
                        </div>
                    </div>
                    <div className="mt-6">
                        <button type='submit' className={`btn-main`} disabled={isRequestLoading}>
                            {isRequestLoading ? (
                                <span className="loading loading-dots loading-sm"></span>
                            ) : (
                                payload != null ? "Update" : "Add"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default AddBlog