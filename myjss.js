//names - номер карты, counts - сколько раз использовалась
var cards = {
	names: [-1,-1,-1,-1,-1,-1,-1,-1,-1],
	counts: [2,2,2,2,2,2,2,2,2]
};

const Par=9;
var score=0;
var openPar=0;
var counter=0;
var pervaya=0;
var vtoraya=0;
var delay=0;
//функция проверки наличия такой карты в массиве names
function proverka(m,j){
	for (let i=0; i<=j;i++){
		if (cards.names[i]===m){
			return true;
		}
	}
cards.names[j]=m;
return false;
}

//заполнение массива names

for (let i=0; i<9;i++){
let m=-1;
	while (proverka(m,i)) {
		m=Math.floor(Math.random() * 52);
	}
}

//цикл, который располагает карты на стол

for (let i=1; i<=18; i++){
	let m = Math.floor(Math.random() * 9);
	while (cards.counts[m]===0){
		m = Math.floor(Math.random() * 9);
	}
	cards.counts[m]--;
	document.getElementById(i).style.backgroundImage = "url(pics/cards/"+ cards.names[m] + ".png)";
	if (i===18){
		setTimeout(function(){hide();}, 5000);
	}
}

//через 5 секунд карты переворачиваются рубашкой вверх

function hide(){
	for (let i=1; i<=18; i++){
		document.getElementById(i).classList.add("hidden");
		delay++;
	}
}

//функция, которая по каждому клику карты переворачивает ее

function perevorot (id){
	if (!delay||document.getElementById(id).style.backgroundImage==="none"||(id===pervaya&&counter===1)){
		return 0;
	}
	console.log(document.getElementById(id).style.backgroundImage);
	let bal=document.getElementById("score");
	if (counter===0) {
		pervaya=id;
	}
	if (counter===1) {
		vtoraya=id;
	}
	counter++;
	if (counter<=2) {
		let karta = document.getElementById(id);
		karta.classList.remove("hidden");
	}
	else {
		let karta1 = document.getElementById(pervaya);
		let karta2 = document.getElementById(vtoraya);
		console.log(karta1.style.backgroundImage+karta2.style.backgroundImage);
		if (karta1.style.backgroundImage===karta2.style.backgroundImage&&pervaya!=vtoraya) {
			karta1.style.backgroundImage="none";
			karta2.style.backgroundImage="none";
			openPar++;
			score += 42*(Par-openPar);
			bal.innerHTML=score;
		}
		else if (karta1.style.backgroundImage!=karta2.style.backgroundImage&&pervaya!=vtoraya) {
			karta1.classList.add("hidden");
			karta2.classList.add("hidden");
			score -= 42*openPar;
			bal.innerHTML=score;
		}
		counter=0;
		pervaya=0;
		vtoraya=0;
	}
	if (openPar===9){
		window.location.href = 'finish.html'+ '#' + score;
	}
}