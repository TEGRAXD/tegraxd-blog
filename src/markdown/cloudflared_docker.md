---
title: Setting up Cloudflared with Docker for Tunnel
description: A step-by-step guide to setting up Cloudflared with Docker for tunneling traffic to your origin server.
date: 2025-01-15T00:00:00.000Z
---

# Setting up Cloudflared with Docker for Tunnel
This guide will help you set up Cloudflared using Docker to create a secure, reliable tunnel to your application `test`.

## Prerequisites
1. Docker installed on the system.
2. Cloudflare account with configured domain.

## Setting up 
1. Log in to your Cloudflare dashboard.
2. Click Zero Trust menu in Cloudflare dashboard.
3. Under networks menu, Create a new tunnel and choose Cloudflared as your tunnel type.
4. Name your tunnel and save it.
5. We need to connect our server with cloudflared network. Then choose Docker as environment.
6. There will be your token in the command such as `--token eyXXX...`, just copy the command and paste somewhere, then copy the full token.
7. Create a new file named `docker-compose.yaml` in your server:
  ```yaml
  services:
    cloudflared:
      image: cloudflare/cloudflared:latest
      container_name: cloudflared
      command: tunnel --no-autoupdate run --token yourSecretToken # Do not forget to change the token.
      networks:
        - tunnel # Use "tunnel" network that we created.
      restart: unless-stopped

  networks:
    tunnel: # This create a new networks named tunnel.
  ```
8. Run the docker-compose.yaml:
  ```bash
  docker compose up -d
  ```
9. Make sure the container is running:
  ```bash
  docker container list
  ```
10. Back to your tunnel in Cloudflare One. Under connectors, there will be your machine connected if you successfully setting up Cloudflared.

## Public Hostname
You can put your service/app in Public Hostname by setting your domain and service type and URL. Usually for website service/app, I use HTTP and URL with container name or docker exposed IP:port (e.g., `portainer:9000` or `172.0.0.1:port`).