# HU Search

A app foi feita em NodeJS, usando Elasticsearch.

# Dependencia

*Existe uma GRANDE DEPENDENCIA COM O Elasticsearch*, SEM O Elasticsearch, não vai funcionar.

## Instalação

Antes de rodar ou instalar a app, é preciso ter o Elasticsearch (1.4.2) instalado. Como irá instalar é com você, sendo mac pode ser via hombrew:

Mac:
```
brew update
brew doctor
brew install elasticsearch
```

Ubuntu:

[Install in ubuntu](http://www.elasticsearch.org/guide/en/elasticsearch/reference/current/setup-service.html)

:)

Instalando a app:

```bash
make install
```

## Rodando aplicação

Para rodar a aplicação, estamos partindo do presuposto que o Elasticsearch esta iniciado.

### Criando documentos no Elasticsearch

Com o Elasticsearch iniciado, rode estes comandos no terminal.

```
curl -XPOST "http://localhost:9200/hu/hotels/1" -d '{ "name" : "Plaza Hotel", "city" : "Rio de Janeiro", "uf" : "RJ" }'
curl -XPOST "http://localhost:9200/hu/hotels/2" -d '{ "name" : "Vitoria Plaza Hotel", "city" : "Vitoria", "uf" : "ES" }'
```

### Iniciando

O comando abaixo, irá rodar os testes e instalar tambem as dependencias, caso algum teste quebre, a aplicação não inicia.

```bash
make
```

## Testes

Antes de rodar os testes, é importante deletar os documentos do Elasticsearch, deste modo:

```
curl -XDELETE 'http://localhost:9200/hu/hotels/_query?q=city:rio'
curl -XDELETE 'http://localhost:9200/hu/hotels/_query?q=city:vitoria'
```

### Rodando os testes

```bash
make spec
```

## Stress

Antes de rodar os testes de stress, é importante deletar os documentos do Elasticsearch, deste modo:

```
curl -XDELETE 'http://localhost:9200/hu/hotels/_query?q=city:rio'
curl -XDELETE 'http://localhost:9200/hu/hotels/_query?q=city:vitoria'
```

### Rodando os testes de stress

```bash
make stress
```

# Utilizando

### Rota

#### Status

Para saber se o Elasticsearch esta levantado ou se esta down, tem a rota:

```
  endpoint.com.br/status
```

Se a rota não responder, então nem a app esta de pe. :)


#### Search

Para fazer alguma busca, o critério sempre será pelo campo city.

##### Sem filtro (ele trará todos os documentos do Elasticsearch.

```
  endpoint.com.br/api/search
```

Retorno:

```
[
    {
        "_index": "hu",
        "_type": "hotels",
        "_id": "1",
        "_score": 0.15342641,
        "_source": {
            "name": "Plaza Hotel",
            "city": "Rio de Janeiro",
            "uf": "RJ"
        }
    }
]
```

##### Com um filtro

```
  endpoint.com.br/api/search?params=rio
```

Retorno:

```
[
    {
        "_index": "hu",
        "_type": "hotels",
        "_id": "1",
        "_score": 0.15342641,
        "_source": {
            "name": "Plaza Hotel",
            "city": "Rio de Janeiro",
            "uf": "RJ"
        }
    }
]
```

Ou:

```
  endpoint.com.br/api/search?params=rio janeiro
```

Retorno:

```
[
    {
        "_index": "hu",
        "_type": "hotels",
        "_id": "1",
        "_score": 0.2169777,
        "_source": {
            "name": "Plaza Hotel",
            "city": "Rio de Janeiro",
            "uf": "RJ"
        }
    }
]
```

##### Com mais filtros

```
  endpoint.com.br/api/search?params[]=rio&params[]=janeiro
```

Retorno:

```
[
    {
        "_index": "hu",
        "_type": "hotels",
        "_id": "1",
        "_score": 0.2169777,
        "_source": {
            "name": "Plaza Hotel",
            "city": "Rio de Janeiro",
            "uf": "RJ"
        }
    }
]
```

Ou:

```
  endpoint.com.br/api/search?params=rio janeiro
```

Retorno:

```
[
    {
        "_index": "hu",
        "_type": "hotels",
        "_id": "1",
        "_score": 0.2169777,
        "_source": {
            "name": "Plaza Hotel",
            "city": "Rio de Janeiro",
            "uf": "RJ"
        }
    }
]
```


## Duvidas:

Comigo mesmo ... :)

rodrigo@rrmartins.com
