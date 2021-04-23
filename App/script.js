const startButton = document.querySelector("#start-btn");
const nextButton = document.querySelector("#next-btn");
const questionContainerElement = document.querySelector("#question-container");
const questionElement = document.querySelector("#question");
const answerButtonsElement = document.querySelector("#answer-button");
const scoreField = document.querySelector("#score");

let answerField = document.querySelectorAll(".btn");
let currentQuestionIndex = 0;
let total_score = 0;

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  clearStatusClass(document.body);
  answerField.forEach((element) => {
    while (element !== startButton) {
      element.classList.remove("hide");
      turnOffHover(element, false);
      break;
    }

    clearStatusClass(element);
    element.disabled = false;
  });

  currentQuestionIndex += 1;

  showQuestion();
  resetState();
});

function startGame() {
  total_score = 0;
  set = prompt("Enter the set you want to do");
  //set = Math.floor(Math.random() * 12);
  console.log(set);
  let actualSet = set + 1;
  //alert(
  "This is set " +
    actualSet +
    "." +
    "\n" +
    "If you want to move to another set,please hit OK and then refresh the Website " +
    "\n" +
    "Enjoy !!!" +
    "\n" +
    "Author: Chinh Pham";
  //);
  clearStatusClass(document.querySelector("body"), true);
  scoreField.classList.add("hide");
  answerField.forEach((element) => {
    clearStatusClass(element);
    element.disabled = false;
    turnOffHover(element, false);
  });
  startButton.classList.add("hide");
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  showQuestion();
}

function resetState() {
  nextButton.classList.add("hide");
}

function showQuestion() {
  question_container = questions[set];
  question_data = question_container[currentQuestionIndex];
  questionElement.innerHTML = question_data.question;

  for (let i = 0; i < 4; i++) {
    answerField[i].innerHTML = question_data[getQuestionIndex(i + 1)];
    if (answerField[i].innerHTML === "") {
      answerField[i].classList.add("hide");
    }
    answerField[i].addEventListener("click", selectAnswer);
  }
}

function getQuestionIndex(x) {
  s = "answer" + x;
  return s;
}

function selectAnswer(e) {
  const selectedButton = e.target;

  if (selectedButton.innerHTML === question_data.correct) {
    console.log("good");
    setStatusClass(document.body, true);
    setStatusClass(selectedButton, true);
    total_score += 1;
    console.log(total_score);
  } else {
    console.log("Bad");
    setStatusClass(selectedButton, false);
    setStatusClass(document.body, false);
  }

  // answerField.forEach((element) => {
  //   if (element.innerHTML === question_data.correct) {
  //     setStatusClass(element, true);
  //   }
  //   element.disabled = true;
  // });

  for (let i = 0; i < 4; i++) {
    if (answerField[i].innerHTML === question_data.correct) {
      setStatusClass(answerField[i], true);
    }
    answerField[i].disabled = true;
    turnOffHover(answerField[i], true);
  }

  if (question_container.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    scoreField.innerHTML = "Congrats. You got " + total_score;
    scoreField.classList.remove("hide");
    startButton.innerHTML = "Reset";
    startButton.classList.remove("hide");
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

function turnOffHover(element, conditon) {
  // if true, turn off hovering
  if (conditon) {
    element.classList.add("hover-off");
  } else {
    element.classList.remove("hover-off");
  }
}

/**
 *  Raw data here. I choose this way :)
 */

const questions = [
  [
    {
      question:
        "Câu 1: Theo quan điểm của chủ nghĩa duy vật biện chứng, vận động là gì? ",
      answer1: "Sự trao đổi chất với môi trường",
      answer2: "Sự biến đổi nói chung.",
      answer3: "Sự biến đổi từ lượng sang chất",
      answer4: "Thay đổi vị trí trong không gian.",
      correct: "Sự biến đổi nói chung.",
    },
    {
      question:
        "Câu 2: Theo quan điểm duy vật biện chứng, hình thức phản ánh đặc trưng cho giới tự nhiên vô cơ là gì?",
      answer1: "Tính kích thích",
      answer2: "Các phản xạ",
      answer3: "Tính cảm ứng",
      answer4: "Phản ánh lý-hóa",
      correct: "Phản ánh lý-hóa",
    },
    {
      question:
        "Câu 3: Luận điểm sau đây thuộc về trường phái triết học nào?: “Tồn tại tức là được cảm giác”",
      answer1: "Duy vật biện chứng",
      answer2: "Duy vật siêu hình",
      answer3: "Duy tâm chủ quan",
      answer4: "Duy tâm khách quan",
      correct: "Duy tâm chủ quan",
    },
    {
      question:
        "Câu 4: Hãy chỉ ra mệnh đề đúng theo quan điểm của chủ nghĩa duy vật biện chứng?",
      answer1: "Động vật bậc cao cũng có ý thức.",
      answer2: "Con người có thể tạo ra người máy có ý thức.",
      answer3: "Một số dạng vật chất có ý thức.",
      answer4: "Chỉ con người mới có ý thức",
      correct: "Chỉ con người mới có ý thức",
    },
    {
      question:
        "Câu 5: Quan niệm chủ nghĩa duy vật thời cổ đại về vật chất có đặc điểm chung là: Đồng nhất vật chất nói chung với... ",
      answer1: "Nguyên tử.",
      answer2: "Khối lượng.",
      answer3: "Chỉ con người mới có ý thức.",
      answer4: "Sự vật cảm tính.",
      correct: "Sự vật cảm tính.",
    },
    {
      question:
        "Câu 6: Theo cách phân chia các hình thức vận động của Ăngghen, thì hình thức vận động vật lý bao hàm trong nó hình thức vận động nào?",
      answer1: "Vận động sinh học",
      answer2: "Vận động xã hội",
      answer3: "Vận động hoá học",
      answer4: "Vận động cơ học",
      correct: "Vận động cơ học",
    },
    {
      question:
        "Câu 7: Tiền đề lý luận hình thành thế giới quan và phương pháp luận triết học Mác?",
      answer1: "Triết học cận đại",
      answer2: "Triết học trung đại",
      answer3: "Triết học cổ điển Đức",
      answer4: "Triết học cổ đại",
      correct: "Triết học cổ điển Đức",
    },
    {
      question:
        "Câu 8: Tư tưởng triết gia nào tạo bước chuyển cho Mác từ duy tâm sang duy vật?",
      answer1: "Phoiơbắc",
      answer2: "Hêghen",
      answer3: "Kant",
      answer4: "Arixtốt",
      correct: "Phoiơbắc",
    },
    {
      question:
        "Câu 9: Mác đã kế thừa những giá trị duy vật của triết gia nào? ",
      answer1: "Hêghen",
      answer2: "Phoiơbắc",
      answer3: "Arixtốt",
      answer4: "Kant",
      correct: "Phoiơbắc",
    },
    {
      question:
        "Câu 10: Hãy chỉ ra mệnh đề đúng theo quan điểm của chủ nghĩa duy vật biện chứng?",
      answer1: "Chỉ con người mới có ý thức",
      answer2: "Một số dạng vật chất có ý thức",
      answer3: "Con người có thể tạo ra người máy có ý thức.",
      answer4: "Động vật bậc cao cũng có ý thức.",
      correct: "Chỉ con người mới có ý thức",
    },
    {
      question:
        " Câu 11: Phạm trù vật chất theo triết học Mác- Lênin được hiểu là",
      answer1: "thế giới khách quan gồm tự nhiên và xã hội",
      answer2: "thế giới vật chất tồn tại khách quan",
      answer3: "hình thức phản ánh đối lập với thế giới khách quan",
      answer4: "sự khái quát thế giới khách quan vào trong nhận thức con người",
      correct: "sự khái quát thế giới khách quan vào trong nhận thức con người",
    },
    {
      question:
        "Câu 12: Trường phái triết học nào cho rằng không gian thời gian là những thực thể độc lập, không phụ thuộc vào vật chất?",
      answer1: "Chủ nghĩa duy vật tầm thường",
      answer2: "Chủ nghĩa duy vật siêu hình",
      answer3: "Chủ nghĩa duy vật tự phát",
      answer4: "Chủ nghĩa duy vật biện chứng",
      correct: "Chủ nghĩa duy vật siêu hình",
    },
    {
      question: "Câu 13: Theo quan điểm của Triết học duy tâm, Ý thức là",
      answer1: "thuộc tính của mọi dạng vật chất",
      answer2: "sản phẩm của bộ não người",
      answer3: "thuộc tính của bộ não người",
      answer4: "thực thể có đời sống độc lập",
      correct: "thực thể có đời sống độc lập",
    },
    {
      question:
        "Câu 14: Sự tái tạo những đặc điểm của một hệ thống vật chất này ở một hệ thống vật chất khác trong  quá trình tác động qua lại của chúng gọi là gì? ",
      answer1: "Chuyển hoá",
      answer2: "Liên hệ.",
      answer3: "Phản ánh.",
      answer4: "Biến đổi",
      correct: "Phản ánh.",
    },
    {
      question:
        "Câu 15: Chủ nghĩa duy vật siêu hình là đặc trưng của của triết học thời kỳ nào?",
      answer1: "Triết học Ấn Độ cổ đại",
      answer2: "Triết học Tây Âu cận đại",
      answer3: "Triết học Trung Hoa cổ đại",
      answer4: "Triết học Hy Lạp cổ đại",
      correct: "Triết học Tây Âu cận đại",
    },
    {
      question:
        " Câu 16: Nhà triết học nào cho rằng “Thế giới ý niệm có trước thế giới vật chất và sinh ra thế giới vật chất” ?",
      answer1: "Đêmôcrít",
      answer2: "Arixtốt",
      answer3: "Hêraclít",
      answer4: "Platôn",
      correct: "Platôn",
    },
    {
      question:
        "Câu 17: Hệ thống quan niệm của con người về thế giới, về con người và vai trò con người trong thế giới đó, gọi là gì? ",
      answer1: "Lý luận",
      answer2: "Khoa học",
      answer3: "Thế giới quan",
      answer4: "Nhân sinh quan",
      correct: "Thế giới quan",
    },
    {
      question:
        "Câu 18: Cơ sở  phân chia triết học thành Chủ nghĩa duy vật  và Chủ nghĩa duy tâm là dựa trên cách giải quyết",
      answer1: "vấn đề cơ bản của triết học",
      answer2: "mặt thứ nhất vấn đề cơ bản của triết học",
      answer3: "nhân sinh quan của các nhà triết học",
      answer4: "mặt thứ hai vấn đề cơ bản của triết học",
      correct: "mặt thứ nhất vấn đề cơ bản của triết học",
    },
    {
      question:
        "Câu 19: Luận điểm chủ nghĩa duy vật biện chứng về không gian  và thời gian ?",
      answer1: "Không gian và thời gian là hình thức tồn tại của vật chất",
      answer2: "Không gian và thời gian là sản phẩm tư duy",
      answer3: "Không gian chứa các sự vật, thời gian chứa các sự kiện",
      answer4: "Không gian và thời gian không phụ thuộc vật chất",
      correct: "Không gian và thời gian là hình thức tồn tại của vật chất",
    },
    {
      question: "Câu 20: Chủ nghĩa Mác-Lênin cấu thành từ mấy bộ phận?",
      answer1: "3",
      answer2: "2",
      answer3: "4",
      answer4: "5",
      correct: "3",
    },
  ], // end set 1

  // set 2
  [
    {
      question:
        "Câu 1: Chủ nghĩa Mác được hình thành vào giai đoạn lịch sử nào? ",
      answer1: "Những năm bốn mươi của thế kỷ XVII",
      answer2: "Những năm bốn mươi của thế kỷ XVIII",
      answer3: "Những năm bốn mươi của thế kỷ XIX",
      answer4: "Những năm bốn mươi của thế kỷ XX",
      correct: "Những năm bốn mươi của thế kỷ XIX",
    },
    {
      question:
        "Câu 2: Tiền đề lý luận hình thành thế giới quan và phương pháp luận triết học Mác? ",
      answer1: "Triết học cổ điển Đức",
      answer2: "Triết học cổ đại",
      answer3: "Triết học trung đại",
      answer4: "Triết học cận đại",
      correct: "Triết học cổ điển Đức",
    },
    {
      question:
        "Câu 3: Tư tưởng triết gia nào tạo bước chuyển cho Mác từ duy tâm sang duy vật?",
      answer1: "Arixtốt",
      answer2: "Kant",
      answer3: "Hêghen",
      answer4: "Phoiơbắc",
      correct: "Phoiơbắc",
    },
    {
      question:
        "Câu 4: Thành tựu khoa học nào đã bác bỏ quan điểm siêu hình và thần học về vai trò Đấng tối cao? ",
      answer1: "Cả ba phát minh trên",
      answer2: "Thuyết tiến hóa",
      answer3: "Thuyết tế bào",
      answer4: "Quy luật bảo toàn và chuyển hóa năng lượng",
      correct: "Cả ba phát minh trên",
    },
    {
      question:
        "Câu 5: Mác đã kế thừa những giá trị biện chứng duy tâm của triết gia nào?",
      answer1: "Shelling",
      answer2: "Phoiơbắc",
      answer3: "Kant",
      answer4: "Hêghen",
      correct: "Hêghen",
    },
    {
      question: "Câu 6: Chủ nghĩa Mác-Lênin cấu thành từ mấy bộ phận? ",
      answer1: "Ba bộ phận",
      answer2: "Bốn bộ phận",
      answer3: "Năm bộ phận",
      answer4: "Hai bộ phận",
      correct: "Ba bộ phận",
    },
    {
      question: "Câu 7: Triết học ra đời trong xã hội nào? ",
      answer1: "Tư bản chủ nghĩa",
      answer2: "Chiếm hữu nô lệ",
      answer3: "Phong kiến",
      answer4: "Công xã nguyên thủy",
      correct: "Chiếm hữu nô lệ",
    },
    {
      question:
        "Câu 8: Hệ thống quan niệm của con người về thế giới, về con người và vai trò con người trong thế giới đó, gọi là gì?",
      answer1: "Lý luận",
      answer2: "Khoa học",
      answer3: "Thế giới quan",
      answer4: "Nhân sinh quan",
      correct: "Thế giới quan",
    },
    {
      question:
        "Câu 9: Học thuyết triết học phản ánh quan điểm duy vật biện chứng của người Trung Hoa cổ đại?",
      answer1: "Âm-Dương",
      answer2: "Đạo Gia",
      answer3: "Nho Gia",
      answer4: "Pháp Gia",
      correct: "Âm-Dương",
    },
    {
      question:
        "Câu 10: Nhà triết học nào cho rằng  “Thế giới ý niệm có trước thế giới vật chất và sinh ra thế giới vật chất”",
      answer1: "Hêraclít",
      answer2: "Arixtốt",
      answer3: "Platôn",
      answer4: "Đêmôcrít",
      correct: "Platôn",
    },
    {
      question:
        "Câu 11: Khi nói vật chất là cái được cảm giác của chúng ta chép lại, chụp lại, phản ánh, về mặt nhận thức luận Lênin muốn khẳng định điều gì? ",
      answer1: "Ý thức phụ thuộc vào vật chất",
      answer2: "Ý thức có khả năng phản ánh đúng thế giới",
      answer3: "Vật chất là tính thứ nhất và ý thức là tính thứ hai",
      answer4: "Ý thức chỉ là sự sao chép thế giới vật chất",
      correct: "Ý thức có khả năng phản ánh đúng thế giới",
    },
    {
      question:
        "Câu 12: Người đưa ra định nghĩa hoàn chỉnh về vật chất là ai? ",
      answer1: "Các Mác",
      answer2: "Ăngghen",
      answer3: "Lênin",
      answer4: "CP",
      correct: "Lênin",
    },
    {
      question:
        "Câu 13: Lênin khái quát đặc tính quan trọng nhất của vật chất để phân biệt với ý thức, đó là đặc tính gì?",
      answer1: "Chủ quan",
      answer2: "Khách quan",
      answer3: "Phản ánh",
      answer4: "Cảm giác",
      correct: "Khách quan",
    },
    {
      question:
        "Câu 14: Hoàn thành định nghĩa vật chất của Leenin : “Vật chất là phạm trù triết học dùng để chỉ………….…. được đem lại cho con người trong cảm giác”. ",
      answer1: "thực tế khách quan",
      answer2: "hiện thực khách quan",
      answer3: "vật thể khách quan",
      answer4: "thực tại khách quan",
      correct: "thực tại khách quan",
    },
    {
      question:
        "Câu 15: Hãy chỉ ra một mệnh đề sai theo quan điểm của chủ nghĩa duy vật biện chứng.",
      answer1: "Vận động cao xuất hiện trên cơ sở vận động thấp",
      answer2: "Các hình thức vận động khác nhau về chất",
      answer3: "Mỗi hình thức vận động ứng với một kết cấu vật chất",
      answer4: "Mỗi một sự vật gắn với một hình thức vận động",
      correct: "Mỗi một sự vật gắn với một hình thức vận động",
    },
    {
      question:
        "Câu 16: Theo triết học Mác-Lênin, luận đề: “Không có đứng im tương đối thì không có sự vật nào tồn tại cả”  đúng hay sai? ",
      answer1: "",
      answer2: "Đúng",
      answer3: "Sai",
      answer4: "",
      correct: "Đúng",
    },
    {
      question:
        "Câu 17: Theo quan điểm của chủ nghĩa duy vật, động vật có thể đạt tới hình thức phản ánh nào? ",
      answer1: "Tâm lý",
      answer2: "Cảm ứng",
      answer3: "Ý thức",
      answer4: "Sao chép",
      correct: "Tâm lý",
    },
    {
      question:
        "Câu 18: Khi hai sự vật tác động qua lại làm xuất hiện sự phản ánh và trình độ phản ánh về cơ bản phụ thuộc vào yếu tố nào? ",
      answer1: "Cấu trúc vật tác động",
      answer2: "Cấu trúc vật nhận tác động",
      answer3: "Cả vật tác động và vật nhận tác động",
      answer4: "",
      correct: "Cấu trúc vật nhận tác động",
    },
    {
      question:
        "Câu 19: Chọn câu trả lời đúng nhất: Theo quan điểm Chủ nghĩa duy vật biện chứng. Ý thức…",
      answer1: "tồn tại không phụ thuộc vào não người",
      answer2: "là sản phẩm của mọi dạng vật chất",
      answer3: "là sản phẩm tinh thần của não người",
      answer4: "là sản phẩm vật chất của não người",
      correct: "là sản phẩm tinh thần của não người",
    },
    {
      question: "Câu 20: Nguồn gốc sâu xa của ngôn ngữ là gì? ",
      answer1: "Nhu cầu giao tiếp",
      answer2: "Lao động",
      answer3: "Ngẫu nhiên",
      answer4: "Sáng tạo chủ quan",
      correct: "Lao động",
    },
  ],
  // set 3
  [
    {
      question:
        "Câu 1: Nhà triết học nào cho rằng “Thế giới ý niệm có trước thế giới vật chất và sinh ra thế giới vật chất” ? ",
      answer1: "Hêraclít",
      answer2: "Arixtốt",
      answer3: "Platôn",
      answer4: "Đêmôcrít",
      correct: "Platôn",
    },
    {
      question:
        "Câu 2: Chủ nghĩa duy vật siêu hình là đặc trưng của của triết học thời kỳ nào? ",
      answer1: "Triết học Tây Âu cận đại",
      answer2: "Triết học Ấn Độ cổ đại",
      answer3: "Triết học Trung Hoa cổ đại",
      answer4: "Triết học Hy Lạp cổ đại",
      correct: "Triết học Tây Âu cận đại",
    },
    {
      question: "Câu 3: Triết học Hêghen có tính chất gì? ",
      answer1: "Duy vật biện chứng",
      answer2: "Duy tâm khách quan",
      answer3: "Duy vật siêu hình",
      answer4: "Duy tâm chủ quan",
      correct: "Duy tâm khách quan",
    },
    {
      question:
        "Câu 4: Theo quan điểm Duy vật biện chứng, có thể đồng nhất vật chất với vật thể không? ",
      answer1: "Có",
      answer2: "",
      answer3: "",
      answer4: "Không",
      correct: "Không",
    },
    {
      question:
        "Câu 5: Đồng nhất vật chất với khối lượng là quan niệm của triết học nào? ",
      answer1: "Chủ nghĩa duy vật thời Phục hưng",
      answer2: "Chủ nghĩa duy vật Cận đại",
      answer3: "Chủ nghĩa duy vật Cổ đại",
      answer4: "Chủ nghĩa duy vật Hiện đại",
      correct: "Chủ nghĩa duy vật Cận đại",
    },
    {
      question:
        "Câu 6: Theo Chủ nghĩa duy vật biện chứng, yếu tố đầu tiên đảm bảo sự tồn tại của con người là gì?",
      answer1: "Sản xuất vật chất",
      answer2: "Nghiên cứu khoa học",
      answer3: "Hoạt động chính trị",
      answer4: "Xây dựng pháp luật",
      correct: "Sản xuất vật chất",
    },
    {
      question:
        "Câu 7: Theo Chủ nghĩa duy vật biện chứng, yếu tố đầu tiên đảm bảo sự tồn tại của con người là gì? ",
      answer1: "Lao động của con người mang tính tập thể",
      answer2: "Trong lao động, con người giao tiếp bằng ngôn ngữ",
      answer3: "Con người biết chế tạo và sử dụng công cụ lao động",
      answer4: "Lao động của con người làm biến đổi thế giới",
      correct: "Con người biết chế tạo và sử dụng công cụ lao động",
    },
    {
      question:
        "Câu 8: Yếu tố nào là hạt nhân và phương thức tồn tại của ý thức?",
      answer1: "Cảm giác",
      answer2: "Tiềm thức",
      answer3: "Tự ý thức",
      answer4: "Tri thức",
      correct: "Tri thức",
    },
    {
      question:
        "Câu 9: Theo Chủ nghĩa duy vật biện chứng, nhận định nào dưới đây là không chính xác? ",
      answer1: "Ý thức ra đời trong lao động",
      answer2: "Ý thức phản ánh sáng tạo thế giới",
      answer3: "Ý thức phản ánh đúng thế giới",
      answer4: "Ý thức là sản phẩm xã hội",
      correct: "Ý thức phản ánh đúng thế giới",
    },
    {
      question:
        "Câu 10: Để phán ánh khái quát hiện thực khách quan và trao đổi tư tưởng con người cần phương tiện gì? ",
      answer1: "Công cụ lao động",
      answer2: "Các giác quan",
      answer3: "Tri thức",
      answer4: "Ngôn ngữ",
      correct: "Ngôn ngữ",
    },
    {
      question: "Câu 11: Hãy chỉ ra một mệnh đề sai: Ngôn ngữ là… ",
      answer1: "Hiện thực của tư tưởng",
      answer2: "Hiện tượng tinh thần",
      answer3: "Hệ thống tín hiệu thứ hai",
      answer4: "Cái vỏ vật chất của tư duy",
      correct: "Hiện tượng tinh thần",
    },
    {
      question:
        "Câu 12: Chủ nghĩa duy vật biện chứng chỉ ra rằng ý thức muốn tác động tới hiện thực phải thông qua lực lượng vật chất. Lực lượng vật chất đó là gì? ",
      answer1: "Nghiên cứu khoa học",
      answer2: "Nhận thức lý luận",
      answer3: "Hoạt động văn hóa xã hội",
      answer4: "Lao động sản xuất",
      correct: "Lao động sản xuất",
    },
    {
      question:
        "Câu 13: Mác và Ăngghen đã kế thừa trực tiếp triết học của ai? ",
      answer1: "Can-tơ và Phơbách",
      answer2: "Hêghen và Phơbách",
      answer3: "Hêghen và Phích-tơ.",
      answer4: "Hêghen và Phơbách",
      correct: "Hêghen và Phơbách",
    },
    {
      question:
        "Câu 14: Ai là người khởi xướng Phép biện chứng duy tâm cổ điển Đức? ",
      answer1: "Kant",
      answer2: "Hêghen",
      answer3: "Senling",
      answer4: "Phoiơbách",
      correct: "Hêghen",
    },
    {
      question:
        "Câu 15: Dựa trên cơ sở lý luận nào Đảng ta rút ra bài học: “Mọi đường lối, chủ trương của Đảng phải xuất phát từ thực tế, tôn trọng quy luật khách quan”? ",
      answer1: "Mối quan hệ lượng chất",
      answer2: "Vật chất quyết định ý thức",
      answer3: "Mối liên hệ phổ biến",
      answer4: "Sự phát triển",
      correct: "Vật chất quyết định ý thức",
    },
    {
      question: "Câu 16: Cơ sở lý luận của quan điểm toàn diện là…",
      answer1: "phương pháp biện chứng",
      answer2: "lý luận nhận thức",
      answer3: "nguyên lý về mối liên hệ phổ biến",
      answer4: "nguyên lý về sự phát triển",
      correct: "nguyên lý về mối liên hệ phổ biến",
    },
    {
      question:
        "Câu 17: Chủ nghiã duy vật biện chứng cho rằng, sự phát triển theo khuynh hướng…..? ",
      answer1: "đường thẳng",
      answer2: "đường xoáy ốc",
      answer3: "không xác định",
      answer4: "vòng tròn",
      correct: "đường xoáy ốc",
    },
    {
      question:
        "Câu 18: Luận điểm nào của Chủ nghĩa duy vật biện chứng? Phát triển là sự vận động… ",
      answer1: "tăng hay giảm về lượng",
      answer2: "theo vòng tròn khép kín",
      answer3: "đi lên theo đường thẳng",
      answer4: "đi lên, có cả bước thụt lùi",
      correct: "đi lên, có cả bước thụt lùi",
    },
    {
      question:
        "Câu 19: Theo Chủ nghĩa duy vật biện chứng, luận đề nào sau đây là đúng? ",
      answer1: "Sự phát triển là của mọi sự vật là đồng nhất",
      answer2: "Sự phát triển của của mọi sự vật là khác biệt",
      answer3: "Sự phát triển của mọi sự vật vừa thống nhất vừa khác biệt",
      answer4: "Blank",
      correct: "Sự phát triển của mọi sự vật vừa thống nhất vừa khác biệt",
    },
    {
      question:
        "Câu 20: Hoàn thành định nghĩa : “Phạm trù là những khái niệm..............phản ánh những mặt, những thuộc tính, những mối liên hệ chung, cơ bản của sự vật và hiện tượng thuộc một lĩnh vực nhất định”.",
      answer1: "chung nhất",
      answer2: "cơ bản nhất",
      answer3: "rộng nhất",
      answer4: "khoa học",
      correct: "rộng nhất",
    },
  ],
  // set 4
  [
    {
      question:
        "Câu 1: Chọn câu trả lời đúng nhất: Sự khác nhau căn bản giữa lao động của con người và hoạt động của động vật, theo Mác, là gì? ",
      answer1: "Lao động của con người mang tính tập thể",
      answer2: "Trong lao động, con người giao tiếp bằng ngôn ngữ",
      answer3: "Con người biết chế tạo và sử dụng công cụ lao động",
      answer4: "Lao động của con người làm biến đổi thế giới",
      correct: "Con người biết chế tạo và sử dụng công cụ lao động",
    },
    {
      question:
        " Câu 2: “Xe máy là cái chung, xe Honda là cái riêng”. Theo nghĩa triết học? ",
      answer1: "Đúng",
      answer2: "",
      answer3: "",
      answer4: "Sai",
      correct: "Sai",
    },
    {
      question:
        "Câu 3: Hoàn thành định nghĩa: “Cái riêng là phạm trù triết học dùng để chỉ............” ",
      answer1: "một đặc điểm lặp lại ở các sự vật",
      answer2: "một nét đặc thù có ở một sự vật",
      answer3: "một sự vật, một quá trình nhất định",
      answer4: "một sự vật thuộc về người cụ thể",
      correct: "một sự vật, một quá trình nhất định",
    },
    {
      question:
        " Câu 4: Hoàn thành định nghĩa: “Cái đơn nhất là phạm trù triết học dùng để chỉ..............” ",
      answer1: "Những thuộc tính được lặp lại ở các sự vật",
      answer2: "Những nét đặc trưng của sự vật",
      answer3: "Những thuộc tính chỉ có ở một sự vật",
      answer4: "Một sự vật, một quá trình đơn lẻ",
      correct: "Những thuộc tính chỉ có ở một sự vật",
    },
    {
      question:
        "Câu 5: Hoàn thành định nghĩa: “..........là phạm trù triết học chỉ một sự vật, một hiện tượng, một quá trình nhất định”. ",
      answer1: "Cái đơn nhất",
      answer2: "Cái tất nhiên.",
      answer3: "Cái chung",
      answer4: "Cái riêng",
      correct: "Cái riêng",
    },
    {
      question:
        "Câu 6: Quan điểm của Chủ nghĩa duy vật biện chứng về mối quan hệ giữa cái riêng và cái chung? ",
      answer1: "Không có cái chung bên ngoài cái riêng",
      answer2: "Cái chung không phụ thuộc  riêng",
      answer3: "Cái riêng không bao chứa cái chung",
      answer4: "Cái riêng và cái chung tồn tại độc lập",
      correct: "Không có cái chung bên ngoài cái riêng",
    },
    {
      question:
        "Câu 7: Theo CNDVBC, luận điểm sau đúng hay sai: “Chỉ có thể tìm cái chung trong cái riêng, xuất phát từ cái riêng” ",
      answer1: "Đúng",
      answer2: "",
      answer3: "",
      answer4: "Sai",
      correct: "Đúng",
    },
    {
      question:
        "Câu 8: Phạm trù triết học dùng để chỉ những sự biến đổi xuất hiện do tác động lẫn nhau giữa các mặt trong một sự vật hoặc giữa các sự vật, gọi là gì? ",
      answer2: "Khả năng",
      answer3: "Phủ định",
      answer4: "Tất nhiên",
      correct: "Khả năng",
      answer1: "Kết quả",
    },
    {
      question:
        "Câu 9: . Hãy chỉ ra một luận điểm sai theo quan điểm Chủ nghĩa duy vật biện chứng?",
      answer1: "Một kết quả có thể gây nên bởi nhiều nguyên nhân",
      answer2: "Kết quả luôn thúc đẩy nguyên nhân sinh ra nó",
      answer3: "Nguyên nhân và kết quả có thể thay đổi vị trí cho nhau",
      answer4: "Kết quả có thể kìm hãm nguyên nhân sinh ra nó",
      correct: "Kết quả luôn thúc đẩy nguyên nhân sinh ra nó",
    },
    {
      question:
        "Câu 10: Theo Chủ nghĩa duy vật biện chứng, khẳng định nào dưới đây là sai?",
      answer1: "Mọi cái tất yếu đều là cái chung",
      answer2: "Không phải cái chung nào cũng là tất yếu",
      answer3: "Một số cái chung là cái tất yếu",
      answer4: "Mọi cái chung đều là cái tất yếu",
      correct: "Mọi cái chung đều là cái tất yếu",
    },
    {
      question:
        "Câu 11: Phạm trù triết học dùng để chỉ cái có thể xảy ra, hoặc không xảy ra, gọi là gì?",
      answer1: "Nguyên nhân.",
      answer2: "Ngẫu nhiên.",
      answer3: "Khả năng.",
      answer4: "Vận động.",
      correct: "Ngẫu nhiên.",
    },
    {
      question:
        "Câu 12: Điền vào chỗ trống để hoàn thành định nghĩa: “Hình thức là hệ thống.........................giữa các yếu tố của sự vật”",
      answer1: "Mối liên hệ tương đối bền vững",
      answer2: "Chuyển hóa lẫn nhau",
      answer3: "Mối liên kết bề ngoài",
      answer4: "Chi phối lẫn nhau",
      correct: "Mối liên hệ tương đối bền vững",
    },
    {
      question: "Câu 13: Hãy chỉ ra một kết luận sai.",
      answer1: "Hình thức thúc đẩy nội dung nếu nó phù hợp với nội dung.",
      answer2: "Nội dung bao giờ cũng biến đổi trước, hình thức biến đổi sau.",
      answer3: "Hình thức luôn cản trở sự phát triển của nội dung.",
      answer4: "Nội dung quyết dịnh hình thức trong sự phát triển của sự vật.",
      correct: "Hình thức luôn cản trở sự phát triển của nội dung.",
    },
    {
      question:
        "Câu 14: Hoàn thành định nghĩa: “Bản chất là tổng hợp tất cả những mặt, những.........................., tương đối ổn định, bên trong sự vật quy định sự vận động phát triển”.",
      answer1: "thuộc tính cơ bản.",
      answer2: "mâu thuẫn biện chứng.",
      answer3: "mối liên hệ tất nhiên.",
      answer4: "quá trình khách quan",
      correct: "mối liên hệ tất nhiên.",
    },
    {
      question: "Câu 15: . Đâu là quan điểm của chủ nghĩa duy vật biện chứng? ",
      answer1: "Bản chất tồn tại khách quan bên ngoài sự vật",
      answer2: "Hiện tượng là tổng hợp những cảm giác",
      answer3: "Bản chất và hiện tượng là những thực thể độc lập",
      answer4: "Bản chất và hiện tượng là cái vốn có của sự vật.",
      correct: "Bản chất và hiện tượng là cái vốn có của sự vật.",
    },
    {
      question: "Câu 16: Những dấu hiệu để phân biệt hiện thực với khả năng? ",
      answer1: "Sự có mặt trên thực tế của sự vật.",
      answer2: "Nhận biết được hay không nhận biết được.",
      answer3: "Chủ quan hay khách quan",
      answer4: "Vận động hay đứng im",
      correct: "Sự có mặt trên thực tế của sự vật.",
    },
    {
      question:
        "Câu 17: Hoàn thành định nghĩa: “Khả năng là phạm trù triết học chỉ..............khi có đủ điều kiện thich hợp ",
      answer1: "Năng lực của con người",
      answer2: "Những tiền đề của sự vật",
      answer3: "Cái chưa có, nhưng sẽ có.",
      answer4: "Sự biến đổi của sự vật.",
      correct: "Cái chưa có, nhưng sẽ có.",
    },
    {
      question:
        "Câu 18: Phạm trù chỉ những cái chưa xuất hiện, chưa tồn tại trên thực tế, nhưngsẽ xuất hiện, sẽ tồn tại thực sự khi có các điều kiện gọi là gì? ",
      answer1: "Tương lai",
      answer2: "Khả năng",
      answer3: "Hiện thực",
      answer4: "Phát triển",
      correct: "Khả năng",
    },
    {
      question:
        "Câu 19: Người ta chia quy luật thành, quy luật tự nhiên, quy luật xã hội và quy luật tư duy là căn cứ vào",
      answer1: "lĩnh vực tác động",
      answer2: "mức độ  tác động",
      answer3: "quy mô tác động",
      answer4: "tính chất tác động",
      correct: "lĩnh vực tác động",
    },
    {
      question:
        "Câu 20: Phép biện chứng duy vật nghiên cứu những loại quy luật nào?",
      answer1: "Quy luật riêng",
      answer2: "Quy luật tự nhiên.",
      answer3: "Quy luật phổ biến",
      answer4: "Quy luật tự nhiên.",
      correct: "Quy luật phổ biến",
    },
  ],

  // set 5
  [
    {
      question:
        "Câu 1: Các quy luật của logic hình thức thuộc dạng quy luật nào? ",
      answer1: "Quy luật tự nhiên",
      answer2: "Quy luật xã hội",
      answer3: "Quy luật tư duy",
      answer4: "",
      correct: "Quy luật tư duy",
    },
    {
      question:
        "Câu 2: Phép biện chứng duy vật nghiên cứu những loại quy luật nào?",
      answer1: "Quy luật xã hội",
      answer2: "Quy luật phổ biến",
      answer3: "Quy luật tự nhiên.",
      answer4: "Quy luật riêng",
      correct: "Quy luật phổ biến",
    },
    {
      question:
        "Câu 3: Câu tục ngữ “Có công mài sắt có ngày nên kim” thể hiện cơ bản nội dung quy luật nào? ",
      answer1: "Quy luật phủ định của phủ định",
      answer2: "Quy luật mâu thuẫn",
      answer3: "Quy luật lượng đổi, chất đổi",
      answer4: "",
      correct: "Quy luật lượng đổi, chất đổi",
    },
    {
      question:
        "Câu 4: Quy luật nào sau đây vạch ra nguồn gốc, động lực của sự phát triển? ",
      answer1: "Quy luật mâu thuẫn",
      answer2: "Quy luật phủ định của phủ định",
      answer3: "Quy luật lượng đổi, chất đổi",
      answer4: "",
      correct: "Quy luật mâu thuẫn",
    },
    {
      question:
        "Câu 5: Sự thống nhất giữa lượng và chất được thể hiện thông qua phạm trù nào?",
      answer1: "Bước nhảy",
      answer2: "Thuộc tính",
      answer3: "Độ",
      answer4: "Điểm nút",
      correct: "Độ",
    },
    {
      question:
        "Câu 6: Khái niệm “đường nút” trong quy luật lượng chất nói lên tính chất gì của sự phát triển? ",
      answer1: "Phát triển là một quá trình liên tục",
      answer2: "Phát triển là một quá trình gián đoạn",
      answer3: "Phát triển là liên tục qua những  gián đoạn",
      answer4: "",
      correct: "Phát triển là liên tục qua những  gián đoạn",
    },
    {
      question:
        "Câu 7: Có phải mọi sự thay đổi về lượng đều làm cho sự vật thay đổi về chất hay không?",
      answer1: "Có",
      answer2: "",
      answer3: "",
      answer4: "Không",
      correct: "Không",
    },
    {
      question:
        "Câu 8: Ai là người đầu tiên phát hiện ra quy luật đấu tranh giai cấp? ",
      answer2: "Hêghen",
      answer3: "Mác",
      answer4: "Ăngghen",
      correct: "Mác",
      answer1: "Lênin",
    },
    {
      question: "Câu 9: Lượng đổi trong quy luật lượng chất có nghĩa là... ",
      answer1: "lượng tăng lên",
      answer2: "lượng giảm đi",
      answer3: "lượng tăng, giảm.",
      answer4: "lượng ổn định",
      correct: "lượng tăng, giảm.",
    },
    {
      question:
        "Câu 10: Khái niệm  “Độ” trong quy luật lượng chất đồng nghĩa với những khái niệm nào?",
      answer1: "Giới hạn, mức độ, chuẩn mực, thời hạn.",
      answer2: "Trạng thái và hình thức tồn tại",
      answer3: "Nhiệt độ, độ lớn, độ dài, độ rộng",
      answer4: "Hình thức, khuôn mẫu, kích thước",
      correct: "Giới hạn, mức độ, chuẩn mực, thời hạn.",
    },
    {
      question:
        "Câu 11: . Quy luật lượng chất có vận dụng vào lĩnh vực hoạt động ngôn ngữ được không? ",
      answer1: "Có",
      answer2: "",
      answer3: "",
      answer4: "Không",
      correct: "Có",
    },
    {
      question:
        "Câu 12: Quan điểm cho rằng, phát triển là quá trình tăng về lượng mà không biến đổi về chất thuộc lập trường nào? ",
      answer1: "Duy tâm khách quan",
      answer2: "Duy tâm chủ quan",
      answer3: "Duy vật biện chứng",
      answer4: "Duy vật siêu hình",
      correct: "Duy vật siêu hình",
    },
    {
      question:
        "Câu 13: Thuyết Âm-Dương trong triết học Trung Quốc về cơ bản phản ánh nội dung quy luật nào? ",
      answer1: "Quy luật lượng chất",
      answer2: "Quy luật mâu thuẫn",
      answer3: "Quy luật phủ định của phủ định",
      answer4: "",
      correct: "Quy luật mâu thuẫn",
    },
    {
      question:
        "Câu 14: Khi đưa ra quan điểm “phát huy nội lực”, Đảng ta đã nhận thức được vai trò quyết định của mâu thuẫn nào? ",
      answer1: "Mâu thuẫn bên trong",
      answer2: "Mâu thuẫn bên ngoài",
      answer3: "Mâu thuẫn đối kháng",
      answer4: "Mâu thuẫn không đối kháng",
      correct: "Mâu thuẫn bên trong",
    },
    {
      question:
        "Câu 15: Chọn phương án đúng: Phát triển là quá trình được thực hiện bởi... ",
      answer1: "sự vận động của chính bản thân mâu thuẫn ở sự vật",
      answer2: "sự tích lũy dần về lượng ở bản thân sự vật cũ",
      answer3: "sự phủ định biện chứng đối với sự vật cũ",
      answer4: "Tất cả các phương án kể trên đều đúng",
      correct: "Tất cả các phương án kể trên đều đúng",
    },
    {
      question: "Câu 16: Mâu thuẫn chủ yếu là mâu thuẫn.... ",
      answer1: "quy định bản chất và sự phát triển của sự vật",
      answer2: "nổi lên hàng đầu, đòi hỏi cần giải quyết kịp thời",
      answer3: "giữa các lực lượng xã hội có lợi ích trái ngược",
      answer4: "giữa các mặt, các yếu tố cấu thành sự vật",
      correct: "nổi lên hàng đầu, đòi hỏi cần giải quyết kịp thời",
    },
    {
      question:
        "Câu 17: Câu tục ngữ “Tre già, măng mọc” đề cập đến loại hình phủ định gì? ",
      answer1: "Phủ định siêu hình",
      answer2: "Phủ định biện chứng",
      answer3: "Phủ định của phủ định",
      answer4: "",
      correct: "Phủ định biện chứng",
    },
    {
      question:
        "Câu 18: Quy luật phủ định của phủ định phản ánh sự phát triển đi lên của sự vật theo hướng nào? ",
      answer1: "Đường xoáy trôn ốc",
      answer2: "Đường thẳng tuyến tính",
      answer3: "Vòng tròn khép kín",
      answer4: "Đường lượn hình sin",
      correct: "Đường xoáy trôn ốc",
    },
    {
      question:
        "Câu 19: . Luận điểm Lênin:“Hắt luôn cả đứa trẻ cùng với nước trong chậu tắm” phê phán quan điểm nào? ",
      answer1: "Phủ định sạch trơn",
      answer2: "Phủ định biện chứng",
      answer3: "Phủ định có kế thừa",
      answer4: "Phủ định của phủ định",
      correct: "Phủ định sạch trơn",
    },
    {
      question:
        "Câu 20: Theo quan niệm triết học Mác - Lênin, thực tiễn là....? ",
      answer1: "hiện thực khách quan tồn tại bên ngoài con người",
      answer2: "hoạt động vật chất, mang tính lịch sử - xã hội của con người",
      answer3: "hoạt động trong mọi lĩnh vực đời sống con người",
      answer4: "hoạt động tinh thần, vui chơi giải trí của con người",
      correct: "hoạt động vật chất, mang tính lịch sử - xã hội của con người",
    },
  ],
  // set 6
  [
    {
      question:
        "Câu 1: Khi viết “Giới tự nhiên là hòn đá thử vàng của phép biện chứng”, Ănghen nhấn mạnh thực tiễn là..... ",
      answer1: "cơ sở của nhận thức",
      answer2: "mục đích của nhận thức",
      answer3: "động lực của nhận thức",
      answer4: "tiêu chuẩn của nhận thức",
      correct: "tiêu chuẩn của nhận thức",
    },
    {
      question:
        "Câu 2: Theo quan điểm của Chủ nghĩa duy vật biện chứng, cảm giác là... ",
      answer1: "hình ảnh chủ quan của thế giới khách quan",
      answer2: "hình ảnh thực của sự vật, hiện tượng",
      answer3: "sản phẩm sáng tạo tư duy trừu tượng",
      answer4: "sự liên tưởng và trí nhớ của con người",
      correct: "hình ảnh chủ quan của thế giới khách quan",
    },
    {
      question:
        "Câu 3: Những yếu tố nào đóng vai trò quyết định trong sự hình thành biểu tượng? ",
      answer1: "Cảm giác, tri giác",
      answer2: "Ấn tượng, trí nhớ",
      answer3: "Trí nhớ, giấc mơ",
      answer4: "Ấn tượng, giấc mơ",
      correct: "Cảm giác, tri giác",
    },
    {
      question:
        "Câu 4: Theo quan điểm của Chủ nghĩa duy vật biện chứng, khái niệm là một hình thức.... ",
      answer1: "nhận thức cảm tính",
      answer2: "tư duy trừu tượng",
      answer3: "đặc thù của ngôn ngữ",
      answer4: "tưởng tượng",
      correct: "tư duy trừu tượng",
    },
    {
      question:
        "Câu 5: Tùy chọn Theo quan điểm của Chủ nghĩa duy vật biện chứng, chân lý là... ",
      answer1: "sản phẩm sáng tạo thuần tuý của tư duy con người",
      answer2: "hình ảnh chủ quan của thế giới khách quan",
      answer3: "những danh ngôn, dạy bảo của các bậc vĩ nhân.",
      answer4: "tri thức phù hợp với hiện thực khách quan",
      correct: "tri thức phù hợp với hiện thực khách quan",
    },
    {
      question:
        "Câu 6: Luận điểm: “Chân lý là phổ biến, nó không thuộc về riêng một mình tôi, mà thuộc về tất cả mọi người”, ngụ ý chân lý có tính ... ",
      answer1: "khách quan",
      answer2: "tuyệt đối",
      answer3: "chủ quan",
      answer4: "tương đối",
      correct: "khách quan",
    },
    {
      question: "Câu 7: Yếu tố nào không thuộc nhận thức cảm tính ",
      answer1: "Cảm giác",
      answer2: "Tri giác",
      answer3: "Biểu tượng",
      answer4: "Phán đoán",
      correct: "Phán đoán",
    },
    {
      question: "Câu 8: Yếu tố nào không thuộc nhận thức lý tính? ",
      answer2: "Khái niệm",
      answer3: "Phán đoán",
      answer4: "Suy luận",
      correct: "Cảm giác",
      answer1: "Cảm giác",
    },
    {
      question:
        "Câu 9: Hoàn thiện luận điểm: “Từ trực quan sinh động đến tư duy trừu tượng, và từ tư duy trừu tượng đến .... - đó là con đường biện chung của sự nhận thức chân lý” ",
      answer1: "thực tế",
      answer2: "thực tiễn",
      answer3: "hiện thực",
      answer4: "cuộc sống",
      correct: "thực tiễn",
    },
    {
      question:
        "Câu 10: Hoàn thiện luận điểm: “Từ trực quan sinh động đến tư duy trừu tượng, và từ tư duy trừu tượng đến thực tiễn - đó là con đường biện chứng của sự nhận thức ..., nhận thức hiện thực khách quan”",
      answer1: "hiện thực",
      answer2: "chân lý",
      answer3: "cuộc sống",
      answer4: "sự vật",
      correct: "chân lý",
    },
    {
      question: "Câu 11: Yếu tố nào không phải là tính chất của chân lý? ",
      answer1: "tính khách quan",
      answer2: "tính chủ quan",
      answer3: "tính tương đối",
      answer4: "tính cụ thể",
      correct: "tính chủ quan",
    },
    {
      question:
        "Câu 12: Yếu tố nào sau đây đóng vai trò quan trọng nhất trong đời sống con người?",
      answer1: "Sản xuất tinh thần",
      answer2: "Sản xuất ra con người",
      answer3: "Sản xuất vật chất",
      answer4: "",
      correct: "Sản xuất vật chất",
    },
    {
      question:
        "Câu 13: Hành vi lịch sử đầu tiên  phân biệt con người với con vật là... ",
      answer1: "sản xuất tư  liệu sinh hoạt",
      answer2: "hoạt động chính trị",
      answer3: "nghiên cứu khoa học",
      answer4: "săn bắt và hái lượm",
      correct: "sản xuất tư  liệu sinh hoạt",
    },
    {
      question:
        "Câu 14: Nghề gì đã thay thế trạng thái  ”săn bắt và hái lượm” ban đầu của con người?",
      answer1: "Thương nghiệp",
      answer2: "Du lịch, dịch vụ",
      answer3: "Trồng trọt, chăn nuôi",
      answer4: "Thủ công nghiệp",
      correct: "Trồng trọt, chăn nuôi",
    },
    {
      question: "Câu 15:  Phương thức sản xuất bao gồm những yếu tố nào? ",
      answer1: "Công cụ lao động và đối tượng lao động",
      answer2: "Tư liệu sản xuất và cách sản xuất",
      answer3: "Lực lượng sản xuất và quan hệ sản xuất",
      answer4: "Khoa học và công nghệ",
      correct: "Lực lượng sản xuất và quan hệ sản xuất",
    },
    {
      question: "Câu 16: Tư liệu sản xuất bao gồm những yếu tố nào? ",
      answer1: "Giới tự nhiên và công cụ lao động",
      answer2: "Con người và công cụ lao động",
      answer3: "Giới tự nhiên và con người",
      answer4: "Đối tượng và công cụ lao động",
      correct: "Đối tượng và công cụ lao động",
    },
    {
      question:
        " Câu 17: Trong lực lượng sản xuất,  yếu tố nào sau đây giữ vai trò quan trọng nhất?",
      answer1: "Tư liệu sản xuất",
      answer2: "Khoa học- công nghệ",
      answer3: "Cả A và B đều đúng",
      answer4: "Người sản xuất",
      correct: "Người sản xuất",
    },
    {
      question:
        "Câu 18: Trong quan hệ sản xuất, yếu tố nào giữ vai trò quan trọng nhất?",
      answer1: "Quan hệ sở hữu tư liệu sản xuất",
      answer2: "Quan hệ phân phối sản phẩm",
      answer3: "Quan hệ tổ chức quản lý sản xuất",
      answer4: "",
      correct: "Quan hệ sở hữu tư liệu sản xuất",
    },
    {
      question:
        "Câu 19: Quan hệ nào sau đây là quan hệ kinh tế cơ bản của xã hội? ",
      answer1: "Quan hệ giai cấp",
      answer2: "Quan hệ dân tộc",
      answer3: "Quan hệ sản xuất",
      answer4: "Quan hệ tôn giáo",
      correct: "Quan hệ sản xuất",
    },
    {
      question:
        "Câu 20: Thực chất của công cuộc đổi mới ở nước ta là đổi mới từ phương diện nào?  ",
      answer1: "Lực lượng sản xuất",
      answer2: "Quan hệ sản xuất",
      answer3: "Quan hệ xã hội",
      answer4: "Phân phối sản phẩm",
      correct: "Quan hệ sản xuất",
    },
  ],
  // set 7
  [
    {
      question:
        "Câu  1: Nếu sắp xếp các hình thức vận động của vật chất từ thấp đến cao, thì sắp xếp nào dưới đây là sai? ",
      answer1: "1 Sinh học- 2 xã hội",
      answer2: "1 Vật lý - 2 Hóa học",
      answer3: "1 Sinh học- 2 Hóa học",
      answer4: "1 Cơ học - 2 Vật lý",
      correct: "1 Sinh học- 2 Hóa học",
    },
    {
      question:
        "Câu 2: Trong số các tính chất sau, tính chất nào không thuộc về thời gian? ",
      answer1: "vĩnh cửu",
      answer2: "Một chiều",
      answer3: "Ba chiều",
      answer4: "Khách quan",
      correct: "Ba chiều",
    },
    {
      question: "Câu 3: Mệnh đề nào là sai trong số các mệnh đề dưới đây? ",
      answer1: "Các hình thức vận động khác nhau về chất",
      answer2: "Mỗi sự vật chỉ có một hình thức vận động",
      answer3: "Mỗi sự vật thường đặc trưng bởi hình thức vận động cao nhất",
      answer4: "Mỗi sự vật tồn tại nhiều hình thức vận động",
      correct: "Mỗi sự vật chỉ có một hình thức vận động",
    },
    {
      question:
        "Câu 4: Theo quan điểm của chủ nghĩa duy vật biện chứng, thuộc tính phản ánh là thuộc tính: ",
      answer1: "Chỉ xuất hiện ở con người",
      answer2: "Phổ biến ở mọi dạng vật chất",
      answer3: "Chỉ xuất hiện trong thế giới hữu cơ",
      answer4: "Chỉ xuất hiện ở vật chất vô cơ",
      correct: "Phổ biến ở mọi dạng vật chất",
    },
    {
      question:
        "Câu 5: Nhân tố cơ bản, trực tiếp hình thành nguồn gốc xã hội của ý thức? ",
      answer1: "Lao động trí óc và lao động chân tay",
      answer2: "Lao động và nghiên cứu khoa học",
      answer3: "Hoạt động nhận thức và hoạt động thực tiễn",
      answer4: "Lao động và ngôn ngữ",
      correct: "Lao động và ngôn ngữ",
    },
    {
      question:
        "Câu 6: Theo quan điểm của chủ nghĩa duy vật biện chứng, ý thức là: ",
      answer1: "Một dạng tồn tại đặc biệt của vật chất",
      answer2: "Một thực thể độc lập với vật chất",
      answer3: "Thuộc tính của sinh vật nói chung",
      answer4: "Hình ảnh tinh thần của con người về thế giới",
      correct: "Hình ảnh tinh thần của con người về thế giới",
    },
    {
      question:
        'Câu 7: Lựa chọn từ điền vào câu để hoàn thành nhận định của Mác " Ý thức chẳng qua chỉ là........được di chuyển vào bộ óc con người và được cải biên đi ở trong đó" ',
      answer1: "Cái vật chât",
      answer2: "Vật chất",
      answer3: "Tín hiệu",
      answer4: "Vật thể",
      correct: "Vật chất",
    },
    {
      question: "Câu 8: Bản chất của ý thức thể hiện ở những đặc trưng nào? ",
      answer1: "Tính sáng tạo",
      answer2: "Tính xã hội",
      answer3: "Hình ảnh tinh thần",
      answer4: "Cả ba đặc trưng đã nêu trên",
      correct: "Cả ba đặc trưng đã nêu trên",
    },
    {
      question:
        "Câu 9: Theo quan điểm của chủ nghĩa duy vật biện chứng, trong nhận thức và hoạt động thực tiễn cần: ",
      answer1: "Tôn trọng quy luật khách quan",
      answer2: "Phát huy tính năng động chủ quan",
      answer3: "Vừa tôn trọng quy luật vừa phát huy tính năng động chủ quan",
      answer4: "",
      correct: "Vừa tôn trọng quy luật vừa phát huy tính năng động chủ quan",
    },
    {
      question:
        "Câu 10: Đặc điểm cơ bản của phép biện chứng Hy lạp cổ đại là gì? ",
      answer1: "Tính chất duy vật chưa triệt để",
      answer2: "Tính chất khoa học",
      answer3: "Tính chất chất phác, ngây thơ",
      answer4: "Tính chất duy tâm",
      correct: "Tính chất chất phác, ngây thơ",
    },
    {
      question:
        "Câu 11: Phép biện chứng nào cho rằng, biện chứng của ý niệm sinh ra biện chứng của sự vật? ",
      answer1: "Phép biện chứng chất phác cổ đại",
      answer2: "Phép biện chứng duy tâm khách quan",
      answer3: "Phép biện chứng duy vật",
      answer4: "Phép biện chứng cổ điển Đức",
      correct: "Phép biện chứng duy tâm khách quan",
    },
    {
      question:
        "Câu 12: Phép biện chứng nào được coi là khoa học về những quy luật phổ biến của sự vận động và sự phát triển của tự nhiên, xã hội và tư duy? ",
      answer1: "Phép biện chứng của Hêghen",
      answer2: "Phép biện chứng duy vật",
      answer3: "Phép biện chứng cổ đại",
      answer4: "Phép biện chứng cổ điển Đức",
      correct: "Phép biện chứng duy vật",
    },
    {
      question:
        ' Câu 13: Quan điểm nào cho rằng, cơ sở của mối liên hệ giữa các sự vật, hiện tượng là "ý niệm tuyệt đối"? ',
      answer1: "Chủ nghĩa duy tâm",
      answer2: "Chủ nghĩa duy vật",
      answer3: "Phép biện chứng duy tâm",
      answer4: "Phép biện chứng duy vật",
      correct: "Phép biện chứng duy tâm",
    },
    {
      question:
        " Câu 14: Nguồn gốc, động lực cơ bản của sự vận động, phát triển là do:  ",
      answer1: "Sự thống nhất các mặt đối lập",
      answer2: "Sự đấu tranh giữa các mặt đối lập",
      answer3: "Sự thống nhất và đấu tranh giữa các mặt đối lập",
      answer4: "Các phương án nêu trên đều sai",
      correct: "Sự thống nhất và đấu tranh giữa các mặt đối lập",
    },
    {
      question:
        ' Câu 15: Quan điểm "toàn diện và lịch sử cụ thể" trong nhận thức và thực tiễn dựa trên cơ sở lý luận nào của phép biện chứng duy vật? ',
      answer1: "Nguyên lý về mối liên hệ và phát triển",
      answer2: "Nguyên lý về sự đấu tranh giữa các mặt đối lập",
      answer3: "Nguyên lý về mối liên hệ phổ biến",
      answer4: "Nguyên lý về sự phát triển",
      correct: "Nguyên lý về mối liên hệ phổ biến",
    },
    {
      question:
        "Câu 16: Hình thức cơ bản đầu tiên của mọi quá trình tư duy là gì? ",
      answer1: "Biểu tượng",
      answer2: "Khái niệm",
      answer3: "Cảm giác",
      answer4: "Tri giác",
      correct: "Khái niệm",
    },
    {
      question:
        'Câu 17: Hãy điền các từ vào chỗ trống để hoàn thành nhận định đúng: " Cái.......chỉ tồn tại trong cái.......thông qua cái riêng mà biểu hiện sự tồn tại của mình" ',
      answer1: "Đơn nhất/ Chung",
      answer2: "Chung/Đơn nhất",
      answer3: "Đơn nhất/ Riêng",
      answer4: "Chung/Riêng",
      correct: "Chung/Riêng",
    },
    {
      question:
        'Câu 18: Câu 17: Hãy điền các từ vào chỗ trống để hoàn thành nhận định đúng: " Cái.........chỉ tồn tại trong mối liên hệ đưa tới cái........." ',
      answer1: "Riêng/Chung",
      answer2: "Chung/Riêng",
      answer3: "Chung/Đơn nhất",
      answer4: "Riêng/Đơn nhất",
      correct: "Riêng/Chung",
    },
    {
      question: "Câu 19: Cái .........là cái toàn bộ, phong phú hơn cái...... ",
      answer1: "Riêng/Chung",
      answer2: "Chung/Riêng",
      answer3: "Chung/Đơn nhất",
      answer4: "Riêng/Đơn nhất",
      correct: "Riêng/Chung",
    },
    {
      question:
        " Câu 20: Khi một sự vật, một hiện tượng mới nảy sinh thì yếu tố nào sẽ xuất hiện đầu tiên?  ",
      answer1: "Cái riêng",
      answer2: "Cái chung",
      answer3: "Cái đơn nhất",
      answer4: "Cái phổ biến",
      correct: "Cái đơn nhất",
    },
  ],
  // set 8
  [
    {
      question:
        "Câu 1: Tại sao Mác nói phép biện chứng của Hêghen là phép biện chứng lộn đầu xuống đất? ",
      answer1: "Thừa nhận ý thức là sản phẩm của thế giới vật chất",
      answer2: "Thừa nhận thế giới vật chất tồn tại khách quan",
      answer3: "Thừa nhận sự tồn tại độc lập của ý thức",
      answer4:
        "Thừa nhận tự nhiên, xã hội là sản phẩm của quá trình phát triển của ý niệm",
      correct:
        "Thừa nhận tự nhiên, xã hội là sản phẩm của quá trình phát triển của ý niệm",
    },
    {
      question: "Câu 2: Mối liên hệ nhân quả có các tính chất gì? ",
      answer1: "Tính khách quan và tính phổ biến",
      answer2: "Tính khách quan và tính tất yếu",
      answer3: "Tính khách quan, chủ quan và tất yếu",
      answer4: "Tính khách quan, phổ biến và tất yếu",
      correct: "Tính khách quan, phổ biến và tất yếu",
    },
    {
      question:
        "Câu 3: Trong quá trình nhận thức và hoạt động thực tiễn, chúng ta cần: ",
      answer1: "Phủ nhận gạt bỏ cái ngẫu nhiên",
      answer2: "Phủ nhận gạt bỏ cái tất nhiên",
      answer3: "Coi cái tất nhiên và ngẫu nhiên ngang nhau",
      answer4: "Cơ bản dựa vào tất nhiên, nhưng phải tính tới cái ngẫu nhiên",
      correct: "Cơ bản dựa vào tất nhiên, nhưng phải tính tới cái ngẫu nhiên",
    },
    {
      question:
        "Câu 4: Giữa nội dung và hình thức yếu tố nào chậm biến đổi hơn? ",
      answer1: "Nội dung",
      answer2: "Hình thức",
      answer3: "Cả hai biến đổi như nhau",
      answer4: "",
      correct: "Hình thức",
    },
    {
      question:
        "Câu 5: Mác cho rằng nếu...........của sự vật đều nhất trí với nhau thì mọi khoa học trở nên thừa. ",
      answer1: "Bản chất và hiện tượng",
      answer2: "Nguyên nhân và kết quả",
      answer3: "Khả năng và hiện thực",
      answer4: "Nội dung và hình thức",
      correct: "Bản chất và hiện tượng",
    },
    {
      question:
        "Câu 6: Phạm trù triết học dùng để chỉ những gì hiện đang có, hiện đang tồn tại thực sự, gọi là gì? ",
      answer1: "Hiện thực",
      answer2: "Hiện thực khách quan",
      answer3: "Hiện thực chủ quan",
      answer4: "Kết quả",
      correct: "Hiện thực",
    },
    {
      question: "Câu 7: Thế nào là mâu thuẫn biện chứng? ",
      answer1: "Tồn tại hai mặt đối lập nhau",
      answer2: "Tồn tại hai mặt khác nhau",
      answer3: "Sự thống nhất của các mặt đối lập.",
      answer4: "Tồn tại hai mặt trái ngược nhau",
      correct: "Sự thống nhất của các mặt đối lập.",
    },
    {
      question: "Câu 8: Phủ định biện chứng là sự phủ định: ",
      answer1: "Làm xuất hiện sự vật mới",
      answer2: "Thủ tiêu sự vật cũ",
      answer3: "Tạo điều kiện, tiền đề cho sự phát triển",
      answer4: "Làm cho sự vật thay đổi hình thức",
      correct: "Tạo điều kiện, tiền đề cho sự phát triển",
    },
    {
      question: "Câu 9: Mỗi sự vật trong điều kiện xác định có... ",
      answer1: "nhiều thuộc tính",
      answer2: "vô vàn các thuộc tính",
      answer3: "một số thuộc tính xác định",
      answer4: "một thuộc tính nhất định",
      correct: "một số thuộc tính xác định",
    },
    {
      question:
        "Câu 10: Cái gì được coi là nguồn gốc và động lực của sự phát triển? ",
      answer1: "Mâu thuẫn biện chứng",
      answer2: "Thống nhất",
      answer3: "Đấu tranh",
      answer4: "Mâu thuẫn",
      correct: "Mâu thuẫn biện chứng",
    },
    {
      question:
        "Câu 11: Quá trình thay đổi các hình thái tồn tại của sự vật, đồng thời qua đó tạo điều kiện cho sự phát triển được gọi là gì? ",
      answer1: "Phủ định biện chứng",
      answer2: "Vận động",
      answer3: "Tiến hóa",
      answer4: "Phủ định",
      correct: "Phủ định biện chứng",
    },
    {
      question: "Câu 12: Phủ định biện chứng có tính chất gì? ",
      answer1: "Tính kế thừa và tính mâu thuẫn",
      answer2: "Tính khách quan và tính kế thừa",
      answer3: "Tính kế thừa và tính phát triển",
      answer4: "Tính khách quan và tính mâu thuẫn",
      correct: "Tính khách quan và tính kế thừa",
    },
    {
      question:
        "Câu 13: Hình thức nhận thức nào không cần có sự tác động của sự vật vào giác quan con người? ",
      answer1: "Tri giác",
      answer2: "Biểu tượng",
      answer3: "Khái niệm",
      answer4: "Cảm giác",
      correct: "Khái niệm",
    },
    {
      question:
        "Câu 14: Triết học nào coi nhận thức cảm tính và lý tính là hai trình độ phát triển của nhận thức và có mối quan hệ biện chứng với nhau? ",
      answer1: "Chủ nghĩa duy lý",
      answer2: "Chủ nghĩa duy tâm khách quan",
      answer3: "Chủ nghĩa duy vật biện chứng",
      answer4: "Chủ nghĩa duy cảm",
      correct: "Chủ nghĩa duy vật biện chứng",
    },
    {
      question: "Câu 15: Hoạt động thực tiễn khác với hoạt động nhận thức vì: ",
      answer1: "Hoạt động thực tiễn có tính lịch sử-xã hội",
      answer2: "Hoạt động  thực tiễn có tính mục đich",
      answer3: "Hoạt động thực tiễn có các hình thức cụ thể",
      answer4: "Hoạt động thực tiễn có tính vật chất",
      correct: "Hoạt động thực tiễn có tính vật chất",
    },
    {
      question:
        "Câu 16: Điền cụm từ thích hợp vào chỗ trống dưới đây, để hoàn thành câu: Khả năng tất nhiên là loại khả năng được hình thành do............của sự vật quy định. ",
      answer1: "mối liên hệ chung",
      answer2: "nguyên nhân bên trong",
      answer3: "tổng hợp những mặt",
      answer4: "quy luật vận động nội tại",
      correct: "nguyên nhân bên trong",
    },
    {
      question: "Câu 17: Theo chủ nghĩa Duy vật biện chứng, câu nào là sai? ",
      answer1: "Hiện tượng đôi khi xuyên tạc bản chất",
      answer2: "Hiện tượng đôi khi phản ánh sai bản chất.",
      answer3: "Hiện tượng và bản chất về cơ bản là thống nhất",
      answer4: "Hiện tượng và bản chất tồn tại độc lập với nhau",
      correct: "Hiện tượng và bản chất tồn tại độc lập với nhau",
    },
    {
      question:
        "Câu 18: Câu tục ngữ “Tre già, măng mọc” đề cập đến loại hình phủ định gì? ",
      answer1: "Phủ định biện chứng",
      answer2: "Phủ định của phủ định",
      answer3: "Phủ định siêu hình",
      answer4: "",
      correct: "Phủ định biện chứng",
    },
    {
      question:
        "Câu 19: Theo quan điểm của Chủ nghĩa duy vật biện chứng, chân lý là... ",
      answer1: "những danh ngôn, dạy bảo của các bậc vĩ nhân.",
      answer2: "tri thức phù hợp với hiện thực khách quan",
      answer3: "hình ảnh chủ quan của thế giới khách quan",
      answer4: "sản phẩm sáng tạo thuần tuý của tư duy con người",
      correct: "tri thức phù hợp với hiện thực khách quan",
    },
    {
      question: "Câu 20: Nhận thức lý tính đem lại cho con người tri thức gì? ",
      answer1: "Thông thường",
      answer2: "Kinh nghiệm",
      answer3: "Kinh nghiệm khoa học",
      answer4: "Lý luận",
      correct: "Lý luận",
    },
  ],
  // set 9
  [
    {
      question: "Câu 1: Trạng thái sống đầu tiên của người nguyên thủy là gì? ",
      answer1: "Hoạt động chính trị",
      answer2: "Săn bắt và hái lượm",
      answer3: "Trồng trọt và chăn nuôi",
      answer4: "Sản xuất tư  liệu sinh hoạt",
      correct: "Săn bắt và hái lượm",
    },
    {
      question:
        "Câu 2: Yếu tố nào sau đây đóng vai trò quan trọng nhất trong đời sống con người? ",
      answer1: "Sản xuất tinh thần",
      answer2: "Sản xuất ra con người",
      answer3: "Sản xuất vật chất",
      answer4: "",
      correct: "Sản xuất vật chất",
    },
    {
      question:
        "Câu 3: Hành vi lịch sử đầu tiên  mà loài người phải tiến hành là... ",
      answer1: "nghiên cứu khoa học",
      answer2: "sản xuất tư liệu sinh hoạt",
      answer3: "xây dựng các quy tắc điều chỉnh xã hội",
      answer4: "lễ nghi tôn giáo",
      correct: "sản xuất tư liệu sinh hoạt",
    },
    {
      question: "Câu 4: Phương thức sản xuất bao gồm những yếu tố nào? ",
      answer1: "Công cụ lao động và đối tượng lao động",
      answer2: "Tư liệu sản xuất và cách sản xuất",
      answer3: "Lực lượng sản xuất và quan hệ sản xuất",
      answer4: "Khoa học và công nghệ",
      correct: "Lực lượng sản xuất và quan hệ sản xuất",
    },
    {
      question: "Câu 5: Lực lượng sản xuất bao gồm những yếu tố nào? ",
      answer1: "Giới tự nhiên, dân số, TLSX",
      answer2: "Con người, TLSX, khoa học công nghệ",
      answer3: "Giới tự nhiên và công cụ lao động",
      answer4: "Con người, giới tự nhiên, công cụ lao động",
      correct: "Con người, TLSX, khoa học công nghệ",
    },
    {
      question:
        "Câu 6: Trong lực lượng sản xuất,  yếu tố nào sau đây giữ vai trò quan trọng nhất? ",
      answer1: "Khoa học- công nghệ",
      answer2: "Người sản xuất",
      answer3: "Tư liệu sản xuất",
      answer4: "Tư liệu lao động",
      correct: "Người sản xuất",
    },
    {
      question:
        "Câu 7: Trong quan hệ sản xuất, yếu tố nào giữ vai trò quan trọng nhất? ",
      answer1: "Quan hệ sở hữu tư liệu sản xuất",
      answer2: "Quan hệ phân phối sản phẩm",
      answer3: "Quan hệ tổ chức quản lý sản xuất",
      answer4: "",
      correct: "Quan hệ sở hữu tư liệu sản xuất",
    },
    {
      question:
        "Câu 8: Quan hệ sản xuất quyết định các quan hệ xã hội khác, bởi vì nó...... ",
      answer1: "thay đổi khi các quan hệ xã hội khác thay đổi",
      answer2: "thay đổi khi các quan hệ xã hội khác không thay đổi",
      answer3: "thay đổi thì các quan hệ xã hội khác cũng thay đổi",
      answer4: "không chịu sự chi  phối của các quan hệ xã hội khác",
      correct: "thay đổi thì các quan hệ xã hội khác cũng thay đổi",
    },
    {
      question:
        "Câu 9: Chọn câu trả lời đúng theo quan điểm của chủ nghĩa duy vật lịch sử: ",
      answer1: "Nền tảng khoa học, công nghệ của xã hội",
      answer2: "Nền tảng của xã hội",
      answer3: "Nền tảng tinh thần của xã hội",
      answer4: "Nền tảng vật chất của xã hội",
      correct: "Nền tảng vật chất của xã hội",
    },
    {
      question:
        "Câu 10: Trình độ phát triển của phương thức sản xuất ra của cải vật chất là nhân tố giữ vai trò quyết định: ",
      answer1: "Đời sống tinh thần của xã hội",
      answer2: "Đời sống văn hóa của xã hội",
      answer3: "Tiến bộ và văn minh của xã hội",
      answer4: "Trình độ phát triển của nền sản xuất xã hội",
      correct: "Trình độ phát triển của nền sản xuất xã hội",
    },
    {
      question:
        "Câu 11: Quan hệ nào sau đây là quan hệ kinh tế cơ bản của xã hội? ",
      answer1: "Quan hệ sản xuất",
      answer2: "Quan hệ tôn giáo",
      answer3: "Quan hệ giai cấp",
      answer4: "Quan hệ dân tộc",
      correct: "Quan hệ sản xuất",
    },
    {
      question:
        "Câu 12: Tại Đại hội VI (1986), Đảng ta khởi xướng việc đổi mới tư duy trong lĩnh vực nào? ",
      answer1: "Kinh tế",
      answer2: "Chính trị",
      answer3: "Quân sự",
      answer4: "Đối ngoại",
      correct: "Kinh tế",
    },
    {
      question:
        "Câu 13: Chọn phương án đúng nhất: Mục đích cơ bản của việc đổi mới tư duy kinh tế là nâng cao...? ",
      answer1: "đời sống nhân dân",
      answer2: "hiệu quả sản xuất",
      answer3: "năng suất lao động",
      answer4: "trình độ sản xuất",
      correct: "hiệu quả sản xuất",
    },
    {
      question:
        "Câu 14: Theo C Mác các nền kinh tế căn bản được phân biệt với nhau bởi: ",
      answer1: "Mục đích xã hội của sản xuất của cải vật chất",
      answer2: "Phương thức sản xuất của cải vật chất",
      answer3: "Mục đích của quá trình sản xuất ra của cải",
      answer4: "Mục đích tự nhiên của sản xuất của cải vật chất",
      correct: "Phương thức sản xuất của cải vật chất",
    },
    {
      question:
        "Câu 15: Có thể đồng nhất “Kiến trúc thượng tầng” với “Hệ thống chính trị” không? ",
      answer1: "Có",
      answer2: "Không",
      answer3: "",
      answer4: "",
      correct: "Không",
    },
    {
      question:
        "Câu 16: Trong các yếu tố của Kiến trúc thượng tầng, yếu tố nào quan trọng nhất? ",
      answer1: "Nhà nước",
      answer2: "Các hiệp hội",
      answer3: "Giáo hội",
      answer4: "Đảng phái",
      correct: "Nhà nước",
    },
    {
      question:
        "Câu 17: Theo Ănghen sự khác nhau căn bản giữa con người và con vật là ở chỗ: ",
      answer1: "Con người biết lao động sản xuất ra của cải vật chất",
      answer2: "Con người có ngôn ngữ và giao tiếp xã hội",
      answer3: "Con người biết nhận thức và có văn hóa",
      answer4: "Con người biết tư duy và sáng tạo",
      correct: "Con người biết lao động sản xuất ra của cải vật chất",
    },
    {
      question:
        "Câu 18: Theo quan điểm của chủ nghĩa duy vật lịch sử: Trình độ phát triển của lực lượng sản xuất là... ",
      answer1: "trình độ phát triển của con người",
      answer2: "phản ánh trình độ chinh phục tự nhiên của con người",
      answer3: "trình độ phát triển của con người và xã hội",
      answer4: "phản ánh trình độ cải tạo xã hội của con người",
      correct: "phản ánh trình độ chinh phục tự nhiên của con người",
    },
    {
      question:
        "Câu 19: Nhà nước là thiết chế tương ứng với hình thái ý thức xã hội nào sau đây? ",
      answer1: "Tôn giáo",
      answer2: "Khoa học",
      answer3: "Chính trị",
      answer4: "Pháp luật",
      correct: "Chính trị",
    },
    {
      question:
        "Câu 20: Chon câu trả lời đúng nhất: Khái niệm quan hệ sản xuất dùng để chỉ... ",
      answer1: "mối quan hệ vật chất và tinh thần giữa con người với con người",
      answer2:
        "mối quan hệ giữa con người với con người trong quá trình lao động",
      answer3: "mối quan hệ giữa con người với con người",
      answer4: "mối quan hệ giữa con người với tự nhiên",
      correct:
        "mối quan hệ giữa con người với con người trong quá trình lao động",
    },
  ],

  // set 10
  [
    {
      question:
        "Câu 1: Câu nói: ”Mặt trời mọc ở đằng Đông, lặn ở đằng Tây”, có phải là một chân lý không? ",
      answer1: "Có",
      answer2: "Không",
      answer3: "",
      answer4: "",
      correct: "Không",
    },
    {
      question:
        "Câu 2: Hành vi lịch sử đầu tiên  phân biệt con người với con vật là... ",
      answer1: "hoạt động chính trị",
      answer2: "sản xuất tư  liệu sinh hoạt",
      answer3: "săn bắt và hái lượm",
      answer4: "nghiên cứu khoa học",
      correct: "sản xuất tư  liệu sinh hoạt",
    },
    {
      question:
        "Câu 3: Nghề gì đã thay thế trạng thái  ”săn bắt và hái lượm” ban đầu của con người? ",
      answer1: "Du lịch, dịch vụ",
      answer2: "Trồng trọt, chăn nuôi",
      answer3: "Thủ công nghiệp",
      answer4: "Thương nghiệp",
      correct: "Trồng trọt, chăn nuôi",
    },
    {
      question: "Câu 4: Tư liệu sản xuất bao gồm những yếu tố nào? ",
      answer1: "Đối tượng và công cụ lao động",
      answer2: "Giới tự nhiên và công cụ lao động",
      answer3: "Con người và công cụ lao động",
      answer4: "Giới tự nhiên và con người",
      correct: "Đối tượng và công cụ lao động",
    },
    {
      question:
        "Câu 5: Quan hệ sản xuất là quan hệ kinh tế cơ bản của xã hội, vì nó......? ",
      answer1: "thay đổi  khi các quan hệ xã hội khác ổn định",
      answer2: "thay đổi khi  các quan hệ xã hội khác thay đổi",
      answer3: "giữ vai trò quyết định các quan hệ xã hội khác",
      answer4: "tổ chức sản xuất xã hội",
      correct: "giữ vai trò quyết định các quan hệ xã hội khác",
    },
    {
      question:
        "Câu 6: Quan hệ cơ bản nhất trong hệ thống quan hệ sản xuất là mối quan hệ... ",
      answer1: "sở hữu về tư liệu sản xuất",
      answer2: "phân phối của cải xã hội",
      answer3: "sở hữu về trí tuệ",
      answer4: "tổ chức sản xuất xã hội",
      correct: "sở hữu về tư liệu sản xuất",
    },
    {
      question:
        "Câu 7: Hoàn thiện câu: “Quan hệ sản xuất là quan hệ giữa người và người trong ...” ",
      answer1: "chính tri",
      answer2: "đấu tranh",
      answer3: "sản xuất",
      answer4: "đời sống",
      correct: "sản xuất",
    },
    {
      question:
        "Câu 8: Ở nước ta hiện nay, cơ sở hạ tầng xây dựng trên một cơ chế kinh tế nào? ",
      answer1: "Kế hoạch hóa",
      answer2: "Thị trường xã hội chủ nghĩa",
      answer3: "Quan liêu, bao cấp, hành chính",
      answer4: "Thị trường tự do",
      correct: "Thị trường xã hội chủ nghĩa",
    },
    {
      question:
        "Câu 9: Thực chất của công cuộc đổi mới ở nước ta là đổi mới từ phương diện nào? ",
      answer1: "Quan hệ xã hội",
      answer2: "Phân phối sản phẩm",
      answer3: "Lực lượng sản xuất",
      answer4: "Quan hệ sản xuất",
      correct: "Quan hệ sản xuất",
    },
    {
      question:
        "Câu 10: . Nhân tố nào tác động trực tiếp và mạnh mẽ nhất tới cơ sở kinh tế của xã hội? ",
      answer1: "Nhà nước",
      answer2: "Các hiệp hội",
      answer3: "Đảng phái",
      answer4: "Giáo hội",
      correct: "Nhà nước",
    },
    {
      question:
        "Câu 11: Đảng phái là thiết chế tương ứng với hình thái ý thức xã hội nào sau đây? ",
      answer1: "Pháp luật",
      answer2: "Khoa học",
      answer3: "Tôn giáo",
      answer4: "Chính trị",
      correct: "Chính trị",
    },
    {
      question:
        "Câu 12: Trong những Quan hệ sản xuất hợp thành cơ cấu kinh tế, Quan hệ sản xuất nào giữ vị trí chủ đạo? ",
      answer1: "QHSX đang thống trị",
      answer2: "QHSX tàn dư của xã hội trước",
      answer3: "QHSX mầm mồng của xã hội sau",
      answer4: "",
      correct: "QHSX đang thống trị",
    },
    {
      question:
        "Câu 13: Theo quan điểm của chủ nghĩa duy vật lịch sử. Khẳng định nào là đúng khi xem xét mối quan hệ giữa lực lượng sản xuất và quan hệ sản xuất? ",
      answer1: "Lực lượng sản xuất phụ thuộc vào quan hệ sản xuất",
      answer2:
        "Quan hệ sản xuất phụ thuộc vào trình độ phát triển của lực lượng sản xuất",
      answer3:
        "Quan hệ sản xuất và lực lượng sản xuất tồn tại độc lập với nhau",
      answer4:
        "Quan hệ sản xuất và lực lượng sản xuất đều phụ thuộc vào quyền lực nhà nước",
      correct:
        "Quan hệ sản xuất phụ thuộc vào trình độ phát triển của lực lượng sản xuất",
    },
    {
      question:
        "Câu 14: Mối quan hệ giữa lực lượng sản xuất và quan hệ sản xuất là mối quan hệ... ",
      answer1: "luôn thống nhất với nhau",
      answer2: "luôn đấu tranh với nhau",
      answer3: "thống nhất và đấu tranh của các mặt đối lập",
      answer4: "Thống nhất hoàn toàn với nhau",
      correct: "thống nhất và đấu tranh của các mặt đối lập",
    },
    {
      question:
        "Câu 15: Quy luật cơ bản nhất, chi phối quyết định toàn bộ quá trình vận động, phát triển của lịch sử loài người là quy luật nào? ",
      answer1: "Quy luật đấu tranh giai cấp",
      answer2: "Quy luật phát triển khoa học và công nghệ",
      answer3: "Quy luật kinh tế thị trường",
      answer4:
        "Quy luật quan hệ sản xuất phù hợp với trình độ phát triển của lực lượng sản xuất",
      correct:
        "Quy luật quan hệ sản xuất phù hợp với trình độ phát triển của lực lượng sản xuất",
    },
    {
      question: "Câu 16: Theo quan điểm của Triết học Mác- Lênin, thì... ",
      answer1: "Kiến trúc thượng tầng quyết định Cơ sở hạ tầng",
      answer2: "Cơ sở hạ tầng tồn tại độc lập",
      answer3: "Kiến trúc thượng tầng  tồn tại tự thân",
      answer4: "Cơ sở hạ tầng quyết định Kiến trúc thượng tầng",
      correct: "Cơ sở hạ tầng quyết định Kiến trúc thượng tầng",
    },
    {
      question: "Câu 18: Theo quan điểm của Triết học Mác- Lênin, thì... ",
      answer1: "Cơ sở hạ tầng tồn tại độc lập",
      answer2: "Kiến trúc thượng tầng quyết định Cơ sở hạ tầng",
      answer3: "Cơ sở hạ tầng quyết định Kiến trúc thượng tầng",
      answer4: "Kiến trúc thượng tầng  tồn tại tự thân",
      correct: "Cơ sở hạ tầng quyết định Kiến trúc thượng tầng",
    },
    {
      question: "Câu 19: Tồn tại xã hội được cấu thành từ những yếu tố nào? ",
      answer1: "Điện, đường, trường, trạm",
      answer2: "Những điều kiện sinh hoạt vật chất của xã hội",
      answer3: "Điều kiện tự nhiên, Dân số, Phương thức sản xuất",
      answer4: "Con người và khoa học công nghệ.",
      correct: "Điều kiện tự nhiên, Dân số, Phương thức sản xuất",
    },
    {
      question: "Câu 20: Ý thức xã hội là toàn bộ đời sống ...? ",
      answer1: "tâm linh xã hội",
      answer2: "tinh thần xã hội",
      answer3: "văn hoá xã hội",
      answer4: "tôn giáo xã hội",
      correct: "tinh thần xã hội",
    },
  ],

  // set 11
  [
    {
      question: "Câu 1: Ý thức xã hội được cấu thành từ những nhân tố nào? ",
      answer1: "Tâm lý xã hội và hệ tư tưởng",
      answer2: "Văn hóa và tôn giáo",
      answer3: "Văn hóa và chính trị",
      answer4: "Tình cảm và hệ tư tưởng",
      correct: "Tâm lý xã hội và hệ tư tưởng",
    },
    {
      question:
        "Câu 2: Chọn phương án sai: Tâm lý xã hội có những đặc điểm gì? ",
      answer1: "Phản ánh gián tiếp đời sống",
      answer2: "Nặng về tình cảm",
      answer3: "Phản ánh trực tiếp đời sống",
      answer4: "Biến đổi nhanh",
      correct: "Phản ánh gián tiếp đời sống",
    },
    {
      question: "Câu 3: Hệ tư tưởng có đặc điểm gì? ",
      answer1: "Nặng về tình cảm",
      answer2: "Phản ánh trực tiếp đời sống xã hội",
      answer3: "Phản ánh trình độ trí tuệ",
      answer4: "Mang tính chủ quan",
      correct: "Phản ánh trình độ trí tuệ",
    },
    {
      question:
        "Câu 4: Qua luận điểm “Sức mạnh của tập quán được tạo ra qua nhiều thế hệ là sức mạnh ghê gớm nhất”, Lênin ngụ ý điều gì? ",
      answer1: "Tính độc lập của ý thức xã hội",
      answer2: "Tác động giữa các hình thái ý thức xã hội",
      answer3: "Tác động trở lại của ý thức xã hội với tồn tại xã hội",
      answer4: "Tính tiên phong của ý thức xã hội.",
      correct: "Tác động trở lại của ý thức xã hội với tồn tại xã hội",
    },
    {
      question:
        "Câu 5: Luận điểm nào là đúng, theo quan điểm của chủ nghĩa duy vật lịch sử? ",
      answer1:
        "Quan hệ sản xuất có thể vượt trước trình độ phát triển của lực lượng sản xuất",
      answer2:
        "Quan hệ sản xuất có thể vượt trước trình độ phát triển của lực lượng sản xuất tùy theo điều kiện cụ thể",
      answer3:
        "Quan hệ sản xuất có thể lạc hậu hơn trình độ phát triển của lực lượng sản xuất",
      answer4:
        "Quan hệ sản xuất phải phù hợp với trình độ phát triển của lực lượng sản xuất",
      correct:
        "Quan hệ sản xuất phải phù hợp với trình độ phát triển của lực lượng sản xuất",
    },
    {
      question:
        "Câu 6:  Theo quan điểm của chủ nghĩa duy vật lịch sử? Trong mối giữa Lực lượng sản xuất và Quan hệ sản xuất: ",
      answer1: "Cả hai yếu tố đều có tính ổn định, ít biến đổi",
      answer2: "Lực lượng sản xuất là yếu tố thường xuyên biến đổi, phát triển",
      answer3: "Quan hệ sản xuất là yếu tố thường xuyên biến đổi, phát triển",
      answer4: "Cả hai là các yếu tố thường xuyên biến đổi, phát triển",
      correct: "Lực lượng sản xuất là yếu tố thường xuyên biến đổi, phát triển",
    },
    {
      question:
        "Câu 7: Theo quan điểm của chủ nghĩa duy vật lịch sử, quan hệ cơ bản nhất quyết định mọi quan hệ khác của xã hội là... ",
      answer1: "quan hệ văn hóa",
      answer2: "quan hệ tôn giáo",
      answer3: "quan hệ chính trị",
      answer4: "quan hệ kinh tế",
      correct: "quan hệ kinh tế",
    },
    {
      question:
        "Câu 8: Truyền thống dân tộc phản ánh đặc điểm gì của ý thức xã hội? ",
      answer1: "Tính độc lập",
      answer2: "Tính kế thừa",
      answer3: "Tính tiên phong",
      answer4: "Tính lạc hậu",
      correct: "Tính kế thừa",
    },
    {
      question:
        "Câu 9: Mối quan hệ giữa cơ sở hạ tầng và kiến trúc thượng tầng là mối quan hệ... ",
      answer1: "luôn thống nhất với nhau",
      answer2: "luôn đối lập với nhau",
      answer3: "thống nhất là chủ đạo, đấu tranh là tạm thời",
      answer4: "thống nhất và đấu tranh giữa hai mặt đối lập",
      correct: "thống nhất và đấu tranh giữa hai mặt đối lập",
    },
    {
      question:
        "Câu 10: Hình thái Kinh tế -Xã hội là một phạm trù dùng để biểu thị? ",
      answer1: "Một kiểu nhà nước trong lịch sử",
      answer2: "Một xã hội ở từng giai đoạn lịch sử nhất định",
      answer3: "Một phương thức sinh sống của xã hội",
      answer4: "Một nền văn minh trong lịch sử",
      correct: "Một xã hội ở từng giai đoạn lịch sử nhất định",
    },
    {
      question:
        "Câu 11: Theo quan điểm duy vật lịch sử, yếu tố cơ bản nhất tạo thành điều kiện sinh hoạt vật chất của xã hội là các yếu tố thuộc về: ",
      answer1: "Điều kiện về dân số",
      answer2:
        "Không có yếu tố nào là cơ bản nhất, tùy thuộc vào từng điều kiện lịch sử",
      answer3: "Phương thức sản xuất của cải vật chất",
      answer4: "Điều kiện tự nhiên",
      correct: "Phương thức sản xuất của cải vật chất",
    },
    {
      question:
        "Câu 12: Ai là người đầu tiên nêu ra phạm trù “hình thái kinh tế - xã hội”? ",
      answer1: "Hêghen",
      answer2: "V.I.Lênin",
      answer3: "Ph.Ănghen",
      answer4: "C. Mác",
      correct: "C. Mác",
    },
    {
      question:
        "Câu 13: Tính thống nhất trong sự đa dạng về con đường phát triển của lịch sử xã hội loài người là gì? ",
      answer1: "Phát triển phụ thuộc vào ý muốn con người",
      answer2: "Phát triển từ Phương thức sản xuất thấp lên trình độ cao hơn",
      answer3: "Phát triển không tuân theo một quy luật nào",
      answer4: "Phát triển phụ thuộc vào điều kiện lịch sử",
      correct: "Phát triển từ Phương thức sản xuất thấp lên trình độ cao hơn",
    },
    {
      question:
        "Câu 14: Qua  luận điểm: “Cái cối xay quay bằng tay đưa lại xã hội có lãnh chúa phong kiến, cái cối xay chạy bằng hơi nước đưa lại xã hội có nhà tư bản công nghiệp”,  Mác hàm ý gì? ",
      answer1: "Vai trò quyết định của kinh tế đối với chính trị",
      answer2:
        "Vai trò quyết định của quan hệ sản xuất đối với lực lượng sản xuất",
      answer3: "Quan hệ biện chứng giữa lực lượng sản xuất và quan hệ sản xuất",
      answer4:
        "Vai trò quyết định của lực lượng sản xuất đối với quan hệ sản xuất",
      correct:
        "Vai trò quyết định của lực lượng sản xuất đối với quan hệ sản xuất",
    },
    {
      question:
        "Câu 15: Qua luận điểm: “Sự phát triển của các hình thái kinh tế - xã hội là một quá trình lịch sử tự nhiên”, Mác khẳng định lịch sử xã hội loài người phát triển.... ",
      answer1: "phụ thuộc vào ý thức con người",
      answer2: "theo quy luật tất yếu khách quan",
      answer3: "tuỳ thuộc vào ý chí Thượng đế",
      answer4: "phụ thuộc quy luật tự nhiên",
      correct: "theo quy luật tất yếu khách quan",
    },
    {
      question:
        "Câu 16: Có thể so sánh Lực lượng sản xuất và Quan hệ sản xuất với cặp phạm trù nào sau đây? ",
      answer1: "Cái riêng và cái chung",
      answer2: "Nguyên nhân và kết quả",
      answer3: "Bản chất và hiện tượng",
      answer4: "Nội dung và hình thức",
      correct: "Nội dung và hình thức",
    },
    {
      question:
        "Câu 17: Lực lượng sản xuất là nội dung vật chất, Quan hệ sản xuất là hình thức xã hội của quá trình sản xuất, đúng hay sai? ",
      answer1: "Đúng",
      answer2: "Sai",
      answer3: "",
      answer4: "",
      correct: "Đúng",
    },
    {
      question:
        "Câu 18: Trong hình thái kinh tế - xã hội Công xã nguyên thuỷ, quan hệ sản xuất dựa trên chế độ gì? ",
      answer1: "Có sự đan xen giữa công hữu và tư hữu",
      answer2: "Tư hữu về tư liệu sản xuất",
      answer3: "Công hữu về tư liệu sản xuất",
      answer4: "",
      correct: "Công hữu về tư liệu sản xuất",
    },
    {
      question:
        "Câu 19: Khi tiếp cận lịch sử theo hình thái kinh tế - xã hội, Mác đã dựa trên tiêu chí nào?",
      answer1: "Phương thức sinh sống",
      answer2: "Tư hữu về tư liệu sản xuất",
      answer3: "Công hữu về tư liệu sản xuất",
      answer4: "Phương thức sản xuất",
      correct: "Phương thức sản xuất",
    },
    {
      question:
        "Câu 20: Trong hình thái kinh tế - xã hội Công xã nguyên thuỷ, quan hệ sản xuất dựa trên chế độ gì? ",
      answer1: "Có sự đan xen giữa công hữu và tư hữu",
      answer2: "Tư hữu về tư liệu sản xuất",
      answer3: "Công hữu về tư liệu sản xuất",
      answer4: "",
      correct: "Công hữu về tư liệu sản xuất",
    },
  ],

  // set 12
  [
    {
      question:
        "Câu 1: Mác đã xuất phát từ quan hệ nào, coi đó là những quan hệ cơ bản nhất để phân tích kết cấu xã hội? ",
      answer1: "Quan hệ chính trị",
      answer2: "Quan hệ sản xuất",
      answer3: "Quan hệ giữa con người và tự nhiên",
      answer4: "Quan hệ luật pháp",
      correct: "Quan hệ sản xuất",
    },
    {
      question:
        "Câu 2: . Nhân tố nào là nguồn gốc cơ bản trực tiếp hình thành giai cấp? ",
      answer1: "Việc chế tác và sử dụng công cụ lao động bằng kim loại",
      answer2: "Sự xuất hiện chế độ tư hữu về tư liệu sản xuất",
      answer3: "Sự phân công lao động thành lao động trí óc và chân tay",
      answer4: "Kinh tế xã hội phát triển, của cải sản xuất dồi dào",
      correct: "Sự xuất hiện chế độ tư hữu về tư liệu sản xuất",
    },
    {
      question:
        "Câu 3:  Chế độ xã hội có giai cấp đầu tiên trong lịch sử là...? ",
      answer1: "Công xã nguyên thuỷ",
      answer2: "Xã hội chủ nghĩa",
      answer3: "Chiếm hữu nô lệ",
      answer4: "Phong kiến",
      correct: "Chiếm hữu nô lệ",
    },
    {
      question:
        "Câu 4: Lênin đã nêu lên định nghĩa về giai cấp trong tác phẩm nào? ",
      answer1: "Sáng kiến vĩ đại",
      answer2: "Nhà nước và cách mạng",
      answer3: "Thà ít mà tốt",
      answer4: "Bút ký triết học",
      correct: "Sáng kiến vĩ đại",
    },
    {
      question: "Câu 5: Yếu tố nào sau đây không thuộc đặc trưng giai cấp? ",
      answer1: "Các giai cấp khác nhau về mức hưởng thụ của cải",
      answer2: "Các giai cấp khác nhau về  vai trò tổ chức sản xuất",
      answer3: "Các giai cấp khác nhau về văn hóa, lối sống",
      answer4: "Các giai cấp khác nhau về quyền sở hữu TLSX",
      correct: "Các giai cấp khác nhau về văn hóa, lối sống",
    },
    {
      question:
        "Câu 6: . Kết cấu giai cấp bao gồm những thành phần: giai cấp cơ bản, … ",
      answer1: "giai cấp không cơ bản, tiểu thương",
      answer2: "giai cấp không cơ bản, tầng lớp trung gian",
      answer3: "tầng lớp trí thức và tăng lữ",
      answer4: "giai cấp quá độ, giai cấp không cơ bản",
      correct: "giai cấp không cơ bản, tầng lớp trung gian",
    },
    {
      question: "Câu 7: Nguyên nhân sâu xa của cách mạng xã hội là gì? ",
      answer1: "Mâu thuẫn giữa LLSX phát triển  với QHSX lỗi thời",
      answer2: "Mâu thuẫn giữa các đảng phái đối lập",
      answer3: "Khát vọng đổi đời của quần chúng",
      answer4: "Mâu thuẫn giữa nhà nước và nhân dân",
      correct: "Mâu thuẫn giữa LLSX phát triển  với QHSX lỗi thời",
    },
    {
      question:
        "Câu 8: Vấn đề  cốt lõi nhất của mọi cuộc cách mạng xã hội là gì? ",
      answer1: "Cải cách chế độ xã hội cũ",
      answer2: "Giành chính quyền nhà nước",
      answer3: "Thay đổi lối sống cũ",
      answer4: "Chiếm đoạt tư liệu sản xuất",
      correct: "Giành chính quyền nhà nước",
    },
    {
      question:
        "Câu 9: Theo quan điểm triết học Mác - Lênin, cách mạng xã hội là....? ",
      answer1: "Đỉnh cao của đấu tranh giai cấp",
      answer2: "Sự cải cách kinh tế - chính trị",
      answer3: "Đấu tranh phê và tự phê bình",
      answer4: "Quá trinh đấu tranh giai cấp",
      correct: "Đỉnh cao của đấu tranh giai cấp",
    },
    {
      question:
        "Câu 10: Trên thế giới hiện nay, còn có đấu tranh giai cấp không? ",
      answer1: "Không",
      answer2: "Có",
      answer3: "",
      answer4: "",
      correct: "Có",
    },
    {
      question:
        "Câu 12: Có thể đồng nhất khái niệm cá nhân và khái niệm con người không? ",
      answer1: "Có",
      answer2: "Không",
      answer3: "",
      answer4: "",
      correct: "Không",
    },
    {
      question: "Câu 13: Cá nhân là......? ",
      answer1: "một con người cụ thể",
      answer2: "một con người trừu tượng",
      answer3: "một con người nói chung",
      answer4: "một con người riêng biệt",
      correct: "một con người cụ thể",
    },
    {
      question:
        "Câu 14: . Hoàn thiện câu: Con người là khái niệm dùng để chỉ ..... trong bản chất con người của tất cả cá nhân ",
      answer1: "tính cá biệt",
      answer2: "tính cụ thể",
      answer3: "tính trừu tượng",
      answer4: "tính phổ biến",
      correct: "tính phổ biến",
    },
    {
      question: "Câu 15: Theo quan niệm Mác - Lênin, nhân cách là... ",
      answer1: "cách đối nhân xử thế của con người",
      answer2: "tổng hoà mọi năng lực của con người",
      answer3: "hình thức bề ngoài của con người",
      answer4: "đạo đức, lối sống của con người",
      correct: "tổng hoà mọi năng lực của con người",
    },
    {
      question:
        "Câu 16: Yếu tố gì là cơ sở của mối quan hệ giữa cá nhân và tập thể? ",
      answer1: "Lợi ích nói chung",
      answer2: "Lập trường chính trị",
      answer3: "Lối sống, sở thích",
      answer4: "Pháp luật nhà nước",
      correct: "Lợi ích nói chung",
    },
    {
      question:
        "Câu 17: Theo quan điểm triết học Mác- Lênin, về cơ bản, lịch sử do ai quyết định? ",
      answer1: "Mệnh trời quyết định",
      answer2: "Cá nhân kiệt xuất",
      answer3: "Quần chúng nhân dân",
      answer4: "Điều kiện khách quan",
      correct: "Quần chúng nhân dân",
    },
    {
      question:
        'Câu 18: Chọn câu trả lời đúng theo định nghĩa về giai cấp của Lênin:  " Sự khác biệt cơ bản nhất giữa các giai cấp là địa vị của họ trong..." ',
      answer1: "quyền lực nhà nước",
      answer2: "quyền sở hữu tư liệu sản xuất",
      answer3: "quyền lực chính trị",
      answer4: "quyền lực quản lý kinh tế",
      correct: "quyền sở hữu tư liệu sản xuất",
    },
    {
      question:
        'Câu 19: Theo quan điểm của chủ nghĩa Mác-Lênin " Con người là..." ',
      answer1: "thực thể vật chất tự nhiên",
      answer2: "thực thể tự nhiên và xã hội",
      answer3: "thực thể biết tư duy và có văn hóa",
      answer4: "thực thế chính trị xã hội",
      correct: "thực thể tự nhiên và xã hội",
    },
    {
      question:
        "Câu 20: Trong các chế độ xã hội sau, chế độ nào sẽ không còn giai cấp?",
      answer1: "Công xã nguyên thuỷ",
      answer2: "Xã hội chủ nghĩa",
      answer3: "Chiếm hữu nô lệ",
      answer4: "Cộng sản chủ nghĩa",
      correct: "Cộng sản chủ nghĩa",
    },
  ],
];
