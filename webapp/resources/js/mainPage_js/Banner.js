// 슬라이드 너비 호출
const slide = document.querySelector(".slide");
let slideWidth = slide.clientWidth;

// 버튼 엘리먼트 호출
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

// 슬라이드 전체 호출
let slideItems = document.querySelectorAll("#item");
const maxSlide = slideItems.length;

//현재 슬라이드 변수
let currSlide = 1;

//start, end 무한 슬라이드 배열 생성
const startSlide = slideItems[0];
const endSlide = slideItems[slideItems.length - 1];
const startElem = document.createElement("div");
const endElem = document.createElement("div");

// endSlide의 모든 클래스를 endElem에 추가
// 배열 안의 클래스를 endslide에 저장
endSlide.classList.forEach((c) => endElem.classList.add(c));
endElem.innerHTML = endSlide.innerHTML;

startSlide.classList.forEach((c) => startElem.classList.add(c));
startElem.innerHTML = startSlide.innerHTML;

// 첫 번째 슬라이드 앞에 endElem 추가
slideItems[0].before(endElem);

// 마지막 슬라이드 뒤에 startElem 추가
slideItems[slideItems.length - 1].after(startElem);

// "item" id를 가진 모든 요소를 선택
slideItems = document.querySelectorAll("#item");

// 현재 슬라이드의 위치를 계산
let offset = slideWidth + currSlide;

//foreach를 사용해 슬라이드 아이템의 left에 offset 적용
//현재 슬라이드가 음수이기 때문에 왼쪽으로 이동
slideItems.forEach((i) => {
  i.setAttribute("style", `left: ${-offset}px`);
});

//다음 슬라이드로 이동하는 함수
function nextMove() {
//현재 슬라이드 증가
  currSlide++;
  //현재 슬라이드가 전체 슬라이드 갯수보다 작거나 같을 때
  if (currSlide <= maxSlide) {
    //슬라이드 아이템의 left에 offset 적용
    const offset = slideWidth * currSlide;
    slideItems.forEach((i) => {
      i.setAttribute("style", `left: ${-offset}px`);
    });

    //active 클래스 초기화 active = 현재 슬라이드
    paginationItems.forEach((i) => i.classList.remove("active"));
    // 현재 슬라이드에 해당하는 페이징 항목에 active 클래스 추가
    paginationItems[currSlide - 1].classList.add("active");
  } else {
    // 무한 슬라이드 기능
    currSlide = 0;
    let offset = slideWidth * currSlide;
    slideItems.forEach((i) => {
      i.setAttribute("style", `transition: ${0}s; left: ${-offset}px`);
    });

    currSlide++;
    offset = slideWidth * currSlide;

    setTimeout(() => {
        //슬라이드 아이템들에 transition 속성, offset 적용
        slideItems.forEach((i) => {
          i.setAttribute("style", `transition: ${0.15}s; left: ${-offset}px`);
        });
      }, 0);
    }
}

//이전 슬라이드로 이동하는 함수
function prevMove() {
  currSlide--;
    // 현재 슬라이드가 0보다 클 때
  if (currSlide > 0) {
    const offset = slideWidth * currSlide;
   // 각 슬라이드 아이템의 left에 offset 적용
    slideItems.forEach((i) => {
      i.setAttribute("style", `left: ${-offset}px`);
    });
  } else {
    currSlide = maxSlide + 1;
    let offset = slideWidth * currSlide;
    slideItems.forEach((i) => {
      i.setAttribute("style", `transition: ${0}s; left: ${-offset}px`);
    });

    // 현재 슬라이드 감소
    currSlide--;
    // 슬라이드 이동을 위한 offset 계산
    //offset = 현재 슬라이드 위치
    offset = slideWidth * currSlide;

    // 0초 뒤에 트랜지션, offset 적용
    setTimeout(() => {
      slideItems.forEach((i) => {
        i.setAttribute("style", `transition: ${0.15}s; left: ${-offset}px`);
      });
    }, 0);
  }
}

//다음 버튼 늘릴경우 페이지 이동
nextBtn.addEventListener("click", () => {
  nextMove();
});

//이전 버튼 누를 경우 페이지 이동
prevBtn.addEventListener("click", () => {
  prevMove();
});


// 브라우저 창의 크기가 변경될 때마다 이벤트 리스너 추가
window.addEventListener("resize", () => {
    // 슬라이드의 너비 업데이트
    slideWidth = slide.clientWidth;
  });


// PC 드래그 이벤트를 위한 변수 초기화
let startPoint = 0;
let endPoint = 0;

// 마우스 드래그 이벤트
slide.addEventListener("mousedown", (e) => {
    // 마우스 드래그 위치 저장
  startPoint = e.pageX;
});

slide.addEventListener("mouseup", (e) => {
    //마우스 끝 위치 저장
  endPoint = e.pageX;
    //오른쪽으로 드래그 된 경우
  if (startPoint < endPoint) {
    prevMove();
    //왼쪽으로 드래그 된 경우
  } else if (startPoint > endPoint) {
    nextMove();
  }
});

//모바일 사이즈 드래그 (터치 이벤트)
slide.addEventListener("touchstart", (e) => {
    //터치 위치 저장
  startPoint = e.touches[0].pageX;
});
slide.addEventListener("touchend", (e) => {
    // 터치가 끝나는 위치 저장
  endPoint = e.changedTouches[0].pageX;
  //오른쪽으로 클릭 된 경우
  if (startPoint < endPoint) {
    prevMove();
//왼쪽으로 클릭 된 경우
  } else if (startPoint > endPoint) {
    nextMove();
  }
});

//3초마다 nextMove 함수 호출하여 무한반복
let loopInterval = setInterval(() => {
  nextMove();
}, 3000);

// 슬라이드에 마우스가 올라간 경우 루프 멈추기
slide.addEventListener("mouseover", () => {
  clearInterval(loopInterval);
});

// 슬라이드에서 마우스가 나온 경우 루프 재시작
slide.addEventListener("mouseout", () => {
  loopInterval = setInterval(() => {
    nextMove();
  }, 3000);
});