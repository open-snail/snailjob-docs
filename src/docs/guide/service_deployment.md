# 服务部署 (Service Deployment)

本文件详细介绍了项目的服务部署过程和步骤。

## 一、准备环境

在开始部署服务之前，需要准备好必要的环境和工具。

- **服务器**：确保服务器已安装操作系统，并且能够访问互联网。
- **依赖工具**：安装必要的依赖工具，如 Docker、Git 等。

### 服务器要求

- **操作系统**：建议使用 Ubuntu 20.04 LTS 或 CentOS 8。
- **CPU**：至少 2 核。
- **内存**：至少 4GB。
- **存储**：至少 50GB 可用空间。

## 二、获取代码

通过 Git 从版本控制系统中获取最新的项目代码。
::: code-group
```bash [Gitee]
git clone https://gitee.com/aizuda/snail-job.git
cd project
```
```bash [Github]
git clone https://github.com/aizuda/snail-job.git
cd project
```
:::
## 三、配置环境
#### 数据源配置
::: code-group

```yaml [mysql 数据源]
# 配置数据源
spring:
  datasource:
    name: snail_job
    url:  jdbc:mysql://localhost:3306/snail_job?useSSL=false&characterEncoding=utf8&useUnicode=true
    username: root
    password: root
    driver-class-name: com.mysql.cj.jdbc.Driver
    ....其他配置信息....
```

```yaml [mariadb 数据源]
# 配置数据源
spring:
  datasource:
    name: snail_job
    url: jdbc:mariadb://localhost:3308/snail_job
    username: root
    password: root
    driver-class-name: org.mariadb.jdbc.Driver
  # ....其他配置信息....
```

```yaml [postgres 数据源]
# 配置数据源
spring:
  datasource:
    name: snail_job
    url: jdbc:postgresql://localhost:5432/snail_job
    username: postgres
    password: root
    driver-class-name: org.postgresql.Driver
   #....其他配置信息....
```

```yaml [sqlserver 数据源]
# 配置数据源
spring:
  datasource:
    name: snail_job
    url: jdbc:sqlserver://localhost:1433;DatabaseName=snail_job;SelectMethod=cursor;encrypt=false;rewriteBatchedStatements=true
    username: SA
    password: EasyRetry@24
    driver-class-name: com.microsoft.sqlserver.jdbc.SQLServerDriver
   #....其他配置信息....
```

```yaml [oracle 数据源]
# 配置数据源
spring:
  datasource:
    name: snail_job
    url: jdbc:oracle:thin:@//localhost:1521/XEPDB1
    username: snail_job
    password: EasyRetry
    driver-class-name: oracle.jdbc.OracleDriver
   #....其他配置信息....
```
:::

#### 系统参数配置
根据项目需求配置环境变量和其他必要的设置。
详情配置 see: [服务端配置](/docs/guide/server_config)

## 四、数据库构建
see: [数据库自动化构建](/docs/guide/database_build)

## 五、启动服务
### 源码部署
- maven 打包镜像
```bash
maven clean install
```
- 启动
```
java -jar snail-job-server.jar
```

### Docker容器部署
::: warning 🌈特别说明
如需自定义 mysql 等配置，可通过 "-e PARAMS" 指定，参数格式 PARAMS="--key1=value1  --key2=value2" ；
配置项参考文件：/snail-job-server/src/main/resources/application.yml
如需自定义 JVM内存参数 等配置，可通过 "-e JAVA_OPTS" 指定，参数格式 JAVA_OPTS="-Xmx512m" ；
:::

::: code-group

```shell [mysql 数据源]
docker run  -e PARAMS="--spring.datasource.username=root --spring.datasource.password=root  --spring.datasource.url=jdbc:mysql://IP:3306/snail_job?useUnicode=true&characterEncoding=UTF-8&autoReconnect=true&serverTimezone=Asia/Shanghai --spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver" -p 8080:8080 -p 1788:1788 --name snail-job-server-mysql -d byteblogs/snail-job:{Latest Version}
```
```shell [mariadb 数据源]
docker run  -e PARAMS="--spring.datasource.username=root --spring.datasource.password=root  --spring.datasource.url=jdbc:mariadb://IP:3307/snail_job --spring.datasource.driver-class-name=org.mariadb.jdbc.Driver" -p 8080:8080 -p 1788:1788 --name snail-job-server-mariadb -d byteblogs/snail-job:{Latest Version}
```
```shell [postgres 数据源]
docker run  -e PARAMS="--spring.datasource.username=postgres --spring.datasource.password=root  --spring.datasource.url=jdbc:postgresql://IP:5432/snail_job --spring.datasource.driver-class-name= org.postgresql.Driver" -p 8080:8080 -p 1788:1788 --name snail-job-server-postgres -d byteblogs/snail-job:{Latest Version}
```
```shell [sqlserver 数据源]
docker run  -e PARAMS="--spring.datasource.username=SA --spring.datasource.password=SnailJob@24  --spring.datasource.url=jdbc:sqlserver://IP:1433;DatabaseName=snail_job;SelectMethod=cursor;encrypt=false;rewriteBatchedStatements=true --spring.datasource.driver-class-name= com.microsoft.sqlserver.jdbc.SQLServerDriver" -p 8080:8080 -p 1788:1788 --name snail-job-server-sqlserver -d byteblogs/snail-job:{Latest Version}
```
```shell [oracle 数据源]
docker run  -e PARAMS="--spring.datasource.username=snail_job --spring.datasource.password=SnailJob  --spring.datasource.url=jdbc:oracle:thin:@//IP:1521/XEPDB1 --spring.datasource.driver-class-name=oracle.jdbc.OracleDriver" -p 8080:8080 -p 1788:1788 --name snail-job-server-oracle -d byteblogs/snail-job:{Latest Version}
```
:::

## 五、验证部署
确保服务正常运行，进行基本的功能测试。

测试 API 接口
使用 curl 或 Postman 进行 API 测试，确保服务响应正确。

```bash
http://localhost:8000/snail-job
用户名: admin
密码: admin
```

问题一：无法连接数据库
检查数据库连接字符串是否正确，并确保数据库服务正在运行。

问题二：服务启动失败
查看 Docker 容器日志，检查错误信息并进行排查。

## 结论
通过以上步骤，我们完成了项目的服务部署。如果有任何问题或建议，请联系项目负责人。

感谢阅读，敬请期待更多更新内容！