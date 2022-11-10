---
layout: post
title:  "Docker Swarm Practices for Lightweight Home Server Operation"
date:   2022-11-10 21:19:32 +0800
categories: memo
tags: docker swarm container homeserver devops
---

| ![Is It Worth the Time?, xkcd 1205](https://imgs.xkcd.com/comics/is_it_worth_the_time.png) |
|:--:|
| [Is It Worth the Time? (source: xkcd 1205)](https://xkcd.com/1205/) |

Unlike people in [homelab](https://www.reddit.com/r/homelab/) have so many fancy gears,
I only have a disused laptop (Chromebook Pixel 2015 16G) and a cheap Intel NUC([NUC5CPYH](https://www.intel.com/content/www/us/en/products/sku/85254/intel-nuc-kit-nuc5cpyh/specifications.html))
for all my in-home IT service demands (NAS, networking services, monitoring, etc.).
Since I don't want cost too much energy on operation things, I seldom do operation
works for my home servers except they don't work (But I still update them quarterly for new distributions and kernels). So for quite a long time, most of my services were
managed by systemd, cronjob, or bash scripts. However, I recently started trying many new things with multiple dependencies. And I don't want these things to penetrate
my existing environments. So I wonder if the docker ecosystem may be a good solution.
After some trial and errors, I feel like I generally experienced the docker toolchain
(Though I wrote lots Dockerfile configures for CI/CD purposes at work, I seldom use it for service management), so I decided to write a short review about it.

## Some Dockerized Services at Home

The followings are some services I deployed at home recently. Though they're not
fully IaC ([Infrastructure as Code](https://en.wikipedia.org/wiki/Infrastructure_as_code)),
the docker swarm orchestrations greatly simplified the deployment process. And,
100% IaC needs much toil to achieve. Which means doing many trial-and-error things on
deployment scripts. Unless I need to deploy the same service once a week, I don't
think it is worth the toil.

### Mastodon

In my [previous article]({{ site.url }}/memo/2022/10/31/mastodon-deploy.html), I wrote some details about Mastodon's deployment using docker swarm. The whole deployment cost me about 1 day, and most of the time was spent on Nginx and Cloudflare's configuration. Most configurations I need to start the service could be configured in `docker-compose.yml`(except the `ulimit` setting for elasticsearch). After running for several days, I transferred the `/public` data folder to an HDD to get more available space). And I found it relatively easy to update the service configuration while the services were managed by the docker stack.

### Nextcloud

Nextcloud is an useful tool for data management and transfer. I use [snap](https://en.wikipedia.org/wiki/Snap_(software)) to deploy it previously. After I deployed many services with docker swarm,
I planned to migrate the Nextcloud service to docker too. Though the snap works
out-of-the-box, the ecosystem seems not rich as docker. And the most
important reason is I don't want to maintain services with two different tools
while the commands of these tools are not so intuitively.

Nextcloud gives many different docker configurations in their [repo](https://github.com/nextcloud/docker). I chose the one that I feel most comfortable with to start (postgresql + PHP fpm). The deployment process is pretty smooth, but somehow I reassigned the postgresql's user privileges manually after setting up the admin account because the account creation scripts in Nextcloud seems didn't correctly alter the tables privileges after the creation of the admin account:

```text
PDOException: SQLSTATE[42501]: Insufficient privilege: 7 ERROR:  permission denied for table oc_appconfig in /var/www/html/3rdparty/doctrine/dbal/src/Driver/PDO/Connection.php:82
Stack trace:
#0 /var/www/html/3rdparty/doctrine/dbal/src/Driver/PDO/Connection.php(82): PDO->query('SELECT * FROM "...')
#1 /var/www/html/3rdparty/doctrine/dbal/src/Connection.php(1062): Doctrine\DBAL\Driver\PDO\Connection->query('SELECT * FROM "...')
...
```
Though I have an existing Nextcloud deployment via snap, the migration process is complex. Snap just copy all folders in the package with its backup tools. It's not easy to restore with other tools. And snap use MySQL by default. I also need to do database migration if I want to keep the old configuration, which seems more complex and error-prone. So instead of migration, I made a new deployment.

### Prometheus+Grafana

Last month I planned to use prometheus+Grafana stack to replace Munin for my network status monitor purpose. And there is a well-maintained [docker-compose repo](https://github.com/vegasbrianc/prometheus) for the deployment. This's the first service I deployed with the docker stack. However, the services running smoothly after a month (afterward, I found that the default data expiration time is 30 days).

## Review

After I deployed these services with docker swarm, I felt I had some views to write down: What is the benefit from the stack, and what issues do we need to pay attention to. So I summarized them as follows.

### Advantages

- **Easily extend your operation capacity at home.** Docker's ecosystem is rich, so most of the services I could reach have docker images. It's essential for services that have multiple or the same dependencies. I could wipe the whole thing easily if I made a mass. It's necessary for the tech stack, which I am unfamiliar with.
- **Convenient to make command into service.** I could run a single command
  and turn the container into a service with `docker update --restart always <container-name>`
  then review them with `docker ps`. It’s much more convenient than `systemd`,
  especially when I need to change the services now and then.
- **Works out of the box (mostly)**. The deployment from the compose files works out of the box and is reproducible, especially in well-maintained repos. Most of the toil is to fine-tune some configurations I need to customize.
- **Transparency**: with the commands like `docker service logs`, `docker logs` or `docker exec -it <container> /bin/sh`,
  it's easy to obtain logs from the system or debug on the containers. After
  understanding the basic concepts of the docker swarm, the debugging experience is almost
  close to debug in the local environment.
- **Convenient for experiments**: I could set up the network environment easily in the docker compose file. So testing some distributed services are convenient than before. Though I could achieve this by using VM management tools like Vagrant, the docker container is a more resource-saving solution. And the network definition in the docker compose file is easier.

### Disadvantages

- **Automation, but not that automatic**. While using docker swarm on multiple nodes (physical machines), I found that the network between containers could work smoothly (If the firewall on nodes was properly set). But obviously, the data volume can't achieve this. If there are some persistent data, it always needs extra effort to make things work. From the [docker data volume documents](https://docs.docker.com/engine/swarm/services/#give-a-service-access-to-volumes-or-bind-mounts), they say:
  > If you bind mount a host path into your service’s containers, the path must exist on every swarm node. The Docker swarm mode scheduler can schedule containers on any machine that meets resource availability requirements and satisfies all constraints and placement preferences you specify.

  In my situation, when a service starts, the node manager tries several times to boot the container on the machine that doesn't have a specific data path:

    ```bash
    anzwltkogbgaeltn8qvb436yw   nextcloud_app.1        nextcloud:fpm-alpine@sha256:c88a48b8b32f42a0146c45d1817e64124ab0b23976797ea339d46e4cf56cc859   piksel                  Running         Running 2 days ago
    xfn21y22k5jvajqc9ish078m5    \_ nextcloud_app.1    nextcloud:fpm-alpine@sha256:c88a48b8b32f42a0146c45d1817e64124ab0b23976797ea339d46e4cf56cc859   localhost.localdomain   Shutdown        Rejected 2 days ago   "invalid mount config for type "bind": bind source path does not exist: /mnt/data/nextcloud/nextcloud"
    isiqams6kmic5nzakbo18n6qn    \_ nextcloud_app.1    nextcloud:fpm-alpine@sha256:c88a48b8b32f42a0146c45d1817e64124ab0b23976797ea339d46e4cf56cc859   localhost.localdomain   Shutdown        Rejected 2 days ago   "invalid mount config for type "bind": bind source path does not exist: /mnt/data/nextcloud/nextcloud"
    ```

- **Some node(host) specified network configurations are not easy to eliminate.**
  For example, if you want to [attach docker containers on your local network using macvlan](https://blog.oddbit.com/post/2018-03-12-using-docker-macvlan-networks/), it may be complicated on docker swarm. So I only configured several services that booted by the `docker run` command to use this feature.
- **Top level named volume can't have a certain path.** When I started to configure
  the data volume in compose file, I thought top level named volume like [this](https://github.com/nextcloud/docker/blob/master/.examples/docker-compose/insecure/postgres/fpm/docker-compose.yml#L50-L52) could have a specific path. But I'm wrong, it's not
  works like a variable name in a template. The docker will generate a named volume
  on the node like this:

    ```bash
    $  docker volume ls
    DRIVER    VOLUME NAME
    local     prom_grafana_data
    local     prom_prometheus_data
    ```

    So it's impossible to make docker swarm run this:

    ```yaml
    volumes:
        db:
            mountpoint: /data/path/to/db
    ```

    You can only achieve this with [the plugin that make a new driver](https://github.com/MatchbookLab/local-persist):

    ```yaml
    volumes:
        db:
            driver: local-persist
            driver_opts:
            mountpoint: /data/path/to/db
    ```

    Therefore, instead of named volume, I specify bind mount everywhere I need to
    configure a data path because my home directory on Chromebook isn't enough,
    so I need to make data write on the HDD.

- **Needs to remember some commands.** Unless you work with docker swarm daily, it's easy to forget many deploying or debugging commands. Unlike Linux commands I use daily, these commands are less intuitive (but still better than snap and Kubernetes). I took notes of some commonly used command combinations just in case.

## Conclusion

The docker swarm is a nice orchestrator for home IT applications. It has good maintainability, portability, and observability. And keep the orchestration file relatively simple at the same time. I didn't find an equivalent at the moment. If you know some alternatives, please tell me, and I'm willing to have a try.

## Reference

- [Deploy a stack to a swarm](https://docs.docker.com/engine/swarm/stack-deploy/)
- [Using Docker MacVLAN Networks](https://blog.oddbit.com/post/2018-03-12-using-docker-macvlan-networks/)
- [Allowing macvlan-networked docker containers to access the host](https://kcore.org/2020/08/18/macvlan-host-access/)
- [How to backup your (Nextcloud) instance](https://github.com/nextcloud-snap/nextcloud-snap/wiki/How-to-backup-your-instance)
- [The Difference Between Docker Compose And Docker Stack](https://vsupalov.com/difference-docker-compose-and-docker-stack/)
- [Start containers automatically](https://docs.docker.com/config/containers/start-containers-automatically/)
