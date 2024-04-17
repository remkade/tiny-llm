# tiny-llm
Code for my tiny llm review project

To use this repo you'll need [docker](https://www.docker.com/) & [docker-compose](https://docs.docker.com/compose/install/) or [podman](https://podman.io/) & [podman-compose](https://pypi.org/project/podman-compose/). You may also want [deno](https://www.deno.land/) to generate the config file (optional).

## Models

This works with any GGUF model your hardware can support. This setup is what I used on my desktop, my lichee pi4a required me to custom build llama-cpp so I didn't bother building a docker container for my testing purposes.

```bash
git clone https://github.com/remkade/tiny-llm.git
cd tiny-llm

# Go to hugging face and download the GGUF format models you would like to try and put them into ./models

# This is optional if you want to modify and regen your env.local config file
deno task env

# Now start the services. Set the env var MODEL to the relative filename
MODEL="./models/qwen1_5-0_5b-chat-q5_k_m.gguf" podman-compose up -d

# Will open your browser to the chat UI if you are on a mac
type -p open && open http://localhost:3000

# Will open your browser to the chat UI if you are on a linux machine
type -p xdg-open && xdg-open http://localhost:3000
```
