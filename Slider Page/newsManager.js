function showYahooNews() {
  return new Promise((resolve, reject) => {
    if (getCookie("yahoo") !== "1" && getCookie("tmz") === "1") resolve("");

    let requestURL = "http://localhost:5000/api/news/yahoo";
    let request = new XMLHttpRequest();
    request.open("GET", requestURL, true);
    request.send();
    request.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        let newsList = JSON.parse(request.responseText);
        console.log(newsList);

        const slider = document.getElementById("slider");
        for (let i = 0; i < newsList.length; i++)
          if (newsList[i].length > 0)
            for (let j = 0; j < newsList[i].length; j++) {
              let image;
              if (
                newsList[i][j]["imageLink"].startsWith("https://s.yimg.com")
              ) {
                let oldImageLink = newsList[i][j]["imageLink"];
                let indexOfImage = oldImageLink.indexOf(
                  "https",
                  oldImageLink.indexOf("https") + 1
                );
                image = oldImageLink.substring(
                  indexOfImage,
                  oldImageLink.length
                );
              } else image = newsList[i][j]["imageLink"];

              slider.innerHTML +=
                '<div class="slide">\n' +
                '        <img src="' +
                image +
                '" alt="404">\n' +
                '        <div class="info">\n' +
                '            <a href="' +
                newsList[i][j]["readMoreLink"] +
                '">\n' +
                newsList[i][j]["title"] +
                "            </a>\n" +
                "            <p>" +
                "</p>";
              "        </div>\n" + "    </div>";
            }
        resolve("");
      }
    };
  });
}

function showTMZNews() {
  return new Promise((resolve, reject) => {
    if (getCookie("tmz") !== "1" && getCookie("yahoo") === "1") resolve("");

    let requestURL = "http://localhost:5000/api/news/tmz";
    let request = new XMLHttpRequest();
    request.open("GET", requestURL, true);
    request.send();
    request.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        let newsList = JSON.parse(request.responseText);
        console.log(newsList);

        const slider = document.getElementById("slider");
        for (let i = 0; i < newsList.length; i++)
          if (newsList[i].length > 0)
            for (let j = 0; j < newsList[i].length; j++) {
              let image;
              if (
                newsList[i][j]["imageLink"].startsWith("https://s.yimg.com")
              ) {
                let oldImageLink = newsList[i][j]["imageLink"];
                let indexOfImage = oldImageLink.indexOf(
                  "https",
                  oldImageLink.indexOf("https") + 1
                );
                image = oldImageLink.substring(
                  indexOfImage,
                  oldImageLink.length
                );
              } else image = newsList[i][j]["imageLink"];

              slider.innerHTML +=
                '<div class="slide">\n' +
                '        <img src="' +
                image +
                '" alt="404">\n' +
                '        <div class="info">\n' +
                '            <a href="' +
                newsList[i][j]["readMoreLink"] +
                '">\n' +
                newsList[i][j]["title"] +
                "            </a>\n" +
                "            <p>" +
                "</p>";
              "        </div>\n" + "    </div>";
            }
        resolve("");
      }
    };
  });
}

function addSliderControls() {
  document.getElementsByClassName("slide")[0].classList.add("active");

  document.getElementsByClassName("container")[0].remove();

  const imgSlider = document.getElementById("slider");
  imgSlider.innerHTML +=
    '<div class="navigation">\n' +
    '        <i class="fas fa-chevron-left prev-btn"></i>\n' +
    '        <i class="fas fa-chevron-right next-btn"></i>\n' +
    "    </div>";

  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const slides = document.querySelectorAll(".slide");
  const slider = document.querySelector(".slider");
  const numberOfSlides = slides.length;
  let indexSlide = 0;

  nextBtn.addEventListener("click", () => {
    slides[indexSlide].classList.remove("active");
    indexSlide++;

    if (indexSlide > numberOfSlides - 1) {
      indexSlide = 0;
    }

    slides[indexSlide].classList.add("active");
  });

  prevBtn.addEventListener("click", () => {
    slides[indexSlide].classList.remove("active");
    indexSlide--;

    if (indexSlide < 0) {
      indexSlide = numberOfSlides - 1;
    }

    slides[indexSlide].classList.add("active");
  });

  var autoplay;
  var play = () => {
    autoplay = setInterval(function () {
      slides[indexSlide].classList.remove("active");
      indexSlide++;

      if (indexSlide > numberOfSlides - 1) {
        indexSlide = 0;
      }

      slides[indexSlide].classList.add("active");
    }, 15000);
  };
  play();

  slider.addEventListener("mouseover", () => {
    clearInterval(autoplay);
  });

  slider.addEventListener("mouseout", () => {
    play();
  });
}

Promise.all([getYahooNews(), getTMZNews()]).then((r) => {
    addSliderControls();
})

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
