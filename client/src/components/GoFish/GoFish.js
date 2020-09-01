import React from "react";
import styled from "styled-components";

import goFishWallpaper from "../../assets/go_fish_wallpaper.jpg";

const GoFish = () => {
  return <Img></Img>;
};

const Img = styled.div`
  margin: 5px auto;
  height: 77vh;
  background-size: cover;
  background-image: url(${goFishWallpaper});
  background-position: center;
`;

export default GoFish;
