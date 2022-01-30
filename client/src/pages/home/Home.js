import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/api/posts" + search);
      setPosts(res.data);
    };
    fetchPosts();
  }, [search]);
  return (
    <>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <Posts posts={posts} />
          </div>
          <div className="col-md-4">
            <Sidebar />
          </div>
        </div>
      </div>
    </>
  );
}
