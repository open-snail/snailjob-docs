::: warning 🌈特别说明
为了让小伙伴快速搭建测试数据库环境, `v3.2.0`版本开始提供了`docker compose`的数据库构建支持，如果不熟悉 docker 的小伙伴，
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

| **数据库类型** | **端口** | **数据库(Schema)** | **用户名** | **密码**     | **其他**        |
| -------------- | -------- | ------------------ | ---------- | ------------ | --------------- |
| MySQL          | 3306     | easy_retry         | root       | root         |                 |
| MariaDB        | 3308     | easy_retry         | root       | root         |                 |
| Postgres       | 5432     | easy_retry         | root       | root         |                 |
| Oracle         | 1521     | easy_retry         | easy_retry | EasyRetry    | 容器名称: XEPDB1 |
| MS SQL Server  | 1433     | easy_retry         | sa         | EasyRetry@24 |                 |

**注意**：由于`system_user`为SQLServer系统函数，因此SQLServer需要启用前缀配置，请修改`application.yml`配置信息`table-prefix: er_`，启用表名前缀功能。