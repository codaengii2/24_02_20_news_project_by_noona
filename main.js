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
let articles = document.getElementById("article");
let news = [];

const getNews = async () => {
  // const url = new URL(
  //   `http://times-node-env.eba-appvq3ef.ap-northeast-2.elasticbeanstalk.com/top-headlines`
  // );
  const url = new URL(`https://noona-news.netlify.app/top-headlines`);
  const response = await fetch(url);
  const data = await response.json();
  news = data.articles;
  console.log(news);
  const dataNews = news.map((item) => {
    return item.title + "<br/>";
  });
  articles.innerHTML = dataNews;
};

getNews();
