import { Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Player from "./components/player/Player";
import Sidebar from "./components/sidebar/Sidebar";
import GlobalStyles from "./UI/GlobalStyles/GlobalStyles";
import Toast from "./components/toast/Toast";
import SidePlayQueue from "./components/side-playqueue/SidePlayQueue";
import Explore from "./pages/Explore/Explore";
import MyMusic from "./pages/MyMusic/MyMusic";
import ZingChart from "./pages/ZingChart/ZingChart";
import Top100 from "./pages/Top100/Top100";
import NewReleases from "./pages/NewReleases/NewReleases";
function App() {
  const handleScrollingContent = (e) => {
    const header = document.querySelector(".header");
    header.classList.toggle("scrolling", e.target.scrollTop > 0);
  };

  return (
    <GlobalStyles>
      <div className="App">
        <div className="main-content">
          <Sidebar />
          <SidePlayQueue />
          <div className="content-container">
            <Header />
            {/* <button
              style={{
                backgroundColor: "white",
                cursor: "pointer",
                width: "100px",
                height: "20px",
              }}
            >
              Toast
            </button> */}
            <div className="content" onScroll={handleScrollingContent}>
              <Routes>
                <Route path="/" element={<Explore />} />
                <Route path="/my-music" element={<MyMusic />} />
                <Route path="/zing-chart" element={<ZingChart />} />
                <Route path="/top100" element={<Top100 />} />
                <Route path="/new-releases" element={<NewReleases />} />
              </Routes>
            </div>
          </div>
        </div>
        <Player />
      </div>
    </GlobalStyles>
  );
}

export default App;
