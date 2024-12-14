#!/bin/bash

# 引数が指定されていない場合はエラーメッセージを表示
if [ -z "$1" ]; then
  echo "使用法: $0 <コンテナ名>"
  exit 1
fi

# 引数として指定されたコンテナ名
CONTAINER_NAME=$1

# 指定されたコンテナに入る
docker-compose exec "$CONTAINER_NAME" sh
