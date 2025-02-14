"use client";
import React, { useEffect, useState } from "react";
import { Pencil, Trash2, Eye } from "lucide-react";
import Page from "../superadmin/page";

const ManageUPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/posts");
      const data = await response.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  return (
    <div className="">
          <Page/>
    </div>
  );
};

export default ManageUPosts;
