const medita = () => {
  const music = document.querySelector(".musica");
  const play = document.querySelector(".play");
  const outline = document.querySelector(".btn-medita circle");
  const video = document.querySelector(".video-container video");

  // Sons
  const sounds = document.querySelectorAll(".audios-site button");
  // Time display
  const mostraTempo = document.querySelector(".mostra-tempo");
  const timeSelect = document.querySelectorAll(".seletor-tempo button");
  // tempo do outline
  const tempoMedita = outline.getTotalLength();
  console.log(tempoMedita);
  // duração
  let duracaoFalsa = 600;

  outline.style.strokeDasharray = tempoMedita;
  outline.style.strokeDashoffset = tempoMedita;

  // escolher os sons
  sounds.forEach(sound => {
    sound.addEventListener("click", function(){
      music.src = this.getAttribute("data-sound");
      video.src = this.getAttribute("data-video");
      checarMusica(music);
    });
  });

  // tocar os sons
   play.addEventListener("click", () => {
     checarMusica(music);
   });

   // Selecionar som
   timeSelect.forEach(option => {
     option.addEventListener("click", function(){
       duracaoFalsa = this.getAttribute("data-time");
       mostraTempo.textContent = 0+`${Math.floor(duracaoFalsa/60)}:` +0+ `${Math.floor(duracaoFalsa%60)}`;
     });
   });

   // Para e começar os sons
   const checarMusica = music => {
     if(music.paused) {
       music.play();
       video.play();
       play.src = './svg/pause.svg';
     } else {
       music.pause();
       video.pause();
       play.src = './svg/play.svg';
     }
    };

    // Animação do circle 
    music.ontimeupdate = () => {
      let currentTime = music.currentTime;
      let elapsed = duracaoFalsa - currentTime;
      let segundos = Math.floor(elapsed % 60);
      let minutos = Math.floor(elapsed / 60);

      // Anima o circle
      let progress = tempoMedita - (currentTime / duracaoFalsa) * tempoMedita;
      outline.style.strokeDashoffset = progress;

      // Anima o texto
      mostraTempo.textContent = 0+`${minutos}:${segundos}`;

      if(currentTime >= duracaoFalsa) {
        music.pause();
        music.currentTime = 0;
        play.src = "./svg/play.svg";
        video.pause();
      };
    };

};

medita();