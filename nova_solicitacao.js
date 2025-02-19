document.addEventListener('DOMContentLoaded', function() {
    const formContainer = document.getElementById('form-projetos-orcamentos');

    document.getElementById('confirm-button').addEventListener('click', function() {
        const tipoSolicitacao = document.getElementById('tipo-solicitacao').value;
        if (tipoSolicitacao) {
            document.getElementById('popup').style.display = 'none';
            document.getElementById('form-container').classList.remove('hidden');
            if (tipoSolicitacao === 'arquitetura') {
                loadArquiteturaForm();
                // Adiciona os event listeners após o carregamento do formulário
                setTimeout(addEventListeners, 500); // Atraso de 500 milissegundos
            }
        } else {
            alert('Por favor, selecione um tipo de solicitação.');
        }
    });
    function createDadosCadastraisClienteSection() {
        return `
            <div id="dados-cadastrais-cliente-group" class="step">
                <h2>Dados Cadastrais do Cliente</h2>
                <div class="form-group">
                    <label>Já é Cliente?</label>
                    <div class="radio-group">
                        <label><input type="radio" name="cliente" value="sim" id="cliente-sim" required>Sim</label>
                        <label><input type="radio" name="cliente" value="nao" id="cliente-nao" required>Não</label>
                    </div>
                </div>
                <div class="navigation-buttons">
                    <button type="button" class="next-button" id="next-dados-cadastrais">Avançar</button>
                </div>
            </div>
        `;
    }

    function createInformeDadosCadastraisSection() {
        return `
            <div id="informe-dados-cadastrais-group" class="step hidden">
                <h2>Informe os dados cadastrais do cliente</h2>
                <div class="form-group">
                    <label for="razao-social">Razão Social:</label>
                    <input type="text" id="razao-social" name="razao-social" required>
                </div>
                <div class="form-group">
                    <label for="cnpj">CNPJ:</label>
                    <input type="text" id="cnpj" name="cnpj" required>
                </div>
                <div class="navigation-buttons">
                    <button type="button" class="prev-button" data-prev="dados-cadastrais-cliente-group">Voltar</button>
                    <button type="button" class="next-button" data-next="informe-segmento-cliente-group">Avançar</button>
                </div>
            </div>
        `;
    }

    function createInformeDadosNovoClienteSection() {
        return `
            <div id="informe-dados-novo-cliente-group" class="step hidden">
                <h2>Informa os dados cadastrais do cliente / novo cliente</h2>
                <div class="form-group">
                    <label for="razao-social-novo">Razão Social:</label>
                    <input type="text" id="razao-social-novo" name="razao-social-novo" required>
                </div>
                <div class="form-group">
                    <label for="nome-fantasia">Nome Fantasia:</label>
                    <input type="text" id="nome-fantasia" name="nome-fantasia" required>
                </div>
                <div class="form-group">
                    <label for="cnpj-novo">CNPJ:</label>
                    <input type="text" id="cnpj-novo" name="cnpj-novo" required>
                </div>
                <div class="form-group">
                    <label for="inscricao-estadual">Inscrição Estadual:</label>
                    <input type="text" id="inscricao-estadual" name="inscricao-estadual" required>
                </div>
                <div class="form-group">
                    <label for="contato">Contato:</label>
                    <input type="text" id="contato" name="contato" required>
                </div>
                <div class="form-group">
                    <label for="email-contato">E-mail do contato:</label>
                    <input type="email" id="email-contato" name="email-contato" required>
                </div>
                <div class="form-group">
                    <label for="celular-whatsapp">Celular/Whatsapp:</label>
                    <input type="text" id="celular-whatsapp" name="celular-whatsapp" data-mask="(00) 00000-0000" required>
                </div>
                <div class="form-group">
                    <label for="telefone-fixo">Telefone Fixo:</label>
                    <input type="text" id="telefone-fixo" name="telefone-fixo" data-mask="(00) 0000-0000" required>
                </div>
                <div class="navigation-buttons">
                    <button type="button" class="prev-button" data-prev="dados-cadastrais-cliente-group">Voltar</button>
                    <button type="button" class="next-button" data-next="informe-segmento-cliente-group">Avançar</button>
                </div>
            </div>
        `;
    }


    function createInformeSegmentoClienteSection() {
        return `
            <div id="informe-segmento-cliente-group" class="step hidden">
                <h2>Informe o Segmento do cliente</h2>
                <div class="form-group">
                    <label>Segmento:</label>
                    <div class="checkbox-group">
                        <label><input type="radio" name="segmento" value="material-construcao" required>Material de Construção</label>
                        <label><input type="radio" name="segmento" value="supermercado" required>Supermercado</label>
                        <label><input type="radio" name="segmento" value="pet-agro" required>Pet/Agro</label>
                        <label><input type="radio" name="segmento" value="drogaria" required>Drogaria e Similares</label>
                        <label><input type="radio" name="segmento" value="outro" required>Outro</label>
                        <input type="text" id="segmento-outro" name="segmento-outro" placeholder="Especifique" class="hidden">
                    </div>
                </div>
                <div class="navigation-buttons">
                    <button type="button" class="prev-button" data-prev="informe-dados-novo-cliente-group">Voltar</button>
                    <button type="button" class="next-button" data-next="tipo-projeto-group">Avançar</button>
                </div>
            </div>
        `;
    }

    function createTipoProjetoSection() {
        return `
            <div id="tipo-projeto-group" class="step hidden">
                <h2>Tipo do Projeto</h2>
                <div class="form-group">
                    <label>Tipo:</label>
                    <div class="checkbox-group">
                        <label><input type="radio" name="tipo-projeto" value="2d" required>2D</label>
                        <label><input type="radio" name="tipo-projeto" value="3d" required>3D</label>
                        <label><input type="radio" name="tipo-projeto" value="orcamento" required>Orçamento de Materiais Avulsos</label>
                    </div>
                </div>a
                <div class="navigation-buttons">
                    <button type="button" class="prev-button" data-prev="informe-segmento-cliente-group">Voltar</button>
                    <button type="button" class="next-button" data-next="configuracao-gondola-group">Avançar</button>
                </div>
            </div>
        `;
    }

    function createProjetoPossuiGondolasSection() {
        return `
            <div id="projeto-possui-gondolas-group" class="step hidden">
                <h2>O Projeto possui Gondolas?</h2>
                <div class="form-group">
                    <label for="possui-gondolas">Possui Gondolas?</label>
                    <select id="possui-gondolas" name="possui-gondolas" required>
                        <option value="">Selecione</option>
                        <option value="sim">Sim</option>
                        <option value="nao">Não</option>
                    </select>
                </div>
                <div class="navigation-buttons">
                    <button type="button" class="prev-button" data-prev="tipo-projeto-group">Voltar</button>
                    <button type="button" class="next-button" data-next="configuracao-gondola-group">Avançar</button>
                </div>
            </div>
        `;
    }
    function createConfiguracaoGondolaSection() {
        return `
            <div id="configuracao-gondola-group" class="step hidden">
                <h2>Configuração da Gôndola</h2>
                <div class="configuracao-container">
                    <div class="form-group opcoes-configuracao">
                        <label>Opções:</label>
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
                        <label>Imagem de Referência:</label>
                        <img src="images/configuracao_gondola.png" alt="Configuração da Gôndola" class="referencia-imagem">
                    </div>
                </div>
                <div class="navigation-buttons">
                    <button type="button" class="prev-button" data-prev="projeto-possui-gondolas-group">Voltar</button>
                    <button type="button" class="next-button" data-next="tipo-ponta-group">Avançar</button>
                </div>
            </div>
        `;
    }

    function createTipoPontaSection() {
        return `
            <div id="tipo-ponta-group" class="step hidden">
                <h2>Tipo de Ponta</h2>
                <div class="form-group">
                    <label>Selecione:</label>
                    <div class="radio-group">
                        <label><input type="radio" name="tipo-ponta" value="ponta-gondola" id="ponta-gondola" required>Ponta de Gôndola</label>
                        <label><input type="radio" name="tipo-ponta" value="ponta-podium" id="ponta-podium" required>Ponta Podium</label>
                        <label><input type="radio" name="tipo-ponta" value="na" id="ponta-nd" required>N/D</label>
                    </div>
                </div>
                <div class="imagens-referencia">
                    <div class="imagem-container">
                        <label>Ponta de Gôndola:</label>
                        <img src="images/ponta_gondola_bw.png" alt="Ponta de Gôndola (Preto e Branco)" class="referencia-imagem bw" id="img-ponta-gondola-bw">
                        <img src="images/ponta_gondola_color.png" alt="Ponta de Gôndola (Colorida)" class="referencia-imagem color hidden" id="img-ponta-gondola-color">
                    </div>
                    <div class="imagem-container">
                        <label>Ponta Podium:</label>
                        <img src="images/ponta_podium_bw.png" alt="Ponta Podium (Preto e Branco)" class="referencia-imagem bw" id="img-ponta-podium-bw">
                        <img src="images/ponta_podium_color.png" alt="Ponta Podium (Colorida)" class="referencia-imagem color hidden" id="img-ponta-podium-color">
                    </div>
                </div>
                <div class="navigation-buttons">
                    <button type="button" class="prev-button" data-prev="configuracao-gondola-group">Voltar</button>
                    <button type="button" class="next-button" data-next="tipo-rack-group">Avançar</button>
                </div>
            </div>
        `;
    }

    function createTipoRackSection() {
        return `
            <div id="tipo-rack-group" class="step hidden">
                <h2>Tipo Rack</h2>
                <div class="form-group">
                    <label>Selecione:</label>
                    <div class="radio-group">
                        <label><input type="radio" name="tipo-rack" value="rack-padrao" id="rack-padrao" required>Rack Padrão</label>
                        <label><input type="radio" name="tipo-rack" value="rack-embutido" id="rack-embutido" required>Rack Embutido</label>
                        <label><input type="radio" name="tipo-rack" value="na" id="rack-na" required>N/D</label>
                    </div>
                </div>
                <div class="imagens-referencia">
                    <div class="imagem-container">
                        <label>Rack Padrão:</label>
                        <img src="images/rack_padrao_bw.png" alt="Rack Padrão (Preto e Branco)" class="referencia-imagem bw" id="img-rack-padrao-bw">
                        <img src="images/rack_padrao_color.png" alt="Rack Padrão (Colorido)" class="referencia-imagem color hidden" id="img-rack-padrao-color">
                    </div>
                    <div class="imagem-container">
                        <label>Rack Embutido:</label>
                        <img src="images/rack_embutido_bw.png" alt="Rack Embutido (Preto e Branco)" class="referencia-imagem bw" id="img-rack-embutido-bw">
                        <img src="images/rack_embutido_color.png" alt="Rack Embutido (Colorido)" class="referencia-imagem color hidden" id="img-rack-embutido-color">
                    </div>
                </div>
                <div class="navigation-buttons">
                    <button type="button" class="prev-button" data-prev="tipo-ponta-group">Voltar</button>
                    <button type="button" class="next-button" data-next="selecao-cores-group">Avançar</button>
                </div>
            </div>
        `;
    }

    function createSelecaoCoresSection() {
        return `
            <div id="selecao-cores-group" class="step hidden">
                <h2>Seleção de Cores</h2>
                <div class="form-group">
                    <label for="cor-estrutura">Estrutura da Gondola:</label>
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
                        <option value="azul-medio">AZUL MÉDIO</option>
                        <option value="azul-escuro">AZUL ESCURO</option>
                        <option value="marron">MARRON</option>
                        <option value="branco-texturizado">BRANCO TEXTURIZADO</option>
                        <option value="preto-microtexturizado">PRETO MICROTEXTURIZADO</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="cor-acessorios">Acessório da Gondolas:</label>
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
                    <label for="cor-porta-etiqueta">Porta Etiqueta:</label>
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
                    <label for="cor-mdf">MDF:</label>
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
                <div class="navigation-buttons">
                    <button type="button" class="prev-button" data-prev="tipo-rack-group">Voltar</button>
                    <button type="button" class="next-button" data-next="projeto-possui-porta-pallet-group">Avançar</button>
                </div>
            </div>
        `;
    }

    function createProjetoPossuiPortaPalletSection() {
        return `
            <div id="projeto-possui-porta-pallet-group" class="step hidden">
                <h2>O Projeto possui porta Pallet?</h2>
                <div class="form-group">
                    <label for="possui-porta-pallet">Possui Porta Pallet?</label>
                    <select id="possui-porta-pallet" name="possui-porta-pallet" required>
                        <option value="">Selecione</option>
                        <option value="sim">Sim</option>
                        <option value="nao">Não</option>
                    </select>
                </div>
                <div class="navigation-buttons">
                    <button type="button" class="prev-button" data-prev="selecao-cores-group">Voltar</button>
                    <button type="button" class="next-button" data-next="configuracoes-porta-pallet-group">Avançar</button>
                </div>
            </div>
        `;
    }

    function createConfiguracoesPortaPalletSection() {
        return `
            <div id="configuracoes-porta-pallet-group" class="step hidden">
                <h2>Configurações do Porta Pallet</h2>

                <div class="form-group">
                    <label>Prateleiras (não é a longarina):</label>
                    <div class="checkbox-group">
                        <label><input type="radio" name="prateleira" value="aco" required>Prateleira em Aço</label>
                        <label><input type="radio" name="prateleira" value="mdf" required>Prateleira em MDF</label>
                        <label><input type="radio" name="prateleira" value="aramada" required>Prateleira Aramada</label>
                        <label><input type="radio" name="prateleira" value="sem" required>Sem prateleira</label>
                    </div>
                </div>

                <div class="form-group">
                    <label>Complementos:</label>
                    <div class="checkbox-group">
                        <label><input type="checkbox" name="complemento" value="distanciador-lateral">Distanciador Lateral</label>
                        <label><input type="checkbox" name="complemento" value="distanciador-central">Distanciador Central</label>
                        <label><input type="checkbox" name="complemento" value="guard-rail">Guard Rail</label>
                        <label><input type="checkbox" name="complemento" value="limitador-prateleira">Limitador Prateleira</label>
                    </div>
                </div>

                <div class="form-group">
                    <label for="altura">Altura (em metros):</label>
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
                    <label>Largura (em metros):</label>
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
                    <label for="base">Base (em metros):</label>
                    <select id="base" name="base" required>
                        <option value="">Selecione</option>
                        <option value="0.60">0,60</option>
                        <option value="0.80">0,80</option>
                        <option value="1.00">1,00</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="peso">Peso (em kg):</label>
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
                <div class="navigation-buttons">
                    <button type="button" class="prev-button" data-prev="projeto-possui-porta-pallet-group">Voltar</button>
                    <button type="button" class="next-button" data-next="gondola-embutida-group">Avançar</button>
                </div>
            </div>
        `;
    }

    function createGondolaEmbutidaSection() {
        return `
            <div id="gondola-embutida-group" class="step hidden">
                <h2>Gondola embutida?</h2>
                <div class="form-group">
                    <label>Gondola embutida?</label>
                    <div class="radio-group">
                        <label><input type="radio" name="gondola-embutida" value="sim">Sim</label>
                        <label><input type="radio" name="gondola-embutida" value="nao">Não</label>
                    </div>
                </div>

                <div id="altura-gondola-embutida-group" class="form-group hidden">
                    <label for="altura-gondola-embutida">Qual a altura da Gondola Embutida?</label>
                    <select id="altura-gondola-embutida" name="altura-gondola-embutida">
                        <option value="">Selecione</option>
                        <option value="1.80">1,80 M</option>
                        <option value="2.00">2,00 M</option>
                        <option value="2.20">2,20 M</option>
                        <option value="2.50">2,50 M</option>
                    </select>
                </div>
                <div class="navigation-buttons">
                    <button type="button" class="prev-button" data-prev="configuracoes-porta-pallet-group">Voltar</button>
                    <button type="button" class="next-button" data-next="observacoes-adicionais-group">Avançar</button>
                </div>
            </div>
        `;
    }

    function createObservacoesAdicionaisSection() {
        return `
            <div id="observacoes-adicionais-group" class="step hidden">
                <h2>Observações Adicionais</h2>
                <div class="form-group">
                    <label for="observacoes">Observações:</label>
                    <textarea id="observacoes" name="observacoes" rows="4" cols="50"></textarea>
                </div>
                <div class="navigation-buttons">
                    <button type="button" class="prev-button" data-prev="gondola-embutida-group">Voltar</button>
                    <button type="button" class="next-button" data-next="arquivos-auxiliares-group">Avançar</button>
                </div>
            </div>
        `;
    }

    function createArquivosAuxiliaresSection() {
        return `
            <div id="arquivos-auxiliares-group" class="step hidden">
                <h2>Arquivos auxiliares:</h2>
                <p>Nessa etapa, caso possua, anexe arquivos que auxiliarão do entendimento/desenvolvimento do projeto (Ex: Croqui/Medidas, Projetos em DWG, etc...)</p>
                <div class="form-group">
                    <label for="arquivos">Anexar arquivos:</label>
                    <input type="file" id="arquivos" name="arquivos" multiple>
                </div>
                <div class="navigation-buttons">
                    <button type="button" class="prev-button" data-prev="observacoes-adicionais-group">Voltar</button>
                    <button type="button" class="next-button" data-next="finalizar-formulario-group">Avançar</button>
                </div>
            </div>
        `;
    }

    function createFinalizarFormularioSection() {
        return `
            <div id="finalizar-formulario-group" class="step hidden">
                <h2>Finalizar formulário:</h2>
                <button type="button" id="finalizar-button">Finalizar</button>
            </div>
        `;
    }

    function loadArquiteturaForm() {
        formContainer.innerHTML = `
            <div id="tela-inicial-section" class="step">
                <h2>Tela Inicial</h2>
                <div id="dados-cadastrais-cliente-section">
                    <h3>Já é Cliente?</h3>
                    <label><input type="radio" name="cliente" id="cliente-sim" value="sim">Sim</label>
                    <label><input type="radio" name="cliente" id="cliente-nao" value="nao">Não</label>
                </div>

                <div id="projeto-possui-gondolas-section">
                    <h3>Projeto possui gôndolas?</h3>
                    <label><input type="radio" name="projeto-possui-gondolas" id="projeto-possui-gondolas-sim" value="sim">Sim</label>
                    <label><input type="radio" name="projeto-possui-gondolas" id="projeto-possui-gondolas-nao" value="nao">Não</label>
                </div>

                <div id="projeto-possui-porta-pallet-section">
                    <h3>Projeto possui porta pallet?</h3>
                    <label><input type="radio" name="projeto-possui-porta-pallet" id="projeto-possui-porta-pallet-sim" value="sim">Sim</label>
                    <label><input type="radio" name="projeto-possui-porta-pallet" id="projeto-possui-porta-pallet-nao" value="nao">Não</label>
                </div>

                <button id="next-tela-inicial">Avançar</button>
            </div>

            ${createInformeDadosCadastraisSection()}
            ${createInformeDadosNovoClienteSection()}
            ${createInformeSegmentoClienteSection()}
            ${createTipoProjetoSection()}
            ${createConfiguracaoGondolaSection()}
            ${createTipoPontaSection()}
            ${createTipoRackSection()}
            ${createSelecaoCoresSection()}
            ${createConfiguracoesPortaPalletSection()}
            ${createGondolaEmbutidaSection()}
            ${createObservacoesAdicionaisSection()}
            ${createArquivosAuxiliaresSection()}
            ${createFinalizarFormularioSection()}
        `;
        addEventListeners();
    }

    function addEventListeners() {
        let currentGroup = 'tela-inicial-section'; // Grupo inicial
    
        // Função para exibir um grupo de formulário
        function showGroup(groupId) {
            const group = document.getElementById(groupId);
            if (group) {
                group.classList.remove('hidden');
            }
        }
    
        // Função para ocultar um grupo de formulário
        function hideGroup(groupId) {
            const group = document.getElementById(groupId);
            if (group) {
                group.classList.add('hidden');
            }
        }
    
       // Oculta todos os grupos de formulário no início
        hideGroup('tela-inicial-section');
        hideGroup('informe-dados-cadastrais-section');
        hideGroup('informe-dados-novo-cliente-section');
        hideGroup('informe-segmento-cliente-section');
        hideGroup('tipo-projeto-section');
        hideGroup('configuracao-gondola-section');
        hideGroup('tipo-ponta-section');
        hideGroup('tipo-rack-section');
        hideGroup('selecao-cores-section');
        hideGroup('configuracoes-porta-pallet-section');
        hideGroup('gondola-embutida-section');
        hideGroup('observacoes-adicionais-section');
        hideGroup('arquivos-auxiliares-section');
        hideGroup('finalizar-formulario-section');
    
        // Exibe o grupo inicial
        showGroup(currentGroup);
    
        document.querySelectorAll('.next-button').forEach(button => {
            button.addEventListener('click', () => {
                const currentStep = button.closest('.step');
                const nextStepId = button.dataset.next;
                console.log('Botão Avançar clicado!'); // Adicionado log
                console.log('currentGroup:', currentGroup); // Adicionado log
                console.log('nextStepId:', nextStepId); // Adicionado log
    
                if (nextStepId) {
                    hideGroup(currentGroup);
                    showGroup(nextStepId);
                    currentGroup = nextStepId;
                }
            });
        });
    
        document.querySelectorAll('.prev-button').forEach(button => {
            button.addEventListener('click', () => {
                const currentStep = button.closest('.step');
                const prevStepId = button.dataset.prev;
                console.log('Botão Voltar clicado!'); // Adicionado log
                console.log('currentGroup:', currentGroup); // Adicionado log
                console.log('prevStepId:', prevStepId); // Adicionado log
    
                if (prevStepId) {
                    hideGroup(currentGroup);
                    showGroup(prevStepId);
                    currentGroup = prevStepId;
                }
            });
        });
    

           // Lógica para a tela inicial
        const nextTelaInicialButton = document.getElementById('next-tela-inicial');
        if (nextTelaInicialButton) {
            nextTelaInicialButton.addEventListener('click', () => {
                console.log('Botão Avançar (Tela Inicial) clicado!');
    
                const clienteSim = document.getElementById('cliente-sim');
                const clienteNao = document.getElementById('cliente-nao');
                const projetoPossuiGondolasSim = document.getElementById('projeto-possui-gondolas-sim');
                const projetoPossuiGondolasNao = document.getElementById('projeto-possui-gondolas-nao');
                const projetoPossuiPortaPalletSim = document.getElementById('projeto-possui-porta-pallet-sim');
                const projetoPossuiPortaPalletNao = document.getElementById('projeto-possui-porta-pallet-nao');
    
                // Esconde a tela inicial
                hideGroup('tela-inicial-section');
    
                 // Oculta todos os grupos de formulário
                hideGroup('informe-dados-cadastrais-section');
                hideGroup('informe-dados-novo-cliente-section');
                hideGroup('informe-segmento-cliente-section');
                hideGroup('tipo-projeto-section');
                hideGroup('configuracao-gondola-section');
                hideGroup('tipo-ponta-section');
                hideGroup('tipo-rack-section');
                hideGroup('selecao-cores-section');
                hideGroup('configuracoes-porta-pallet-section');
                hideGroup('gondola-embutida-section');
                hideGroup('observacoes-adicionais-section');
                hideGroup('arquivos-auxiliares-section');
                hideGroup('finalizar-formulario-section');
    
                // Definir o próximo grupo com base nos cenários
                let nextGroup = null;
    
                 // Cenário 1: Sim, Sim, Sim
                if (clienteSim && clienteSim.checked && projetoPossuiGondolasSim && projetoPossuiGondolasSim.checked && projetoPossuiPortaPalletSim && projetoPossuiPortaPalletSim.checked) {
                    showGroup('informe-dados-cadastrais-section');
                     hideGroup('informe-dados-novo-cliente-section');
                   
                }
                // Cenário 2: Nao, Sim, Sim
                 else if (clienteNao && clienteNao.checked && projetoPossuiGondolasSim && projetoPossuiGondolasSim.checked && projetoPossuiPortaPalletSim && projetoPossuiPortaPalletSim.checked) {
                    hideGroup('informe-dados-cadastrais-section');
                    showGroup('informe-dados-novo-cliente-section');
                   
                }
                // Cenário 3: Nao, Nao, Sim
                else if (clienteNao && clienteNao.checked && projetoPossuiGondolasNao && projetoPossuiGondolasNao.checked && projetoPossuiPortaPalletSim && projetoPossuiPortaPalletSim.checked) {
                     hideGroup('informe-dados-cadastrais-section');
                    showGroup('informe-dados-novo-cliente-section');
                    hideGroup('configuracao-gondola-section');
                    hideGroup('tipo-ponta-section');
                    hideGroup('tipo-rack-section');
                    hideGroup('selecao-cores-section');
                   
                }
                // Cenário 4: Nao, Sim, Nao
                else if (clienteNao && clienteNao.checked && projetoPossuiGondolasSim && projetoPossuiGondolasSim.checked && projetoPossuiPortaPalletNao && projetoPossuiPortaPalletNao.checked) {
                     hideGroup('informe-dados-cadastrais-section');
                    showGroup('informe-dados-novo-cliente-section');
                   
                    hideGroup('configuracoes-porta-pallet-section');
                    hideGroup('gondola-embutida-section');
                   
                }
                // Cenário 5: Sim, Sim, Nao
                 else if (clienteSim && clienteSim.checked && projetoPossuiGondolasSim && projetoPossuiGondolasSim.checked && projetoPossuiPortaPalletNao && projetoPossuiPortaPalletNao.checked) {
                    showGroup('informe-dados-cadastrais-section');
                     hideGroup('informe-dados-novo-cliente-section');
                   
                    hideGroup('configuracoes-porta-pallet-section');
                    hideGroup('gondola-embutida-section');
                  
                }
                // Cenário 6: Sim, Nao, Sim
                else if (clienteSim && clienteSim.checked && projetoPossuiGondolasNao && projetoPossuiGondolasNao.checked && projetoPossuiPortaPalletSim && projetoPossuiPortaPalletSim.checked) {
                    showGroup('informe-dados-cadastrais-section');
                     hideGroup('informe-dados-novo-cliente-section');
                   
                    hideGroup('configuracao-gondola-section');
                    hideGroup('tipo-ponta-section');
                    hideGroup('tipo-rack-section');
                    hideGroup('selecao-cores-section');
                   
                }
                
    
                if (nextGroup) {
                    showGroup(nextGroup);
                    currentGroup = nextGroup;
                }
            });
        }
    

        document.querySelectorAll('input[name="segmento"]').forEach(radio => {
            radio.addEventListener('change', function() {
                const segmentoOutroInput = document.getElementById('segmento-outro');
                if (this.value === 'outro') {
                    segmentoOutroInput.classList.remove('hidden');
                    segmentoOutroInput.required = true;
                } else {
                    segmentoOutroInput.classList.add('hidden');
                    segmentoOutroInput.required = false;
                }
            });
        });
    
        document.querySelectorAll('input[name="gondola-embutida"]').forEach(radio => {
            radio.addEventListener('change', function() {
                const alturaGondolaEmbutidaGroup = document.getElementById('altura-gondola-embutida-group');
                if (this.value === 'sim') {
                    alturaGondolaEmbutidaGroup.classList.remove('hidden');
                } else {
                    alturaGondolaEmbutidaGroup.classList.add('hidden');
                }
            });
        });
    
        // Tipo Ponta radio button change event
        document.querySelectorAll('input[name="tipo-ponta"]').forEach(radio => {
            radio.addEventListener('change', function() {
                const pontaGondolaBw = document.getElementById('img-ponta-gondola-bw');
                const pontaGondolaColor = document.getElementById('img-ponta-gondola-color');
                const pontaPodiumBw = document.getElementById('img-ponta-podium-bw');
                const pontaPodiumColor = document.getElementById('img-ponta-podium-color');
    
                // Reset all images to black and white
                pontaGondolaBw.classList.remove('hidden');
                pontaGondolaColor.classList.add('hidden');
                pontaPodiumBw.classList.remove('hidden');
                pontaPodiumColor.classList.add('hidden');
    
                // Show color image based on selection
                if (this.value === 'ponta-gondola') {
                    pontaGondolaBw.classList.add('hidden');
                    pontaGondolaColor.classList.remove('hidden');
                } else if (this.value === 'ponta-podium') {
                    pontaPodiumBw.classList.add('hidden');
                    pontaPodiumColor.classList.remove('hidden');
                }
            });
        });
    
        // Tipo Rack radio button change event
        document.querySelectorAll('input[name="tipo-rack"]').forEach(radio => {
            radio.addEventListener('change', function() {
                const rackPadraoBw = document.getElementById('img-rack-padrao-bw');
                const rackPadraoColor = document.getElementById('img-rack-padrao-color');
                const rackEmbutidoBw = document.getElementById('img-rack-embutido-bw');
                const rackEmbutidoColor = document.getElementById('img-rack-embutido-color');
    
                // Reset all images to black and white
                rackPadraoBw.classList.remove('hidden');
                rackPadraoColor.classList.add('hidden');
                rackEmbutidoBw.classList.remove('hidden');
                rackEmbutidoColor.classList.add('hidden');
    
                // Show color image based on selection
                if (this.value === 'rack-padrao') {
                    rackPadraoBw.classList.add('hidden');
                    rackPadraoColor.classList.remove('hidden');
                } else if (this.value === 'rack-embutido') {
                    rackEmbutidoBw.classList.add('hidden');
                    rackEmbutidoColor.classList.remove('hidden');
                }
            });
        });
    }


    // Apply the mask to the phone number inputs
    $(document).ready(function () {
        $('input[data-mask]').each(function () {
            var mask = $(this).attr('data-mask');
            $(this).mask(mask);
        });
    });
});