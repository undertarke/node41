import React, { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";

import { Videos, Sidebar } from "./";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { getVideoAPI, getVideoPageAPI, getVideoWithTypeAPI } from "../utils/fetchFromAPI";

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("New");
  const [videos, setVideos] = useState(null);
  const [listPage, setListPage] = useState(0);
  const navigate = useNavigate()
  const params = useParams();

  // useEffect(() => {

  //   if (params.id)
  //     getVideoWithTypeAPI(params.id).then(result => {
  //       setVideos(result)

  //     })
  //   else
  //     getVideoAPI().then(result => {
  //       setVideos(result)
  //     })

  // }, [params.id]);
  console.log(listPage)
  useEffect(() => {

    if (params.page)
      getVideoPageAPI(params.page).then(result => {
        setVideos(result.listVideo)
        setListPage(result.totalPage)
      })
    else
      getVideoPageAPI(1).then(result => {
        setVideos(result.listVideo)
        setListPage(result.totalPage)

      })


  }, [params.page])




  return (
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
      <Box sx={{ height: { sx: "auto", md: "92vh" }, borderRight: "1px solid #3d3d3d", px: { sx: 0, md: 2 } }}>
        <Sidebar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />

        <Typography className="copyright" variant="body2" sx={{ mt: 1.5, color: "#fff", }}>
          Copyright © 2050 Media
        </Typography>
      </Box>

      <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
        <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: "white" }}>
          {selectedCategory} <span style={{ color: "#FC1503" }}>videos</span>
        </Typography>

        <Videos videos={videos} />

        {Array.from({ length: listPage }, (_, index) => {

          return <button className="btn btn-sm btn-primary mx-2"
            onClick={() => navigate(`/${index + 1}`)} >

            {index + 1}
            
          </button>
        }
        )}


      </Box>
    </Stack >
  );
};

export default Feed;
