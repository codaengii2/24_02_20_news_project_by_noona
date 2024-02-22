const API_KEY = `710eb34de175489fa946051b323754b8`;
// let news = [];

// const getLatestNews = async () => {
//   const url = new URL(
//     `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
//   );
//   console.log("전송받은 url", url);
//   const response = await fetch(url);
//   //async , await 비동기적 처리를 하겠음
//   //데이터 실행하지 말고 좀 기다려줘
//   //await 을 읽어들이면서 async 구문을 일시정지 시킴
//   //Call Stack의 작업이 다 끝나면 async부터 다시 시작
//   // console.log("데이터", response);
//   // //=> pending(보류중) 아직 기다려줘(async, await 없을 때)

//   const data = await response.json();
//   // console.log("데이터", data.articles);
//   news = data.articles;
//   console.log("데이터", news);
// };

// getLatestNews();
// let articles = document.getElementById("article");
let hamBtn = document.querySelector(".menu-bars");
let moMenuWrap = document.querySelector(".mo-menu-wrap");
let moCloseBtn = document.querySelector(".close-btn");
let searchBtn = document.querySelector(".search-btn");
let searchModal = document.querySelector(".search-modal");
// let newsWrap = document.getElementById("news-wrap");
const menus = document.querySelectorAll(".menus button");
const searchInput = document.getElementById("searchInput");
const searchGo = document.getElementById("searchGo");
let newsList = [];

menus.forEach((menu) =>
  menu.addEventListener("click", (event) => getNewsByCategory(event))
);

searchGo.addEventListener("click", (event) => getNewsBySearch(event));
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    getNewsBySearch();
  }
});

const getNews = async () => {
  // const url = new URL(
  //   `http://times-node-env.eba-appvq3ef.ap-northeast-2.elasticbeanstalk.com/top-headlines`
  // );
  const url = new URL(`https://noona-news.netlify.app/top-headlines`);

  const response = await fetch(url);
  const data = await response.json();
  newsList = data.articles;
  render();
  console.log(newsList);
};

const getNewsByCategory = async (event) => {
  const category = event.target.textContent.toLowerCase();
  //텍스트 컨텐츠를 읽어주세요
  console.log(category);
  const url = new URL(
    `https://noona-news.netlify.app/top-headlines?category=${category}`
  );
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  newsList = data.articles;
  render();
};

const getNewsBySearch = async (event) => {
  const searchContent = searchInput.value;
  // console.log(searchContent);
  const url = new URL(
    `https://noona-news.netlify.app/top-headlines?q=${searchContent}`
  );
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  newsList = data.articles;
  render();
};

const imgError = (image) => {
  image.onerror = null;
  image.src =
    "https://i.pinimg.com/564x/19/ce/9a/19ce9a815a49e5fdd1b02d578bcb3e07.jpg";
};

const render = () => {
  // const dataNews = news.map((item, index) => {
  //   return `기사 ${index + 1} : ${item.title} <br/>`;
  // });
  // newsWrap.innerHTML = dataNews;

  // const dataNewsTitle = news.map((item) => {
  //   return item.description;
  // });
  // const dataNewsAuthor = news.map((item) => {
  //   return item.author;
  // });

  const newsHTML = newsList
    .map(
      (news) =>
        `
  <div class="row news"><div class="col-lg-4">
      <img
        class="news-img-size mb-2"
        src="${news.urlToImage}"
        alt="뉴스이미지" onerror = "imgError(this)"
      />
    </div>
    <div class="col-lg-8">
      <h2>${news.title}</h2>
      <p>${
        news.description == null || news.description == ""
          ? "내용없음"
          : news.description.length > 200
          ? news.description.slice(0, 200) + "..."
          : news.description
      }</p>
      <div>${news.source.name || "no source"} * ${moment(
          news.publishedAt
        ).fromNow()}</div>
    </div></div>
  `
    )
    .join("");
  document.getElementById("news-wrap").innerHTML = newsHTML;

  // for (let i = 0; i < news.length; i++) {
  //   newsWrap += `<div class="row news"><div class="col-lg-4">
  //     <img
  //       class="news-img-size"
  //       src="${
  //         news[i].urlToImage
  //           ? news[i].urlToImage
  //           : "https://i.pinimg.com/564x/19/ce/9a/19ce9a815a49e5fdd1b02d578bcb3e07.jpg"
  //       }"
  //       alt=""
  //     />
  //   </div>
  //   <div class="col-lg-8">
  //     <h2>${news[i].title}</h2>
  //     <p>${news[i].description + "..."}</p>
  //     <div>${news[i].author} * ${news[i].publishedAt.slice(0, 10)}</div>
  //   </div></div>`;
  // }
};

getNews();

//1. 버튼들 클릭이벤트
//2. 카테고리별 뉴스 가져오기
//3. 뉴스 보여주기

hamBtn.addEventListener("click", () => {
  moMenuWrap.style.left = 0;
});

moCloseBtn.addEventListener("click", () => {
  console.log(moCloseBtn);
  moMenuWrap.style.left = "-70%";
});

searchBtn.addEventListener("click", () =>
  searchModal.classList.toggle("active")
);
