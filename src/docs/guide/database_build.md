# 数据库自动化构建

::: warning 🌈特别说明
为了让小伙伴快速搭建测试数据库环境, SnailJob提供了`docker compose`的数据库构建支持，如果不熟悉 docker 的小伙伴，
可以参考本文档的`数据库默认连接信息`构建本地相应的数据库环境，或者修改`application.yml`文件的`spring.data`的`jdbc`信息。
:::


### docker compose 快速构建数据库环境

**要求 docker 支持 docker compose v2**

```shell
cd ./doc/docker
```

::: code-group

```shell [MySQL]
## 启动 mysql
docker compose up -d mysql
```

```shell [Mariadb]
## 启动 mariadb
docker compose up -d mariadb
```

```shell [Postgres]
## 启动 postgres
docker compose up -d postgres
```

```shell [Oracle]
## 启动 oracle
docker compose up -d oracle
```


```shell [MS SQL Server]
## 启动 sqlserver
docker compose up -d sqlserver
docker compose exec sqlserver bash /tmp/create_schema.sh
```

:::

### 数据库默认连接信息

| **数据库类型** | **端口** | **数据库(Schema)** | **用户名** | **密码**      | **其他**        |
| -------------- | -------- | ------------------ | ---------- |-------------| --------------- |
| MySQL          | 3306     | snail_job         | root       | root        |                 |
| MariaDB        | 3308     | snail_job         | root       | root        |                 |
| Postgres       | 5432     | snail_job         | root       | root        |                 |
| Oracle         | 1521     | snail_job         | snail_job | SnailJob    | 容器名称: XEPDB1 |
| MS SQL Server  | 1433     | snail_job         | sa         | SnailJob@24 |                 |
