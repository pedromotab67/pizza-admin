// Utilitarios compartilhados - axios, autenticacao e helpers - [Pedro Mota Batista]

const API = '/api';

// Retorna headers com token JWT - [Pedro Mota Batista]
function getHeaders() {
  return {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  };
}

function requireAuth() {
  if (!localStorage.getItem('token')) window.location.href = '/';
}

function logout() {
  localStorage.clear();
  window.location.href = '/';
}

function showAlert(msg, tipo = 'sucesso') {
  const el = document.getElementById('alerta');
  if (!el) return;
  el.textContent = msg;
  el.className = `alert alert-${tipo}`;
  el.classList.remove('hidden');
  setTimeout(() => el.classList.add('hidden'), 3500);
}

function formatMoeda(valor) {
  return 'R$ ' + parseFloat(valor).toFixed(2).replace('.', ',');
}

function formatData(iso) {
  return new Date(iso).toLocaleString('pt-BR');
}

// Busca endereco via API ViaCEP - [Pedro Mota Batista]
async function buscarCEP(cep) {
  const c = cep.replace(/\D/g, '');
  if (c.length !== 8) return null;
  try {
    const res = await axios.get(`https://viacep.com.br/ws/${c}/json/`);
    return res.data.erro ? null : res.data;
  } catch { return null; }
}

// Busca municipios do estado via API IBGE - [Pedro Mota Batista]
async function buscarMunicipios(uf) {
  const res = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`);
  return res.data;
}
