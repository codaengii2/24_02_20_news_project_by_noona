// const API_KEY = `710eb34de175489fa946051b323754b8`;
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
const hamBtn = document.querySelector(".menu-bars");
const moMenuWrap = document.querySelector(".mo-menu-wrap");
const moCloseBtn = document.querySelector(".close-btn");
const searchBtn = document.querySelector(".search-btn");
const searchModal = document.querySelector(".search-modal");
const topBtn = document.querySelector(".top_btn");
const menus = document.querySelectorAll(".menus button");
const moMenu = document.querySelectorAll(".mo-menu button");
const searchInput = document.getElementById("searchInput");
const searchGo = document.getElementById("searchGo");
let newsList = [];
let url = new URL(`https://noona-news.netlify.app/top-headlines`);
let totalResults = 0;
let page = 1;
let pageSize = 10;
let groupSize = 5;

hamBtn.addEventListener("click", () => {
  moMenuWrap.style.left = 0;
});

const closeHandler = () => {
  moMenuWrap.style.left = "-70%";
};

searchBtn.addEventListener("click", () =>
  searchModal.classList.toggle("active")
);

topBtn.addEventListener("click", () => {
  window.scrollTo(0, 0);
});

menus.forEach((menu) =>
  menu.addEventListener("click", (event) => getNewsByCategory(event))
);
moMenu.forEach((menu) =>
  menu.addEventListener("click", (event) => {
    getNewsByCategory(event);
    closeHandler();
  })
);

searchGo.addEventListener("click", (event) => getNewsBySearch(event));
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    getNewsBySearch();
  }
});

const addNewsRender = async () => {
  try {
    url.searchParams.set("page", page); // => &page=page
    url.searchParams.set("pageSize", pageSize); // =>&pageSize=pageSize
    //url 호출하기 전 추가할 params
    const response = await fetch(url);
    // console.log(response);
    const data = await response.json();
    console.log(data);
    if (response.status === 200) {
      if (data.articles.length === 0) {
        throw new Error(`${searchInput.value} 결과가 없습니다.`);
      }
      newsList = data.articles;
      totalResults = data.totalResults;
      render();
      paginationRender();
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    errorRender(error.message);
  }
};

const getNews = () => {
  // let url = new URL(
  //   `http://times-node-env.eba-appvq3ef.ap-northeast-2.elasticbeanstalk.com/top-headlines`
  // );
  url = new URL(`https://noona-news.netlify.app/top-headlines`);
  addNewsRender();
};

const getNewsByCategory = async (event) => {
  const category = event.target.textContent.toLowerCase();
  console.log(category);
  //텍스트 컨텐츠를 읽어주세요
  url = new URL(
    `https://noona-news.netlify.app/top-headlines?category=${category}`
  );
  addNewsRender();
};

const getNewsBySearch = async () => {
  const searchContent = searchInput.value;
  url = new URL(
    `https://noona-news.netlify.app/top-headlines?q=${searchContent}`
  );
  addNewsRender();
};

const imgError = (image) => {
  image.onerror = null;
  image.src =
    "https://i.pinimg.com/564x/19/ce/9a/19ce9a815a49e5fdd1b02d578bcb3e07.jpg";
};

const render = () => {
  const newsHTML = newsList
    .map(
      (news) =>
        `
  <div class="row news">
  <a href="${news.url}">
  <div class="col-lg-4">
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
    </div>
    </a>
    </div>
  `
    )
    .join("");
  document.getElementById("news-wrap").innerHTML = newsHTML;
};

const errorRender = (errorMessage) => {
  const errorHTML = `<div class="alert alert-danger" role="alert">
  ${errorMessage}
</div>`;
  document.getElementById("news-wrap").innerHTML = errorHTML;
};

const paginationRender = () => {
  //totalResult
  //page
  //pageSize
  //groupSize
  //totalGroup
  let totalPages = Math.ceil(totalResults / pageSize);

  //pageGroup
  let pageGroup = Math.ceil(page / groupSize);

  //lastPage
  let lastPage = pageGroup * groupSize;
  //마지막 페이지그룹이 그룹사이즈보다 작을경우 lastPage = tatalPage
  if (lastPage > totalPages) {
    lastPage = totalPages;
  }

  //firstPage
  let firstPage =
    lastPage - (groupSize - 1) <= 0 ? 1 : lastPage - (groupSize - 1);

  let paginationHTML = ``;

  if (firstPage >= 6) {
    paginationHTML = ` <li class="page-item" onClick="moveToPage(1)">
    <a class="page-link" href="#" aria-label="Previous">
      <span aria-hidden="true">&laquo;</span>
    </a>
  </li>
    <li class="page-item" onClick="moveToPage(${page - 1})">
    <a class="page-link" href="#" aria-label="Previous">
      <span aria-hidden="true">&lt;</span>
    </a>
  </li>`;
  }
  // &laquo; = <<
  // &lt; = <

  for (let i = firstPage; i <= lastPage; i++) {
    paginationHTML += `
    <li class="page-item ${
      i === page ? "active" : ""
    }" onClick="moveToPage(${i})"><a class="page-link" href="#">${i}</a></li>`;
  }

  if (lastPage < totalPages) {
    paginationHTML += ` <li class="page-item" onClick="moveToPage(${page + 1})">
    <a class="page-link" href="#" aria-label="Next">
      <span aria-hidden="true">&gt;</span>
    </a>
   </li><li class="page-item" onClick="moveToPage(${totalPages})">
   <a class="page-link" href="#" aria-label="Next">
     <span aria-hidden="true">&raquo;</span>
   </a>
   </li>`;
  }
  // &raquo; = >>
  // &gt; = >

  document.querySelector(".pagination").innerHTML = paginationHTML;
};

const moveToPage = (pageNum) => {
  console.log("moveToPage", pageNum);
  page = pageNum;
  addNewsRender();
};

getNews();
//1. 버튼들 클릭이벤트
//2. 카테고리별 뉴스 가져오기
//3. 뉴스 보여주기
moCloseBtn.addEventListener("click", closeHandler);
