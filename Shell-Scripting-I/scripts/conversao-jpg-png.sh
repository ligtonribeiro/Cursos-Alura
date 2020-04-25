#!/bin/bash

cd ../imagens-livros

for imagem in *.jpg
do
    convert $imagem $imagem
done
