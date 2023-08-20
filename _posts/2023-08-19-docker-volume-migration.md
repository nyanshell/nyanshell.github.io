---
layout: post
title:  "Migrate Grafana & Prometheus's Docker volume"
date:   2023-08-19 20:07:23 +0900
categories: memo
tags: docker grafana prometheus
largeimage: /assets/im_20230701083235_003_54724152.png
image: /assets/im_20230819164120_002_999580740.jpg
summary:
---

Over the past few weeks, I migrated the services that I had deployed on my Chromebook Pixel and old Celeron NUC to my
newly purchased NUC 13. The only thing worth mentioning is that Docker volumes require some caution when being migrated.
Hence, I have taken a brief note of the process here.

The Grafana & Prometheus service deployed using docker stack from [this repo](https://github.com/vegasbrianc/prometheus.git).

## Procedure

The data volumes of Grafana & Prometheus are `prom_grafana_data` and `prom_prometheus_data`：

```bash
$ docker volume ls
DRIVER    VOLUME NAME
...
local     prom_grafana_data
local     prom_prometheus_data
```

The main idea is to using a docker image to run backup and restore like [this question](https://stackoverflow.com/questions/38298645/how-should-i-backup-restore-docker-named-volumes) in StackOverflow.

1. Stop the service to prevent writing while backup.
    ```bash
    $ docker stack rm prom # the service stack is prom
    ```
2. Dump docker volume.
    ```bash
    $ docker run --rm --volume prom_grafana_data:<the-mount-path-in-docker> --volume $(pwd):<the-backup-path-in-docker> ubuntu tar cvf <the-path-in-docker>/prom_grafana_data.tar <the-mount-path-in-docker>/prom_grafana_data --strip 1
    $ docker run --rm --volume prom_prometheus_data:<the-mount-path-in-docker> --volume $(pwd):<the-backup-path-in-docker> ubuntu tar cvf <the-path-in-docker>/prom_prometheus_data.tar <the-mount-path-in-docker>/prom_prometheus_data --strip 1
    ```
3. Transfer dumped volume into new machine.
4. Start services on new machine to create named volumes (`docker-compose.yaml` will create `prom_grafana_data` and `prom_prometheus_data` with proper label & privilege,
   I tried manually edit resource labels but feel quite complicate then gave up).
   ```bash
   $ docker stack deploy prom -c docker-compose.yml
   ```
5. Stop service on new machine.
   ```bash
   $ docker stack rm prom
   ```
6. Restore data on new machine (In this step I started a shell to manually do the decompress & copy operations).
   ```bash
   # remove data in new created named volume and decompress the backup data into the named volume
   docker run -it --rm --volume <prom_prometheus_data|prom_grafana_data>:/home/scarlet/<prom_prometheus_data|prom_grafana_data> --volume $(pwd):/home/scarlet/backup ubuntu /bin/bash
   ```
7. Start service on new machine with `docker stack deploy prom -c docker-compose.yml`.

Done!

## Reference

- [Back up, restore, or migrate data volumes](https://docs.docker.com/storage/volumes/#back-up-restore-or-migrate-data-volumes)
- [How should I backup & restore docker named volumes](https://stackoverflow.com/questions/38298645/how-should-i-backup-restore-docker-named-volumes)
