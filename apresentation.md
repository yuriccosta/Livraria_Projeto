
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Elaboradores

- [João Vitor Guimarães](https://github.com/computacaocomojota)
- [Yuri Coutinho Costa](https://github.com/yuriccosta)


## Descrição

- Projeto realizado com parte do processo seletivo da TecnoJr
- Objetivo: Criar uma aplicação de vendas de livros

- Usuário:
  
  - name
  - e-mail
  - password 
  - cash

- Livro:

  - userId
  - name
  - author
  - price
  - amount
  - status
  - pages
  - category
  - publishing company
  - publication
  - description


## Conceitos

- Arquitetura MVC
- Controllers
- Providers
- Modules
- Filtros de Exceção
- Pipes
- Guards

## Arquitetura MVC

Arquitetura de software é a estrutura fundamental ou o esqueleto de um sistema de software, que define seus componentes, suas relações e seus princípios de projeto e evolução.

<p align="center">
  <a href="https://www.alura.com.br/artigos/padroes-arquiteturais-arquitetura-software-descomplicada#:~:text=A%20defini%C3%A7%C3%A3o%20de%20arquitetura%20de,princ%C3%ADpios%20de%20projeto%20e%20evolu%C3%A7%C3%A3o.%E2%80%9D" target="blank"><img src="https://www.alura.com.br/artigos/assets/padroes-arquiteturais-arquitetura-software-descomplicada/imagem2.jpg" width="300" alt="Arquitetura de Software" /></a>
</p>

`O acrônimo MVC significa Model-View-Controller.`


É um padrão de arquitetura de software baseada na `reutilização de código e na divisão de responsabilidades de uma aplicação`, principalmente dentro de um software web.

A arquitetura MVC faz a separação da apresentação e a interação dos dados do sistema, que é estruturado em três componentes lógicos: model (modelo), view (visualização, visão ou vista) e controller (controlador). Esses componentes interagem entre si da seguinte maneira:

- Model é responsável por `estabelecer as regras de negócio, interagir com o sistema de dados e fazer as operações associadas a esses dados.`

- View `define e gerencia como os dados são apresentados ao usuário.`

- Controller é a camada intermediária entre model e view, `interage com o usuário (por meio de teclas, cliques do mouse, requisições etc.) e é responsável por responder de acordo.`

<p align="center">
  <a href="https://www.alura.com.br/artigos/padroes-arquiteturais-arquitetura-software-descomplicada#:~:text=A%20defini%C3%A7%C3%A3o%20de%20arquitetura%20de,princ%C3%ADpios%20de%20projeto%20e%20evolu%C3%A7%C3%A3o.%E2%80%9D" target="blank"><img src="https://www.alura.com.br/artigos/assets/padroes-arquiteturais-arquitetura-software-descomplicada/imagem8.jpg" width="300" alt="Arquitetura de Software" /></a>
</p>


## Controllers


<p align="center">
  <a href="https://docs.nestjs.com/controllers" target="blank"><img src="https://docs.nestjs.com/assets/Controllers_1.png" width="550" alt="Representação de Controlles" /></a>
</p>

Os controladores são responsáveis ​​por `lidar com as solicitações recebidas e retornar as respostas ao cliente`, que geralmente são chamadas a um método no modelo.

`O objetivo de um controlador é receber solicitações específicas para a aplicação`. O mecanismo de roteamento controla qual controlador recebe quais solicitações. 

Frequentemente, cada controlador possui mais de uma rota, e rotas diferentes podem executar ações diferentes.

[Controller do Livro](src/modules/book/book.controller.ts)

## Providers

<p align="center">
  <a href="https://docs.nestjs.com/providers" target="blank"><img src="https://docs.nestjs.com/assets/Components_1.png" width="550" alt="Representação de Providers" /></a>
</p>

A ideia principal de um provedor é que ele possa ser injetado como uma dependência; isso significa que os objetos podem criar vários relacionamentos entre si, e a função de "conectar" esses objetos pode ser amplamente delegada ao sistema de tempo de execução Nest.

`Os controladores devem lidar com solicitações HTTP e delegar tarefas mais complexas aos provedores. `

Provedores são classes JavaScript simples declaradas como providers em um módulo .


[Serviço do Livro](src/modules/book/book.service.ts)

## Modules

<p align="center">
  <a href="https://docs.nestjs.com/modules" target="blank"><img src="https://docs.nestjs.com/assets/Modules_1.png" width="550" alt="Estrutura do Módulo" /></a>
</p>

Cada aplicação possui pelo menos um módulo, o módulo raiz . `O módulo raiz é o ponto de partida que o Nest usa para construir o gráfico do aplicativo` - a estrutura de dados interna que o Nest usa para resolver relacionamentos e dependências de módulo e provedor.

`Os módulos são fortemente recomendados como uma forma eficaz de organizar seus componentes.`

 Assim, para a maioria das aplicações, a arquitetura resultante empregará múltiplos módulos, cada um encapsulando um conjunto de capacidades estreitamente relacionado.

 [Módulo do Livro](src/modules/book)

## Exception Filters

<p align="center">
  <a href="https://docs.nestjs.com/exception-filters" target="blank"><img src="https://docs.nestjs.com/assets/Filter_1.png" width="550" alt="Representação de Filtro de Exceção" /></a>
</p>

O Nest vem com uma camada de exceções integrada que é responsável por `processar todas as exceções não tratadas em um aplicativo. `

Quando uma exceção não é tratada pelo código do seu aplicativo, `ela é capturada por esta camada, que então envia automaticamente uma resposta apropriada e amigável.`

[Utilizando Filtro de Exceções](src/modules/book/book.service.ts)

## Pipes

<p align="center">
  <a href="https://docs.nestjs.com/pipes" target="blank"><img src="https://docs.nestjs.com/assets/Pipe_1.png" width="550" alt="Representação de Pipes" /></a>
</p>



Pipes têm dois casos de uso típicos:

*Transformação* : `transforma os dados de entrada na forma desejada (por exemplo, de string para inteiro)`

*Validação* : `avalia os dados de entrada e, se válidos, simplesmente passa-os inalterados; caso contrário, lance uma exceção`

[Usando Pipes para Transformação](src/modules/book/book.controller.ts)

## Guards

<p align="center">
  <a href="https://docs.nestjs.com/guards" target="blank"><img src="https://docs.nestjs.com/assets/Guards_1.png" width="550" alt="Representação de Guards" /></a>
</p>

Os guardas têm uma única responsabilidade . `Eles determinam se uma determinada solicitação será tratada pelo manipulador de rota ou não`, dependendo de certas condições (como permissões, funções, ACLs, etc.) presentes em tempo de execução.

 A autorização é um ótimo caso de uso para Guards porque `rotas específicas devem estar disponíveis somente quando o chamador (geralmente um usuário específico autenticado) tiver permissões suficientes`. 

 Assim como pipes e filtros de exceção, os protetores podem ter escopo de controlador , escopo de método ou escopo global. 

[Autorização e Autenticação do Usuário](src/common/guard/auth.guard.ts)
### Referências

https://docs.nestjs.com/

https://www.alura.com.br/artigos/padroes-arquiteturais-arquitetura-software-descomplicada#:~:text=A%20defini%C3%A7%C3%A3o%20de%20arquitetura%20de,princ%C3%ADpios%20de%20projeto%20e%20evolu%C3%A7%C3%A3o.%E2%80%9D

https://www.treinaweb.com.br/blog/o-que-e-mvc#:~:text=O%20MVC%20sugere%20uma%20maneira,camada%20de%20controle%20(controller).


