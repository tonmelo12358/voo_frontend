## Front end Experiência de Voo

Este projeto faz parte da Disciplina **Qualidade de Software, Segurança e Sistemas Inteligentes** da pós graduação em Engenharia de Software da PUC-RIO.

O objetivo é criar treinar um modelo de machine learning utilizando um dataset escolhido pelo aluno e utilizar esse modelo treinado em uma aplicação no padrão MVC composta de API e um front-end.

O dataset escolhido para este projeto é de análise para satisfação de voo. Nele existem diversas informações colhidas com os passageiros (desde informações pessoais, como informações de experiência pré-voo e durante o voo), em que os passageiros contam como foi a experiência daquele voo, e no final eles indicam se ficaram satisfeitos ou não com a experiência.

A aplicação que utiliza este modelo treinado possui um formulário para que possamos inserir dados de experiência de um voo, e baseado nessas informações inseridas podemos determinar com grande precisão se a experiência foi satisfatória ou não.
Na parte de baixo do front end existe uma tabela com os cadastros realizados e seus respectivos resultados.

## Como executar
Basta fazer o download do projeto e abrir o arquivo index.html no seu browser.

## Como funciona o Front

A página do Experiência de Voo apresenta 2 partes:

#### 1 - Criar um novo cadastro de passageiro: 
Você pode analisar as experiências de passageiros na página. Basta preencher todos os campos desta parte **(atenção: não são aceitos campos vazios)**. Os campos são os seguintes:

- Nome do Passageiro

- Idade

- Gênero

- Tipo de Passageiro

- Motivo de Viagem

- Distância

- Classe de Voo

- Conforto do Assento

- Entretenimento no Voo

- Serviço de Check-in

- Serviço de Bordo

- Limpeza da Aeronave

- Atraso na Partida

- Atraso na Chegada

Após preenchimento clique em **Adicionar** e pronto! Iremos analisar como foi sua experiência, informar, e essa informação estará guardada no banco de dados e disponível para consulta na parte inferior do site!

#### 2 - Lista dos passageiros analisados. 
Uma lista que mostra os passageiros existentes no banco de dados. Na lista você pode ver todas os passageiros analisados e o resultado.
É possível deletar correlações através do botão delete, na coluna da direita de cada passageiro.


