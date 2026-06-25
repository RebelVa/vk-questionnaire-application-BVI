const tree = {
    start: {
        text: "Ваша олимпиада уровня РСОШ или ВСОШ?",
        links: [
            {
                text: "Олимпиады перечня РСОШ",
                url: "https://rsr-olymp.ru"
            },
            {
                text: "Об олимпиадах ВСОШ",
                url: "https://olymp.academtalant.ru/vseros"
            }
        ],
        answers: {
            "РСОШ": "rsoh_class",
            "ВСОШ": "vsoh_class"
        }
    },

    rsoh_class: {
        text: "Олимпиада написана за 10 или 11 класс?",
        answers: {
            "Да": "rsoh_list",
            "Нет": "fail"
        }
    },

    rsoh_list: {
        text: "Есть ли эта олимпиада в год написания в перечне РСОШ?",
        links: [
            {
                text: "Открыть архив РСОШ",
                url: "https://rsr-olymp.ru/archive"
            }
        ],
        answers: {
            "Да": "rsoh_success",
            "Нет": "fail"
        }
    },

    rsoh_success: {
        text: "Ты имеешь право поступить без вступительных испытаний в СПбПУ на соответствующие олимпиаде направления подготовки. ВАЖНО! Требуется подтвердить результаты олимпиады баллами ЕГЭ (не менее 75 баллов по профильному предмету подготовки).",
        answers: {}
    },

    vsoh_class: {
        text: "Олимпиада написана за 9, 10 или 11 класс?",
        answers: {
            "Да": "vsoh_final",
            "Нет": "fail"
        }
    },

    vsoh_final: {
        text: "Вы победитель или призёр заключительного этапа олимпиады?",
        answers: {
            "Да": "vsoh_success",
            "Нет": "vsoh_region"
        }
    },

    vsoh_success: {
        text: "Ты имеешь право поступить без вступительных испытаний в СПбПУ на соответствующие олимпиаде направления подготовки. Подтверждать результат олимпиады баллами ЕГЭ не требуется.",
        answers: {}
    },

    vsoh_region: {
        text: "Вы победитель или призёр регионального этапа олимпиады?",
        answers: {
            "Да": "vsoh_points",
            "Нет": "fail"
        }
    },

    vsoh_points: {
        text: "К сожалению, ваша олимпиада не даёт права поступить без вступительных испытаний, но добавляет 10 баллов при поступлении в качестве индивидуального достижения.",
        answers: {}
    },

    fail: {
        text: "К сожалению, ваша олимпиада не даёт права поступить без вступительных испытаний.",
        answers: {}
    }
};

let currentNode = "start";
let history = [];

function render(nodeId) {
    currentNode = nodeId;
    const node = tree[nodeId];

    document.getElementById("question").innerText = node.text;

    const links = document.getElementById("links");
    links.innerHTML = "";

    if (node.links) {
        node.links.forEach(link => {
            const a = document.createElement("a");
            a.href = link.url;
            a.target = "_blank";
            a.innerText = link.text;
            links.appendChild(a);
        });
    }

    const buttons = document.getElementById("buttons");
    buttons.innerHTML = "";

    for (const answerText in node.answers) {
        const btn = document.createElement("button");
        btn.innerText = answerText;
        btn.onclick = () => {
            history.push(currentNode);
            document.getElementById("backBtn").style.display = "inline-block";
            render(node.answers[answerText]);
        };
        buttons.appendChild(btn);
    }

    if (Object.keys(node.answers).length === 0) {
        const restartBtn = document.createElement("button");
        restartBtn.innerText = "Начать заново";
        restartBtn.onclick = restart;
        buttons.appendChild(restartBtn);
    }
}

function goBack() {
    if (history.length === 0) return;
    const previousNode = history.pop();
    render(previousNode);
    if (history.length === 0) {
        document.getElementById("backBtn").style.display = "none";
    }
}

function restart() {
    history = [];
    document.getElementById("backBtn").style.display = "none";
    render("start");
}

render("start");
