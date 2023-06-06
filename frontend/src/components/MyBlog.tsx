import React, { useState, FormEvent, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { AppDispatch } from "../app/store";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { useAppDispatch } from "../app/hooks";
import { deleteBlog, editBlog } from "../action/blogAction";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { RootState } from "../app/store";
import { useSelector } from "react-redux";
import { readBlog } from "../action/blogAction";
import { TextareaAutosize } from "@mui/material";

const MyBlog = () => {
  const blogs = useSelector((state: RootState) => state.blog.blogs);
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useAppDispatch();
  const [currentEdit, setcurrentEdit] = useState({
    image: "",
    title: "",
    content: "",
    _id: "",
  });
  useEffect(() => {
    dispatch(readBlog());
  }, []);

  const del = (e: React.MouseEvent<SVGSVGElement, MouseEvent>, id: string) => {
    if (window.confirm()) {
      dispatch(deleteBlog(id));
    }
  };

  const edit_blog = (e: FormEvent) => {
    e.preventDefault();
    if (
      currentEdit.image != "" &&
      currentEdit.title != "" &&
      currentEdit.content != ""
    ) {
      dispatch(editBlog(currentEdit));
    }
  };

  return (
    <>
      <div className=" max-w-5xl m-auto flex">
        <div className=" w-full h-screen my-3">
          {blogs.map((item, key) => {
            return (
              <>
                {item.user_name == user.name && (
                  <div className="grid grid-rows-3 grid-flow-col gap-4 shadow border-2 p-2">
                    {item.image !== "" && (
                      <div className="row-span-6 border-2 m-2">
                        <img
                          src={`${item.image}`}
                          className="my-4 w-full  m-auto"
                          alt={`${item.image}`}
                        />
                      </div>
                    )}
                    <div className="col-span-1  border-2 m-2 p-1">
                      {/* {item.user_name}'article */}
                      <strong>Title: </strong>
                      {item.title}
                    </div>
                    <div className="row-span-4 col-span-1  border-2 m-2">
                      {item.content}
                    </div>
                    <div className="col-span-1  border-2 m-2 text-center">
                      <VisibilityIcon></VisibilityIcon>
                      {item.watch}
                      <ThumbUpIcon className="ms-3"></ThumbUpIcon>
                      {item.like}
                      <EditIcon
                        className="hover:cursor-pointer mx-3 text-yellow-400"
                        onClick={(e) => setcurrentEdit(item)}
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                      ></EditIcon>
                      <DeleteForeverIcon
                        className="hover:cursor-pointer text-red-600"
                        onClick={(e) => del(e, item._id)}
                      ></DeleteForeverIcon>
                    </div>
                  </div>
                )}
              </>
            );
          })}
        </div>
      </div>

      <div
        className="modal fade"
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-md">
          <div className="modal-content shadow border-2">
            <div className="modal-header border-2 bg-blue-300">
              <h1 className="modal-title" id="exampleModalLabel">
                Update Blog
              </h1>
            </div>
            <div className="modal-body">
              <form onSubmit={edit_blog}>
                <div className="mx-4 mt-3 text-center">
                  <TextField
                    className="w-full"
                    name="title"
                    id="outlined-basic"
                    label="title"
                    variant="outlined"
                    value={currentEdit.title}
                    onChange={(e) =>
                      setcurrentEdit({
                        ...currentEdit,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                  <TextareaAutosize
                    className="border-cyan-300 border-2 w-full my-3 p-3"
                    name="content"
                    minRows="3"
                    value={currentEdit.content}
                    onChange={(e) =>
                      setcurrentEdit({
                        ...currentEdit,
                        [e.target.name]: e.target.value,
                      })
                    }
                  ></TextareaAutosize>
                  <TextField
                    name="image"
                    type="url"
                    value={currentEdit.image}
                    className="w-full mb-2"
                    id="outlined-basic"
                    variant="outlined"
                    onChange={(e) =>
                      setcurrentEdit({
                        ...currentEdit,
                        [e.target.name]: e.target.value,
                      })
                    }
                    required
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    className="ms-32"
                    onClick={edit_blog}
                    data-bs-dismiss="modal"
                  >
                    Update blog
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
export default MyBlog;
