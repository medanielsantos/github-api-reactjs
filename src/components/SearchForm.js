import React, { useState, useEffect } from "react";

function SearchForm() {
  const [name, setName] = useState("");
  const [userName, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [html_url, setUserURL] = useState("");
  const [avatar, setAvatar] = useState("");
  const [followers, setFollowers] = useState("");
  const [following, setfollowing] = useState("");
  const [repos, setRepos] = useState("");
  const [userInput, setUserInput] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://api.github.com/users/google")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  const setData = ({
    name,
    login,
    bio,
    html_url,
    followers,
    following,
    public_repos,
    avatar_url,
  }) => {
    setName(name);
    setUsername(login);
    setBio(bio);
    setUserURL(html_url);
    setFollowers(followers);
    setfollowing(following);
    setRepos(public_repos);
    setAvatar(avatar_url);
  };
  const handleSearch = (e) => {
    setUserInput(e.target.value);
  };
  const handleSubmit = (event) => {
    fetch(`https://api.github.com/users/${userInput}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          setError(data.message);
        } else {
          setData(data);
          setError(null);
        }
      });
    event.preventDefault();
  };
  return (
    <div>
      <div className="navbar">Github Busca de usuário</div>
      <form className="github-search" onSubmit={handleSubmit}>
        <input placehelder="Usuário do git" onChange={handleSearch} />
        <button className="btn-green">Enviar</button>
      </form>

      {error ? (
        <h1>{error}</h1>
      ) : (
        <div className="github-user">
          <div className="img">
            <img src={avatar} alt={name} />
          </div>
          <div className="mid-section">
            <div className="name">{name}</div>
            <a href={html_url}>
              <div className="username">@{userName}</div>
            </a>
            <div className="description">{bio}</div>
            <div className="line"></div>
            <div className="info">
              <div className="infoView">
                {followers}
                <div className="subtext">Followers</div>
              </div>
              <div className="infoView">
                {following}
                <div className="subtext">Following</div>
              </div>
              <div className="infoView">
                {repos}
                <div className="subtext">Repositories</div>
              </div>
            </div>
          </div>
          <div className="links">
            <a className="follow links" href={html_url}>
              <i className="fa fa-github" aria-hidden="true"></i> Visitar Perfil
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchForm;
