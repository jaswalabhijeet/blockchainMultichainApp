# blockchainMultichainApp
Exemplo de comunicação via Json RPC com o blockchain da Multichain, sem fee(Taxa) para simular registos de ocorrencia de não conformidade.[EM Evolução]

## Instalação do Blockchain[Multichain]
Seguir conforme documentação oficial do [Multtichain](http://www.multichain.com/download-install/)
OBS: Limitado a ambiente Linux. :(

## Configuração do ambiente pós-instalação
Para executar este App é necessário ter os seguintes itens instalados no seu ambiente de desenvolvimento:
* Git
```sh
sudo apt-get install git
```
* Nano
```sh
sudo apt-get install nano
```

## Criação da nossa Multichain
```sh
multichain-util create naoconformidades_chain
```

## Ajustando arquivos para permitir comunicação via RPC

Altere o arquivo que segue abaixo:
```sh
nano ~/.multichain/naoconformidades_chain/params.dat
```
Altere para *true* os seguintes valores [anyone-can-connect, anyone-can-send, anyone-can-receive, anyone-can-issue]

## Conexão Json RPC
Veja qual a porta RPC que foi definida pelo multichain-util, em:
```sh
cat ~/.multichain/naoconformidades_chain/params.dat
```

O valor deverá estar da seguinte forma:
```sh
default-rpc-port = 6484                 # Default TCP/IP port for incoming JSON-RPC API requests.
```

## Subindo no Multichain
É importante que todos os passos anteriores tenham sido feito antes de seguir, pois após criada, uma chain não pode ser reconfigurada. Qualquer dúvida, siga para a documentação oficial da [Multichain](http://www.multichain.com/)

Execute o seguinte comando, respeitando a substituição de parâmetro caso veja necessidade:
```sh
multichaind naoconformidades_chain -daemon -rpcuser='rodolfo' -rpcpassword='qwe123' 
```

Como o intuito é somente acadêmico, a comunicação RPC somente está passível de ser realizada via localhost.


# Montando nosso Client(Aplicação)
Até aqui, configuramos a estrutura do clockchain da Multichain para que possamos comunicar com a nossa Aplicação de Exemplo.

## Pré-requisito
* Node
* npm

## Montando ambiente do Client

Antes de mais nada, é importante que o seu linux esteja devidamente atualizado, rodando o comando:
```sh
sudo apt-get update
```

Após isso, vá para o diretório onde será implementada a nossa aplicação e execute os seguintes comandos:
```sh
npm install multichain-node --save
npm install express --save
npm install body-parser --save
```

Pronto, agora nossas dependências estão devidamente gerenciadas, agora vamos baixar o app disponível neste git com o comando(Para tal é necessário ter configurado a chave SSH para o GIT conforme documentação oficial [Git SSH](https://help.github.com/articles/generating-an-ssh-key/)):
```sh
git clone https://github.com/blockchainMultichainApp
```

## Subindo nossa App
Agora basta subir nossa aplicação com o NodeJs
```sh
node main.js
```

Acesse a app por: [localhost:8181](localhost:8181)

## Referências

- [Multichain](http://www.multichain.com/)
- [Node](https://nodejs.org/en/)
- [Git](https://help.github.com/)
