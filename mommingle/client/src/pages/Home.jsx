import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import mom01harcoded from "../images/mom01harcoded.jpg";
import mom02harcoded from "../images/mom02harcoded.jpg";
import mom03harcoded from "../images/mom03harcoded.jpg";
import mom04harcoded from "../images/mom04harcoded.jpg";

const Home = () => {
  const [posts, setPosts] = useState([]);

  const cat = useLocation().search;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  // const hardcodedposts = [
  //   {
  //     id: 1,
  //     title: "Creative Mommy & Baby Bonding Workshop",
  //     desc: "Discover the joy of creative expression alongside your little one in our exclusive workshop! Join us for a delightful session of arts and crafts where you and your baby can unleash your imagination together. From adorable handprints to charming keepsakes, create treasured memories while nurturing your bond. Don't miss this opportunity to explore your artistic side with your precious one by your side!",
  //     img: mom01harcoded,
  //   },
  //   {
  //     id: 2,
  //     title: "Snuggle & Cinema: Baby-Friendly Movie Magic",
  //     desc: "Calling all moms and babies to a cozy cinema experience like no other! Join us for Snuggle & Cinema, where you and your little bundle can enjoy heartwarming movies in a warm, welcoming environment. Relax in our comfy seats, cuddle up with your baby, and immerse yourselves in family-friendly films that will enchant both young and old. Treat yourselves to an unforgettable movie date that's perfect for bonding with your little star!",
  //     img: mom02harcoded,
  //   },
  //   {
  //     id: 3,
  //     title: "Playdate Picnic Paradise: Mommy & Baby Bliss",
  //     desc: " Get ready to groove and giggle with your little one in our lively Zumba class designed especially for moms and babies! Shake off the stress and embrace the rhythm as you dance your way to fitness with your adorable sidekick. Led by our expert instructors, this energizing workout promises laughter, love, and plenty of precious moments with your baby. Join us and let the beat bring you closer together!",
  //     img: mom03harcoded,
  //   },
  //   {
  //     id: 4,
  //     title: "Zumba Fun for Moms & Babies: Energize Your Bond",
  //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
  //     img: mom04harcoded,
  //   },
  // ];

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  // the return is based on the hardcoded info
  return (
    <div className="home">
      <div className="posts">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            {/* <div className="img">
              <img src={post.img} alt="" />
            </div> */}
            <div className="content">
              <Link className="link" to={`/post/${post.id}`}>
                <h1>{post.title}</h1>
                <p>{post.description}</p>
              </Link>
              <button>Read More</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
