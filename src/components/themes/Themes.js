import React from "react";
import "./Themes.css";
const themes_data = [
  {
    name: "Dynamic",
    items: [
      {
        themeName: "London",
        thumbnail:
          "https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/London-thumb.png",
      },
      {
        themeName: "Sáng tối",
        thumbnail:
          "https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/dynamic-light-dark-1.jpg",
      },
      {
        themeName: "Xanh da trời",
        thumbnail:
          "https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/dynamic-blue.jpg",
      },
      {
        themeName: "Hồng",
        thumbnail:
          "https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/dynamic-pink.jpg",
      },
      {
        themeName: "Nâu",
        thumbnail:
          "https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/dynamic-brown.jpg",
      },
    ],
  },
  {
    name: "Chủ đề",
    items: [
      {
        thumbnail:
          "https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/zma.jpg",
        themeName: "Zing music awards",
        bgImg:
          "https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme-background/zma.svg",
      },
      {
        thumbnail:
          "https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/eiffel.jpg",
        themeName: "Tháp Eiffel",
        bgImg:
          "https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme-background/eiffel.jpg",
      },
    ],
  },
  {
    name: "Nghệ sĩ",
    items: [
      {
        themeName: "Jack",
        thumbnail:
          "https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/jack.jpg",
        bgImg:
          "https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme-background/jack.jpg",
      },
      {
        themeName: "IU",
        thumbnail:
          "https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/iu.jpg",
        bgImg:
          "https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme-background/iu.jpg",
      },
      {
        themeName: "Ji Chang Wook",
        thumbnail:
          "https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/ji-chang-wook.jpg",
        bgImg:
          "https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme-background/ji-chang-wook.jpq",
      },
      {
        themeName: "Lisa",
        thumbnail:
          "https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/lisa.jpg",
        bgImg:
          "https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme-background/lisa.jpg",
      },
      {
        themeName: "Jennie Kim",
        thumbnail:
          "https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/jennie.jpg",
        bgImg:
          "https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme-background/jennie.jpg",
      },
      {
        themeName: "Jisoo",
        thumbnail:
          "https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/jisoo.jpg",
        bgImg:
          "https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme-background/jisoo.jpg",
      },
      {
        themeName: "Rosé",
        thumbnail:
          "https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/rose.jpg",
        bgImg:
          "https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme-background/rose.jpg",
      },
    ],
  },
  {
    name: "Màu tối",
    items: [
      {
        themeName: "Tối",
        thumbnail:
          "https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/dark.jpg",
      },
      {
        themeName: "Tím",
        thumbnail:
          "https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/purple.jpg",
      },
      {
        themeName: "Xanh đậm",
        thumbnail:
          "https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/blue.jpg",
      },
      {
        themeName: "Xanh biển",
        thumbnail:
          "https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/blue-light.jpg",
      },
      {
        themeName: "Xanh lá",
        thumbnail:
          "https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/green.jpg",
      },
      {
        themeName: "Nâu",
        thumbnail:
          "https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/brown.jpg",
      },
      {
        themeName: "Hồng",
        thumbnail:
          "https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/pink.jpg",
      },
      {
        themeName: "Đỏ",
        thumbnail:
          "https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/red.jpg",
      },
    ],
  },
  {
    name: "Màu sáng",
    items: [
      {
        thumbnail:
          "https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/light.jpg",
        themeName: "Sáng",
      },
      {
        thumbnail:
          "https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/gray.jpg",
        themeName: "Xám",
      },
      {
        thumbnail:
          "https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/green-light.jpg",
        themeName: "Xanh nhạt",
      },
      {
        thumbnail:
          "https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/pink-light.jpg",
        themeName: "Hồng cánh sen",
      },
    ],
  },
];
const Themes = ({ hideThemesPanel }) => {
  return (
    <div className="themes grid">
      <h1 className="themes__heading">Giao diện</h1>
      <div className="themes__container">
        <div className="themes__main with-scrollbar">
          {themes_data.map((theme_data, index) => (
            <div className="themes__group" key={index}>
              <h3 className="themes__group-name">{theme_data.name}</h3>
              <div className="row p-15">
                {theme_data.items.map((theme, themeIndex) => (
                  <div className="col p-15 l-2 m-3 c-4" key={themeIndex}>
                    <div
                      className={`themes__item ${
                        theme.themeName === "IU" ? "active" : ""
                      }`}
                    >
                      <div className="themes__img-preview zoom-in">
                        <img
                          src={theme.thumbnail}
                          alt={theme.themeName}
                          className="themes__img"
                        />
                        <div className="themes__buttons">
                          <div>
                            <button className="btn btn-1 btn-sm-text mw-100">
                              Áp dụng
                            </button>
                          </div>
                          <div>
                            <button className="btn btn-2 btn-sm-text mw-100">
                              Xem trước
                            </button>
                          </div>
                        </div>
                      </div>
                      <h5 className="themes__item-name">{theme.themeName}</h5>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Themes;
