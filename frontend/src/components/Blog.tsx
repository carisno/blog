import React, { useState, FormEvent, useEffect } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import PlusOneIcon from "@mui/icons-material/PlusOne";
import { TextField, Button } from "@mui/material";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import { useAppDispatch } from "../app/hooks";
import { addBlog, readBlog, addlike, watchblog } from "../action/blogAction";
import { useNavigate } from "react-router-dom";
import { RootState } from "../app/store";
import { useSelector } from "react-redux";
import { TypeBlog } from "../action/actionType";
const Blog = () => {
  const isauth = useSelector((state: RootState) => state.auth.isauth);
  const user = useSelector((state: RootState) => state.auth.user);
  const blogs = useSelector((state: RootState) => state.blog.blogs);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [title, settitle] = useState("");
  const [content, setcontent] = useState("");
  const [image, setimage] = useState("");
  const [imageData, setImageData] = useState<string | null>(null);
  let tmp = blogs;
  const [currentblog, setcurrentblog] = useState<TypeBlog>({
    title: "",
    _id: "",
    like: 0,
    watch: 0,
    user_name: "",
    content: "",
    image: "",
  });

  useEffect(() => {
    dispatch(readBlog());
  }, []);

  const add_like = (id: string) => {
    dispatch(addlike(id));
  };

  const add_blg = (e: FormEvent) => {
    e.preventDefault();
    if (title != "" && content != "" && image != "") {
      const newblog = {
        title: title,
        content: content,
        user_name: user.name,
        image: image,
      };
      dispatch(addBlog(newblog));
      settitle("");
      setcontent("");
      setImageData("");
    }
  };

  const onwatch = (item: TypeBlog, id: string) => {
    dispatch(watchblog(id));
    setcurrentblog(item);
  };

  return (
    <>
      <div className="text-center my-5">
        {!isauth && (
          <>
            <h1 className="text-8xl text-cyan-600">
              Welcome to my first Blog post!
            </h1>
            <h3 className="text-2xl my-4">
              Please login to create your new blog...
            </h3>
            <a
              href="https://firstsiteguide.com/what-is-blog/"
              target="_blank"
              className="p-2 text-2xl rounded-full cursor-pointer border-2 border-blue-600 hover:bg-blue-600 hover:text-white"
            >
              Read More
            </a>
          </>
        )}
      </div>
      <div className="text-center my-3">
        {isauth && (
          <button
            type="button"
            className="btn bg-sky-400 w-1/2 border-2 hover:border-gray-700 h-14 text-2xl shadow border-gray-200"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Create Blog
          </button>
        )}
      </div>
      <div className=" m-auto mx-3 flex ">
        <div className=" w-full h-screen">
          <div className="grid lg:grid-cols-4 md:grid-cols-3 p-2">
            {tmp.map((item, key) => {
              return (
                <>
                  <div key={key} className="">
                    {item.image !== "" && (
                      <div className="row-span-6 border-2 m-2  shadow rounded-lg">
                        <div className="text-2xl bg-lime-200 p-2 text-center text-cyan-700 font-bold">
                          {item.user_name}
                          <span className="text-sm p-0 text-gray-400">
                            {item.create_at}
                          </span>
                        </div>
                        <img
                          src={`${item.image}`}
                          className="w-full h-60 cursor-pointer"
                          alt={`${item.image}`}
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal1"
                          onClick={(e) => onwatch(item, item._id)}
                        />
                        <div className="p-2 ps-4 bg-gray-100">
                          <div className="text-lg">
                            <strong>Title: </strong>
                            {item.title}
                          </div>
                          <div className="text-md">
                            <strong>Content: </strong>
                            {item.content}
                          </div>
                          <div className="flex justify-around">
                            <div>
                              <VisibilityIcon className="me-2"></VisibilityIcon>
                              {item.watch}
                            </div>
                            <div>
                              {user.name !== item.user_name && isauth ? (
                                <>
                                  <ThumbUpIcon
                                    className="hover:cursor-pointer hover:cursor-pointer me-2 text-yellow-500"
                                    onClick={(e) => add_like(item._id)}
                                  ></ThumbUpIcon>
                                  {item.like}
                                </>
                              ) : (
                                <div>
                                  <ThumbUpIcon className="me-2"></ThumbUpIcon>
                                  {item.like}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="exampleModal1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-xl w-screen bg-white p-0 opacity-90">
          <div className="grid grid-rows-3 grid-flow-col gap-4 shadow px-8 w-full">
            <div className="row-span-6 border-2 m-2  hover:cursor-pointer text-center p-2">
              <span className="text-2xl text-blue-400">
                The article of {currentblog.user_name}
              </span>
              <img
                src={`${currentblog.image}`}
                className="my-4 w-full  m-auto"
                alt={`${currentblog.image}`}
              />
            </div>

            <div className="col-span-1  border-2 m-2 p-1">
              <strong>Title: </strong>
              {currentblog.title}
            </div>
            <div className="row-span-4 col-span-1  border-2 m-2">
              {currentblog.content}
            </div>
            <div className="col-span-1  border-2 m-2 text-center">
              <VisibilityIcon></VisibilityIcon>
              {currentblog.watch}
              <ThumbUpIcon className="ms-10"></ThumbUpIcon>
              {currentblog.like}
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Create New Blog
              </h1>
            </div>
            <div className="modal-body">
              <form onSubmit={add_blg}>
                <div className="mx-4 mt-6">
                  <TextField
                    className="w-full"
                    name="title"
                    id="outlined-basic"
                    label="title"
                    variant="outlined"
                    value={title}
                    onChange={(e) => settitle(e.target.value)}
                  />
                  <TextareaAutosize
                    className="border-cyan-300 border-2 w-full my-3 p-3"
                    minRows="4"
                    value={content}
                    onChange={(e) => setcontent(e.target.value)}
                  ></TextareaAutosize>
                  <TextField
                    className="w-full mb-2"
                    id="outlined-basic"
                    variant="outlined"
                    type="url"
                    value={image}
                    onChange={(e) => setimage(e.target.value)}
                    required
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    className="ms-32"
                    onClick={add_blg}
                    data-bs-dismiss="modal"
                  >
                    Add new blog
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Blog;
