# React Client Project

This project is a React-based web client application, packaged with Docker for easy setup and deployment. The project includes a `Dockerfile` and `docker-compose.yml` to build and run the application in a containerized environment.

## Table of Contents
## Table of Contents


- [Prerequisites](#prerequisites)
- [Project Setup](#project-setup)
  - [With Docker Compose](#with-docker-compose)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Available Commands](#available-commands)

---


## Prerequisites

Make sure you have the following installed:

- [Docker](https://www.docker.com/get-started)

You can verify installation by running these commands in your terminal:
docker --version


---
## Project setup


- Clone our project

git clone https://github.com/Abhijith-uabhi/proxy-app-client.git
cd  proxy-app-client



##  With docker compose

Build and start the project

docker-compose up -d --build 

Stop the project

docker-compose down

