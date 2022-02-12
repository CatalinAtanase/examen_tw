import { Box, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import AddMovie from "./pages/AddMovie";
import AddCrew from "./pages/AddCrew";
import EditMovie from "./pages/EditMovie";
import EditCrew from "./pages/EditCrew";
import Home from "./pages/Home";
import CrewPage from "./pages/CrewPage";
import { get } from "./utils/useAxios";

function App() {
  const [movieList, setMovieList] = useState([]);
  const [crewList, setCrewList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get("/movie/");
        if (response.status === 200) {
          setMovieList(response.data.movies);
        }
      } catch (error) {}
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get("/crew/");
        if (response.status === 200) {
          setCrewList(response.data.crewMembers);
        }
      } catch (error) {}
    };

    fetchData();
  }, []);

  return (
    <Box marginX={"1em"}>
      <Router>
        <Flex justifyContent={"flex-end"}>
          <Box marginRight={"1em"}>
            <Link to="/">Home</Link>
          </Box>
          <Box marginRight={"1em"}>
            <Link to="/crew">Crew</Link>
          </Box>
        </Flex>

        <Routes>
          <Route
            path="/crew/add/"
            element={<AddCrew movieList={movieList} setCrewList={setCrewList} />}
          />
          <Route
            path="/crew/edit/:id"
            element={<EditCrew movieList={movieList} setCrewList={setCrewList} crewList={crewList}/>}
          />
          <Route
            path="/movie/add/"
            element={<AddMovie setMovieList={setMovieList} />}
          />
          <Route
            path="/movie/edit/:id"
            element={
              <EditMovie
                movieList={movieList}
                setMovieList={setMovieList}
                canEdit={false}
              />
            }
          />
          <Route
            path="/crew"
            element={
              <CrewPage crewList={crewList} setCrewList={setCrewList} canEdit={true} />
            }
          />
          <Route
            path="/"
            element={
              <Home movieList={movieList} setMovieList={setMovieList} />
            }
          />
        </Routes>
      </Router>
    </Box>
  );
}

export default App;
