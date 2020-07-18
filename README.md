Comandos, Ajuda e Dicas do Docker
Mostrar comandos e comandos de gerenciamento
$ docker
Informações sobre a versão do Docker
$ docker version
Mostrar informações como número de contêineres etc.
$ docker info
TRABALHANDO COM RECIPIENTES
Criar executar um contêiner em primeiro plano
$ docker container run -it -p 80:80 nginx
Criar executar um contêiner em segundo plano
$ docker container run -d -p 80:80 nginx
Forma abreviada
$ docker container run -d -p 80:80 nginx
Nomeação de contêineres
$ docker container run -d -p 80:80 --name nginx-server nginx
DICA: O QUE EXECUTEU
Procurou uma imagem chamada nginx no cache de imagens
Se não for encontrado no cache, ele procurará o repositório de imagens padrão no Dockerhub
Desceu (versão mais recente), armazenada no cache de imagens
Iniciado em um novo contêiner
Especificamos pegar a porta 80- no host e encaminhar para a porta 80 no contêiner
Poderíamos executar "contêiner $ docker executado - publique 8000: 80 --detach nginx" para usar a porta 8000
Podemos especificar versões como "nginx: 1.09"
Listar contêineres em execução
$ docker container ls
OU

$ docker ps
Listar todos os contêineres (mesmo que não estejam em execução)
$ docker container ls -a
Stop container
$ docker container stop [ID]
Pare todos os contêineres em execução
$ docker stop $(docker ps -aq)
Remover o contêiner (não é possível remover os contêineres em execução, deve parar primeiro)
$ docker container rm [ID]
Para remover um contêiner em execução, use force (-f)
$ docker container rm -f [ID]
Remova vários contêineres
$ docker container rm [ID] [ID] [ID]
Remova todos os recipientes
$ docker rm $(docker ps -aq)
Obter logs (usar nome ou ID)
$ docker container logs [NAME]
Listar processos em execução no contêiner
$ docker container top [NAME]
DICA: SOBRE RECIPIENTES
Os contêineres do Docker geralmente são comparados às máquinas virtuais, mas na verdade são apenas processos em execução no sistema operacional do host. No Windows / Mac, o Docker é executado em uma mini-VM, para ver os processos que você precisará conectar diretamente a ele. No Linux, no entanto, você pode executar "ps aux" e ver os processos diretamente

COMANDOS DE IMAGEM
Liste as imagens que tiramos
$ docker image ls
Também podemos apenas puxar imagens
$ docker pull [IMAGE]
Remover imagem
$ docker image rm [IMAGE]
Remova todas as imagens
$ docker rmi $(docker images -a -q)
DICA: SOBRE IMAGENS
As imagens são bianários e dependências de aplicativos com metadados sobre os dados da imagem e como executá-la
As imagens não são um sistema operacional completo. Sem kernel, módulos de kernel (drivers)
Host fornece o kernel, grande diferença entre VM
Alguma amostra de criação de contêiner
NGINX:

$ docker container run -d -p 80:80 --name nginx nginx (-p 80:80 is optional as it runs on 80 by default)
APACHE:

$ docker container run -d -p 8080:80 --name apache httpd
MONGODB:

$ docker container run -d -p 27017:27017 --name mongo mongo
MYSQL:

$ docker container run -d -p 3306:3306 --name mysql --env MYSQL_ROOT_PASSWORD=123456 mysql
INFORMAÇÕES DO RECIPIENTE
Exibir informações no contêiner
$ docker container inspect [NAME]
Propriedade específica (--format)
$ docker container inspect --format '{{ .NetworkSettings.IPAddress }}' [NAME]
Estatísticas de desempenho (CPU, MEM, rede, disco, etc)
$ docker container stats [NAME]
ACESSAR RECIPIENTES
Crie um novo contêiner nginx e faça o bash no
$ docker container run -it --name [NAME] nginx bash
i = interativo Mantenha o STDIN aberto se não estiver conectado
t = tty - Abrir prompt
Para o Git Bash, use "winpty"

$ winpty docker container run -it --name [NAME] nginx bash
Executar / criar contêiner Ubuntu
$ docker container run -it --name ubuntu ubuntu
(sem bash porque o ubuntu usa bash por padrão)

Você também pode fazer isso quando sair do contêiner, não permanecer usando o sinalizador -rm
$ docker container run --rm -it --name [NAME] ubuntu
Acesse um contêiner já criado, comece com -ai
$ docker container start -ai ubuntu
Use exec para editar configurações, etc
$ docker container exec -it mysql bash
Alpine é uma distribuição Linux muito pequena, boa para docker
$ docker container run -it alpine sh
(use sh porque não inclui o bash) (o alpine usa apk para o gerenciador de pacotes - pode instalar o bash, se quiser)

NETWORKING
"bridge" ou "docker0" é a rede padrão
Obter porta
$ docker container port [NAME]
Listar redes
$ docker network ls
Inspecionar rede
$ docker network inspect [NETWORK_NAME]
("bridge" is default)
Criar rede
$ docker network create [NETWORK_NAME]
Criar contêiner na rede
$ docker container run -d --name [NAME] --network [NETWORK_NAME] nginx
Conecte o contêiner existente à rede
$ docker network connect [NETWORK_NAME] [CONTAINER_NAME]
Desconectar contêiner da rede
$ docker network disconnect [NETWORK_NAME] [CONTAINER_NAME]
Desconecte a rede do contêiner
$ docker network disconnect
MARCAÇÃO DE IMAGEM E EMPURRAR PARA DOCKERHUB
tags são etiquetas que apontam para um ID de imagem
$ docker image ls
Você verá que cada imagem tem uma tag

Voltar a marcar a imagem existente
$ docker image tag nginx btraversy/nginx
Carregar no dockerhub
$ docker image push bradtraversy/nginx
Se negado, faça
$ docker login
Adicionar etiqueta à nova imagem
$ docker image tag bradtraversy/nginx bradtraversy/nginx:testing
PEÇAS DOCKERFILE
FROM - O sistema operacional usado. Comum é alpino, debian, ubuntu
ENV - Variáveis ​​de ambiente
EXECUTAR - Executar comandos / scripts de shell, etc
EXPOSE - Portas a serem expostas
CMD - Comando final executado quando você inicia um novo contêiner a partir da imagem
WORKDIR - Define o diretório de trabalho (também pode usar 'RUN cd / some / path')
COPY # Copia arquivos do host para o contêiner
Construir imagem a partir do dockerfile (o replay pode ser o que for)
No mesmo diretório que o Dockerfile
$ docker image build -t [REPONAME] .
DICA: CACHE E PEDIDO
Se você executar novamente a compilação, será rápido porque tudo é armazenado em cache.
Se você alterar uma linha e executar novamente, essa linha e tudo o que for depois não serão armazenados em cache
Mantenha as coisas que mais mudam na parte inferior do Dockerfile
DOCKERFILE EXTENDENTE
Dockerfile personalizado para paqge html com nginx
FROM nginx:latest # Extends nginx so everything included in that image is included here
WORKDIR /usr/share/nginx/html
COPY index.html index.html
Criar imagem do Dockerfile
$ docker image build -t nginx-website
Executando
$ docker container run -p 80:80 --rm nginx-website
Identifique e envie para o Dockerhub
$ docker image tag nginx-website:latest btraversy/nginx-website:latest
$ docker image push bradtraversy/nginx-website
VOLUMES
Volume - Faz localização especial fora do contêiner UFS. Usado para bancos de dados
Vincular o caminho do contêiner Mount -Link ao caminho do host
Verificar volumes
$ docker volume ls
Limpar volumes não utilizados
$ docker volume prune
Puxe a imagem do mysql para testar
$ docker pull mysql
Inspecione e veja o volume
$ docker image inspect mysql
Executar contêiner
$ docker container run -d --name mysql -e MYSQL_ALLOW_EMPTY_PASSWORD=True mysql
Inspecione e veja o volume no contêiner
$ docker container inspect mysql
DICA: Suportes
Você também verá o volume em montagens
O contêiner obtém seu próprio local uniqe no host para armazenar esses dados
Fonte: xxx é onde ele mora no host
Verificar volumes
$ docker volume ls
Não há como diferenciar volumes, por exemplo, com 2 contêineres mysql, por isso usamos volumes nomeados

Volumes nomeados (comando Add -v) (o nome aqui é mysql-db, que pode ser qualquer coisa)
$ docker container run -d --name mysql -e MYSQL_ALLOW_EMPTY_PASSWORD=True -v mysql-db:/var/lib/mysql mysql
Inspecionar novo volume nomeado
docker volume inspect mysql-db
MONTAGENS BIND
Não é possível usar no Dockerfile, especificado em tempo de execução (usa -v também)
... execute -v / Usuários / brad / stuff: / path / container (mac / linux)
... execute -v // c / Usuários / brad / stuff: / path / container (windows)
DICA: em vez de digitar o caminho local, para o diretório de trabalho, use $ (pwd): / path / container - no Windows, pode não funcionar, a menos que você esteja na pasta de usuários

Execute e consiga editar o arquivo index.html (o diretório local deve ter o Dockerfile e o index.html)
$ docker container run  -p 80:80 -v $(pwd):/usr/share/nginx/html nginx
Entre no recipiente e verifique
$ docker container exec -it nginx bash
$ cd /usr/share/nginx/html
$ ls -al
Você pode criar um arquivo no contêiner e ele também existirá no host
$ touch test.txt
DOCKER COMPOSE
Configurar relacionamentos entre contêineres
Salve as configurações de execução do contêiner do docker em um arquivo fácil de ler
2 partes: Arquivo YAML (docker.compose.yml) + ferramenta CLI (docker-compose)
1. docker.compose.yml - Descreve soluções para
recipientes
redes
volumes
2. CLI do docker-compose - usado para automação local de desenvolvimento / teste com arquivos YAML
Exemplo de arquivo de composição (do curso Bret Fishers)
version: '2'

# same as
# docker run -p 80:4000 -v $(pwd):/site bretfisher/jekyll-serve

services:
  jekyll:
    image: bretfisher/jekyll-serve
    volumes:
      - .:/site
    ports:
      - '80:4000'
Para correr
docker-compose up
Você pode executar em segundo plano com
docker-compose up -d
Limpar
docker-compose down
