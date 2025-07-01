// Atualiza o relógio
function atualizarRelogio() {
  const agora = new Date();

  const horas = String(agora.getHours()).padStart(2, '0');
  const minutos = String(agora.getMinutes()).padStart(2, '0');
  const segundos = String(agora.getSeconds()).padStart(2, '0');

  const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

  const diaSemana = diasSemana[agora.getDay()];
  const dia = String(agora.getDate()).padStart(2, '0');
  const mes = meses[agora.getMonth()];
  const ano = agora.getFullYear();

  document.getElementById('clock').textContent = `${horas}:${minutos}:${segundos}`;
  document.getElementById('date').textContent = `${diaSemana}, ${dia} ${mes} ${ano}`;
}

// Dark/Light mode
const body = document.body;
const btnToggle = document.getElementById('toggle-theme');
const selectTheme = document.getElementById('select-theme');

btnToggle.addEventListener('click', () => {
  body.classList.toggle('light');
  salvarPreferencias();
});

selectTheme.addEventListener('change', () => {
  aplicarTema(selectTheme.value);
  salvarPreferencias();
});

function aplicarTema(nomeTema) {
  body.setAttribute('data-theme', nomeTema); 
  selectTheme.value = nomeTema;
}

// Cronômetro
let cronometroInterval;
let tempo = 0;
let rodando = false;

const timerDisplay = document.getElementById('timer');
const btnStartStop = document.getElementById('start-stop');
const btnReset = document.getElementById('reset');

btnStartStop.addEventListener('click', () => {
  if (!rodando) {
    rodando = true;
    btnStartStop.textContent = 'Pausar';
    cronometroInterval = setInterval(() => {
      tempo++;
      atualizarCronometro();
    }, 1000);
  } else {
    rodando = false;
    btnStartStop.textContent = 'Iniciar';
    clearInterval(cronometroInterval);
  }
});

btnReset.addEventListener('click', () => {
  rodando = false;
  clearInterval(cronometroInterval);
  tempo = 0;
  atualizarCronometro();
  btnStartStop.textContent = 'Iniciar';
});

function atualizarCronometro() {
  const h = Math.floor(tempo / 3600);
  const m = Math.floor((tempo % 3600) / 60);
  const s = tempo % 60;

  timerDisplay.textContent = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

// Salvar preferências no localStorage
function salvarPreferencias() {
  const temaModo = body.classList.contains('light') ? 'light' : 'dark';
  const temaSelecionado = selectTheme.value;
  localStorage.setItem('temaModo', temaModo);
  localStorage.setItem('temaPaleta', temaSelecionado);
}

// Carregar preferências
function carregarPreferencias() {
  const temaModo = localStorage.getItem('temaModo');
  const temaPaleta = localStorage.getItem('temaPaleta');

  if (temaModo === 'light') {
    body.classList.add('light');
  } else {
    body.classList.remove('light');
  }

  aplicarTema(temaPaleta || 'neon');
}

// Inicialização
carregarPreferencias();
setInterval(atualizarRelogio, 1000);
atualizarRelogio();
atualizarCronometro();


