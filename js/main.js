// ==========================================
// LÓGICA DO CARROSSEL DE IMAGENS
// ==========================================
let slideAtual = 0;

function atualizarCarrossel() {
    const track = document.getElementById('carrossel-track');
    const indicadores = document.getElementById('carrossel-indicadores').children;
    
    if (!track || !indicadores) return;

    track.style.transform = `translateX(-${slideAtual * 100}%)`;
    
    for (let i = 0; i < indicadores.length; i++) {
        if (i === slideAtual) {
            indicadores[i].className = "w-4 h-2.5 rounded-full bg-[#155DFC] transition-all cursor-pointer shadow-sm";
        } else {
            indicadores[i].className = "w-2.5 h-2.5 rounded-full bg-white/80 hover:bg-white transition-all cursor-pointer shadow-sm";
        }
    }
}

function moverCarrossel(direcao) {
    const track = document.getElementById('carrossel-track');
    if (!track) return;
    
    const totalSlides = track.children.length;
    slideAtual += direcao;
    
    if (slideAtual >= totalSlides) slideAtual = 0;
    if (slideAtual < 0) slideAtual = totalSlides - 1;
    
    atualizarCarrossel();
}

function irParaSlide(index) {
    slideAtual = index;
    atualizarCarrossel();
}

// Timer para transição automática do carrossel a cada 5 segundos
setInterval(() => {
    moverCarrossel(1);
}, 5000);


// ==========================================
// LÓGICA DO MODAL (ZOOM NA IMAGEM)
// ==========================================
function expandirImagem(imgElement) {
    const modal = document.getElementById('modalImagem');
    const imagemExpandida = document.getElementById('imagemExpandida');
    
    if(modal && imagemExpandida) {
        imagemExpandida.src = imgElement.src;
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Evita que o site role por baixo
    }
}

function fecharImagem() {
    const modal = document.getElementById('modalImagem');
    if(modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = ''; // Devolve a rolagem do site
    }
}

// Permitir fechar a imagem apertando a tecla "ESC" no teclado
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        fecharImagem();
    }
});