//Variables

const btnVoice = document.querySelector('#btn-voice');
const texto = document.querySelector('#text-voice');


btnVoice.addEventListener('click', ejecutarSpeechAPI);

function ejecutarSpeechAPI(){
    const SpeechRecognition = webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.start();

    recognition.onstart = function(){
        texto.classList.remove('d-none');
        texto.classList.add('d-block');
        texto.innerHTML = `<p class="text-center"> Escuchando... </p>`;
    }

    recognition.onspeechend = ()=>{
        texto.innerHTML = `<p class="text-center"> Se detuvo la grabación... </p>`;
        recognition.stop();
    }

    recognition.onresult = e =>{

        console.log(e.results[0][0]);

        const {confidence, transcript} = e.results[0][0];

        const speech = document.createElement('P');
        speech.classList.add('text-center');
        speech.innerHTML = `Esto fue lo que dijiste: ${transcript}`;

        const precision = document.createElement('P');
        precision.classList.add('text-center', 'mt-3');

        texto.appendChild(precision);
        texto.appendChild(speech);
    }
}