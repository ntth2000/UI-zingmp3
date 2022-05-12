import { Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Player from "./components/player/Player";
import Sidebar from "./components/sidebar/Sidebar";
import GlobalStyles from "./UI/GlobalStyles/GlobalStyles";
import SidePlayQueue from "./components/side-playqueue/SidePlayQueue";
import Explore from "./pages/Explore/Explore";
import MyMusic from "./pages/MyMusic/MyMusic";
import ZingChart from "./pages/ZingChart/ZingChart";
import Top100 from "./pages/Top100/Top100";
import NewReleases from "./pages/NewReleases/NewReleases";
import Album from "./pages/Album/Album";
import { useSelector } from "react-redux";
function App() {
  const { playlistId } = useSelector((state) => state.player);
  const handleScrollingContent = (e) => {
    const header = document.querySelector(".header");
    header.classList.toggle("scrolling", e.target.scrollTop > 0);
  };
  return (
    <GlobalStyles>
      <div className="App">
        <div className={`main-content${!playlistId ? " full-height" : ""}`}>
          <Sidebar />
          {playlistId && <SidePlayQueue />}
          <div className="content-container">
            <Header />
            <div className="content" onScroll={handleScrollingContent}>
              <Routes>
                <Route path="/" element={<Explore />} />
                <Route path="/my-music" element={<MyMusic />} />
                <Route path="/zing-chart" element={<ZingChart />} />
                <Route path="/top100" element={<Top100 />} />
                <Route path="/new-releases" element={<NewReleases />} />
                <Route path="/album/:aliasTitle/:albumId" element={<Album />} />
              </Routes>
            </div>
          </div>
        </div>
        {playlistId && <Player />}
      </div>
    </GlobalStyles>
  );
}

export default App;
