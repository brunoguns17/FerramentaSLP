// --- FUNÇÕES DE ZOOM DA IMAGEM ---
function expandirImagem(el) {
    const modal = document.getElementById('modalImagem');
    const imgExpandida = document.getElementById('imagemExpandida');
    
    imgExpandida.src = el.src; 
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; 
}

function fecharImagem() {
    const modal = document.getElementById('modalImagem');
    modal.classList.add('hidden');
    document.body.style.overflow = ''; 
}

// Fechar com tecla ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') fecharImagem();
});

// --- FUNÇÃO DE ENVIO DO FORMULÁRIO PARA O SEU BACKEND ---
document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault(); // Impede o envio padrão do formulário
    
    const formData = {
        name: e.target.name.value,
        email: e.target.email.value,
        message: e.target.message.value
    };

    try {
        const response = await fetch('http://localhost:3000/enviar-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            alert('Mensagem enviada com sucesso!');
            e.target.reset(); // Limpa o formulário
        } else {
            alert('Erro ao enviar mensagem. Tente novamente.');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Não foi possível conectar ao servidor de e-mail.');
    }
});