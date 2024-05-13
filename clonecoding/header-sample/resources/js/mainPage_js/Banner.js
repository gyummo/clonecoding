/* 부트스트랩을 찾아봤는데 수정하기가 불편해서 
구글링으로 찾아온 코드 가져와서 수정함..*/

const slide = document.querySelector(".slide");
let slideWidth = slide.clientWidth;

let slideItems = document.querySelectorAll(".slide_item");
const maxSlide = slideItems.length;

let currSlide = 1;

/* 페이지네이션 생성*/ 
const pagination = document.querySelector(".slide-button");

for (let i = 0; i < maxSlide; i++) {
  if (i === 0) pagination.innerHTML += `<li class="active">•</li>`;
  else pagination.innerHTML += `<li>•</li>`;
}

/* 무한 슬라이드 배열 생성 */
const startSlide = slideItems[0];
const endSlide = slideItems[slideItems.length - 1];
const startElem = document.createElement("div");
const endElem = document.createElement("div");

endSlide.classList.forEach((c) => endElem.classList.add(c));
endElem.innerHTML = endSlide.innerHTML;

startSlide.classList.forEach((c) => startElem.classList.add(c));
startElem.innerHTML = startSlide.innerHTML;

slideItems[0].before(endElem);
slideItems[slideItems.length - 1].after(startElem);

/* 슬라이드 값 설정 */
slideItems = document.querySelectorAll(".slide_item");
let offset = slideWidth + currSlide;
slideItems.forEach((i) => {
  i.setAttribute("style", `left: ${-offset}px`);
});

window.addEventListener("resize", () => {
  slideWidth = slide.clientWidth;
});

/*페이지 이동*/
function nextMove() {
  if (currSlide < maxSlide) {
    currSlide++;
  } else {
    currSlide = 1;
  }
  offset = slideWidth * currSlide;
  slideItems.forEach((i) => {
    i.setAttribute("style", `left: ${-offset}px`);
  });
}

function prevMove() {
  if (currSlide > 1) {
    currSlide--;
  } else {
    currSlide = maxSlide;
  }
  offset = slideWidth * currSlide;
  slideItems.forEach((i) => {
    i.setAttribute("style", `left: ${-offset}px`);
  });
}

/* 드래그 */
let startPoint = 0;
let endPoint = 0;

/* PC 드래그 */
slide.addEventListener("mousedown", (e) => {
  startPoint = e.pageX;
});

slide.addEventListener("mouseup", (e) => {
  endPoint = e.pageX;
  if (startPoint < endPoint) {
    prevMove();
  } else if (startPoint > endPoint) {
    nextMove();
  }
});

/* 모바일 드래그*/
slide.addEventListener("touchstart", (e) => {
  startPoint = e.touches[0].pageX;
});
slide.addEventListener("touchend", (e) => {
  endPoint = e.changedTouches[0].pageX;
  if (startPoint < endPoint) {
    prevMove();
  } else if (startPoint > endPoint) {
    nextMove();
  }
});

/*슬라이드 루프*/
let loopInterval = setInterval(() => {
  nextMove();
}, 3000);


slide.addEventListener("mouseover", () => {
  clearInterval(loopInterval);
});

slide.addEventListener("mouseout", () => {
  loopInterval = setInterval(() => {
    nextMove();
  }, 3000);
});