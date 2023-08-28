import "./App.css";
import github from "./github-logo.png";
import { useState } from "react";
export default function App() {
  const [inputData, setInputData] = useState("");
  const [data, setData] = useState([]);
  const [ok, setOk] = useState(false);
  const getUser = async () => {
    try {
      const response = await fetch(`https://api.github.com/users/${inputData}`);
      if (!response.ok) {
        // throw new Error("Failed to fetch user data");
        alert("Enter the correct data");
      } else {
        const userData = await response.json();
        setData(userData);
        setOk(!ok);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  };
  const formatDate = (date) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return new Date(date).toLocaleDateString(undefined, options);
  };
  console.log(data);
  return (
    <div className="container">
      <div className="nav_bar">
        <div className="nav_left">
          <strong>GitHub Profile Finder</strong>
        </div>
      </div>
      <div className="main">
        <div className="main-1">
          <input
            type="text"
            id="fname"
            name=""
            value={inputData}
            placeholder="Enter Github UserName"
            onChange={(e) => setInputData(e.target.value)}
          />
          <hr className="hr" />
          <span id="search" onClick={getUser}>
            Search User
          </span>
        </div>
      </div>
      <div className="git">
        <div className="git_block">
          <div className="main_info">
            {ok === true ? (
              <img
                src={data.avatar_url}
                alt={`${data.login} avatar`}
                id="prof_img"
              />
            ) : (
              <img src={github} alt="avatar" id="prof_img" />
            )}

            <span className="name" id="name">
              {data.length !== 0 ? data.name : "Full Name"}
            </span>
            <a href={`${data.html_url}`} id="username" target="_blank">
              {data.length !== 0 ? data.login : "@full-name"}
            </a>
          </div>
          <hr />
          <div className="about">
            <div className="bio" id="bio">
              {data.length !== 0 ? data.bio : "A full stack web developer"}
            </div>
            <div className="repos">
              <span className="repo" id="repo">
                {data.length !== 0 ? data.public_repos : " 23"}
              </span>{" "}
              Repositories
            </div>
          </div>
          <hr />
          <div className="follow">
            <div className="followers">
              <span className="follower" id="follower">
                {data.length !== 0 ? data.public_gists : " 1"}
              </span>{" "}
              Public Gists
            </div>
            <div className="followings">
              <span className="following" id="following">
                Created At:
                {data.length !== 0
                  ? formatDate(data.created_at)
                  : " 27 August, 2023"}
              </span>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
