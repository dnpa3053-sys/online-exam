let timeLeft = 600;
let timer;

let tabCount = 0;
let idleCount = 0;

let logs = [];

let idleTimer;

const answers = {
    q1:"B",
    q2:"A",
    q3:"C",
    q4:"A",
    q5:"B"
};

function startExam(){

    let nama = document.getElementById("nama").value;
    let nim = document.getElementById("nim").value;

    if(nama === "" || nim === ""){
        alert("Isi Nama dan NIM!");
        return;
    }

    document.getElementById("startPage").classList.add("hidden");
    document.getElementById("examPage").classList.remove("hidden");

    startTimer();
    resetIdleTimer();
}

function startTimer(){

    timer = setInterval(()=>{

        let min = Math.floor(timeLeft/60);
        let sec = timeLeft%60;

        document.getElementById("timer").innerHTML=
        `${min}:${sec<10?'0':''}${sec}`;

        timeLeft--;

        if(timeLeft < 0){
            finishExam();
        }

    },1000);
}

function finishExam(){

    clearInterval(timer);

    let score = 0;

    for(let q in answers){

        let selected =
        document.querySelector(`input[name="${q}"]:checked`);

        if(selected && selected.value === answers[q]){
            score += 20;
        }
    }

    document.getElementById("examPage").classList.add("hidden");
    document.getElementById("resultPage").classList.remove("hidden");

    document.getElementById("score").innerHTML =
    `Skor Anda : ${score}`;

    document.getElementById("tabViolations").innerHTML =
    `Pindah Tab : ${tabCount} kali`;

    document.getElementById("idleInfo").innerHTML =
    `AFK : ${idleCount} kali`;

    let list = document.getElementById("logList");

    logs.forEach(log=>{
        let li = document.createElement("li");
        li.textContent = log;
        list.appendChild(li);
    });
}

document.addEventListener("visibilitychange",()=>{

    if(document.hidden){

        tabCount++;

        logs.push(
        `[${new Date().toLocaleTimeString()}]
        Pindah tab terdeteksi`
        );

        document.getElementById("warningBox").innerHTML =
        `⚠ Jangan pindah tab!`;

        if(tabCount >= 3){

            logs.push("Ujian dikunci karena terlalu banyak pelanggaran.");

            alert("Ujian dikunci!");

            finishExam();
        }
    }
});

function resetIdleTimer(){

    clearTimeout(idleTimer);

    idleTimer = setTimeout(()=>{

        idleCount++;

        logs.push(
        `[${new Date().toLocaleTimeString()}]
        User AFK lebih dari 15 detik`
        );

        document.getElementById("warningBox").innerHTML =
        "⚠ User AFK";

    },15000);
}

["mousemove","keydown","click","scroll"]
.forEach(event=>{

    document.addEventListener(event,()=>{

        resetIdleTimer();

        document.getElementById("warningBox").innerHTML="";
    });

});