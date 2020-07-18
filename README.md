# Comandos, ajuda e dicas do Docker

### Mostrar comandos e comandos de gerenciamento

`` ``
$ docker
`` ``

Informações sobre a versão do Docker

`` ``
Versão do docker
`` ``

### Mostrar informações como número de contêineres etc.

`` ``
$ docker info
`` ``

# TRABALHANDO COM RECIPIENTES

### Crie uma execução de um contêiner em primeiro plano

`` ``
Contêiner $ docker executado -it -p 80:80 nginx
`` ``

### Crie uma execução de um contêiner em segundo plano

`` ``
Contêiner $ docker executado -d -p 80:80 nginx
`` ``

### Forma abreviada

`` ``
Contêiner $ docker executado -d -p 80:80 nginx
`` ``

### Nomeando contêineres

`` ``
O contêiner $ docker executa -d -p 80:80 --name nginx-server nginx
`` ``

DICA: O QUE EXECUTEU

- Procurou uma imagem chamada nginx no cache de imagens
- Se não for encontrado no cache, ele procurará o repositório de imagens padrão no Dockerhub
- Puxou para baixo (versão mais recente), armazenada no cache de imagens
- Iniciou em um novo contêiner
- Especificamos pegar a porta 80- no host e encaminhar para a porta 80 no contêiner
- Poderíamos executar "contêiner de docker $ executado - publique 8000: 80 --detach nginx" para usar a porta 8000
- Podemos especificar versões como "nginx: 1.09"

### Listar contêineres em execução

`` ``
$ docker container ls
`` ``

OU

`` ``
$ docker ps
`` ``

### Listar todos os contêineres (mesmo que não estejam em execução)

`` ``
$ docker container ls -a
`` ``

### Parar contêiner

`` ``
$ docker container stop [ID]
`` ``

### Interrompa todos os contêineres em execução

`` ``
$ docker stop $ (docker ps -aq)
`` ``

### Remover contêiner (não é possível remover contêineres em execução, deve parar primeiro)

`` ``
$ docker container rm [ID]
`` ``

### Para remover um contêiner em execução, use force (-f)

`` ``
Contêiner $ docker rm -f [ID]
`` ``

### Remover vários contêineres

`` ``
$ docker container rm [ID] [ID] [ID]
`` ``

### Remova todos os contêineres

`` ``
$ docker rm $ (janela de encaixe ps -aq)
`` ``

### Obter logs (usar nome ou ID)

`` ``
Logs do contêiner de $ docker [NAME]
`` ``

### Listar processos em execução no contêiner

`` ``
$ docker container top [NAME]
`` ``

#### DICA: SOBRE RECIPIENTES

Os contêineres do Docker costumam ser comparados às máquinas virtuais, mas na verdade são apenas processos em execução no sistema operacional do host. No Windows / Mac, o Docker é executado em uma mini-VM, para ver os processos que você precisará conectar diretamente a ele. No Linux, no entanto, você pode executar "ps aux" e ver os processos diretamente

# COMANDOS DE IMAGEM

### Liste as imagens que extraímos

`` ``
$ docker image ls
`` ``

Também podemos apenas puxar imagens

`` ``
$ docker pull [IMAGE]
`` ``

### Remover imagem

`` ``
$ docker image rm [IMAGE]
`` ``

### Remova todas as imagens

`` ``
$ docker rmi $ (imagens do docker -a -q)
`` ``

#### DICA: SOBRE IMAGENS

- Imagens são bianários e dependências de aplicativos com metadados sobre os dados da imagem e como executá-la
- As imagens não são um sistema operacional completo. Sem kernel, módulos de kernel (drivers)
- Host fornece o kernel, grande diferença entre VM

### Alguma amostra de criação de contêiner

NGINX:

`` ``
O contêiner $ docker executa -d -p 80:80 --name nginx nginx (-p 80:80 é opcional, pois é executado no 80 por padrão)
`` ``

APACHE:

`` ``
O contêiner $ docker executa -d -p 8080: 80 --name apache httpd
`` ``

MONGODB:

`` ``
$ docker container run -d -p 27017: 27017 --name mongo mongo
`` ``

MYSQL:

`` ``
O contêiner $ docker executa -d -p 3306: 3306 --name mysql --env MYSQL_ROOT_PASSWORD = 123456 mysql
`` ``

## INFORMAÇÕES DO RECIPIENTE

### Visualizar informações no contêiner

`` ``
O contêiner $ docker inspeciona [NAME]
`` ``

Propriedade específica (--format)

`` ``
O contêiner $ docker inspeciona --format '{{.NetworkSettings.IPAddress}}' [NAME]
`` ``

### Estatísticas de desempenho (CPU, mem, rede, disco, etc)

`` ``
Estatísticas do contêiner de $ docker [NAME]
`` ``

## ACESSAR RECIPIENTES

### Crie um novo contêiner nginx e faça o bash no

`` ``
Contêiner de docker $ run -it --name [NAME] nginx bash
`` ``

- i = interativo Mantenha o STDIN aberto se não estiver conectado
- t = tty - Abrir prompt

** Para Git Bash, use "winpty" **

`` ``
Contêiner de docker $ winpty executado -it --name [NAME] nginx bash
`` ``

### Executar / criar contêiner Ubuntu

`` ``
$ docker container run -it --name ubuntu ubuntu
`` ``

** (sem bash porque o ubuntu usa bash por padrão) **

### Você também pode fazer isso quando sair do contêiner, não permanecer usando o sinalizador -rm

`` ``
O contêiner $ docker executa --rm -it --name [NAME] ubuntu
`` ``

### Acesse um contêiner já criado, comece com -ai

`` ``
$ docker container start -ai ubuntu
`` ``

### Use exec para editar configurações, etc

`` ``
$ docker container exec -it mysql bash
`` ``

### Alpine é uma distribuição Linux muito pequena, boa para docker

`` ``
$ docker contêiner executado - sh alpino
`` ``

(use sh porque não inclui o bash)
(alpine usa apk para seu gerenciador de pacotes - pode instalar o bash, se quiser)

# REDE

### "bridge" ou "docker0" é a rede padrão

### Obter porta

`` ``
Porta do contêiner $ docker [NAME]
`` ``

### Listar redes

`` ``
$ docker network ls
`` ``

### Inspecionar rede

`` ``
A rede $ docker inspeciona [NETWORK_NAME]
("ponte" é o padrão)
`` ``

### Criar rede

`` ``
Rede $ docker criar [NETWORK_NAME]
`` ``

### Criar contêiner na rede

`` ``
Contêiner de docker $ run -d --name [NAME] --network [NETWORK_NAME] nginx
`` ``

### Conecte o contêiner existente à rede

`` ``
Conexão de rede $ docker [NETWORK_NAME] [CONTAINER_NAME]
`` ``

### Desconectar contêiner da rede

`` ``
Desconectar a rede do docker [NETWORK_NAME] [CONTAINER_NAME]
`` ``

### Desconecte a rede do contêiner

`` ``
desconexão da rede do docker
`` ``

# MARCAÇÃO DE IMAGEM E EMPURRAR PARA DOCKERHUB

# tags são marcadores que apontam para um ID de imagem

`` ``
$ docker image ls
`` ``

Você verá que cada imagem tem uma tag

### Voltar a etiquetar a imagem existente

`` ``
tag de imagem $ docker nginx btraversy / nginx
`` ``

### Carregar no dockerhub

`` ``
$ docker image push bradtraversy / nginx
`` ``

### Se negado, faça

`` ``
$ docker login
`` ``

### Adicionar tag à nova imagem

`` ``
Etiqueta de imagem $ docker bradtraversy / nginx bradtraversy / nginx: testing
`` ``

### PEÇAS DOCKERFILE

- FROM - O sistema operacional usado. Comum é alpino, debian, ubuntu
- ENV - Variáveis ​​de ambiente
- RUN - Executar comandos / scripts de shell, etc
- EXPOSE - Portas para expor
- CMD - Comando final executado quando você inicia um novo contêiner a partir da imagem
- WORKDIR - Define o diretório de trabalho (também pode usar 'RUN cd / some / path')
- COPY # Copia arquivos do host para o contêiner

### Construir imagem a partir do dockerfile (o nome pode ser o que for)

### Do mesmo diretório que o Dockerfile

`` ``
$ docker image build -t [REPONAME].
`` ``

#### DICA: CACHE E PEDIDO

- Se você executar novamente a compilação, será rápido porque tudo é armazenado em cache.
- Se você alterar uma linha e executar novamente, essa linha e tudo o que for depois não serão armazenados em cache
- Mantenha as coisas que mais mudam na parte inferior do Dockerfile

# DOCKERFILE EXTENDENTE

### Arquivo de encaixe personalizado para paqge html com nginx

`` ``
FROM nginx: latest # Estende o nginx para que tudo incluído nessa imagem seja incluído aqui
WORKDIR / usr / share / nginx / html
COPY index.html index.html
`` ``

### Compilar imagem do Dockerfile

`` ``
$ docker image build -t nginx-website
`` ``

### Executando

`` ``
$ docker container run -p 80:80 --rm nginx-website
`` ``

### Identifique e envie para o Dockerhub

`` ``
$ docker image tag nginx-website: mais recente btraversy / nginx-website: mais recente
`` ``

`` ``
$ docker image push bradtraversy / nginx-website
`` ``

# VOLUMES

Volume - Faz localização especial fora do contêiner UFS. Usado para bancos de dados

### Vincular o caminho do contêiner Mount -Link ao caminho do host

### Verificar volumes

`` ``
$ docker volume ls
`` ``

### Limpar volumes não utilizados

`` ``
Remoção do volume $ docker
`` ``

### Puxe a imagem do mysql para testar

`` ``
$ docker pull mysql
`` ``

### Inspecione e veja o volume

`` ``
A imagem do docker inspeciona o mysql
`` ``

### Executar contêiner

`` ``
Contêiner $ docker executa -d --name mysql -e MYSQL_ALLOW_EMPTY_PASSWORD = True mysql
`` ``

### Inspecione e veja o volume no contêiner

`` ``
O contêiner $ docker inspeciona o mysql
`` ``

#### DICA: Suportes

- Você também verá o volume em montagens
- O contêiner obtém seu próprio local uniqe no host para armazenar esses dados
- Fonte: xxx é onde ele mora no host

### Verificar volumes

`` ``
$ docker volume ls
`` ``

** Não há como diferenciar volumes, por exemplo, com 2 contêineres mysql; portanto, usamos volumes nomeados **

Volumes nomeados (comando Add -v) (o nome aqui é mysql-db, que pode ser qualquer coisa)

`` ``
O contêiner $ docker executa -d --name mysql -e MYSQL_ALLOW_EMPTY_PASSWORD = True -v mysql-db: / var / lib / mysql mysql
`` ``

### Inspecionar novo volume nomeado

`` ``
volume do docker inspecionar mysql-db
`` ``

# MONTAGENS BIND

- Não é possível usar no Dockerfile, especificado em tempo de execução (usa -v também)
- ... execute -v / Usuários / brad / stuff: / path / container (mac / linux)
- ... execute -v // c / Usuários / brad / stuff: / path / container (windows)

** DICA: Em vez de digitar o caminho local, para o diretório de trabalho, use $ (pwd): / path / container - No Windows, pode não funcionar, a menos que você esteja na pasta de usuários **

### Execute e possa editar o arquivo index.html (o diretório local deve ter o Dockerfile e o index.html)

`` ``
O contêiner do docker $ executa -p 80:80 -v $ (pwd): / usr / share / nginx / html nginx
`` ``

### Entre no contêiner e verifique

`` ``
$ docker container exec -it nginx bash
$ cd / usr / share / nginx / html
$ ls -al
`` ``

### Você pode criar um arquivo no contêiner e ele também existirá no host

`` ``
$ touch test.txt
`` ``

# DOCKER COMPOSE

- Configurar relacionamentos entre contêineres
- Salve as configurações de execução do contêiner do docker em um arquivo fácil de ler
- 2 partes: arquivo YAML (docker.compose.yml) + ferramenta CLI (docker-compose)

# Dock # docker.compose.yml - Descreve soluções para

- recipientes
- redes
- volumes

### 2. docker-compose CLI - usado para automação local de desenvolvimento / teste com arquivos YAML

### Exemplo de arquivo de composição (do curso Bret Fishers)

`` ``
versão 2'

# igual a
# docker run -p 80: 4000 -v $ (pwd): / site bretfisher / jekyll-serve

Serviços:
  jekyll:
    imagem: bretfisher / jekyll-serve
    volumes:
      - .:/local
    portas:
      - '80: 4000 '
`` ``

### Para correr

`` ``
docker-compor
`` ``

### Você pode executar em segundo plano com

`` ``
docker-compor up -d
`` ``

### Limpar

`` ``
docker-compor para baixo
`` ``
