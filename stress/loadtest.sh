#!/bin/bash

curl -XPOST "http://localhost:9200/hu/hotels/1" -d '{ "name" : "Plaza Hotel", "city" : "Rio de Janeiro", "uf" : "RJ" }'
curl -XPOST "http://localhost:9200/hu/hotels/2" -d '{ "name" : "Vitoria Plaza Hotel", "city" : "Vitoria", "uf" : "ES" }'

loadtest -n 5000 -H x-api-key:8F2CAB946BB513C7795D43DA52E5D8D4D9ED1055BBB60150F07CA004D8EC0E8D http://localhost:3030/api/search

loadtest -n 5000 -H x-api-key:8F2CAB946BB513C7795D43DA52E5D8D4D9ED1055BBB60150F07CA004D8EC0E8D http://localhost:3030/api/search?params=rio

loadtest -n 5000 -H x-api-key:8F2CAB946BB513C7795D43DA52E5D8D4D9ED1055BBB60150F07CA004D8EC0E8D http://localhost:3030/api/search?params=es

loadtest -n 5000 -H x-api-key:8F2CAB946BB513C7795D43DA52E5D8D4D9ED1055BBB60150F07CA004D8EC0E8D http://localhost:3030/api/search?params=vitoria

curl -XDELETE 'http://localhost:9200/hu/hotels/_query?q=city:rio'
curl -XDELETE 'http://localhost:9200/hu/hotels/_query?q=city:vitoria'
