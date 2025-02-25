document.addEventListener('DOMContentLoaded', function () {
    const formContainer = document.getElementById('form-projetos-orcamentos');
    let currentSection = null;

    // Create a separate container for the buttons
    const buttonContainer = document.createElement('div');
    buttonContainer.id = 'navigation-buttons-container';
    formContainer.parentNode.insertBefore(buttonContainer, formContainer.nextSibling);

    let sections = [];
    let sectionIndex = 0;
    let formDataCache = {};

    document.getElementById('recomecar-preenchimento').addEventListener('click', function () {
        window.location.reload(); // Recarrega a página
    });


    document.getElementById('confirm-button').addEventListener('click', function () {
        const tipoSolicitacao = document.getElementById('tipo-solicitacao').value;
        if (tipoSolicitacao) {
            document.getElementById('popup').style.display = 'none';
            document.getElementById('form-container').classList.remove('hidden');

            formContainer.innerHTML = '';
            buttonContainer.innerHTML = ''; // Clear navigation buttons

                loadTelaInicial();

        } else {
            alert('Por favor, selecione um tipo de solicitação.');
        }
    });


    function createInformeDadosCadastraisSection() {
        return `
        <div id="informe-dados-cadastrais-section">
          <h2>Informe os dados cadastrais do cliente</h2>
          <form id="informe-dados-cadastrais-form">
            <div id="informe-dados-cadastrais-group" class="step">
              <div class="form-group">
                <label for="razao-social"><strong>Razão Social:</strong></label>
                <input type="text" id="razao-social" name="razao-social" required>
              </div>
              <div class="form-group">
                <label for="cnpj"><strong>CNPJ:</strong></label>
                <input type="text" id="cnpj" name="cnpj" required>
              </div>
            </div>
            <button type="submit" class="navigation-button">Avançar</button>
          </form>
          <div class="recomecar-container">
            <button type="button" id="recomecar-button" class="navigation-button next-button">Recomeçar</button>
          </div>
        </div>
      `;
    }

    function createInformeDadosNovoClienteSection() {
        return `
        <div id="informe-dados-novo-cliente-section">
          <h2>Informa os dados cadastrais do cliente / novo cliente</h2>
          <form id="informe-dados-novo-cliente-form">
            <div id="informe-dados-novo-cliente-group" class="step">
              <div class="form-group">
                <label for="razao-social-novo"><strong>Razão Social:</strong></label>
                <input type="text" id="razao-social-novo" name="razao-social-novo" required>
              </div>
              <div class="form-group">
                <label for="nome-fantasia"><strong>Nome Fantasia:</strong></label>
                <input type="text" id="nome-fantasia" name="nome-fantasia" required>
              </div>
              <div class="form-group">
                <label for="cnpj-novo"><strong>CNPJ:</strong></label>
                <input type="text" id="cnpj-novo" name="cnpj-novo" required>
              </div>
              <div class="form-group">
                <label for="inscricao-estadual"><strong>Inscrição Estadual:</strong></label>
                <input type="text" id="inscricao-estadual" name="inscricao-estadual" required>
              </div>
              <div class="form-group">
                <label for="contato"><strong>Contato:</strong></label>
                <input type="text" id="contato" name="contato" required>
              </div>
              <div class="form-group">
                <label for="email-contato"><strong>E-mail do contato:</strong></label>
                <input type="email" id="email-contato" name="email-contato" required>
              </div>
              <div class="form-group">
                <label for="celular-whatsapp"><strong>Celular/Whatsapp:</strong></label>
                <input type="text" id="celular-whatsapp" name="celular-whatsapp" data-mask="(00) 00000-0000" required>
              </div>
              <div class="form-group">
                <label for="telefone-fixo"><strong>Telefone Fixo:</strong></label>
                <input type="text" id="telefone-fixo" name="telefone-fixo" data-mask="(00) 0000-0000" required>
              </div>
            </div>
            <button type="submit" class="navigation-button">Avançar</button>
          </form>
        </div>
      `;
    }

    function createInformeSegmentoClienteSection() {
        return `
            <form id="informe-segmento-cliente-form">
                <div id="informe-segmento-cliente-group" class="step">
                    <h2>Informe o Segmento do cliente</h2>
                    <div class="form-group">
                        <label><strong>Segmento:</strong></label>
                        <div class="checkbox-group">
                            <label><input type="radio" name="segmento" value="material-construcao" required>Material de Construção</label>
                            <label><input type="radio" name="segmento" value="supermercado" required>Supermercado</label>
                            <label><input type="radio" name="segmento" value="pet-agro" required>Pet/Agro</label>
                            <label><input type="radio" name="segmento" value="drogaria" required>Drogaria e Similares</label>
                            <label><input type="radio" name="segmento" value="outro" required>Outro</label>
                            <input type="text" id="segmento-outro" name="segmento-outro" placeholder="Especifique" class="hidden">
                        </div>
                    </div>
                    <button type="submit" class="navigation-button">Avançar</button>
                </div>
            </form>
        `;
    }

    function createTipoProjetoSection() {
        return `
            <form id="tipo-projeto-form">
                <div id="tipo-projeto-group" class="step">
                    <h2>Tipo do Projeto</h2>
                    <div class="form-group">
                        <label><strong>Tipo:</strong></label>
                        <div class="checkbox-group">
                            <label><input type="checkbox" name="tipo-projeto" value="2d">2D</label>
                            <label><input type="checkbox" name="tipo-projeto" value="3d">3D</label>
                            <label><input type="checkbox" name="tipo-projeto" value="orcamento">Orçamento de Materiais Avulsos</label>
                        </div>
                    </div>
                    <button type="submit" class="navigation-button">Avançar</button>
                </div>
            </form>
        `;
    }

    function createConfiguracaoGondolaSection() {
        return `
        <form id="configuracao-gondola-form">
            <div id="configuracao-gondola-group" class="step">
                <h2>Configuração da Gôndola</h2>
                <div class="configuracao-container">
                    <div class="form-group opcoes-configuracao">
                        <label><strong>Opções:</strong></label>
                        <div class="checkbox-group">
                            <label><input type="checkbox" name="config-gondola" value="fundo-duplo">Fundo Duplo</label>
                            <label><input type="checkbox" name="config-gondola" value="fundo-canal-aco">Fundo Canaletado em Aço</label>
                            <label><input type="checkbox" name="config-gondola" value="fundo-canal-mdf">Fundo Canaletado em MDF</label>
                            <label><input type="checkbox" name="config-gondola" value="fundo-mdf">Fundo em MDF</label>
                            <label><input type="checkbox" name="config-gondola" value="fundo-aramado">Fundo Aramado</label>
                            <label><input type="checkbox" name="config-gondola" value="fundo-perfurado">Fundo Perfurado</label>
                            <label><input type="checkbox" name="config-gondola" value="fundo-simples">Fundo Simples</label>
                            <label><input type="checkbox" name="config-gondola" value="fundo-simples-acab">Fundo Simples + Acabamento traseiro</label>
                            <label><input type="checkbox" name="config-gondola" value="testeira">Testeira</label>
                            <label><input type="checkbox" name="config-gondola" value="iluminacao">Iluminação para testeira</label>
                            <label><input type="checkbox" name="config-gondola" value="imagem">Imagem para testeira</label>
                            <label><input type="checkbox" name="config-gondola" value="rodape">Rodapé</label>
                        </div>
                    </div>
                    <div class="imagem-referencia">
                        <label><strong>Imagem de Referência:</strong></label>
                        <img src="images/configuracao_gondola.png" alt="Configuração da Gôndola" class="referencia-imagem">
                    </div>
                </div>
                <button type="submit" class="navigation-button">Avançar</button>
            </div>
        </form>
    `;
    }

    function createTipoPontaSection() {
        return `
            <form id="tipo-ponta-form">
                <div id="tipo-ponta-group" class="step">
                    <h2>Tipo de Ponta</h2>
                    <div class="form-group">
                        <label><strong>Selecione:</strong></label>
                        <div class="radio-group">
                            <label><input type="radio" name="tipo-ponta" value="ponta-gondola" id="ponta-gondola" required>Ponta de Gôndola</label>
                            <label><input type="radio" name="tipo-ponta" value="ponta-podium" id="ponta-podium" required>Ponta Podium</label>
                             <label><input type="radio" name="tipo-ponta" value="na" id="ponta-nd" required>N/D</label>
                        </div>
                    </div>
                    <div class="imagens-referencia">
                        <div class="imagem-container">
                            <label><strong>Ponta de Gôndola:</strong></label>
                            <img src="images/ponta_gondola_bw.png" alt="Ponta de Gôndola (Preto e Branco)" class="referencia-imagem bw" id="img-ponta-gondola-bw">
                            <img src="images/ponta_gondola_color.png" alt="Ponta de Gôndola (Colorida)" class="referencia-imagem color hidden" id="img-ponta-gondola-color">
                        </div>
                        <div class="imagem-container">
                            <label><strong>Ponta Podium:</strong></label>
                            <img src="images/ponta_podium_bw.png" alt="Ponta Podium (Preto e Branco)" class="referencia-imagem bw" id="img-ponta-podium-bw">
                            <img src="images/ponta_podium_color.png" alt="Ponta Podium (Colorida)" class="referencia-imagem color hidden" id="img-ponta-podium-color">
                        </div>
                    </div>
                    <button type="submit" class="navigation-button">Avançar</button>
                </div>
            </form>
        `;
    }

    function createTipoRackSection() {
        return `
            <form id="tipo-rack-form">
                <div id="tipo-rack-group" class="step">
                    <h2>Tipo Rack</h2>
                    <div class="form-group">
                        <label><strong>Selecione:</strong></label>
                        <div class="radio-group">
                            <label><input type="radio" name="tipo-rack" value="rack-padrao" id="rack-padrao" required>Rack Padrão</label>
                            <label><input type="radio" name="tipo-rack" value="rack-embutido" id="rack-embutido" required>Rack Embutido</label>
                             <label><input type="radio" name="tipo-rack" value="na" id="rack-na" required>N/D</label>
                        </div>
                    </div>
                    <div class="imagens-referencia">
                        <div class="imagem-container">
                            <label><strong>Rack Padrão:</strong></label>
                            <img src="images/rack_padrao_bw.png" alt="Rack Padrão (Preto e Branco)" class="referencia-imagem bw" id="img-rack-padrao-bw">
                            <img src="images/rack_padrao_color.png" alt="Rack Padrão (Colorido)" class="referencia-imagem color hidden" id="img-rack-padrao-color">
                        </div>
                        <div class="imagem-container">
                            <label><strong>Rack Embutido:</strong></label>
                            <img src="images/rack_embutido_bw.png" alt="Rack Embutido (Preto e Branco)" class="referencia-imagem bw" id="img-rack-embutido-bw">
                            <img src="images/rack_embutido_color.png" alt="Rack Embutido (Colorido)" class="referencia-imagem color hidden" id="img-rack-embutido-color">
                        </div>
                    </div>
                    <button type="submit" class="navigation-button">Avançar</button>
                </div>
            </form>
        `;
    }

    function createSelecaoCoresSection() {
        return `
            <form id="selecao-cores-form">
                <div id="selecao-cores-group" class="step">
                    <h2>Seleção de Cores</h2>
                    <div class="form-group">
                        <label for="cor-estrutura"><strong>Estrutura da Gondola:</strong></label>
                        <select id="cor-estrutura" name="cor-estrutura" required>
                            <option value="">Selecione</option>
                            <option value="branco-total">BRANCO TOTAL</option>
                            <option value="cinza-hibrido-fosco">CINZA HIBRIDO FOSCO</option>
                            <option value="cinza-claro">CINZA CLARO</option>
                            <option value="cinza-grafite">CINZA GRAFITE</option>
                            <option value="preto-fosco">PRETO FOSCO</option>
                            <option value="amarelo">AMARELO</option>
                            <option value="laranja">LARANJA</option>
                            <option value="vermelho">VERMELHO</option>
                            <option value="verde-claro">VERDE CLARO</option>
                            <option value="verde-escuro">VERDE ESCURO</option>
                            <option value="azul-medio">AZUL MÉDIO</
                           <option value="azul-escuro">AZUL ESCURO</option>
                            <option value="marron">MARRON</option>
                            <option value="branco-texturizado">BRANCO TEXTURIZADO</option>
                            <option value="preto-microtexturizado">PRETO MICROTEXTURIZADO</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="cor-acessorios"><strong>Acessório da Gondolas:</strong></label>
                        <select id="cor-acessorios" name="cor-acessorios" required>
                            <option value="">Selecione</option>
                            <option value="branco-total">BRANCO TOTAL</option>
                            <option value="cinza-hibrido-fosco">CINZA HIBRIDO FOSCO</option>
                            <option value="cinza-claro">CINZA CLARO</option>
                            <option value="cinza-grafite">CINZA GRAFITE</option>
                            <option value="preto-fosco">PRETO FOSCO</option>
                            <option value="amarelo">AMARELO</option>
                            <option value="laranja">LARANJA</option>
                            <option value="vermelho">VERMELHO</option>
                            <option value="verde-claro">VERDE CLARO</option>
                            <option value="verde-escuro">VERDE ESCURO</option>
                            <option value="azul-medio">AZUL MÉDIO</option>
                            <option value="azul-escuro">AZUL ESCURO</option>
                            <option value="marron">MARRON</option>
                            <option value="branco-texturizado">BRANCO TEXTURIZADO</option>
                            <option value="preto-microtexturizado">PRETO MICROTEXTURIZADO</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="cor-porta-etiqueta"><strong>Porta Etiqueta:</strong></label>
                        <select id="cor-porta-etiqueta" name="cor-porta-etiqueta" required>
                            <option value="">Selecione</option>
                            <option value="branco">BRANCO</option>
                            <option value="preto">PRETO</option>
                            <option value="cinza-claro">CINZA CLARO</option>
                            <option value="amarelo">AMARELO</option>
                            <option value="laranja">LARANJA</option>
                            <option value="vermelho">VERMELHO</option>
                            <option value="verde-claro">VERDE CLARO</option>
                            <option value="verde-escuro">VERDE ESCURO</option>
                            <option value="azul-medio">AZUL MÉDIO</option>
                            <option value="azul-escuro">AZUL ESCURO</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="cor-mdf"><strong>MDF:</strong></label>
                        <select id="cor-mdf" name="cor-mdf" required>
                            <option value="">Selecione</option>
                            <option value="carvalho-arauco">CARVALHO ARAUCO</option>
                            <option value="carvalho-mel">CARVALHO MEL</option>
                            <option value="champagne-nogal">CHAMPAGNE NOGAL</option>
                            <option value="nova-imbuia">NOVA IMBUIA</option>
                            <option value="cinza-cristal">CINZA CRISTAL</option>
                            <option value="preto">PRETO</option>
                            <option value="branco">BRANCO</option>
                            <option value="nao-possui">NÃO POSSUI MDF</option>
                        </select>
                    </div>
                    <button type="submit" class="navigation-button">Avançar</button>
                </div>
            </form>
        `;
    }

    function createConfiguracoesPortaPalletSection() {
        return `
            <form id="configuracoes-porta-pallet-form">
                <div id="configuracoes-porta-pallet-group" class="step">
                    <h2>Configurações do Porta Pallet</h2>
                    <div id="prateleiras-section">
                        <div class="perguntas">
                            <div class="form-group">
                                <label><strong>Prateleiras (não é a longarina):</strong></label>
                                <div class="checkbox-group">
                                    <label><input type="radio" name="prateleira" value="aco" required>Prateleira em Aço</label>
                                    <label><input type="radio" name="prateleira" value="mdf" required>Prateleira em MDF</label>
                                    <label><input type="radio" name="prateleira" value="aramada" required>Prateleira Aramada</label>
                                    <label><input type="radio" name="prateleira" value="sem" required>Sem prateleira</label>
                                </div>
                            </div>
                            <div class="form-group">
                                <label><strong>Complementos:</strong></label>
                                <div class="checkbox-group">
                                    <label><input type="checkbox" name="complemento" value="distanciador-lateral" id="distanciador-lateral-checkbox">Distanciador Lateral</label>
                                    <label><input type="checkbox" name="complemento" value="distanciador-central" id="distanciador-central-checkbox">Distanciador Central</label>
                                    <label><input type="checkbox" name="complemento" value="guard-rail" id="guard-rail-checkbox">Guard Rail</label>
                                    <label><input type="checkbox" name="complemento" value="limitador-prateleira" id="limitador-prateleira-checkbox">Limitador Prateleira</label>
                                </div>
                            </div>
                        </div>

                        <div id="porta-pallet-container">
                            <img id="porta-pallet-base" src="images/porta-pallet-base.png" alt="Porta Pallet Base">
                            <img id="distanciador-lateral" src="images/distanciador-lateral.png" alt="Distanciador Lateral" class="complemento hidden">
                            <img id="distanciador-central" src="images/distanciador-central.png" alt="Distanciador Central" class="complemento hidden">
                            <img id="guard-rail" src="images/guard-rail.png" alt="Guard Rail" class="complemento hidden">
                            <img id="limitador-prateleira" src="images/limitador-prateleira.png" alt="Limitador Prateleira" class="complemento hidden">
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="altura"><strong>Altura (em metros):</strong></label>
                        <select id="altura" name="altura" required>
                            <option value="">Selecione</option>
                            <option value="1.50">1,50</option>
                            <option value="2.00">2,00</option>
                            <option value="2.50">2,50</option>
                            <option value="3.00">3,00</option>
                            <option value="3.50">3,50</option>
                            <option value="4.00">4,00</option>
                            <option value="4.50">4,50</option>
                            <option value="5.00">5,00</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label><strong>Largura (em metros):</strong></label>
                        <div class="checkbox-group">
                            <label><input type="checkbox" name="largura" value="1.20">1,20</label>
                            <label><input type="checkbox" name="largura" value="1.60">1,60</label>
                            <label><input type="checkbox" name="largura" value="1.80">1,80</label>
                            <label><input type="checkbox" name="largura" value="2.00">2,00</label>
                            <label><input type="checkbox" name="largura" value="2.30">2,30</label>
                            <label><input type="checkbox" name="largura" value="3.00">3,00</label>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="base"><strong>Base (em metros):</strong></label>
                        <select id="base" name="base" required>
                            <option value="">Selecione</option>
                            <option value="0.60">0,60</option>
                            <option value="0.80">0,80</option>
                            <option value="1.00">1,00</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="peso"><strong>Peso (em kg):</strong></label>
                        <select id="peso" name="peso" required>
                            <option value="">Selecione</option>
                            <option value="400">400</option>
                            <option value="500">500</option>
                            <option value="700">700</option>
                            <option value="900">900</option>
                            <option value="1000">1000</option>
                            <option value="1500">1500</option>
                            <option value="2000">2000</option>
                            <option value="2500">2500</option>
                            <option value="3000">3000</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label><strong>Gondola embutida?</strong></label>
                        <div class="radio-group">
                            <label><input type="radio" name="gondola-embutida" value="sim">Sim</label>
                            <label><input type="radio" name="gondola-embutida" value="nao">Não</label>
                        </div>
                    </div>

                    <div id="altura-gondola-embutida-container" class="form-group hidden">
                        <label for="altura-gondola-embutida"><strong>Qual a altura da Gôndola Embutida?</strong></label>
                        <select id="altura-gondola-embutida" name="altura-gondola-embutida">
                            <option value="">Selecione</option>
                            <option value="1.80">1,80 M</option>
                            <option value="2.00">2,00 M</option>
                            <option value="2.20">2,20 M</option>
                            <option value="2.50">2,50 M</option>
                        </select>
                    </div>
                    <button type="submit" class="navigation-button">Avançar</button>
                </div>
            </form>
        `;
    }

    function createObservacoesAdicionaisSection() {
        return `
            <form id="observacoes-adicionais-form">
                <div id="observacoes-adicionais-group" class="step">
                    <h2>Observações Adicionais</h2>
                    <div class="form-group">
                        <label for="observacoes"><strong>Observações:</strong></label>
                        <textarea id="observacoes" name="observacoes" rows="4" cols="50"></textarea>
                    </div>
                    <button type="submit" class="navigation-button">Avançar</button>
                </div>
            </form>
        `;
    }

    function createArquivosAuxiliaresSection() {
        return `
        <form id="arquivos-auxiliares-form">
            <div id="arquivos-auxiliares-group" class="step">
                <h2>Anexar arquivos auxiliares:</h2>
                <p>Nessa etapa, caso possua, anexe arquivos que auxiliarão do entendimento/desenvolvimento do projeto (Ex: Croqui/Medidas, Projetos em DWG, etc...)</p>
                <div id="lista-arquivos"></div>
                <button type="button" id="adicionar-arquivo">Adicionar Arquivo</button>
                <input type="file" id="arquivos" multiple style="display: none;">
                 <button type="submit" class="navigation-button">Avançar</button>
            </div>
        </form>
        `;
    }

    function createFinalizarFormularioSection() {
        return `
        <div id="finalizar-formulario-group" class="step">
            <h2>Finalizar formulário:</h2>
            <p>Você concluiu todas as etapas do formulário! Se estiver correto, clique em finalizar para enviar sua solicitação. Caso precise, pode voltar as perguntas para revisar.</p>
        </div>
    `;
    }

    let telaInicialCarregada = false; // Variável de controle

    function loadTelaInicial() {
        telaInicialCarregada = false; // Garante que seja false antes de carregar

        formContainer.innerHTML = `
        <div id="tela-inicial-section" class="step">
            <h2>Tela Inicial</h2>
            <div id="dados-cadastrais-cliente-section">
                <h3>Já é Cliente?</h3>
                <label><input type="radio" name="cliente" id="cliente-sim" value="sim" required>Sim</label>
                <label><input type="radio" name="cliente" id="cliente-nao" value="nao" required>Não</label>
            </div>

            <div id="projeto-possui-gondolas-section">
                <h3>Projeto possui gôndolas?</h3>
                <label><input type="radio" name="possui-gondolas" id="projeto-possui-gondolas-sim" value="sim" required>Sim</label>
                <label><input type="radio" name="possui-gondolas" id="projeto-possui-gondolas-nao" value="nao" required>Não</label>
            </div>

            <div id="projeto-possui-porta-pallet-section">
                <h3>Projeto possui porta pallet?</h3>
                <label><input type="radio" name="possui-porta-pallet" id="projeto-possui-porta-pallet-sim" value="sim" required>Sim</label>
                <label><input type="radio" name="possui-porta-pallet" id="projeto-possui-porta-pallet-nao" value="nao" required>Não</label>
            </div>

             <button id="avancarTelaInicial" class="navigation-button next-button">Iniciar Preenchimento</button>
            <p id="mensagem-erro" style="color: red; display: none;">A solicitação precisa ter gôndola e/ou porta pallet.</p>
        </div>
    `;

        const avancarTelaInicialButton = document.getElementById('avancarTelaInicial');
        avancarTelaInicialButton.addEventListener('click', () => {
            console.log("Botão 'Avançar' na tela inicial clicado!"); // Adiciona o console.log
            if (!telaInicialCarregada) { // Verifica se a tela inicial já foi carregada
                console.log("handleTelaInicial será chamada!"); // Adiciona o console.log

                // Validação das respostas
                const clienteSim = document.getElementById('cliente-sim');
                const clienteNao = document.getElementById('cliente-nao');
                const gondolasSim = document.getElementById('projeto-possui-gondolas-sim');
                const gondolasNao = document.getElementById('projeto-possui-gondolas-nao');
                const portaPalletSim = document.getElementById('projeto-possui-porta-pallet-sim');
                const portaPalletNao = document.getElementById('projeto-possui-porta-pallet-nao');
                const mensagemErro = document.getElementById('mensagem-erro');

                if (
                    (!clienteSim.checked && !clienteNao.checked) ||
                    (!gondolasSim.checked && !gondolasNao.checked) ||
                    (!portaPalletSim.checked && !portaPalletNao.checked)
                ) {
                    alert('Por favor, responda todas as perguntas.');
                    return;
                }

                if (gondolasNao.checked && portaPalletNao.checked) {
                    mensagemErro.style.display = 'block';
                    return;
                } else {
                    mensagemErro.style.display = 'none';
                }

                handleTelaInicial();
            } else {
                console.log("handleTelaInicial não será chamada porque telaInicialCarregada é true!"); // Adiciona o console.log
            }
        });
    }

    function handleTelaInicial() {
        if (telaInicialCarregada) {
            return; // Impede a execução se a tela inicial já foi carregada
        }

        telaInicialCarregada = true; // Define a variável de controle como true
        const clienteSim = document.getElementById('cliente-sim')?.checked;
        const clienteNao = document.getElementById('cliente-nao')?.checked;
        const gondolaSim = document.getElementById('projeto-possui-gondolas-sim')?.checked;
        const gondolaNao = document.getElementById('projeto-possui-gondolas-nao')?.checked;
        const palletSim = document.getElementById('projeto-possui-porta-pallet-sim')?.checked;
        const palletNao = document.getElementById('projeto-possui-porta-pallet-nao')?.checked;

        formContainer.innerHTML = ""; // Limpa o container
        buttonContainer.innerHTML = ""; // Limpa o button container

        if (clienteSim && gondolaSim && palletSim) {
            sections = [
                createInformeDadosCadastraisSection(),
                createInformeSegmentoClienteSection(),
                createTipoProjetoSection(),
                createConfiguracaoGondolaSection(),
                createTipoPontaSection(),
                createTipoRackSection(),
                createSelecaoCoresSection(),
                createConfiguracoesPortaPalletSection(),
                createObservacoesAdicionaisSection(),
                createArquivosAuxiliaresSection(),
                createFinalizarFormularioSection()
            ];
        } else if (clienteNao && gondolaSim && palletSim) {
            sections = [
                createInformeDadosNovoClienteSection(),
                createInformeSegmentoClienteSection(),
                createTipoProjetoSection(),
                createConfiguracaoGondolaSection(),
                createTipoPontaSection(),
                createTipoRackSection(),
                createSelecaoCoresSection(),
                createConfiguracoesPortaPalletSection(),
                createObservacoesAdicionaisSection(),
                createArquivosAuxiliaresSection(),
                createFinalizarFormularioSection()
            ];
        } else if (clienteNao && gondolaNao && palletSim) {
            sections = [
                createInformeDadosNovoClienteSection(),
                createInformeSegmentoClienteSection(),
                createTipoProjetoSection(),
                createConfiguracoesPortaPalletSection(),
                createObservacoesAdicionaisSection(),
                createArquivosAuxiliaresSection(),
                createFinalizarFormularioSection()
            ];
        } else if (clienteNao && gondolaSim && palletNao) {
            sections = [
                createInformeDadosNovoClienteSection(),
                createInformeSegmentoClienteSection(),
                createTipoProjetoSection(),
                createConfiguracaoGondolaSection(),
                createTipoPontaSection(),
                createTipoRackSection(),
                createSelecaoCoresSection(),
                createObservacoesAdicionaisSection(),
                createArquivosAuxiliaresSection(),
                createFinalizarFormularioSection()
            ];
        } else if (clienteSim && gondolaSim && palletNao) {
            sections = [
                createInformeDadosCadastraisSection(),
                createInformeSegmentoClienteSection(),
                createTipoProjetoSection(),
                createConfiguracaoGondolaSection(),
                createTipoPontaSection(),
                createTipoRackSection(),
                createSelecaoCoresSection(),
                createObservacoesAdicionaisSection(),
                createArquivosAuxiliaresSection(),
                createFinalizarFormularioSection()
            ];
        } else if (clienteSim && gondolaNao && palletSim) {
            sections = [
                createInformeDadosCadastraisSection(),
                createInformeSegmentoClienteSection(),
                createTipoProjetoSection(),
                createConfiguracoesPortaPalletSection(),
                createObservacoesAdicionaisSection(),
                createArquivosAuxiliaresSection(),
                createFinalizarFormularioSection()
            ];
        }
        else {
            formContainer.innerHTML = "<p>Nenhum fluxo correspondente.</p>";
            return;
        }

        displaySection();
    }

    function resetFormulario() {
        formDataCache = {};
        sectionIndex = 0;
        telaInicialCarregada = false; // Reseta a variável de controle
        window.location.reload(); // Recarrega a página
    }

    function displaySection() {
        // Limpa o formContainer antes de inserir o novo conteúdo
        formContainer.innerHTML = "";
        buttonContainer.innerHTML = "";

        formContainer.innerHTML = sections[sectionIndex];

        // Verifica se a seção atual é a tela inicial
        if (!formContainer.querySelector('#tela-inicial-section')) {
            let prevButton = null;

            if (sectionIndex > 0) {
                prevButton = document.createElement('button');
                prevButton.textContent = 'Voltar';
                prevButton.classList.add('navigation-button', 'prev-button');
                prevButton.addEventListener('click', () => {
                    formDataCache[sectionIndex] = collectFormData();
                    sectionIndex--;
                    displaySection();
                });
            }

            // Adiciona o botão "Voltar" ao buttonContainer apenas se existir
            if (prevButton) {
                buttonContainer.appendChild(prevButton);
            }

            // Adiciona o evento de "submit" a cada formulário
            const forms = formContainer.querySelectorAll('form');
            forms.forEach(form => {
                const submitButton = form.querySelector('button[type="submit"]');
                if (submitButton) {
                    submitButton.classList.add('navigation-button', 'next-button');
                    buttonContainer.appendChild(submitButton);

                    submitButton.addEventListener('click', (event) => {
                        event.preventDefault(); // Impede o comportamento padrão do botão

                        // Validação específica para cada formulário
                        let isValid = true;
                        if (form.id === 'informe-dados-cadastrais-form') {
                            const razaoSocial = document.getElementById('razao-social').value;
                            const cnpj = document.getElementById('cnpj').value;
                            if (!razaoSocial || !cnpj) {
                                alert('Por favor, preencha todos os campos de dados cadastrais.');
                                isValid = false;
                            }
                        } else if (form.id === 'informe-dados-novo-cliente-form') {
                            const razaoSocialNovo = document.getElementById('razao-social-novo').value;
                            const nomeFantasia = document.getElementById('nome-fantasia').value;
                            const cnpjNovo = document.getElementById('cnpj-novo').value;
                            const inscricaoEstadual = document.getElementById('inscricao-estadual').value;
                            const contato = document.getElementById('contato').value;
                            const emailContato = document.getElementById('email-contato').value;
                            const celularWhatsapp = document.getElementById('celular-whatsapp').value;
                            const telefoneFixo = document.getElementById('telefone-fixo').value;

                            if (!razaoSocialNovo || !nomeFantasia || !cnpjNovo || !inscricaoEstadual || !contato || !emailContato || !celularWhatsapp || !telefoneFixo) {
                                alert('Por favor, preencha todos os campos de novo cliente.');
                                isValid = false;
                            }
                        } else if (form.id === 'informe-segmento-cliente-form') {
                            const segmento = document.querySelector('input[name="segmento"]:checked');

                            if (!segmento) {
                                alert('Por favor, selecione um segmento.');
                                isValid = false;
                            }
                        } else if (form.id === 'tipo-projeto-form') {
                            const tipoProjeto = document.querySelectorAll('input[name="tipo-projeto"]:checked');
                            if (tipoProjeto.length === 0) {
                                alert('Por favor, selecione pelo menos um tipo de projeto.');
                                isValid = false;
                            }
                        } else if (form.id === 'configuracao-gondola-form') {
                            const configGondola = document.querySelectorAll('input[name="config-gondola"]:checked');
                            if (configGondola.length === 0) {
                                alert('Por favor, selecione pelo menos uma configuração de gôndola.');
                                isValid = false;
                            }
                        } else if (form.id === 'configuracoes-porta-pallet-form') {
                            // Validação específica para o formulário de configurações do porta pallet
                            const prateleira = document.querySelector('input[name="prateleira"]:checked');
                            const altura = document.getElementById('altura').value;
                            const base = document.getElementById('base').value;
                            const peso = document.getElementById('peso').value;
                            const gondolaEmbutida = document.querySelector('input[name="gondola-embutida"]:checked');
                            const alturaGondolaEmbutidaContainer = document.getElementById('altura-gondola-embutida-container');
                            const alturaGondolaEmbutida = document.getElementById('altura-gondola-embutida').value;

                            if (!prateleira || !altura || !base || !peso || !gondolaEmbutida) {
                                alert('Por favor, preencha todos os campos obrigatórios do porta pallet.');
                                isValid = false;
                            }

                            // Valida a altura da gôndola embutida apenas se a gôndola embutida for "sim"
                            if (gondolaEmbutida && gondolaEmbutida.value === 'sim' && !alturaGondolaEmbutida) {
                                alert('Por favor, selecione a altura da gôndola embutida.');
                                isValid = false;
                            }
                        } else if (form.id === 'tipo-ponta-form') {
                            const tipoPonta = document.querySelector('input[name="tipo-ponta"]:checked');
                            if (!tipoPonta) {
                                alert('Por favor, selecione um tipo de ponta.');
                                isValid = false;
                            }
                        } else if (form.id === 'tipo-rack-form') {
                            const tipoRack = document.querySelector('input[name="tipo-rack"]:checked');
                            if (!tipoRack) {
                                alert('Por favor, selecione um tipo de rack.');
                                isValid = false;
                            }
                        } else if (form.id === 'selecao-cores-form') {
                            const corEstrutura = document.getElementById('cor-estrutura').value;
                            const corAcessorios = document.getElementById('cor-acessorios').value;
                            const corPortaEtiqueta = document.getElementById('cor-porta-etiqueta').value;
                            const corMdf = document.getElementById('cor-mdf').value;

                            if (!corEstrutura || !corAcessorios || !corPortaEtiqueta || !corMdf) {
                                alert('Por favor, selecione as cores para todos os campos.');
                                isValid = false;
                            }
                        }

                        if (isValid) {
                            formDataCache[sectionIndex] = collectFormData();
                            sectionIndex++;
                            displaySection();
                        }
                    });

                    // Dispara o evento de submit do formulário
                    form.dispatchEvent(new Event('submit'));
                }

                form.addEventListener('submit', (event) => {
                    event.preventDefault(); // Impede o envio padrão do formulário
                });
            });

            buttonContainer.style.justifyContent = 'space-between';
        }

        // Inicializações específicas de cada seção
        if (formContainer.querySelector('#configuracoes-porta-pallet-group')) {
            initializePortaPallet();
        }
        if (formContainer.querySelector('#configuracoes-porta-pallet-group')) {
            initializeGondolaHeightToggle();
        }
        if (formContainer.querySelector('#tipo-ponta-group')) {
            initializeTipoPontaSelection();
        }
        if (formContainer.querySelector('#tipo-rack-group')) {
            initializeTipoRackSelection();
        }
        if (formContainer.querySelector('#arquivos-auxiliares-group')) {
            initializeArquivosAuxiliares();
        }
        if (formContainer.querySelector('#configuracao-gondola-group')) {
            initializeGondolaHeightToggle();
        }

        // Lógica para o botão "Recomeçar"
        const recomecarButtonElement = formContainer.querySelector('.recomecar-container #recomecar-button');
        if (recomecarButtonElement) {
            recomecarButtonElement.addEventListener('click', () => {
                resetFormulario(); // Reseta o estado do formulário
                formContainer.innerHTML = ""; // Limpa o formContainer
                document.getElementById('popup').style.display = 'block';
                document.getElementById('form-container').classList.add('hidden');
            });
            recomecarButtonElement.classList.add('recomecar-button'); // Adiciona a classe
        }

        // Restaura os dados da seção atual
        if (formDataCache[sectionIndex]) {
            console.log('restoreFormData chamada com:', formDataCache[sectionIndex]); // Adicionado console.log
            restoreFormData(formDataCache[sectionIndex]);
        }
    }

    function restoreFormData(formData) {
        console.log('Iniciando restoreFormData com:', formData);
        for (const key in formData) {
            if (formData.hasOwnProperty(key)) {
                const value = formData[key];
                const input = formContainer.querySelector(`[name="${key}"]`);
                console.log('input encontrado:', input, 'name:', key, 'value:', value); // Adicionado console.log
                if (input) {
                    console.log(`Restaurando ${key} com valor ${value}`);
                    if (input.type === 'radio') {
                        const radio = formContainer.querySelector(`input[name="${key}"][value="${value}"]`);
                        if (radio) {
                            radio.checked = true;
                        }
                    } else if (input.type === 'checkbox') {
                        if (Array.isArray(value)) {
                            value.forEach(val => {
                                const checkbox = formContainer.querySelector(`input[name="${key}"][value="${val}"]`);
                                if (checkbox) {
                                    checkbox.checked = true;
                                }
                            });
                        } else {
                            const checkbox = formContainer.querySelector(`input[name="${key}"][value="${value}"]`);
                            if (checkbox) {
                                checkbox.checked = true;
                            }
                        }
                    } else if (input.tagName === 'SELECT') {
                        input.value = value;
                    } else {
                        input.value = value;
                        console.log('formData atualizado:', formData);
                    }
                } else {
                    console.log(`Input com nome ${key} não encontrado`);
                }
            }
        }
    }

    function initializePortaPallet() {
        const distanciadorLateralCheckbox = document.getElementById('distanciador-lateral-checkbox');
        const distanciadorCentralCheckbox = document.getElementById('distanciador-central-checkbox');
        const guardRailCheckbox = document.getElementById('guard-rail-checkbox');
        const limitadorPrateleiraCheckbox = document.getElementById('limitador-prateleira-checkbox');

        const distanciadorLateralImg = document.getElementById('distanciador-lateral');
        const distanciadorCentralImg = document.getElementById('distanciador-central');
        const guardRailImg = document.getElementById('guard-rail');
        const limitadorPrateleiraImg = document.getElementById('limitador-prateleira');

        toggleImageVisibility(distanciadorLateralCheckbox, distanciadorLateralImg);
        toggleImageVisibility(distanciadorCentralCheckbox, distanciadorCentralImg);
        toggleImageVisibility(guardRailCheckbox, guardRailImg);
        toggleImageVisibility(limitadorPrateleiraCheckbox, limitadorPrateleiraImg);
    }

    function toggleImageVisibility(checkbox, image) {
        if (checkbox && image) {
            checkbox.addEventListener('change', () => {
                image.classList.toggle('hidden');
            });
        } else {
            console.error("Um ou mais elementos não foram encontrados para a função toggleImageVisibility.");
        }
    }

    function initializeTipoPontaSelection() {
        const pontaGondolaRadio = document.getElementById('ponta-gondola');
        const pontaPodiumRadio = document.getElementById('ponta-podium');
        const pontaNadio = document.getElementById('ponta-nd');

        const imgPontaGondolaBw = document.getElementById('img-ponta-gondola-bw');
        const imgPontaGondolaColor = document.getElementById('img-ponta-gondola-color');
        const imgPontaPodiumBw = document.getElementById('img-ponta-podium-bw');
        const imgPontaPodiumColor = document.getElementById('img-ponta-podium-color');

        function updatePontaImages() {
            if (pontaGondolaRadio.checked) {
                imgPontaGondolaBw.classList.add('hidden');
                imgPontaGondolaColor.classList.remove('hidden');
                imgPontaPodiumBw.classList.remove('hidden');
                imgPontaPodiumColor.classList.add('hidden');
            } else if (pontaPodiumRadio.checked) {
                imgPontaGondolaBw.classList.remove('hidden');
                imgPontaGondolaColor.classList.add('hidden');
                imgPontaPodiumBw.classList.add('hidden');
                imgPontaPodiumColor.classList.remove('hidden');
            } else {
                imgPontaGondolaBw.classList.remove('hidden');
                imgPontaGondolaColor.classList.add('hidden');
                imgPontaPodiumBw.classList.remove('hidden');
                imgPontaPodiumColor.classList.add('hidden');
            }
        }

        pontaGondolaRadio.addEventListener('change', updatePontaImages);
        pontaPodiumRadio.addEventListener('change', updatePontaImages);
        pontaNadio.addEventListener('change', updatePontaImages);


        // Inicializa as imagens ao carregar a página
        updatePontaImages();
    }

    function initializeTipoRackSelection() {
        const rackPadraoRadio = document.getElementById('rack-padrao');
        const rackEmbutidoRadio = document.getElementById('rack-embutido');
        const rackNaRadio = document.getElementById('rack-na');

        const imgRackPadraoBw = document.getElementById('img-rack-padrao-bw');
        const imgRackPadraoColor = document.getElementById('img-rack-padrao-color');
        const imgRackEmbutidoBw = document.getElementById('img-rack-embutido-bw');
        const imgRackEmbutidoColor = document.getElementById('img-rack-embutido-color');

        function updateRackImages() {
            if (rackPadraoRadio.checked) {
                imgRackPadraoBw.classList.add('hidden');
                imgRackPadraoColor.classList.remove('hidden');
                imgRackEmbutidoBw.classList.remove('hidden');
                imgRackEmbutidoColor.classList.add('hidden');
            } else if (rackEmbutidoRadio.checked) {
                imgRackPadraoBw.classList.remove('hidden');
                imgRackPadraoColor.classList.add('hidden');
                imgRackEmbutidoBw.classList.add('hidden');
                imgRackEmbutidoColor.classList.remove('hidden');
            } else {
                imgRackPadraoBw.classList.remove('hidden');
                imgRackPadraoColor.classList.add('hidden');
                imgRackEmbutidoBw.classList.remove('hidden');
                imgRackEmbutidoColor.classList.add('hidden');
            }
        }

        rackPadraoRadio.addEventListener('change', updateRackImages);
        rackEmbutidoRadio.addEventListener('change', updateRackImages);
        rackNaRadio.addEventListener('change', updateRackImages);

        // Inicializa as imagens ao carregar a página
        updateRackImages();
    }

    function initializeArquivosAuxiliares() {
        const adicionarArquivoButton = document.getElementById('adicionar-arquivo');
        const arquivosInput = document.getElementById('arquivos');
        const listaArquivos = document.getElementById('lista-arquivos');
        const arquivosAuxiliaresGroup = document.getElementById('arquivos-auxiliares-group'); // Container principal

        let filesArray = []; // Array para armazenar os arquivos selecionados

        // Estilos para o container principal
        arquivosAuxiliaresGroup.style.display = 'flex';
        arquivosAuxiliaresGroup.style.flexDirection = 'column';
        arquivosAuxiliaresGroup.style.alignItems = 'center'; // Centraliza os elementos

        // Estilos para a área de "arrastar e soltar"
        listaArquivos.style.width = '80%'; // Largura da área
        listaArquivos.style.minHeight = '100px'; // Altura mínima
        listaArquivos.style.border = '2px dashed #ccc';
        listaArquivos.style.borderRadius = '5px';
        listaArquivos.style.padding = '10px';
        listaArquivos.style.display = 'flex';
        listaArquivos.style.flexDirection = 'column';
        listaArquivos.style.alignItems = 'center';
        listaArquivos.style.justifyContent = 'center';
        listaArquivos.style.textAlign = 'center';
        listaArquivos.style.marginBottom = '10px';
        listaArquivos.innerHTML = '<p>Arraste e solte os arquivos aqui ou clique para selecionar</p>';

        // Estilos para o botão "Adicionar Arquivo"
        adicionarArquivoButton.style.backgroundColor = '#007bff';
        adicionarArquivoButton.style.color = 'white';
        adicionarArquivoButton.style.padding = '10px 20px';
        adicionarArquivoButton.style.border = 'none';
        adicionarArquivoButton.style.borderRadius = '5px';
        adicionarArquivoButton.style.cursor = 'pointer';
        adicionarArquivoButton.style.marginBottom = '20px';

        adicionarArquivoButton.addEventListener('click', () => {
            arquivosInput.click(); // Simula o clique no input de arquivo
        });

        arquivosInput.addEventListener('change', (event) => {
            const files = Array.from(event.target.files); // Converte FileList para Array
            filesArray = filesArray.concat(files); // Adiciona os novos arquivos ao array existente
            updateFileList(filesArray); // Atualiza a lista de arquivos
        });

        // Adiciona funcionalidade de "arrastar e soltar"
        arquivosAuxiliaresGroup.addEventListener('dragover', (event) => {
            event.preventDefault();
            arquivosAuxiliaresGroup.style.backgroundColor = '#f0f0f0'; // Feedback visual
        });

        arquivosAuxiliaresGroup.addEventListener('dragleave', () => {
            arquivosAuxiliaresGroup.style.backgroundColor = 'transparent'; // Remove feedback
        });

        arquivosAuxiliaresGroup.addEventListener('drop', (event) => {
            event.preventDefault();
            arquivosAuxiliaresGroup.style.backgroundColor = 'transparent'; // Remove feedback
            const files = Array.from(event.dataTransfer.files); // Converte FileList para Array
            filesArray = filesArray.concat(files); // Adiciona os novos arquivos ao array existente
            updateFileList(filesArray); // Atualiza a lista de arquivos
        });

        function updateFileList(files) {
            listaArquivos.innerHTML = ''; // Limpa a lista anterior
            if (files.length === 0) {
                listaArquivos.innerHTML = '<p>Arraste e solte os arquivos aqui ou clique para selecionar</p>';
                return;
            }

            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const listItem = document.createElement('li');
                listItem.style.marginBottom = '5px'; // Espaçamento entre os itens

                if (file.type.startsWith('image/')) {
                    const img = document.createElement('img');
                    img.src = URL.createObjectURL(file);
                    img.style.width = '50px';
                    img.style.height = '50px';
                    img.style.marginRight = '10px';
                    listItem.appendChild(img);
                }

                const fileInfo = document.createElement('span');
                fileInfo.textContent = file.name;
                listItem.appendChild(fileInfo);

                // Adiciona um botão para remover o arquivo da lista
                const removeButton = document.createElement('button');
                removeButton.textContent = 'Remover';
                removeButton.style.marginLeft = '10px';
                removeButton.addEventListener('click', () => {
                    filesArray.splice(i, 1); // Remove o arquivo do array
                    updateFileList(filesArray); // Atualiza a lista de arquivos
                });
                listItem.appendChild(removeButton);

                listaArquivos.appendChild(listItem);
            }
        }
    }

    function initializeGondolaHeightToggle() {
        const gondolaEmbutidaSim = document.querySelector('input[name="gondola-embutida"][value="sim"]');
        const gondolaEmbutidaNao = document.querySelector('input[name="gondola-embutida"][value="nao"]');
        const alturaGondolaEmbutidaContainer = document.getElementById('altura-gondola-embutida-container');

        function toggleGondolaEmbutidaAltura() {
            if (gondolaEmbutidaSim.checked) {
                alturaGondolaEmbutidaContainer.classList.remove('hidden');
            } else {
                alturaGondolaEmbutidaContainer.classList.add('hidden');
            }
        }

        gondolaEmbutidaSim.addEventListener('change', toggleGondolaEmbutidaAltura);
        gondolaEmbutidaNao.addEventListener('change', toggleGondolaEmbutidaAltura);

        // Garante que o estado inicial seja correto
        toggleGondolaEmbutidaAltura();
    }

    function collectFormData() {
        const formData = {};
        const inputs = formContainer.querySelectorAll('input, select, textarea');
        console.log('inputs encontrados:', inputs);

        inputs.forEach(input => {
            console.log('Campo encontrado:', input, 'name:', input.name);
            if (input.type === 'radio') {
                if (input.checked) {
                    formData[input.name] = input.value;
                    console.log('formData atualizado:', formData);
                }
            } else if (input.type === 'checkbox') {
                if (input.checked) {
                    if (formData[input.name]) {
                        if (!Array.isArray(formData[input.name])) {
                            formData[input.name] = [formData[input.name]];
                        }
                        formData[input.name].push(input.value);
                    } else {
                        formData[input.name] = input.value;
                    }
                    console.log('formData atualizado:', formData);
                }
            } else {
                formData[input.name] = input.value;
                console.log('formData atualizado:', formData);
            }
        });

        console.log('formData coletado:', formData);
        return formData;
    }

    function createFinalizarFormularioSection() {
        return `
            <div id="finalizar-formulario-group" class="step">
                <h2>Finalizar formulário:</h2>
                <p>Você concluiu todas as etapas do formulário! Se estiver correto, clique em finalizar para enviar sua solicitação. Caso precise, pode voltar as perguntas para revisar.</p>
            </div>
        `;
    }



    //handleTelaInicial(); // Chama a função handleTelaInicial para iniciar o formulário
    // Carrega a tela inicial
    loadTelaInicial();
    //FIM DE TUDO
    //FIM DE TUDO
});